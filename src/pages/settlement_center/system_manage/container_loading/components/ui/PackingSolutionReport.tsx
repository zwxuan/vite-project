import React from 'react';
import { Modal, Descriptions, Table, Tag, Divider, Typography, Card, Row, Col, Statistic, Space, Badge, Progress } from 'antd';
import { 
  ContainerOutlined, 
  BoxPlotOutlined, 
  DollarOutlined, 
  PercentageOutlined,
  ClockCircleOutlined,
  CheckCircleOutlined,
  ExclamationCircleOutlined,
  FileTextOutlined,
  BarChartOutlined
} from '@ant-design/icons';
import { FinalPackingSolution, PackingStep } from '../../utils/PackingSolutionCache';
import { Cargo } from '../../types';
import { PositionVisualization } from './PositionVisualization';

const { Title, Text } = Typography;

interface PackingSolutionReportProps {
  visible: boolean;
  onCancel: () => void;
  solution: FinalPackingSolution | null;
}

/**
 * 装箱方案报告组件
 */
export const PackingSolutionReport: React.FC<PackingSolutionReportProps> = ({
  visible,
  onCancel,
  solution
}) => {
  if (!solution) {
    return (
      <Modal
        title={
          <div style={{ 
            display: 'flex', 
            alignItems: 'center',
            fontSize: '18px',
            fontWeight: 'bold',
            color: '#1890ff'
          }}>
            <FileTextOutlined style={{ marginRight: 8 }} />
            装箱方案报告
          </div>
        }
        open={visible}
        onCancel={onCancel}
        footer={null}
        width="95vw"
        style={{ top: 20 }}
        bodyStyle={{ 
          height: '85vh', 
          overflowY: 'auto',
          padding: '24px',
          backgroundColor: '#fafafa'
        }}
      >
        <div style={{ 
          textAlign: 'center', 
          padding: '60px 0',
          backgroundColor: '#fff',
          borderRadius: '8px',
          border: '1px solid #f0f0f0'
        }}>
          <ExclamationCircleOutlined style={{ fontSize: '48px', color: '#faad14', marginBottom: '16px' }} />
          <div>
            <Text type="secondary" style={{ fontSize: '16px' }}>暂无装箱方案数据</Text>
          </div>
        </div>
      </Modal>
    );
  }

  const { packingResult, originalCargos, packingSteps, summary } = solution;

  // 货物明细表格列定义
  const cargoColumns = [
    {
      title: '序号',
      key: 'index',
      width: 60,
      align: 'center' as const,
      render: (_: any, __: any, index: number) => (
        <Badge count={index + 1} style={{ backgroundColor: '#1890ff' }} />
      )
    },
    {
      title: '货物名称',
      dataIndex: 'name',
      key: 'name',
      align: 'center' as const,
      width: 120,
      render: (text: string, record: Cargo) => (
        <Space>
          <Tag color={record.color || 'blue'} style={{ fontWeight: 'bold' }}>{text}</Tag>
        </Space>
      )
    },
    {
      title: '尺寸规格',
      key: 'dimensions',
      width: 140,
      align: 'center' as const,
      render: (record: Cargo) => (
        <div style={{ textAlign: 'center' }}>
          <Text code style={{ fontSize: '12px', backgroundColor: '#f6f8fa' }}>
            {record.length}×{record.width}×{record.height}m
          </Text>
        </div>
      )
    },
    {
      title: '重量',
      dataIndex: 'weight',
      key: 'weight',
      width: 100,
      align: 'center' as const,
      render: (weight: number) => (
        <Text strong style={{ color: '#1890ff' }}>
          {weight.toLocaleString()} kg
        </Text>
      )
    },
    {
      title: '数量',
      dataIndex: 'quantity',
      key: 'quantity',
      width: 80,
      align: 'center' as const,
      render: (quantity: number) => (
        <Badge count={quantity} style={{ backgroundColor: '#52c41a' }} />
      )
    },
    {
      title: '总体积',
      key: 'volume',
      width: 100,
      align: 'center' as const,
      render: (record: Cargo) => {
        const volume = record.length * record.width * record.height * record.quantity;
        return (
          <Text strong style={{ color: '#722ed1' }}>
            {volume.toFixed(3)} m³
          </Text>
        );
      }
    },
    {
      title: '装载状态',
      key: 'status',
      width: 100,
      align: 'center' as const,
      render: (record: Cargo) => {
        const isLoaded = packingResult.packedItems.some(item => item.cargo.id === record.id);
        return (
          <Tag 
            icon={isLoaded ? <CheckCircleOutlined /> : <ExclamationCircleOutlined />}
            color={isLoaded ? 'success' : 'error'}
            style={{ fontWeight: 'bold' }}
          >
            {isLoaded ? '已装载' : '未装载'}
          </Tag>
        );
      }
    }
  ];

  // 集装箱明细表格列定义
  const containerColumns = [
    {
      title: '集装箱编号',
      key: 'index',
      width: 120,
      align: 'center' as const,
      render: (_: any, __: any, index: number) => (
        <Tag color="blue" icon={<ContainerOutlined />} style={{ fontWeight: 'bold' }}>
          集装箱 {index + 1}
        </Tag>
      )
    },
    {
      title: '容器类型',
      dataIndex: 'name',
      key: 'name',
      align: 'center' as const,
      width: 120,
      render: (name: string) => (
        <Text strong style={{ color: '#1890ff' }}>{name}</Text>
      )
    },
    {
      title: '容器规格',
      key: 'dimensions',
      align: 'center' as const,
      width: 140,
      render: (record: any) => (
        <div style={{ textAlign: 'center' }}>
          <Text code style={{ fontSize: '12px', backgroundColor: '#f6f8fa' }}>
            {record.length}×{record.width}×{record.height}m
          </Text>
        </div>
      )
    },
    {
      title: '最大载重',
      dataIndex: 'maxWeight',
      key: 'maxWeight',
      width: 120,
      align: 'center' as const,
      render: (weight: number) => (
        <div style={{ textAlign: 'right' }}>
          <Text strong style={{ color: '#fa8c16' }}>
            {weight.toLocaleString()} kg
          </Text>
        </div>
      )
    },
    {
      title: '使用成本',
      dataIndex: 'cost',
      key: 'cost',
      width: 120,
      align: 'center' as const,
      render: (cost: number) => (
        <div style={{ textAlign: 'right' }}>
          <Text strong style={{ color: '#fa8c16' }}>
            ¥ {cost.toLocaleString()}
          </Text>
        </div>
      )
    },
    {
      title: '装载情况',
      key: 'loadedCount',
      width: 120,
      align: 'center' as const,
      render: (_: any, record: any, index: number) => {
        const count = packingResult.packedItems.filter(item => item.containerIndex === index).length;
        const maxCapacity = Math.floor((record.length * record.width * record.height) / 0.5); // 假设平均每件货物0.5m³
        const utilizationRate = maxCapacity > 0 ? (count / maxCapacity) * 100 : 0;
        
        return (
            <div style={{ marginTop: '4px' }}>
              <Badge count={count} style={{ backgroundColor: '#52c41a' }} />
            </div>
        );
      }
    }
  ];

  // 装箱步骤表格列定义
  const stepColumns = [
    {
      title: '步骤序号',
      dataIndex: 'stepNumber',
      key: 'stepNumber',
      width: 80,
      align: 'center' as const,
      render: (stepNumber: number) => (
        <Badge count={stepNumber} style={{ backgroundColor: '#722ed1' }} />
      )
    },
    {
      title: '货物名称',
      dataIndex: 'cargoName',
      key: 'cargoName',
      width: 120,
      render: (cargoName: string) => (
        <Tag color="geekblue" style={{ fontWeight: 'bold' }}>
          {cargoName}
        </Tag>
      )
    },
    {
      title: '目标集装箱',
      key: 'container',
      width: 120,
      align: 'center' as const,
      render: (record: PackingStep) => (
        <Tag color="blue" icon={<ContainerOutlined />}>
          集装箱 {record.containerIndex + 1}
        </Tag>
      )
    },
    {
      title: '放置坐标',
      key: 'position',
      width: 160,
      render: (record: PackingStep) => (
        <div style={{ textAlign: 'center' }}>
          <Text code style={{ fontSize: '11px', backgroundColor: '#f6f8fa', padding: '2px 4px' }}>
            X: {record.position.x}
          </Text>
          <br />
          <Text code style={{ fontSize: '11px', backgroundColor: '#f6f8fa', padding: '2px 4px' }}>
            Y: {record.position.y}
          </Text>
          <br />
          <Text code style={{ fontSize: '11px', backgroundColor: '#f6f8fa', padding: '2px 4px' }}>
            Z: {record.position.z}
          </Text>
        </div>
      )
    },
    {
      title: '操作说明',
      dataIndex: 'description',
      key: 'description',
      render: (description: string) => (
        <Text style={{ fontSize: '13px', color: '#666' }}>
          {description}
        </Text>
      )
    }
  ];

  return (
    <Modal
      title={
        <div style={{ 
          display: 'flex', 
          alignItems: 'center',
          fontSize: '20px',
          fontWeight: 'bold',
          color: '#1890ff',
          padding: '8px 0'
        }}>
          <FileTextOutlined style={{ marginRight: 12, fontSize: '24px' }} />
          <div>
            <div>最终装箱方案报告</div>
            <div style={{ fontSize: '12px', color: '#666', fontWeight: 'normal', marginTop: '2px' }}>
              Container Loading Solution Report
            </div>
          </div>
        </div>
      }
      open={visible}
      onCancel={onCancel}
      footer={null}
      width="95vw"
      style={{ top: 20 }}
      bodyStyle={{ 
        height: '85vh', 
        overflowY: 'auto',
        padding: '24px',
        backgroundColor: '#fafafa'
      }}
    >
      {/* 报告头部信息 */}
      <div style={{ 
        backgroundColor: '#fff', 
        padding: '24px', 
        borderRadius: '8px', 
        marginBottom: '24px',
        border: '1px solid #e8e8e8',
        boxShadow: '0 2px 8px rgba(0,0,0,0.06)'
      }}>
        <div style={{ 
          textAlign: 'center', 
          marginBottom: '24px',
          borderBottom: '2px solid #f0f0f0',
          paddingBottom: '16px'
        }}>
          <Title level={2} style={{ margin: 0, color: '#1890ff' }}>
            <BarChartOutlined style={{ marginRight: '8px' }} />
            方案执行概览
          </Title>
          <Text type="secondary" style={{ fontSize: '14px' }}>
            Solution Performance Overview
          </Text>
        </div>
        
        <Row gutter={[24, 16]}>
          <Col span={6}>
            <Card 
              size="small" 
              style={{ 
                textAlign: 'center',
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                border: 'none',
                color: 'white'
              }}
              bodyStyle={{ padding: '16px' }}
            >
              <Statistic
                title={<span style={{ color: 'white', fontSize: '12px' }}>使用集装箱</span>}
                value={summary.totalContainers}
                prefix={<ContainerOutlined style={{ color: 'white' }} />}
                suffix={<span style={{ color: 'white' }}>个</span>}
                valueStyle={{ color: 'white', fontSize: '24px', fontWeight: 'bold' }}
              />
            </Card>
          </Col>
          <Col span={6}>
            <Card 
              size="small" 
              style={{ 
                textAlign: 'center',
                background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
                border: 'none',
                color: 'white'
              }}
              bodyStyle={{ padding: '16px' }}
            >
              <Statistic
                title={<span style={{ color: 'white', fontSize: '12px' }}>空间利用率</span>}
                value={summary.utilizationRate}
                precision={1}
                prefix={<PercentageOutlined style={{ color: 'white' }} />}
                suffix={<span style={{ color: 'white' }}>%</span>}
                valueStyle={{ color: 'white', fontSize: '24px', fontWeight: 'bold' }}
              />
            </Card>
          </Col>
          <Col span={6}>
            <Card 
              size="small" 
              style={{ 
                textAlign: 'center',
                background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
                border: 'none',
                color: 'white'
              }}
              bodyStyle={{ padding: '16px' }}
            >
              <Statistic
                title={<span style={{ color: 'white', fontSize: '12px' }}>总运输成本</span>}
                value={summary.totalCost}
                prefix={<DollarOutlined style={{ color: 'white' }} />}
                suffix={<span style={{ color: 'white' }}>¥</span>}
                valueStyle={{ color: 'white', fontSize: '24px', fontWeight: 'bold' }}
              />
            </Card>
          </Col>
          <Col span={6}>
            <Card 
              size="small" 
              style={{ 
                textAlign: 'center',
                background: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
                border: 'none',
                color: 'white'
              }}
              bodyStyle={{ padding: '16px' }}
            >
              <Statistic
                title={<span style={{ color: 'white', fontSize: '12px' }}>货物装载</span>}
                value={`${summary.packedCargos}/${summary.totalCargos}`}
                prefix={<BoxPlotOutlined style={{ color: 'white' }} />}
                suffix={<span style={{ color: 'white' }}>件</span>}
                valueStyle={{ color: 'white', fontSize: '20px', fontWeight: 'bold' }}
              />
            </Card>
          </Col>
        </Row>
      </div>

      {/* 基本信息 */}
      <Card 
        style={{ 
          marginBottom: '24px',
          backgroundColor: '#fff',
          border: '1px solid #e8e8e8',
          boxShadow: '0 2px 8px rgba(0,0,0,0.06)'
        }}
        title={
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <ClockCircleOutlined style={{ marginRight: '8px', color: '#1890ff' }} />
            <span style={{ fontSize: '16px', fontWeight: 'bold' }}>方案基本信息</span>
            <span style={{ fontSize: '12px', color: '#666', marginLeft: '8px' }}>Basic Information</span>
          </div>
        }
      >
        <Descriptions
          bordered
          size="middle"
          column={3}
          labelStyle={{ backgroundColor: '#fafafa', fontWeight: 'bold', width: '120px' }}
          contentStyle={{ backgroundColor: '#fff' }}
        >
          <Descriptions.Item label="方案ID">
            <Text code style={{ color: '#1890ff' }}>{solution.id}</Text>
          </Descriptions.Item>
          <Descriptions.Item label="生成时间">
            <Text strong>{new Date(solution.timestamp).toLocaleString()}</Text>
          </Descriptions.Item>
          <Descriptions.Item label="装箱算法">
            <Tag color="processing">{packingResult.algorithm}</Tag>
          </Descriptions.Item>
          <Descriptions.Item label="装箱模式">
            <Tag color="success">{packingResult.mode}</Tag>
          </Descriptions.Item>
          <Descriptions.Item label="执行时间">
            <Text strong style={{ color: '#52c41a' }}>
              {packingResult.executionTime ? `${packingResult.executionTime}ms` : '未记录'}
            </Text>
          </Descriptions.Item>
          <Descriptions.Item label="迭代次数">
            <Badge count={packingResult.iterations || 0} style={{ backgroundColor: '#722ed1' }} />
          </Descriptions.Item>
          {summary.spaceOccupancyRate && (
            <Descriptions.Item label="空间占用率" span={3}>
              <Progress 
                percent={summary.spaceOccupancyRate} 
                strokeColor={{
                  '0%': '#108ee9',
                  '100%': '#87d068',
                }}
                format={(percent) => `${percent?.toFixed(1)}%`}
              />
            </Descriptions.Item>
          )}
        </Descriptions>
      </Card>

      {/* 货物明细 */}
      <Card 
        style={{ 
          marginBottom: '24px',
          backgroundColor: '#fff',
          border: '1px solid #e8e8e8',
          boxShadow: '0 2px 8px rgba(0,0,0,0.06)'
        }}
        title={
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <BoxPlotOutlined style={{ marginRight: '8px', color: '#1890ff' }} />
            <span style={{ fontSize: '16px', fontWeight: 'bold' }}>货物清单明细</span>
            <span style={{ fontSize: '12px', color: '#666', marginLeft: '8px' }}>Cargo Details</span>
          </div>
        }
      >
        <Table
          columns={cargoColumns}
          dataSource={originalCargos}
          rowKey="id"
          size="middle"
          pagination={false}
          scroll={{ y: 300 }}
          bordered
          style={{ 
            backgroundColor: '#fff',
            borderRadius: '6px'
          }}
        />
      </Card>

      {/* 集装箱明细 */}
      <Card 
        style={{ 
          marginBottom: '24px',
          backgroundColor: '#fff',
          border: '1px solid #e8e8e8',
          boxShadow: '0 2px 8px rgba(0,0,0,0.06)'
        }}
        title={
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <ContainerOutlined style={{ marginRight: '8px', color: '#1890ff' }} />
            <span style={{ fontSize: '16px', fontWeight: 'bold' }}>集装箱配置明细</span>
            <span style={{ fontSize: '12px', color: '#666', marginLeft: '8px' }}>Container Configuration</span>
          </div>
        }
      >
        <Table
          columns={containerColumns}
          dataSource={packingResult.containers}
          rowKey={(record, index) => `container-${index}`}
          size="middle"
          pagination={false}
          bordered
          style={{ 
            backgroundColor: '#fff',
            borderRadius: '6px'
          }}
        />
      </Card>

      {/* 装箱步骤明细 - 卡片形式 */}
      <Card 
        style={{ 
          marginBottom: '24px',
          backgroundColor: '#fff',
          border: '1px solid #e8e8e8',
          boxShadow: '0 2px 8px rgba(0,0,0,0.06)'
        }}
        title={
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <CheckCircleOutlined style={{ marginRight: '8px', color: '#1890ff' }} />
              <span style={{ fontSize: '16px', fontWeight: 'bold' }}>装箱操作步骤</span>
              <span style={{ fontSize: '12px', color: '#666', marginLeft: '8px' }}>Packing Process Steps</span>
            </div>
            <Text strong style={{ color: '#1890ff' }}>
              共 {packingSteps.length} 个装箱步骤
            </Text>
          </div>
        }
      >
        <div style={{ 
          padding: '8px 0'
        }}>
          <Row gutter={[16, 16]}>
            {packingSteps.map((step, index) => {
              const container = packingResult.containers[step.containerIndex];
              // 根据 cargoId 查找货物信息
              const cargo = solution.originalCargos.find(c => c.id === step.cargoId);
              // 根据集装箱索引决定颜色，确保相同集装箱的步骤颜色一致
              const containerColorIndex = step.containerIndex % 2;
              return (
                <Col span={24} key={step.stepNumber}>
                  <Card
                    size="small"
                    style={{
                      background: `linear-gradient(135deg, ${containerColorIndex === 0 ? '#f8fafc' : '#fefbf3'} 0%, ${containerColorIndex === 0 ? '#f1f5f9' : '#fef3e2'} 100%)`,
                      border: `1px solid ${containerColorIndex === 0 ? '#e2e8f0' : '#fed7aa'}`,
                      borderRadius: '12px',
                      transition: 'all 0.3s ease',
                      cursor: 'pointer',
                      boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
                      marginBottom: '16px'
                    }}
                    hoverable
                    bodyStyle={{ padding: '20px' }}
                  >
                    {/* 主要内容区域 - 左右布局 */}
                    <Row gutter={[24, 16]}>
                      {/* 左侧：文字信息 */}
                      <Col span={14}>
                        {/* 步骤头部 */}
                        <div style={{ 
                          display: 'flex', 
                          alignItems: 'center', 
                          justifyContent: 'space-between',
                          marginBottom: '16px',
                          paddingBottom: '12px',
                          borderBottom: `2px solid ${containerColorIndex === 0 ? '#e2e8f0' : '#fed7aa'}`
                        }}>
                          <div style={{ display: 'flex', alignItems: 'center' }}>
                            <Badge 
                              count={step.stepNumber} 
                              style={{ 
                                backgroundColor: containerColorIndex === 0 ? '#3b82f6' : '#f59e0b',
                                fontSize: '14px',
                                fontWeight: 'bold',
                                minWidth: '28px',
                                height: '28px',
                                lineHeight: '28px'
                              }} 
                            />
                            <Text strong style={{ 
                              marginLeft: '12px', 
                              color: containerColorIndex === 0 ? '#1e40af' : '#92400e',
                              fontSize: '16px'
                            }}>
                              步骤 {step.stepNumber}
                            </Text>
                          </div>
                          <Tag 
                            color={containerColorIndex === 0 ? 'blue' : 'orange'} 
                            icon={<ContainerOutlined />}
                            style={{ fontWeight: 'bold', fontSize: '12px', padding: '4px 8px' }}
                          >
                            集装箱 {step.containerIndex + 1}
                          </Tag>
                        </div>

                        {/* 货物信息 */}
                        <div style={{ marginBottom: '16px' }}>
                          <div style={{ 
                            display: 'flex', 
                            alignItems: 'center', 
                            marginBottom: '8px',
                            padding: '12px',
                            backgroundColor: 'rgba(255,255,255,0.8)',
                            borderRadius: '8px',
                            border: '1px solid rgba(0,0,0,0.06)'
                          }}>
                            <BoxPlotOutlined style={{ 
                              color: containerColorIndex === 0 ? '#3b82f6' : '#f59e0b', 
                              marginRight: '8px',
                              fontSize: '16px'
                            }} />
                            <Text strong style={{ fontSize: '14px', marginRight: '8px' }}>货物名称：</Text>
                            <Tag color="geekblue" style={{ 
                              fontWeight: 'bold',
                              fontSize: '13px',
                              padding: '4px 12px'
                            }}>
                              {step.cargoName}
                            </Tag>
                          </div>
                        </div>

                        {/* 集装箱信息 */}
                        <div style={{ 
                          backgroundColor: 'rgba(255,255,255,0.8)', 
                          padding: '12px', 
                          borderRadius: '8px',
                          marginBottom: '16px',
                          border: '1px solid rgba(0,0,0,0.06)'
                        }}>
                          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
                            <ContainerOutlined style={{ 
                              color: containerColorIndex === 0 ? '#3b82f6' : '#f59e0b', 
                              marginRight: '8px',
                              fontSize: '16px'
                            }} />
                            <Text strong style={{ fontSize: '14px', marginRight: '8px' }}>集装箱类型：</Text>
                            <Text style={{ fontSize: '14px', fontWeight: 'bold', color: '#374151' }}>
                              {container.name}
                            </Text>
                          </div>
                          <div style={{ display: 'flex', alignItems: 'center' }}>
                            <Text style={{ fontSize: '12px', color: '#6b7280', marginRight: '8px' }}>尺寸：</Text>
                            <div style={{ display: 'flex', gap: '6px' }}>
                              <Text code style={{ 
                                fontSize: '11px', 
                                backgroundColor: '#fef2f2', 
                                padding: '4px 8px',
                                color: '#dc2626',
                                border: '1px solid #fecaca',
                                borderRadius: '4px'
                              }}>
                                L: {container.length}m
                              </Text>
                              <Text code style={{ 
                                fontSize: '11px', 
                                backgroundColor: '#f0fdf4', 
                                padding: '4px 8px',
                                color: '#16a34a',
                                border: '1px solid #bbf7d0',
                                borderRadius: '4px'
                              }}>
                                W: {container.width}m
                              </Text>
                              <Text code style={{ 
                                fontSize: '11px', 
                                backgroundColor: '#eff6ff', 
                                padding: '4px 8px',
                                color: '#2563eb',
                                border: '1px solid #bfdbfe',
                                borderRadius: '4px'
                              }}>
                                H: {container.isFrameContainer ? '∞' : container.height + 'm'}
                              </Text>
                            </div>
                          </div>
                        </div>

                        {/* 放置坐标 */}
                        <div style={{ 
                          backgroundColor: 'rgba(255,255,255,0.8)', 
                          padding: '12px', 
                          borderRadius: '8px',
                          border: '1px solid rgba(0,0,0,0.06)'
                        }}>
                          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
                            <Text strong style={{ fontSize: '14px' }}>放置坐标：</Text>
                          </div>
                          <div style={{ display: 'flex', gap: '8px' }}>
                            <Text code style={{ 
                              fontSize: '12px', 
                              backgroundColor: '#fef2f2', 
                              padding: '6px 12px',
                              border: '1px solid #fecaca',
                              borderRadius: '6px',
                              color: '#dc2626',
                              fontWeight: 'bold'
                            }}>
                              X: {step.position.x}
                            </Text>
                            <Text code style={{ 
                              fontSize: '12px', 
                              backgroundColor: '#f0fdf4', 
                              padding: '6px 12px',
                              border: '1px solid #bbf7d0',
                              borderRadius: '6px',
                              color: '#16a34a',
                              fontWeight: 'bold'
                            }}>
                              Y: {step.position.y}
                            </Text>
                            <Text code style={{ 
                              fontSize: '12px', 
                              backgroundColor: '#eff6ff', 
                              padding: '6px 12px',
                              border: '1px solid #bfdbfe',
                              borderRadius: '6px',
                              color: '#2563eb',
                              fontWeight: 'bold'
                            }}>
                              Z: {step.position.z}
                            </Text>
                          </div>
                        </div>
                      </Col>

                      {/* 右侧：位置示意图 */}
                      <Col span={10}>
                        <div style={{ 
                          height: '100%',
                          display: 'flex',
                          flexDirection: 'column',
                          justifyContent: 'center'
                        }}>
                          <div style={{ 
                            marginBottom: '12px',
                            textAlign: 'center'
                          }}>
                            <Text strong style={{ 
                              fontSize: '14px', 
                              color: '#374151',
                              display: 'block',
                              marginBottom: '8px'
                            }}>
                              位置示意图
                            </Text>
                          </div>
                          {cargo && (
                            <div style={{ 
                              backgroundColor: 'rgba(255,255,255,0.9)',
                              borderRadius: '8px',
                              padding: '8px',
                              border: '1px solid rgba(0,0,0,0.06)'
                            }}>
                              <PositionVisualization
                                containerLength={container.length}
                                containerWidth={container.width}
                                containerHeight={container.height}
                                cargoPosition={step.position}
                                cargoSize={{
                                  length: cargo.length,
                                  width: cargo.width,
                                  height: cargo.height
                                }}
                                isFrameContainer={container.isFrameContainer}
                              />
                            </div>
                          )}
                        </div>
                      </Col>
                    </Row>

                    {/* 底部：操作说明 */}
                    <div style={{ 
                      marginTop: '16px',
                      padding: '12px',
                      backgroundColor: 'rgba(255,255,255,0.6)',
                      borderRadius: '8px',
                      border: '1px solid rgba(0,0,0,0.06)',
                      borderTop: `2px solid ${containerColorIndex === 0 ? '#e2e8f0' : '#fed7aa'}`
                    }}>
                      <Text style={{ 
                        fontSize: '12px', 
                        color: '#6b7280',
                        lineHeight: '1.5',
                        display: 'block',
                        fontStyle: 'italic'
                      }}>
                        💡 {step.description}
                      </Text>
                    </div>
                  </Card>
                </Col>
              );
            })}
          </Row>
        </div>
      </Card>
    </Modal>
  );
};