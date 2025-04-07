
import React from 'react';
import { Modal, Form, Input, InputNumber, Select, Button, Space,DatePicker } from 'antd';
import { PaymentApplicationItemProps } from "@/types/payment_application/payment_application";
import dayjs from 'dayjs';
interface DetailModalProps {
    open: boolean;
    modalFlag: 'add' | 'edit';
    saving: boolean;
    formData: Partial<PaymentApplicationItemProps>;
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
            title={modalFlag === 'add' ? "新增付款申请" : "编辑付款申请"}
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
                        <Form.Item label="付款通知号" name="PaymentNotificationNumber" rules={[{ required: true, message: '' }]}>
                            <Input onChange={onChange} />
                        </Form.Item>
                        <Form.Item label="结算对象" name="SettlementObject" >
                            <Input onChange={onChange} />
                        </Form.Item>
                        <Form.Item label="结算代理" name="SettlementAgent" >
                            <Input onChange={onChange} />
                        </Form.Item>
                        <Form.Item label="委托单位" name="EntrustingUnit" >
                            <Input onChange={onChange} />
                        </Form.Item>
                        <Form.Item label="更改时间"  >
                            <DatePicker name="ModificationTime" style={{ display: 'block' }} defaultValue={dayjs(formData.ModificationTime)}  onChange={(_, dateStrings) => {onDateChange("ModificationTime", dateStrings) }} />
                        </Form.Item>
                        <Form.Item label="更改人" name="Modifier" >
                            <Input onChange={onChange} />
                        </Form.Item>
                        <Form.Item label="开票抬头" name="InvoiceTitle" >
                            <Input onChange={onChange} />
                        </Form.Item>
                        <Form.Item label="业务编号" name="BusinessNumber" >
                            <Input onChange={onChange} />
                        </Form.Item>
                        <Form.Item label="申请日期"  >
                            <DatePicker name="ApplicationDate" style={{ display: 'block' }} defaultValue={dayjs(formData.ApplicationDate)}  onChange={(_, dateStrings) => {onDateChange("ApplicationDate", dateStrings) }} />
                        </Form.Item>
                        <Form.Item label="申请人" name="Applicant" >
                            <Input onChange={onChange} />
                        </Form.Item>
                        <Form.Item label="申请部门" name="ApplicantDepartment" >
                            <Input onChange={onChange} />
                        </Form.Item>
                        <Form.Item label="付款期限"  >
                            <DatePicker name="PaymentDeadline" style={{ display: 'block' }} defaultValue={dayjs(formData.PaymentDeadline)}  onChange={(_, dateStrings) => {onDateChange("PaymentDeadline", dateStrings) }} />
                        </Form.Item>
                        <Form.Item label="付款方式" name="PaymentMethod" >
                            <Input onChange={onChange} />
                        </Form.Item>
                        <Form.Item label="发票号码" name="InvoiceNumber" >
                            <Input onChange={onChange} />
                        </Form.Item>
                        <Form.Item label="币种" name="CurrencyCode" >
                            <Input onChange={onChange} />
                        </Form.Item>
                        <Form.Item label="金额" name="Amount" >
                            <InputNumber onChange={(value)=>onNumberChange("Amount", value as number)} />
                        </Form.Item>
                        <Form.Item label="核销金额分币种合计" name="ReconciliationAmountByCurrency" >
                            <InputNumber onChange={(value)=>onNumberChange("ReconciliationAmountByCurrency", value as number)} />
                        </Form.Item>
                        <Form.Item label="审批状态" name="ApprovalStatus" >
                            <Input onChange={onChange} />
                        </Form.Item>
                        <Form.Item label="核销状态" name="ReconciliationStatus" >
                            <Input onChange={onChange} />
                        </Form.Item>
                        <Form.Item label="备注" name="Remarks" >
                            <Input onChange={onChange} />
                        </Form.Item>
                        <Form.Item label="流程编号" name="ProcessNumber" >
                            <Input onChange={onChange} />
                        </Form.Item>
                        <Form.Item label="分币种合计" name="TotalByCurrency" >
                            <InputNumber onChange={(value)=>onNumberChange("TotalByCurrency", value as number)} />
                        </Form.Item>
                        <Form.Item label="凭证号" name="VoucherNumber" >
                            <Input onChange={onChange} />
                        </Form.Item>
                        <Form.Item label="凭证创建日期"  >
                            <DatePicker name="VoucherCreationDate" style={{ display: 'block' }} defaultValue={dayjs(formData.VoucherCreationDate)}  onChange={(_, dateStrings) => {onDateChange("VoucherCreationDate", dateStrings) }} />
                        </Form.Item>
                        <Form.Item label="承运人" name="Carrier" >
                            <Input onChange={onChange} />
                        </Form.Item>
                        <Form.Item label="收/发货地" name="ShippingLocation" >
                            <Input onChange={onChange} />
                        </Form.Item>
                        <Form.Item label="拖车实际提货时间"  >
                            <DatePicker name="ActualTrailerPickupTime" style={{ display: 'block' }} defaultValue={dayjs(formData.ActualTrailerPickupTime)}  onChange={(_, dateStrings) => {onDateChange("ActualTrailerPickupTime", dateStrings) }} />
                        </Form.Item>
                        <Form.Item label="单据日期"  >
                            <DatePicker name="DocumentDate" style={{ display: 'block' }} defaultValue={dayjs(formData.DocumentDate)}  onChange={(_, dateStrings) => {onDateChange("DocumentDate", dateStrings) }} />
                        </Form.Item>
                        <Form.Item label="财务应付单状态" name="FinancialPayableStatus" >
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
