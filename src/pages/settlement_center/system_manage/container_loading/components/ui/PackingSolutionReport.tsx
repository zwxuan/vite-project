import React from 'react';
import { Modal, Descriptions, Table, Tag, Divider, Typography, Card, Row, Col, Statistic } from 'antd';
import { ContainerOutlined, BoxPlotOutlined, DollarOutlined, PercentageOutlined } from '@ant-design/icons';
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
        title="装箱方案报告"
        open={visible}
        onCancel={onCancel}
        footer={null}
        width={800}
      >
        <div style={{ textAlign: 'center', padding: '40px 0' }}>
          <Text type="secondary">暂无装箱方案数据</Text>
        </div>
      </Modal>
    );
  }

  const { packingResult, originalCargos, packingSteps, summary } = solution;

  // 货物明细表格列定义
  const cargoColumns = [
    {
      title: '货物名称',
      dataIndex: 'name',
      key: 'name',
      render: (text: string, record: Cargo) => (
        <span>
          <Tag color={record.color || 'blue'}>{text}</Tag>
        </span>
      )
    },
    {
      title: '尺寸 (长×宽×高)',
      key: 'dimensions',
      render: (record: Cargo) => (
        <Text code>
          {record.length}×{record.width}×{record.height}m
        </Text>
      )
    },
    {
      title: '重量 (kg)',
      dataIndex: 'weight',
      key: 'weight',
      render: (weight: number) => weight.toLocaleString()
    },
    {
      title: '数量',
      dataIndex: 'quantity',
      key: 'quantity'
    },
    {
      title: '体积 (m³)',
      key: 'volume',
      render: (record: Cargo) => (
        (record.length * record.width * record.height * record.quantity).toFixed(3)
      )
    },
    {
      title: '状态',
      key: 'status',
      render: (record: Cargo) => {
        const isLoaded = packingResult.packedItems.some(item => item.cargo.id === record.id);
        return (
          <Tag color={isLoaded ? 'green' : 'red'}>
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
      render: (_: any, __: any, index: number) => `集装箱 ${index + 1}`
    },
    {
      title: '类型',
      dataIndex: 'name',
      key: 'name'
    },
    {
      title: '尺寸 (长×宽×高)',
      key: 'dimensions',
      render: (record: any) => (
        <Text code>
          {record.length}×{record.width}×{record.height}m
        </Text>
      )
    },
    {
      title: '最大载重 (kg)',
      dataIndex: 'maxWeight',
      key: 'maxWeight',
      render: (weight: number) => weight.toLocaleString()
    },
    {
      title: '成本 (¥)',
      dataIndex: 'cost',
      key: 'cost',
      render: (cost: number) => cost.toLocaleString()
    },
    {
      title: '装载货物数量',
      key: 'loadedCount',
      render: (_: any, __: any, index: number) => {
        const count = packingResult.packedItems.filter(item => item.containerIndex === index).length;
        return count;
      }
    }
  ];

  // 装箱步骤表格列定义
  const stepColumns = [
    {
      title: '步骤',
      dataIndex: 'stepNumber',
      key: 'stepNumber',
      width: 80
    },
    {
      title: '货物名称',
      dataIndex: 'cargoName',
      key: 'cargoName',
      width: 120
    },
    {
      title: '集装箱',
      key: 'container',
      width: 100,
      render: (record: PackingStep) => `集装箱 ${record.containerIndex + 1}`
    },
    {
      title: '位置坐标 (x, y, z)',
      key: 'position',
      render: (record: PackingStep) => (
        <Text code>
          ({record.position.x}, {record.position.y}, {record.position.z})
        </Text>
      )
    },
    {
      title: '操作描述',
      dataIndex: 'description',
      key: 'description'
    }
  ];

  return (
    <Modal
      title={
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <ContainerOutlined style={{ marginRight: 8, color: '#1890ff' }} />
          最终装箱方案报告
        </div>
      }
      open={visible}
      onCancel={onCancel}
      footer={null}
      width={1200}
      style={{ top: 20 }}
      bodyStyle={{ maxHeight: '80vh', overflowY: 'auto' }}
    >
      {/* 方案概览 */}
      <Card size="small" style={{ marginBottom: 16 }}>
        <Row gutter={16}>
          <Col span={6}>
            <Statistic
              title="集装箱数量"
              value={summary.totalContainers}
              prefix={<ContainerOutlined />}
              suffix="个"
            />
          </Col>
          <Col span={6}>
            <Statistic
              title="装载率"
              value={summary.utilizationRate}
              precision={1}
              prefix={<PercentageOutlined />}
              suffix="%"
            />
          </Col>
          <Col span={6}>
            <Statistic
              title="总成本"
              value={summary.totalCost}
              prefix={<DollarOutlined />}
              suffix="¥"
            />
          </Col>
          <Col span={6}>
            <Statistic
              title="货物装载"
              value={`${summary.packedCargos}/${summary.totalCargos}`}
              prefix={<BoxPlotOutlined />}
              suffix="件"
            />
          </Col>
        </Row>
      </Card>

      {/* 基本信息 */}
      <Descriptions
        title="方案基本信息"
        bordered
        size="small"
        column={2}
        style={{ marginBottom: 16 }}
      >
        <Descriptions.Item label="方案ID">{solution.id}</Descriptions.Item>
        <Descriptions.Item label="生成时间">
          {new Date(solution.timestamp).toLocaleString()}
        </Descriptions.Item>
        <Descriptions.Item label="装箱算法">{packingResult.algorithm}</Descriptions.Item>
        <Descriptions.Item label="装箱模式">{packingResult.mode}</Descriptions.Item>
        <Descriptions.Item label="执行时间">
          {packingResult.executionTime ? `${packingResult.executionTime}ms` : '未记录'}
        </Descriptions.Item>
        <Descriptions.Item label="迭代次数">
          {packingResult.iterations || '未记录'}
        </Descriptions.Item>
        {summary.spaceOccupancyRate && (
          <Descriptions.Item label="空间占用率">
            {summary.spaceOccupancyRate.toFixed(1)}%
          </Descriptions.Item>
        )}
      </Descriptions>

      <Divider />

      {/* 货物明细 */}
      <Title level={4}>货物明细</Title>
      <Table
        columns={cargoColumns}
        dataSource={originalCargos}
        rowKey="id"
        size="small"
        pagination={false}
        style={{ marginBottom: 16 }}
        scroll={{ y: 200 }}
      />

      <Divider />

      {/* 集装箱明细 */}
      <Title level={4}>集装箱数量和类型明细</Title>
      <Table
        columns={containerColumns}
        dataSource={packingResult.containers}
        rowKey={(record, index) => `container-${index}`}
        size="small"
        pagination={false}
        style={{ marginBottom: 16 }}
      />

      <Divider />

      {/* 装箱步骤明细 */}
      <Title level={4}>货物装箱步骤明细</Title>
      <Table
        columns={stepColumns}
        dataSource={packingSteps}
        rowKey="stepNumber"
        size="small"
        pagination={{
          pageSize: 10,
          showSizeChanger: true,
          showQuickJumper: true,
          showTotal: (total) => `共 ${total} 个装箱步骤`
        }}
        scroll={{ y: 300 }}
      />
    </Modal>
  );
};