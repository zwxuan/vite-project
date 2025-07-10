import React from 'react';
import { Table, Button, Space, Tag } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import { Cargo } from '../../types';

interface CargoTableProps {
  cargos: Cargo[];
  onDeleteCargo: (id: string) => void;
  getCargoColor: (id: string) => string;
}

/**
 * 货物列表表格组件
 * 负责显示货物列表和删除操作
 */
export const CargoTable: React.FC<CargoTableProps> = ({ 
  cargos, 
  onDeleteCargo, 
  getCargoColor 
}) => {
  const columns = [
    {
      title: '货物名称',
      dataIndex: 'name',
      key: 'name',
      render: (text: string, record: Cargo) => (
        <Space>
          <div
            style={{
              width: 16,
              height: 16,
              backgroundColor: getCargoColor(record.id),
              borderRadius: 2,
              border: '1px solid #d9d9d9'
            }}
          />
          {text}
        </Space>
      ),
    },
    {
      title: '尺寸',
      key: 'dimensions',
      render: (record: Cargo) => (
        <Tag color="blue">
          {`${record.length} × ${record.width} × ${record.height} m`}
        </Tag>
      ),
    },
    {
      title: '重量',
      dataIndex: 'weight',
      key: 'weight',
      render: (weight: number) => (
        <Tag color="green">
          {`${weight.toLocaleString('zh-CN')} kg`}
        </Tag>
      ),
    },
    {
      title: '数量',
      dataIndex: 'quantity',
      key: 'quantity',
      render: (quantity: number) => (
        <Tag color="purple">
          {`${quantity} 件`}
        </Tag>
      ),
    },
    {
      title: '体积',
      key: 'volume',
      render: (record: Cargo) => (
        <Tag color="orange">
          {`${(record.length * record.width * record.height).toFixed(2)} m³`}
        </Tag>
      ),
    },
    {
      title: '操作',
      key: 'actions',
      render: (record: Cargo) => (
        <Button
          type="text"
          danger
          size="small"
          icon={<DeleteOutlined />}
          onClick={() => onDeleteCargo(record.id)}
        >
          删除
        </Button>
      ),
    },
  ];

  return (
    <Table
      columns={columns}
      dataSource={cargos}
      rowKey="id"
      size="small"
      pagination={{
        pageSize: 10,
        showSizeChanger: true,
        showQuickJumper: true,
        showTotal: (total) => `共 ${total} 条`
      }}
      scroll={{ y: 300 }}
    />
  );
};