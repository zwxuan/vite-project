
import React from 'react';
import { Modal, Form, Input, InputNumber, Select, Button, Space,DatePicker } from 'antd';
import { BaseTaxTypeItemProps } from "@/types/dynamic_configuration_platform/basic_manage/base_tax_type";
import dayjs from 'dayjs';
interface DetailModalProps {
    open: boolean;
    modalFlag: 'add' | 'edit';
    saving: boolean;
    formData: Partial<BaseTaxTypeItemProps>;
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
            title={modalFlag === 'add' ? "新增税种档案" : "编辑税种档案"}
            onCancel={onCancel}
            destroyOnClose={true}
            maskClosable={false}
            closable={!saving}
            footer={null}
        >
            <Form {...formItemLayout} style={{ maxWidth: 600 }} initialValues={formData} disabled={saving} onFinish={onOk}>
                        <Form.Item label="税种编码" name="TaxTypeCode" rules={[{ required: true, message: '' }]}>
                            <Input onChange={onChange} />
                        </Form.Item>
                        <Form.Item label="税种名称" name="TaxTypeName" rules={[{ required: true, message: '' }]}>
                            <Input onChange={onChange} />
                        </Form.Item>
                        <Form.Item label="税制名称" name="TaxSystemName" rules={[{ required: true, message: '' }]}>
                            <Input onChange={onChange} />
                        </Form.Item>
                        <Form.Item label="国家地区" name="CountryRegion" rules={[{ required: true, message: '' }]}>
                            <Input onChange={onChange} />
                        </Form.Item>
                        <Form.Item label="纳税期限" name="TaxPeriod" rules={[{ required: true, message: '' }]}>
                            <Input onChange={onChange} />
                        </Form.Item>
                        <Form.Item label="纳税币种" name="TaxCurrency" rules={[{ required: true, message: '' }]}>
                            <Input onChange={onChange} />
                        </Form.Item>
                        <Form.Item label="精度" name="PrecisionVal" rules={[{ required: true, message: '' }]}>
                            <Select onChange={onChange} />
                        </Form.Item>
                        <Form.Item label="舍入规则" name="RoundingRule" rules={[{ required: true, message: '' }]}>
                            <Input onChange={onChange} />
                        </Form.Item>
                        <Form.Item label="汇率类型" name="ExchangeType" rules={[{ required: true, message: '' }]}>
                            <Input onChange={onChange} />
                        </Form.Item>
                        <Form.Item label="生效日期"  rules={[{ required: true, message: '' }]}>
                            <DatePicker name="EffectiveDate" style={{ display: 'block' }} defaultValue={dayjs(formData.EffectiveDate)}  onChange={(_, dateStrings) => {onDateChange("EffectiveDate", dateStrings) }} />
                        </Form.Item>
                        <Form.Item label="失效日期"  >
                            <DatePicker name="ExpiryDate" style={{ display: 'block' }} defaultValue={dayjs(formData.ExpiryDate)}  onChange={(_, dateStrings) => {onDateChange("ExpiryDate", dateStrings) }} />
                        </Form.Item>
                        <Form.Item label="创建人" name="CreatedBy" rules={[{ required: true, message: '' }]}>
                            <Input onChange={onChange} />
                        </Form.Item>
                        <Form.Item label="创建时间"  rules={[{ required: true, message: '' }]}>
                            <DatePicker name="CreatedTime" style={{ display: 'block' }} defaultValue={dayjs(formData.CreatedTime)}  onChange={(_, dateStrings) => {onDateChange("CreatedTime", dateStrings) }} />
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
