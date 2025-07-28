import { Cargo, PackingResult, PackingConfig, PackedItem, ContainerType } from '../types';
import { CONTAINER_TYPES } from '../constants';
import { BaseAlgorithm } from './base/BaseAlgorithm';
import { GreedyAlgorithm } from './GreedyAlgorithm';
import { CostOptimizationEngine } from './CostOptimizationEngine';

/**
 * 货物分析结果接口
 */
interface CargoAnalysis {
  totalVolume: number;
  totalWeight: number;
  avgVolume: number;
  avgWeight: number;
  largeCargos: Cargo[];
  mediumCargos: Cargo[];
  smallCargos: Cargo[];
  heavyCargos: Cargo[];
  lightCargos: Cargo[];
}

/**
 * 多集装箱优化算法
 * 智能分配货物到多个集装箱，优化整体运输方案
 */
export class MultiContainerAlgorithm extends BaseAlgorithm {
  private greedyAlgorithm: GreedyAlgorithm;

  constructor() {
    super();
    this.greedyAlgorithm = new GreedyAlgorithm();
  }

  /**
   * 执行多集装箱优化算法
   * @param cargos 货物列表
   * @param cargoNameColors 货物名称颜色映射
   * @param config 装箱配置
   * @returns 装箱结果
   */
  execute(cargos: Cargo[], cargoNameColors?: Record<string, string>, config?: PackingConfig): PackingResult | null {
    if (!cargos.length) return null;

    // 分析货物特征
    const cargoAnalysis = this.analyzeCargos(cargos);
    
    // 生成多集装箱方案
    const multiContainerPlans = this.generateMultiContainerPlans(cargos, cargoAnalysis);
    
    // 评估并选择最佳方案
    const bestPlan = this.selectBestMultiContainerPlan(multiContainerPlans, cargoNameColors, config);
    
    return bestPlan ? {
      ...bestPlan,
      algorithm: 'multi-container'
    } : null;
  }

  /**
   * 分析货物特征
   */
  private analyzeCargos(cargos: Cargo[]) {
    const totalVolume = cargos.reduce((sum: number, cargo: Cargo) => {
      return sum + (cargo.length * cargo.width * cargo.height * cargo.quantity);
    }, 0);
    
    const totalWeight = cargos.reduce((sum: number, cargo: Cargo) => {
      return sum + (cargo.weight * cargo.quantity);
    }, 0);
    
    const avgVolume = totalVolume / cargos.length;
    const avgWeight = totalWeight / cargos.length;
    
    // 按体积分类货物
    const largeCargos = cargos.filter(cargo => {
      const volume = cargo.length * cargo.width * cargo.height;
      return volume > avgVolume * 1.5;
    });
    
    const mediumCargos = cargos.filter(cargo => {
      const volume = cargo.length * cargo.width * cargo.height;
      return volume <= avgVolume * 1.5 && volume >= avgVolume * 0.5;
    });
    
    const smallCargos = cargos.filter(cargo => {
      const volume = cargo.length * cargo.width * cargo.height;
      return volume < avgVolume * 0.5;
    });
    
    // 按重量分类货物
    const heavyCargos = cargos.filter(cargo => cargo.weight > avgWeight * 1.5);
    const lightCargos = cargos.filter(cargo => cargo.weight <= avgWeight * 1.5);
    
    return {
      totalVolume,
      totalWeight,
      avgVolume,
      avgWeight,
      largeCargos,
      mediumCargos,
      smallCargos,
      heavyCargos,
      lightCargos
    };
  }

  /**
   * 生成多集装箱方案
   */
  private generateMultiContainerPlans(cargos: Cargo[], analysis: CargoAnalysis): MultiContainerPlan[] {
    const plans: MultiContainerPlan[] = [];
    
    // 方案1：按体积分组
    plans.push(this.createVolumeBasedPlan(cargos, analysis));
    
    // 方案2：按重量分组
    plans.push(this.createWeightBasedPlan(cargos, analysis));
    
    // 方案3：混合分组
    plans.push(this.createHybridPlan(cargos, analysis));
    
    // 方案4：智能分组
    plans.push(this.createIntelligentPlan(cargos, analysis));
    
    // 过滤掉空的分组方案
    return plans.map(plan => ({
      ...plan,
      groups: plan.groups.filter(group => group.length > 0)
    })).filter(plan => plan.groups.length > 0);
  }

  /**
   * 创建基于体积的分组方案
   */
  private createVolumeBasedPlan(cargos: Cargo[], analysis: CargoAnalysis): MultiContainerPlan {
    const groups: Cargo[][] = [];
    
    // 大件货物单独分组
    if (analysis.largeCargos.length > 0) {
      groups.push([...analysis.largeCargos]);
    }
    
    // 中等货物分组
    if (analysis.mediumCargos.length > 0) {
      groups.push([...analysis.mediumCargos]);
    }
    
    // 小件货物分组
    if (analysis.smallCargos.length > 0) {
      groups.push([...analysis.smallCargos]);
    }
    
    return {
      type: 'volume-based',
      groups,
      description: '按体积大小分组装载'
    };
  }

  /**
   * 创建基于重量的分组方案
   */
  private createWeightBasedPlan(cargos: Cargo[], analysis: CargoAnalysis): MultiContainerPlan {
    const groups: Cargo[][] = [];
    
    // 重货分组
    if (analysis.heavyCargos.length > 0) {
      groups.push([...analysis.heavyCargos]);
    }
    
    // 轻货分组
    if (analysis.lightCargos.length > 0) {
      groups.push([...analysis.lightCargos]);
    }
    
    return {
      type: 'weight-based',
      groups,
      description: '按重量分组装载'
    };
  }

  /**
   * 创建混合分组方案
   */
  private createHybridPlan(cargos: Cargo[], analysis: CargoAnalysis): MultiContainerPlan {
    const groups: Cargo[][] = [];
    
    // 大重货物组合
    const largeHeavy = analysis.largeCargos.filter(cargo => 
      analysis.heavyCargos.includes(cargo)
    );
    if (largeHeavy.length > 0) {
      groups.push(largeHeavy);
    }
    
    // 大轻货物组合
    const largeLight = analysis.largeCargos.filter(cargo => 
      analysis.lightCargos.includes(cargo)
    );
    if (largeLight.length > 0) {
      groups.push(largeLight);
    }
    
    // 中小货物混合组合
    const mediumSmall = [...analysis.mediumCargos, ...analysis.smallCargos]
      .filter(cargo => !largeHeavy.includes(cargo) && !largeLight.includes(cargo));
    if (mediumSmall.length > 0) {
      groups.push(mediumSmall);
    }
    
    return {
      type: 'hybrid',
      groups,
      description: '混合特征分组装载'
    };
  }

  /**
   * 创建智能分组方案
   */
  private createIntelligentPlan(cargos: Cargo[], analysis: CargoAnalysis): MultiContainerPlan {
    const groups: Cargo[][] = [];
    const remainingCargos = [...cargos];
    
    // 使用贪心策略智能分组
    while (remainingCargos.length > 0) {
      const group = this.createOptimalGroup(remainingCargos, analysis);
      if (group.length > 0) {
        groups.push(group);
        // 从剩余货物中移除已分组的货物
        group.forEach((cargo: Cargo) => {
          const index = remainingCargos.findIndex((c: Cargo) => 
            c.name === cargo.name && c.length === cargo.length && 
            c.width === cargo.width && c.height === cargo.height
          );
          if (index !== -1) {
            remainingCargos.splice(index, 1);
          }
        });
      } else {
        // 如果无法创建最优组，将剩余货物作为一组
        groups.push([...remainingCargos]);
        break;
      }
    }
    
    return {
      type: 'intelligent',
      groups,
      description: '智能优化分组装载'
    };
  }

  /**
   * 创建最优货物组
   */
  private createOptimalGroup(cargos: Cargo[], analysis: CargoAnalysis): Cargo[] {
    if (cargos.length === 0) return [];
    
    let bestGroup: Cargo[] = [];
    let bestScore = -1;
    
    // 尝试不同的集装箱类型来找到最优组合
    for (const containerType of CONTAINER_TYPES) {
      const targetVolume = containerType.length * containerType.width * containerType.height;
      const targetWeight = containerType.maxWeight;
      
      const group: Cargo[] = [];
      let currentVolume = 0;
      let currentWeight = 0;
      
      // 按综合评分排序货物
      const sortedCargos = [...cargos].sort((a: Cargo, b: Cargo) => {
        const scoreA = this.calculateCargoScore(a, analysis);
        const scoreB = this.calculateCargoScore(b, analysis);
        return scoreB - scoreA;
      });
      
      for (const cargo of sortedCargos) {
        const cargoVolume = cargo.length * cargo.width * cargo.height * cargo.quantity;
        const cargoWeight = cargo.weight * cargo.quantity;
        
        // 检查是否可以添加到当前组
        if (currentVolume + cargoVolume <= targetVolume * 0.9 && 
            currentWeight + cargoWeight <= targetWeight * 0.9) {
          group.push(cargo);
          currentVolume += cargoVolume;
          currentWeight += cargoWeight;
        }
      }
      
      // 计算这个组合的评分
      if (group.length > 0) {
        const utilization = currentVolume / targetVolume;
        const costEfficiency = group.length / containerType.cost;
        const groupScore = utilization * 0.7 + costEfficiency * 0.3;
        
        if (groupScore > bestScore) {
          bestScore = groupScore;
          bestGroup = [...group];
        }
      }
    }
    
    return bestGroup;
  }

  /**
   * 计算货物评分
   */
  private calculateCargoScore(cargo: Cargo, analysis: CargoAnalysis): number {
    const volume = cargo.length * cargo.width * cargo.height;
    const weight = cargo.weight;
    
    // 体积密度评分
    const volumeDensityScore = volume / analysis.avgVolume;
    
    // 重量密度评分
    const weightDensityScore = weight / analysis.avgWeight;
    
    // 形状规整度评分（长宽高比例）
    const dimensions = [cargo.length, cargo.width, cargo.height].sort((a: number, b: number) => b - a);
    const aspectRatio = dimensions[0] / dimensions[2];
    const shapeScore = Math.max(0, 10 - aspectRatio); // 比例越接近1评分越高
    
    // 综合评分
    return volumeDensityScore * 0.4 + weightDensityScore * 0.3 + shapeScore * 0.3;
  }

  /**
   * 选择最佳多集装箱方案
   */
  private selectBestMultiContainerPlan(
    plans: MultiContainerPlan[],
    cargoNameColors?: Record<string, string>,
    config?: PackingConfig
  ): PackingResult | null {
    let bestResult: PackingResult | null = null;
    let bestScore = -1;
    
    for (const plan of plans) {
      const result = this.evaluateMultiContainerPlan(plan, cargoNameColors, config);
      if (result) {
        const score = this.calculateMultiContainerScore(result, config);
        if (score > bestScore) {
          bestScore = score;
          bestResult = result;
        }
      }
    }
    
    return bestResult;
  }

  /**
   * 评估多集装箱方案
   */
  private evaluateMultiContainerPlan(
    plan: MultiContainerPlan,
    cargoNameColors?: Record<string, string>,
    config?: PackingConfig
  ): PackingResult | null {
    const allPackedItems: PackedItem[] = [];
    const allUnpackedItems: Cargo[] = [];
    const usedContainers: ContainerType[] = [];
    let totalCost = 0;
    let totalVolume = 0;
    let totalWeight = 0;
    let containerCount = 0;
    let totalContainerVolume = 0;
    
    // 为每个组寻找最佳集装箱
    for (const group of plan.groups) {
      if (group.length === 0) continue;
      
      let bestGroupResult: PackingResult | null = null;
      let bestContainerType: ContainerType | null = null;
      
      // 根据成本优化策略选择集装箱类型
      if (config?.costOptimizationStrategy && config.costOptimizationStrategy !== 'none') {
        // 使用成本优化引擎来选择最佳集装箱类型
        const optimizedResult = CostOptimizationEngine.applyOptimization(
          null,
          group,
          this.greedyAlgorithm,
          cargoNameColors,
          config
        );
        
        if (optimizedResult) {
          bestGroupResult = optimizedResult;
          bestContainerType = optimizedResult.containerType;
        }
      } else {
        // 默认策略：智能分离货物并选择合适的集装箱类型
        const maxStandardHeight = Math.max(...CONTAINER_TYPES.filter(ct => !ct.isFrameContainer).map(ct => ct.height));
        
        // 分离可装入标准箱的货物和需要框架箱的货物
        const standardCargos = group.filter(cargo => cargo.height <= maxStandardHeight);
        const frameCargos = group.filter(cargo => cargo.height > maxStandardHeight);
        
        console.log(`多集装箱算法：货物组分析 - 标准箱货物: ${standardCargos.length}种, 框架箱货物: ${frameCargos.length}种`);
        
        // 如果有标准箱货物，优先尝试标准箱
        if (standardCargos.length > 0) {
          const standardContainerTypes = CONTAINER_TYPES.filter(containerType => !containerType.isFrameContainer);
          
          for (const containerType of standardContainerTypes) {
            const groupResult = this.packIntoContainerType(
              standardCargos,
              containerType,
              cargoNameColors,
              config
            );
            
            if (groupResult && (!bestGroupResult || groupResult.utilization > bestGroupResult.utilization)) {
              bestGroupResult = groupResult;
              bestContainerType = containerType;
            }
          }
          
          // 如果还有框架箱货物，需要额外处理
          if (frameCargos.length > 0 && bestGroupResult) {
            const frameContainerTypes = CONTAINER_TYPES.filter(containerType => containerType.isFrameContainer);
            let bestFrameResult: PackingResult | null = null;
            
            for (const containerType of frameContainerTypes) {
              const frameResult = this.packIntoContainerType(
                frameCargos,
                containerType,
                cargoNameColors,
                config
              );
              
              if (frameResult && (!bestFrameResult || frameResult.utilization > bestFrameResult.utilization)) {
                bestFrameResult = frameResult;
              }
            }
            
            if (bestFrameResult) {
              // 合并结果并重新计算利用率
              const combinedContainers = [...bestGroupResult.containers, ...bestFrameResult.containers];
              const combinedPackedItems = [...bestGroupResult.packedItems, ...bestFrameResult.packedItems.map(item => ({
                ...item,
                containerIndex: item.containerIndex + (bestGroupResult?.containers?.length || 0)
              }))];
              const combinedTotalVolume = bestGroupResult.totalVolume + bestFrameResult.totalVolume;
              const combinedTotalWeight = bestGroupResult.totalWeight + bestFrameResult.totalWeight;
              
              // 重新计算利用率
              const totalContainerVolume = combinedContainers.reduce((sum, container) => 
                sum + (container.length * container.width * container.height), 0
              );
              const utilizationRate = totalContainerVolume > 0 ? parseFloat(((combinedTotalVolume / totalContainerVolume) * 100).toFixed(2)) : 0;
              
              // 计算实际空间占用率（包含间隙）
              const gap = config?.gap || 0.05;
              const totalOccupiedVolume = combinedPackedItems.reduce((sum, item) => {
                const cargoWithGap = (item.cargo.length + gap) * (item.cargo.width + gap) * (item.cargo.height + gap);
                return sum + cargoWithGap;
              }, 0);
              const spaceOccupancyRate = totalContainerVolume > 0 ? parseFloat(((totalOccupiedVolume / totalContainerVolume) * 100).toFixed(2)) : 0;
              
              bestGroupResult = {
                ...bestGroupResult,
                containerCount: bestGroupResult.containerCount + bestFrameResult.containerCount,
                totalCost: bestGroupResult.totalCost + bestFrameResult.totalCost,
                packedItems: combinedPackedItems,
                containers: combinedContainers,
                unpackedItems: [...bestGroupResult.unpackedItems, ...bestFrameResult.unpackedItems],
                totalVolume: combinedTotalVolume,
                totalWeight: combinedTotalWeight,
                utilization: utilizationRate,
                utilizationRate: utilizationRate,
                spaceOccupancyRate: spaceOccupancyRate
              };
            }
          }
        }
        
        // 如果标准箱方案失败，尝试全部使用框架箱
        if (!bestGroupResult) {
          const frameContainerTypes = CONTAINER_TYPES.filter(containerType => containerType.isFrameContainer);
          console.log('多集装箱算法：使用框架箱装载所有货物');
          
          for (const containerType of frameContainerTypes) {
            const groupResult = this.packIntoContainerType(
              group,
              containerType,
              cargoNameColors,
              config
            );
            
            if (groupResult && (!bestGroupResult || groupResult.utilization > bestGroupResult.utilization)) {
              bestGroupResult = groupResult;
              bestContainerType = containerType;
            }
          }
        }
        
        let feasibleContainerTypes: ContainerType[] = CONTAINER_TYPES; // 保持原有逻辑兼容性
        
        if (feasibleContainerTypes.length === 0) {
          console.warn(`货物组高度超限，没有合适的集装箱类型`);
          continue;
        }
        
        for (const containerType of feasibleContainerTypes) {
          const groupResult = this.packIntoContainerType(
            group,
            containerType,
            cargoNameColors,
            config
          );
          
          if (groupResult && (!bestGroupResult || 
               this.calculateMultiContainerScore(groupResult, config) > 
               this.calculateMultiContainerScore(bestGroupResult, config))) {
             bestGroupResult = groupResult;
             bestContainerType = containerType;
           }
        }
      }
      
      if (bestGroupResult && bestContainerType && bestGroupResult.packedItems.length > 0) {
        // 重新调整containerIndex，确保连续性
        const adjustedPackedItems = bestGroupResult.packedItems.map(item => ({
          ...item,
          containerIndex: item.containerIndex + containerCount
        }));
        
        allPackedItems.push(...adjustedPackedItems);
        allUnpackedItems.push(...bestGroupResult.unpackedItems);
        totalCost += bestGroupResult.totalCost;
        totalVolume += bestGroupResult.totalVolume;
        totalWeight += bestGroupResult.totalWeight;
        containerCount += bestGroupResult.containerCount;
        
        // 记录实际使用的集装箱类型
        for (let i = 0; i < bestGroupResult.containerCount; i++) {
          usedContainers.push(bestContainerType);
          totalContainerVolume += bestContainerType.length * bestContainerType.width * bestContainerType.height;
        }
        
        console.log(`货物组装载成功: 使用${bestGroupResult.containerCount}个${bestContainerType.name}集装箱，装载${bestGroupResult.packedItems.length}件货物，containerIndex范围: ${containerCount - bestGroupResult.containerCount} - ${containerCount - 1}`);
      } else {
        // 如果无法装载，将所有货物标记为未装载
        allUnpackedItems.push(...group);
        console.log(`货物组装载失败: ${group.length}件货物无法装载`);
      }
    }
    
    if (allPackedItems.length === 0) return null;
    
    // 计算总体利用率（框架集装箱不参与计算）
    let standardContainerVolume = 0;
    let standardCargoVolume = 0;
    
    // 只计算标准集装箱的体积和装载的货物体积
    usedContainers.forEach(container => {
      if (!container.isFrameContainer) {
        standardContainerVolume += container.length * container.width * container.height;
      }
    });
    
    // 只计算装在标准集装箱中的货物体积
    allPackedItems.forEach(item => {
      const containerIndex = item.containerIndex;
      const container = usedContainers[containerIndex];
      if (container && !container.isFrameContainer) {
        standardCargoVolume += item.cargo.length * item.cargo.width * item.cargo.height;
      }
    });
    
    // 只基于标准集装箱计算利用率
    const utilization = standardContainerVolume > 0 ? parseFloat(((standardCargoVolume / standardContainerVolume) * 100).toFixed(2)) : 0;
    
    // 计算实际空间占用率（包含间隙，框架集装箱不参与计算）
    const gap = config?.gap || 0.05;
    const standardOccupiedVolume = allPackedItems.reduce((sum, item) => {
      // 只计算装在标准集装箱中的货物
      const containerIndex = item.containerIndex;
      const container = usedContainers[containerIndex];
      if (container && !container.isFrameContainer) {
        const cargoWithGap = (item.cargo.length + gap) * (item.cargo.width + gap) * (item.cargo.height + gap);
        return sum + cargoWithGap;
      }
      return sum;
    }, 0);
    
    const spaceOccupancyRate = standardContainerVolume > 0 ? parseFloat(((standardOccupiedVolume / standardContainerVolume) * 100).toFixed(2)) : 0;
    
    // 选择最常用的集装箱类型作为代表
    const containerTypeMap = new Map<string, number>();
    usedContainers.forEach(container => {
      const count = containerTypeMap.get(container.name) || 0;
      containerTypeMap.set(container.name, count + 1);
    });
    
    let mostUsedContainer = CONTAINER_TYPES[0];
    let maxCount = 0;
    for (const [name, count] of containerTypeMap) {
      if (count > maxCount) {
        maxCount = count;
        mostUsedContainer = CONTAINER_TYPES.find(c => c.name === name) || CONTAINER_TYPES[0];
      }
    }
    
    return {
      packedItems: allPackedItems,
      unpackedItems: allUnpackedItems,
      containerType: mostUsedContainer,
      containers: usedContainers,
      utilization,
      utilizationRate: utilization,
      spaceOccupancyRate: spaceOccupancyRate,
      totalCost,
      totalVolume,
      totalWeight,
      containerCount,
      algorithm: 'multi-container',
      mode: 'multi_container',
      gap: gap
    };
  }

  /**
   * 计算多集装箱评分
   */
  private calculateMultiContainerScore(result: PackingResult, config?: PackingConfig): number {
    // 利用率评分
    const utilizationScore = result.utilization;
    
    // 成本效益评分
    const costEfficiencyScore = result.totalCost > 0 ? 
      Math.min((result.totalVolume / result.totalCost) * 10, 100) : 100;
    
    // 装载完成率评分
    const totalItems = result.packedItems.length + result.unpackedItems.length;
    const completionScore = totalItems > 0 ? 
      (result.packedItems.length / totalItems) * 100 : 100;
    
    // 集装箱数量惩罚（数量越多惩罚越大）
    const containerPenalty = Math.max(0, 100 - result.containerCount * 10);
    
    // 根据成本优化策略调整权重
    let utilizationWeight = 0.3;
    let costWeight = 0.25;
    let completionWeight = 0.25;
    let containerWeight = 0.2;
    
    if (config?.costOptimizationStrategy) {
      switch (config.costOptimizationStrategy) {
        case 'min_containers':
          containerWeight = 0.4;
          utilizationWeight = 0.3;
          costWeight = 0.15;
          completionWeight = 0.15;
          break;
        case 'min_cost':
          costWeight = 0.4;
          utilizationWeight = 0.25;
          containerWeight = 0.2;
          completionWeight = 0.15;
          break;
        case 'max_utilization':
          utilizationWeight = 0.5;
          completionWeight = 0.25;
          costWeight = 0.15;
          containerWeight = 0.1;
          break;
        case 'none':
         default:
           utilizationWeight = 0.3;
           costWeight = 0.25;
           completionWeight = 0.25;
           containerWeight = 0.2;
           break;
      }
    }
    
    // 综合评分
    return utilizationScore * utilizationWeight + 
           costEfficiencyScore * costWeight + 
           completionScore * completionWeight + 
           containerPenalty * containerWeight;
  }
}

/**
 * 多集装箱方案接口
 */
interface MultiContainerPlan {
  type: string;
  groups: Cargo[][];
  description: string;
}