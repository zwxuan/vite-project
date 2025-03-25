
import React from 'react';
import { Modal, Form, Input, InputNumber, Select, Button, Space,DatePicker } from 'antd';
import { OrderFeeItemProps } from "@/types/order_fee/order_fee";
import dayjs from 'dayjs';
interface DetailModalProps {
    open: boolean;
    modalFlag: 'add' | 'edit';
    saving: boolean;
    formData: Partial<OrderFeeItemProps>;
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
            title={modalFlag === 'add' ? "新增order_fee" : "编辑order_fee"}
            onCancel={onCancel}
            width={600}
            destroyOnClose={true}
            maskClosable={false}
            closable={!saving}
            footer={null}
        >
            <Form {...formItemLayout} style={{ maxWidth: 600 }} initialValues={formData} disabled={saving} onFinish={onOk}>
                        <Form.Item label="结算公司" name="SettlementCompany" rules={[{ required: true, message: '' }]}>
                            <Input onChange={onChange} />
                        </Form.Item>
                        <Form.Item label="费用名称" name="FeeName" rules={[{ required: true, message: '' }]}>
                            <Input onChange={onChange} />
                        </Form.Item>
                        <Form.Item label="结算类型" name="SettlementType" rules={[{ required: true, message: '' }]}>
                            <Input onChange={onChange} />
                        </Form.Item>
                        <Form.Item label="结算对象" name="SettlementObject" rules={[{ required: true, message: '' }]}>
                            <Input onChange={onChange} />
                        </Form.Item>
                        <Form.Item label="开票抬头" name="InvoiceTitle" rules={[{ required: true, message: '' }]}>
                            <Input onChange={onChange} />
                        </Form.Item>
                        <Form.Item label="国内国外" name="DomesticForeign" rules={[{ required: true, message: '' }]}>
                            <Input onChange={onChange} />
                        </Form.Item>
                        <Form.Item label="是否需要开票" name="NeedInvoice" rules={[{ required: true, message: '' }]}>
                            <Select onChange={onChange} />
                        </Form.Item>
                        <Form.Item label="币种" name="Currency" rules={[{ required: true, message: '' }]}>
                            <Input onChange={onChange} />
                        </Form.Item>
                        <Form.Item label="汇率" name="ExchangeRate" rules={[{ required: true, message: '' }]}>
                            <InputNumber onChange={(value)=>onNumberChange("ExchangeRate", value as number)} />
                        </Form.Item>
                        <Form.Item label="单位" name="Unit" rules={[{ required: true, message: '' }]}>
                            <Input onChange={onChange} />
                        </Form.Item>
                        <Form.Item label="数量" name="Quantity" rules={[{ required: true, message: '' }]}>
                            <InputNumber onChange={(value)=>onNumberChange("Quantity", value as number)} />
                        </Form.Item>
                        <Form.Item label="单价" name="UnitPrice" rules={[{ required: true, message: '' }]}>
                            <InputNumber onChange={(value)=>onNumberChange("UnitPrice", value as number)} />
                        </Form.Item>
                        <Form.Item label="含税价" name="TaxIncludedPrice" rules={[{ required: true, message: '' }]}>
                            <InputNumber onChange={(value)=>onNumberChange("TaxIncludedPrice", value as number)} />
                        </Form.Item>
                        <Form.Item label="不含税价" name="TaxExcludedPrice" rules={[{ required: true, message: '' }]}>
                            <InputNumber onChange={(value)=>onNumberChange("TaxExcludedPrice", value as number)} />
                        </Form.Item>
                        <Form.Item label="税率" name="TaxRate" rules={[{ required: true, message: '' }]}>
                            <InputNumber onChange={(value)=>onNumberChange("TaxRate", value as number)} />
                        </Form.Item>
                        <Form.Item label="税额" name="TaxAmount" rules={[{ required: true, message: '' }]}>
                            <InputNumber onChange={(value)=>onNumberChange("TaxAmount", value as number)} />
                        </Form.Item>
                        <Form.Item label="折合RMB" name="RmbEquivalent" rules={[{ required: true, message: '' }]}>
                            <InputNumber onChange={(value)=>onNumberChange("RmbEquivalent", value as number)} />
                        </Form.Item>
                        <Form.Item label="本位币币种" name="LocalCurrency" rules={[{ required: true, message: '' }]}>
                            <Input onChange={onChange} />
                        </Form.Item>
                        <Form.Item label="审核人" name="Reviewer" rules={[{ required: true, message: '' }]}>
                            <Input onChange={onChange} />
                        </Form.Item>
                        <Form.Item label="备注" name="Remarks" >
                            <Input onChange={onChange} />
                        </Form.Item>
                        <Form.Item label="联系人" name="ContactPerson" rules={[{ required: true, message: '' }]}>
                            <Input onChange={onChange} />
                        </Form.Item>
                        <Form.Item label="关联提单号" name="AssociatedBillNumber" rules={[{ required: true, message: '' }]}>
                            <Input onChange={onChange} />
                        </Form.Item>
                        <Form.Item label="关联箱号" name="AssociatedContainerNumber" rules={[{ required: true, message: '' }]}>
                            <Input onChange={onChange} />
                        </Form.Item>
                        <Form.Item label="预付到付" name="PrepaidCollect" rules={[{ required: true, message: '' }]}>
                            <Input onChange={onChange} />
                        </Form.Item>
                        <Form.Item label="状态" name="Status" rules={[{ required: true, message: '' }]}>
                            <Input onChange={onChange} />
                        </Form.Item>
                        <Form.Item label="是否确认" name="IsConfirmed" rules={[{ required: true, message: '' }]}>
                            <Select onChange={onChange} />
                        </Form.Item>
                        <Form.Item label="代理分成账单号" name="AgentSplitBillNumber" >
                            <Input onChange={onChange} />
                        </Form.Item>
                        <Form.Item label="账单号" name="BillNumber" rules={[{ required: true, message: '' }]}>
                            <Input onChange={onChange} />
                        </Form.Item>
                        <Form.Item label="计提日期"  rules={[{ required: true, message: '' }]}>
                            <DatePicker name="AccrualDate" style={{ display: 'block' }} defaultValue={dayjs(formData.AccrualDate)}  onChange={(_, dateStrings) => {onDateChange("AccrualDate", dateStrings) }} />
                        </Form.Item>
                        <Form.Item label="发票号" name="InvoiceNumber" >
                            <Input onChange={onChange} />
                        </Form.Item>
                        <Form.Item label="开票日期"  >
                            <DatePicker name="InvoiceDate" style={{ display: 'block' }} defaultValue={dayjs(formData.InvoiceDate)}  onChange={(_, dateStrings) => {onDateChange("InvoiceDate", dateStrings) }} />
                        </Form.Item>
                        <Form.Item label="对方账单号" name="CounterpartBillNumber" >
                            <Input onChange={onChange} />
                        </Form.Item>
                        <Form.Item label="付款申请号" name="PaymentApplicationNumber" >
                            <Input onChange={onChange} />
                        </Form.Item>
                        <Form.Item label="核销金额" name="WriteOffAmount" >
                            <InputNumber onChange={(value)=>onNumberChange("WriteOffAmount", value as number)} />
                        </Form.Item>
                        <Form.Item label="未销金额" name="UnadjustedAmount" >
                            <InputNumber onChange={(value)=>onNumberChange("UnadjustedAmount", value as number)} />
                        </Form.Item>
                        <Form.Item label="核销日期"  >
                            <DatePicker name="WriteOffDate" style={{ display: 'block' }} defaultValue={dayjs(formData.WriteOffDate)}  onChange={(_, dateStrings) => {onDateChange("WriteOffDate", dateStrings) }} />
                        </Form.Item>
                        <Form.Item label="收付日期"  >
                            <DatePicker name="PaymentDate" style={{ display: 'block' }} defaultValue={dayjs(formData.PaymentDate)}  onChange={(_, dateStrings) => {onDateChange("PaymentDate", dateStrings) }} />
                        </Form.Item>
                        <Form.Item label="财务日期"  >
                            <DatePicker name="FinancialDate" style={{ display: 'block' }} defaultValue={dayjs(formData.FinancialDate)}  onChange={(_, dateStrings) => {onDateChange("FinancialDate", dateStrings) }} />
                        </Form.Item>
                        <Form.Item label="业务编号" name="BusinessNumber" rules={[{ required: true, message: '' }]}>
                            <Input onChange={onChange} />
                        </Form.Item>
                        <Form.Item label="创建人" name="Creator" rules={[{ required: true, message: '' }]}>
                            <Input onChange={onChange} />
                        </Form.Item>
                        <Form.Item label="创建时间"  rules={[{ required: true, message: '' }]}>
                            <DatePicker name="CreateTime" style={{ display: 'block' }} defaultValue={dayjs(formData.CreateTime)}  onChange={(_, dateStrings) => {onDateChange("CreateTime", dateStrings) }} />
                        </Form.Item>
                        <Form.Item label="更改人" name="Modifier" >
                            <Input onChange={onChange} />
                        </Form.Item>
                        <Form.Item label="更改时间"  >
                            <DatePicker name="ModifyTime" style={{ display: 'block' }} defaultValue={dayjs(formData.ModifyTime)}  onChange={(_, dateStrings) => {onDateChange("ModifyTime", dateStrings) }} />
                        </Form.Item>
                        <Form.Item label="销账流水号" name="WriteOffSerialNumber" >
                            <Input onChange={onChange} />
                        </Form.Item>
                        <Form.Item label="是否已生成凭证" name="IsVoucherGenerated" rules={[{ required: true, message: '' }]}>
                            <Select onChange={onChange} />
                        </Form.Item>
                        <Form.Item label="分摊" name="Allocation" >
                            <Input onChange={onChange} />
                        </Form.Item>
                        <Form.Item label="锁定状态" name="LockStatus" rules={[{ required: true, message: '' }]}>
                            <Input onChange={onChange} />
                        </Form.Item>
                        <Form.Item label="锁定时间"  >
                            <DatePicker name="LockTime" style={{ display: 'block' }} defaultValue={dayjs(formData.LockTime)}  onChange={(_, dateStrings) => {onDateChange("LockTime", dateStrings) }} />
                        </Form.Item>
                        <Form.Item label="数据来源" name="DataSource" rules={[{ required: true, message: '' }]}>
                            <Input onChange={onChange} />
                        </Form.Item>
                        <Form.Item label="是否调整费用" name="IsAdjustedFee" rules={[{ required: true, message: '' }]}>
                            <Select onChange={onChange} />
                        </Form.Item>
                        <Form.Item label="费用变更人" name="FeeModifier" >
                            <Input onChange={onChange} />
                        </Form.Item>
                        <Form.Item label="结算代理" name="SettlementAgent" rules={[{ required: true, message: '' }]}>
                            <Input onChange={onChange} />
                        </Form.Item>
                        <Form.Item label="费用同步状态" name="FeeSyncStatus" rules={[{ required: true, message: '' }]}>
                            <Input onChange={onChange} />
                        </Form.Item>
                        <Form.Item label="更改费用申请进度" name="ModifyFeeApplicationProgress" >
                            <Input onChange={onChange} />
                        </Form.Item>
                        <Form.Item label="分摊关联业务" name="AllocationRelatedBusiness" >
                            <Input onChange={onChange} />
                        </Form.Item>
                        <Form.Item label="分摊类型" name="AllocationType" >
                            <Input onChange={onChange} />
                        </Form.Item>
                        <Form.Item label="关联费用ID" name="RelatedFeeId" >
                            <Input onChange={onChange} />
                        </Form.Item>
                        <Form.Item label="费用ID" name="FeeId" rules={[{ required: true, message: '' }]}>
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
