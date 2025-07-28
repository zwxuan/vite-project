
import React from 'react';
import { Modal, Form, Input, InputNumber, Select, Button, Space,DatePicker } from 'antd';
import { AccountingBookItemProps } from "@/types/dynamic_onfiguration_platform/basic_manage/accounting_book";
import dayjs from 'dayjs';
interface DetailModalProps {
    open: boolean;
    modalFlag: 'add' | 'edit';
    saving: boolean;
    formData: Partial<AccountingBookItemProps>;
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
            title={modalFlag === 'add' ? "新增账套设置" : "编辑账套设置"}
            onCancel={onCancel}
            destroyOnClose={true}
            maskClosable={false}
            closable={!saving}
            footer={null}
        >
            <Form {...formItemLayout} style={{ maxWidth: 600 }} initialValues={formData} disabled={saving} onFinish={onOk}>
                        <Form.Item label="账套ID" name="BookId" rules={[{ required: true, message: '' }]}>
                            <Select onChange={onChange} />
                        </Form.Item>
                        <Form.Item label="公司编码" name="CompanyCode" rules={[{ required: true, message: '' }]}>
                            <Input onChange={onChange} />
                        </Form.Item>
                        <Form.Item label="公司名称" name="CompanyName" rules={[{ required: true, message: '' }]}>
                            <Input onChange={onChange} />
                        </Form.Item>
                        <Form.Item label="账套编码" name="BookCode" rules={[{ required: true, message: '' }]}>
                            <Input onChange={onChange} />
                        </Form.Item>
                        <Form.Item label="账套名称" name="BookName" rules={[{ required: true, message: '' }]}>
                            <Input onChange={onChange} />
                        </Form.Item>
                        <Form.Item label="会计年度" name="FiscalYear" rules={[{ required: true, message: '' }]}>
                            <Input onChange={onChange} />
                        </Form.Item>
                        <Form.Item label="本位币代码" name="Currency" >
                            <Input onChange={onChange} />
                        </Form.Item>
                        <Form.Item label="第三方系统名称" name="ThirdSystemName" >
                            <Input onChange={onChange} />
                        </Form.Item>
                        <Form.Item label="接口方案" name="ApiRemark" >
                            <Input onChange={onChange} />
                        </Form.Item>
                        <Form.Item label="是否启用标识" name="IsActive" >
                            <Select onChange={onChange} />
                        </Form.Item>
                        <Form.Item label="创建时间"  >
                            <DatePicker name="CreatedAt" style={{ display: 'block' }} defaultValue={dayjs(formData.CreatedAt)}  onChange={(_, dateStrings) => {onDateChange("CreatedAt", dateStrings) }} />
                        </Form.Item>
                        <Form.Item label="更新时间"  >
                            <DatePicker name="UpdatedAt" style={{ display: 'block' }} defaultValue={dayjs(formData.UpdatedAt)}  onChange={(_, dateStrings) => {onDateChange("UpdatedAt", dateStrings) }} />
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

