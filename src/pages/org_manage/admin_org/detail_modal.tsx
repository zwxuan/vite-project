
import React from 'react';
import { Modal, Form, Input, InputNumber, Select, Button, Space,DatePicker } from 'antd';
import { AdminOrgItemProps } from "@/types/org_manage/admin_org";
import dayjs from 'dayjs';
interface DetailModalProps {
    open: boolean;
    modalFlag: 'add' | 'edit';
    saving: boolean;
    formData: Partial<AdminOrgItemProps>;
    onCancel: () => void;
    onOk: (values: any) => void;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onDateChange: (name: string, value: string | Array<string>) => void;
    onNumberChange: (name:string,value: number | null) => void;
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
}) => {
    return (
        <Modal 
            open={open} 
            title={modalFlag === 'add' ? "新增行政组织" : "编辑行政组织"}
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
                        <Form.Item label="编码" name="OrgCode" rules={[{ required: true, message: '' }]}>
                            <Input onChange={onChange} />
                        </Form.Item>
                        <Form.Item label="名称" name="OrgName" rules={[{ required: true, message: '' }]}>
                            <Input onChange={onChange} />
                        </Form.Item>
                        <Form.Item label="简称" name="OrgAbbr" >
                            <Input onChange={onChange} />
                        </Form.Item>
                        <Form.Item label="状态" name="OrgStatus" >
                            <Select onChange={onChange} />
                        </Form.Item>
                        <Form.Item label="备注" name="OrgRemark" >
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
