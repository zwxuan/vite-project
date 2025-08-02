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
   * 按体积从大到小排序货物
   */
  protected sortCargosByVolume(cargos: Cargo[]): Cargo[] {
    return [...cargos].sort((a, b) => {
      const volumeA = a.length * a.width * a.height * a.quantity;
      const volumeB = b.length * b.width * b.height * b.quantity;
      return volumeB - volumeA;
    });
  }

  /**
   * 分离标准箱和框架箱货物
   */
  protected separateCargosByHeight(cargos: Cargo[]): { standardCargos: Cargo[], frameCargos: Cargo[] } {
    const maxStandardHeight = Math.max(...CONTAINER_TYPES.filter(ct => !ct.isFrameContainer).map(ct => ct.height));
    return {
      standardCargos: cargos.filter(cargo => cargo.height <= maxStandardHeight),
      frameCargos: cargos.filter(cargo => cargo.height > maxStandardHeight)
    };
  }

  /**
   * 获取货物颜色
   */
  protected getCargoColor(cargo: Cargo, cargoNameColors?: Record<string, string>): string {
    return cargoNameColors?.[cargo.name] || cargo.color || getConsistentColor(cargo.name);
  }

  /**
   * 计算容器总体积
   */
  protected calculateContainerVolume(containerType: ContainerType): number {
    return containerType.length * containerType.width * containerType.height;
  }

  /**
   * 检查货物是否能装入容器
   */
  protected canFitInContainer(cargo: Cargo, containerType: ContainerType, currentWeight: number, currentVolume: number, containerVolume: number): boolean {
    const cargoWeight = cargo.weight;
    const cargoVolume = cargo.length * cargo.width * cargo.height;
    
    return (
      cargo.length <= containerType.length &&
      cargo.width <= containerType.width &&
      (containerType.isFrameContainer || cargo.height <= containerType.height) &&
      currentWeight + cargoWeight <= containerType.maxWeight &&
      currentVolume + cargoVolume <= containerVolume
    );
  }

  /**
   * 检查是否需要新容器
   */
  protected checkNeedNewContainer(
    cargo: Cargo, 
    containerType: ContainerType, 
    currentX: number, 
    currentY: number, 
    currentZ: number,
    maxHeightInLayer: number,
    maxWidthInRow: number,
    gap: number,
    config?: PackingConfig
  ): boolean {
    // 预先检查：如果当前货物在当前层就无法放下（高度超限），直接需要新容器
    if (!containerType.isFrameContainer && currentY + cargo.height > containerType.height) {
      return true;
    }

    // 检查长度方向是否超出
    if (currentX + cargo.length + gap > containerType.length) {
      // 检查宽度方向是否超出
      if (currentZ + maxWidthInRow + cargo.width + gap > containerType.width) {
        // 检查是否允许堆叠
        const allowStacking = config?.allowStacking !== false;
        const isFrameContainer = containerType.isFrameContainer;
        
        if (allowStacking && !isFrameContainer) {
          // 检查换层后高度是否超限
          const newLayerY = currentY + maxHeightInLayer;
          return newLayerY + cargo.height > containerType.height;
        } else {
          return true; // 不允许堆叠或框架集装箱
        }
      }
    }
    
    return false;
  }

  /**
   * 计算新位置
   */
  protected calculateNewPosition(
    cargo: Cargo,
    currentX: number,
    currentY: number,
    currentZ: number,
    maxHeightInLayer: number,
    maxWidthInRow: number,
    gap: number,
    containerType: ContainerType,
    config?: PackingConfig
  ): { x: number, y: number, z: number, maxHeightInLayer: number, maxWidthInRow: number } {
    let newX = currentX;
    let newY = currentY;
    let newZ = currentZ;
    let newMaxHeightInLayer = maxHeightInLayer;
    let newMaxWidthInRow = maxWidthInRow;

    // 检查长度方向是否超出
    if (newX + cargo.length + gap > containerType.length) {
      // 换行
      newX = 0;
      newZ += newMaxWidthInRow;
      newMaxWidthInRow = cargo.width + gap;
      
      // 检查宽度方向是否超出
      if (newZ + cargo.width + gap > containerType.width) {
        // 换层
        newZ = 0;
        newY += newMaxHeightInLayer;
        newMaxHeightInLayer = cargo.height + gap;
        newMaxWidthInRow = cargo.width + gap;
      }
    } else {
      // 在当前行继续放置
      newMaxWidthInRow = Math.max(newMaxWidthInRow, cargo.width + gap);
    }
    
    // 更新当前层的最大高度
    newMaxHeightInLayer = Math.max(newMaxHeightInLayer, cargo.height + gap);
    
    return {
      x: newX,
      y: newY,
      z: newZ,
      maxHeightInLayer: newMaxHeightInLayer,
      maxWidthInRow: newMaxWidthInRow
    };
  }

  /**
   * 添加到未装载列表
   */
  protected addToUnpackedItems(
    cargo: Cargo, 
    packedCargoCount: Map<string, number>, 
    unpackedItems: Cargo[], 
    quantity: number = 0
  ): void {
    const currentPackedCount = packedCargoCount.get(cargo.id) || 0;
    const remainingQuantity = quantity > 0 ? quantity : cargo.quantity - currentPackedCount;
    
    if (remainingQuantity > 0) {
      const existingUnpacked = unpackedItems.find(item => item.id === cargo.id);
      if (existingUnpacked) {
        existingUnpacked.quantity += remainingQuantity;
      } else {
        unpackedItems.push({
          ...cargo,
          quantity: remainingQuantity
        });
      }
    }
  }

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
    const unpackedItems: Cargo[] = [];
    const packedCargoCount = new Map<string, number>();
    let containerCount = 0;
    let currentContainerWeight = 0;
    let currentContainerVolume = 0;
    const containerVolume = this.calculateContainerVolume(containerType);
    
    // 货物预处理：如果允许放倒，对超高货物进行放倒处理
    let processedCargos = [...cargos];
    if (packingConfig.allowRotation && !containerType.isFrameContainer) {
      processedCargos = this.preprocessCargoRotation(cargos, containerType);
    }
    
    // 按体积从大到小排序
    const sortedCargos = this.sortCargosByVolume(processedCargos);

    let currentX = 0, currentY = 0, currentZ = 0;
    let maxHeightInLayer = 0;
    let maxWidthInRow = 0;
    const gap = packingConfig.gap || 0.05;
    let isFirstCargo = true;

    for (const cargo of sortedCargos) {
      for (let i = 0; i < cargo.quantity; i++) {
        const cargoWeight = cargo.weight;
        const cargoVolume = cargo.length * cargo.width * cargo.height;

        // 检查是否需要新容器
        let needNewContainer = this.checkNeedNewContainer(
          cargo, containerType, currentX, currentY, currentZ, 
          maxHeightInLayer, maxWidthInRow, gap, packingConfig
        );

        // 检查重量和体积限制
        if (currentContainerWeight + cargoWeight > containerType.maxWeight ||
            currentContainerVolume + cargoVolume > containerVolume) {
          needNewContainer = true;
        }

        // 处理新容器或第一个货物
        if (needNewContainer || isFirstCargo) {
          if (packingConfig.mode === 'single_container' && containerCount > 0) {
            this.addToUnpackedItems(cargo, packedCargoCount, unpackedItems);
            break;
          }

          if (isFirstCargo) {
            containerCount = 1;
            isFirstCargo = false;
          } else {
            containerCount++;
          }

          currentContainerWeight = 0;
          currentContainerVolume = 0;
          currentX = 0;
          currentY = 0;
          currentZ = 0;
          maxHeightInLayer = cargo.height + gap;
          maxWidthInRow = cargo.width + gap;
        } else {
          // 更新位置
          const newPosition = this.calculateNewPosition(
            cargo, currentX, currentY, currentZ, 
            maxHeightInLayer, maxWidthInRow, gap, containerType, packingConfig
          );
          currentX = newPosition.x;
          currentY = newPosition.y;
          currentZ = newPosition.z;
          maxHeightInLayer = newPosition.maxHeightInLayer;
          maxWidthInRow = newPosition.maxWidthInRow;
        }

        // 最终检查是否能装下
        if (!this.canFitInContainer(cargo, containerType, currentContainerWeight, currentContainerVolume, containerVolume)) {
          this.addToUnpackedItems(cargo, packedCargoCount, unpackedItems, 1);
          continue;
        }

        // 装载货物
        const cargoColor = this.getCargoColor(cargo, cargoNameColors);
        packedItems.push({
          cargo: { ...cargo, color: cargoColor },
          x: currentX,
          y: currentY,
          z: currentZ,
          containerIndex: containerCount - 1
        });

        // 更新计数和位置
        const currentCount = packedCargoCount.get(cargo.id) || 0;
        packedCargoCount.set(cargo.id, currentCount + 1);
        currentX += cargo.length + gap;
        currentContainerWeight += cargoWeight;
        currentContainerVolume += cargoVolume;
      }
    }

    // 如果没有装载任何货物，则容器数量为0
    if (packedItems.length === 0) {
      containerCount = 0;
    }

    // 最终检查：添加剩余未装载的货物到未装载列表
    cargos.forEach(cargo => {
      const packedCount = packedCargoCount.get(cargo.id) || 0;
      const remainingCount = cargo.quantity - packedCount;
      if (remainingCount > 0) {
        this.addToUnpackedItems(cargo, packedCargoCount, unpackedItems);
      }
    });

    // 计算结果
    const result = this.calculatePackingResult(
      cargos, packedItems, unpackedItems, containerType, 
      containerCount, gap, packingConfig, processedCargos
    );

    return result;
  }

  /**
   * 货物放倒预处理
   * 对于高度超过集装箱限制的货物，尝试将其放倒（长高互换）
   * @param cargos 原始货物列表
   * @param containerType 目标集装箱类型
   * @returns 处理后的货物列表
   */
  protected preprocessCargoRotation(cargos: Cargo[], containerType: ContainerType): Cargo[] {
    return cargos.map(cargo => {
      // 如果货物高度超过集装箱高度限制，尝试放倒
      if (cargo.height > containerType.height) {
        console.log(`货物 ${cargo.name} 高度 ${cargo.height}m 超过集装箱高度限制 ${containerType.height}m，尝试放倒`);
        
        // 检查放倒后是否能装入集装箱（长度和高度互换）
        const rotatedLength = cargo.height;
        const rotatedHeight = cargo.length;
        
        // 检查放倒后的尺寸是否符合集装箱限制
        if (rotatedLength <= containerType.length && 
            rotatedHeight <= containerType.height && 
            cargo.width <= containerType.width) {
          
          console.log(`货物 ${cargo.name} 放倒成功: ${cargo.length}×${cargo.width}×${cargo.height}m → ${rotatedLength}×${cargo.width}×${rotatedHeight}m`);
          
          // 返回放倒后的货物
          return {
            ...cargo,
            length: rotatedLength,
            height: rotatedHeight,
            isRotated: true // 标记为已放倒
          };
        } else {
          console.log(`货物 ${cargo.name} 放倒后仍无法装入集装箱: ${rotatedLength}×${cargo.width}×${rotatedHeight}m`);
        }
      }
      
      // 如果不需要放倒或放倒后仍无法装入，返回原货物
      return {
        ...cargo,
        isRotated: false
      };
    });
  }

  /**
   * 获取随机颜色
   * @returns 随机颜色值
   */
  protected getRandomColor(): string {
    return CARGO_COLORS[Math.floor(Math.random() * CARGO_COLORS.length)];
  }

  /**
   * 计算装箱结果
   */
  protected calculatePackingResult(
    cargos: Cargo[], 
    packedItems: any[], 
    unpackedItems: Cargo[], 
    containerType: ContainerType, 
    containerCount: number, 
    gap: number, 
    packingConfig: PackingConfig, 
    processedCargos: Cargo[]
  ): PackingResult {
    // 计算货物实际占用体积
    const totalCargoVolume = cargos.reduce((sum, cargo) => 
      sum + (cargo.length * cargo.width * cargo.height * cargo.quantity), 0
    );
    
    // 计算货物加间隙后的实际占用体积
    const totalOccupiedVolume = packedItems.reduce((sum, item) => {
      const cargoWithGap = (item.cargo.length + gap) * (item.cargo.width + gap) * (item.cargo.height + gap);
      return sum + cargoWithGap;
    }, 0);
    
    const totalContainerVolume = containerCount * this.calculateContainerVolume(containerType);
    
    // 框架集装箱不参与利用率计算
    let utilization: number;
    let spaceOccupancyRate: number;
    
    if (containerType.isFrameContainer) {
      utilization = 0;
      spaceOccupancyRate = 0;
    } else {
      utilization = containerCount > 0 ? parseFloat(((totalCargoVolume / totalContainerVolume) * 100).toFixed(2)) : 0;
      spaceOccupancyRate = containerCount > 0 ? parseFloat(((totalOccupiedVolume / totalContainerVolume) * 100).toFixed(2)) : 0;
    }

    // 计算总重量
    const totalWeight = cargos.reduce((sum, cargo) => sum + (cargo.weight * cargo.quantity), 0);

    // 创建集装箱数组
    const containers: ContainerType[] = containerCount > 0 ? Array(containerCount).fill(containerType) : [];

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
      gap: gap,
      processedCargos: processedCargos
    };
  }
}