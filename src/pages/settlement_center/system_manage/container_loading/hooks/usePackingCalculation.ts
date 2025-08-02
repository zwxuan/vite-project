import { useState, useCallback } from 'react';
import { message } from 'antd';
import { useTranslation } from 'react-i18next';
import { Cargo, PackingResult, PackingConfig } from '../types';
import { GreedyAlgorithm } from '../algorithms/GreedyAlgorithm';

/**
 * 装箱计算自定义Hook
 * 负责装箱算法的调用和结果管理
 */
export const usePackingCalculation = () => {
  const { t } = useTranslation();
  const [packingResult, setPackingResult] = useState<PackingResult | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);

  // 计算装箱
  const calculatePacking = useCallback(async (cargos: Cargo[], cargoNameColors?: Record<string, string>, config?: PackingConfig) => {
    if (cargos.length === 0) {
      message.warning('请先添加货物');
      return;
    }

    setIsCalculating(true);
    
    try {
      // 模拟异步计算过程
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // 使用贪心算法进行装箱计算
      const algorithm = new GreedyAlgorithm();
      const result = algorithm.execute(cargos, cargoNameColors, config);
      
      // 添加调试日志
      console.log('装箱计算结果:', {
        result,
        packedItemsCount: result?.packedItems?.length || 0,
        unpackedItemsCount: result?.unpackedItems?.length || 0,
        containers: result?.containers?.length || 0
      });
      
      setPackingResult(result);
      
      if (!result) {
        message.error('装箱计算失败');
      } else if (result.packedItems.length === 0) {
        message.error('装箱计算失败，无法装载任何货物');
      } else if (result.unpackedItems.length > 0) {
        const totalCargos = cargos.reduce((sum, cargo) => sum + cargo.quantity, 0);
        const packedCount = result.packedItems.length;
        const unpackedCount = totalCargos - packedCount;
        message.warning(
          `装箱完成，已装载 ${packedCount} 件货物，未装载 ${unpackedCount} 件货物`
        );
      } else {
        message.success('装箱计算完成，所有货物已成功装载');
      }
    } catch (error) {
      console.error('Packing calculation error:', error);
      message.error('装箱计算过程中发生错误');
    } finally {
      setIsCalculating(false);
    }
  }, []);

  // 清空装箱结果
  const clearPackingResult = useCallback(() => {
    setPackingResult(null);
  }, []);

  // 重新计算装箱
  const recalculatePacking = useCallback(async (cargos: Cargo[], cargoNameColors?: Record<string, string>, config?: PackingConfig) => {
    clearPackingResult();
    await calculatePacking(cargos, cargoNameColors, config);
  }, [calculatePacking, clearPackingResult]);

  return {
    packingResult,
    isCalculating,
    calculatePacking,
    clearPackingResult,
    recalculatePacking
  };
};