import { Cargo, PackingResult, PackingConfig } from '../types';
import { CONTAINER_TYPES } from '../constants';
import { BaseAlgorithm } from './base/BaseAlgorithm';
import { GreedyAlgorithm } from './GreedyAlgorithm';
import { GeneticAlgorithm } from './GeneticAlgorithm';
import { SimulatedAnnealingAlgorithm } from './SimulatedAnnealingAlgorithm';

/**
 * 混合算法
 * 结合多种算法优势的推荐方案
 */
export class HybridOptimizationAlgorithm extends BaseAlgorithm {
  private greedyAlgorithm: GreedyAlgorithm;
  private geneticAlgorithm: GeneticAlgorithm;
  private simulatedAnnealingAlgorithm: SimulatedAnnealingAlgorithm;

  constructor() {
    super();
    this.greedyAlgorithm = new GreedyAlgorithm();
    this.geneticAlgorithm = new GeneticAlgorithm();
    this.simulatedAnnealingAlgorithm = new SimulatedAnnealingAlgorithm();
  }

  /**
   * 执行混合算法
   * @param cargos 货物列表
   * @param cargoNameColors 货物名称颜色映射
   * @param config 装箱配置
   * @returns 装箱结果
   */
  execute(cargos: Cargo[], cargoNameColors?: Record<string, string>, config?: PackingConfig): PackingResult | null {
    if (!cargos.length) return null;

    // 根据问题规模选择合适的算法组合策略
    const problemSize = this.analyzeProblemSize(cargos);
    
    switch (problemSize) {
      case 'small':
        return this.executeSmallProblemStrategy(cargos, cargoNameColors, config);
      case 'medium':
        return this.executeMediumProblemStrategy(cargos, cargoNameColors, config);
      case 'large':
        return this.executeLargeProblemStrategy(cargos, cargoNameColors, config);
      default:
        return this.executeDefaultStrategy(cargos, cargoNameColors, config);
    }
  }

  /**
   * 分析问题规模
   */
  private analyzeProblemSize(cargos: Cargo[]): 'small' | 'medium' | 'large' {
    const cargoCount = cargos.length;
    const totalVolume = cargos.reduce((sum, cargo) => {
      return sum + (cargo.length * cargo.width * cargo.height * cargo.quantity);
    }, 0);
    
    if (cargoCount <= 10 && totalVolume <= 100) {
      return 'small';
    } else if (cargoCount <= 50 && totalVolume <= 1000) {
      return 'medium';
    } else {
      return 'large';
    }
  }

  /**
   * 小规模问题策略：使用遗传算法获得最优解
   */
  private executeSmallProblemStrategy(
    cargos: Cargo[],
    cargoNameColors?: Record<string, string>,
    config?: PackingConfig
  ): PackingResult | null {
    // 小规模问题可以承受较高的计算成本，追求最优解
    const geneticResult = this.geneticAlgorithm.execute(cargos, cargoNameColors, config);
    const simulatedResult = this.simulatedAnnealingAlgorithm.execute(cargos, cargoNameColors, config);
    
    // 选择更好的结果
    const bestResult = this.selectBestResult([geneticResult, simulatedResult]);
    
    return bestResult ? {
      ...bestResult,
      algorithm: 'hybrid'
    } : null;
  }

  /**
   * 中等规模问题策略：平衡质量和速度
   */
  private executeMediumProblemStrategy(
    cargos: Cargo[],
    cargoNameColors?: Record<string, string>,
    config?: PackingConfig
  ): PackingResult | null {
    // 中等规模问题使用多阶段优化
    
    // 第一阶段：使用贪心算法快速获得初始解
    const greedyResult = this.greedyAlgorithm.execute(cargos, cargoNameColors, config);
    
    // 第二阶段：使用模拟退火算法优化
    const simulatedResult = this.simulatedAnnealingAlgorithm.execute(cargos, cargoNameColors, config);
    
    // 第三阶段：局部搜索优化
    const optimizedResult = this.localSearchOptimization(
      this.selectBestResult([greedyResult, simulatedResult]),
      cargos,
      cargoNameColors,
      config
    );
    
    return optimizedResult ? {
      ...optimizedResult,
      algorithm: 'hybrid'
    } : null;
  }

  /**
   * 大规模问题策略：优先考虑速度
   */
  private executeLargeProblemStrategy(
    cargos: Cargo[],
    cargoNameColors?: Record<string, string>,
    config?: PackingConfig
  ): PackingResult | null {
    // 大规模问题优先使用快速算法
    
    // 第一阶段：分治策略，将大问题分解为小问题
    const subProblems = this.divideAndConquer(cargos);
    const subResults: PackingResult[] = [];
    
    for (const subProblem of subProblems) {
      const greedyResult = this.greedyAlgorithm.execute(subProblem, cargoNameColors, config);
      if (greedyResult) {
        subResults.push(greedyResult);
      }
    }
    
    // 第二阶段：合并子问题结果
    const mergedResult = this.mergeSubResults(subResults, cargos, cargoNameColors, config);
    
    return mergedResult ? {
      ...mergedResult,
      algorithm: 'hybrid'
    } : null;
  }

  /**
   * 默认策略：综合考虑所有算法
   */
  private executeDefaultStrategy(
    cargos: Cargo[],
    cargoNameColors?: Record<string, string>,
    config?: PackingConfig
  ): PackingResult | null {
    const results: (PackingResult | null)[] = [];
    
    // 并行运行多种算法（模拟并行）
    results.push(this.greedyAlgorithm.execute(cargos, cargoNameColors, config));
    results.push(this.simulatedAnnealingAlgorithm.execute(cargos, cargoNameColors, config));
    
    // 选择最佳结果
    const bestResult = this.selectBestResult(results);
    
    return bestResult ? {
      ...bestResult,
      algorithm: 'hybrid'
    } : null;
  }

  /**
   * 选择最佳结果
   */
  private selectBestResult(results: (PackingResult | null)[]): PackingResult | null {
    const validResults = results.filter(result => result !== null) as PackingResult[];
    
    if (validResults.length === 0) return null;
    
    // 综合评分选择最佳结果
    let bestResult = validResults[0];
    let bestScore = this.calculateHybridScore(bestResult);
    
    for (let i = 1; i < validResults.length; i++) {
      const score = this.calculateHybridScore(validResults[i]);
      if (score > bestScore) {
        bestScore = score;
        bestResult = validResults[i];
      }
    }
    
    return bestResult;
  }

  /**
   * 计算混合评分
   */
  private calculateHybridScore(result: PackingResult): number {
    // 综合考虑多个指标
    const utilizationScore = result.utilization; // 利用率 (0-100)
    const costEfficiencyScore = this.calculateCostEfficiency(result); // 成本效益 (0-100)
    const completionScore = this.calculateCompletionRate(result); // 装载完成率 (0-100)
    const containerEfficiencyScore = this.calculateContainerEfficiency(result); // 集装箱效率 (0-100)
    
    // 加权计算总分
    return utilizationScore * 0.3 + 
           costEfficiencyScore * 0.25 + 
           completionScore * 0.25 + 
           containerEfficiencyScore * 0.2;
  }

  /**
   * 局部搜索优化
   */
  private localSearchOptimization(
    initialResult: PackingResult | null,
    cargos: Cargo[],
    cargoNameColors?: Record<string, string>,
    config?: PackingConfig
  ): PackingResult | null {
    if (!initialResult) return null;
    
    // 简单的局部搜索：尝试重新排列未装载的货物
    if (initialResult.unpackedItems.length === 0) {
      return initialResult;
    }
    
    // 尝试不同的货物排序
    const sortingStrategies = [
      (items: Cargo[]) => items.sort((a, b) => (b.length * b.width * b.height) - (a.length * a.width * a.height)), // 按体积降序
      (items: Cargo[]) => items.sort((a, b) => b.weight - a.weight), // 按重量降序
      (items: Cargo[]) => items.sort((a, b) => a.length - b.length), // 按长度升序
    ];
    
    let bestResult = initialResult;
    let bestScore = this.calculateHybridScore(bestResult);
    
    for (const strategy of sortingStrategies) {
      const sortedCargos = strategy([...cargos]);
      const result = this.packIntoContainerType(
        sortedCargos,
        initialResult.containerType,
        cargoNameColors,
        config
      );
      
      if (result) {
        const score = this.calculateHybridScore(result);
        if (score > bestScore) {
          bestScore = score;
          bestResult = result;
        }
      }
    }
    
    return bestResult;
  }

  /**
   * 分治策略
   */
  private divideAndConquer(cargos: Cargo[]): Cargo[][] {
    const subProblems: Cargo[][] = [];
    const chunkSize = Math.ceil(cargos.length / 3); // 分成3个子问题
    
    for (let i = 0; i < cargos.length; i += chunkSize) {
      subProblems.push(cargos.slice(i, i + chunkSize));
    }
    
    return subProblems;
  }

  /**
   * 合并子问题结果
   */
  private mergeSubResults(
    subResults: PackingResult[],
    originalCargos: Cargo[],
    cargoNameColors?: Record<string, string>,
    config?: PackingConfig
  ): PackingResult | null {
    if (subResults.length === 0) return null;
    
    // 简单合并：选择最佳的单个结果
    // 在实际应用中，这里可以实现更复杂的合并策略
    return this.selectBestResult(subResults);
  }

  /**
   * 计算成本效益
   */
  private calculateCostEfficiency(result: PackingResult): number {
    if (result.totalCost === 0) return 100;
    const efficiency = (result.totalVolume / result.totalCost) * 10;
    return Math.min(efficiency, 100);
  }

  /**
   * 计算装载完成率
   */
  private calculateCompletionRate(result: PackingResult): number {
    const totalItems = result.packedItems.length + result.unpackedItems.length;
    if (totalItems === 0) return 100;
    return (result.packedItems.length / totalItems) * 100;
  }

  /**
   * 计算集装箱效率
   */
  private calculateContainerEfficiency(result: PackingResult): number {
    // 集装箱数量越少效率越高
    const maxContainers = CONTAINER_TYPES.length;
    return Math.max(0, (maxContainers - result.containerCount) / maxContainers * 100);
  }
}