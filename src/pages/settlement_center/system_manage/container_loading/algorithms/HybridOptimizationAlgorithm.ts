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
  private readonly maxExecutionTime = 45000; // 最大执行时间（45秒）
  
  // 简单的结果缓存
  private resultCache = new Map<string, PackingResult>();

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

    const startTime = Date.now();
    
    // 生成缓存键
    const cacheKey = this.generateCacheKey(cargos, config);
    if (this.resultCache.has(cacheKey)) {
      console.log('混合算法：使用缓存结果');
      return this.resultCache.get(cacheKey)!;
    }

    // 根据问题规模选择合适的算法组合策略
    const problemSize = this.analyzeProblemSize(cargos);
    
    let result: PackingResult | null = null;
    
    switch (problemSize) {
      case 'small':
        result = this.executeSmallProblemStrategy(cargos, cargoNameColors, config, startTime);
        break;
      case 'medium':
        result = this.executeMediumProblemStrategy(cargos, cargoNameColors, config, startTime);
        break;
      case 'large':
        result = this.executeLargeProblemStrategy(cargos, cargoNameColors, config, startTime);
        break;
      default:
        result = this.executeDefaultStrategy(cargos, cargoNameColors, config, startTime);
        break;
    }
    
    // 缓存结果
    if (result) {
      this.resultCache.set(cacheKey, result);
      // 限制缓存大小
      if (this.resultCache.size > 30) {
        const firstKey = this.resultCache.keys().next().value;
        if (firstKey) {
          this.resultCache.delete(firstKey);
        }
      }
    }
    
    return result;
  }

  /**
   * 生成缓存键
   */
  private generateCacheKey(cargos: Cargo[], config?: PackingConfig): string {
    const cargoKey = cargos.map(c => `${c.id}-${c.quantity}`).sort().join(',');
    const configKey = config?.containerType?.name || 'auto';
    return `hybrid-${cargoKey}-${configKey}`;
  }

  /**
   * 分析问题规模
   */
  private analyzeProblemSize(cargos: Cargo[]): 'small' | 'medium' | 'large' {
    const cargoCount = cargos.length;
    const totalVolume = cargos.reduce((sum, cargo) => {
      return sum + (cargo.length * cargo.width * cargo.height * cargo.quantity);
    }, 0);
    
    // 优化：调整阈值，减少复杂算法的使用
    if (cargoCount <= 20 && totalVolume <= 200) {
      return 'small';
    } else if (cargoCount <= 100 && totalVolume <= 2000) {
      return 'medium';
    } else {
      return 'large';
    }
  }

  /**
   * 小规模问题策略：优先使用快速算法
   */
  private executeSmallProblemStrategy(
    cargos: Cargo[],
    cargoNameColors?: Record<string, string>,
    config?: PackingConfig,
    startTime?: number
  ): PackingResult | null {
    // 优化：小规模问题也优先使用贪心算法，只在必要时使用复杂算法
    const greedyResult = this.greedyAlgorithm.execute(cargos, cargoNameColors, config);
    
    // 如果贪心算法结果不理想，再尝试模拟退火
    if (!greedyResult || greedyResult.utilization < 70) {
      // 检查时间限制
      if (startTime && Date.now() - startTime > this.maxExecutionTime) {
        console.log('混合算法：达到时间限制，返回贪心结果');
        return greedyResult ? { ...greedyResult, algorithm: 'hybrid' } : null;
      }
      
      const simulatedResult = this.simulatedAnnealingAlgorithm.execute(cargos, cargoNameColors, config);
      const bestResult = this.selectBestResult([greedyResult, simulatedResult]);
      return bestResult ? {
        ...bestResult,
        algorithm: 'hybrid'
      } : null;
    }
    
    return greedyResult ? {
      ...greedyResult,
      algorithm: 'hybrid'
    } : null;
  }

  /**
   * 中等规模问题策略：平衡质量和速度
   */
  private executeMediumProblemStrategy(
    cargos: Cargo[],
    cargoNameColors?: Record<string, string>,
    config?: PackingConfig,
    startTime?: number
  ): PackingResult | null {
    // 优化：简化策略，减少算法调用
    
    // 第一阶段：使用贪心算法快速获得初始解
    const greedyResult = this.greedyAlgorithm.execute(cargos, cargoNameColors, config);
    
    // 只有在贪心算法结果不理想时才使用模拟退火
    if (!greedyResult || greedyResult.utilization < 60 || greedyResult.unpackedItems.length > 0) {
      // 检查时间限制
      if (startTime && Date.now() - startTime > this.maxExecutionTime) {
        console.log('混合算法：达到时间限制，返回贪心结果');
        return greedyResult ? { ...greedyResult, algorithm: 'hybrid' } : null;
      }
      
      const simulatedResult = this.simulatedAnnealingAlgorithm.execute(cargos, cargoNameColors, config);
      const bestResult = this.selectBestResult([greedyResult, simulatedResult]);
      
      return bestResult ? {
        ...bestResult,
        algorithm: 'hybrid'
      } : null;
    }
    
    return greedyResult ? {
      ...greedyResult,
      algorithm: 'hybrid'
    } : null;
  }

  /**
   * 大规模问题策略：优先考虑速度
   */
  private executeLargeProblemStrategy(
    cargos: Cargo[],
    cargoNameColors?: Record<string, string>,
    config?: PackingConfig,
    startTime?: number
  ): PackingResult | null {
    // 优化：大规模问题直接使用贪心算法，避免复杂的分治策略
    const greedyResult = this.greedyAlgorithm.execute(cargos, cargoNameColors, config);
    
    return greedyResult ? {
      ...greedyResult,
      algorithm: 'hybrid'
    } : null;
  }

  /**
   * 默认策略：优先使用快速算法
   */
  private executeDefaultStrategy(
    cargos: Cargo[],
    cargoNameColors?: Record<string, string>,
    config?: PackingConfig,
    startTime?: number
  ): PackingResult | null {
    // 优化：默认策略也优先使用贪心算法
    const greedyResult = this.greedyAlgorithm.execute(cargos, cargoNameColors, config);
    
    // 只有在结果不理想时才尝试其他算法
    if (!greedyResult || greedyResult.utilization < 50) {
      // 检查时间限制
      if (startTime && Date.now() - startTime > this.maxExecutionTime) {
        console.log('混合算法：达到时间限制，返回贪心结果');
        return greedyResult ? { ...greedyResult, algorithm: 'hybrid' } : null;
      }
      
      const simulatedResult = this.simulatedAnnealingAlgorithm.execute(cargos, cargoNameColors, config);
      const bestResult = this.selectBestResult([greedyResult, simulatedResult]);
      
      return bestResult ? {
        ...bestResult,
        algorithm: 'hybrid'
      } : null;
    }
    
    return greedyResult ? {
      ...greedyResult,
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