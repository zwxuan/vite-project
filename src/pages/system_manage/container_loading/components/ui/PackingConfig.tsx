import React from 'react';
import { Card, Form, Select, Radio, Tooltip, InputNumber } from 'antd';
import { InfoCircleOutlined } from '@ant-design/icons';
import { PackingConfig, ContainerType, PackingAlgorithmType, PackingModeType, CostOptimizationStrategy } from '../../types';
import { CONTAINER_TYPES, PACKING_ALGORITHMS, PACKING_MODES, COST_OPTIMIZATION_STRATEGIES } from '../../constants';

interface PackingConfigProps {
  config: PackingConfig;
  onChange: (config: PackingConfig) => void;
}

export const PackingConfigComponent: React.FC<PackingConfigProps> = ({ config, onChange }) => {
  const handleContainerTypeChange = (value: string) => {
    const containerType = value === 'auto' ? undefined : CONTAINER_TYPES.find(ct => ct.name === value);
    onChange({
      ...config,
      containerType
    });
  };

  const handleAlgorithmChange = (value: PackingAlgorithmType) => {
    onChange({
      ...config,
      algorithm: value
    });
  };

  const handleModeChange = (value: PackingModeType) => {
    onChange({
      ...config,
      mode: value,
      allowMultipleContainers: value === 'multi_container'
    });
  };

  const handleCostOptimizationChange = (value: CostOptimizationStrategy) => {
    onChange({
      ...config,
      costOptimizationStrategy: value
    });
  };

  const handleGapChange = (value: number | null) => {
    onChange({
      ...config,
      gap: value || 0.05
    });
  };

  return (
    <Card title="装箱配置" style={{ marginBottom: '16px' }}>
      <Form layout="vertical">
        <Form.Item style={{padding:'4px'}}
          label={
            <span>
              集装箱规格选择
              <Tooltip title="选择特定的集装箱类型，或选择'自动选择'让系统根据算法自动选择最优规格">
                <InfoCircleOutlined style={{ marginLeft: 4, color: '#1890ff' }} />
              </Tooltip>
            </span>
          }
        >
          <Select
            value={config.containerType?.name || 'auto'}
            onChange={handleContainerTypeChange}
            placeholder="请选择集装箱规格"
          >
            <Select.Option value="auto">自动选择最优规格</Select.Option>
            {CONTAINER_TYPES.map(containerType => (
              <Select.Option key={containerType.name} value={containerType.name}>
                {containerType.name} ({containerType.length}×{containerType.width}×{containerType.height}m, 载重{containerType.maxWeight}kg)
              </Select.Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item  style={{padding:'4px'}}
          label={
            <span>
              装箱算法选择
              <Tooltip title="不同算法有不同的优化目标和策略">
                <InfoCircleOutlined style={{ marginLeft: 4, color: '#1890ff' }} />
              </Tooltip>
            </span>
          }
        >
          <Select
            value={config.algorithm}
            onChange={handleAlgorithmChange}
            placeholder="请选择装箱算法"
            dropdownStyle={{ maxWidth: '400px' }}
            optionLabelProp="label"
          >
            {PACKING_ALGORITHMS.map(algorithm => (
              <Select.Option 
                key={algorithm.value} 
                value={algorithm.value}
                label={algorithm.label}
              >
                <div style={{ padding: '4px 0', lineHeight: '1.4' }}>
                  <div style={{ fontWeight: 'bold', marginBottom: '2px' }}>{algorithm.label}</div>
                  <div style={{ 
                    fontSize: '12px', 
                    color: '#666', 
                    whiteSpace: 'normal',
                    wordBreak: 'break-word'
                  }}>
                    {algorithm.description}
                  </div>
                </div>
              </Select.Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item  style={{padding:'4px'}}
          label={
            <span>
              装箱模式选择
              <Tooltip title="单集装箱模式只使用一个集装箱，多集装箱模式允许使用多个集装箱">
                <InfoCircleOutlined style={{ marginLeft: 4, color: '#1890ff' }} />
              </Tooltip>
            </span>
          }
        >
          <Radio.Group
            value={config.mode}
            onChange={(e) => handleModeChange(e.target.value)}
          >
            {PACKING_MODES.map(mode => (
              <Radio.Button key={mode.value} value={mode.value} style={{height:'22px',lineHeight:'22px'}}>
                <Tooltip title={mode.description}>
                  {mode.label}
                </Tooltip>
              </Radio.Button>
            ))}
          </Radio.Group>
        </Form.Item>

        <Form.Item  style={{padding:'4px'}}
          label={
            <span>
              成本优化策略
              <Tooltip title="选择不同的成本优化策略来获得最佳的装箱方案">
                <InfoCircleOutlined style={{ marginLeft: 4, color: '#1890ff' }} />
              </Tooltip>
            </span>
          }
        >
          <Select
            value={config.costOptimizationStrategy || 'none'}
            onChange={handleCostOptimizationChange}
            placeholder="请选择成本优化策略"
            dropdownStyle={{ maxWidth: '400px' }}
            optionLabelProp="label"
          >
            {COST_OPTIMIZATION_STRATEGIES.map(strategy => (
              <Select.Option 
                key={strategy.value} 
                value={strategy.value}
                label={strategy.label}
              >
                <div style={{ padding: '4px 0', lineHeight: '1.4' }}>
                  <div style={{ fontWeight: 'bold', marginBottom: '2px' }}>{strategy.label}</div>
                  <div style={{ 
                    fontSize: '12px', 
                    color: '#666', 
                    whiteSpace: 'normal',
                    wordBreak: 'break-word'
                  }}>
                    {strategy.description}
                  </div>
                </div>
              </Select.Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item  style={{padding:'4px'}}
          label={
            <span>
              货物间隙设置
              <Tooltip title="设置货物之间的安全间隙，单位为米，建议值0.03-0.1米">
                <InfoCircleOutlined style={{ marginLeft: 4, color: '#1890ff' }} />
              </Tooltip>
            </span>
          }
        >
          <InputNumber
            value={config.gap || 0.05}
            onChange={handleGapChange}
            min={0.01}
            max={0.5}
            step={0.01}
            precision={2}
            placeholder="请输入间隙值"
            addonAfter="米"
            style={{ width: '100%' }}
          />
          <div style={{ fontSize: '12px', color: '#666', marginTop: '4px' }}>
            当前设置：{((config.gap || 0.05) * 100).toFixed(0)}cm 间隙
          </div>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default PackingConfigComponent;