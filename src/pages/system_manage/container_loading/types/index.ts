// 集装箱类型定义
export interface ContainerType {
  name: string;
  length: number;
  width: number;
  height: number;
  maxWeight: number;
  cost: number;
}

// 装箱算法类型
export type PackingAlgorithmType = 'greedy' | 'genetic' | 'simulated' | 'hybrid' | 'multi-container';

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
  algorithm: PackingAlgorithmType;
  mode: PackingModeType;
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
}

// 地面组件属性
export interface ConcreteGroundProps {
  size?: number;
  containerPositions?: ContainerPosition[];
  containerType?: ContainerType;
  containerSpacing?: number;
}

// 安全标线组件属性
export interface SafetyMarkingsProps {
  containerPositions: ContainerPosition[];
  containerSpacing?: number;
}