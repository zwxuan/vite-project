
import React from 'react';
import { Modal, Form, Input, InputNumber, Select, Button, Space,DatePicker } from 'antd';
import { InvoiceRequirementItemProps } from "@/types/dynamic_configuration_platform/basic_manage/invoice_requirement";
import dayjs from 'dayjs';
interface DetailModalProps {
    open: boolean;
    modalFlag: 'add' | 'edit';
    saving: boolean;
    formData: Partial<InvoiceRequirementItemProps>;
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
            title={modalFlag === 'add' ? "新增开票要求" : "编辑开票要求"}
            onCancel={onCancel}
            destroyOnClose={true}
            maskClosable={false}
            closable={!saving}
            footer={null}
            centered={true}
        >
            <Form {...formItemLayout} style={{ maxWidth: 600 }} initialValues={formData} disabled={saving} onFinish={onOk}>
                        <Form.Item label="开票抬头" name="CustomerNo" rules={[{ required: true, message: '' }]}>
                            <Input onChange={onChange} />
                        </Form.Item>
                        <Form.Item label="纳税人识别号" name="TaxpayerId" >
                            <Input onChange={onChange} />
                        </Form.Item>
                        <Form.Item label="发票地址" name="InvoiceAddress" >
                            <Input onChange={onChange} />
                        </Form.Item>
                        <Form.Item label="电话" name="Phone" >
                            <Input onChange={onChange} />
                        </Form.Item>
                        <Form.Item label="是否默认" name="IsDefault" >
                            <Select onChange={onChange} />
                        </Form.Item>
                        <Form.Item label="开户行及账号" name="BankAccount" >
                            <Input onChange={onChange} />
                        </Form.Item>
                        <Form.Item label="开票抬头银行" name="BillingHeadBank" >
                            <Input onChange={onChange} />
                        </Form.Item>
                        <Form.Item label="客户邮箱" name="CustomerEmail" >
                            <Input onChange={onChange} />
                        </Form.Item>
                        <Form.Item label="系统自动推送" name="SystemAutoPush" >
                            <Select onChange={onChange} />
                        </Form.Item>
                        <Form.Item label="系统自动发送对象" name="SystemAutoSendTarget" >
                            <Input onChange={onChange} />
                        </Form.Item>
                        <Form.Item label="税控平台发送" name="TaxControlPlatformSend" >
                            <Select onChange={onChange} />
                        </Form.Item>
                        <Form.Item label="税控平台发送对象" name="TaxControlPlatformSendTarget" >
                            <Input onChange={onChange} />
                        </Form.Item>
                        <Form.Item label="操作" name="Operation" >
                            <Input onChange={onChange} />
                        </Form.Item>
                        <Form.Item label="发票类型" name="InvoiceType" >
                            <Input onChange={onChange} />
                        </Form.Item>
                        <Form.Item label="发票种类" name="InvoiceKind" >
                            <Input onChange={onChange} />
                        </Form.Item>
                        <Form.Item label="国内国外" name="DomesticOrAbroad" >
                            <Select onChange={onChange} />
                        </Form.Item>
                        <Form.Item label="适用 WHT 税" name="ApplicableWhtTax" >
                            <Select onChange={onChange} />
                        </Form.Item>
                        <Form.Item label="开票要求" name="BillingRequirements" >
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
