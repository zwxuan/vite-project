import { useState, useCallback } from 'react';
import { Cargo } from '../types';
import { generateId, getConsistentColor } from '../utils';

/**
 * 货物管理自定义Hook
 * 负责货物的增删改查操作
 */
export const useCargoManagement = () => {
  const [cargos, setCargos] = useState<Cargo[]>([]);
  const [cargoNameColors, setCargoNameColors] = useState<Record<string, string>>({});

  // 添加货物
  const addCargo = useCallback((cargoData: Omit<Cargo, 'id' | 'color'>) => {
    const { quantity = 1, ...baseCargoData } = cargoData;
    
    // 为货物名称分配颜色（如果还没有的话）
    setCargoNameColors(prev => {
      if (!prev[baseCargoData.name]) {
        return { ...prev, [baseCargoData.name]: getConsistentColor(baseCargoData.name) };
      }
      return prev;
    });
    
    setCargos(prev => {
      // 检查是否已存在相同名称和尺寸的货物
      const existingCargoIndex = prev.findIndex(cargo => 
        cargo.name === baseCargoData.name &&
        cargo.length === baseCargoData.length &&
        cargo.width === baseCargoData.width &&
        cargo.height === baseCargoData.height &&
        cargo.weight === baseCargoData.weight
      );
      
      if (existingCargoIndex !== -1) {
        // 如果存在相同货物，增加数量
        const updatedCargos = [...prev];
        updatedCargos[existingCargoIndex] = {
          ...updatedCargos[existingCargoIndex],
          quantity: updatedCargos[existingCargoIndex].quantity + quantity
        };
        return updatedCargos;
      } else {
        // 如果不存在，创建新货物
        const id = generateId();
        const color = cargoNameColors[baseCargoData.name] || getConsistentColor(baseCargoData.name);
        
        const newCargo: Cargo = {
          ...baseCargoData,
          quantity,
          id,
          color
        };
        
        return [...prev, newCargo];
      }
    });
  }, [cargoNameColors]);

  // 删除货物
  const deleteCargo = useCallback((id: string) => {
    const cargoToDelete = cargos.find(cargo => cargo.id === id);
    
    setCargos(prev => prev.filter(cargo => cargo.id !== id));
    
    // 如果删除的是该名称的最后一个货物，也删除颜色映射
    if (cargoToDelete) {
      const remainingCargosWithSameName = cargos.filter(cargo => 
        cargo.name === cargoToDelete.name && cargo.id !== id
      );
      
      if (remainingCargosWithSameName.length === 0) {
        setCargoNameColors(prev => {
          const newColors = { ...prev };
          delete newColors[cargoToDelete.name];
          return newColors;
        });
      }
    }
  }, [cargos]);

  // 获取货物颜色 - 根据货物名称返回相同颜色
  const getCargoColor = useCallback((id: string): string => {
    const cargo = cargos.find(c => c.id === id);
    if (!cargo) return '#3182CE';
    
    return cargoNameColors[cargo.name] || '#3182CE';
  }, [cargoNameColors, cargos]);

  // 清空所有货物
  const clearAllCargos = useCallback(() => {
    setCargos([]);
    setCargoNameColors({});
  }, []);

  // 批量添加货物
  const addMultipleCargos = useCallback((cargoList: Omit<Cargo, 'id' | 'color'>[]) => {
    const newCargos: Cargo[] = [];
    const newNameColors: Record<string, string> = {};
    
    cargoList.forEach(cargoData => {
      const id = generateId();
      
      // 为新的货物名称分配颜色
      if (!cargoNameColors[cargoData.name] && !newNameColors[cargoData.name]) {
        newNameColors[cargoData.name] = getConsistentColor(cargoData.name);
      }
      
      const color = cargoNameColors[cargoData.name] || newNameColors[cargoData.name];
      
      newCargos.push({
        ...cargoData,
        id,
        color
      });
    });
    
    setCargos(prev => [...prev, ...newCargos]);
    setCargoNameColors(prev => ({ ...prev, ...newNameColors }));
  }, [cargoNameColors]);

  return {
    cargos,
    cargoNameColors,
    addCargo,
    deleteCargo,
    getCargoColor,
    clearAllCargos,
    addMultipleCargos
  };
};