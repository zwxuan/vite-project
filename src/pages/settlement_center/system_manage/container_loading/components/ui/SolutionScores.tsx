import React from 'react';
import { Card, Table, Tag, Typography, Divider } from 'antd';
import { TrophyOutlined, CheckCircleOutlined } from '@ant-design/icons';
import { SolutionScore } from '../../types';

const { Title, Text } = Typography;

interface SolutionScoresProps {
  solutionScores?: SolutionScore[];
}

/**
 * 方案评分显示组件
 * 显示所有方案的评分结果和最终选中的方案
 */
export const SolutionScores: React.FC<SolutionScoresProps> = ({ solutionScores }) => {
  if (!solutionScores || solutionScores.length === 0) {
    return null;
  }

  // 找到最优方案
  const selectedSolution = solutionScores.find(s => s.isSelected);

  const columns = [
    {
      title: '集装箱类型',
      dataIndex: 'containerType',
      key: 'containerType',
      width: 200,
      render: (containerType: any) => (
        <Text strong>
          {containerType.name}
          <br />
          <Text type="secondary" style={{ fontSize: '12px' }}>
            {containerType.length}×{containerType.width}×{containerType.height}m
          </Text>
        </Text>
      ),
    },
    {
      title: '总评分',
      dataIndex: 'score',
      key: 'score',
      width: 100,
      align: 'center' as const,
      render: (score: number, record: SolutionScore) => (
        <div style={{ textAlign: 'center' }}>
          <Text 
            strong 
            style={{ 
              color: record.isSelected ? '#52c41a' : score > 0 ? '#1890ff' : '#ff4d4f',
              fontSize: '16px'
            }}
          >
            {score.toFixed(1)}
          </Text>
          {record.isSelected && (
            <div>
              <CheckCircleOutlined style={{ color: '#52c41a', marginTop: '4px' }} />
            </div>
          )}
        </div>
      ),
      sorter: (a: SolutionScore, b: SolutionScore) => b.score - a.score,
    },
    {
      title: '利用率评分',
      dataIndex: 'utilizationScore',
      key: 'utilizationScore',
      width: 120,
      align: 'center' as const,
      render: (score: number) => (
        <Text style={{ color: '#722ed1' }}>
          {score.toFixed(1)}
        </Text>
      ),
    },
    {
      title: '成本效益评分',
      dataIndex: 'costEfficiencyScore',
      key: 'costEfficiencyScore',
      width: 130,
      align: 'center' as const,
      render: (score: number) => (
        <Text style={{ color: '#fa8c16' }}>
          {score.toFixed(1)}
        </Text>
      ),
    },
    {
      title: '装载效率评分',
      dataIndex: 'loadingEfficiencyScore',
      key: 'loadingEfficiencyScore',
      width: 130,
      align: 'center' as const,
      render: (score: number) => (
        <Text style={{ color: '#13c2c2' }}>
          {score.toFixed(1)}
        </Text>
      ),
    },
    {
      title: '未装载货物',
      dataIndex: 'unpackedItemsCount',
      key: 'unpackedItemsCount',
      width: 120,
      align: 'center' as const,
      render: (count: number) => (
        <Tag color={count === 0 ? 'success' : 'error'}>
          {count} 件
        </Tag>
      ),
    },
    {
      title: '状态',
      dataIndex: 'isSelected',
      key: 'isSelected',
      width: 80,
      align: 'center' as const,
      render: (isSelected: boolean) => (
        isSelected ? (
          <Tag color="success" icon={<TrophyOutlined />}>
            最优
          </Tag>
        ) : (
          <Tag color="default">
            备选
          </Tag>
        )
      ),
    },
  ];

  return (
    <Card 
      title={
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <TrophyOutlined style={{ color: '#faad14' }} />
          <span>方案评分结果</span>
        </div>
      }
      style={{ marginTop: '16px' }}
      size="small"
    >
      {selectedSolution && (
        <div style={{ marginBottom: '16px', padding: '12px', background: '#f6ffed', border: '1px solid #b7eb8f', borderRadius: '6px' }}>
          <Title level={5} style={{ margin: 0, color: '#52c41a' }}>
            <TrophyOutlined style={{ marginRight: '8px' }} />
            最终选中方案：{selectedSolution.containerType.name}
          </Title>
          <Text type="secondary">
            总评分：{selectedSolution.score.toFixed(1)} | 
            利用率：{selectedSolution.utilizationScore.toFixed(1)} | 
            成本效益：{selectedSolution.costEfficiencyScore.toFixed(1)} | 
            装载效率：{selectedSolution.loadingEfficiencyScore.toFixed(1)}
            {selectedSolution.unpackedItemsCount > 0 && (
              <Text type="danger"> | 未装载：{selectedSolution.unpackedItemsCount}件</Text>
            )}
          </Text>
        </div>
      )}

      <Table
        columns={columns}
        dataSource={solutionScores}
        rowKey={(record) => record.containerType.name}
        pagination={false}
        size="small"
        scroll={{ x: 800 }}
        rowClassName={(record) => record.isSelected ? 'selected-solution-row' : ''}
        style={{
          '.selected-solution-row': {
            backgroundColor: '#f6ffed !important'
          },
          '.selected-solution-row:hover': {
            backgroundColor: '#f6ffed !important'
          }
        } as any}
      />

      <Divider style={{ margin: '12px 0' }} />
      
      <div style={{ fontSize: '12px', color: '#666' }}>
        <Text type="secondary">
          <strong>评分说明：</strong>
          总评分 = 利用率评分 × 50% + 成本效益评分 × 30% + 装载效率评分 × 20%
          <br />
          <strong>特别说明：</strong>
          存在未装载货物的方案评分为0，优先选择能够装载所有货物的方案
        </Text>
      </div>
    </Card>
  );
};