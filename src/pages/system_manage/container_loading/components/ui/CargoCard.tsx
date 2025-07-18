import React from 'react';
import { Card, Button, Space, Tag, Row, Col, Popconfirm } from 'antd';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Cargo } from '../../types';

interface CargoCardProps {
  cargos: Cargo[];
  onDeleteCargo: (id: string) => void;
  getCargoColor: (id: string) => string;
}

/**
 * 货物卡片列表组件
 * 以卡片形式展示货物列表
 */
export const CargoCard: React.FC<CargoCardProps> = ({ 
  cargos, 
  onDeleteCargo, 
  getCargoColor 
}) => {
  if (cargos.length === 0) {
    return (
      <div className="empty-state">
        <div className="empty-icon">📦</div>
        <div className="empty-text">暂无货物，请添加货物</div>
      </div>
    );
  }

  return (
    <Row gutter={[16, 16]}>
      {cargos.map((cargo) => (
        <Col span={24} key={cargo.id}>
          <Card
            size="small"
            className="cargo-card"
            actions={[
              <Popconfirm
                title="确定要删除这个货物吗？"
                onConfirm={() => onDeleteCargo(cargo.id)}
                okText="确定"
                cancelText="取消"
              >
                <Button 
                  type="text" 
                  danger 
                  size="small" 
                  icon={<DeleteOutlined />}
                >
                  删除
                </Button>
              </Popconfirm>
            ]}
          >
            <div className="cargo-card-content">
              <div className="cargo-header" style={{ textAlign: 'left', marginBottom: '6px' }}>
                <Space align="start" style={{ justifyContent: 'flex-start', width: '100%' }}>
                  <div
                    className="cargo-color-indicator"
                    style={{
                      width: 20,
                      height: 20,
                      backgroundColor: getCargoColor(cargo.id),
                      borderRadius: 2,
                      border: '1px solid #d9d9d9',
                      flexShrink: 0
                    }}
                  />
                  <span className="cargo-name" style={{ fontWeight: 'bold', fontSize: '14px' }}>{cargo.name}</span>
                </Space>
              </div>
              
              <div className="cargo-details">
                <Row gutter={[8, 4]}>
                  <Col span={12}>
                    <Tag color="blue" className="detail-tag">
                      📏 尺寸: {cargo.length} × {cargo.width} × {cargo.height} m
                    </Tag>
                  </Col>
                  <Col span={12}>
                    <Tag color="green" className="detail-tag">
                      ⚖️ 重量: {cargo.weight.toLocaleString('zh-CN')} kg
                    </Tag>
                  </Col>
                  <Col span={12}>
                    <Tag color="purple" className="detail-tag">
                      📦 数量: {cargo.quantity} 件
                    </Tag>
                  </Col>
                  <Col span={12}>
                    <Tag color="orange" className="detail-tag">
                      📐 体积: {(cargo.length * cargo.width * cargo.height).toFixed(2)} m³
                    </Tag>
                  </Col>
                </Row>
              </div>
            </div>
          </Card>
        </Col>
      ))}
    </Row>
  );
};