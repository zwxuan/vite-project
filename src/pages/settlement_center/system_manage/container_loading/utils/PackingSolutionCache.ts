import { PackingResult, Cargo, PackingConfig } from '../types';

/**
 * 装箱方案详细步骤
 */
export interface PackingStep {
  stepNumber: number;
  description: string;
  cargoName: string;
  cargoId: string;
  containerIndex: number;
  position: {
    x: number;
    y: number;
    z: number;
  };
  timestamp: number;
}

/**
 * 最终装箱方案
 */
export interface FinalPackingSolution {
  id: string;
  timestamp: number;
  packingResult: PackingResult;
  originalCargos: Cargo[];
  packingConfig: PackingConfig;
  packingSteps: PackingStep[];
  summary: {
    totalContainers: number;
    totalCargos: number;
    packedCargos: number;
    unpackedCargos: number;
    totalCost: number;
    utilizationRate: number;
    spaceOccupancyRate?: number;
  };
}

/**
 * 装箱方案缓存管理类
 */
export class PackingSolutionCache {
  private static readonly CACHE_KEY = 'packing_solutions_cache';
  private static readonly MAX_CACHE_SIZE = 10; // 最多缓存10个方案

  /**
   * 生成装箱步骤
   */
  static generatePackingSteps(packingResult: PackingResult): PackingStep[] {
    const steps: PackingStep[] = [];
    let stepNumber = 1;

    // 按容器索引和位置排序装箱项目
    const sortedPackedItems = [...packingResult.packedItems].sort((a, b) => {
      if (a.containerIndex !== b.containerIndex) {
        return a.containerIndex - b.containerIndex;
      }
      // 按z坐标（高度）排序，从底部开始
      if (Math.abs(a.z - b.z) > 0.01) {
        return a.z - b.z;
      }
      // 按y坐标（深度）排序
      if (Math.abs(a.y - b.y) > 0.01) {
        return a.y - b.y;
      }
      // 按x坐标（宽度）排序
      return a.x - b.x;
    });

    sortedPackedItems.forEach((item) => {
      const containerType = packingResult.containers[item.containerIndex];
      const step: PackingStep = {
        stepNumber: stepNumber++,
        description: `将货物 "${item.cargo.name}" 放置到集装箱 ${item.containerIndex + 1} (${containerType.name}) 的位置 (${item.x.toFixed(2)}, ${item.y.toFixed(2)}, ${item.z.toFixed(2)})`,
        cargoName: item.cargo.name,
        cargoId: item.cargo.id,
        containerIndex: item.containerIndex,
        position: {
          x: parseFloat(item.x.toFixed(2)),
          y: parseFloat(item.y.toFixed(2)),
          z: parseFloat(item.z.toFixed(2))
        },
        timestamp: Date.now()
      };
      steps.push(step);
    });

    return steps;
  }

  /**
   * 缓存装箱方案
   */
  static cacheSolution(
    packingResult: PackingResult,
    originalCargos: Cargo[],
    packingConfig: PackingConfig
  ): string {
    const solutionId = `solution_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    const packingSteps = this.generatePackingSteps(packingResult);
    
    const solution: FinalPackingSolution = {
      id: solutionId,
      timestamp: Date.now(),
      packingResult,
      originalCargos,
      packingConfig,
      packingSteps,
      summary: {
        totalContainers: packingResult.containerCount,
        totalCargos: originalCargos.reduce((sum, cargo) => sum + cargo.quantity, 0),
        packedCargos: packingResult.packedItems.length,
        unpackedCargos: packingResult.unpackedItems.length,
        totalCost: packingResult.totalCost,
        utilizationRate: packingResult.utilizationRate,
        spaceOccupancyRate: packingResult.spaceOccupancyRate
      }
    };

    // 获取现有缓存
    const existingSolutions = this.getCachedSolutions();
    
    // 添加新方案到开头
    existingSolutions.unshift(solution);
    
    // 限制缓存大小
    if (existingSolutions.length > this.MAX_CACHE_SIZE) {
      existingSolutions.splice(this.MAX_CACHE_SIZE);
    }
    
    // 保存到localStorage
    try {
      localStorage.setItem(this.CACHE_KEY, JSON.stringify(existingSolutions));
    } catch (error) {
      console.warn('装箱方案缓存保存失败:', error);
    }
    
    return solutionId;
  }

  /**
   * 获取缓存的装箱方案列表
   */
  static getCachedSolutions(): FinalPackingSolution[] {
    try {
      const cached = localStorage.getItem(this.CACHE_KEY);
      return cached ? JSON.parse(cached) : [];
    } catch (error) {
      console.warn('装箱方案缓存读取失败:', error);
      return [];
    }
  }

  /**
   * 根据ID获取特定的装箱方案
   */
  static getSolutionById(solutionId: string): FinalPackingSolution | null {
    const solutions = this.getCachedSolutions();
    return solutions.find(solution => solution.id === solutionId) || null;
  }

  /**
   * 删除特定的装箱方案
   */
  static deleteSolution(solutionId: string): boolean {
    try {
      const solutions = this.getCachedSolutions();
      const filteredSolutions = solutions.filter(solution => solution.id !== solutionId);
      localStorage.setItem(this.CACHE_KEY, JSON.stringify(filteredSolutions));
      return true;
    } catch (error) {
      console.warn('装箱方案删除失败:', error);
      return false;
    }
  }

  /**
   * 清空所有缓存的装箱方案
   */
  static clearAllSolutions(): boolean {
    try {
      localStorage.removeItem(this.CACHE_KEY);
      return true;
    } catch (error) {
      console.warn('装箱方案缓存清空失败:', error);
      return false;
    }
  }

  /**
   * 获取最新的装箱方案
   */
  static getLatestSolution(): FinalPackingSolution | null {
    const solutions = this.getCachedSolutions();
    return solutions.length > 0 ? solutions[0] : null;
  }
}