import React from 'react';
import { Modal, Form, Input, Select, Switch, Row, Col } from 'antd';

const { Option } = Select;

interface MenuFormModalProps {
  visible: boolean;
  mode: 'add' | 'edit';
  isAddingMenu: boolean;
  selectedNode: any;
  form: any;
  onSave: () => void;
  onCancel: () => void;
}

const MenuFormModal: React.FC<MenuFormModalProps> = ({
  visible,
  mode,
  isAddingMenu,
  selectedNode,
  form,
  onSave,
  onCancel
}) => {
  return (
    <Modal
      title={mode === 'add' ? (isAddingMenu ? '添加菜单' : '添加服务') : '编辑服务'}
      open={visible}
      onOk={onSave}
      onCancel={onCancel}
      width={600}
      okText="确定"
      cancelText="取消"
    >
      <Form
        form={form}
        layout="vertical"
        initialValues={{
          isActive: true,
          level: 1
        }}
      >
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              label={isAddingMenu ? "菜单编码" : "服务编码"}
              name="serviceCode"
              rules={[{ required: true, message: isAddingMenu ? '请输入菜单编码' : '请输入服务编码' }]}
            >
              <Input placeholder={isAddingMenu ? "请输入菜单编码" : "请输入服务编码"} />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label={isAddingMenu ? "菜单名称" : "服务名称"}
              name="serviceName"
              rules={[{ required: true, message: isAddingMenu ? '请输入菜单名称' : '请输入服务名称' }]}
            >
              <Input placeholder={isAddingMenu ? "请输入菜单名称" : "请输入服务名称"} />
            </Form.Item>
          </Col>
        </Row>
        
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              label="菜单级别"
              name="level"
              rules={[{ required: true, message: '请选择菜单级别' }]}
            >
              <Select placeholder="请选择菜单级别" disabled={mode === 'add' && selectedNode?.level === 1}>
                <Option value={1}>一级菜单</Option>
                <Option value={2}>二级菜单</Option>
                <Option value={3}>三级菜单</Option>
                <Option value={4}>四级菜单</Option>
              </Select>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="图标"
              name="icon"
            >
              <Input placeholder="请输入图标名称" />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              label="路径"
              name="path"
            >
              <Input placeholder="请输入路径" disabled={isAddingMenu} />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="排序"
              name="sortOrder"
            >
              <Input type="number" placeholder="请输入排序" />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              label="状态"
              name="isActive"
              valuePropName="checked"
            >
              <Switch checkedChildren="启用" unCheckedChildren="禁用" />
            </Form.Item>
          </Col>
        </Row>

        <Form.Item
          label="描述"
          name="description"
        >
          <Input.TextArea rows={3} placeholder="请输入描述" />
        </Form.Item>

        {mode === 'add' && selectedNode && (
          <Form.Item name="parentId" style={{ display: 'none' }}>
            <Input />
          </Form.Item>
        )}
      </Form>
    </Modal>
  );
};

export default MenuFormModal;