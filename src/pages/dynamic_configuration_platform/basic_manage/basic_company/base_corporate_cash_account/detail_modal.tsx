
import React from 'react';
import { Modal, Form, Input, InputNumber, Select, Button, Space,DatePicker } from 'antd';
import { BaseCorporateCashAccountItemProps } from "@/types/dynamic_configuration_platform/basic_manage/base_corporate_cash_account";
import dayjs from 'dayjs';
interface DetailModalProps {
    open: boolean;
    modalFlag: 'add' | 'edit';
    saving: boolean;
    formData: Partial<BaseCorporateCashAccountItemProps>;
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
            title={modalFlag === 'add' ? "新增企业现金账户" : "编辑企业现金账户"}
            onCancel={onCancel}
            destroyOnClose={true}
            maskClosable={false}
            closable={!saving}
            footer={null}
        >
            <Form {...formItemLayout} style={{ maxWidth: 600 }} initialValues={formData} disabled={saving} onFinish={onOk}>
                        <Form.Item label="账户编码" name="AccountCode" rules={[{ required: true, message: '' }]}>
                            <Input onChange={onChange} />
                        </Form.Item>
                        <Form.Item label="账户名称" name="AccountName" rules={[{ required: true, message: '' }]}>
                            <Input onChange={onChange} />
                        </Form.Item>
                        <Form.Item label="所属组织" name="OwningOrg" rules={[{ required: true, message: '' }]}>
                            <Input onChange={onChange} />
                        </Form.Item>
                        <Form.Item label="币种" name="CurrencyCode" rules={[{ required: true, message: '' }]}>
                            <Input onChange={onChange} />
                        </Form.Item>
                        <Form.Item label="开户日期"  rules={[{ required: true, message: '' }]}>
                            <DatePicker name="OpenDate" style={{ display: 'block' }} defaultValue={dayjs(formData.OpenDate)}  onChange={(_, dateStrings) => {onDateChange("OpenDate", dateStrings || '') }} />
                        </Form.Item>
                        <Form.Item label="是否默认" name="IsDefault" rules={[{ required: true, message: '' }]}>
                            <Input onChange={onChange} />
                        </Form.Item>
                        <Form.Item label="账户状态" name="AccountStatus" rules={[{ required: true, message: '' }]}>
                            <Input onChange={onChange} />
                        </Form.Item>
                        <Form.Item label="备注" name="Remark" >
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
