// 集装箱类型定义
export interface ContainerType {
  name: string;
  length: number;
  width: number;
  height: number;
  maxWeight: number;
  cost: number;
  isFrameContainer?: boolean; // 是否为框架集装箱（无高度限制）
}

// 装箱算法类型
export type PackingAlgorithmType = 'greedy' | 'genetic' | 'simulated' | 'hybrid' | 'multi-container' | 'linear-programming';

// 成本优化策略类型
export type CostOptimizationStrategy = 'min_containers' | 'min_cost' | 'max_utilization' | 'none';

// 装箱模式类型
export type PackingModeType = 'single_container' | 'multi_container';

// 装箱配置
export interface PackingConfig {
  containerType?: ContainerType;
  algorithm: PackingAlgorithmType;
  mode: PackingModeType;
  allowMultipleContainers: boolean;
  costOptimizationStrategy?: CostOptimizationStrategy;
  gap?: number; // 货物间隙，单位：米，默认0.05米(5cm)
  allowStacking?: boolean; // 是否允许货物堆叠，默认为true
}

// 货物定义
export interface Cargo {
  id: string;
  name: string;
  length: number;
  width: number;
  height: number;
  weight: number;
  quantity: number;
  color?: string;
  stackable?: boolean; // 是否可以堆叠，默认为true（可堆叠）
}

// 装箱结果
export interface PackingResult {
  containerType: ContainerType;
  containerCount: number;
  utilization: number;
  totalCost: number;
  packedItems: PackedItem[];
  containers: ContainerType[];
  unpackedItems: Cargo[];
  totalVolume: number;
  totalWeight: number;
  utilizationRate: number;
  spaceOccupancyRate?: number; // 实际空间占用率（包含间隙），单位：百分比
  algorithm: PackingAlgorithmType;
  mode: PackingModeType;
  gap?: number; // 货物间隙，用于3D渲染时计算货物与集装箱内壁的距离
  executionTime?: number; // 算法执行时间，单位：毫秒
  iterations?: number; // 算法迭代次数
}

// 已装箱物品
export interface PackedItem {
  cargo: Cargo;
  x: number;
  y: number;
  z: number;
  containerIndex: number;
}

// 集装箱位置
export interface ContainerPosition {
  x: number;
  z: number;
}

// 3D场景属性
export interface Scene3DProps {
  packingResult: PackingResult | null;
  showGrid?: boolean;
}

// Container3D组件属性
export interface Container3DProps {
  containerType: ContainerType;
  position: [number, number, number];
  packedItems: PackedItem[];
  containerIndex: number;
  isHovered: boolean;
  onHover: (hovered: boolean) => void;
  gap?: number; // 货物间隙，用于计算货物与集装箱内壁的距离
}

// 地面组件属性
export interface ConcreteGroundProps {
  size?: number;
  position?: [number, number, number];
  containerPositions?: ContainerPosition[];
  containerType?: ContainerType;
  containerSpacing?: number;
}

// 安全标线组件属性
export interface SafetyMarkingsProps {
  containerPositions: ContainerPosition[];
  containerSpacing?: number;
}