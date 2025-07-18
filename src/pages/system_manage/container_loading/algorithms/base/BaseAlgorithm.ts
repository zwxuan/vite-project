import { Cargo, ContainerType, PackingResult, PackingConfig } from '../../types';
import { CONTAINER_TYPES, CARGO_COLORS } from '../../constants';
import { getConsistentColor } from '../../utils';

/**
 * 装箱算法基类
 * 提供通用的装箱方法和工具函数
 */
export abstract class BaseAlgorithm {
  /**
   * 执行装箱算法
   * @param cargos 货物列表
   * @param cargoNameColors 货物名称颜色映射
   * @param config 装箱配置
   * @returns 装箱结果
   */
  abstract execute(cargos: Cargo[], cargoNameColors?: Record<string, string>, config?: PackingConfig): PackingResult | null;

  /**
   * 将货物装入指定类型的集装箱
   * @param cargos 货物列表
   * @param containerType 集装箱类型
   * @param cargoNameColors 货物名称颜色映射
   * @param config 装箱配置
   * @returns 装箱结果
   */
  public packIntoContainerType(cargos: Cargo[], containerType: ContainerType, cargoNameColors?: Record<string, string>, config?: PackingConfig): PackingResult | null {
    const packingConfig = config || {
      algorithm: 'greedy',
      mode: 'multi_container',
      allowMultipleContainers: true
    };

    const packedItems: any[] = [];
    let containerCount = 0;
    let currentContainerWeight = 0;
    let currentContainerVolume = 0;
    const containerVolume = containerType.length * containerType.width * containerType.height;
    
    // 按体积从大到小排序
    const sortedCargos = [...cargos].sort((a, b) => {
      const volumeA = a.length * a.width * a.height * a.quantity;
      const volumeB = b.length * b.width * b.height * b.quantity;
      return volumeB - volumeA;
    });

    let currentX = 0, currentY = 0, currentZ = 0;
    let maxHeightInLayer = 0;
    let maxWidthInRow = 0;
    const gap = packingConfig.gap || 0.05; // 货物间隙，默认5cm
    let isFirstCargo = true; // 标记是否为第一个货物

    for (const cargo of sortedCargos) {
      for (let i = 0; i < cargo.quantity; i++) {
        const cargoWeight = cargo.weight;
        const cargoVolume = cargo.length * cargo.width * cargo.height;

        // 预先检查：如果货物本身就无法装入任何容器，直接跳过
        if (cargo.height + gap > containerType.height) {
          console.warn(`货物 ${cargo.name} 高度 ${cargo.height}m 超过集装箱高度 ${containerType.height}m，无法装载`);
          continue; // 跳过这个货物
        }

        // 检查当前位置是否能放下货物
        let needNewContainer = false;
        let tempX = currentX;
        let tempY = currentY;
        let tempZ = currentZ;
        let tempMaxHeightInLayer = maxHeightInLayer;
        let tempMaxWidthInRow = maxWidthInRow;
        
        // 预先检查：如果当前货物在当前层就无法放下（高度超限），直接需要新容器
        if (currentY + cargo.height + gap > containerType.height) {
          needNewContainer = true;
          console.log(`货物 ${cargo.name} 在当前层无法放置，当前层高=${currentY}, 货物高=${cargo.height}, 总高=${currentY + cargo.height + gap} > 容器高=${containerType.height}`);
        }
        
        // 只有在不需要新容器时才进行位置调整计算
        if (!needNewContainer) {
          // 检查长度方向是否超出（考虑间隙）
          if (tempX + cargo.length + gap > containerType.length) {
            // 换行：移动到下一行
            tempX = 0;
            tempZ += tempMaxWidthInRow;
            tempMaxWidthInRow = cargo.width + gap; // 设置新行的宽度
            
            // 检查宽度方向是否超出
            if (tempZ + cargo.width + gap > containerType.width) {
              // 换层：移动到上一层
              tempZ = 0;
              const newLayerY = tempY + tempMaxHeightInLayer;
              
              // 换层前先检查新层高度是否会超限
              if (newLayerY + cargo.height + gap > containerType.height) {
                needNewContainer = true;
                console.log(`换层会导致高度超限: 当前层高=${tempY}, 当前层最大高度=${tempMaxHeightInLayer}, 新层高=${newLayerY}, 货物高=${cargo.height}, 总高=${newLayerY + cargo.height + gap} > 容器高=${containerType.height}`);
              } else {
                tempY = newLayerY;
                tempMaxHeightInLayer = cargo.height + gap; // 设置新层的高度
                tempMaxWidthInRow = cargo.width + gap; // 重置行宽度
              }
            }
          } else {
            // 在当前行继续放置，更新行宽度
            tempMaxWidthInRow = Math.max(tempMaxWidthInRow, cargo.width + gap);
          }
          
          // 更新当前层的最大高度
          tempMaxHeightInLayer = Math.max(tempMaxHeightInLayer, cargo.height + gap);
          
          // 最终检查所有维度是否超出边界
          if (!needNewContainer) {
            const wouldExceedLength = tempX + cargo.length + gap > containerType.length;
            const wouldExceedWidth = tempZ + cargo.width + gap > containerType.width;
            const wouldExceedHeight = tempY + cargo.height + gap > containerType.height;
            
            if (wouldExceedLength || wouldExceedWidth || wouldExceedHeight) {
              needNewContainer = true;
              console.log(`最终检查超限: 长=${wouldExceedLength}, 宽=${wouldExceedWidth}, 高=${wouldExceedHeight}`);
            }
          }
        }
        
        // 如果不需要新容器，更新实际位置
        if (!needNewContainer) {
          currentX = tempX;
          currentY = tempY;
          currentZ = tempZ;
          maxHeightInLayer = tempMaxHeightInLayer;
          maxWidthInRow = tempMaxWidthInRow;
        }
        
        // 检查重量和体积限制
        if (currentContainerWeight + cargoWeight > containerType.maxWeight ||
            currentContainerVolume + cargoVolume > containerVolume) {
          needNewContainer = true;
        }
        
        // 如果需要新容器或者是第一个货物
        if (needNewContainer || isFirstCargo) {
          // 在单集装箱模式下，如果需要新容器则停止装载
          if (packingConfig.mode === 'single_container' && containerCount > 0) {
            break;
          }
          
          // 高度检查已在循环开始时完成，这里不需要重复检查
          
          // 只有在真正要装载货物时才创建/初始化容器
          if (isFirstCargo) {
            containerCount = 1; // 第一个容器
            isFirstCargo = false;
          } else {
            containerCount++;
          }
          
          currentContainerWeight = 0;
          currentContainerVolume = 0;
          currentX = 0;
          currentY = 0;
          currentZ = 0;
          maxHeightInLayer = cargo.height + gap; // 设置新容器第一层高度
          maxWidthInRow = cargo.width + gap; // 设置新容器第一行宽度
          
          console.log(`${containerCount === 1 ? '初始化' : '创建新'}容器 #${containerCount}, 放置货物 ${cargo.name}, 尺寸: ${cargo.length}x${cargo.width}x${cargo.height}`);
        }

        // 实际装载货物前再次检查是否能装下
        const finalCheck = (
          currentX + cargo.length + gap <= containerType.length &&
          currentZ + cargo.width + gap <= containerType.width &&
          currentY + cargo.height + gap <= containerType.height &&
          currentContainerWeight + cargoWeight <= containerType.maxWeight &&
          currentContainerVolume + cargoVolume <= containerVolume
        );
        
        // 如果最终检查失败，跳过这个货物
        if (!finalCheck) {
          console.warn(`货物 ${cargo.name} 最终检查失败，跳过装载`);
          continue;
        }

        // 使用货物名称对应的颜色，如果没有则使用一致的颜色分配
        const cargoColor = cargoNameColors?.[cargo.name] || cargo.color || getConsistentColor(cargo.name);
        
        packedItems.push({
          cargo: { ...cargo, color: cargoColor },
          x: currentX,
          y: currentY,
          z: currentZ,
          containerIndex: containerCount - 1 // 修复索引：从0开始而不是从1开始
        });

        // 更新位置和尺寸记录（添加间隙）
        currentX += cargo.length + gap;
        // 注意：maxHeightInLayer和maxWidthInRow已在上面的位置更新逻辑中处理
        currentContainerWeight += cargoWeight;
        currentContainerVolume += cargoVolume;
      }
    }

    // 如果没有装载任何货物，则容器数量为0
    if (packedItems.length === 0) {
      containerCount = 0;
      console.log('没有货物被装载，容器数量设置为0');
    } else {
      console.log(`装载完成，共使用 ${containerCount} 个容器，装载 ${packedItems.length} 件货物`);
    }

    // 计算货物实际占用体积（包含间隙）
    const totalCargoVolume = cargos.reduce((sum, cargo) => 
      sum + (cargo.length * cargo.width * cargo.height * cargo.quantity), 0
    );
    
    // 计算货物加间隙后的实际占用体积
    const totalOccupiedVolume = packedItems.reduce((sum, item) => {
      const cargoWithGap = (item.cargo.length + gap) * (item.cargo.width + gap) * (item.cargo.height + gap);
      return sum + cargoWithGap;
    }, 0);
    
    const totalContainerVolume = containerCount * containerVolume;
    // 利用率基于货物本身体积，不包含间隙
    const utilization = containerCount > 0 ? (totalCargoVolume / totalContainerVolume) * 100 : 0;
    // 实际空间占用率（包含间隙）
    const spaceOccupancyRate = containerCount > 0 ? (totalOccupiedVolume / totalContainerVolume) * 100 : 0;

    // 计算总重量
    const totalWeight = cargos.reduce((sum, cargo) => sum + (cargo.weight * cargo.quantity), 0);

    // 计算未装载货物
    const packedCargoCount = new Map<string, number>();
    packedItems.forEach(item => {
      const count = packedCargoCount.get(item.cargo.id) || 0;
      packedCargoCount.set(item.cargo.id, count + 1);
    });

    const unpackedItems: Cargo[] = [];
    cargos.forEach(cargo => {
      const packedCount = packedCargoCount.get(cargo.id) || 0;
      const remainingCount = cargo.quantity - packedCount;
      if (remainingCount > 0) {
        unpackedItems.push({
          ...cargo,
          quantity: remainingCount
        });
      }
    });

    // 创建集装箱数组
    // 只有当有货物被装载时才创建集装箱数组
    const containers: ContainerType[] = containerCount > 0 ? Array(containerCount).fill(containerType) : [];
    
    console.log(`最终结果: containerCount=${containerCount}, containers.length=${containers.length}, packedItems.length=${packedItems.length}`);

    return {
      containerType,
      containerCount,
      utilization,
      totalCost: containerCount * containerType.cost,
      packedItems,
      containers,
      unpackedItems,
      totalVolume: totalCargoVolume,
      totalWeight,
      utilizationRate: utilization,
      spaceOccupancyRate,
      algorithm: packingConfig.algorithm,
      mode: packingConfig.mode,
      gap: gap // 保存gap值用于3D渲染
    };
  }

  /**
   * 获取随机颜色
   * @returns 随机颜色值
   */
  protected getRandomColor(): string {
    return CARGO_COLORS[Math.floor(Math.random() * CARGO_COLORS.length)];
  }
}