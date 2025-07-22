import React, { useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import { Container3D } from './Container3D';
import { ConcreteGround } from './ConcreteGround';
import { SafetyMarkings } from './SafetyMarkings';
import { Scene3DProps } from '../../types';
import { SCENE_CONFIG } from '../../constants';

/**
 * 3D场景组件
 * 负责渲染整个3D可视化场景
 */
export const Scene3D: React.FC<Scene3DProps> = ({ 
  packingResult, 
  showGrid = true 
}) => {
  const [hoveredContainer, setHoveredContainer] = useState<number | null>(null);

  // 计算集装箱位置 - 确保整体居中在地面中心点
  const containerSpacing = 15; // 增加集装箱间距，避免紧贴
  const containersPerRow = 3;
  const containerCount = packingResult?.containers.length || 0;
  const totalRows = Math.ceil(containerCount / containersPerRow);

  // 先计算集装箱位置
  const containerPositions = packingResult?.containers.map((container, index) => {
    const row = Math.floor(index / containersPerRow);
    const col = index % containersPerRow;
    
    // 计算相对于中心的位置
    // 对于单个集装箱，直接放在中心点(0,0)
    // 对于多个集装箱，围绕中心点对称分布
    let x, z;
    
    if (containerCount === 1) {
      // 单个集装箱直接放在中心
      x = 0;
      z = 0;
    } else {
      // 多个集装箱的情况，计算对称分布
      const totalWidth = (containersPerRow - 1) * containerSpacing;
      const totalDepth = (totalRows - 1) * containerSpacing;
      
      x = col * containerSpacing - totalWidth / 2;
      z = row * containerSpacing - totalDepth / 2;
    }
    
    return {
      x,
      y: container.height / 2 + 0.1, // 确保集装箱底部在地面以上，添加0.1米间隙
      z
    };
  }) || [];

  // 动态计算地面和网格大小，确保包含所有安全标线
  const calculateGroundSize = () => {
    if (containerCount === 0 || !packingResult?.containerType) {
      return 25; // 减小默认大小
    }

    const containerType = packingResult.containerType;
    
    // 计算所有集装箱位置的边界
    const positions = containerPositions;
    if (positions.length === 0) {
      return 25;
    }
    
    const minX = Math.min(...positions.map(pos => pos.x - containerType.length / 2));
    const maxX = Math.max(...positions.map(pos => pos.x + containerType.length / 2));
    const minZ = Math.min(...positions.map(pos => pos.z - containerType.width / 2));
    const maxZ = Math.max(...positions.map(pos => pos.z + containerType.width / 2));

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

  const dynamicGroundSize = calculateGroundSize();

  return (
    <Canvas
      shadows
      camera={{
        position: [20, 15, 20], // 参考原始组件的相机位置
        fov: 60,
        near: 0.1,
        far: 1000
      }}
      style={{ background: 'linear-gradient(to bottom, #87CEEB 0%, #E0F6FF 50%, #87CEEB 100%)' }}
    >
      {/* 光照系统 - 参考原始组件配置 */}
      <ambientLight intensity={0.2} />
      <directionalLight
        position={[10, 20, 5]}
        intensity={1.2}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-camera-far={50}
        shadow-camera-left={-30}
        shadow-camera-right={30}
        shadow-camera-top={30}
        shadow-camera-bottom={-30}
      />
      <pointLight 
        position={[5, 15, 5]} 
        intensity={0.0}
        
      />
      
      {/* 相机控制 - 参考原始组件配置 */}
      <OrbitControls
        target={[0, 0, 0]} // 围绕中心点旋转
        enablePan={true}
        enableZoom={true}
        enableRotate={true}
        minDistance={5}
        maxDistance={100}
        maxPolarAngle={Math.PI * 0.9}
        minPolarAngle={Math.PI * 0.1}
        panSpeed={0.8}
        rotateSpeed={0.5}
        zoomSpeed={0.8}
        enableDamping={true}
        dampingFactor={0.05}
      />
      
      {/* 混凝土地面 - 动态调整大小 */}
      <ConcreteGround 
        containerPositions={containerPositions}
        containerType={packingResult?.containerType}
        containerSpacing={containerSpacing}
      />
      
      {/* 安全标线 */}
      <SafetyMarkings 
        containerPositions={containerPositions}
        containerSpacing={containerSpacing}
      />
      
      {/* 可选网格 - 浅色设计 */}
      {showGrid && (
        <gridHelper 
          args={[dynamicGroundSize, 30, '#888888', '#CCCCCC']} 
          position={[0, 0.01, 0]} 
        />
      )}
      
      {/* 集装箱渲染 */}
      {packingResult?.containers.map((container, containerIndex) => {
        const position = containerPositions[containerIndex];
        if (!position) return null;
        
        return (
          <group key={containerIndex}>
            
            
            
            
            {/* Container3D 组件 */}
            <Container3D
              containerType={container}
              position={[position.x, position.y, position.z]}
              packedItems={packingResult.packedItems}
              containerIndex={containerIndex}
              isHovered={hoveredContainer === containerIndex}
              onHover={(hovered) => {
                if (hovered) {
                  setHoveredContainer(containerIndex);
                } else if (hoveredContainer === containerIndex) {
                  // 只有当前悬停的集装箱离开时才清除状态
                  setHoveredContainer(null);
                }
              }}
              gap={packingResult.gap || 0.05}
            />
          </group>
        );
      })}
    </Canvas>
  );
};