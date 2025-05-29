
import React from 'react';
import { Modal, Form, Input, InputNumber, Select, Button, Space,DatePicker } from 'antd';
import { ActualPaymentItemProps } from "@/types/finance_manage/actual_payment";
import dayjs from 'dayjs';
interface DetailModalProps {
    open: boolean;
    modalFlag: 'add' | 'edit';
    saving: boolean;
    formData: Partial<ActualPaymentItemProps>;
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
            title={modalFlag === 'add' ? "新增实收实付" : "编辑实收实付"}
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
                        <Form.Item label="销账流水号" name="SalesAccountNumber" rules={[{ required: true, message: '' }]}>
                            <Input onChange={onChange} />
                        </Form.Item>
                        <Form.Item label="结算对象" name="SettlementObject" rules={[{ required: true, message: '' }]}>
                            <Input onChange={onChange} />
                        </Form.Item>
                        <Form.Item label="业务编号" name="BusinessNumber" rules={[{ required: true, message: '' }]}>
                            <Input onChange={onChange} />
                        </Form.Item>
                        <Form.Item label="结算代理" name="SettlementAgent" rules={[{ required: true, message: '' }]}>
                            <Input onChange={onChange} />
                        </Form.Item>
                        <Form.Item label="对方单位" name="Counterparty" rules={[{ required: true, message: '' }]}>
                            <Input onChange={onChange} />
                        </Form.Item>
                        <Form.Item label="我方银行" name="OurBank" rules={[{ required: true, message: '' }]}>
                            <Input onChange={onChange} />
                        </Form.Item>
                        <Form.Item label="付款通知号" name="PaymentNotificationNumber" rules={[{ required: true, message: '' }]}>
                            <Input onChange={onChange} />
                        </Form.Item>
                        <Form.Item label="凭证号" name="VoucherNumber" rules={[{ required: true, message: '' }]}>
                            <Input onChange={onChange} />
                        </Form.Item>
                        <Form.Item label="银行水单号" name="BankStatementNumber" rules={[{ required: true, message: '' }]}>
                            <Input onChange={onChange} />
                        </Form.Item>
                        <Form.Item label="销账人" name="SalesAccountPerson" rules={[{ required: true, message: '' }]}>
                            <Input onChange={onChange} />
                        </Form.Item>
                        <Form.Item label="销账日期"  rules={[{ required: true, message: '' }]}>
                            <DatePicker name="SalesAccountDate" style={{ display: 'block' }} defaultValue={dayjs(formData.SalesAccountDate)}  onChange={(_, dateStrings) => {onDateChange("SalesAccountDate", dateStrings) }} />
                        </Form.Item>
                        <Form.Item label="收付日期"  rules={[{ required: true, message: '' }]}>
                            <DatePicker name="ReceiptPaymentDate" style={{ display: 'block' }} defaultValue={dayjs(formData.ReceiptPaymentDate)}  onChange={(_, dateStrings) => {onDateChange("ReceiptPaymentDate", dateStrings) }} />
                        </Form.Item>
                        <Form.Item label="支付类型" name="PaymentType" rules={[{ required: true, message: '' }]}>
                            <Input onChange={onChange} />
                        </Form.Item>
                        <Form.Item label="水单状态" name="StatementStatus" rules={[{ required: true, message: '' }]}>
                            <Input onChange={onChange} />
                        </Form.Item>
                        <Form.Item label="收付方式" name="ReceiptPaymentMethod" rules={[{ required: true, message: '' }]}>
                            <Input onChange={onChange} />
                        </Form.Item>
                        <Form.Item label="是否预付" name="IsAdvancePayment" rules={[{ required: true, message: '' }]}>
                            <Select onChange={onChange} />
                        </Form.Item>
                        <Form.Item label="币种" name="Currency" rules={[{ required: true, message: '' }]}>
                            <Input onChange={onChange} />
                        </Form.Item>
                        <Form.Item label="金额" name="Amount" rules={[{ required: true, message: '' }]}>
                            <InputNumber onChange={(value)=>onNumberChange("Amount", value as number)} />
                        </Form.Item>
                        <Form.Item label="已销金额" name="SoldAmount" rules={[{ required: true, message: '' }]}>
                            <InputNumber onChange={(value)=>onNumberChange("SoldAmount", value as number)} />
                        </Form.Item>
                        <Form.Item label="余额" name="Balance" rules={[{ required: true, message: '' }]}>
                            <InputNumber onChange={(value)=>onNumberChange("Balance", value as number)} />
                        </Form.Item>
                        <Form.Item label="实收金额" name="ActualReceivedAmount" rules={[{ required: true, message: '' }]}>
                            <InputNumber onChange={(value)=>onNumberChange("ActualReceivedAmount", value as number)} />
                        </Form.Item>
                        <Form.Item label="实付金额" name="ActualPaidAmount" rules={[{ required: true, message: '' }]}>
                            <InputNumber onChange={(value)=>onNumberChange("ActualPaidAmount", value as number)} />
                        </Form.Item>
                        <Form.Item label="财务费用" name="FinancialExpenses" rules={[{ required: true, message: '' }]}>
                            <InputNumber onChange={(value)=>onNumberChange("FinancialExpenses", value as number)} />
                        </Form.Item>
                        <Form.Item label="汇兑损益" name="ExchangeGainLoss" rules={[{ required: true, message: '' }]}>
                            <InputNumber onChange={(value)=>onNumberChange("ExchangeGainLoss", value as number)} />
                        </Form.Item>
                        <Form.Item label="零头短账" name="MinorShortAccount" rules={[{ required: true, message: '' }]}>
                            <InputNumber onChange={(value)=>onNumberChange("MinorShortAccount", value as number)} />
                        </Form.Item>
                        <Form.Item label="原币汇差" name="OriginalCurrencyExchangeDifference" rules={[{ required: true, message: '' }]}>
                            <InputNumber onChange={(value)=>onNumberChange("OriginalCurrencyExchangeDifference", value as number)} />
                        </Form.Item>
                        <Form.Item label="创建人" name="Creator" rules={[{ required: true, message: '' }]}>
                            <Input onChange={onChange} />
                        </Form.Item>
                        <Form.Item label="复核" name="Review" rules={[{ required: true, message: '' }]}>
                            <Select onChange={onChange} />
                        </Form.Item>
                        <Form.Item label="复核日期"  >
                            <DatePicker name="ReviewDate" style={{ display: 'block' }} defaultValue={dayjs(formData.ReviewDate)}  onChange={(_, dateStrings) => {onDateChange("ReviewDate", dateStrings) }} />
                        </Form.Item>
                        <Form.Item label="作废" name="Voided" rules={[{ required: true, message: '' }]}>
                            <Select onChange={onChange} />
                        </Form.Item>
                        <Form.Item label="开票信息" name="InvoiceInformation" >
                            <Input onChange={onChange} />
                        </Form.Item>
                        <Form.Item label="备注" name="Remarks" >
                            <Input onChange={onChange} />
                        </Form.Item>
                        <Form.Item label="账期（天）" name="AccountPeriodDays" rules={[{ required: true, message: '' }]}>
                            <Select onChange={onChange} />
                        </Form.Item>
                        <Form.Item label="凭证日期"  rules={[{ required: true, message: '' }]}>
                            <DatePicker name="VoucherDate" style={{ display: 'block' }} defaultValue={dayjs(formData.VoucherDate)}  onChange={(_, dateStrings) => {onDateChange("VoucherDate", dateStrings) }} />
                        </Form.Item>
                        <Form.Item label="复核人" name="Reviewer" >
                            <Input onChange={onChange} />
                        </Form.Item>
                        <Form.Item label="账单结算类型" name="BillSettlementType" >
                            <Input onChange={onChange} />
                        </Form.Item>
                        <Form.Item label="预收付备注" name="AdvancePaymentRemarks" >
                            <Input onChange={onChange} />
                        </Form.Item>
                        <Form.Item label="收付款凭证号" name="ReceiptPaymentVoucherNumber" >
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

