
import React from 'react';
import { Modal, Form, Input, InputNumber, Select, Button, Space,DatePicker } from 'antd';
import { BaseSettlementMethodMapperItemProps } from "@/types/dynamic_configuration_platform/basic_manage/base_settlement_method_mapper";
import dayjs from 'dayjs';
interface DetailModalProps {
    open: boolean;
    modalFlag: 'add' | 'edit';
    saving: boolean;
    formData: Partial<BaseSettlementMethodMapperItemProps>;
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
            title={modalFlag === 'add' ? "新增结算方式对照" : "编辑结算方式对照"}
            onCancel={onCancel}
            destroyOnClose={true}
            maskClosable={false}
            closable={!saving}
            footer={null}
        >
            <Form {...formItemLayout} style={{ maxWidth: 600 }} initialValues={formData} disabled={saving} onFinish={onOk}>
                        <Form.Item label="所属组织名称" name="OrgName" rules={[{ required: true, message: '' }]}>
                            <Input onChange={onChange} />
                        </Form.Item>
                        <Form.Item label="结算方式" name="SettlementMode" rules={[{ required: true, message: '' }]}>
                            <Input onChange={onChange} />
                        </Form.Item>
                        <Form.Item label="币种" name="CurrencyCode" rules={[{ required: true, message: '' }]}>
                            <Input onChange={onChange} />
                        </Form.Item>
                        <Form.Item label="银行类别" name="BankType" >
                            <Input onChange={onChange} />
                        </Form.Item>
                        <Form.Item label="银行网点" name="BankBranch" >
                            <Input onChange={onChange} />
                        </Form.Item>
                        <Form.Item label="银行账号" name="BankAccount" >
                            <Input onChange={onChange} />
                        </Form.Item>
                        <Form.Item label="现金账号" name="CashAccount" >
                            <Input onChange={onChange} />
                        </Form.Item>
                        <Form.Item label="是否默认" name="IsDefault" rules={[{ required: true, message: '' }]}>
                            <Input onChange={onChange} />
                        </Form.Item>
                        <Form.Item label="备注" name="Remark" >
                            <Input onChange={onChange} />
                        </Form.Item>
                        <Form.Item label="创建人" name="CreatedBy" rules={[{ required: true, message: '' }]}>
                            <Input onChange={onChange} />
                        </Form.Item>
                        <Form.Item label="创建时间"  rules={[{ required: true, message: '' }]}>
                            <DatePicker name="CreatedTime" style={{ display: 'block' }} defaultValue={dayjs(formData.CreatedTime)}  onChange={(_, dateStrings) => {onDateChange("CreatedTime", dateStrings) }} />
                        </Form.Item>
                        <Form.Item label="修改人" name="UpdatedBy" >
                            <Input onChange={onChange} />
                        </Form.Item>
                        <Form.Item label="修改时间"  >
                            <DatePicker name="UpdatedTime" style={{ display: 'block' }} defaultValue={dayjs(formData.UpdatedTime)}  onChange={(_, dateStrings) => {onDateChange("UpdatedTime", dateStrings) }} />
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
