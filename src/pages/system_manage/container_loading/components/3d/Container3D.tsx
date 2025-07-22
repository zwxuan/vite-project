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
  onHover,
  gap = 0.05 // 默认5cm间隙
}) => {
  const containerItems = packedItems.filter(item => item.containerIndex === containerIndex);

  return (
    <group position={position}>
      {/* 集装箱框架 - 根据是否为框架集装箱显示不同外观 */}
      {containerType.isFrameContainer ? (
        // 框架集装箱 - 只显示框架结构
        <>
          {/* 底部框架 */}
          <mesh 
            position={[0, -containerType.height/2 + 0.05, 0]}
            onPointerEnter={(event) => {
              event.stopPropagation();
              onHover(true);
            }}
            onPointerLeave={(event) => {
              event.stopPropagation();
              onHover(false);
            }}
          >
            <boxGeometry args={[containerType.length, 0.05, containerType.width]} />
            <meshStandardMaterial color={isHovered ? "#FF6B35" : "#E55100"} roughness={0.4}
              metalness={0.3} />
          </mesh>
          
          {/* 四个角柱 */}
          
          {/* 框架边框线 */}
          <lineSegments position={[0, containerType.height/2 - 0.05, 0]}>
            <edgesGeometry args={[new THREE.BoxGeometry(containerType.length, containerType.height, containerType.width)]} />
            <lineBasicMaterial color={isHovered ? "#FF8A50" : "#BF360C"} linewidth={6} />
          </lineSegments>
          
          {/* 框架集装箱的透明交互区域 - 用于鼠标事件检测 */}
          <mesh 
            position={[0, containerType.height/2 - 0.05, 0]}
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
              transparent 
              opacity={0} 
              depthWrite={false}
            />
          </mesh>
        </>
      ) : (
        // 普通集装箱 - 显示封闭箱体
        <mesh 
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
      )}
      
      {/* 普通集装箱的边框、底部和门 - 框架集装箱不显示这些 */}
      {!containerType.isFrameContainer && (
        <>
          {/* 集装箱边框 */}
          <lineSegments
            onPointerEnter={(event) => {
              event.stopPropagation();
              onHover(true);
            }}
            onPointerLeave={(event) => {
              event.stopPropagation();
              onHover(false);
            }}
          >
            <edgesGeometry args={[new THREE.BoxGeometry(containerType.length, containerType.height, containerType.width)]} />
            <lineBasicMaterial color={isHovered ? "#e60012" : "#2C2C2C"} linewidth={4} />
          </lineSegments>
          
          {/* 集装箱底部 */}
          <mesh 
            position={[0, -containerType.height/2 + 0.05, 0]} 
            onPointerEnter={(event) => {
              event.stopPropagation();
              onHover(true);
            }}
            onPointerLeave={(event) => {
              event.stopPropagation();
              onHover(false);
            }}
          >
            <boxGeometry args={[containerType.length, 0.1, containerType.width]} />
            <meshStandardMaterial 
              roughness={0.4}
              metalness={0.3}
            />
          </mesh>
          
          {/* 集装箱门 */}
          <mesh 
            position={[containerType.length/2 - 0.05, 0, 0]} 
            onPointerEnter={(event) => {
              event.stopPropagation();
              onHover(true);
            }}
            onPointerLeave={(event) => {
              event.stopPropagation();
              onHover(false);
            }}
          >
            <boxGeometry args={[0.1, containerType.height - 0.2, containerType.width - 0.2]} />
            <meshStandardMaterial 
              color="#2E86AB" 
              
              roughness={0.4}
              metalness={0.2}
            />
          </mesh>
        </>
      )}
      
      {/* 门把手 - 只有普通集装箱显示 */}
      {!containerType.isFrameContainer && (
        <>
          <group position={[containerType.length/2 + 0.05, 0, -containerType.width/4]}>
            {/* 门把手主体 - 长方形杆状 */}
            <mesh 
              position={[0, 0, 0]} 
              onPointerEnter={(event) => {
                event.stopPropagation();
                onHover(true);
              }}
              onPointerLeave={(event) => {
                event.stopPropagation();
                onHover(false);
              }}
            >
              <boxGeometry args={[0.08, 0.04, 0.25]} />
              <meshStandardMaterial 
                color="#2C2C2C" 
                roughness={0.4}
                metalness={0.8}
              />
            </mesh>
            {/* 门把手支架 */}
            <mesh 
              position={[-0.03, 0, 0]} 
              onPointerEnter={(event) => {
                event.stopPropagation();
                onHover(true);
              }}
              onPointerLeave={(event) => {
                event.stopPropagation();
                onHover(false);
              }}
            >
              <boxGeometry args={[0.02, 0.06, 0.3]} />
              <meshStandardMaterial 
                color="#1A1A1A" 
                roughness={0.3}
                metalness={0.9}
              />
            </mesh>
          </group>
          
          <group position={[containerType.length/2 + 0.05, 0, containerType.width/4]}>
            {/* 门把手主体 - 长方形杆状 */}
            <mesh 
              position={[0, 0, 0]} 
              onPointerEnter={(event) => {
                event.stopPropagation();
                onHover(true);
              }}
              onPointerLeave={(event) => {
                event.stopPropagation();
                onHover(false);
              }}
            >
              <boxGeometry args={[0.08, 0.04, 0.25]} />
              <meshStandardMaterial 
                color="#2C2C2C" 
                roughness={0.4}
                metalness={0.8}
              />
            </mesh>
            {/* 门把手支架 */}
            <mesh 
              position={[-0.03, 0, 0]} 
              onPointerEnter={(event) => {
                event.stopPropagation();
                onHover(true);
              }}
              onPointerLeave={(event) => {
                event.stopPropagation();
                onHover(false);
              }}
            >
              <boxGeometry args={[0.02, 0.06, 0.3]} />
              <meshStandardMaterial 
                color="#1A1A1A" 
                roughness={0.3}
                metalness={0.9}
              />
            </mesh>
          </group>
        </>
      )}
      
      {/* 门缝线 - 只有普通集装箱显示 */}
      {!containerType.isFrameContainer && (
        <mesh 
          position={[containerType.length/2 + 0.005, 0, 0]} 
          onPointerEnter={(event) => {
            event.stopPropagation();
            onHover(true);
          }}
          onPointerLeave={(event) => {
            event.stopPropagation();
            onHover(false);
          }}
        >
          <boxGeometry args={[0.02, containerType.height * 0.9, 0.02]} />
          <meshStandardMaterial 
            color="#222222" 
            roughness={0.8}
            metalness={0.1}
          />
        </mesh>
      )}
      
      {/* 集装箱角件 */}
      {[
        [-containerType.length/2, -containerType.height/2, -containerType.width/2],
        [containerType.length/2, -containerType.height/2, -containerType.width/2],
        [-containerType.length/2, containerType.height/2, -containerType.width/2],
        [containerType.length/2, containerType.height/2, -containerType.width/2],
        [-containerType.length/2, -containerType.height/2, containerType.width/2],
        [containerType.length/2, -containerType.height/2, containerType.width/2],
        [-containerType.length/2, containerType.height/2, containerType.width/2],
        [containerType.length/2, containerType.height/2, containerType.width/2]
      ].map((pos, index) => (
        <mesh 
          key={index} 
          position={pos as [number, number, number]}
          onPointerEnter={(event) => {
            event.stopPropagation();
            onHover(true);
          }}
          onPointerLeave={(event) => {
            event.stopPropagation();
            onHover(false);
          }}
        >
          <boxGeometry args={[0.15, 0.15, 0.15]} />
          <meshStandardMaterial color="#666666" metalness={0.7} roughness={0.3} />
        </mesh>
      ))}
      
      {/* 集装箱详细信息提示 - 悬停时显示 */}
      {isHovered && (
        <group position={[0, containerType.height/2 - 0.2, 0]}>
          {/* 主背景卡片 - 现代化设计 */}
          <Html position={[0, 0, 0.1]} transform>
            <div style={{
              background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.95) 0%, rgba(118, 75, 162, 0.95) 100%)',
              borderRadius: '16px',
              padding: '16px',
              minWidth: '260px',
              maxWidth: '300px',
              boxShadow: '0 20px 40px rgba(0,0,0,0.25), 0 8px 16px rgba(0,0,0,0.15), inset 0 1px 0 rgba(255,255,255,0.3)',
              border: '2px solid rgba(255,255,255,0.3)',
              backdropFilter: 'blur(20px) saturate(180%)',
              userSelect: 'none',
              fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Microsoft YaHei UI", "Microsoft YaHei", "PingFang SC", "Hiragino Sans GB", sans-serif',
              transform: 'translateY(-50%) scale(0.95)',
              transformOrigin: 'center',
              WebkitFontSmoothing: 'antialiased',
              MozOsxFontSmoothing: 'grayscale',
              textRendering: 'optimizeLegibility',
              WebkitBackfaceVisibility: 'hidden',
              backfaceVisibility: 'hidden',
              willChange: 'transform'
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
                    fontSize: '18px',
                    fontWeight: '800',
                    color: '#ffffff',
                    textShadow: '0 2px 4px rgba(0,0,0,0.6), 0 1px 2px rgba(0,0,0,0.3)',
                    letterSpacing: '0.5px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    filter: 'contrast(1.1) brightness(1.05)'
                  }}>
                  <span style={{
                      display: 'inline-flex',
                      width: '20px',
                      height: '20px',
                      background: 'rgba(255,255,255,0.25)',
                      borderRadius: '6px',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '14px',
                      boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
                      filter: 'brightness(1.2)'
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
                  background: 'linear-gradient(145deg, rgba(255,255,255,0.2), rgba(255,255,255,0.1))',
                  borderRadius: '10px',
                  padding: '10px',
                  border: '1px solid rgba(255,255,255,0.25)',
                  gridColumn: '1 / -1',
                  boxShadow: 'inset 0 1px 2px rgba(255,255,255,0.2), 0 1px 3px rgba(0,0,0,0.1)'
                }}>
                  <div style={{
                    fontSize: '12px',
                    color: 'rgba(255,255,255,0.95)',
                    marginBottom: '4px',
                    fontWeight: '700',
                    letterSpacing: '0.3px',
                    textShadow: '0 1px 2px rgba(0,0,0,0.3)'
                  }}>🏷️ 类型</div>
                  <div style={{
                    fontSize: '15px',
                    color: '#ffffff',
                    fontWeight: '800',
                    letterSpacing: '0.3px',
                    textShadow: '0 1px 3px rgba(0,0,0,0.4)',
                    filter: 'contrast(1.1)'
                  }}>{containerType.name}</div>
                </div>
                
                {/* 尺寸信息 */}
                <div style={{
                  background: 'linear-gradient(145deg, rgba(255,255,255,0.2), rgba(255,255,255,0.1))',
                  borderRadius: '10px',
                  padding: '10px',
                  border: '1px solid rgba(255,255,255,0.25)',
                  boxShadow: 'inset 0 1px 2px rgba(255,255,255,0.2), 0 1px 3px rgba(0,0,0,0.1)'
                }}>
                  <div style={{
                    fontSize: '12px',
                    color: 'rgba(255,255,255,0.95)',
                    marginBottom: '4px',
                    fontWeight: '700',
                    letterSpacing: '0.3px',
                    textShadow: '0 1px 2px rgba(0,0,0,0.3)'
                  }}>📏 尺寸</div>
                  <div style={{
                    fontSize: '13px',
                    color: '#ffffff',
                    fontWeight: '800',
                    letterSpacing: '0.2px',
                    textShadow: '0 1px 3px rgba(0,0,0,0.4)',
                    filter: 'contrast(1.1)'
                  }}>{`${containerType.length.toFixed(1)}×${containerType.width.toFixed(1)}×${containerType.height.toFixed(1)}m`}</div>
                </div>
                
                {/* 载重信息 */}
                <div style={{
                  background: 'linear-gradient(145deg, rgba(255,255,255,0.2), rgba(255,255,255,0.1))',
                  borderRadius: '10px',
                  padding: '10px',
                  border: '1px solid rgba(255,255,255,0.25)',
                  boxShadow: 'inset 0 1px 2px rgba(255,255,255,0.2), 0 1px 3px rgba(0,0,0,0.1)'
                }}>
                  <div style={{
                    fontSize: '12px',
                    color: 'rgba(255,255,255,0.95)',
                    marginBottom: '4px',
                    fontWeight: '700',
                    letterSpacing: '0.3px',
                    textShadow: '0 1px 2px rgba(0,0,0,0.3)'
                  }}>⚖️ 载重</div>
                  <div style={{
                    fontSize: '13px',
                    color: '#ffffff',
                    fontWeight: '800',
                    letterSpacing: '0.2px',
                    textShadow: '0 1px 3px rgba(0,0,0,0.4)',
                    filter: 'contrast(1.1)'
                  }}>{`${containerType.maxWeight.toLocaleString('zh-CN')} kg`}</div>
                </div>
                
                {/* 成本信息 */}
                <div style={{
                  background: 'linear-gradient(145deg, rgba(255,255,255,0.2), rgba(255,255,255,0.1))',
                  borderRadius: '10px',
                  padding: '10px',
                  border: '1px solid rgba(255,255,255,0.25)',
                  boxShadow: 'inset 0 1px 2px rgba(255,255,255,0.2), 0 1px 3px rgba(0,0,0,0.1)'
                }}>
                  <div style={{
                    fontSize: '12px',
                    color: 'rgba(255,255,255,0.95)',
                    marginBottom: '4px',
                    fontWeight: '700',
                    letterSpacing: '0.3px',
                    textShadow: '0 1px 2px rgba(0,0,0,0.3)'
                  }}>💰 成本</div>
                  <div style={{
                    fontSize: '13px',
                    color: '#ffffff',
                    fontWeight: '800',
                    letterSpacing: '0.2px',
                    textShadow: '0 1px 3px rgba(0,0,0,0.4)',
                    filter: 'contrast(1.1)'
                  }}>{`¥${containerType.cost.toLocaleString('zh-CN')}`}</div>
                </div>
                
                {/* 货物数量 */}
                <div style={{
                  background: 'linear-gradient(145deg, rgba(255,255,255,0.2), rgba(255,255,255,0.1))',
                  borderRadius: '10px',
                  padding: '10px',
                  border: '1px solid rgba(255,255,255,0.25)',
                  boxShadow: 'inset 0 1px 2px rgba(255,255,255,0.2), 0 1px 3px rgba(0,0,0,0.1)'
                }}>
                  <div style={{
                    fontSize: '12px',
                    color: 'rgba(255,255,255,0.95)',
                    marginBottom: '4px',
                    fontWeight: '700',
                    letterSpacing: '0.3px',
                    textShadow: '0 1px 2px rgba(0,0,0,0.3)'
                  }}>📦 货物</div>
                  <div style={{
                    fontSize: '13px',
                    color: '#ffffff',
                    fontWeight: '800',
                    letterSpacing: '0.2px',
                    textShadow: '0 1px 3px rgba(0,0,0,0.4)',
                    filter: 'contrast(1.1)'
                  }}>{`${containerItems.length} 件`}</div>
                </div>
              </div>
              
              {/* 底部装饰 */}
              
            </div>
          </Html>
        </group>
      )}

      {/* 货物 - 确保在集装箱内正确摆放 */}
      {containerItems.map((item, index) => (
        <group 
          key={`${item.cargo.id}-${index}`}
          position={[
            item.x - containerType.length/2 + item.cargo.length/2 + gap, // 添加与集装箱内壁的间隙
            containerType.isFrameContainer 
              ? -containerType.height/2 + item.y + item.cargo.height/2 + gap // 框架集装箱：从底部框架上表面开始计算
              : -containerType.height/2 + item.y + item.cargo.height/2 + gap, // 普通集装箱：从集装箱底部开始计算
            item.z - containerType.width/2 + item.cargo.width/2 + gap // 添加与集装箱内壁的间隙
          ]}
        >
          {/* 货物主体 */}
          <mesh
            onPointerEnter={(event) => {
              event.stopPropagation();
              onHover(true);
            }}
            onPointerLeave={(event) => {
              event.stopPropagation();
              onHover(false);
            }}
          >
            <boxGeometry args={[item.cargo.length, item.cargo.height, item.cargo.width]} />
            <meshStandardMaterial 
              color={item.cargo.color || '#3182CE'} 
              transparent={false}
              roughness={0.8}
              metalness={0.0}
              depthTest={true}
              depthWrite={true}
              side={THREE.FrontSide}
            />
          </mesh>
          
          {/* 货物边框 */}
          <lineSegments
            onPointerEnter={(event) => {
              event.stopPropagation();
              onHover(true);
            }}
            onPointerLeave={(event) => {
              event.stopPropagation();
              onHover(false);
            }}
          >
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