import React from 'react';
import { Modal, Form, Input, InputNumber, Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import { Cargo } from '../../types';

interface CargoModalProps {
  visible: boolean;
  onCancel: () => void;
  onAddCargo: (cargo: Omit<Cargo, 'id' | 'color'>) => void;
}

/**
 * 添加货物模态窗口组件
 * 以模态窗口形式提供货物信息输入
 */
export const CargoModal: React.FC<CargoModalProps> = ({ 
  visible, 
  onCancel, 
  onAddCargo 
}) => {
  const { t } = useTranslation();
  const [form] = Form.useForm();

  const handleAddCargo = async () => {
    try {
      const values = await form.validateFields();
      onAddCargo(values);
      form.resetFields();
      onCancel();
    } catch (error) {
      console.error('表单验证失败:', error);
    }
  };

  const handleCancel = () => {
    form.resetFields();
    onCancel();
  };

  return (
    <Modal
      title="添加货物"
      open={visible}
      onCancel={handleCancel}
      footer={[
        <Button key="cancel" onClick={handleCancel}>
          取消
        </Button>,
        <Button key="submit" type="primary" onClick={handleAddCargo} icon={<PlusOutlined />}>
          添加货物
        </Button>,
      ]}
      width={600}
      destroyOnClose
    >
      <Form 
        form={form} 
        layout="vertical" 
        className="cargo-modal-form"
        initialValues={{
          length: 1.0,
          width: 1.0,
          height: 1.0,
          weight: 100,
          quantity: 1
        }}
      >
        <Form.Item 
          name="name" 
          label="货物名称" 
          rules={[
            { required: true, message: '请输入货物名称' },
            { min: 1, max: 50, message: '货物名称长度应在1-50个字符之间' }
          ]}
        >
          <Input placeholder="请输入货物名称" />
        </Form.Item>
        
        <div className="grid grid-cols-2 gap-4">
          <Form.Item 
            name="length" 
            label="长度(m)" 
            rules={[
              { required: true, message: '请输入长度' },
              { type: 'number', min: 0.1, max: 50, message: '长度应在0.1-50米之间' }
            ]}
          >
            <InputNumber 
              min={0.1} 
              max={50}
              step={0.1} 
              placeholder="长度" 
              className="w-full" 
              precision={2}
            />
          </Form.Item>
          
          <Form.Item 
            name="width" 
            label="宽度(m)" 
            rules={[
              { required: true, message: '请输入宽度' },
              { type: 'number', min: 0.1, max: 50, message: '宽度应在0.1-50米之间' }
            ]}
          >
            <InputNumber 
              min={0.1} 
              max={50}
              step={0.1} 
              placeholder="宽度" 
              className="w-full" 
              precision={2}
            />
          </Form.Item>
          
          <Form.Item 
            name="height" 
            label="高度(m)" 
            rules={[
              { required: true, message: '请输入高度' },
              { type: 'number', min: 0.1, max: 10, message: '高度应在0.1-10米之间' }
            ]}
          >
            <InputNumber 
              min={0.1} 
              max={10}
              step={0.1} 
              placeholder="高度" 
              className="w-full" 
              precision={2}
            />
          </Form.Item>
          
          <Form.Item 
            name="weight" 
            label="重量(kg)" 
            rules={[
              { required: true, message: '请输入重量' },
              { type: 'number', min: 1, max: 100000, message: '重量应在1-100000kg之间' }
            ]}
          >
            <InputNumber 
              min={1} 
              max={100000}
              placeholder="重量" 
              className="w-full" 
              precision={1}
            />
          </Form.Item>
        </div>
        
        <Form.Item 
          name="quantity" 
          label="数量" 
          rules={[
            { required: true, message: '请输入数量' },
            { type: 'number', min: 1, max: 10000, message: '数量应在1-10000之间' }
          ]}
        >
          <InputNumber 
            min={1} 
            max={10000}
            placeholder="数量" 
            className="w-full" 
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};