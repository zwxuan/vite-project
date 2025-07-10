import { Cargo, PackingResult, PackingConfig } from '../types';
import { CONTAINER_TYPES } from '../constants';
import { BaseAlgorithm } from './base/BaseAlgorithm';

/**
 * 遗传算法
 * 全局优化，寻找最优装箱方案
 */
export class GeneticAlgorithm extends BaseAlgorithm {
  private readonly populationSize = 20; // 种群大小
  private readonly generations = 50; // 进化代数
  private readonly mutationRate = 0.1; // 变异率
  private readonly crossoverRate = 0.8; // 交叉率

  /**
   * 执行遗传算法
   * @param cargos 货物列表
   * @param cargoNameColors 货物名称颜色映射
   * @param config 装箱配置
   * @returns 装箱结果
   */
  execute(cargos: Cargo[], cargoNameColors?: Record<string, string>, config?: PackingConfig): PackingResult | null {
    if (!cargos.length) return null;

    // 如果指定了集装箱类型，直接使用
    if (config?.containerType) {
      return this.optimizeWithGenetic(cargos, [config.containerType], cargoNameColors, config);
    }

    // 使用遗传算法优化所有集装箱类型
    return this.optimizeWithGenetic(cargos, CONTAINER_TYPES, cargoNameColors, config);
  }

  /**
   * 使用遗传算法优化装箱
   */
  private optimizeWithGenetic(
    cargos: Cargo[],
    containerTypes: any[],
    cargoNameColors?: Record<string, string>,
    config?: PackingConfig
  ): PackingResult | null {
    let bestResult: PackingResult | null = null;
    let bestFitness = -1;

    // 对每种集装箱类型运行遗传算法
    for (const containerType of containerTypes) {
      const result = this.runGeneticOptimization(cargos, containerType, cargoNameColors, config);
      
      if (result) {
        const fitness = this.calculateFitness(result);
        
        if (fitness > bestFitness) {
          bestFitness = fitness;
          bestResult = {
            ...result,
            algorithm: 'genetic'
          };
        }
      }
    }

    return bestResult;
  }

  /**
   * 运行遗传算法优化
   */
  private runGeneticOptimization(
    cargos: Cargo[],
    containerType: any,
    cargoNameColors?: Record<string, string>,
    config?: PackingConfig
  ): PackingResult | null {
    // 初始化种群
    let population = this.initializePopulation(cargos);
    let bestIndividual: Cargo[] | null = null;
    let bestFitness = -1;

    // 进化过程
    for (let generation = 0; generation < this.generations; generation++) {
      // 评估种群适应度
      const fitnessScores = population.map(individual => {
        const result = this.packIntoContainerType(individual, containerType, cargoNameColors, config);
        return result ? this.calculateFitness(result) : 0;
      });

      // 记录最佳个体
      const maxFitnessIndex = fitnessScores.indexOf(Math.max(...fitnessScores));
      if (fitnessScores[maxFitnessIndex] > bestFitness) {
        bestFitness = fitnessScores[maxFitnessIndex];
        bestIndividual = [...population[maxFitnessIndex]];
      }

      // 选择、交叉、变异
      population = this.evolvePopulation(population, fitnessScores);
    }

    // 返回最佳结果
    if (bestIndividual) {
      return this.packIntoContainerType(bestIndividual, containerType, cargoNameColors, config);
    }

    return null;
  }

  /**
   * 初始化种群
   */
  private initializePopulation(cargos: Cargo[]): Cargo[][] {
    const population: Cargo[][] = [];
    
    for (let i = 0; i < this.populationSize; i++) {
      // 创建不同的货物排序作为个体
      const individual = [...cargos];
      
      // 随机打乱顺序
      for (let j = individual.length - 1; j > 0; j--) {
        const k = Math.floor(Math.random() * (j + 1));
        [individual[j], individual[k]] = [individual[k], individual[j]];
      }
      
      population.push(individual);
    }
    
    return population;
  }

  /**
   * 进化种群
   */
  private evolvePopulation(population: Cargo[][], fitnessScores: number[]): Cargo[][] {
    const newPopulation: Cargo[][] = [];
    
    // 精英保留：保留最佳个体
    const bestIndex = fitnessScores.indexOf(Math.max(...fitnessScores));
    newPopulation.push([...population[bestIndex]]);
    
    // 生成新个体
    while (newPopulation.length < this.populationSize) {
      // 选择父母
      const parent1 = this.tournamentSelection(population, fitnessScores);
      const parent2 = this.tournamentSelection(population, fitnessScores);
      
      // 交叉
      let offspring1, offspring2;
      if (Math.random() < this.crossoverRate) {
        [offspring1, offspring2] = this.crossover(parent1, parent2);
      } else {
        offspring1 = [...parent1];
        offspring2 = [...parent2];
      }
      
      // 变异
      if (Math.random() < this.mutationRate) {
        offspring1 = this.mutate(offspring1);
      }
      if (Math.random() < this.mutationRate) {
        offspring2 = this.mutate(offspring2);
      }
      
      newPopulation.push(offspring1);
      if (newPopulation.length < this.populationSize) {
        newPopulation.push(offspring2);
      }
    }
    
    return newPopulation;
  }

  /**
   * 锦标赛选择
   */
  private tournamentSelection(population: Cargo[][], fitnessScores: number[]): Cargo[] {
    const tournamentSize = 3;
    let bestIndex = Math.floor(Math.random() * population.length);
    
    for (let i = 1; i < tournamentSize; i++) {
      const candidateIndex = Math.floor(Math.random() * population.length);
      if (fitnessScores[candidateIndex] > fitnessScores[bestIndex]) {
        bestIndex = candidateIndex;
      }
    }
    
    return [...population[bestIndex]];
  }

  /**
   * 交叉操作（顺序交叉）
   */
  private crossover(parent1: Cargo[], parent2: Cargo[]): [Cargo[], Cargo[]] {
    const length = parent1.length;
    const start = Math.floor(Math.random() * length);
    const end = Math.floor(Math.random() * (length - start)) + start;
    
    const offspring1: Cargo[] = new Array(length);
    const offspring2: Cargo[] = new Array(length);
    
    // 复制选定区间
    for (let i = start; i <= end; i++) {
      offspring1[i] = parent1[i];
      offspring2[i] = parent2[i];
    }
    
    // 填充剩余位置
    this.fillRemainingPositions(offspring1, parent2, start, end);
    this.fillRemainingPositions(offspring2, parent1, start, end);
    
    return [offspring1, offspring2];
  }

  /**
   * 填充剩余位置
   */
  private fillRemainingPositions(offspring: Cargo[], parent: Cargo[], start: number, end: number): void {
    const used = new Set(offspring.slice(start, end + 1).map(cargo => cargo?.id).filter(Boolean));
    let parentIndex = 0;
    
    for (let i = 0; i < offspring.length; i++) {
      if (i < start || i > end) {
        while (parentIndex < parent.length && used.has(parent[parentIndex].id)) {
          parentIndex++;
        }
        if (parentIndex < parent.length) {
          offspring[i] = parent[parentIndex];
          used.add(parent[parentIndex].id);
          parentIndex++;
        }
      }
    }
  }

  /**
   * 变异操作（交换变异）
   */
  private mutate(individual: Cargo[]): Cargo[] {
    const mutated = [...individual];
    const index1 = Math.floor(Math.random() * mutated.length);
    const index2 = Math.floor(Math.random() * mutated.length);
    
    [mutated[index1], mutated[index2]] = [mutated[index2], mutated[index1]];
    
    return mutated;
  }

  /**
   * 计算适应度
   */
  private calculateFitness(result: PackingResult): number {
    // 综合考虑利用率、成本效益和装载完成度
    const utilizationScore = result.utilization;
    const costEfficiencyScore = this.calculateCostEfficiency(result);
    const completionScore = this.calculateCompletionScore(result);
    
    // 加权计算适应度
    return utilizationScore * 0.4 + costEfficiencyScore * 0.3 + completionScore * 0.3;
  }

  /**
   * 计算成本效益
   */
  private calculateCostEfficiency(result: PackingResult): number {
    if (result.totalCost === 0) return 100;
    return Math.min((result.totalVolume / result.totalCost) * 10, 100);
  }

  /**
   * 计算装载完成度
   */
  private calculateCompletionScore(result: PackingResult): number {
    const totalItems = result.packedItems.length + result.unpackedItems.length;
    if (totalItems === 0) return 100;
    return (result.packedItems.length / totalItems) * 100;
  }
}