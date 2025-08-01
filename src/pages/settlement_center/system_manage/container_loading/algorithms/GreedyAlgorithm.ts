import { Cargo, PackingResult, PackingConfig } from '../types';
import { CONTAINER_TYPES } from '../constants';
import { BaseAlgorithm } from './base/BaseAlgorithm';

/**
 * 贪心算法
 * 快速装箱，优先选择当前最优解
 */
export class GreedyAlgorithm extends BaseAlgorithm {
  /**
   * 执行贪心算法
   * @param cargos 货物列表
   * @param cargoNameColors 货物名称颜色映射
   * @param config 装箱配置
   * @returns 装箱结果
   */
  execute(cargos: Cargo[], cargoNameColors?: Record<string, string>, config?: PackingConfig): PackingResult | null {
    if (!cargos.length) return null;

    // 如果指定了集装箱类型，直接使用
    if (config?.containerType) {
      return this.packIntoContainerType(cargos, config.containerType, cargoNameColors, config);
    }

    // 处理货物放倒逻辑
    let processedCargos = [...cargos];
    if (config?.allowRotation) {
      processedCargos = this.optimizeCargoRotation(cargos);
      console.log(`贪心算法：货物放倒优化完成，处理了 ${processedCargos.length} 种货物`);
    }

    // 智能分离货物：根据货物高度分组
    const maxStandardHeight = Math.max(...CONTAINER_TYPES.filter(ct => !ct.isFrameContainer).map(ct => ct.height));
    
    // 分离可装入标准箱的货物和需要框架箱的货物
    const standardCargos = processedCargos.filter(cargo => cargo.height <= maxStandardHeight);
    const frameCargos = processedCargos.filter(cargo => cargo.height > maxStandardHeight);
    
    console.log(`贪心算法：货物分析 - 标准箱货物: ${standardCargos.length}种, 框架箱货物: ${frameCargos.length}种`);
    console.log(`标准箱最大高度限制: ${maxStandardHeight}m`);
    
    let bestResult: PackingResult | null = null;
    
    // 如果有标准箱货物，优先尝试标准箱方案
    if (standardCargos.length > 0) {
      const standardContainerTypes = CONTAINER_TYPES.filter(containerType => !containerType.isFrameContainer);
      const standardResult = this.tryContainerTypes(standardCargos, standardContainerTypes, cargoNameColors, config);
      
      if (standardResult) {
        console.log(`贪心算法：标准箱方案 - 利用率: ${standardResult.utilization.toFixed(2)}%, 集装箱数: ${standardResult.containerCount}`);
        bestResult = standardResult;
        
        // 如果还有框架箱货物，需要额外处理
        if (frameCargos.length > 0) {
          const frameContainerTypes = CONTAINER_TYPES.filter(containerType => containerType.isFrameContainer);
          const frameResult = this.tryContainerTypes(frameCargos, frameContainerTypes, cargoNameColors, config);
          
          if (frameResult) {
            console.log(`贪心算法：框架箱方案 - 利用率: ${frameResult.utilization.toFixed(2)}%, 集装箱数: ${frameResult.containerCount}`);
            // 合并两个结果
            bestResult = this.mergePackingResults(standardResult, frameResult);
          } else {
            // 框架箱货物装载失败，将其加入未装载列表
            bestResult.unpackedItems = [...bestResult.unpackedItems, ...frameCargos];
          }
        }
      }
    }
    
    // 如果标准箱方案失败或没有标准箱货物，尝试全部使用框架箱
    if (!bestResult) {
      const frameContainerTypes = CONTAINER_TYPES.filter(containerType => containerType.isFrameContainer);
      if (frameContainerTypes.length === 0) {
        console.warn('贪心算法：没有找到合适的集装箱类型');
        return null;
      }
      
      console.log('贪心算法：使用框架箱装载所有货物');
      bestResult = this.tryContainerTypes(processedCargos, frameContainerTypes, cargoNameColors, config);
      console.log('贪心算法：框架箱装载结果:', bestResult ? `成功，容器数=${bestResult.containerCount}，装载货物=${bestResult.packedItems.length}` : '失败');
    }
    
    // 在返回结果中添加处理过的货物信息
    if (bestResult && config?.allowRotation) {
      bestResult.processedCargos = processedCargos;
    }
    
    console.log('贪心算法最终结果:', bestResult ? `成功，容器数=${bestResult.containerCount}，装载货物=${bestResult.packedItems.length}，未装载货物=${bestResult.unpackedItems.length}` : '失败');
    return bestResult;
  }

  /**
   * 尝试多种集装箱类型，选择最优方案
   */
  private tryContainerTypes(cargos: Cargo[], containerTypes: any[], cargoNameColors?: Record<string, string>, config?: PackingConfig): PackingResult | null {
    // 贪心策略：按体积效率排序可行的集装箱类型
    const sortedContainerTypes = [...containerTypes].sort((a, b) => {
      const efficiencyA = (a.length * a.width * a.height) / a.cost;
      const efficiencyB = (b.length * b.width * b.height) / b.cost;
      return efficiencyB - efficiencyA;
    });

    // 按体积从大到小排序货物，优先装载大件货物
    const sortedCargos = this.sortCargosByVolume(cargos);

    let bestResult: PackingResult | null = null;
    let bestScore = -1;

    // 贪心选择：尝试每种集装箱类型，选择当前最优解
    for (const containerType of sortedContainerTypes) {
      console.log(`尝试集装箱类型: ${containerType.name} (${containerType.length}x${containerType.width}x${containerType.height})`);
      const result = this.packIntoContainerType(sortedCargos, containerType, cargoNameColors, config);
      console.log(`装箱结果:`, result ? `成功，容器数=${result.containerCount}，装载货物=${result.packedItems.length}` : '失败');
      
      if (result) {
        // 贪心评分：综合考虑利用率和成本效益
        const score = this.calculateGreedyScore(result);
        console.log(`评分: ${score}, 当前最佳评分: ${bestScore}`);
        
        if (score > bestScore) {
          bestScore = score;
          bestResult = {
            ...result,
            algorithm: 'greedy'
          };
          console.log(`更新最佳结果: 容器数=${bestResult.containerCount}，装载货物=${bestResult.packedItems.length}`);
        }
      }
    }

    return bestResult;
  }

  /**
   * 合并两个装箱结果
   */
  private mergePackingResults(standardResult: PackingResult, frameResult: PackingResult): PackingResult {
    const combinedUtilization = this.calculateCombinedUtilization(standardResult, frameResult);
    const combinedSpaceOccupancyRate = this.calculateCombinedSpaceOccupancyRate(standardResult, frameResult);
    
    // 调整框架箱货物的容器索引，使其从标准箱容器数量开始
    const adjustedFramePackedItems = frameResult.packedItems.map(item => ({
      ...item,
      containerIndex: item.containerIndex + standardResult.containerCount
    }));
    
    return {
      containerType: standardResult.containerType, // 使用主要结果的容器类型
      containerCount: standardResult.containerCount + frameResult.containerCount,
      utilization: combinedUtilization,
      utilizationRate: combinedUtilization,
      spaceOccupancyRate: combinedSpaceOccupancyRate,
      totalCost: standardResult.totalCost + frameResult.totalCost,
      packedItems: [...standardResult.packedItems, ...adjustedFramePackedItems],
      containers: [...standardResult.containers, ...frameResult.containers],
      unpackedItems: [...standardResult.unpackedItems, ...frameResult.unpackedItems],
      totalVolume: standardResult.totalVolume + frameResult.totalVolume,
      totalWeight: standardResult.totalWeight + frameResult.totalWeight,
      algorithm: standardResult.algorithm,
      mode: standardResult.mode,
      executionTime: (standardResult.executionTime || 0) + (frameResult.executionTime || 0),
      iterations: (standardResult.iterations || 0) + (frameResult.iterations || 0),
      gap: standardResult.gap || frameResult.gap || 0.05
    };
  }

  /**
   * 计算合并结果的综合利用率（框架集装箱不参与计算）
   */
  private calculateCombinedUtilization(standardResult: PackingResult, frameResult: PackingResult): number {
    const standardContainerVolume = this.calculateTotalContainerVolume(standardResult.containers);
    
    // 只基于标准集装箱计算利用率
    if (standardContainerVolume === 0) return 0;
    
    const standardUtilization = (standardResult.totalVolume / standardContainerVolume) * 100;
    
    return parseFloat(standardUtilization.toFixed(2));
  }

  /**
   * 计算合并结果的综合空间占用率（框架集装箱不参与计算）
   */
  private calculateCombinedSpaceOccupancyRate(standardResult: PackingResult, frameResult: PackingResult): number {
    const standardContainerVolume = this.calculateTotalContainerVolume(standardResult.containers);
    
    // 只基于标准集装箱计算空间占用率
    if (standardContainerVolume === 0) return 0;
    
    const standardSpaceOccupancy = standardResult.spaceOccupancyRate || standardResult.utilizationRate || 0;
    
    return parseFloat(standardSpaceOccupancy.toFixed(2));
  }

  /**
   * 计算集装箱总体积
   */
  private calculateTotalContainerVolume(containers: any[]): number {
    return containers.reduce((total, container) => {
      return total + (container.length * container.width * container.height);
    }, 0);
  }

  /**
   * 按体积从大到小排序货物
   */
  private sortCargosByVolume(cargos: Cargo[]): Cargo[] {
    return [...cargos].sort((a, b) => {
      const volumeA = a.length * a.width * a.height;
      const volumeB = b.length * b.width * b.height;
      return volumeB - volumeA;
    });
  }

  /**
   * 计算贪心评分
   * 综合考虑利用率、成本效益和装载效率
   */
  private calculateGreedyScore(result: PackingResult): number {
    const utilizationScore = result.utilization; // 利用率分数 (0-100)
    const costEfficiencyScore = this.calculateCostEfficiencyScore(result); // 成本效益分数
    const loadingEfficiencyScore = this.calculateLoadingEfficiencyScore(result); // 装载效率分数
    
    // 加权计算总分：利用率50%，成本效益30%，装载效率20%
    return utilizationScore * 0.5 + costEfficiencyScore * 0.3 + loadingEfficiencyScore * 0.2;
  }

  /**
   * 计算成本效益分数
   */
  private calculateCostEfficiencyScore(result: PackingResult): number {
    // 如果没有使用任何容器，成本效益分数为0
    if (result.totalCost === 0 || result.containerCount === 0) return 0;
    
    // 成本效益 = 装载体积 / 总成本
    const loadedVolume = result.totalVolume;
    const costEfficiency = loadedVolume / result.totalCost;
    
    // 归一化到0-100分
    return Math.min(costEfficiency * 10, 100);
  }

  /**
   * 计算装载效率分数
   */
  private calculateLoadingEfficiencyScore(result: PackingResult): number {
    const totalItems = result.packedItems.length;
    const unpackedItems = result.unpackedItems.length;
    const totalCargos = totalItems + unpackedItems;
    
    // 如果没有货物或没有装载任何货物，装载效率为0
    if (totalCargos === 0 || totalItems === 0) return 0;
    
    // 装载效率 = 已装载货物数量 / 总货物数量
    return (totalItems / totalCargos) * 100;
  }

  /**
   * 优化货物放倒
   */
  private optimizeCargoRotation(cargos: Cargo[]): Cargo[] {
    const maxStandardHeight = Math.max(...CONTAINER_TYPES.filter(ct => !ct.isFrameContainer).map(ct => ct.height));

    return cargos.map(cargo => {
      // 如果货物高度超过标准集装箱最大高度，尝试放倒
      if (cargo.height > maxStandardHeight) {
        console.log(`货物 ${cargo.name} 高度 ${cargo.height}m 超过标准箱限制 ${maxStandardHeight}m，尝试放倒`);
        
        // 将高度和长度互换（放倒）
        const rotatedCargo = {
          ...cargo,
          length: cargo.height,
          height: cargo.length
        };
        
        // 检查放倒后是否能装入标准集装箱
        if (rotatedCargo.height <= maxStandardHeight) {
          console.log(`货物 ${cargo.name} 放倒后可装入标准箱: ${rotatedCargo.length}x${rotatedCargo.width}x${rotatedCargo.height}`);
          return rotatedCargo;
        } else {
          console.log(`货物 ${cargo.name} 放倒后仍超高，保持原状态，将使用框架箱`);
        }
      }
      
      return cargo;
    });
  }
}