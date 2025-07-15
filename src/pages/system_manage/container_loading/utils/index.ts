import { CARGO_COLORS } from '../constants';

/**
 * 获取随机颜色
 * @returns 随机颜色值
 */
export const getRandomColor = (): string => {
  return CARGO_COLORS[Math.floor(Math.random() * CARGO_COLORS.length)];
};

/**
 * 根据货物名称获取一致的颜色
 * @param cargoName 货物名称
 * @returns 颜色值
 */
export const getConsistentColor = (cargoName: string): string => {
  // 使用货物名称的哈希值来确保相同名称总是得到相同颜色
  let hash = 0;
  for (let i = 0; i < cargoName.length; i++) {
    const char = cargoName.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // 转换为32位整数
  }
  const index = Math.abs(hash) % CARGO_COLORS.length;
  return CARGO_COLORS[index];
};

/**
 * 生成唯一ID
 * @returns 唯一标识符
 */
export const generateId = (): string => {
  return Math.random().toString(36).substr(2, 9);
};

/**
 * 计算体积
 * @param length 长度
 * @param width 宽度
 * @param height 高度
 * @returns 体积
 */
export const calculateVolume = (length: number, width: number, height: number): number => {
  return length * width * height;
};

/**
 * 格式化数字
 * @param value 数值
 * @param precision 精度
 * @returns 格式化后的字符串
 */
export const formatNumber = (value: number, precision: number = 2): string => {
  return value.toFixed(precision);
};

/**
 * 格式化货币
 * @param value 数值
 * @returns 格式化后的货币字符串
 */
export const formatCurrency = (value: number): string => {
  return `¥${value.toLocaleString('zh-CN')}`;
};

/**
 * 格式化重量
 * @param value 重量值
 * @returns 格式化后的重量字符串
 */
export const formatWeight = (value: number): string => {
  return `${value.toLocaleString('zh-CN')} kg`;
};

/**
 * 格式化体积
 * @param value 体积值
 * @returns 格式化后的体积字符串
 */
export const formatVolume = (value: number): string => {
  return `${formatNumber(value)} m³`;
};

/**
 * 格式化尺寸
 * @param length 长度
 * @param width 宽度
 * @param height 高度
 * @returns 格式化后的尺寸字符串
 */
export const formatDimensions = (length: number, width: number, height: number): string => {
  return `${formatNumber(length)} × ${formatNumber(width)} × ${formatNumber(height)} m`;
};