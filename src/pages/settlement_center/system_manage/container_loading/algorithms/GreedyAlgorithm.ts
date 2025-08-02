import { Cargo, PackingResult, PackingConfig, ContainerType, SolutionScore } from '../types';
import { CONTAINER_TYPES } from '../constants';
import { BaseAlgorithm } from './base/BaseAlgorithm';

/**
 * 贪心算法
 * 快速装箱，优先选择当前最优解
 */
export class GreedyAlgorithm extends BaseAlgorithm {
  /**
   * 执行贪心算法
   */
  execute(cargos: Cargo[], cargoNameColors?: Record<string, string>, config?: PackingConfig): PackingResult | null {
    const packingConfig = config || {
      algorithm: 'greedy',
      mode: 'multi_container',
      allowMultipleContainers: true
    };

    // 如果指定了特定的集装箱类型，直接使用该类型
    if (packingConfig.containerType) {
      const result = this.packIntoContainerType(cargos, packingConfig.containerType, undefined, packingConfig);
      
      if (result) {
        // 为指定集装箱类型生成评分信息
        const score = this.calculateGreedyScore(result);
        const utilizationScore = result.utilization;
        const costEfficiencyScore = this.calculateCostEfficiencyScore(result);
        const loadingEfficiencyScore = this.calculateLoadingEfficiencyScore(result);
        
        const solutionScore: SolutionScore = {
          containerType: packingConfig.containerType,
          score,
          utilizationScore,
          costEfficiencyScore,
          loadingEfficiencyScore,
          unpackedItemsCount: result.unpackedItems.length,
          isSelected: true // 指定的类型总是被选中
        };
        
        result.solutionScores = [solutionScore];
        return result;
      } else {
        return this.createEmptyResult(cargos, packingConfig.containerType, packingConfig, cargos);
      }
    }

    // 分离容器类型
    const standardContainers = CONTAINER_TYPES.filter(ct => !ct.isFrameContainer);
    const frameContainers = CONTAINER_TYPES.filter(ct => ct.isFrameContainer);
    
    // 根据高度分离货物
    const { standardCargos, frameCargos } = this.separateCargosByHeight(cargos);
    
    let bestResult: PackingResult | null = null;
    
    // 如果有标准货物，先尝试标准集装箱
    if (standardCargos.length > 0 && standardContainers.length > 0) {
      const standardResult = this.tryContainerTypes(standardCargos, standardContainers, packingConfig);
      
      if (standardResult && standardResult.packedItems.length > 0) {
        bestResult = standardResult;
        
        // 如果有框架货物，尝试框架集装箱
        if (frameCargos.length > 0 && frameContainers.length > 0) {
          const frameResult = this.tryContainerTypes(frameCargos, frameContainers, packingConfig);
          
          if (frameResult && frameResult.packedItems.length > 0) {
            // 合并结果
            bestResult = this.mergePackingResults(standardResult, frameResult);
          }
        }
      } else {
        // 标准集装箱装载失败，尝试将所有货物装入框架集装箱
        if (frameContainers.length > 0) {
          bestResult = this.tryContainerTypes(cargos, frameContainers, packingConfig);
        }
      }
    } else if (frameCargos.length > 0 && frameContainers.length > 0) {
      // 只有框架货物，直接使用框架集装箱
      bestResult = this.tryContainerTypes(frameCargos, frameContainers, packingConfig);
    } else if (standardCargos.length > 0 && frameContainers.length > 0) {
      // 只有标准货物但没有标准集装箱，使用框架集装箱
      bestResult = this.tryContainerTypes(standardCargos, frameContainers, packingConfig);
    }
    
    if (!bestResult) {
      return this.createEmptyResult(cargos, CONTAINER_TYPES[0], packingConfig, cargos);
    }
    
    return bestResult;
  }



  /**
   * 尝试多种集装箱类型，选择最优方案
   */
  private tryContainerTypes(cargos: Cargo[], containerTypes: ContainerType[], packingConfig: PackingConfig): PackingResult | null {
    // 贪心策略：按体积效率排序可行的集装箱类型
    const sortedContainerTypes = [...containerTypes].sort((a, b) => {
      const efficiencyA = (a.length * a.width * a.height) / a.cost;
      const efficiencyB = (b.length * b.width * b.height) / b.cost;
      return efficiencyB - efficiencyA;
    });

    let bestResult: PackingResult | null = null;
    let bestScore = -1;
    const solutionScores: SolutionScore[] = [];

    // 贪心选择：尝试每种集装箱类型，选择当前最优解
    for (const containerType of sortedContainerTypes) {
      const result = this.packIntoContainerType(cargos, containerType, undefined, packingConfig);
      
      if (result) {
        // 贪心评分：综合考虑利用率和成本效益
        const score = this.calculateGreedyScore(result);
        const utilizationScore = result.utilization;
        const costEfficiencyScore = this.calculateCostEfficiencyScore(result);
        const loadingEfficiencyScore = this.calculateLoadingEfficiencyScore(result);
        
        // 记录方案评分信息
        const solutionScore: SolutionScore = {
          containerType,
          score,
          utilizationScore,
          costEfficiencyScore,
          loadingEfficiencyScore,
          unpackedItemsCount: result.unpackedItems.length,
          isSelected: false
        };
        solutionScores.push(solutionScore);
        
        if (score > bestScore) {
          bestScore = score;
          bestResult = result;
        }
      }
    }

    // 标记最优方案
    if (bestResult) {
      const bestSolution = solutionScores.find(s => 
        s.containerType.name === bestResult!.containerType.name && 
        s.score === bestScore
      );
      if (bestSolution) {
        bestSolution.isSelected = true;
      }
      
      // 将评分信息添加到结果中
      bestResult.solutionScores = solutionScores;
    }

    return bestResult;
  }

  /**
   * 创建空的装箱结果
   */
  private createEmptyResult(cargos: Cargo[], containerType: ContainerType, packingConfig: PackingConfig, processedCargos: Cargo[]): PackingResult {
    return {
      containerType,
      containerCount: 0,
      utilization: 0,
      totalCost: 0,
      packedItems: [],
      containers: [],
      unpackedItems: cargos,
      totalVolume: 0,
      totalWeight: 0,
      utilizationRate: 0,
      spaceOccupancyRate: 0,
      algorithm: packingConfig.algorithm,
      mode: packingConfig.mode,
      gap: packingConfig.gap || 0.05,
      processedCargos: processedCargos
    };
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
      gap: standardResult.gap || frameResult.gap || 0.05,
      solutionScores: standardResult.solutionScores || frameResult.solutionScores // 保留评分信息
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
   * 计算贪心评分
   * 综合考虑利用率、成本效益和装载效率
   * 如果存在未装载的货物，则评分为0
   */
  private calculateGreedyScore(result: PackingResult): number {
    // 如果存在未装载的货物，评分为0
    if (result.unpackedItems && result.unpackedItems.length > 0) {
      return 0;
    }
    
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


}