import React from 'react';
import * as THREE from 'three';
import { ConcreteGroundProps } from '../../types';

/**
 * 混凝土地面组件
 * 负责渲染3D场景的地面
 */
export const ConcreteGround: React.FC<ConcreteGroundProps> = ({ 
  size = 50, 
  containerPositions = [], 
  containerType,
  containerSpacing = 15 
}) => {
  // 动态计算地面大小，确保包含所有安全标线
  const calculateGroundSize = () => {
    if (containerPositions.length === 0 || !containerType) {
      return 25; // 减小默认大小
    }

    // 计算所有集装箱的边界
    const minX = Math.min(...containerPositions.map(pos => pos.x - containerType.length / 2));
    const maxX = Math.max(...containerPositions.map(pos => pos.x + containerType.length / 2));
    const minZ = Math.min(...containerPositions.map(pos => pos.z - containerType.width / 2));
    const maxZ = Math.max(...containerPositions.map(pos => pos.z + containerType.width / 2));

    // 优化安全标线的额外范围计算
    const safetyLineExtension = Math.max(containerSpacing / 2, 2); // 减小安全标线延伸范围
    const centralLineLength = 20; // 大幅减小中央导向线长度
    
    // 计算包含安全标线的总范围，减少额外边距
    const totalWidth = maxX - minX + safetyLineExtension * 2 + 5; // 减少额外边距
    const totalDepth = maxZ - minZ + safetyLineExtension * 2 + 5;
    
    // 确保地面能包含中央导向线，但不过度扩展
    const minSizeForCentralLine = Math.max(centralLineLength + 5, 25);
    
    return Math.max(totalWidth, totalDepth, minSizeForCentralLine); // 取最大值确保包含所有元素
  };

  const groundSize = calculateGroundSize();
  
  return (
    <group>
      {/* 极简地面 - 单一颜色，低调设计 */}
      <mesh 
        position={[0, -0.05, 0]} 
        rotation={[-Math.PI / 2, 0, 0]} 
        receiveShadow
      >
        <planeGeometry args={[groundSize, groundSize]} />
        <meshStandardMaterial 
          color="#FEFEFE" 
          roughness={0.98}
          metalness={0.005}
          side={THREE.DoubleSide}
        />
      </mesh>
    </group>
  );
};