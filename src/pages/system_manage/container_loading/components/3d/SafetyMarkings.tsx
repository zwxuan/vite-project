import React from 'react';
import { SafetyMarkingsProps } from '../../types';

/**
 * 安全标线组件
 * 负责渲染地面的安全标记线
 */
export const SafetyMarkings: React.FC<SafetyMarkingsProps> = ({ 
  containerPositions = [],
  containerSpacing = 15 
}) => {
  return (
    <group>
      {/* 主要安全标线 - 黄色实线 */}
      {containerPositions.map((pos, index) => (
        <group key={`safety-main-${index}`}>
          {/* 集装箱周围的安全区域标记 */}
          <mesh position={[pos.x, 0.01, pos.z - containerSpacing/2]} rotation={[-Math.PI/2, 0, 0]}>
            <planeGeometry args={[containerSpacing * 0.8, 0.2]} />
            <meshStandardMaterial 
              color="#FFD700" 
              emissive="#FFD700" 
              emissiveIntensity={0.3}
              transparent
              opacity={0.8}
            />
          </mesh>
          <mesh position={[pos.x, 0.01, pos.z + containerSpacing/2]} rotation={[-Math.PI/2, 0, 0]}>
            <planeGeometry args={[containerSpacing * 0.8, 0.2]} />
            <meshStandardMaterial 
              color="#FFD700" 
              emissive="#FFD700" 
              emissiveIntensity={0.3}
              transparent
              opacity={0.8}
            />
          </mesh>
          <mesh position={[pos.x - containerSpacing/2, 0.01, pos.z]} rotation={[-Math.PI/2, 0, Math.PI/2]}>
            <planeGeometry args={[containerSpacing * 0.8, 0.2]} />
            <meshStandardMaterial 
              color="#FFD700" 
              emissive="#FFD700" 
              emissiveIntensity={0.3}
              transparent
              opacity={0.8}
            />
          </mesh>
          <mesh position={[pos.x + containerSpacing/2, 0.01, pos.z]} rotation={[-Math.PI/2, 0, Math.PI/2]}>
            <planeGeometry args={[containerSpacing * 0.8, 0.2]} />
            <meshStandardMaterial 
              color="#FFD700" 
              emissive="#FFD700" 
              emissiveIntensity={0.3}
              transparent
              opacity={0.8}
            />
          </mesh>
        </group>
      ))}
      
      {/* 辅助标线 - 白色虚线效果 */}
      {containerPositions.map((pos, index) => (
        <group key={`safety-aux-${index}`}>
          {/* 对角线安全标记 */}
          {[
            [pos.x - 3, pos.z - 3],
            [pos.x + 3, pos.z - 3],
            [pos.x - 3, pos.z + 3],
            [pos.x + 3, pos.z + 3]
          ].map((cornerPos, cornerIndex) => (
            <mesh 
              key={`corner-${cornerIndex}`}
              position={[cornerPos[0], 0.02, cornerPos[1]]} 
              rotation={[-Math.PI/2, 0, 0]}
            >
              <ringGeometry args={[0.3, 0.5, 8]} />
              <meshStandardMaterial 
                color="#FFFFFF" 
                emissive="#FFFFFF" 
                emissiveIntensity={0.2}
                transparent
                opacity={0.6}
              />
            </mesh>
          ))}
        </group>
      ))}
      
      {/* 中央导向线 */}
      <mesh position={[0, 0.005, 0]} rotation={[-Math.PI/2, 0, 0]}>
        <planeGeometry args={[100, 0.3]} />
        <meshStandardMaterial 
          color="#FFFFFF" 
          emissive="#FFFFFF" 
          emissiveIntensity={0.1}
          transparent
          opacity={0.4}
        />
      </mesh>
      <mesh position={[0, 0.005, 0]} rotation={[-Math.PI/2, 0, Math.PI/2]}>
        <planeGeometry args={[100, 0.3]} />
        <meshStandardMaterial 
          color="#FFFFFF" 
          emissive="#FFFFFF" 
          emissiveIntensity={0.1}
          transparent
          opacity={0.4}
        />
      </mesh>
    </group>
  );
};