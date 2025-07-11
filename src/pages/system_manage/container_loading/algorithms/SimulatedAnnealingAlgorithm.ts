import { Cargo, PackingResult, PackingConfig } from '../types';
import { CONTAINER_TYPES } from '../constants';
import { BaseAlgorithm } from './base/BaseAlgorithm';

/**
 * 模拟退火算法
 * 平衡速度与质量的优化算法
 */
export class SimulatedAnnealingAlgorithm extends BaseAlgorithm {
  private readonly initialTemperature = 1000; // 初始温度
  private readonly finalTemperature = 1; // 最终温度
  private readonly coolingRate = 0.95; // 冷却率
  private readonly maxIterationsPerTemp = 100; // 每个温度的最大迭代次数

  /**
   * 执行模拟退火算法
   * @param cargos 货物列表
   * @param cargoNameColors 货物名称颜色映射
   * @param config 装箱配置
   * @returns 装箱结果
   */
  execute(cargos: Cargo[], cargoNameColors?: Record<string, string>, config?: PackingConfig): PackingResult | null {
    if (!cargos.length) return null;

    // 如果指定了集装箱类型，直接使用
    if (config?.containerType) {
      return this.optimizeWithSimulatedAnnealing(cargos, [config.containerType], cargoNameColors, config);
    }

    // 使用模拟退火算法优化所有集装箱类型
    return this.optimizeWithSimulatedAnnealing(cargos, CONTAINER_TYPES, cargoNameColors, config);
  }

  /**
   * 使用模拟退火算法优化装箱
   */
  private optimizeWithSimulatedAnnealing(
    cargos: Cargo[],
    containerTypes: any[],
    cargoNameColors?: Record<string, string>,
    config?: PackingConfig
  ): PackingResult | null {
    let globalBestResult: PackingResult | null = null;
    let globalBestEnergy = Infinity;

    // 对每种集装箱类型运行模拟退火算法
    for (const containerType of containerTypes) {
      const result = this.runSimulatedAnnealing(cargos, containerType, cargoNameColors, config);
      
      if (result) {
        const energy = this.calculateEnergy(result);
        
        if (energy < globalBestEnergy) {
          globalBestEnergy = energy;
          globalBestResult = {
            ...result,
            algorithm: 'simulated'
          };
        }
      }
    }

    return globalBestResult;
  }

  /**
   * 运行模拟退火算法
   */
  private runSimulatedAnnealing(
    cargos: Cargo[],
    containerType: any,
    cargoNameColors?: Record<string, string>,
    config?: PackingConfig
  ): PackingResult | null {
    // 初始解：随机排序的货物
    let currentSolution = this.generateInitialSolution(cargos);
    let currentResult = this.packIntoContainerType(currentSolution, containerType, cargoNameColors, config);
    
    if (!currentResult) return null;
    
    let currentEnergy = this.calculateEnergy(currentResult);
    
    // 最佳解
    let bestSolution = [...currentSolution];
    let bestResult = { ...currentResult };
    let bestEnergy = currentEnergy;
    
    let temperature = this.initialTemperature;
    
    // 模拟退火主循环
    while (temperature > this.finalTemperature) {
      for (let iteration = 0; iteration < this.maxIterationsPerTemp; iteration++) {
        // 生成邻域解
        const neighborSolution = this.generateNeighbor(currentSolution);
        const neighborResult = this.packIntoContainerType(neighborSolution, containerType, cargoNameColors, config);
        
        if (neighborResult) {
          const neighborEnergy = this.calculateEnergy(neighborResult);
          
          // 计算能量差
          const deltaEnergy = neighborEnergy - currentEnergy;
          
          // 接受准则
          if (deltaEnergy < 0 || Math.random() < Math.exp(-deltaEnergy / temperature)) {
            currentSolution = neighborSolution;
            currentResult = neighborResult;
            currentEnergy = neighborEnergy;
            
            // 更新最佳解
            if (currentEnergy < bestEnergy) {
              bestSolution = [...currentSolution];
              bestResult = { ...currentResult };
              bestEnergy = currentEnergy;
            }
          }
        }
      }
      
      // 降温
      temperature *= this.coolingRate;
    }
    
    return bestResult;
  }

  /**
   * 生成初始解
   */
  private generateInitialSolution(cargos: Cargo[]): Cargo[] {
    // 使用启发式方法生成初始解：按体积从大到小排序
    return [...cargos].sort((a, b) => {
      const volumeA = a.length * a.width * a.height;
      const volumeB = b.length * b.width * b.height;
      return volumeB - volumeA;
    });
  }

  /**
   * 生成邻域解
   */
  private generateNeighbor(solution: Cargo[]): Cargo[] {
    const neighbor = [...solution];
    const operationType = Math.random();
    
    if (operationType < 0.5) {
      // 交换操作：随机交换两个货物的位置
      const index1 = Math.floor(Math.random() * neighbor.length);
      const index2 = Math.floor(Math.random() * neighbor.length);
      [neighbor[index1], neighbor[index2]] = [neighbor[index2], neighbor[index1]];
    } else if (operationType < 0.8) {
      // 插入操作：将一个货物移动到另一个位置
      const fromIndex = Math.floor(Math.random() * neighbor.length);
      const toIndex = Math.floor(Math.random() * neighbor.length);
      const item = neighbor.splice(fromIndex, 1)[0];
      neighbor.splice(toIndex, 0, item);
    } else {
      // 逆序操作：逆序一个子序列
      const start = Math.floor(Math.random() * neighbor.length);
      const end = Math.floor(Math.random() * (neighbor.length - start)) + start;
      const subArray = neighbor.slice(start, end + 1).reverse();
      neighbor.splice(start, end - start + 1, ...subArray);
    }
    
    return neighbor;
  }

  /**
   * 计算能量（目标函数）
   * 能量越低表示解越好
   */
  private calculateEnergy(result: PackingResult): number {
    // 多目标优化：最小化成本，最大化利用率，最大化装载完成度
    const costPenalty = result.totalCost; // 成本惩罚
    const utilizationReward = 100 - result.utilization; // 利用率奖励（转换为惩罚）
    const completionPenalty = this.calculateCompletionPenalty(result); // 装载完成度惩罚
    const containerCountPenalty = result.containerCount * 50; // 集装箱数量惩罚
    
    // 加权计算总能量
    return costPenalty * 0.3 + utilizationReward * 0.3 + completionPenalty * 0.3 + containerCountPenalty * 0.1;
  }

  /**
   * 计算装载完成度惩罚
   */
  private calculateCompletionPenalty(result: PackingResult): number {
    const totalItems = result.packedItems.length + result.unpackedItems.length;
    if (totalItems === 0) return 0;
    
    const unpackedRatio = result.unpackedItems.length / totalItems;
    return unpackedRatio * 1000; // 未装载货物的惩罚
  }

  /**
   * 计算接受概率
   */
  private calculateAcceptanceProbability(deltaEnergy: number, temperature: number): number {
    if (deltaEnergy < 0) return 1.0; // 更好的解总是被接受
    return Math.exp(-deltaEnergy / temperature);
  }

  /**
   * 自适应温度调整
   */
  private adaptiveTemperatureAdjustment(temperature: number, acceptanceRate: number): number {
    // 如果接受率太低，减慢冷却速度
    if (acceptanceRate < 0.1) {
      return temperature * 0.98;
    }
    // 如果接受率太高，加快冷却速度
    else if (acceptanceRate > 0.9) {
      return temperature * 0.9;
    }
    // 正常冷却
    else {
      return temperature * this.coolingRate;
    }
  }
}