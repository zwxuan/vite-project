import React from 'react';
import { Card, Statistic, Row, Col, Progress, Tag, Space, Divider } from 'antd';
import { ContainerOutlined, BoxPlotOutlined, DollarOutlined, PercentageOutlined, SettingOutlined } from '@ant-design/icons';
import { PackingResult } from '../../types';
import { PACKING_ALGORITHMS, PACKING_MODES } from '../../constants';

interface PackingResultsProps {
  packingResult: PackingResult | null;
}

/**
 * 装箱结果展示组件
 * 负责显示装箱计算的结果统计
 */
export const PackingResults: React.FC<PackingResultsProps> = ({ packingResult }) => {
  if (!packingResult) {
    return (
      <Card title="装箱结果" style={{ marginTop: 16 }}>
        <div style={{ textAlign: 'center', color: '#999', padding: '40px 0' }}>
          暂无装箱结果
        </div>
      </Card>
    );
  }

  const {
    containers,
    packedItems,
    unpackedItems,
    totalCost,
    totalVolume,
    totalWeight,
    utilizationRate,
    spaceOccupancyRate,
    algorithm,
    mode
  } = packingResult;

  // 获取算法和模式的显示名称
  const algorithmInfo = PACKING_ALGORITHMS.find(alg => alg.value === algorithm);
  const modeInfo = PACKING_MODES.find(m => m.value === mode);

  const packedCount = packedItems.length;
  const unpackedCount = unpackedItems.length;
  const totalItems = packedCount + unpackedCount;
  const packingSuccessRate = totalItems > 0 ? (packedCount / totalItems) * 100 : 0;

  return (
    <Card title="装箱结果" style={{ marginTop: 16 }}>
      {/* 配置信息 */}
      <Card size="small" title={<><SettingOutlined /> 装箱配置</>} style={{ marginBottom: 16, background: '#fafafa' }}>
        <Row gutter={16}>
          <Col span={12}>
            <Tag color="blue" style={{ marginBottom: 4 }}>
              算法: {algorithmInfo?.label || algorithm}
            </Tag>
            <div style={{ fontSize: 12, color: '#666' }}>
              {algorithmInfo?.description}
            </div>
          </Col>
          <Col span={12}>
            <Tag color="green" style={{ marginBottom: 4 }}>
              模式: {modeInfo?.label || mode}
            </Tag>
            <div style={{ fontSize: 12, color: '#666' }}>
              {modeInfo?.description}
            </div>
          </Col>
        </Row>
      </Card>
      {/* 总体统计 */}
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12} md={6}>
          <Statistic
            title="使用集装箱"
            value={containers.length}
            prefix={<ContainerOutlined />}
            valueStyle={{ color: '#1890ff' }}
          />
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Statistic
            title="总成本"
            value={totalCost}
            suffix="¥"
            valueStyle={{ color: '#52c41a' }}
            formatter={(value) => `${Number(value).toLocaleString('zh-CN')}`}
          />
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Statistic
            title="理论利用率"
            value={utilizationRate}
            suffix="%"
            valueStyle={{ color: '#722ed1' }}
            precision={2}
          />
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Statistic
            title="实际占用率"
            value={spaceOccupancyRate || utilizationRate}
            suffix="%"
            valueStyle={{ color: '#fa8c16' }}
            precision={2}
          />
        </Col>
      </Row>
      
      <Row gutter={[16, 16]} style={{ marginTop: 16 }}>
        <Col xs={24} sm={12} md={6}>
          <Statistic
            title="装箱成功率"
            value={packingSuccessRate}
            suffix="%"
            valueStyle={{ color: packingSuccessRate >= 80 ? '#52c41a' : packingSuccessRate >= 60 ? '#faad14' : '#ff4d4f' }}
            precision={1}
          />
        </Col>
      </Row>

      <Divider />

      {/* 装箱进度 */}
      <Row gutter={[16, 16]}>
        <Col xs={24} md={12}>
          <Card size="small" title="装箱进度">
            <Progress
              percent={packingSuccessRate}
              status={packingSuccessRate >= 80 ? 'success' : packingSuccessRate >= 60 ? 'active' : 'exception'}
              strokeColor={{
                '0%': '#108ee9',
                '100%': '#87d068',
              }}
            />
            <Space style={{ marginTop: 8 }}>
              <Tag color="success">已装载: {packedCount}</Tag>
              <Tag color="error">未装载: {unpackedCount}</Tag>
            </Space>
          </Card>
        </Col>
        <Col xs={24} md={12}>
          <Card size="small" title="体积重量信息">
            <Row gutter={16}>
              <Col span={12}>
                <Statistic
                  title="总体积"
                  value={totalVolume}
                  suffix="m³"
                  precision={2}
                  valueStyle={{ fontSize: 16 }}
                />
              </Col>
              <Col span={12}>
                <Statistic
                  title="总重量"
                  value={totalWeight}
                  suffix="kg"
                  precision={0}
                  valueStyle={{ fontSize: 16 }}
                  formatter={(value) => `${Number(value).toLocaleString('zh-CN')}`}
                />
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>

      <Divider />

      {/* 集装箱详情 */}
      <Card size="small" title="集装箱详情">
        <Row gutter={[8, 8]}>
          {containers.map((container, index) => {
            const containerItems = packedItems.filter(item => item.containerIndex === index);
            const containerUtilization = containerItems.length > 0 
              ? (containerItems.reduce((sum, item) => 
                  sum + (item.cargo.length * item.cargo.width * item.cargo.height), 0
                ) / (container.length * container.width * container.height)) * 100
              : 0;

            return (
              <Col xs={24} sm={12} md={8} lg={6} key={index}>
                <Card 
                  size="small" 
                  style={{ 
                    background: containerUtilization >= 80 ? '#f6ffed' : 
                               containerUtilization >= 60 ? '#fffbe6' : '#fff2f0',
                    border: `1px solid ${
                      containerUtilization >= 80 ? '#b7eb8f' : 
                      containerUtilization >= 60 ? '#ffe58f' : '#ffccc7'
                    }`
                  }}
                >
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ fontWeight: 'bold', marginBottom: 4 }}>
                      集装箱 #{index + 1}
                    </div>
                    <div style={{ fontSize: 12, color: '#666', marginBottom: 8 }}>
                      {container.name}
                    </div>
                    <Progress 
                      type="circle" 
                      size={60} 
                      percent={containerUtilization} 
                      format={(percent) => `${percent?.toFixed(0)}%`}
                      strokeColor={{
                        '0%': '#108ee9',
                        '100%': '#87d068',
                      }}
                    />
                    <div style={{ marginTop: 8, fontSize: 12 }}>
                      <Tag color="blue">
                        {containerItems.length} 件货物
                      </Tag>
                    </div>
                  </div>
                </Card>
              </Col>
            );
          })}
        </Row>
      </Card>

      {/* 未装载货物 */}
      {unpackedItems.length > 0 && (
        <Card 
          size="small" 
          title="未装载货物" 
          style={{ marginTop: 16 }}
        >
          <Space wrap>
            {unpackedItems.map((item, index) => (
              <Tag key={index} color="red">
                {item.name} ({item.length}×{item.width}×{item.height}m, {item.weight}kg)
              </Tag>
            ))}
          </Space>
        </Card>
      )}
    </Card>
  );
};