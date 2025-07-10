import React from 'react';
import { Html } from '@react-three/drei';
import * as THREE from 'three';
import { Container3DProps } from '../../types';

/**
 * 3D集装箱组件
 * 负责渲染单个集装箱及其内部货物
 */
export const Container3D: React.FC<Container3DProps> = ({ 
  containerType, 
  position, 
  packedItems, 
  containerIndex, 
  isHovered, 
  onHover 
}) => {
  const containerItems = packedItems.filter(item => item.containerIndex === containerIndex);

  return (
    <group position={position}>
      {/* 集装箱框架 */}
      <mesh 
        castShadow={false} 
        receiveShadow
        onPointerEnter={(event) => {
          event.stopPropagation();
          onHover(true);
        }}
        onPointerLeave={(event) => {
          event.stopPropagation();
          onHover(false);
        }}
      >
        <boxGeometry args={[containerType.length, containerType.height, containerType.width]} />
        <meshStandardMaterial 
          color={isHovered ? "#5BA3F5" : "#4A90E2"} 
          transparent 
          opacity={0.3} 
          wireframe={false}
          roughness={0.4}
          metalness={0.2}
        />
      </mesh>
      
      {/* 集装箱边框 */}
      <lineSegments>
        <edgesGeometry args={[new THREE.BoxGeometry(containerType.length, containerType.height, containerType.width)]} />
        <lineBasicMaterial color="#2C5282" linewidth={2} />
      </lineSegments>
      
      {/* 集装箱底部 */}
      <mesh 
        position={[0, -containerType.height/2 + 0.05, 0]} 
        castShadow 
        receiveShadow
      >
        <boxGeometry args={[containerType.length, 0.1, containerType.width]} />
        <meshStandardMaterial 
          color="#2E86AB" 
          roughness={0.4}
          metalness={0.3}
        />
      </mesh>
      
      {/* 集装箱门 */}
      <mesh 
        position={[containerType.length/2 - 0.05, 0, 0]} 
        castShadow 
        receiveShadow
      >
        <boxGeometry args={[0.1, containerType.height * 0.9, containerType.width * 0.9]} />
        <meshStandardMaterial 
          color="#2E86AB" 
          transparent 
          opacity={0.8} 
          roughness={0.4}
          metalness={0.2}
        />
      </mesh>
      
      {/* 集装箱角件 */}
      {[
        [-containerType.length/2, -containerType.height/2, -containerType.width/2],
        [containerType.length/2, -containerType.height/2, -containerType.width/2],
        [-containerType.length/2, -containerType.height/2, containerType.width/2],
        [containerType.length/2, -containerType.height/2, containerType.width/2],
        [-containerType.length/2, containerType.height/2, -containerType.width/2],
        [containerType.length/2, containerType.height/2, -containerType.width/2],
        [-containerType.length/2, containerType.height/2, containerType.width/2],
        [containerType.length/2, containerType.height/2, containerType.width/2]
      ].map((pos, index) => (
        <mesh key={index} position={pos as [number, number, number]} castShadow={false} receiveShadow>
          <boxGeometry args={[0.2, 0.2, 0.2]} />
          <meshStandardMaterial color="#1A365D" metalness={0.8} roughness={0.2} />
        </mesh>
      ))}
      
      {/* 黄色安全标线 - 地面四角 */}
      {[
        [-containerType.length/2, -containerType.height/2 + 0.01, -containerType.width/2],
        [containerType.length/2, -containerType.height/2 + 0.01, -containerType.width/2],
        [-containerType.length/2, -containerType.height/2 + 0.01, containerType.width/2],
        [containerType.length/2, -containerType.height/2 + 0.01, containerType.width/2]
      ].map((pos, index) => (
        <group key={`safety-${index}`} position={[pos[0], pos[1], pos[2]]}>
          {/* L形安全标线 */}
          <mesh>
            <boxGeometry args={[0.8, 0.02, 0.05]} />
            <meshStandardMaterial color="#FFD700" emissive="#FFD700" emissiveIntensity={0.2} />
          </mesh>
          <mesh>
            <boxGeometry args={[0.05, 0.02, 0.8]} />
            <meshStandardMaterial color="#FFD700" emissive="#FFD700" emissiveIntensity={0.2} />
          </mesh>
        </group>
      ))}
      
      {/* 作业区域标记 - 圆形标记 */}
      {[
        [-containerType.length/2 - 1, -containerType.height/2 + 0.01, -containerType.width/2 - 1],
        [containerType.length/2 + 1, -containerType.height/2 + 0.01, -containerType.width/2 - 1],
        [-containerType.length/2 - 1, -containerType.height/2 + 0.01, containerType.width/2 + 1],
        [containerType.length/2 + 1, -containerType.height/2 + 0.01, containerType.width/2 + 1]
      ].map((pos, index) => (
        <mesh key={`work-area-${index}`} position={[pos[0], pos[1], pos[2]]} rotation={[-Math.PI/2, 0, 0]}>
          <ringGeometry args={[0.2, 0.3, 8]} />
          <meshStandardMaterial color="#FF6B35" emissive="#FF6B35" emissiveIntensity={0.3} />
        </mesh>
      ))}
      
      {/* 集装箱详细信息提示 - 悬停时显示 */}
      {isHovered && (
        <group position={[0, containerType.height/2 + 2.2, 0]}>
          {/* 主背景卡片 - 现代化设计 */}
          <Html position={[0, 0, 0.1]} transform>
            <div style={{
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              borderRadius: '12px',
              padding: '12px',
              minWidth: '240px',
              maxWidth: '280px',
              boxShadow: '0 12px 24px rgba(0,0,0,0.15), 0 4px 8px rgba(0,0,0,0.1)',
              border: '1px solid rgba(255,255,255,0.2)',
              backdropFilter: 'blur(10px)',
              userSelect: 'none',
              fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
              transform: 'translateY(-50%) scale(0.85)',
              transformOrigin: 'center'
            }}>
              {/* 标题区域 */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '10px',
                paddingBottom: '8px',
                borderBottom: '1px solid rgba(255,255,255,0.2)'
              }}>
                <div style={{
                  fontSize: '16px',
                  fontWeight: '600',
                  color: '#ffffff',
                  textShadow: '0 1px 2px rgba(0,0,0,0.3)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px'
                }}>
                  <span style={{
                    display: 'inline-block',
                    width: '18px',
                    height: '18px',
                    background: 'rgba(255,255,255,0.2)',
                    borderRadius: '4px',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '12px'
                  }}>📦</span>
                  {`集装箱 #${containerIndex + 1}`}
                </div>
              </div>
              
              {/* 信息网格 */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '8px'
              }}>
                {/* 类型信息 */}
                <div style={{
                  background: 'rgba(255,255,255,0.15)',
                  borderRadius: '8px',
                  padding: '8px',
                  border: '1px solid rgba(255,255,255,0.1)',
                  gridColumn: '1 / -1'
                }}>
                  <div style={{
                    fontSize: '10px',
                    color: 'rgba(255,255,255,0.8)',
                    marginBottom: '2px',
                    fontWeight: '500'
                  }}>🏷️ 类型</div>
                  <div style={{
                    fontSize: '13px',
                    color: '#ffffff',
                    fontWeight: '600'
                  }}>{containerType.name}</div>
                </div>
                
                {/* 尺寸信息 */}
                <div style={{
                  background: 'rgba(255,255,255,0.15)',
                  borderRadius: '8px',
                  padding: '8px',
                  border: '1px solid rgba(255,255,255,0.1)'
                }}>
                  <div style={{
                    fontSize: '10px',
                    color: 'rgba(255,255,255,0.8)',
                    marginBottom: '2px',
                    fontWeight: '500'
                  }}>📏 尺寸</div>
                  <div style={{
                    fontSize: '11px',
                    color: '#ffffff',
                    fontWeight: '600'
                  }}>{`${containerType.length.toFixed(1)}×${containerType.width.toFixed(1)}×${containerType.height.toFixed(1)}m`}</div>
                </div>
                
                {/* 载重信息 */}
                <div style={{
                  background: 'rgba(255,255,255,0.15)',
                  borderRadius: '8px',
                  padding: '8px',
                  border: '1px solid rgba(255,255,255,0.1)'
                }}>
                  <div style={{
                    fontSize: '10px',
                    color: 'rgba(255,255,255,0.8)',
                    marginBottom: '2px',
                    fontWeight: '500'
                  }}>⚖️ 载重</div>
                  <div style={{
                    fontSize: '11px',
                    color: '#ffffff',
                    fontWeight: '600'
                  }}>{`${containerType.maxWeight.toLocaleString('zh-CN')} kg`}</div>
                </div>
                
                {/* 成本信息 */}
                <div style={{
                  background: 'rgba(255,255,255,0.15)',
                  borderRadius: '8px',
                  padding: '8px',
                  border: '1px solid rgba(255,255,255,0.1)'
                }}>
                  <div style={{
                    fontSize: '10px',
                    color: 'rgba(255,255,255,0.8)',
                    marginBottom: '2px',
                    fontWeight: '500'
                  }}>💰 成本</div>
                  <div style={{
                    fontSize: '11px',
                    color: '#ffffff',
                    fontWeight: '600'
                  }}>{`¥${containerType.cost.toLocaleString('zh-CN')}`}</div>
                </div>
                
                {/* 货物数量 */}
                <div style={{
                  background: 'rgba(255,255,255,0.15)',
                  borderRadius: '8px',
                  padding: '8px',
                  border: '1px solid rgba(255,255,255,0.1)'
                }}>
                  <div style={{
                    fontSize: '10px',
                    color: 'rgba(255,255,255,0.8)',
                    marginBottom: '2px',
                    fontWeight: '500'
                  }}>📦 货物</div>
                  <div style={{
                    fontSize: '11px',
                    color: '#ffffff',
                    fontWeight: '600'
                  }}>{`${containerItems.length} 件`}</div>
                </div>
              </div>
              
              {/* 底部装饰 */}
              <div style={{
                marginTop: '10px',
                paddingTop: '8px',
                borderTop: '1px solid rgba(255,255,255,0.2)',
                textAlign: 'center'
              }}>
                <div style={{
                  fontSize: '9px',
                  color: 'rgba(255,255,255,0.7)',
                  fontWeight: '500'
                }}>悬停查看详细信息</div>
              </div>
            </div>
          </Html>
        </group>
      )}

      {/* 货物 - 确保在集装箱内正确摆放 */}
      {containerItems.map((item, index) => (
        <group 
          key={`${item.cargo.id}-${index}`}
          position={[
            item.x - containerType.length/2 + item.cargo.length/2,
            -containerType.height/2 + item.y + item.cargo.height/2, // 从集装箱底部开始计算
            item.z - containerType.width/2 + item.cargo.width/2
          ]}
        >
          {/* 货物主体 */}
          <mesh castShadow receiveShadow>
            <boxGeometry args={[item.cargo.length, item.cargo.height, item.cargo.width]} />
            <meshStandardMaterial 
              color={item.cargo.color || '#3182CE'} 
              transparent={false}
              roughness={0.3}
              metalness={0.1}
              depthTest={true}
              depthWrite={true}
              side={THREE.FrontSide}
            />
          </mesh>
          
          {/* 货物边框 */}
          <lineSegments>
            <edgesGeometry args={[new THREE.BoxGeometry(item.cargo.length, item.cargo.height, item.cargo.width)]} />
            <lineBasicMaterial 
              color="#000000" 
              linewidth={2} 
              transparent={false}
              depthTest={true}
              depthWrite={true}
              polygonOffset={true}
              polygonOffsetFactor={-1}
              polygonOffsetUnits={-1}
            />
          </lineSegments>
        </group>
      ))}
    </group>
  );
};