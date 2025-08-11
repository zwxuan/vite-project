
import React from 'react';
import { Modal, Form, Input, InputNumber, Select, Button, Space,DatePicker } from 'antd';
import { FunctionPermissionByRoleItemProps } from "@/types/dynamic_configuration_platform/identity/function_permission_by_role";
import dayjs from 'dayjs';
interface DetailModalProps {
    open: boolean;
    modalFlag: 'add' | 'edit';
    saving: boolean;
    formData: Partial<FunctionPermissionByRoleItemProps>;
    onCancel: () => void;
    onOk: (values: any) => void;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onDateChange: (name: string, value: string | Array<string>) => void;
    onNumberChange: (name:string,value: number | null) => void;
    onChangeTetxtArea : (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

const formItemLayout = {
    labelCol: {
        xs: { span: 24 },
        sm: { span: 6 },
    },
    wrapperCol: {
        xs: { span: 24 },
        sm: { span: 14 },
    },
};

const DetailModal: React.FC<DetailModalProps> = ({
    open,
    modalFlag,
    saving,
    formData,
    onCancel,
    onOk,
    onChange,
    onDateChange,
    onNumberChange,
    onChangeTetxtArea,
}) => {
    return (
        <Modal 
            open={open} 
            title={modalFlag === 'add' ? "新增功能权限按角色" : "编辑功能权限按角色"}
            onCancel={onCancel}
            width={'95%'}
            height={'95%'}
            destroyOnClose={true}
            maskClosable={false}
            closable={!saving}
            footer={null}
            centered={true}
        >
            <Form {...formItemLayout} style={{ maxWidth: 600 }} initialValues={formData} disabled={saving} onFinish={onOk}>
                        <Form.Item label="角色编码" name="RoleCode" rules={[{ required: true, message: '' }]}>
                            <Input onChange={onChange} />
                        </Form.Item>
                        <Form.Item label="角色名称" name="RoleName" rules={[{ required: true, message: '' }]}>
                            <Input onChange={onChange} />
                        </Form.Item>
                        <Form.Item label="所属组织" name="BelongOrg" >
                            <Input onChange={onChange} />
                        </Form.Item>
                        <Form.Item label="应用名称" name="AppName" >
                            <Input onChange={onChange} />
                        </Form.Item>
                        <Form.Item label="菜单全路径" name="MenuFullPath" >
                            <Input onChange={onChange} />
                        </Form.Item>
                        <Form.Item label="功能名称" name="FunctionName" >
                            <Input onChange={onChange} />
                        </Form.Item>
                <Form.Item wrapperCol={{ offset: 14 }}></Form.Item>
                <div style={{ textAlign: 'right' }}>
                    <Space>
                        <Button onClick={onCancel} disabled={saving}>取消</Button>
                        {modalFlag === 'add' && <Button disabled={saving}>保存并新增</Button>}
                        <Button type="primary" htmlType='submit' danger disabled={saving}>保存</Button>
                    </Space>
                </div>
            </Form>
        </Modal>
    );
};

export default DetailModal;
