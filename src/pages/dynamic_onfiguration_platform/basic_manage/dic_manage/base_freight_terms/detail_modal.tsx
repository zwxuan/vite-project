
import React from 'react';
import { Modal, Form, Input, InputNumber, Select, Button, Space,DatePicker } from 'antd';
import { BaseFreightTermsItemProps } from "@/types/dynamic_onfiguration_platform/basic_manage/base_freight_terms";
import dayjs from 'dayjs';
interface DetailModalProps {
    open: boolean;
    modalFlag: 'add' | 'edit';
    saving: boolean;
    formData: Partial<BaseFreightTermsItemProps>;
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
            title={modalFlag === 'add' ? "新增运费条款" : "编辑运费条款"}
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
                        <Form.Item label="英文名称" name="EnglishName" >
                            <Input onChange={onChange} />
                        </Form.Item>
                        <Form.Item label="中文名称" name="ChineseName" >
                            <Input onChange={onChange} />
                        </Form.Item>
                        <Form.Item label="含义" name="Meaning" >
                            <Input onChange={onChange} />
                        </Form.Item>
                        <Form.Item label="适用场景" name="ApplicableScenarios" >
                            <Input onChange={onChange} />
                        </Form.Item>
                        <Form.Item label="优势" name="Advantages" >
                            <Input onChange={onChange} />
                        </Form.Item>
                        <Form.Item label="劣势" name="Disadvantages" >
                            <Input onChange={onChange} />
                        </Form.Item>
                        <Form.Item label="交换码" name="ExchangeCode" >
                            <Input onChange={onChange} />
                        </Form.Item>
                        <Form.Item label="ISO标准码" name="IsoCode" >
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
