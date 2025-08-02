import { PackingAlgorithmType } from '../types';
import { BaseAlgorithm } from './base/BaseAlgorithm';
import { GreedyAlgorithm } from './GreedyAlgorithm';

export class AlgorithmFactory {
  /**
   * 创建算法实例
   */
  static createAlgorithm(algorithmType: PackingAlgorithmType): BaseAlgorithm {
    return new GreedyAlgorithm();
  }

  /**
   * 获取可用的算法列表
   */
  static getAvailableAlgorithms(): PackingAlgorithmType[] {
    return ['greedy'];
  }
}