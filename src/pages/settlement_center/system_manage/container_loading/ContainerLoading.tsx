import React, { useState, useRef, useEffect, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Html } from '@react-three/drei';
import { Button, Card, Form, Input, InputNumber, Table, Space, message, Divider, Tooltip } from 'antd';
import { PlusOutlined, DeleteOutlined, PlayCircleOutlined } from '@ant-design/icons';
import * as THREE from 'three';
import './ContainerLoading.less';

// 导入拆分后的模块
import { Scene3D } from './components/3d';
import { CargoCard, CargoModal, PackingResults, PackingConfigComponent } from './components/ui';
import { useCargoManagement, usePackingCalculation } from './hooks';
import { PackingConfig } from './types';
import { DEFAULT_PACKING_CONFIG } from './constants';
const ContainerLoading: React.FC = () => {
  // 装箱配置状态
  const [packingConfig, setPackingConfig] = useState<PackingConfig>(DEFAULT_PACKING_CONFIG);
  // 模态窗口状态
  const [isModalVisible, setIsModalVisible] = useState(false);

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

  // 处理装箱计算
  const handleCalculatePacking = () => {
    calculatePacking(cargos, cargoNameColors, packingConfig);
  };

  // 处理添加货物
  const handleAddCargo = (cargo: any) => {
    addCargo(cargo);
    message.success('货物添加成功！');
  };

  // 显示添加货物模态窗口
  const showAddCargoModal = () => {
    setIsModalVisible(true);
  };

  // 隐藏添加货物模态窗口
  const hideAddCargoModal = () => {
    setIsModalVisible(false);
  };



  return (
    <div style={{ padding: '4px 4px', background: '#f5f5f5', minHeight: '100vh' }}>
      <div className="container-loading">
        <div className="main-layout">
          {/* 左侧：装箱配置和货物列表 */}
          <div className="left-panel">
            {/* 装箱配置 */}
            <PackingConfigComponent
              config={packingConfig}
              onChange={setPackingConfig}
            />

            {/* 货物列表 */}
            <Card
              title="货物列表"
              style={{ marginBottom: '16px' }}
              extra={
                <Button
                  type="primary"
                  icon={<PlusOutlined />}
                  onClick={showAddCargoModal}
                  size="small"
                >
                  添加货物
                </Button>
              }
            >
              <CargoCard
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
            <Card title={<Tooltip
              title={
                <div className='rul_title_tooltip' style={{ backgroundColor: '#fff', color: '#000' }}>
                  <ol style={{ color: '#666666', fontSize: '12px', paddingLeft: '2px' }}>
                    <li style={{ marginBottom: '10px' }}><span style={{ marginRight: '10px', backgroundColor: '#f1f1f1', padding: '2px 10px' }}><b>操作说明</b></span>鼠标左键旋转 | 滚轮缩放 | 右键平移 | 悬停查看集装箱详情。
                    </li>
                  </ol>
                </div>
              }
              color='white'>3D可视化
              <i className='iconfont icon-bangzhutishi' style={{ cursor: 'pointer', marginLeft: '10px' }}></i>
            </Tooltip>} className="scene-3d" style={{ marginBottom: '6px' }}
              extra={
                <Button
                  type="primary"
                  icon={<PlayCircleOutlined />}
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    handleCalculatePacking();
                  }}
                  disabled={cargos.length === 0}
                  loading={isCalculating}
                  className="calculate-btn"
                >
                  {isCalculating ? '计算中...' : '开始装箱计算'}
                </Button>
              }
            >
              <Scene3D
                packingResult={packingResult}
                showGrid={true}
              />
            </Card>

            {/* 装箱结果 */}
            <PackingResults packingResult={packingResult} />
          </div>
        </div>

        {/* 添加货物模态窗口 */}
        <CargoModal
          visible={isModalVisible}
          onCancel={hideAddCargoModal}
          onAddCargo={handleAddCargo}
        />
      </div>
    </div>

  );
};

export default ContainerLoading;