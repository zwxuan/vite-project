import { Cargo, ContainerType, PackingResult, PackedItem } from '../types';
import { CONTAINER_TYPES, CARGO_COLORS } from '../constants';

/**
 * 装箱算法类
 * 负责计算最优的装箱方案
 */
export class PackingAlgorithm {
  /**
   * 计算最佳装箱方案
   * @param cargos 货物列表
   * @param cargoNameColors 货物名称颜色映射
   * @returns 最佳装箱结果
   */
  static calculateBestPacking(cargos: Cargo[], cargoNameColors?: Record<string, string>): PackingResult | null {
    let bestResult: PackingResult | null = null;
    let bestUtilization = 0;

    for (const containerType of CONTAINER_TYPES) {
      const result = this.packIntoContainerType(cargos, containerType, cargoNameColors);
      if (result && result.utilization > bestUtilization) {
        bestUtilization = result.utilization;
        bestResult = result;
      }
    }

    return bestResult;
  }

  /**
   * 将货物装入指定类型的集装箱
   * @param cargos 货物列表
   * @param containerType 集装箱类型
   * @param cargoNameColors 货物名称颜色映射
   * @returns 装箱结果
   */
  private static packIntoContainerType(cargos: Cargo[], containerType: ContainerType, cargoNameColors?: Record<string, string>): PackingResult | null {
    const packedItems: PackedItem[] = [];
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
    const gap = 0.05; // 5cm间隙

    for (const cargo of sortedCargos) {
      for (let i = 0; i < cargo.quantity; i++) {
        const cargoWeight = cargo.weight;
        const cargoVolume = cargo.length * cargo.width * cargo.height;

        // 检查当前位置是否能放下货物
        let needNewContainer = false;
        
        // 检查长度方向是否超出（考虑5cm间隙）
         if (currentX + cargo.length + gap > containerType.length) {
           // 换行：移动到下一行
           currentX = 0;
           currentZ += maxWidthInRow;
           maxWidthInRow = 0;
           
           // 检查宽度方向是否超出
           if (currentZ + cargo.width + gap > containerType.width) {
             // 换层：移动到上一层
             currentZ = 0;
             currentY += maxHeightInLayer;
             maxHeightInLayer = 0;
             
             // 检查高度方向是否超出
             if (currentY + cargo.height + gap > containerType.height) {
               needNewContainer = true;
             }
           }
         }
        
        // 检查重量和体积限制
        if (currentContainerWeight + cargoWeight > containerType.maxWeight ||
            currentContainerVolume + cargoVolume > containerVolume) {
          needNewContainer = true;
        }
        
        // 如果需要新容器
        if (needNewContainer) {
          containerCount++;
          currentContainerWeight = 0;
          currentContainerVolume = 0;
          currentX = 0;
          currentY = 0;
          currentZ = 0;
          maxHeightInLayer = 0;
          maxWidthInRow = 0;
        }

        // 使用货物名称对应的颜色，如果没有则使用货物自身颜色，最后才使用随机颜色
        const cargoColor = cargoNameColors?.[cargo.name] || cargo.color || this.getRandomColor();
        
        packedItems.push({
          cargo: { ...cargo, color: cargoColor },
          x: currentX,
          y: currentY,
          z: currentZ,
          containerIndex: containerCount
        });

        // 更新位置和尺寸记录（添加5cm间隙）
        currentX += cargo.length + gap;
        maxHeightInLayer = Math.max(maxHeightInLayer, cargo.height + gap);
        maxWidthInRow = Math.max(maxWidthInRow, cargo.width + gap);
        currentContainerWeight += cargoWeight;
        currentContainerVolume += cargoVolume;
      }
    }

    if (packedItems.length > 0) {
      containerCount++;
    }

    const totalCargoVolume = cargos.reduce((sum, cargo) => 
      sum + (cargo.length * cargo.width * cargo.height * cargo.quantity), 0
    );
    const totalContainerVolume = containerCount * containerVolume;
    const utilization = (totalCargoVolume / totalContainerVolume) * 100;

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
    const containers: ContainerType[] = Array(containerCount).fill(containerType);

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
      utilizationRate: utilization
    };
  }

  /**
   * 获取随机颜色
   * @returns 随机颜色值
   */
  private static getRandomColor(): string {
    return CARGO_COLORS[Math.floor(Math.random() * CARGO_COLORS.length)];
  }
}