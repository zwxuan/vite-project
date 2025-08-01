import React, { useMemo } from 'react';
import { Typography } from 'antd';

const { Text } = Typography;

interface PositionVisualizationProps {
  containerLength: number;
  containerWidth: number;
  containerHeight: number;
  cargoPosition: {
    x: number;
    y: number;
    z: number;
  };
  cargoSize: {
    length: number;
    width: number;
    height: number;
  };
  isFrameContainer?: boolean;
}

export const PositionVisualization: React.FC<PositionVisualizationProps> = ({
  containerLength,
  containerWidth,
  containerHeight,
  cargoPosition,
  cargoSize,
  isFrameContainer = false
}) => {
  // 缩放比例 - 让图形适合显示区域，增大显示尺寸
  // 统一使用长宽作为缩放基准，避免高度差异影响显示比例
  const maxDimension = Math.max(containerLength, containerWidth);
  const scale = 200 / maxDimension; // 调整基础缩放比例，让显示更合适

  // 等轴投影参数
  const cos30 = Math.cos(Math.PI / 6); // ≈ 0.866
  const sin30 = Math.sin(Math.PI / 6); // = 0.5

  // 3D到2D的等轴投影转换函数
  const project3D = (x: number, y: number, z: number) => {
    return {
      x: (x - y) * cos30,
      y: (x + y) * sin30 - z
    };
  };

  // 缩放后的尺寸 - 框架箱和标准箱使用相同的长宽
  const scaledContainer = {
    length: containerLength * scale,
    width: containerWidth * scale,
    height: (isFrameContainer ? 2000 : containerHeight) * scale // 框架箱固定2000mm高度
  };

  const scaledCargo = {
    length: cargoSize.length * scale,
    width: cargoSize.width * scale,
    height: cargoSize.height * scale
  };

  const scaledPosition = {
    x: cargoPosition.x * scale,
    y: cargoPosition.y * scale,
    z: cargoPosition.z * scale
  };

  // 计算集装箱的顶点
  const containerVertices = useMemo(() => {
    // 直接使用scaledContainer.height，已经包含了框架箱的特殊处理
    const displayHeight = scaledContainer.height;
    
    // 所有集装箱都显示完整的8个顶点
    return [
      project3D(0, 0, 0),                                    // 左前下
      project3D(scaledContainer.length, 0, 0),               // 右前下
      project3D(scaledContainer.length, scaledContainer.width, 0), // 右后下
      project3D(0, scaledContainer.width, 0),                // 左后下
      project3D(0, 0, displayHeight),                        // 左前上
      project3D(scaledContainer.length, 0, displayHeight),   // 右前上
      project3D(scaledContainer.length, scaledContainer.width, displayHeight), // 右后上
      project3D(0, scaledContainer.width, displayHeight),    // 左后上
    ];
  }, [containerLength, containerWidth, containerHeight, isFrameContainer, scaledContainer, project3D, scale]);

  // 计算货物的8个顶点
  const cargoVertices = [
    project3D(scaledPosition.x, scaledPosition.y, scaledPosition.z),
    project3D(scaledPosition.x + scaledCargo.length, scaledPosition.y, scaledPosition.z),
    project3D(scaledPosition.x + scaledCargo.length, scaledPosition.y + scaledCargo.width, scaledPosition.z),
    project3D(scaledPosition.x, scaledPosition.y + scaledCargo.width, scaledPosition.z),
    project3D(scaledPosition.x, scaledPosition.y, scaledPosition.z + scaledCargo.height),
    project3D(scaledPosition.x + scaledCargo.length, scaledPosition.y, scaledPosition.z + scaledCargo.height),
    project3D(scaledPosition.x + scaledCargo.length, scaledPosition.y + scaledCargo.width, scaledPosition.z + scaledCargo.height),
    project3D(scaledPosition.x, scaledPosition.y + scaledCargo.width, scaledPosition.z + scaledCargo.height)
  ];

  // 简化居中显示逻辑
  const centerX = 225; // SVG画布中心X坐标
  const centerY = 150; // SVG画布中心Y坐标

  // 调整顶点坐标，使用固定居中显示
  const adjustedContainerVertices = containerVertices.map(v => ({
    x: v.x + centerX,
    y: v.y + centerY
  }));
  
  const adjustedCargoVertices = cargoVertices.map(v => ({
    x: v.x + centerX,
    y: v.y + centerY
  }));

  return (
    <div style={{ textAlign: 'center', padding: '16px', backgroundColor: '#fafafa', borderRadius: '6px' }}>
      <div style={{ marginBottom: '12px' }}>
        <svg 
          width="450" 
          height="300" 
          viewBox="0 0 450 300" 
          style={{ border: '1px solid #d9d9d9', borderRadius: '4px', backgroundColor: 'white' }}
        >
           {/* 集装箱线框 */}
           <g stroke="#ff4d4f" strokeWidth="2" fill="none">
              {/* 统一的集装箱立体显示 - 框架箱和标准箱使用相同方式 */}
              <>
                {/* 底面 */}
                <polygon 
                  points={`${adjustedContainerVertices[0].x},${adjustedContainerVertices[0].y} ${adjustedContainerVertices[1].x},${adjustedContainerVertices[1].y} ${adjustedContainerVertices[2].x},${adjustedContainerVertices[2].y} ${adjustedContainerVertices[3].x},${adjustedContainerVertices[3].y}`} 
                  strokeDasharray={isFrameContainer ? "8,4" : "none"}
                  fill={isFrameContainer ? "rgba(255, 77, 79, 0.3)" : "none"}
                  strokeWidth={isFrameContainer ? "3" : "2"}
                />
                {/* 顶面 */}
                <polygon 
                  points={`${adjustedContainerVertices[4].x},${adjustedContainerVertices[4].y} ${adjustedContainerVertices[5].x},${adjustedContainerVertices[5].y} ${adjustedContainerVertices[6].x},${adjustedContainerVertices[6].y} ${adjustedContainerVertices[7].x},${adjustedContainerVertices[7].y}`} 
                  strokeDasharray={isFrameContainer ? "8,4" : "none"}
                  fill={isFrameContainer ? "rgba(255, 77, 79, 0.2)" : "none"}
                  strokeWidth={isFrameContainer ? "3" : "2"}
                />
                {/* 垂直边 */}
                <line 
                  x1={adjustedContainerVertices[0].x} y1={adjustedContainerVertices[0].y} 
                  x2={adjustedContainerVertices[4].x} y2={adjustedContainerVertices[4].y} 
                  strokeDasharray={isFrameContainer ? "8,4" : "none"}
                  strokeWidth={isFrameContainer ? "3" : "2"}
                />
                <line 
                  x1={adjustedContainerVertices[1].x} y1={adjustedContainerVertices[1].y} 
                  x2={adjustedContainerVertices[5].x} y2={adjustedContainerVertices[5].y} 
                  strokeDasharray={isFrameContainer ? "8,4" : "none"}
                  strokeWidth={isFrameContainer ? "3" : "2"}
                />
                <line 
                  x1={adjustedContainerVertices[2].x} y1={adjustedContainerVertices[2].y} 
                  x2={adjustedContainerVertices[6].x} y2={adjustedContainerVertices[6].y} 
                  strokeDasharray={isFrameContainer ? "8,4" : "none"}
                  strokeWidth={isFrameContainer ? "3" : "2"}
                />
                <line 
                  x1={adjustedContainerVertices[3].x} y1={adjustedContainerVertices[3].y} 
                  x2={adjustedContainerVertices[7].x} y2={adjustedContainerVertices[7].y} 
                  strokeDasharray={isFrameContainer ? "8,4" : "none"}
                  strokeWidth={isFrameContainer ? "3" : "2"}
                />
                
                
              </>
           </g>

          {/* 货物立体块 - 增强立体感 */}
          <g>
            {/* 货物底面 */}
            <polygon 
              points={`${adjustedCargoVertices[0].x},${adjustedCargoVertices[0].y} ${adjustedCargoVertices[1].x},${adjustedCargoVertices[1].y} ${adjustedCargoVertices[2].x},${adjustedCargoVertices[2].y} ${adjustedCargoVertices[3].x},${adjustedCargoVertices[3].y}`}
              fill="rgba(24, 144, 255, 0.6)"
              stroke="#1890ff"
              strokeWidth="1"
            />
            {/* 货物顶面 - 最亮 */}
            <polygon 
              points={`${adjustedCargoVertices[4].x},${adjustedCargoVertices[4].y} ${adjustedCargoVertices[5].x},${adjustedCargoVertices[5].y} ${adjustedCargoVertices[6].x},${adjustedCargoVertices[6].y} ${adjustedCargoVertices[7].x},${adjustedCargoVertices[7].y}`}
              fill="rgba(24, 144, 255, 0.9)"
              stroke="#1890ff"
              strokeWidth="2"
            />
            {/* 货物右侧面 - 中等亮度 */}
            <polygon 
              points={`${adjustedCargoVertices[1].x},${adjustedCargoVertices[1].y} ${adjustedCargoVertices[2].x},${adjustedCargoVertices[2].y} ${adjustedCargoVertices[6].x},${adjustedCargoVertices[6].y} ${adjustedCargoVertices[5].x},${adjustedCargoVertices[5].y}`}
              fill="rgba(24, 144, 255, 0.7)"
              stroke="#1890ff"
              strokeWidth="2"
            />
            {/* 货物前侧面 - 较暗 */}
            <polygon 
              points={`${adjustedCargoVertices[2].x},${adjustedCargoVertices[2].y} ${adjustedCargoVertices[3].x},${adjustedCargoVertices[3].y} ${adjustedCargoVertices[7].x},${adjustedCargoVertices[7].y} ${adjustedCargoVertices[6].x},${adjustedCargoVertices[6].y}`}
              fill="rgba(24, 144, 255, 0.5)"
              stroke="#1890ff"
              strokeWidth="2"
            />
            {/* 货物边缘线 - 增强立体感 */}
            <g stroke="#0050b3" strokeWidth="1" fill="none">
              <line x1={adjustedCargoVertices[0].x} y1={adjustedCargoVertices[0].y} x2={adjustedCargoVertices[4].x} y2={adjustedCargoVertices[4].y} />
              <line x1={adjustedCargoVertices[2].x} y1={adjustedCargoVertices[2].y} x2={adjustedCargoVertices[6].x} y2={adjustedCargoVertices[6].y} />
              <line x1={adjustedCargoVertices[3].x} y1={adjustedCargoVertices[3].y} x2={adjustedCargoVertices[7].x} y2={adjustedCargoVertices[7].y} />
            </g>
          </g>

          {/* 坐标轴 */}
           <g stroke="#666" strokeWidth="1" fill="#666" fontSize="10">
             {/* X轴 */}
             <line x1={adjustedContainerVertices[0].x - 15} y1={adjustedContainerVertices[0].y} x2={adjustedContainerVertices[1].x - 15} y2={adjustedContainerVertices[1].y} markerEnd="url(#arrowhead)" />
             <text x={adjustedContainerVertices[1].x - 10} y={adjustedContainerVertices[1].y - 5} fontSize="10" fill="#cf1322">X({containerLength})</text>
             
             {/* Y轴 */}
             <line x1={adjustedContainerVertices[0].x} y1={adjustedContainerVertices[0].y + 15} x2={adjustedContainerVertices[3].x} y2={adjustedContainerVertices[3].y + 15} markerEnd="url(#arrowhead)" />
             <text x={adjustedContainerVertices[3].x + 5} y={adjustedContainerVertices[3].y + 20} fontSize="10" fill="#389e0d">Y({containerWidth})</text>
             
             {/* Z轴 - 框架箱显示固定5000mm，普通集装箱显示实际高度 */}
             {adjustedContainerVertices.length > 4 && (
               <>
                 <line x1={adjustedContainerVertices[0].x - 15} y1={adjustedContainerVertices[0].y} x2={adjustedContainerVertices[4].x - 15} y2={adjustedContainerVertices[4].y} markerEnd="url(#arrowhead)" />
                 <text x={adjustedContainerVertices[4].x - 25} y={adjustedContainerVertices[4].y - 5} fontSize="10" fill="#1d39c4">
                   Z({isFrameContainer ? '2000' : containerHeight})
                 </text>
               </>
             )}
           </g>

          {/* 箭头标记定义 */}
          <defs>
            <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
              <polygon points="0 0, 10 3.5, 0 7" fill="#666" />
            </marker>
          </defs>
        </svg>
      </div>

      {/* 图例和信息 */}
       <div style={{ marginTop: '12px' }}>
         <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', marginBottom: '8px' }}>
           <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '11px' }}>
             <div style={{ 
               width: '16px', 
               height: '10px', 
               border: isFrameContainer ? '2px dashed #ff4d4f' : '2px solid #ff4d4f', 
               backgroundColor: 'transparent' 
             }}></div>
             <span style={{ color: '#666' }}>
               集装箱边界
             </span>
           </div>
           <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '11px' }}>
             <div style={{ width: '16px', height: '10px', backgroundColor: 'rgba(24, 144, 255, 0.6)', border: '1px solid #1890ff' }}></div>
             <span style={{ color: '#666' }}>货物位置</span>
           </div>
         </div>
        
        <div style={{ textAlign: 'center', fontSize: '11px', color: '#666' }}>
          <div style={{ marginBottom: '4px' }}>
            <Text strong>货物尺寸：</Text>
            <Text code style={{ fontSize: '10px', margin: '0 4px' }}>长{cargoSize.length}</Text>
            <Text code style={{ fontSize: '10px', margin: '0 4px' }}>宽{cargoSize.width}</Text>
            <Text code style={{ fontSize: '10px', margin: '0 4px' }}>高{cargoSize.height}</Text>
          </div>
          <div>
            <Text strong>放置位置：</Text>
            <Text code style={{ fontSize: '10px', color: '#cf1322', margin: '0 2px' }}>X:{cargoPosition.x}</Text>
            <Text code style={{ fontSize: '10px', color: '#389e0d', margin: '0 2px' }}>Y:{cargoPosition.y}</Text>
            <Text code style={{ fontSize: '10px', color: '#1d39c4', margin: '0 2px' }}>Z:{cargoPosition.z}</Text>
          </div>
        </div>
      </div>
    </div>
  );
};