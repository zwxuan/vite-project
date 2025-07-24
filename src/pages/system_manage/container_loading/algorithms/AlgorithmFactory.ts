import { PackingAlgorithmType } from '../types';
import { BaseAlgorithm } from './base/BaseAlgorithm';
import { GreedyAlgorithm } from './GreedyAlgorithm';
import { GeneticAlgorithm } from './GeneticAlgorithm';
import { SimulatedAnnealingAlgorithm } from './SimulatedAnnealingAlgorithm';
import { HybridOptimizationAlgorithm } from './HybridOptimizationAlgorithm';
import { MultiContainerAlgorithm } from './MultiContainerAlgorithm';
import { LinearProgrammingAlgorithm } from './LinearProgrammingAlgorithm';

/**
 * 算法工厂类
 * 负责创建和管理不同的装箱算法实例
 */
export class AlgorithmFactory {
  /**
   * 创建算法实例
   * @param algorithmType 算法类型
   * @returns 算法实例
   */
  static createAlgorithm(algorithmType: PackingAlgorithmType): BaseAlgorithm {
    switch (algorithmType) {
      case 'greedy':
        return new GreedyAlgorithm();
      case 'genetic':
        return new GeneticAlgorithm();
      case 'simulated':
        return new SimulatedAnnealingAlgorithm();
      case 'hybrid':
        return new HybridOptimizationAlgorithm();
      case 'multi-container':
        return new MultiContainerAlgorithm();
      case 'linear-programming':
        return new LinearProgrammingAlgorithm();
      default:
        return new GreedyAlgorithm();
    }
  }

  /**
   * 获取所有可用的算法类型
   * @returns 算法类型数组
   */
  static getAvailableAlgorithms(): PackingAlgorithmType[] {
    return [
      'greedy',
      'genetic',
      'simulated',
      'hybrid',
      'multi-container',
      'linear-programming'
    ];
  }
}