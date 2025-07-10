import { Cargo, ContainerType, PackingResult, PackingConfig } from '../../types';
import { CONTAINER_TYPES, CARGO_COLORS } from '../../constants';

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
          // 在单集装箱模式下，如果需要新容器则停止装载
          if (packingConfig.mode === 'single_container' && containerCount > 0) {
            break;
          }
          
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
    // 在单集装箱模式下，只返回一个集装箱
    const actualContainerCount = packingConfig.mode === 'single_container' ? 1 : containerCount;
    const containers: ContainerType[] = Array(actualContainerCount).fill(containerType);

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
      algorithm: packingConfig.algorithm,
      mode: packingConfig.mode
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