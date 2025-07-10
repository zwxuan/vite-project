import React, { useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Grid } from '@react-three/drei';
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
  const containerSpacing = 8; // 减小间距适应地面大小
  const containersPerRow = 3;
  const containerCount = packingResult?.containers.length || 0;
  const totalRows = Math.ceil(containerCount / containersPerRow);
  
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
      y: container.height / 2, // 确保集装箱在地面以上
      z
    };
  }) || [];

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
      <ambientLight intensity={0.4} />
      <directionalLight
        position={[10, 20, 5]}
        intensity={0.8}
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
        intensity={0.3}
        castShadow 
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
      
      {/* 混凝土地面 - 调整大小 */}
      <ConcreteGround size={30} />
      
      {/* 安全标线 */}
      <SafetyMarkings 
        containerPositions={containerPositions}
        containerSpacing={containerSpacing}
      />
      
      {/* 可选网格 - 调整大小 */}
      {showGrid && (
        <gridHelper 
          args={[30, Math.floor(30/2), '#999999', '#cccccc']} 
          position={[0, 0.01, 0]} 
        />
      )}
      
      {/* 集装箱渲染 */}
      {packingResult?.containers.map((container, containerIndex) => {
        const position = containerPositions[containerIndex];
        if (!position) return null;
        
        return (
          <group key={containerIndex}>
            {/* 集装箱基础平台 - 参考原始组件样式 */}
            <mesh 
              position={[position.x, 0.02, position.z]}
              onPointerEnter={() => setHoveredContainer(containerIndex)}
              onPointerLeave={() => setHoveredContainer(null)}
            >
              <boxGeometry args={[container.length + 0.2, 0.04, container.width + 0.2]} />
              <meshStandardMaterial 
                color={hoveredContainer === containerIndex ? "#66BB6A" : "#4CAF50"} 
                transparent 
                opacity={hoveredContainer === containerIndex ? 0.6 : 0.4}
                roughness={0.3}
                metalness={0.1}
              />
            </mesh>
            
            {/* 集装箱编号标识 - 参考原始组件样式 */}
            <mesh position={[position.x, 0.06, position.z - container.width/2 - 0.5]}>
              <planeGeometry args={[1, 0.3]} />
              <meshBasicMaterial color="#2196F3" />
            </mesh>
            
            {/* Container3D 组件 */}
            <Container3D
              containerType={container}
              position={[position.x, position.y, position.z]}
              packedItems={packingResult.packedItems}
              containerIndex={containerIndex}
              isHovered={hoveredContainer === containerIndex}
              onHover={(hovered) => setHoveredContainer(hovered ? containerIndex : null)}
            />
          </group>
        );
      })}
    </Canvas>
  );
};