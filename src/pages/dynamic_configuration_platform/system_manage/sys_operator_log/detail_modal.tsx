
import React from 'react';
import { Modal, Form, Input, InputNumber, Select, Button, Space,DatePicker } from 'antd';
import { SysOperatorLogItemProps } from "@/types/dynamic_configuration_platform/system_manage/sys_operator_log";
import dayjs from 'dayjs';
interface DetailModalProps {
    open: boolean;
    modalFlag: 'add' | 'edit';
    saving: boolean;
    formData: Partial<SysOperatorLogItemProps>;
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
            title={modalFlag === 'add' ? "新增操作日志" : "编辑操作日志"}
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
                        <Form.Item label="用户编码" name="UserCode" rules={[{ required: true, message: '' }]}>
                            <Input onChange={onChange} />
                        </Form.Item>
                        <Form.Item label="用户名称" name="UserName" rules={[{ required: true, message: '' }]}>
                            <Input onChange={onChange} />
                        </Form.Item>
                        <Form.Item label="领域" name="Domain" rules={[{ required: true, message: '' }]}>
                            <Input onChange={onChange} />
                        </Form.Item>
                        <Form.Item label="应用" name="Application" rules={[{ required: true, message: '' }]}>
                            <Input onChange={onChange} />
                        </Form.Item>
                        <Form.Item label="服务" name="Service" rules={[{ required: true, message: '' }]}>
                            <Input onChange={onChange} />
                        </Form.Item>
                        <Form.Item label="操作按钮" name="OperationBtn" rules={[{ required: true, message: '' }]}>
                            <Input onChange={onChange} />
                        </Form.Item>
                        <Form.Item label="IP" name="IpAddress" >
                            <Input onChange={onChange} />
                        </Form.Item>
                        <Form.Item label="时间"  rules={[{ required: true, message: '' }]}>
                            <DatePicker name="OperateTime" style={{ display: 'block' }} defaultValue={dayjs(formData.OperateTime)}  onChange={(_, dateStrings) => {onDateChange("OperateTime", dateStrings || '') }} />
                        </Form.Item>
                        <Form.Item label="操作设备" name="OperateDevice" >
                            <Input onChange={onChange} />
                        </Form.Item>
                        <Form.Item label="状态" name="Status" rules={[{ required: true, message: '' }]}>
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
