import React from 'react';
import { Card, Form, Select, Radio, Tooltip, InputNumber, Switch } from 'antd';
import { InfoCircleOutlined } from '@ant-design/icons';
import { PackingConfig, ContainerType, PackingAlgorithmType, PackingModeType } from '../../types';
import { CONTAINER_TYPES, PACKING_ALGORITHMS, PACKING_MODES } from '../../constants';

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



  const handleGapChange = (value: number | null) => {
    onChange({
      ...config,
      gap: value || 0.05
    });
  };

  const handleStackingChange = (checked: boolean) => {
    onChange({
      ...config,
      allowStacking: checked
    });
  };

  const handleRotationChange = (checked: boolean) => {
    onChange({
      ...config,
      allowRotation: checked
    });
  };

  return (
    <Card title="装箱配置" style={{ marginBottom: '16px' }}>
      <Form layout="vertical">
        <Form.Item style={{padding:'4px'}}
          label={
            <span>
              集装箱规格选择
              <Tooltip title={
                        <div className='rul_title_tooltip' style={{ backgroundColor: '#fff', color: '#000' }}>
                            <ol style={{ color: '#666666', fontSize: '12px', paddingLeft: '2px' }}>
                                <li style={{ marginBottom: '10px' }}>选择特定的集装箱类型，或选择'自动选择'让系统根据算法自动选择最优规格。
                                </li>
                            </ol>
                        </div>
                    }
                    color='white'>
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
              <Tooltip
                    title={
                        <div className='rul_title_tooltip' style={{ backgroundColor: '#fff', color: '#000' }}>
                            <ol style={{ color: '#666666', fontSize: '12px', paddingLeft: '2px' }}>
                                <li style={{ marginBottom: '10px' }}><span style={{ marginRight: '10px', backgroundColor: '#f1f1f1', padding: '2px 10px' }}><b>快速预览</b></span>贪心算法 + 单集装箱模式。
                                </li>
                                <li style={{ marginBottom: '10px' }}><span style={{ marginRight: '10px', backgroundColor: '#f1f1f1', padding: '2px 10px' }}><b>精确装箱</b></span>遗传算法 + 多集装箱模式 + 最高空间利用率。
                                </li>
                                <li style={{ marginBottom: '10px' }}><span style={{ marginRight: '10px', backgroundColor: '#f1f1f1', padding: '2px 10px' }}><b>平衡方案</b></span>混合算法 + 多集装箱模式 + 最低运输成本。
                                </li>
                                <li style={{ marginBottom: '10px' }}><span style={{ marginRight: '10px', backgroundColor: '#f1f1f1', padding: '2px 10px' }}><b>大批量货物</b></span>多集装箱算法 + 多集装箱模式 + 最少集装箱数量。
                                </li>
                                <li style={{ marginBottom: '10px' }}><span style={{ marginRight: '10px', backgroundColor: '#f1f1f1', padding: '2px 10px' }}><b>时间敏感</b></span>模拟退火算法 + 单集装箱模式 + 无优化策略。
                                </li>
                            </ol>
                        </div>
                    }
                    color='white'>
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
              <Tooltip title={
                        <div className='rul_title_tooltip' style={{ backgroundColor: '#fff', color: '#000' }}>
                            <ol style={{ color: '#666666', fontSize: '12px', paddingLeft: '2px' }}>
                                <li style={{ marginBottom: '10px' }}>单集装箱模式只使用一个集装箱，多集装箱模式允许使用多个集装箱。
                                </li>
                            </ol>
                        </div>
                    }
                    color='white'>
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
              货物间隙设置
              <Tooltip title={
                        <div className='rul_title_tooltip' style={{ backgroundColor: '#fff', color: '#000' }}>
                            <ol style={{ color: '#666666', fontSize: '12px', paddingLeft: '2px' }}>
                                <li style={{ marginBottom: '10px' }}>设置货物之间的安全间隙，单位为米，建议值0.03-0.1米。
                                </li>
                            </ol>
                        </div>
                    }
                    color='white'>
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

        <Form.Item style={{padding:'4px'}}
          label={
            <span>
              货物堆叠设置
              <Tooltip title={
                        <div className='rul_title_tooltip' style={{ backgroundColor: '#fff', color: '#000' }}>
                            <ol style={{ color: '#666666', fontSize: '12px', paddingLeft: '2px' }}>
                                <li style={{ marginBottom: '10px' }}>开启后，算法会尝试将货物堆叠放置以提高空间利用率；关闭后，所有货物将平铺放置，不进行堆叠。
                                </li>
                                <li style={{ marginBottom: '10px' }}>注意：即使开启全局堆叠，标记为"不可堆叠"的货物仍然不会被堆叠。
                                </li>
                                <li style={{ marginBottom: '10px' }}>特别说明：框架集装箱无论此设置如何，都不允许货物堆叠，以确保货物安全。
                                </li>
                            </ol>
                        </div>
                    }
                    color='white'>
                <InfoCircleOutlined style={{ marginLeft: 4, color: '#1890ff' }} />
              </Tooltip>
            </span>
          }
        >
          <Switch
            checked={config.allowStacking !== false} // 默认为true
            onChange={handleStackingChange}
            checkedChildren="允许堆叠"
            unCheckedChildren="禁止堆叠"
          />
          <div style={{ fontSize: '12px', color: '#666', marginTop: '4px' }}>
            当前设置：{config.allowStacking !== false ? '允许货物堆叠' : '禁止货物堆叠'}
            <br />
            <span style={{ color: '#ff6b35' }}>注意：框架集装箱始终不允许堆叠</span>
          </div>
        </Form.Item>

        {/* 货物放倒配置 */}
        <Form.Item
          label={
            <span>
              货物放倒
              <Tooltip
                title={
                  <div style={{ fontSize: '13px', lineHeight: '1.6' }}>
                    <div style={{ fontWeight: 'bold', marginBottom: '8px', color: '#1890ff' }}>货物放倒功能说明：</div>
                    <ol style={{ paddingLeft: '16px', margin: 0 }}>
                      <li style={{ marginBottom: '10px' }}>允许放倒：对于高度超过标准集装箱的货物，系统会自动尝试将其放倒（长高互换）。</li>
                      <li style={{ marginBottom: '10px' }}>例如：1×1×4.2m的货物可以放倒成4.2×1×1m，从而装入标准集装箱。</li>
                      <li style={{ marginBottom: '10px' }}>优先级：系统会优先尝试使用标准集装箱，如果放倒后仍无法装入，才会使用框架集装箱。</li>
                      <li style={{ marginBottom: '10px' }}>3D显示：放倒的货物在3D可视化中会以放倒后的姿态显示。</li>
                    </ol>
                  </div>
                }
                color='white'>
                <InfoCircleOutlined style={{ marginLeft: 4, color: '#1890ff' }} />
              </Tooltip>
            </span>
          }
        >
          <Switch
            checked={config.allowRotation === true} // 默认为false
            onChange={handleRotationChange}
            checkedChildren="允许放倒"
            unCheckedChildren="禁止放倒"
          />
          <div style={{ fontSize: '12px', color: '#666', marginTop: '4px' }}>
            当前设置：{config.allowRotation === true ? '允许货物放倒' : '禁止货物放倒'}
            <br />
            <span style={{ color: '#52c41a' }}>提示：放倒可以提高标准集装箱的利用率</span>
          </div>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default PackingConfigComponent;