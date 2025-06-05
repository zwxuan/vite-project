
import React from 'react';
import { Modal, Form, Input, InputNumber, Select, Button, Space,DatePicker } from 'antd';
import { BaseBillTermsItemProps } from "@/types/basic_manage/base_bill_terms";
import dayjs from 'dayjs';
interface DetailModalProps {
    open: boolean;
    modalFlag: 'add' | 'edit';
    saving: boolean;
    formData: Partial<BaseBillTermsItemProps>;
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
            title={modalFlag === 'add' ? "新增提单条款" : "编辑提单条款"}
            onCancel={onCancel}
            destroyOnClose={true}
            maskClosable={false}
            closable={!saving}
            footer={null}
            centered={true}
        >
            <Form {...formItemLayout} style={{ maxWidth: 600 }} initialValues={formData} disabled={saving} onFinish={onOk}>
                        <Form.Item label="编码" name="Code" rules={[{ required: true, message: '' }]}>
                            <Input onChange={onChange} />
                        </Form.Item>
                        <Form.Item label="名称" name="Name" >
                            <Input onChange={onChange} />
                        </Form.Item>
                        <Form.Item label="本地化名称" name="LocalName" >
                            <Input onChange={onChange} />
                        </Form.Item>
                        <Form.Item label="交换码" name="ExchangeCode" >
                            <Input onChange={onChange} />
                        </Form.Item>
                        <Form.Item label="ISO 码" name="IsoCode" >
                            <Input onChange={onChange} />
                        </Form.Item>
                        <Form.Item label="提单类型" name="BillType" >
                            <Input onChange={onChange} />
                        </Form.Item>
                        <Form.Item label="备注" name="Remarks" >
                            <Input onChange={onChange} />
                        </Form.Item>
                        <Form.Item label="放货方式" name="ReleaseType" >
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
