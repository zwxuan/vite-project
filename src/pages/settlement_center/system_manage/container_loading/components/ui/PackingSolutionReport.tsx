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
      align: 'right' as const,
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
      align: 'right' as const,
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
      width: 120,
      render: (name: string) => (
        <Text strong style={{ color: '#1890ff' }}>{name}</Text>
      )
    },
    {
      title: '容器规格',
      key: 'dimensions',
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
      align: 'right' as const,
      render: (weight: number) => (
        <Text strong style={{ color: '#fa8c16' }}>
          {weight.toLocaleString()} kg
        </Text>
      )
    },
    {
      title: '使用成本',
      dataIndex: 'cost',
      key: 'cost',
      width: 120,
      align: 'right' as const,
      render: (cost: number) => (
        <Text strong style={{ color: '#f5222d' }}>
          ¥ {cost.toLocaleString()}
        </Text>
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
          <div>
            <Badge count={count} style={{ backgroundColor: '#52c41a' }} />
            <div style={{ marginTop: '4px' }}>
              <Progress 
                percent={Math.min(utilizationRate, 100)} 
                size="small" 
                strokeColor={utilizationRate > 80 ? '#52c41a' : utilizationRate > 50 ? '#faad14' : '#f5222d'}
                showInfo={false}
              />
            </div>
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
              return (
                <Col span={12} key={step.stepNumber}>
                  <Card
                    size="small"
                    style={{
                      background: `linear-gradient(135deg, ${index % 2 === 0 ? '#f0f9ff' : '#fef7f0'} 0%, ${index % 2 === 0 ? '#e0f2fe' : '#fed7aa'} 100%)`,
                      border: `1px solid ${index % 2 === 0 ? '#0ea5e9' : '#fb923c'}`,
                      borderRadius: '8px',
                      transition: 'all 0.3s ease',
                      cursor: 'pointer'
                    }}
                    hoverable
                    bodyStyle={{ padding: '16px' }}
                  >
                    {/* 步骤头部 */}
                    <div style={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      justifyContent: 'space-between',
                      marginBottom: '12px'
                    }}>
                      <div style={{ display: 'flex', alignItems: 'center' }}>
                        <Badge 
                          count={step.stepNumber} 
                          style={{ 
                            backgroundColor: index % 2 === 0 ? '#0ea5e9' : '#fb923c',
                            fontSize: '12px',
                            fontWeight: 'bold'
                          }} 
                        />
                        <Text strong style={{ 
                          marginLeft: '8px', 
                          color: index % 2 === 0 ? '#0c4a6e' : '#9a3412',
                          fontSize: '14px'
                        }}>
                          步骤 {step.stepNumber}
                        </Text>
                      </div>
                      <Tag 
                        color={index % 2 === 0 ? 'blue' : 'orange'} 
                        icon={<ContainerOutlined />}
                        style={{ fontWeight: 'bold' }}
                      >
                        集装箱 {step.containerIndex + 1}
                      </Tag>
                    </div>

                    {/* 货物信息 */}
                    <div style={{ marginBottom: '12px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '6px' }}>
                        <BoxPlotOutlined style={{ 
                          color: index % 2 === 0 ? '#0ea5e9' : '#fb923c', 
                          marginRight: '6px' 
                        }} />
                        <Text strong style={{ fontSize: '13px' }}>货物名称：</Text>
                        <Tag color="geekblue" style={{ 
                          marginLeft: '6px', 
                          fontWeight: 'bold',
                          fontSize: '12px'
                        }}>
                          {step.cargoName}
                        </Tag>
                      </div>
                    </div>

                    {/* 集装箱信息 */}
                    <div style={{ 
                      backgroundColor: 'rgba(255,255,255,0.7)', 
                      padding: '8px', 
                      borderRadius: '6px',
                      marginBottom: '12px',
                      border: '1px solid rgba(0,0,0,0.06)'
                    }}>
                      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '4px' }}>
                        <ContainerOutlined style={{ 
                          color: index % 2 === 0 ? '#0ea5e9' : '#fb923c', 
                          marginRight: '6px' 
                        }} />
                        <Text strong style={{ fontSize: '12px' }}>集装箱类型：</Text>
                        <Text style={{ marginLeft: '4px', fontSize: '12px', fontWeight: 'bold' }}>
                          {container.name}
                        </Text>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center' }}>
                        <Text style={{ fontSize: '11px', color: '#666' }}>尺寸：</Text>
                        <div style={{ marginLeft: '4px', display: 'flex', gap: '4px' }}>
                          <Text code style={{ 
                            fontSize: '10px', 
                            backgroundColor: '#f6f8fa', 
                            padding: '1px 3px',
                            color: '#d73a49'
                          }}>
                            L: {container.length}m
                          </Text>
                          <Text code style={{ 
                            fontSize: '10px', 
                            backgroundColor: '#f6f8fa', 
                            padding: '1px 3px',
                            color: '#28a745'
                          }}>
                            W: {container.width}m
                          </Text>
                          <Text code style={{ 
                            fontSize: '10px', 
                            backgroundColor: '#f6f8fa', 
                            padding: '1px 3px',
                            color: '#6f42c1'
                          }}>
                            H: {container.isFrameContainer ? '∞' : container.height + 'm'}
                          </Text>
                        </div>
                      </div>
                    </div>

                    {/* 放置坐标 */}
                    <div style={{ 
                      backgroundColor: 'rgba(255,255,255,0.7)', 
                      padding: '8px', 
                      borderRadius: '6px',
                      border: '1px solid rgba(0,0,0,0.06)'
                    }}>
                      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '6px' }}>
                        <Text strong style={{ fontSize: '12px' }}>放置坐标：</Text>
                      </div>
                      <div style={{ display: 'flex', gap: '6px', justifyContent: 'space-between' }}>
                        <Text code style={{ 
                          fontSize: '11px', 
                          backgroundColor: '#fff2f0', 
                          padding: '3px 6px',
                          border: '1px solid #ffccc7',
                          borderRadius: '4px',
                          color: '#cf1322',
                          fontWeight: 'bold'
                        }}>
                          X: {step.position.x}
                        </Text>
                        <Text code style={{ 
                          fontSize: '11px', 
                          backgroundColor: '#f6ffed', 
                          padding: '3px 6px',
                          border: '1px solid #b7eb8f',
                          borderRadius: '4px',
                          color: '#389e0d',
                          fontWeight: 'bold'
                        }}>
                          Y: {step.position.y}
                        </Text>
                        <Text code style={{ 
                          fontSize: '11px', 
                          backgroundColor: '#f0f5ff', 
                          padding: '3px 6px',
                          border: '1px solid #adc6ff',
                          borderRadius: '4px',
                          color: '#1d39c4',
                          fontWeight: 'bold'
                        }}>
                          Z: {step.position.z}
                        </Text>
                      </div>
                    </div>

                    {/* 操作说明 */}
                    <div style={{ 
                      marginTop: '12px',
                      padding: '8px',
                      backgroundColor: 'rgba(255,255,255,0.5)',
                      borderRadius: '6px',
                      border: '1px solid rgba(0,0,0,0.06)'
                    }}>
                      <Text style={{ 
                        fontSize: '11px', 
                        color: '#666',
                        lineHeight: '1.4',
                        display: 'block'
                      }}>
                        {step.description}
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