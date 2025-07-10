import React from 'react';
import * as THREE from 'three';
import { ConcreteGroundProps } from '../../types';

/**
 * 混凝土地面组件
 * 负责渲染3D场景的地面
 */
export const ConcreteGround: React.FC<ConcreteGroundProps> = ({ size = 50 }) => {
  // 调整地面大小，使其比集装箱大一点即可
  const groundSize = 30; // 减小地面尺寸
  
  return (
    <group>
      {/* 主地面 - 参考原始组件样式 */}
      <mesh 
        position={[0, -0.05, 0]} 
        rotation={[-Math.PI / 2, 0, 0]} 
        receiveShadow
      >
        <planeGeometry args={[groundSize, groundSize]} />
        <meshStandardMaterial 
          color="#D1D5DB" 
          roughness={0.9}
          metalness={0.05}
          side={THREE.DoubleSide}
        />
      </mesh>
      
      {/* 混凝土纹理层 */}
      <mesh 
        position={[0, -0.04, 0]} 
        rotation={[-Math.PI / 2, 0, 0]} 
        receiveShadow
      >
        <planeGeometry args={[groundSize * 0.95, groundSize * 0.95]} />
        <meshStandardMaterial 
          color="#E5E7EB" 
          roughness={0.8}
          metalness={0.1}
          transparent
          opacity={0.8}
        />
      </mesh>
    </group>
  );
};