import { Cargo, ContainerType, PackingResult, PackingConfig, PackedItem } from '../types';
import { BaseAlgorithm } from './base/BaseAlgorithm';
import { CONTAINER_TYPES } from '../constants';
import { getConsistentColor } from '../utils';

/**
 * 线性规划装箱算法
 * 使用线性规划方法优化集装箱装箱问题，以最大化利用率和最小化成本
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
   * 使用线性规划方法优化容器选择
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
    let bestScore = -1;

    // 为每种容器类型计算装箱方案
    for (const containerType of CONTAINER_TYPES) {
      const result = this.solveLinearProgramming(cargos, containerType, cargoNameColors, config);
      
      if (result) {
        // 计算综合评分：利用率权重0.6 + 成本效率权重0.4
        const utilizationScore = result.utilization / 100;
        const costEfficiency = 1 / (result.totalCost + 1); // 避免除零
        const score = utilizationScore * 0.6 + costEfficiency * 0.4;
        
        if (score > bestScore) {
          bestScore = score;
          bestResult = result;
        }
      }
    }

    if (bestResult && startTime) {
      bestResult.executionTime = Date.now() - startTime;
    }

    return bestResult;
  }

  /**
   * 线性规划求解器核心算法
   * @param cargos 货物列表
   * @param containerType 集装箱类型
   * @param cargoNameColors 货物名称颜色映射
   * @param config 装箱配置
   * @returns 装箱结果
   */
  private solveLinearProgramming(
    cargos: Cargo[], 
    containerType: ContainerType, 
    cargoNameColors?: Record<string, string>, 
    config?: PackingConfig
  ): PackingResult | null {
    const gap = config?.gap || 0.05;
    const allowStacking = config?.allowStacking !== false;
    
    // 展开货物数量
    const expandedCargos = this.expandCargos(cargos);
    
    // 使用线性规划方法进行装箱优化
    const solution = this.linearProgrammingSolver(expandedCargos, containerType, gap, allowStacking);
    
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
   * 线性规划求解器实现
   * 使用简化的线性规划方法求解装箱问题
   * @param cargos 展开后的货物列表
   * @param containerType 集装箱类型
   * @param gap 间隙
   * @param allowStacking 是否允许堆叠
   * @returns 求解方案
   */
  private linearProgrammingSolver(
    cargos: Cargo[],
    containerType: ContainerType,
    gap: number,
    allowStacking: boolean
  ): LinearProgrammingSolution | null {
    const containers: ContainerSolution[] = [];
    const unpackedCargos: Cargo[] = [];
    
    // 按价值密度排序（体积/重量比）
    const sortedCargos = this.sortCargosByValueDensity(cargos);
    
    let currentContainer: ContainerSolution | null = null;
    
    for (const cargo of sortedCargos) {
      let placed = false;
      
      // 尝试在现有容器中放置
      for (const container of containers) {
        const position = this.findOptimalPosition(cargo, container, containerType, gap, allowStacking);
        if (position) {
          container.packedItems.push({
            cargo,
            x: position.x,
            y: position.y,
            z: position.z,
            containerIndex: container.index
          });
          container.usedVolume += cargo.length * cargo.width * cargo.height;
          container.usedWeight += cargo.weight;
          placed = true;
          break;
        }
      }
      
      // 如果无法放置在现有容器中，创建新容器
      if (!placed) {
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
   * 按价值密度排序货物
   * @param cargos 货物列表
   * @returns 排序后的货物列表
   */
  private sortCargosByValueDensity(cargos: Cargo[]): Cargo[] {
    return [...cargos].sort((a, b) => {
      // 计算价值密度：体积/重量比，体积越大、重量越轻的货物优先级越高
      const volumeA = a.length * a.width * a.height;
      const volumeB = b.length * b.width * b.height;
      const densityA = volumeA / (a.weight || 1);
      const densityB = volumeB / (b.weight || 1);
      
      // 优先考虑体积大的货物，然后考虑密度
      if (Math.abs(volumeB - volumeA) > 0.01) {
        return volumeB - volumeA;
      }
      return densityB - densityA;
    });
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
   * @param solution 线性规划解决方案
   * @param containerType 容器类型
   * @param originalCargos 原始货物列表
   * @param cargoNameColors 货物名称颜色映射
   * @param config 装箱配置
   * @returns 装箱结果
   */
  private buildPackingResult(
    solution: LinearProgrammingSolution,
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

interface LinearProgrammingSolution {
  containers: ContainerSolution[];
  unpackedCargos: Cargo[];
}