import React from 'react';
import { Form, Input, Button, InputNumber, Card } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import { Cargo } from '../../types';

interface CargoFormProps {
  onAddCargo: (cargo: Omit<Cargo, 'id' | 'color'>) => void;
}

/**
 * 货物管理表单组件
 * 负责货物信息的输入和添加
 */
export const CargoForm: React.FC<CargoFormProps> = ({ onAddCargo }) => {
  const { t } = useTranslation();
  const [form] = Form.useForm();

  const handleAddCargo = (values: any) => {
    onAddCargo(values);
    form.resetFields();
  };

  return (
    <Card title="货物管理" className="mb-4">
      <Form form={form} onFinish={handleAddCargo} layout="vertical" className="cargo-form">
        <Form.Item name="name" label="货物名称" rules={[{ required: true }]}>
          <Input placeholder="请输入货物名称" />
        </Form.Item>
        <div className="grid grid-cols-2 gap-4">
          <Form.Item name="length" label="长度(m)" rules={[{ required: true }]}>
            <InputNumber min={0.1} step={0.1} placeholder="长度" className="w-full" />
          </Form.Item>
          <Form.Item name="width" label="宽度(m)" rules={[{ required: true }]}>
            <InputNumber min={0.1} step={0.1} placeholder="宽度" className="w-full" />
          </Form.Item>
          <Form.Item name="height" label="高度(m)" rules={[{ required: true }]}>
            <InputNumber min={0.1} step={0.1} placeholder="高度" className="w-full" />
          </Form.Item>
          <Form.Item name="weight" label="重量(kg)" rules={[{ required: true }]}>
            <InputNumber min={1} placeholder="重量" className="w-full" />
          </Form.Item>
        </div>
        <Form.Item name="quantity" label="数量" rules={[{ required: true }]}>
          <InputNumber min={1} placeholder="数量" className="w-full" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" icon={<PlusOutlined />} className="w-full">
            添加货物
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};