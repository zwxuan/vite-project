import { Cargo, ContainerType, PackingResult, PackingConfig } from '../types';
import { CONTAINER_TYPES } from '../constants';
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

    console.log('=== 装箱计算开始 ===');
    console.log('货物信息:', cargos.map(c => `${c.name}(${c.id}): ${c.length}×${c.width}×${c.height}m, 数量${c.quantity}`));
    console.log('装箱配置:', packingConfig);

    // 如果指定了集装箱类型，创建一个临时算法类来处理
    if (packingConfig.containerType) {
      // 检查是否有超高货物但选择了标准箱
      const maxStandardHeight = Math.max(...CONTAINER_TYPES.filter(ct => !ct.isFrameContainer).map(ct => ct.height));
      const hasOverheightCargo = cargos.some(cargo => cargo.height > maxStandardHeight);
      
      if (!packingConfig.containerType.isFrameContainer && hasOverheightCargo) {
        console.warn(`检测到超高货物（高度>${maxStandardHeight}m），但指定了标准箱${packingConfig.containerType.name}`);
        console.warn(`建议使用框架箱或自动选择模式以获得更好的装载效果`);
      }
      
      class SpecificContainerAlgorithm extends BaseAlgorithm {
        execute(cargos: Cargo[], cargoNameColors?: Record<string, string>, config?: PackingConfig): PackingResult | null {
          const result = this.packIntoContainerType(cargos, packingConfig.containerType!, cargoNameColors, config);
          
          // 确保只有在有货物装载时才返回结果
          if (result && result.packedItems.length > 0) {
            console.log(`指定集装箱类型装载结果: ${result.containerCount}个${packingConfig.containerType!.name}，装载${result.packedItems.length}件货物`);
            if (result.unpackedItems.length > 0) {
              console.warn(`有${result.unpackedItems.length}种货物无法装载，建议使用框架箱或多集装箱模式`);
            }
            return result;
          } else {
            console.log(`指定集装箱类型装载失败: 无法装载任何货物`);
            return null;
          }
        }
      }
      const specificAlgorithm = new SpecificContainerAlgorithm();
      return specificAlgorithm.execute(cargos, cargoNameColors, packingConfig);
    }

    // 使用算法工厂创建对应的算法实例
    const algorithm = AlgorithmFactory.createAlgorithm(packingConfig.algorithm);
    console.log('使用算法:', packingConfig.algorithm);
    
    // 执行基础装箱算法
    const baseResult = algorithm.execute(cargos, cargoNameColors, packingConfig);
    console.log('基础算法结果:', baseResult ? {
      containerCount: baseResult.containerCount,
      packedItemsCount: baseResult.packedItems.length,
      unpackedItemsCount: baseResult.unpackedItems.length,
      containers: baseResult.containers.map(c => `${c.name}(${c.isFrameContainer ? '框架' : '标准'})`)
    } : null);
    
    // 应用成本优化策略
    const finalResult = CostOptimizationEngine.applyOptimization(
      baseResult,
      cargos,
      algorithm,
      cargoNameColors,
      packingConfig
    );
    
    if (finalResult) {
      console.log('=== 最终装箱结果 ===');
      console.log('集装箱数量:', finalResult.containerCount);
      console.log('已装载货物:', finalResult.packedItems.length);
      console.log('未装载货物:', finalResult.unpackedItems.length);
      
      // 检查每个货物的容器分配
      finalResult.packedItems.forEach((item, index) => {
        const container = finalResult.containers[item.containerIndex];
        console.log(`货物${item.cargo.id}(${item.cargo.name}): 容器${item.containerIndex} - ${container?.name || '未知'}(${container?.isFrameContainer ? '框架' : '标准'})`);
        
        // 检查是否超出边界
        if (container) {
          const exceedsLength = item.x + item.cargo.length > container.length;
          const exceedsWidth = item.z + item.cargo.width > container.width;
          const exceedsHeight = item.y + item.cargo.height > container.height;
          
          if (exceedsLength || exceedsWidth || exceedsHeight) {
            console.error(`⚠️ 货物${item.cargo.id}超出集装箱边界!`, {
              position: [item.x, item.y, item.z],
              cargoSize: [item.cargo.length, item.cargo.width, item.cargo.height],
              containerSize: [container.length, container.width, container.height],
              exceedsLength, exceedsWidth, exceedsHeight
            });
          }
        }
      });
    }
    
    return finalResult;
  }




}