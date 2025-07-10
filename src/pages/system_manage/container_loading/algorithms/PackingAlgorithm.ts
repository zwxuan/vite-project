import { Cargo, ContainerType, PackingResult, PackingConfig } from '../types';
import { AlgorithmFactory } from './AlgorithmFactory';
import { BaseAlgorithm } from './base/BaseAlgorithm';
import { CostOptimizationEngine } from './CostOptimizationEngine';

/**
 * 装箱算法类
 * 负责计算最优的装箱方案
 */
export class PackingAlgorithm {
  /**
   * 计算最佳装箱方案
   * @param cargos 货物列表
   * @param cargoNameColors 货物名称颜色映射
   * @param config 装箱配置
   * @returns 最佳装箱结果
   */
  static calculateBestPacking(cargos: Cargo[], cargoNameColors?: Record<string, string>, config?: PackingConfig): PackingResult | null {
    const packingConfig = config || {
      algorithm: 'greedy',
      mode: 'multi_container',
      allowMultipleContainers: true
    };

    // 如果指定了集装箱类型，创建一个临时算法类来处理
    if (packingConfig.containerType) {
      class SpecificContainerAlgorithm extends BaseAlgorithm {
        execute(cargos: Cargo[], cargoNameColors?: Record<string, string>, config?: PackingConfig): PackingResult | null {
          return this.packIntoContainerType(cargos, packingConfig.containerType!, cargoNameColors, config);
        }
      }
      const specificAlgorithm = new SpecificContainerAlgorithm();
      return specificAlgorithm.execute(cargos, cargoNameColors, packingConfig);
    }

    // 使用算法工厂创建对应的算法实例
    const algorithm = AlgorithmFactory.createAlgorithm(packingConfig.algorithm);
    
    // 执行基础装箱算法
    const baseResult = algorithm.execute(cargos, cargoNameColors, packingConfig);
    
    // 应用成本优化策略
    return CostOptimizationEngine.applyOptimization(
      baseResult,
      cargos,
      algorithm,
      cargoNameColors,
      packingConfig
    );
  }




}