
import React from 'react';
import { Modal, Form, Input, InputNumber, Select, Button, Space,DatePicker } from 'antd';
import { NotOffSettingItemProps } from "@/types/not_off_setting/not_off_setting";
import dayjs from 'dayjs';
interface DetailModalProps {
    open: boolean;
    modalFlag: 'add' | 'edit';
    saving: boolean;
    formData: Partial<NotOffSettingItemProps>;
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
            title={modalFlag === 'add' ? "新增未核销" : "编辑未核销"}
            onCancel={onCancel}
            width={600}
            destroyOnClose={true}
            maskClosable={false}
            closable={!saving}
            footer={null}
        >
            <Form {...formItemLayout} style={{ maxWidth: 600 }} initialValues={formData} disabled={saving} onFinish={onOk}>
                        <Form.Item label="业务编号" name="BusinessNumber" rules={[{ required: true, message: '' }]}>
                            <Input onChange={onChange} />
                        </Form.Item>
                        <Form.Item label="结算单位" name="SettlementUnit" >
                            <Input onChange={onChange} />
                        </Form.Item>
                        <Form.Item label="国内国外" name="DomesticOrForeign" >
                            <Input onChange={onChange} />
                        </Form.Item>
                        <Form.Item label="" name="MasterOrderNumber" >
                            <Input onChange={onChange} />
                        </Form.Item>
                        <Form.Item label="分单号" name="SubOrderNumber" >
                            <Input onChange={onChange} />
                        </Form.Item>
                        <Form.Item label="开票抬头" name="InvoiceTitle" >
                            <Input onChange={onChange} />
                        </Form.Item>
                        <Form.Item label="发票号码" name="InvoiceNumber" >
                            <Input onChange={onChange} />
                        </Form.Item>
                        <Form.Item label="账单号" name="BillNumber" >
                            <Input onChange={onChange} />
                        </Form.Item>
                        <Form.Item label="对账单号" name="ReconciliationNumber" >
                            <Input onChange={onChange} />
                        </Form.Item>
                        <Form.Item label="客户" name="Customer" >
                            <Input onChange={onChange} />
                        </Form.Item>
                        <Form.Item label="业务类型" name="BusinessType" >
                            <Input onChange={onChange} />
                        </Form.Item>
                        <Form.Item label="业务日期"  >
                            <DatePicker name="BusinessDate" style={{ display: 'block' }} defaultValue={dayjs(formData.BusinessDate)}  onChange={(_, dateStrings) => {onDateChange("BusinessDate", dateStrings) }} />
                        </Form.Item>
                        <Form.Item label="船名航次" name="VesselAndVoyage" >
                            <Input onChange={onChange} />
                        </Form.Item>
                        <Form.Item label="起运港" name="PortOfLoading" >
                            <Input onChange={onChange} />
                        </Form.Item>
                        <Form.Item label="单价" name="UnitPrice" >
                            <InputNumber onChange={(value)=>onNumberChange("UnitPrice", value as number)} />
                        </Form.Item>
                        <Form.Item label="目的港" name="PortOfDestination" >
                            <Input onChange={onChange} />
                        </Form.Item>
                        <Form.Item label="账单到期日"  >
                            <DatePicker name="BillDueDate" style={{ display: 'block' }} defaultValue={dayjs(formData.BillDueDate)}  onChange={(_, dateStrings) => {onDateChange("BillDueDate", dateStrings) }} />
                        </Form.Item>
                        <Form.Item label="销售" name="Sales" >
                            <Input onChange={onChange} />
                        </Form.Item>
                        <Form.Item label="已计提" name="ProvisionallyAccrued" >
                            <Input onChange={onChange} />
                        </Form.Item>
                        <Form.Item label="海外客服" name="OverseasCustomerService" >
                            <Input onChange={onChange} />
                        </Form.Item>
                        <Form.Item label="现场操作" name="OnSiteOperation" >
                            <Input onChange={onChange} />
                        </Form.Item>
                        <Form.Item label="操作" name="Operation" >
                            <Input onChange={onChange} />
                        </Form.Item>
                        <Form.Item label="财务日期"  >
                            <DatePicker name="FinanceDate" style={{ display: 'block' }} defaultValue={dayjs(formData.FinanceDate)}  onChange={(_, dateStrings) => {onDateChange("FinanceDate", dateStrings) }} />
                        </Form.Item>
                        <Form.Item label="支付类型" name="PaymentType" >
                            <Input onChange={onChange} />
                        </Form.Item>
                        <Form.Item label="费用状态" name="FeeStatus" >
                            <Input onChange={onChange} />
                        </Form.Item>
                        <Form.Item label="确认状态" name="ConfirmationStatus" >
                            <Input onChange={onChange} />
                        </Form.Item>
                        <Form.Item label="费用名称" name="FeeName" >
                            <Input onChange={onChange} />
                        </Form.Item>
                        <Form.Item label="币种" name="Currency" >
                            <Input onChange={onChange} />
                        </Form.Item>
                        <Form.Item label="自定义业务类型" name="CustomBusinessType" >
                            <Input onChange={onChange} />
                        </Form.Item>
                        <Form.Item label="数量" name="Quantity" >
                            <InputNumber onChange={(value)=>onNumberChange("Quantity", value as number)} />
                        </Form.Item>
                        <Form.Item label="含税价" name="TaxInclusivePrice" >
                            <InputNumber onChange={(value)=>onNumberChange("TaxInclusivePrice", value as number)} />
                        </Form.Item>
                        <Form.Item label="不含税价" name="TaxExclusivePrice" >
                            <InputNumber onChange={(value)=>onNumberChange("TaxExclusivePrice", value as number)} />
                        </Form.Item>
                        <Form.Item label="税率" name="TaxRate" >
                            <InputNumber onChange={(value)=>onNumberChange("TaxRate", value as number)} />
                        </Form.Item>
                        <Form.Item label="税额" name="TaxAmount" >
                            <InputNumber onChange={(value)=>onNumberChange("TaxAmount", value as number)} />
                        </Form.Item>
                        <Form.Item label="联系人" name="ContactPerson" >
                            <Input onChange={onChange} />
                        </Form.Item>
                        <Form.Item label="核销金额" name="WriteOffAmount" >
                            <InputNumber onChange={(value)=>onNumberChange("WriteOffAmount", value as number)} />
                        </Form.Item>
                        <Form.Item label="未销金额" name="UnwriteOffAmount" >
                            <InputNumber onChange={(value)=>onNumberChange("UnwriteOffAmount", value as number)} />
                        </Form.Item>
                        <Form.Item label="费用备注" name="FeeRemark" >
                            <Input onChange={onChange} />
                        </Form.Item>
                        <Form.Item label="自定义岗位1" name="CustomPosition1" >
                            <Input onChange={onChange} />
                        </Form.Item>
                        <Form.Item label="自定义岗位2" name="CustomPosition2" >
                            <Input onChange={onChange} />
                        </Form.Item>
                        <Form.Item label="ETD"  >
                            <DatePicker name="Etd" style={{ display: 'block' }} defaultValue={dayjs(formData.Etd)}  onChange={(_, dateStrings) => {onDateChange("Etd", dateStrings) }} />
                        </Form.Item>
                        <Form.Item label="ETA"  >
                            <DatePicker name="Eta" style={{ display: 'block' }} defaultValue={dayjs(formData.Eta)}  onChange={(_, dateStrings) => {onDateChange("Eta", dateStrings) }} />
                        </Form.Item>
                        <Form.Item label="承运人" name="Carrier" >
                            <Input onChange={onChange} />
                        </Form.Item>
                        <Form.Item label="收/发货地" name="PickupDeliveryLocation" >
                            <Input onChange={onChange} />
                        </Form.Item>
                        <Form.Item label="实际提货时间"  >
                            <DatePicker name="ActualPickupTime" style={{ display: 'block' }} defaultValue={dayjs(formData.ActualPickupTime)}  onChange={(_, dateStrings) => {onDateChange("ActualPickupTime", dateStrings) }} />
                        </Form.Item>
                        <Form.Item label="提单号" name="Sono" >
                            <Input onChange={onChange} />
                        </Form.Item>
                        <Form.Item label="业务状态" name="BusinessStatus" >
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
