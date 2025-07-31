import { ContainerType, PackingAlgorithmType, PackingModeType, CostOptimizationStrategy } from '../types';

// 预定义集装箱类型
export const CONTAINER_TYPES: ContainerType[] = [
  { name: '20尺标准箱', length: 5.9, width: 2.35, height: 2.39, maxWeight: 28000, cost: 2000 },
  { name: '40尺标准箱', length: 12.03, width: 2.35, height: 2.39, maxWeight: 30000, cost: 3500 },
  { name: '40尺高箱', length: 12.03, width: 2.35, height: 2.69, maxWeight: 30000, cost: 3800 },
  { name: '45尺高箱', length: 13.56, width: 2.35, height: 2.69, maxWeight: 32000, cost: 4200 },
  { name: '40FR框架箱', length: 12.03, width: 2.35, height: 99.99, maxWeight: 30000, cost: 4000, isFrameContainer: true }
];

// 货物颜色配置
export const CARGO_COLORS = [
  '#E53E3E', '#38A169', '#3182CE', '#D69E2E', 
  '#805AD5', '#DD6B20', '#E53E3E', '#38A169'
];

// 装箱算法选项
export const PACKING_ALGORITHMS = [
  { value: 'greedy' as PackingAlgorithmType, label: '贪心算法', description: '快速装箱，优先选择当前最优解，货物种类相对简单，数量不太多的场景' }
];

// 成本优化策略选项
export const COST_OPTIMIZATION_STRATEGIES = [
  { value: 'none' as CostOptimizationStrategy, label: '无优化策略', description: '使用基础算法' },
];

// 装箱模式选项
export const PACKING_MODES = [
  { value: 'single_container' as PackingModeType, label: '单集装箱模式', description: '只使用一个集装箱装载' },
  { value: 'multi_container' as PackingModeType, label: '多集装箱模式', description: '允许使用多个集装箱装载' }
];

// 默认装箱配置
export const DEFAULT_PACKING_CONFIG = {
  algorithm: 'greedy' as PackingAlgorithmType,
  mode: 'multi_container' as PackingModeType,
  allowMultipleContainers: true,
  gap: 0.05, // 默认5cm间隙
  allowStacking: true // 默认允许堆叠
};

// 3D场景配置
export const SCENE_CONFIG = {
  CAMERA: {
    POSITION: [15, 12, 15] as [number, number, number],
    FOV: 60,
    NEAR: 0.01,
    FAR: 2000
  },
  LIGHTING: {
    AMBIENT_INTENSITY: 0.3,
    DIRECTIONAL_INTENSITY: 1.0,
    SECONDARY_INTENSITY: 0.4,
    POINT_INTENSITY: 0.3
  },
  CONTROLS: {
    MAX_POLAR_ANGLE: Math.PI * 0.9,
    MIN_POLAR_ANGLE: Math.PI * 0.1,
    MIN_DISTANCE: 1,
    MAX_DISTANCE: 500,
    PAN_SPEED: 0.8,
    ROTATE_SPEED: 0.5,
    ZOOM_SPEED: 0.8,
    DAMPING_FACTOR: 0.05
  },
  SPACING: {
    CONTAINER_GAP: 4,
    CARGO_GAP: 0.05
  }
};