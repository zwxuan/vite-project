import React, { useState, useRef, useEffect, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Text } from '@react-three/drei';
import { Button, Card, Form, Input, InputNumber, Table, Space, message, Divider, Tooltip } from 'antd';
import { PlusOutlined, DeleteOutlined, PlayCircleOutlined } from '@ant-design/icons';
import * as THREE from 'three';
import './ContainerLoading.less';

// 集装箱类型定义
interface ContainerType {
  name: string;
  length: number;
  width: number;
  height: number;
  maxWeight: number;
  cost: number;
}

// 货物定义
interface Cargo {
  id: string;
  name: string;
  length: number;
  width: number;
  height: number;
  weight: number;
  quantity: number;
  color?: string;
}

// 装箱结果
interface PackingResult {
  containerType: ContainerType;
  containerCount: number;
  utilization: number;
  totalCost: number;
  packedItems: PackedItem[];
}

// 已装箱物品
interface PackedItem {
  cargo: Cargo;
  x: number;
  y: number;
  z: number;
  containerIndex: number;
}

// 预定义集装箱类型
const CONTAINER_TYPES: ContainerType[] = [
  { name: '20尺标准箱', length: 5.9, width: 2.35, height: 2.39, maxWeight: 28000, cost: 2000 },
  { name: '40尺标准箱', length: 12.03, width: 2.35, height: 2.39, maxWeight: 30000, cost: 3500 },
  { name: '40尺高箱', length: 12.03, width: 2.35, height: 2.69, maxWeight: 30000, cost: 3800 },
  { name: '45尺高箱', length: 13.56, width: 2.35, height: 2.69, maxWeight: 32000, cost: 4200 }
];

// 3D集装箱组件
const Container3D: React.FC<{
  containerType: ContainerType;
  position: [number, number, number];
  packedItems: PackedItem[];
  containerIndex: number;
  isHovered: boolean;
  onHover: (hovered: boolean) => void;
}> = ({ containerType, position, packedItems, containerIndex, isHovered, onHover }) => {
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
      
      {/* 集装箱编号标识 */}
       <Text
         position={[0, containerType.height/2 + 0.3, containerType.width/2 + 0.1]}
         fontSize={0.4}
         color="#1A365D"
         anchorX="center"
         anchorY="middle"
       >
         {`Container ${containerIndex + 1}`}
       </Text>
      
      {/* 货物 */}
      {containerItems.map((item, index) => (
        <group 
          key={`${item.cargo.id}-${index}`}
          position={[
            item.x - containerType.length/2 + item.cargo.length/2,
            item.y - containerType.height/2 + item.cargo.height/2,
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
          
          {/* 货物标签 */}
          <Text
            position={[0, item.cargo.height/2 + 0.1, item.cargo.width/2 + 0.05]}
            fontSize={Math.min(0.15, item.cargo.length * 0.1)}
            color="#2D3748"
            anchorX="center"
            anchorY="middle"
          >
            {item.cargo.name}
          </Text>
        </group>
      ))}
    </group>
  );
};

// 混凝土地面组件
const ConcreteGround: React.FC<{ size: number }> = ({ size }) => {
  const texture = useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 512;
    const ctx = canvas.getContext('2d')!;
    
    // 创建混凝土纹理
    ctx.fillStyle = '#e8e8e8';
    ctx.fillRect(0, 0, 512, 512);
    
    // 添加噪点
    for (let i = 0; i < 2000; i++) {
      const x = Math.random() * 512;
      const y = Math.random() * 512;
      const gray = Math.floor(Math.random() * 60) + 180;
      ctx.fillStyle = `rgb(${gray}, ${gray}, ${gray})`;
      ctx.fillRect(x, y, 1, 1);
    }
    
    // 添加裂纹效果
    ctx.strokeStyle = '#d0d0d0';
    ctx.lineWidth = 0.5;
    for (let i = 0; i < 20; i++) {
      ctx.beginPath();
      ctx.moveTo(Math.random() * 512, Math.random() * 512);
      ctx.lineTo(Math.random() * 512, Math.random() * 512);
      ctx.stroke();
    }
    
    return new THREE.CanvasTexture(canvas);
  }, []);
  
  texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(8, 8);
  
  return (
    <mesh position={[0, -0.01, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
      <planeGeometry args={[size, size]} />
      <meshStandardMaterial map={texture} roughness={0.8} metalness={0.1} />
    </mesh>
  );
};

// 安全标线组件
const SafetyMarkings: React.FC<{ containerPositions: Array<{x: number, z: number}>, containerType: ContainerType }> = ({ containerPositions, containerType }) => {
  return (
    <group>
      {containerPositions.map((pos, index) => (
        <group key={index}>
          {/* 定位标记 */}
          <mesh position={[pos.x, 0.008, pos.z]}>
            <cylinderGeometry args={[0.1, 0.1, 0.02, 8]} />
            <meshBasicMaterial color="#FF0000" />
          </mesh>
        </group>
      ))}
    </group>
  );
};

// 3D场景组件
const Scene3D: React.FC<{ 
  packingResult: PackingResult | null;
  hoveredContainer: number | null;
  setHoveredContainer: (index: number | null) => void;
}> = ({ packingResult, hoveredContainer, setHoveredContainer }) => {
  const controlsRef = useRef<any>(null);
  
  if (!packingResult) {
    return (
      <div className="h-96 bg-gray-100 flex items-center justify-center">
        <p className="text-gray-500">请先进行装箱计算</p>
      </div>
    );
  }

  const containers = Array.from({ length: packingResult.containerCount }, (_, i) => i);
  const cols = Math.ceil(Math.sqrt(packingResult.containerCount));
  const spacing = Math.max(packingResult.containerType.length, packingResult.containerType.width) + 4;
  
  // 计算集装箱位置 - 确保整体居中
  const containerPositions = containers.map((containerIndex) => {
    const row = Math.floor(containerIndex / cols);
    const col = containerIndex % cols;
    const rows = Math.ceil(packingResult.containerCount / cols);
    
    // 计算偏移量，使集装箱群组居中
    const xOffset = (cols - 1) * spacing / 2;
    const zOffset = (rows - 1) * spacing / 2;
    
    const x = col * spacing - xOffset;
    const z = row * spacing - zOffset;
    return { x, z };
  });
  
  // 计算场景大小 - 只比集装箱稍微大一点
  const sceneSize = spacing * Math.max(cols, Math.ceil(packingResult.containerCount / cols)) + 8;

  return (
    <div style={{ width: '100%', height: '100%' }}>
      <Canvas 
        camera={{ 
          position: [15, 12, 15], 
          fov: 60,
          near: 0.01,
          far: 2000
        }} 
        style={{ width: '100%', height: '100%' }}
        shadows
        gl={{ 
          antialias: true, 
          alpha: false,
          depth: true,
          stencil: false,
          preserveDrawingBuffer: false,
          powerPreference: "high-performance",
          logarithmicDepthBuffer: true
        }}
      >
        {/* 改进的光照系统 */}
        <ambientLight intensity={0.3} color="#ffffff" />
        <directionalLight 
          position={[15, 20, 10]} 
          intensity={1.0} 
          castShadow 
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
          shadow-camera-far={50}
          shadow-camera-left={-20}
          shadow-camera-right={20}
          shadow-camera-top={20}
          shadow-camera-bottom={-20}
          shadow-bias={-0.0005}
          shadow-normalBias={0.02}
          shadow-radius={4}
        />
        <directionalLight 
          position={[-10, 15, -10]} 
          intensity={0.4} 
          color="#87CEEB"
          castShadow={false}
        />
        <pointLight position={[0, 10, 0]} intensity={0.3} color="#FFF8DC" />
        
        {/* 改进的 OrbitControls 配置，围绕地面中心旋转 */}
        <OrbitControls
          ref={controlsRef}
          enablePan={true}
          enableZoom={true}
          enableRotate={true}
          target={new THREE.Vector3(0, 0, 0)}
          maxPolarAngle={Math.PI * 0.9}
          minPolarAngle={Math.PI * 0.1}
          minDistance={1}
          maxDistance={500}
          panSpeed={0.8}
          rotateSpeed={0.5}
          zoomSpeed={0.8}
          enableDamping={true}
          dampingFactor={0.05}
          autoRotate={false}
          autoRotateSpeed={0.5}
          screenSpacePanning={false}
        />
        
        {/* 混凝土地面 */}
        <ConcreteGround size={sceneSize} />
        
        {/* 安全标线和作业区域 */}
        <SafetyMarkings containerPositions={containerPositions} containerType={packingResult.containerType} />
        
        {/* 可选网格 */}
        <gridHelper 
          args={[sceneSize, Math.floor(sceneSize/2), '#999999', '#cccccc']} 
          position={[0, 0.01, 0]} 
          visible={true}
        />
        
        {containers.map((containerIndex) => {
          const pos = containerPositions[containerIndex];
          const isHovered = hoveredContainer === containerIndex;
          
          const tooltipContent = (
            <div>
              <div><strong>集装箱 #{containerIndex + 1}</strong></div>
              <div>类型: {packingResult.containerType.name}</div>
              <div>尺寸: {packingResult.containerType.length}×{packingResult.containerType.width}×{packingResult.containerType.height}m</div>
              <div>载重: {packingResult.containerType.maxWeight}kg</div>
              <div>货物数量: {packingResult.packedItems.filter(item => item.containerIndex === containerIndex).length}件</div>
            </div>
          );
          
          return (
            <group key={containerIndex}>
              {/* 集装箱基础平台 */}
              <mesh 
                position={[pos.x, 0.02, pos.z]}
                onPointerEnter={() => setHoveredContainer(containerIndex)}
                onPointerLeave={() => setHoveredContainer(null)}
              >
                <boxGeometry args={[packingResult.containerType.length + 0.2, 0.04, packingResult.containerType.width + 0.2]} />
                <meshStandardMaterial 
                  color={isHovered ? "#66BB6A" : "#4CAF50"} 
                  transparent 
                  opacity={isHovered ? 0.6 : 0.4}
                  roughness={0.3}
                  metalness={0.1}
                />
              </mesh>
              
              {/* 集装箱编号标识 */}
              <mesh position={[pos.x, 0.06, pos.z - packingResult.containerType.width/2 - 0.5]}>
                <planeGeometry args={[1, 0.3]} />
                <meshBasicMaterial color="#2196F3" />
              </mesh>
              
              <Container3D
                containerType={packingResult.containerType}
                position={[pos.x, packingResult.containerType.height / 2, pos.z] as [number, number, number]}
                packedItems={packingResult.packedItems}
                containerIndex={containerIndex}
                isHovered={isHovered}
                onHover={(hovered) => setHoveredContainer(hovered ? containerIndex : null)}
              />
              
              {/* 悬停时的信息显示 */}
              {isHovered && (
                <group>
                  {/* 高亮边框 */}
                  <lineSegments position={[pos.x, packingResult.containerType.height / 2, pos.z]}>
                    <edgesGeometry args={[new THREE.BoxGeometry(
                      packingResult.containerType.length + 0.1, 
                      packingResult.containerType.height + 0.1, 
                      packingResult.containerType.width + 0.1
                    )]} />
                    <lineBasicMaterial color="#FFD700" linewidth={3} />
                  </lineSegments>
                  
                  {/* 集装箱信息标签 */}
                  <Text
                    position={[pos.x, packingResult.containerType.height + 1, pos.z]}
                    fontSize={0.3}
                    color="#2D3748"
                    anchorX="center"
                    anchorY="middle"
                    outlineWidth={0.02}
                    outlineColor="#FFFFFF"
                  >
                    {`集装箱 ${containerIndex + 1}`}
                  </Text>
                </group>
              )}
            </group>
          );
        })}
      </Canvas>
    </div>
  );
};

// 装箱算法
class PackingAlgorithm {
  static calculateBestPacking(cargos: Cargo[]): PackingResult | null {
    let bestResult: PackingResult | null = null;
    let bestUtilization = 0;

    for (const containerType of CONTAINER_TYPES) {
      const result = this.packIntoContainerType(cargos, containerType);
      if (result && result.utilization > bestUtilization) {
        bestUtilization = result.utilization;
        bestResult = result;
      }
    }

    return bestResult;
  }

  private static packIntoContainerType(cargos: Cargo[], containerType: ContainerType): PackingResult | null {
    const packedItems: PackedItem[] = [];
    let containerCount = 0;
    let currentContainerWeight = 0;
    let currentContainerVolume = 0;
    const containerVolume = containerType.length * containerType.width * containerType.height;
    
    // 按体积从大到小排序
    const sortedCargos = [...cargos].sort((a, b) => {
      const volumeA = a.length * a.width * a.height * a.quantity;
      const volumeB = b.length * b.width * b.height * b.quantity;
      return volumeB - volumeA;
    });

    let currentX = 0, currentY = 0, currentZ = 0;
    let maxHeightInLayer = 0;

    for (const cargo of sortedCargos) {
      for (let i = 0; i < cargo.quantity; i++) {
        const cargoWeight = cargo.weight;
        const cargoVolume = cargo.length * cargo.width * cargo.height;

        // 检查是否需要新容器
        if (currentContainerWeight + cargoWeight > containerType.maxWeight ||
            currentX + cargo.length > containerType.length ||
            currentContainerVolume + cargoVolume > containerVolume) {
          
          containerCount++;
          currentContainerWeight = 0;
          currentContainerVolume = 0;
          currentX = 0;
          currentY = 0;
          currentZ = 0;
          maxHeightInLayer = 0;
        }

        // 检查当前位置是否能放下货物
        if (currentX + cargo.length > containerType.length) {
          currentX = 0;
          currentZ += maxHeightInLayer;
          maxHeightInLayer = 0;
          
          if (currentZ + cargo.width > containerType.width) {
            currentZ = 0;
            currentY += cargo.height;
            
            if (currentY + cargo.height > containerType.height) {
              containerCount++;
              currentContainerWeight = 0;
              currentContainerVolume = 0;
              currentX = 0;
              currentY = 0;
              currentZ = 0;
              maxHeightInLayer = 0;
            }
          }
        }

        packedItems.push({
          cargo: { ...cargo, color: cargo.color || this.getRandomColor() },
          x: currentX,
          y: currentY,
          z: currentZ,
          containerIndex: containerCount
        });

        currentX += cargo.length;
        maxHeightInLayer = Math.max(maxHeightInLayer, cargo.width);
        currentContainerWeight += cargoWeight;
        currentContainerVolume += cargoVolume;
      }
    }

    if (packedItems.length > 0) {
      containerCount++;
    }

    const totalCargoVolume = cargos.reduce((sum, cargo) => 
      sum + (cargo.length * cargo.width * cargo.height * cargo.quantity), 0
    );
    const totalContainerVolume = containerCount * containerVolume;
    const utilization = (totalCargoVolume / totalContainerVolume) * 100;

    return {
      containerType,
      containerCount,
      utilization,
      totalCost: containerCount * containerType.cost,
      packedItems
    };
  }

  private static getRandomColor(): string {
    const colors = ['#E53E3E', '#38A169', '#3182CE', '#D69E2E', '#805AD5', '#DD6B20'];
    return colors[Math.floor(Math.random() * colors.length)];
  }
}

const ContainerLoading: React.FC = () => {
  const [cargos, setCargos] = useState<Cargo[]>([]);
  const [packingResult, setPackingResult] = useState<PackingResult | null>(null);
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [cargoColors, setCargoColors] = useState<Map<string, string>>(new Map());
  const [hoveredContainer, setHoveredContainer] = useState<number | null>(null);

  const getCargoColor = (cargoName: string): string => {
    if (cargoColors.has(cargoName)) {
      return cargoColors.get(cargoName)!;
    }
    
    const colors = ['#E53E3E', '#38A169', '#3182CE', '#D69E2E', '#805AD5', '#DD6B20', '#E53E3E', '#38A169'];
    const newColor = colors[cargoColors.size % colors.length];
    const newCargoColors = new Map(cargoColors);
    newCargoColors.set(cargoName, newColor);
    setCargoColors(newCargoColors);
    return newColor;
  };

  const addCargo = (values: any) => {
    const cargoColor = getCargoColor(values.name);
    const newCargo: Cargo = {
      id: Date.now().toString(),
      name: values.name,
      length: values.length,
      width: values.width,
      height: values.height,
      weight: values.weight,
      quantity: values.quantity,
      color: cargoColor
    };
    setCargos([...cargos, newCargo]);
    form.resetFields();
    message.success('货物添加成功');
  };

  const deleteCargo = (id: string) => {
    setCargos(cargos.filter(cargo => cargo.id !== id));
    message.success('货物删除成功');
  };

  const calculatePacking = async () => {
    if (cargos.length === 0) {
      message.warning('请先添加货物');
      return;
    }

    setLoading(true);
    try {
      // 模拟计算延迟
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const result = PackingAlgorithm.calculateBestPacking(cargos);
      if (result) {
        setPackingResult(result);
        message.success('装箱计算完成');
      } else {
        message.error('无法找到合适的装箱方案');
      }
    } catch (error) {
      message.error('计算过程中出现错误');
    } finally {
      setLoading(false);
    }
  };

  const cargoColumns = [
    {
      title: '颜色',
      key: 'color',
      width: 60,
      render: (_: any, record: Cargo) => (
        <div
          style={{
            width: 20,
            height: 20,
            backgroundColor: record.color || '#3182CE',
            borderRadius: 4,
            border: '1px solid #d9d9d9'
          }}
        />
      ),
    },
    { title: '货物名称', dataIndex: 'name', key: 'name' },
    { title: '长度(m)', dataIndex: 'length', key: 'length' },
    { title: '宽度(m)', dataIndex: 'width', key: 'width' },
    { title: '高度(m)', dataIndex: 'height', key: 'height' },
    { title: '重量(kg)', dataIndex: 'weight', key: 'weight' },
    { title: '数量', dataIndex: 'quantity', key: 'quantity' },
    {
      title: '操作',
      key: 'action',
      render: (_: any, record: Cargo) => (
        <Button 
          type="link" 
          danger 
          icon={<DeleteOutlined />}
          onClick={() => deleteCargo(record.id)}
        >
          删除
        </Button>
      ),
    },
  ];

  return (
    <div className="container-loading p-6">
      <h1 className="text-2xl font-bold mb-6">集装箱可视化装箱系统</h1>
      
      <div className="flex gap-6">
        {/* 左侧：货物管理、货物列表、开始装箱 */}
        <div className="w-1/3 space-y-6 left-panel">
          <Card title="货物管理" className="mb-4">
            <Form form={form} onFinish={addCargo} layout="vertical" className="cargo-form">
              <Form.Item name="name" label="货物名称" rules={[{ required: true }]}>
                <Input placeholder="请输入货物名称" />
              </Form.Item>
              <div className="grid grid-cols-2 gap-4">
                <Form.Item name="length" label="长度(m)" rules={[{ required: true }]}>
                  <InputNumber min={0.1} step={0.1} placeholder="长度" className="w-full" />
                </Form.Item>
                <Form.Item name="width" label="宽度(m)" rules={[{ required: true }]}>
                  <InputNumber min={0.1} step={0.1} placeholder="宽度" className="w-full" />
                </Form.Item>
                <Form.Item name="height" label="高度(m)" rules={[{ required: true }]}>
                  <InputNumber min={0.1} step={0.1} placeholder="高度" className="w-full" />
                </Form.Item>
                <Form.Item name="weight" label="重量(kg)" rules={[{ required: true }]}>
                  <InputNumber min={1} placeholder="重量" className="w-full" />
                </Form.Item>
              </div>
              <Form.Item name="quantity" label="数量" rules={[{ required: true }]}>
                <InputNumber min={1} placeholder="数量" className="w-full" />
              </Form.Item>
              <Form.Item>
                <Button type="primary" htmlType="submit" icon={<PlusOutlined />} className="w-full">
                  添加货物
                </Button>
              </Form.Item>
            </Form>
          </Card>

          <Card title="货物列表" className="mb-4">
            <Table 
              dataSource={cargos} 
              columns={cargoColumns} 
              rowKey="id"
              size="small"
              pagination={false}
              className="cargo-table"
              scroll={{ y: 300 }}
            />
          </Card>

          <div className="text-center mb-4">
            <Button
              type="primary"
              size="large"
              icon={<PlayCircleOutlined />}
              onClick={calculatePacking}
              disabled={cargos.length === 0}
              loading={loading}
              className="w-full"
            >
              {loading ? '计算中...' : '开始装箱计算'}
            </Button>
          </div>

          {packingResult && (
            <Card title="装箱结果" className="mt-4 fade-in-up">
              <div className="container-info">
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">推荐集装箱:</span>
                    <span className="font-bold text-blue-600">{packingResult.containerType.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">所需数量:</span>
                    <span className="font-bold text-green-600">{packingResult.containerCount} 个</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">空间利用率:</span>
                    <span className="font-bold text-orange-600">{packingResult.utilization.toFixed(2)}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">总成本:</span>
                    <span className="font-bold text-purple-600">¥{packingResult.totalCost.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </Card>
          )}
        </div>

        {/* 右侧：3D可视化 */}
        <div className="flex-1 right-panel">
          <Card title="3D可视化" className="scene-3d h-full">
            <div className="text-center text-gray-500 mb-2">
              鼠标左键旋转 | 滚轮缩放 | 右键平移 | 悬停查看集装箱详情
            </div>

            <Tooltip 
              title={hoveredContainer !== null && packingResult ? (
                <div>
                  <div><strong>集装箱 #{hoveredContainer + 1}</strong></div>
                  <div>类型: {packingResult.containerType.name}</div>
                  <div>尺寸: {packingResult.containerType.length}×{packingResult.containerType.width}×{packingResult.containerType.height}m</div>
                  <div>载重: {packingResult.containerType.maxWeight}kg</div>
                  <div>货物数量: {packingResult.packedItems.filter(item => item.containerIndex === hoveredContainer).length}件</div>
                </div>
              ) : ''}
              open={hoveredContainer !== null}
              placement="topLeft"
              mouseEnterDelay={0.1}
              mouseLeaveDelay={0.1}
            >
              <div>
                <Scene3D 
                  packingResult={packingResult} 
                  hoveredContainer={hoveredContainer}
                  setHoveredContainer={setHoveredContainer}
                />
              </div>
            </Tooltip>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ContainerLoading;