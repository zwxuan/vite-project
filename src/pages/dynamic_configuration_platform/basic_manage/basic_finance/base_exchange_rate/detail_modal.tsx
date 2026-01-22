
import React from 'react';
import { Modal, Form, Input, InputNumber, Select, Button, Space,DatePicker } from 'antd';
import { BaseExchangeRateItemProps } from "@/types/dynamic_configuration_platform/basic_manage/base_exchange_rate";
import dayjs from 'dayjs';
interface DetailModalProps {
    open: boolean;
    modalFlag: 'add' | 'edit';
    saving: boolean;
    formData: Partial<BaseExchangeRateItemProps>;
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
            title={modalFlag === 'add' ? "新增汇率管理" : "编辑汇率管理"}
            onCancel={onCancel}
            destroyOnClose={true}
            maskClosable={false}
            closable={!saving}
            footer={null}
        >
            <Form {...formItemLayout} style={{ maxWidth: 600 }} initialValues={formData} disabled={saving} onFinish={onOk}>
                        <Form.Item label="目的币种" name="PurposeCurrency" >
                            <Input onChange={onChange} />
                        </Form.Item>
                        <Form.Item label="汇率类型" name="ExchangeRateType" >
                            <Input onChange={onChange} />
                        </Form.Item>
                        <Form.Item label="源币种" name="SourceCurrency" >
                            <Input onChange={onChange} />
                        </Form.Item>
                        <Form.Item label="报价日期"  >
                            <DatePicker name="QuotationDate" style={{ display: 'block' }} defaultValue={dayjs(formData.QuotationDate)}  onChange={(_, dateStrings) => {onDateChange("QuotationDate", dateStrings || '') }} />
                        </Form.Item>
                        <Form.Item label="直接汇率" name="DirectExchangeRate" >
                            <InputNumber onChange={(value)=>onNumberChange("DirectExchangeRate", value as number)} />
                        </Form.Item>
                        <Form.Item label="间接汇率" name="IndirectExchangeRate" >
                            <InputNumber onChange={(value)=>onNumberChange("IndirectExchangeRate", value as number)} />
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

