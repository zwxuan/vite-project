import { Cargo, ContainerType, PackingResult, PackingConfig, PackedItem } from '../types';
import { BaseAlgorithm } from './base/BaseAlgorithm';
import { CONTAINER_TYPES } from '../constants';
import { getConsistentColor } from '../utils';

/**
 * 线性规划装箱算法
 * 基于经典装箱问题（Bin Packing Problem）的求解器
 * 实现多种近似算法：首次适应、最佳适应、降序首次适应等
 * 参考Google OR-Tools的处理方式，解决NP-难的装箱优化问题
 */
export class LinearProgrammingAlgorithm extends BaseAlgorithm {
  /**
   * 执行线性规划装箱算法
   * @param cargos 货物列表
   * @param cargoNameColors 货物名称颜色映射
   * @param config 装箱配置
   * @returns 装箱结果
   */
  execute(cargos: Cargo[], cargoNameColors?: Record<string, string>, config?: PackingConfig): PackingResult | null {
    const startTime = Date.now();
    
    if (!cargos || cargos.length === 0) {
      return null;
    }

    const packingConfig = config || {
      algorithm: 'linear-programming',
      mode: 'multi_container',
      allowMultipleContainers: true
    };

    // 如果指定了容器类型，使用指定的容器类型
    if (packingConfig.containerType) {
      return this.packIntoContainerType(cargos, packingConfig.containerType, cargoNameColors, packingConfig);
    }

    // 否则，使用线性规划方法选择最优容器组合
    return this.optimizeContainerSelection(cargos, cargoNameColors, packingConfig, startTime);
  }

  /**
   * 使用多种装箱算法优化容器选择
   * 实现经典的Bin Packing Problem求解策略
   * @param cargos 货物列表
   * @param cargoNameColors 货物名称颜色映射
   * @param config 装箱配置
   * @param startTime 开始时间
   * @returns 装箱结果
   */
  private optimizeContainerSelection(
    cargos: Cargo[], 
    cargoNameColors?: Record<string, string>, 
    config?: PackingConfig,
    startTime?: number
  ): PackingResult | null {
    let bestResult: PackingResult | null = null;
    let minContainers = Infinity;
    let bestUtilization = 0;

    // 尝试多种装箱算法和容器类型组合
    const algorithms = ['first-fit', 'best-fit', 'first-fit-decreasing', 'best-fit-decreasing'];
    
    for (const containerType of CONTAINER_TYPES) {
      for (const algorithm of algorithms) {
        const result = this.solveBinPackingProblem(cargos, containerType, algorithm, cargoNameColors, config);
        
        if (result) {
          // 优先选择使用容器数量最少的方案，其次考虑利用率
          const isFewerContainers = result.containerCount < minContainers;
          const isSameContainersButBetterUtilization = 
            result.containerCount === minContainers && result.utilization > bestUtilization;
          
          if (isFewerContainers || isSameContainersButBetterUtilization) {
            minContainers = result.containerCount;
            bestUtilization = result.utilization;
            bestResult = result;
          }
        }
      }
    }

    if (bestResult && startTime) {
      bestResult.executionTime = Date.now() - startTime;
    }

    return bestResult;
  }

  /**
   * 装箱问题求解器核心算法
   * 实现经典的Bin Packing Problem求解策略
   * @param cargos 货物列表
   * @param containerType 集装箱类型
   * @param algorithm 算法类型
   * @param cargoNameColors 货物名称颜色映射
   * @param config 装箱配置
   * @returns 装箱结果
   */
  private solveBinPackingProblem(
    cargos: Cargo[], 
    containerType: ContainerType,
    algorithm: string,
    cargoNameColors?: Record<string, string>, 
    config?: PackingConfig
  ): PackingResult | null {
    const gap = config?.gap || 0.05;
    const allowStacking = config?.allowStacking !== false;
    
    // 展开货物数量
    const expandedCargos = this.expandCargos(cargos);
    
    // 根据算法类型进行预处理
    const processedCargos = this.preprocessCargos(expandedCargos, algorithm);
    
    // 使用指定算法进行装箱
    const solution = this.executeBinPackingAlgorithm(
      processedCargos, 
      containerType, 
      algorithm, 
      gap, 
      allowStacking
    );
    
    if (!solution) {
      return null;
    }

    // 构建装箱结果
    return this.buildPackingResult(
      solution,
      containerType,
      cargos,
      cargoNameColors,
      config
    );
  }

  /**
   * 货物预处理
   * 根据不同算法对货物进行排序
   * @param cargos 货物列表
   * @param algorithm 算法类型
   * @returns 处理后的货物列表
   */
  private preprocessCargos(cargos: Cargo[], algorithm: string): Cargo[] {
    switch (algorithm) {
      case 'first-fit-decreasing':
      case 'best-fit-decreasing':
        // 降序排列：按体积从大到小排序
        return [...cargos].sort((a, b) => {
          const volumeA = a.length * a.width * a.height;
          const volumeB = b.length * b.width * b.height;
          return volumeB - volumeA;
        });
      case 'first-fit':
      case 'best-fit':
      default:
        // 保持原始顺序或按输入顺序
        return [...cargos];
    }
  }

  /**
   * 执行装箱算法
   * 实现经典的Bin Packing算法
   * @param cargos 预处理后的货物列表
   * @param containerType 集装箱类型
   * @param algorithm 算法类型
   * @param gap 间隙
   * @param allowStacking 是否允许堆叠
   * @returns 求解方案
   */
  private executeBinPackingAlgorithm(
    cargos: Cargo[],
    containerType: ContainerType,
    algorithm: string,
    gap: number,
    allowStacking: boolean
  ): BinPackingSolution | null {
    const containers: ContainerSolution[] = [];
    const unpackedCargos: Cargo[] = [];
    
    for (const cargo of cargos) {
      let placed = false;
      let bestContainer: ContainerSolution | null = null;
      let bestPosition: Position3D | null = null;
      let bestScore = Infinity;
      
      // 根据算法类型选择容器
      if (algorithm === 'first-fit' || algorithm === 'first-fit-decreasing') {
        // 首次适应算法：选择第一个能放下的容器
        for (const container of containers) {
          const position = this.findOptimalPosition(cargo, container, containerType, gap, allowStacking);
          if (position) {
            bestContainer = container;
            bestPosition = position;
            placed = true;
            break;
          }
        }
      } else if (algorithm === 'best-fit' || algorithm === 'best-fit-decreasing') {
        // 最佳适应算法：选择剩余空间最小的容器
        for (const container of containers) {
          const position = this.findOptimalPosition(cargo, container, containerType, gap, allowStacking);
          if (position) {
            const remainingVolume = this.calculateRemainingVolume(container, containerType) - 
                                  (cargo.length * cargo.width * cargo.height);
            if (remainingVolume < bestScore) {
              bestScore = remainingVolume;
              bestContainer = container;
              bestPosition = position;
              placed = true;
            }
          }
        }
      }
      
      // 如果找到合适的容器，放置货物
      if (placed && bestContainer && bestPosition) {
        bestContainer.packedItems.push({
          cargo,
          x: bestPosition.x,
          y: bestPosition.y,
          z: bestPosition.z,
          containerIndex: bestContainer.index
        });
        bestContainer.usedVolume += cargo.length * cargo.width * cargo.height;
        bestContainer.usedWeight += cargo.weight;
      } else {
        // 创建新容器
        const newContainer: ContainerSolution = {
          index: containers.length,
          packedItems: [],
          usedVolume: 0,
          usedWeight: 0
        };
        
        const position = this.findOptimalPosition(cargo, newContainer, containerType, gap, allowStacking);
        if (position) {
          newContainer.packedItems.push({
            cargo,
            x: position.x,
            y: position.y,
            z: position.z,
            containerIndex: newContainer.index
          });
          newContainer.usedVolume += cargo.length * cargo.width * cargo.height;
          newContainer.usedWeight += cargo.weight;
          containers.push(newContainer);
          placed = true;
        }
      }
      
      if (!placed) {
        unpackedCargos.push(cargo);
      }
    }
    
    return {
      containers,
      unpackedCargos
    };
  }

  /**
   * 计算容器剩余体积
   * @param container 容器解决方案
   * @param containerType 容器类型
   * @returns 剩余体积
   */
  private calculateRemainingVolume(container: ContainerSolution, containerType: ContainerType): number {
    const totalVolume = containerType.length * containerType.width * containerType.height;
    return totalVolume - container.usedVolume;
  }



  /**
   * 寻找货物的最优放置位置
   * @param cargo 货物
   * @param container 容器解决方案
   * @param containerType 容器类型
   * @param gap 间隙
   * @param allowStacking 是否允许堆叠
   * @returns 最优位置
   */
  private findOptimalPosition(
    cargo: Cargo,
    container: ContainerSolution,
    containerType: ContainerType,
    gap: number,
    allowStacking: boolean
  ): Position3D | null {
    // 检查货物是否能装入容器
    if (cargo.length + gap > containerType.length || 
        cargo.width + gap > containerType.width ||
        (!containerType.isFrameContainer && cargo.height > containerType.height) ||
        container.usedWeight + cargo.weight > containerType.maxWeight) {
      return null;
    }

    // 生成候选位置
    const candidates = this.generateCandidatePositions(container, containerType, cargo, gap, allowStacking);
    
    // 选择最优位置（最低、最左、最前的位置）
    let bestPosition: Position3D | null = null;
    let bestScore = Infinity;
    
    for (const candidate of candidates) {
      if (this.isValidPosition(cargo, candidate, container, containerType, gap)) {
        // 计算位置评分：优先选择低位置、左侧位置、前方位置
        const score = candidate.y * 1000 + candidate.x * 100 + candidate.z;
        if (score < bestScore) {
          bestScore = score;
          bestPosition = candidate;
        }
      }
    }
    
    return bestPosition;
  }

  /**
   * 生成候选位置
   * @param container 容器解决方案
   * @param containerType 容器类型
   * @param cargo 货物
   * @param gap 间隙
   * @param allowStacking 是否允许堆叠
   * @returns 候选位置列表
   */
  private generateCandidatePositions(
    container: ContainerSolution,
    containerType: ContainerType,
    cargo: Cargo,
    gap: number,
    allowStacking: boolean
  ): Position3D[] {
    const candidates: Position3D[] = [];
    
    // 添加原点位置
    candidates.push({ x: 0, y: 0, z: 0 });
    
    // 基于已放置货物生成候选位置
    for (const item of container.packedItems) {
      const itemCargo = item.cargo;
      
      // 右侧位置
      candidates.push({
        x: item.x + itemCargo.length + gap,
        y: item.y,
        z: item.z
      });
      
      // 后方位置
      candidates.push({
        x: item.x,
        y: item.y,
        z: item.z + itemCargo.width + gap
      });
      
      // 上方位置（如果允许堆叠）
      if (allowStacking && !containerType.isFrameContainer && 
          (itemCargo.stackable !== false) && (cargo.stackable !== false)) {
        candidates.push({
          x: item.x,
          y: item.y + itemCargo.height,
          z: item.z
        });
      }
    }
    
    return candidates;
  }

  /**
   * 检查位置是否有效
   * @param cargo 货物
   * @param position 位置
   * @param container 容器解决方案
   * @param containerType 容器类型
   * @param gap 间隙
   * @returns 是否有效
   */
  private isValidPosition(
    cargo: Cargo,
    position: Position3D,
    container: ContainerSolution,
    containerType: ContainerType,
    gap: number
  ): boolean {
    // 检查边界
    if (position.x + cargo.length + gap > containerType.length ||
        position.z + cargo.width + gap > containerType.width ||
        (!containerType.isFrameContainer && position.y + cargo.height > containerType.height) ||
        position.x < 0 || position.y < 0 || position.z < 0) {
      return false;
    }
    
    // 检查与其他货物的碰撞
    for (const item of container.packedItems) {
      if (this.isColliding(cargo, position, item.cargo, { x: item.x, y: item.y, z: item.z }, gap)) {
        return false;
      }
    }
    
    return true;
  }

  /**
   * 检查两个货物是否碰撞
   * @param cargo1 货物1
   * @param pos1 位置1
   * @param cargo2 货物2
   * @param pos2 位置2
   * @param gap 间隙
   * @returns 是否碰撞
   */
  private isColliding(
    cargo1: Cargo,
    pos1: Position3D,
    cargo2: Cargo,
    pos2: Position3D,
    gap: number
  ): boolean {
    return !(pos1.x + cargo1.length + gap <= pos2.x ||
             pos2.x + cargo2.length + gap <= pos1.x ||
             pos1.y + cargo1.height <= pos2.y ||
             pos2.y + cargo2.height <= pos1.y ||
             pos1.z + cargo1.width + gap <= pos2.z ||
             pos2.z + cargo2.width + gap <= pos1.z);
  }

  /**
   * 展开货物数量
   * @param cargos 货物列表
   * @returns 展开后的货物列表
   */
  private expandCargos(cargos: Cargo[]): Cargo[] {
    const expanded: Cargo[] = [];
    
    for (const cargo of cargos) {
      for (let i = 0; i < cargo.quantity; i++) {
        expanded.push({
          ...cargo,
          id: `${cargo.id}_${i}`,
          quantity: 1
        });
      }
    }
    
    return expanded;
  }

  /**
   * 构建装箱结果
   * @param solution 装箱解决方案
   * @param containerType 容器类型
   * @param originalCargos 原始货物列表
   * @param cargoNameColors 货物名称颜色映射
   * @param config 装箱配置
   * @returns 装箱结果
   */
  private buildPackingResult(
    solution: BinPackingSolution,
    containerType: ContainerType,
    originalCargos: Cargo[],
    cargoNameColors?: Record<string, string>,
    config?: PackingConfig
  ): PackingResult {
    const packedItems: PackedItem[] = [];
    const containers: ContainerType[] = [];
    
    // 收集所有装箱物品
    for (const container of solution.containers) {
      containers.push(containerType);
      for (const item of container.packedItems) {
        const color = cargoNameColors?.[item.cargo.name] || 
                     getConsistentColor(item.cargo.name) || 
                     this.getRandomColor();
        
        packedItems.push({
          ...item,
          cargo: {
            ...item.cargo,
            color
          }
        });
      }
    }
    
    // 计算统计信息
    const totalVolume = solution.containers.reduce((sum, c) => sum + c.usedVolume, 0);
    const totalWeight = solution.containers.reduce((sum, c) => sum + c.usedWeight, 0);
    const containerVolume = containerType.length * containerType.width * containerType.height;
    const totalContainerVolume = solution.containers.length * containerVolume;
    const utilization = totalContainerVolume > 0 ? (totalVolume / totalContainerVolume) * 100 : 0;
    
    return {
      containerType,
      containerCount: solution.containers.length,
      utilization,
      totalCost: solution.containers.length * containerType.cost,
      packedItems,
      containers,
      unpackedItems: solution.unpackedCargos,
      totalVolume,
      totalWeight,
      utilizationRate: utilization,
      spaceOccupancyRate: utilization,
      algorithm: 'linear-programming',
      mode: config?.mode || 'multi_container',
      gap: config?.gap || 0.05
    };
  }
}

// 辅助接口定义
interface Position3D {
  x: number;
  y: number;
  z: number;
}

interface ContainerSolution {
  index: number;
  packedItems: PackedItem[];
  usedVolume: number;
  usedWeight: number;
}

interface BinPackingSolution {
  containers: ContainerSolution[];
  unpackedCargos: Cargo[];
}