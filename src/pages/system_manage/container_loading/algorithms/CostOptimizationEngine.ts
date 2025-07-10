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

    // 按体积从大到小排序集装箱类型，优先尝试大容器
    const sortedContainerTypes = [...CONTAINER_TYPES].sort((a, b) => {
      const volumeA = a.length * a.width * a.height;
      const volumeB = b.length * b.width * b.height;
      return volumeB - volumeA;
    });

    for (const containerType of sortedContainerTypes) {
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

    // 按成本效益比排序（体积/成本）
    const sortedContainerTypes = [...CONTAINER_TYPES].sort((a, b) => {
      const efficiencyA = (a.length * a.width * a.height) / a.cost;
      const efficiencyB = (b.length * b.width * b.height) / b.cost;
      return efficiencyB - efficiencyA;
    });

    for (const containerType of sortedContainerTypes) {
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

    for (const containerType of CONTAINER_TYPES) {
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

    for (const containerType of CONTAINER_TYPES) {
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