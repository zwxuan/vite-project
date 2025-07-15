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

    // 预检查：计算货物的最大高度，过滤掉高度不足的集装箱类型
    const maxCargoHeight = Math.max(...cargos.map(cargo => cargo.height));
    const gap = 0.05; // 默认间隙
    
    const feasibleContainerTypes = CONTAINER_TYPES.filter(containerType => {
      const canFitSingleCargo = containerType.height >= (maxCargoHeight + gap);
      if (!canFitSingleCargo) {
        console.log(`贪心算法：集装箱类型 ${containerType.name} 高度不足，无法容纳最高货物 ${maxCargoHeight}m`);
      }
      return canFitSingleCargo;
    });
    
    if (feasibleContainerTypes.length === 0) {
      console.warn('贪心算法：没有找到能够容纳货物高度的集装箱类型');
      return null;
    }

    // 贪心策略：按体积效率排序可行的集装箱类型
    const sortedContainerTypes = [...feasibleContainerTypes].sort((a, b) => {
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
      const result = this.packIntoContainerType(sortedCargos, containerType, cargoNameColors, config);
      
      if (result) {
        // 贪心评分：综合考虑利用率和成本效益
        const score = this.calculateGreedyScore(result);
        
        if (score > bestScore) {
          bestScore = score;
          bestResult = {
            ...result,
            algorithm: 'greedy'
          };
        }
      }
    }

    return bestResult;
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
    if (result.totalCost === 0) return 100;
    
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
    
    if (totalCargos === 0) return 100;
    
    // 装载效率 = 已装载货物数量 / 总货物数量
    return (totalItems / totalCargos) * 100;
  }
}