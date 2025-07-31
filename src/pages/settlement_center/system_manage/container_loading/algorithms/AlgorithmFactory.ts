import { PackingAlgorithmType } from '../types';
import { BaseAlgorithm } from './base/BaseAlgorithm';
import { GreedyAlgorithm } from './GreedyAlgorithm';

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
    // 只支持贪心算法
    return new GreedyAlgorithm();
  }

  /**
   * 获取所有可用的算法类型
   * @returns 算法类型数组
   */
  static getAvailableAlgorithms(): PackingAlgorithmType[] {
    return [
      'greedy'
    ];
  }
}