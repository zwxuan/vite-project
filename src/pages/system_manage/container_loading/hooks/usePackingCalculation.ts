import { useState, useCallback } from 'react';
import { message } from 'antd';
import { useTranslation } from 'react-i18next';
import { Cargo, PackingResult } from '../types';
import { PackingAlgorithm } from '../algorithms/PackingAlgorithm';

/**
 * 装箱计算自定义Hook
 * 负责装箱算法的调用和结果管理
 */
export const usePackingCalculation = () => {
  const { t } = useTranslation();
  const [packingResult, setPackingResult] = useState<PackingResult | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);

  // 计算装箱
  const calculatePacking = useCallback(async (cargos: Cargo[], cargoNameColors?: Record<string, string>) => {
    if (cargos.length === 0) {
      message.warning(t('container_loading.no_cargo_warning'));
      return;
    }

    setIsCalculating(true);
    
    try {
      // 模拟异步计算过程
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const result = PackingAlgorithm.calculateBestPacking(cargos, cargoNameColors);
      
      setPackingResult(result);
      
      if (!result) {
        message.error(t('container_loading.packing_failed'));
      } else if (result.packedItems.length === 0) {
        message.error(t('container_loading.packing_failed'));
      } else if (result.unpackedItems.length > 0) {
        message.warning(
          t('container_loading.partial_packing_warning', {
            packed: result.packedItems.length,
            unpacked: result.unpackedItems.length
          })
        );
      } else {
        message.success(t('container_loading.packing_success'));
      }
    } catch (error) {
      console.error('Packing calculation error:', error);
      message.error(t('container_loading.packing_error'));
    } finally {
      setIsCalculating(false);
    }
  }, [t]);

  // 清空装箱结果
  const clearPackingResult = useCallback(() => {
    setPackingResult(null);
  }, []);

  // 重新计算装箱
  const recalculatePacking = useCallback(async (cargos: Cargo[], cargoNameColors?: Record<string, string>) => {
    clearPackingResult();
    await calculatePacking(cargos, cargoNameColors);
  }, [calculatePacking, clearPackingResult]);

  return {
    packingResult,
    isCalculating,
    calculatePacking,
    clearPackingResult,
    recalculatePacking
  };
};