import { Cargo, PackingResult, PackingConfig, CostOptimizationStrategy, ContainerType } from '../types';
import { CONTAINER_TYPES } from '../constants';
import { BaseAlgorithm } from './base/BaseAlgorithm';

/**
 * 成本优化引擎
 * 在基础算法结果上应用不同的成本优化策略
 */
export class CostOptimizationEngine {
  /**
   * 应用成本优化策略
   * @param baseResult 基础算法结果
   * @param cargos 货物列表
   * @param algorithm 基础算法实例
   * @param cargoNameColors 货物颜色映射
   * @param config 装箱配置
   * @returns 优化后的装箱结果
   */
  static applyOptimization(
    baseResult: PackingResult | null,
    cargos: Cargo[],
    algorithm: BaseAlgorithm,
    cargoNameColors?: Record<string, string>,
    config?: PackingConfig
  ): PackingResult | null {
    if (!config?.costOptimizationStrategy || config.costOptimizationStrategy === 'none') {
      return baseResult;
    }

    switch (config.costOptimizationStrategy) {
      case 'min_containers':
        return this.optimizeForMinContainers(cargos, algorithm, cargoNameColors, config);
      case 'min_cost':
        return this.optimizeForMinCost(cargos, algorithm, cargoNameColors, config);
      case 'max_utilization':
        return this.optimizeForMaxUtilization(cargos, algorithm, cargoNameColors, config);
      default:
        return baseResult;
    }
  }

  /**
   * 最少集装箱数量优化策略
   */
  private static optimizeForMinContainers(
    cargos: Cargo[],
    algorithm: BaseAlgorithm,
    cargoNameColors?: Record<string, string>,
    config?: PackingConfig
  ): PackingResult | null {
    let bestResult: PackingResult | null = null;
    let minContainers = Infinity;

    // 智能分离货物：根据货物高度分组
    const maxStandardHeight = Math.max(...CONTAINER_TYPES.filter(ct => !ct.isFrameContainer).map(ct => ct.height));
    const gap = 0.05; // 默认间隙
    
    // 分离可装入标准箱的货物和需要框架箱的货物
    const standardCargos = cargos.filter(cargo => cargo.height <= maxStandardHeight);
    const frameCargos = cargos.filter(cargo => cargo.height > maxStandardHeight);
    
    console.log(`成本优化(最少集装箱)：货物分析 - 标准箱货物: ${standardCargos.length}种, 框架箱货物: ${frameCargos.length}种`);
    
    // 按体积从大到小排序集装箱类型，优先尝试大容器
    const sortedContainerTypes = [...CONTAINER_TYPES].sort((a, b) => {
      const volumeA = a.length * a.width * a.height;
      const volumeB = b.length * b.width * b.height;
      return volumeB - volumeA;
    });
    
    // 如果有标准箱货物，优先尝试标准箱方案
    if (standardCargos.length > 0) {
      const standardContainerTypes = sortedContainerTypes.filter(containerType => !containerType.isFrameContainer);
      
      // 尝试标准箱优化
      for (const containerType of standardContainerTypes) {
        const result = algorithm.packIntoContainerType(standardCargos, containerType, cargoNameColors, {
          algorithm: config?.algorithm || 'greedy',
          mode: config?.mode || 'multi_container',
          allowMultipleContainers: true,
          containerType: config?.containerType,
          costOptimizationStrategy: config?.costOptimizationStrategy
        });
        
        if (result && result.containerCount < minContainers) {
          minContainers = result.containerCount;
          bestResult = result;
        }
      }
      
      // 如果还有框架箱货物，需要额外处理
      if (frameCargos.length > 0 && bestResult) {
        const frameContainerTypes = sortedContainerTypes.filter(containerType => containerType.isFrameContainer);
        let bestFrameResult: PackingResult | null = null;
        let minFrameContainers = Infinity;
        
        for (const containerType of frameContainerTypes) {
          const frameResult = algorithm.packIntoContainerType(frameCargos, containerType, cargoNameColors, {
            algorithm: config?.algorithm || 'greedy',
            mode: config?.mode || 'multi_container',
            allowMultipleContainers: true,
            containerType: config?.containerType,
            costOptimizationStrategy: config?.costOptimizationStrategy
          });
          
          if (frameResult && frameResult.containerCount < minFrameContainers) {
            minFrameContainers = frameResult.containerCount;
            bestFrameResult = frameResult;
          }
        }
        
        if (bestFrameResult) {
          // 合并结果
          const combinedContainers = [...bestResult.containers, ...bestFrameResult.containers];
          const combinedPackedItems = [...bestResult.packedItems, ...bestFrameResult.packedItems.map(item => ({
            ...item,
            containerIndex: item.containerIndex + (bestResult?.containers?.length || 0)
          }))];
          const combinedTotalVolume = bestResult.totalVolume + bestFrameResult.totalVolume;
          const combinedTotalWeight = bestResult.totalWeight + bestFrameResult.totalWeight;
          
          // 重新计算利用率（框架集装箱不参与计算）
          let standardContainerVolume = 0;
          
          combinedContainers.forEach(container => {
            const containerVolume = container.length * container.width * container.height;
            if (!container.isFrameContainer) {
              standardContainerVolume += containerVolume;
            }
          });
          
          // 只基于标准集装箱计算利用率
          const utilizationRate = standardContainerVolume > 0 ? (bestResult.totalVolume / standardContainerVolume) * 100 : 0;
          
          // 计算实际空间占用率（包含间隙，只计算标准集装箱）
          const gap = config?.gap || 0.05;
          const standardOccupiedVolume = combinedPackedItems.reduce((sum, item) => {
            const containerIndex = item.containerIndex;
            const container = combinedContainers[containerIndex];
            if (container && !container.isFrameContainer) {
              const cargoWithGap = (item.cargo.length + gap) * (item.cargo.width + gap) * (item.cargo.height + gap);
              return sum + cargoWithGap;
            }
            return sum;
          }, 0);
          
          const spaceOccupancyRate = standardContainerVolume > 0 ? (standardOccupiedVolume / standardContainerVolume) * 100 : 0;
          
          bestResult = {
            ...bestResult,
            containerCount: bestResult.containerCount + bestFrameResult.containerCount,
            totalCost: bestResult.totalCost + bestFrameResult.totalCost,
            packedItems: combinedPackedItems,
            containers: combinedContainers,
            unpackedItems: [...bestResult.unpackedItems, ...bestFrameResult.unpackedItems],
            totalVolume: combinedTotalVolume,
            totalWeight: combinedTotalWeight,
            utilizationRate: parseFloat(utilizationRate.toFixed(2)),
            spaceOccupancyRate: parseFloat(spaceOccupancyRate.toFixed(2))
          };
          minContainers = bestResult.containerCount;
        } else {
          // 框架箱货物装载失败，将其加入未装载列表
          bestResult.unpackedItems = [...bestResult.unpackedItems, ...frameCargos];
        }
      }
    }
    
    // 如果标准箱方案失败，尝试全部使用框架箱
    if (!bestResult) {
      const frameContainerTypes = sortedContainerTypes.filter(containerType => containerType.isFrameContainer);
      console.log('成本优化(最少集装箱)：使用框架箱装载所有货物');
      
      for (const containerType of frameContainerTypes) {
        const result = algorithm.packIntoContainerType(cargos, containerType, cargoNameColors, {
          algorithm: config?.algorithm || 'greedy',
          mode: config?.mode || 'multi_container',
          allowMultipleContainers: true,
          containerType: config?.containerType,
          costOptimizationStrategy: config?.costOptimizationStrategy
        });
        
        if (result && result.containerCount < minContainers) {
          minContainers = result.containerCount;
          bestResult = result;
        }
      }
    }
    
    let feasibleContainerTypes: ContainerType[] = CONTAINER_TYPES; // 保持原有逻辑兼容性

    if (feasibleContainerTypes.length === 0) {
      console.warn('没有找到能够容纳货物高度的集装箱类型');
      return null;
    }

    for (const containerType of feasibleContainerTypes) {
      const result = algorithm.packIntoContainerType(cargos, containerType, cargoNameColors, {
        algorithm: config?.algorithm || 'greedy',
        mode: config?.mode || 'multi_container',
        allowMultipleContainers: true,
        containerType: config?.containerType,
        costOptimizationStrategy: config?.costOptimizationStrategy
      });

      if (result) {
        // 优先选择集装箱数量最少的方案
        if (result.containerCount < minContainers) {
          minContainers = result.containerCount;
          bestResult = result;
        }
        // 如果集装箱数量相同，选择利用率更高的方案
        else if (result.containerCount === minContainers && 
                 bestResult && 
                 result.utilization > bestResult.utilization) {
          bestResult = result;
        }
      }
    }

    return bestResult;
  }

  /**
   * 最低运输成本优化策略
   */
  private static optimizeForMinCost(
    cargos: Cargo[],
    algorithm: BaseAlgorithm,
    cargoNameColors?: Record<string, string>,
    config?: PackingConfig
  ): PackingResult | null {
    let bestResult: PackingResult | null = null;
    let minCost = Infinity;

    // 智能分离货物：根据货物高度分组
    const maxStandardHeight = Math.max(...CONTAINER_TYPES.filter(ct => !ct.isFrameContainer).map(ct => ct.height));
    const gap = 0.05; // 默认间隙
    
    // 分离可装入标准箱的货物和需要框架箱的货物
    const standardCargos = cargos.filter(cargo => cargo.height <= maxStandardHeight);
    const frameCargos = cargos.filter(cargo => cargo.height > maxStandardHeight);
    
    console.log(`成本优化(最低成本)：货物分析 - 标准箱货物: ${standardCargos.length}种, 框架箱货物: ${frameCargos.length}种`);

    // 按成本效益比排序（体积/成本）
    const sortedContainerTypes = [...CONTAINER_TYPES].sort((a, b) => {
      const efficiencyA = (a.length * a.width * a.height) / a.cost;
      const efficiencyB = (b.length * b.width * b.height) / b.cost;
      return efficiencyB - efficiencyA;
    });
    
    // 如果有标准箱货物，优先尝试标准箱方案
    if (standardCargos.length > 0) {
      const standardContainerTypes = sortedContainerTypes.filter(containerType => !containerType.isFrameContainer);
      
      // 尝试标准箱优化
      for (const containerType of standardContainerTypes) {
        const result = algorithm.packIntoContainerType(standardCargos, containerType, cargoNameColors, {
          algorithm: config?.algorithm || 'greedy',
          mode: config?.mode || 'multi_container',
          allowMultipleContainers: true,
          containerType: config?.containerType,
          costOptimizationStrategy: config?.costOptimizationStrategy
        });
        
        if (result && result.totalCost < minCost) {
          minCost = result.totalCost;
          bestResult = result;
        }
      }
      
      // 如果还有框架箱货物，需要额外处理
      if (frameCargos.length > 0 && bestResult) {
        const frameContainerTypes = sortedContainerTypes.filter(containerType => containerType.isFrameContainer);
        let bestFrameResult: PackingResult | null = null;
        let minFrameCost = Infinity;
        
        for (const containerType of frameContainerTypes) {
          const frameResult = algorithm.packIntoContainerType(frameCargos, containerType, cargoNameColors, {
            algorithm: config?.algorithm || 'greedy',
            mode: config?.mode || 'multi_container',
            allowMultipleContainers: true,
            containerType: config?.containerType,
            costOptimizationStrategy: config?.costOptimizationStrategy
          });
          
          if (frameResult && frameResult.totalCost < minFrameCost) {
            minFrameCost = frameResult.totalCost;
            bestFrameResult = frameResult;
          }
        }
        
        if (bestFrameResult) {
          // 合并结果
          const combinedContainers = [...bestResult.containers, ...bestFrameResult.containers];
          const combinedPackedItems = [...bestResult.packedItems, ...bestFrameResult.packedItems.map(item => ({
            ...item,
            containerIndex: item.containerIndex + (bestResult?.containers?.length || 0)
          }))];
          const combinedTotalVolume = bestResult.totalVolume + bestFrameResult.totalVolume;
          const combinedTotalWeight = bestResult.totalWeight + bestFrameResult.totalWeight;
          
          // 重新计算利用率（框架集装箱不参与计算）
          const standardContainerVolume = combinedContainers.reduce((sum, container) => {
            return container.isFrameContainer ? sum : sum + (container.length * container.width * container.height);
          }, 0);
          const utilizationRate = standardContainerVolume > 0 ? (bestResult.totalVolume / standardContainerVolume) * 100 : 0;
          
          // 计算实际空间占用率（包含间隙，只计算标准集装箱）
          const gap = config?.gap || 0.05;
          const standardOccupiedVolume = combinedPackedItems.reduce((sum, item) => {
            // 只计算装在标准集装箱中的货物
            if (item.containerIndex !== undefined) {
              const container = combinedContainers[item.containerIndex];
              if (!container.isFrameContainer) {
                const cargoWithGap = (item.cargo.length + gap) * (item.cargo.width + gap) * (item.cargo.height + gap);
                return sum + cargoWithGap;
              }
            }
            return sum;
          }, 0);
          const spaceOccupancyRate = standardContainerVolume > 0 ? (standardOccupiedVolume / standardContainerVolume) * 100 : 0;
          
          bestResult = {
            ...bestResult,
            containerCount: bestResult.containerCount + bestFrameResult.containerCount,
            totalCost: bestResult.totalCost + bestFrameResult.totalCost,
            packedItems: combinedPackedItems,
            containers: combinedContainers,
            unpackedItems: [...bestResult.unpackedItems, ...bestFrameResult.unpackedItems],
            totalVolume: combinedTotalVolume,
            totalWeight: combinedTotalWeight,
            utilizationRate: parseFloat(utilizationRate.toFixed(2)),
            spaceOccupancyRate: parseFloat(spaceOccupancyRate.toFixed(2))
          };
          minCost = bestResult.totalCost;
        } else {
          // 框架箱货物装载失败，将其加入未装载列表
          bestResult.unpackedItems = [...bestResult.unpackedItems, ...frameCargos];
        }
      }
    }
    
    // 如果标准箱方案失败，尝试全部使用框架箱
    if (!bestResult) {
      const frameContainerTypes = sortedContainerTypes.filter(containerType => containerType.isFrameContainer);
      console.log('成本优化(最低成本)：使用框架箱装载所有货物');
      
      for (const containerType of frameContainerTypes) {
        const result = algorithm.packIntoContainerType(cargos, containerType, cargoNameColors, {
          algorithm: config?.algorithm || 'greedy',
          mode: config?.mode || 'multi_container',
          allowMultipleContainers: true,
          containerType: config?.containerType,
          costOptimizationStrategy: config?.costOptimizationStrategy
        });
        
        if (result && result.totalCost < minCost) {
          minCost = result.totalCost;
          bestResult = result;
        }
      }
    }
    
    let feasibleContainerTypes: ContainerType[] = CONTAINER_TYPES; // 保持原有逻辑兼容性

    if (feasibleContainerTypes.length === 0) {
      console.warn('没有找到能够容纳货物高度的集装箱类型');
      return null;
    }

    for (const containerType of feasibleContainerTypes) {
      const result = algorithm.packIntoContainerType(cargos, containerType, cargoNameColors, {
        algorithm: config?.algorithm || 'greedy',
        mode: config?.mode || 'multi_container',
        allowMultipleContainers: true,
        containerType: config?.containerType,
        costOptimizationStrategy: config?.costOptimizationStrategy
      });

      if (result && result.totalCost < minCost) {
        minCost = result.totalCost;
        bestResult = result;
      }
    }

    // 如果允许多集装箱，尝试混合使用不同类型的集装箱以降低成本
    if (config?.allowMultipleContainers && bestResult) {
      const mixedResult = this.tryMixedContainerOptimization(
        cargos, 
        algorithm, 
        cargoNameColors, 
        config
      );
      if (mixedResult && mixedResult.totalCost < bestResult.totalCost) {
        bestResult = mixedResult;
      }
    }

    return bestResult;
  }

  /**
   * 最高空间利用率优化策略
   */
  private static optimizeForMaxUtilization(
    cargos: Cargo[],
    algorithm: BaseAlgorithm,
    cargoNameColors?: Record<string, string>,
    config?: PackingConfig
  ): PackingResult | null {
    let bestResult: PackingResult | null = null;
    let maxUtilization = 0;

    // 智能分离货物：根据货物高度分组
    const maxStandardHeight = Math.max(...CONTAINER_TYPES.filter(ct => !ct.isFrameContainer).map(ct => ct.height));
    const gap = 0.05; // 默认间隙
    
    // 分离可装入标准箱的货物和需要框架箱的货物
    const standardCargos = cargos.filter(cargo => cargo.height <= maxStandardHeight);
    const frameCargos = cargos.filter(cargo => cargo.height > maxStandardHeight);
    
    console.log(`成本优化(最高利用率)：货物分析 - 标准箱货物: ${standardCargos.length}种, 框架箱货物: ${frameCargos.length}种`);
    
    // 如果有标准箱货物，优先尝试标准箱方案
    if (standardCargos.length > 0) {
      const standardContainerTypes = CONTAINER_TYPES.filter(containerType => !containerType.isFrameContainer);
      
      // 尝试标准箱优化
      for (const containerType of standardContainerTypes) {
        const result = algorithm.packIntoContainerType(standardCargos, containerType, cargoNameColors, config);
        if (result && result.utilization > maxUtilization) {
          maxUtilization = result.utilization;
          bestResult = result;
        }
      }
      
      // 如果还有框架箱货物，需要额外处理
      if (frameCargos.length > 0 && bestResult) {
        const frameContainerTypes = CONTAINER_TYPES.filter(containerType => containerType.isFrameContainer);
        let bestFrameResult: PackingResult | null = null;
        
        for (const containerType of frameContainerTypes) {
          const frameResult = algorithm.packIntoContainerType(frameCargos, containerType, cargoNameColors, config);
          if (frameResult && (!bestFrameResult || frameResult.utilization > bestFrameResult.utilization)) {
            bestFrameResult = frameResult;
          }
        }
        
        if (bestFrameResult) {
          // 合并结果
          const combinedContainers = [...bestResult.containers, ...bestFrameResult.containers];
          const combinedPackedItems = [...bestResult.packedItems, ...bestFrameResult.packedItems.map(item => ({
            ...item,
            containerIndex: item.containerIndex + (bestResult?.containers?.length || 0)
          }))];
          const combinedTotalVolume = bestResult.totalVolume + bestFrameResult.totalVolume;
          const combinedTotalWeight = bestResult.totalWeight + bestFrameResult.totalWeight;
          
          // 重新计算利用率
          const totalContainerVolume = combinedContainers.reduce((sum, container) => 
            sum + (container.length * container.width * container.height), 0
          );
          const utilizationRate = totalContainerVolume > 0 ? (combinedTotalVolume / totalContainerVolume) * 100 : 0;
          
          // 计算实际空间占用率（包含间隙）
          const gap = config?.gap || 0.05;
          const totalOccupiedVolume = combinedPackedItems.reduce((sum, item) => {
            const cargoWithGap = (item.cargo.length + gap) * (item.cargo.width + gap) * (item.cargo.height + gap);
            return sum + cargoWithGap;
          }, 0);
          const spaceOccupancyRate = totalContainerVolume > 0 ? (totalOccupiedVolume / totalContainerVolume) * 100 : 0;
          
          bestResult = {
            ...bestResult,
            containerCount: bestResult.containerCount + bestFrameResult.containerCount,
            totalCost: bestResult.totalCost + bestFrameResult.totalCost,
            packedItems: combinedPackedItems,
            containers: combinedContainers,
            unpackedItems: [...bestResult.unpackedItems, ...bestFrameResult.unpackedItems],
            totalVolume: combinedTotalVolume,
            totalWeight: combinedTotalWeight,
            utilizationRate: parseFloat(utilizationRate.toFixed(2)),
            spaceOccupancyRate: parseFloat(spaceOccupancyRate.toFixed(2))
          };
        } else {
          // 框架箱货物装载失败，将其加入未装载列表
          bestResult.unpackedItems = [...bestResult.unpackedItems, ...frameCargos];
        }
      }
    }
    
    // 如果标准箱方案失败，尝试全部使用框架箱
    if (!bestResult) {
      const frameContainerTypes = CONTAINER_TYPES.filter(containerType => containerType.isFrameContainer);
      console.log('成本优化(最高利用率)：使用框架箱装载所有货物');
      
      for (const containerType of frameContainerTypes) {
        const result = algorithm.packIntoContainerType(cargos, containerType, cargoNameColors, config);
        if (result && result.utilization > maxUtilization) {
          maxUtilization = result.utilization;
          bestResult = result;
        }
      }
    }
    
    let feasibleContainerTypes: ContainerType[] = CONTAINER_TYPES; // 保持原有逻辑兼容性

    if (feasibleContainerTypes.length === 0) {
      console.warn('没有找到能够容纳货物高度的集装箱类型');
      return null;
    }

    for (const containerType of feasibleContainerTypes) {
      const result = algorithm.packIntoContainerType(cargos, containerType, cargoNameColors, config);
      
      if (result) {
        // 计算综合利用率（考虑体积和重量）
        const volumeUtilization = result.utilization;
        const weightUtilization = this.calculateWeightUtilization(result, containerType);
        const comprehensiveUtilization = this.calculateComprehensiveUtilization(
          volumeUtilization, 
          weightUtilization
        );
        
        if (comprehensiveUtilization > maxUtilization) {
          maxUtilization = comprehensiveUtilization;
          bestResult = {
            ...result,
            utilization: comprehensiveUtilization,
            utilizationRate: comprehensiveUtilization
          };
        }
      }
    }

    // 尝试优化货物排序以提高利用率
    if (bestResult && config?.allowMultipleContainers) {
      const optimizedResult = this.tryUtilizationOptimizedSorting(
        cargos, 
        algorithm, 
        cargoNameColors, 
        config
      );
      if (optimizedResult && optimizedResult.utilization > bestResult.utilization) {
        bestResult = optimizedResult;
      }
    }

    return bestResult;
  }

  /**
   * 尝试混合集装箱优化
   */
  private static tryMixedContainerOptimization(
    cargos: Cargo[],
    algorithm: BaseAlgorithm,
    cargoNameColors?: Record<string, string>,
    config?: PackingConfig
  ): PackingResult | null {
    // 这里可以实现更复杂的混合集装箱策略
    // 暂时返回null，表示没有找到更好的混合方案
    return null;
  }

  /**
   * 尝试利用率优化的货物排序
   */
  private static tryUtilizationOptimizedSorting(
    cargos: Cargo[],
    algorithm: BaseAlgorithm,
    cargoNameColors?: Record<string, string>,
    config?: PackingConfig
  ): PackingResult | null {
    // 按货物体积密度排序
    const densitySortedCargos = [...cargos].sort((a, b) => {
      const densityA = (a.length * a.width * a.height) / a.weight;
      const densityB = (b.length * b.width * b.height) / b.weight;
      return densityB - densityA;
    });

    let bestResult: PackingResult | null = null;
    let maxUtilization = 0;

    // 智能分离货物：根据货物高度分组
    const maxStandardHeight = Math.max(...CONTAINER_TYPES.filter(ct => !ct.isFrameContainer).map(ct => ct.height));
    const gap = 0.05; // 默认间隙
    
    // 分离可装入标准箱的货物和需要框架箱的货物
    const standardCargos = densitySortedCargos.filter(cargo => cargo.height <= maxStandardHeight);
    const frameCargos = densitySortedCargos.filter(cargo => cargo.height > maxStandardHeight);
    
    console.log(`利用率优化排序：货物分析 - 标准箱货物: ${standardCargos.length}种, 框架箱货物: ${frameCargos.length}种`);
    
    // 如果有标准箱货物，优先尝试标准箱方案
    if (standardCargos.length > 0) {
      const standardContainerTypes = CONTAINER_TYPES.filter(containerType => !containerType.isFrameContainer);
      
      for (const containerType of standardContainerTypes) {
        const result = algorithm.packIntoContainerType(standardCargos, containerType, cargoNameColors, config);
        
        if (result) {
          const volumeUtilization = result.utilization;
          const weightUtilization = this.calculateWeightUtilization(result, containerType);
          const comprehensiveUtilization = this.calculateComprehensiveUtilization(
            volumeUtilization, 
            weightUtilization
          );
          
          if (comprehensiveUtilization > maxUtilization) {
            maxUtilization = comprehensiveUtilization;
            bestResult = result;
          }
        }
      }
      
      // 如果还有框架箱货物，需要额外处理
      if (frameCargos.length > 0 && bestResult) {
        const frameContainerTypes = CONTAINER_TYPES.filter(containerType => containerType.isFrameContainer);
        let bestFrameResult: PackingResult | null = null;
        let maxFrameUtilization = 0;
        
        for (const containerType of frameContainerTypes) {
          const frameResult = algorithm.packIntoContainerType(frameCargos, containerType, cargoNameColors, config);
          
          if (frameResult) {
            const volumeUtilization = frameResult.utilization;
            const weightUtilization = this.calculateWeightUtilization(frameResult, containerType);
            const comprehensiveUtilization = this.calculateComprehensiveUtilization(
              volumeUtilization, 
              weightUtilization
            );
            
            if (comprehensiveUtilization > maxFrameUtilization) {
              maxFrameUtilization = comprehensiveUtilization;
              bestFrameResult = frameResult;
            }
          }
        }
        
        if (bestFrameResult) {
          // 合并结果
          bestResult = {
            ...bestResult,
            containerCount: bestResult.containerCount + bestFrameResult.containerCount,
            totalCost: bestResult.totalCost + bestFrameResult.totalCost,
            packedItems: [...bestResult.packedItems, ...bestFrameResult.packedItems],
            containers: [...bestResult.containers, ...bestFrameResult.containers],
            unpackedItems: [...bestResult.unpackedItems, ...bestFrameResult.unpackedItems],
            totalVolume: bestResult.totalVolume + bestFrameResult.totalVolume,
            totalWeight: bestResult.totalWeight + bestFrameResult.totalWeight
          };
        } else {
          // 框架箱货物装载失败，将其加入未装载列表
          bestResult.unpackedItems = [...bestResult.unpackedItems, ...frameCargos];
        }
      }
    }
    
    // 如果标准箱方案失败，尝试全部使用框架箱
    if (!bestResult) {
      const frameContainerTypes = CONTAINER_TYPES.filter(containerType => containerType.isFrameContainer);
      console.log('利用率优化排序：使用框架箱装载所有货物');
      
      for (const containerType of frameContainerTypes) {
        const result = algorithm.packIntoContainerType(densitySortedCargos, containerType, cargoNameColors, config);
        
        if (result) {
          const volumeUtilization = result.utilization;
          const weightUtilization = this.calculateWeightUtilization(result, containerType);
          const comprehensiveUtilization = this.calculateComprehensiveUtilization(
            volumeUtilization, 
            weightUtilization
          );
          
          if (comprehensiveUtilization > maxUtilization) {
            maxUtilization = comprehensiveUtilization;
            bestResult = result;
          }
        }
      }
    }
    
    let feasibleContainerTypes: ContainerType[] = CONTAINER_TYPES; // 保持原有逻辑兼容性

    if (feasibleContainerTypes.length === 0) {
      return null;
    }

    for (const containerType of feasibleContainerTypes) {
      const result = algorithm.packIntoContainerType(densitySortedCargos, containerType, cargoNameColors, config);
      
      if (result) {
        const volumeUtilization = result.utilization;
        const weightUtilization = this.calculateWeightUtilization(result, containerType);
        const comprehensiveUtilization = this.calculateComprehensiveUtilization(
          volumeUtilization, 
          weightUtilization
        );
        
        if (comprehensiveUtilization > maxUtilization) {
          maxUtilization = comprehensiveUtilization;
          bestResult = {
            ...result,
            utilization: comprehensiveUtilization,
            utilizationRate: comprehensiveUtilization
          };
        }
      }
    }

    return bestResult;
  }

  /**
   * 计算重量利用率
   */
  private static calculateWeightUtilization(result: PackingResult, containerType: ContainerType): number {
    const totalWeight = result.totalWeight;
    const maxTotalWeight = result.containerCount * containerType.maxWeight;
    return (totalWeight / maxTotalWeight) * 100;
  }

  /**
   * 计算综合利用率
   */
  private static calculateComprehensiveUtilization(volumeUtilization: number, weightUtilization: number): number {
    // 使用加权平均，体积利用率权重70%，重量利用率权重30%
    return volumeUtilization * 0.7 + weightUtilization * 0.3;
  }
}