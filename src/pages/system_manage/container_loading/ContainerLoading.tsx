import React, { useState, useRef, useEffect, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Html } from '@react-three/drei';
import { Button, Card, Form, Input, InputNumber, Table, Space, message, Divider } from 'antd';
import { PlusOutlined, DeleteOutlined, PlayCircleOutlined } from '@ant-design/icons';
import * as THREE from 'three';
import './ContainerLoading.less';

// 导入拆分后的模块
import { Scene3D } from './components/3d';
import { CargoForm, CargoTable, PackingResults } from './components/ui';
import { useCargoManagement, usePackingCalculation } from './hooks';













const ContainerLoading: React.FC = () => {
  // 使用自定义hooks
  const {
    cargos,
    cargoNameColors,
    addCargo,
    deleteCargo,
    getCargoColor
  } = useCargoManagement();
  
  const {
     packingResult,
     isCalculating,
     calculatePacking
   } = usePackingCalculation();



  return (
    <div className="container-loading" style={{ padding: '24px' }}>
      <h1 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '24px' }}>集装箱可视化装箱系统</h1>
      
      <div className="main-layout">
        {/* 左侧：货物管理和货物列表 */}
        <div className="left-panel">
          <CargoForm onAddCargo={addCargo} />
          
          <Card title="货物列表" style={{ marginBottom: '16px' }}>
            <CargoTable 
               cargos={cargos} 
               onDeleteCargo={deleteCargo}
               getCargoColor={getCargoColor}
             />
          </Card>
        </div>

        {/* 右侧：3D可视化和装箱结果 */}
        <div className="right-panel">
          {/* 操作按钮区域 */}
          

          {/* 3D可视化 */}
          <Card title="3D可视化" className="scene-3d" style={{ marginBottom: '16px' }}>
            <div style={{ textAlign: 'center', color: '#999', marginBottom: '8px' }}>
              鼠标左键旋转 | 滚轮缩放 | 右键平移 | 悬停查看集装箱详情
            </div>

            <Scene3D 
              packingResult={packingResult} 
              showGrid={true}
            />
          </Card>

          {/* 装箱结果 */}
          
        </div>
        <div className="left-panel">
              <div className="action-bar">
            <Button
              type="primary"
              size="large"
              icon={<PlayCircleOutlined />}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                calculatePacking(cargos, cargoNameColors);
              }}
              disabled={cargos.length === 0}
              loading={isCalculating}
              className="calculate-btn"
            >
              {isCalculating ? '计算中...' : '开始装箱计算'}
            </Button>
          </div>
          <PackingResults packingResult={packingResult} />
        </div>
      </div>
    </div>
  );
};

export default ContainerLoading;