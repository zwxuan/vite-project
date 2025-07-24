import React from 'react';
import { Html, Text } from '@react-three/drei';
import * as THREE from 'three';

interface Ruler3DProps {
  containerType: {
    length: number;
    width: number;
    height: number;
  };
  position: [number, number, number];
}

/**
 * 3D标尺组件
 * 在集装箱周边显示长宽高标尺，提供直观的尺寸参考
 * 样式参考CAD软件的尺寸标注
 */
export const Ruler3D: React.FC<Ruler3DProps> = ({ 
  containerType, 
  position,
}) => {
  const lineColor = '#34495E';
  const rulerOpacity = 0.9;
  
  // 标尺线的厚度和参数
  const lineThickness = 0.01;
  const extensionLength = 0.8; // 延伸线长度
  const dimensionOffset = 0.7; // 尺寸线距离集装箱的距离
  const arrowSize = 0.08; // 箭头大小
  
  // 刻度参数
  const majorTickInterval = 1.0; // 大刻度间隔 (1米)
  const minorTickInterval = 0.1; // 小刻度间隔 (10厘米)
  const majorTickLength = 0.25; // 大刻度长度 - 增加长度
  const minorTickLength = 0.15; // 小刻度长度 - 增加长度
  const tickThickness = 0.02; // 刻度线厚度 - 增加厚度
  
  // 生成刻度线的函数
  const generateTicks = (length: number, direction: 'x' | 'y' | 'z', containerDimension: number) => {
    const ticks = [];
    const tickCount = Math.floor(length / minorTickInterval);
    
    for (let i = 0; i <= tickCount; i++) {
      const position = (i * minorTickInterval) - length / 2;
      const isMajorTick = i % Math.round(majorTickInterval / minorTickInterval) === 0;
      const tickLength = isMajorTick ? majorTickLength : minorTickLength;
      
      let tickPosition: [number, number, number];
      let tickGeometry: [number, number, number];
      let textPosition: [number, number, number] | null = null;
      let textRotation: [number, number, number] | null = null;
      
      if (direction === 'x') {
        // X轴方向的刻度（长度标尺）- 贴地面
        tickPosition = [position, 0, 0];
        tickGeometry = [tickThickness, tickThickness, tickLength];
        if (isMajorTick) {
          textPosition = [position, 0.01, tickLength + 0.05];
          textRotation = [-Math.PI/2, 0, 0];
        }
      } else if (direction === 'z') {
        // Z轴方向的刻度（宽度标尺）- 贴地面
        tickPosition = [0, 0, position];
        tickGeometry = [tickLength, tickThickness, tickThickness];
        if (isMajorTick) {
          textPosition = [tickLength + 0.05, 0.01, position];
          textRotation = [-Math.PI/2, 0, Math.PI/2];
        }
      } else {
        // Y轴方向的刻度（高度标尺）- 30度向外
        tickPosition = [-tickLength / 2 * 0.05, position, tickLength / 2 * 0.066];
        tickGeometry = [tickLength / 2 * 0.05, 0.02, tickLength * 0.92];
        if (isMajorTick) {
          textPosition = [-tickLength * 0.001, position, tickLength * 1.4];
          textRotation = [0, 360, Math.PI*2];
        }
      }
      
      // 添加刻度线
      ticks.push(
        <mesh key={`tick-${direction}-${i}`} position={tickPosition}>
          <boxGeometry args={tickGeometry} />
          <meshStandardMaterial 
            color={isMajorTick ? '#e60012' : '#000000'} 
            transparent={false}
          />
        </mesh>
      );
      
      // 为主刻度添加3D文字数值
      if (isMajorTick && textPosition && textRotation) {
        // 计算从起点开始的距离，确保从小到大标注
        let value: number;
        if (direction === 'x') {
          // 长度标尺：从左到右（-length/2 到 +length/2）
          value = ((position + length / 2) / containerDimension) * containerDimension * 100;
        } else if (direction === 'z') {
          // 宽度标尺：从前到后（-width/2 到 +width/2）
          value = ((position + length / 2) / containerDimension) * containerDimension * 100;
        } else {
          // 高度标尺：从底部到顶部（-height/2 到 +height/2）
          value = ((position + length / 2) / containerDimension) * containerDimension * 100;
        }
        
        ticks.push(
          <Text
            key={`label-${direction}-${i}`}
            position={textPosition}
            rotation={textRotation}
            fontSize={0.25}
            color="#000000"
            anchorX="center"
            anchorY="middle"
            outlineWidth={0.02}
            outlineColor="#ffffff"
          >
            {Math.round(value).toString()}
          </Text>
        );
      }
    }
    
    return ticks;
  };
  
  return (
    <group position={position}>
      {/* 长度标尺 (X轴) - 底部 */}
      <group position={[0, -1.25, containerType.width/2 + 0.5]}>
        {/* 左侧延伸线 */}
        <mesh position={[-containerType.length/2, 0, 0.15]}>
          <boxGeometry args={[lineThickness, lineThickness, 1.3]} />
          <meshStandardMaterial color={lineColor} transparent opacity={rulerOpacity} />
        </mesh>
        
        {/* 右侧延伸线 */}
        <mesh position={[containerType.length/2, 0, 0.15]}>
          <boxGeometry args={[lineThickness, lineThickness, 1.3]} />
          <meshStandardMaterial color={lineColor} transparent opacity={rulerOpacity} />
        </mesh>
        
        {/* 主尺寸线 */}
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[containerType.length, lineThickness, lineThickness]} />
          <meshStandardMaterial color={lineColor} transparent opacity={rulerOpacity} />
        </mesh>
        
        {/* 长度刻度线 */}
        {generateTicks(containerType.length, 'x', containerType.length)}
        
        {/* 左箭头 */}
        <mesh position={[-containerType.length/2 + arrowSize, 0, 0]} rotation={[0, 0, Math.PI/2]}>
          <coneGeometry args={[arrowSize/2, arrowSize, 3]} />
          <meshStandardMaterial color={lineColor} transparent opacity={rulerOpacity} />
        </mesh>
        
        {/* 右箭头 */}
        <mesh position={[containerType.length/2 - arrowSize, 0, 0]} rotation={[0, 0, -Math.PI/2]}>
          <coneGeometry args={[arrowSize/2, arrowSize, 3]} />
          <meshStandardMaterial color={lineColor} transparent opacity={rulerOpacity} />
        </mesh>
        
        {/* 长度单位标签 */}
        <Text
          position={[containerType.length/2 + 0.1, 0.1, 0]}
          rotation={[-Math.PI/2, 0, 0]}
          fontSize={0.25}
          color="#000000"
          anchorX="left"
          anchorY="middle"
          outlineWidth={0.02}
          outlineColor="#ffffff"
        >
          cm
        </Text>

      </group>
      
      {/* 宽度标尺 (Z轴) - 右侧 */}
      <group position={[containerType.length/2 + dimensionOffset, -1.25, 0]}>
        {/* 前侧延伸线 */}
        <mesh position={[-0.15, 0, -containerType.width/2]}>
          <boxGeometry args={[1.3, lineThickness, lineThickness]} />
          <meshStandardMaterial color={lineColor} transparent opacity={rulerOpacity} />
        </mesh>
        
        {/* 后侧延伸线 */}
        <mesh position={[-0.15, 0, containerType.width/2]}>
          <boxGeometry args={[1.3, lineThickness, lineThickness]} />
          <meshStandardMaterial color={lineColor} transparent opacity={rulerOpacity} />
        </mesh>
        
        {/* 主尺寸线 */}
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[lineThickness, lineThickness, containerType.width]} />
          <meshStandardMaterial color={lineColor} transparent opacity={rulerOpacity} />
        </mesh>
        
        {/* 宽度刻度线 */}
        {generateTicks(containerType.width, 'z', containerType.width)}
        
        {/* 前箭头 */}
        <mesh position={[0, 0, -containerType.width/2 + arrowSize]} rotation={[Math.PI/2, 0, 0]}>
          <coneGeometry args={[arrowSize/2, arrowSize, 3]} />
          <meshStandardMaterial color={lineColor} transparent opacity={rulerOpacity} />
        </mesh>
        
        {/* 后箭头 */}
        <mesh 
          position={[0, 0, containerType.width/2 - arrowSize]} 
          rotation={[-Math.PI/2, 0, 0]}
          onPointerEnter={(event) => event.stopPropagation()}
          onPointerLeave={(event) => event.stopPropagation()}
        >
          <coneGeometry args={[arrowSize/2, arrowSize, 3]} />
          <meshStandardMaterial color={lineColor} transparent opacity={rulerOpacity} />
        </mesh>
        
        {/* 宽度单位标签 */}
        <Text
          position={[0.1, 0.1, containerType.width/2 + 0.5]}
          rotation={[-Math.PI/2, 0, Math.PI/2]}
          fontSize={0.25}
          color="#000000"
          anchorX="left"
          anchorY="middle"
          outlineWidth={0.02}
          outlineColor="#ffffff"
        >
          cm
        </Text>

      </group>
      
      {/* 高度标尺 (Y轴) - 左前角30度，整体向左旋转30度 */}
      <group position={[-containerType.length/2 - dimensionOffset * 0.5, 0, containerType.width/2 + dimensionOffset * 0.866]} rotation={[0, -Math.PI/6, 0]}>
        {/* 底部延伸线 - 30度向外 */}
        <mesh position={[-extensionLength/2 * 0.5 + 0.2, -containerType.height/2, extensionLength/2 * 0.866]}>
          <boxGeometry args={[extensionLength/2 * 0.02, lineThickness, extensionLength * 0.866]} />
          <meshStandardMaterial color={lineColor} transparent opacity={rulerOpacity} />
        </mesh>
        
        {/* 顶部延伸线 - 30度向外 */}
        <mesh position={[-extensionLength/2 * 0.5 + 0.2, containerType.height/2, extensionLength/2 * 0.866]}>
          <boxGeometry args={[extensionLength/2 * 0.02, lineThickness, extensionLength * 0.866]} />
          <meshStandardMaterial color={lineColor} transparent opacity={rulerOpacity} />
        </mesh>
        
        {/* 主尺寸线 */}
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[lineThickness/2 * 0.5, containerType.height, lineThickness]} />
          <meshStandardMaterial color={lineColor} transparent opacity={rulerOpacity} />
        </mesh>
        
        {/* 高度刻度线 */}
        {generateTicks(containerType.height, 'y', containerType.height)}
        
        {/* 底部箭头 */}
        <mesh position={[0, -containerType.height/2 + arrowSize, 0]} rotation={[0, 0, Math.PI]}>
          <coneGeometry args={[arrowSize/2, arrowSize, 3]} />
          <meshStandardMaterial color={lineColor} transparent opacity={rulerOpacity} />
        </mesh>
        
        {/* 顶部箭头 */}
        <mesh 
          position={[0, containerType.height/2 - arrowSize, 0]}
          onPointerEnter={(event) => event.stopPropagation()}
          onPointerLeave={(event) => event.stopPropagation()}
        >
          <coneGeometry args={[arrowSize/2, arrowSize, 3]} />
          <meshStandardMaterial color={lineColor} transparent opacity={rulerOpacity} />
        </mesh>
        
        {/* 高度单位标签 */}
        <Text
          position={[0.1, containerType.height/2 + 0.3, 0]}
          rotation={[0, 360, 0]}
          fontSize={0.25}
          color="#000000"
          anchorX="left"
          anchorY="middle"
          outlineWidth={0.02}
          outlineColor="#ffffff"
        >
          cm
        </Text>

      </group>
    </group>
  );
};