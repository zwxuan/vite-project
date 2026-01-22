
import React from 'react';
import { Modal, Form, Input, InputNumber, Select, Button, Space,DatePicker } from 'antd';
import { ExpenseReviewItemProps } from "@/types/settlement_center/finance_manage/expense_review";
import dayjs from 'dayjs';
interface DetailModalProps {
    open: boolean;
    modalFlag: 'add' | 'edit';
    saving: boolean;
    formData: Partial<ExpenseReviewItemProps>;
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
            title={modalFlag === 'add' ? "新增费用审核" : "编辑费用审核"}
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
                        <Form.Item label="业务编号" name="BusinessNumber" >
                            <Input onChange={onChange} />
                        </Form.Item>
                        <Form.Item label="整拼类型" name="ContainerType" >
                            <Input onChange={onChange} />
                        </Form.Item>
                        <Form.Item label="业务类型" name="BusinessType" >
                            <Input onChange={onChange} />
                        </Form.Item>
                        <Form.Item label="主单号" name="MasterNumber" >
                            <Input onChange={onChange} />
                        </Form.Item>
                        <Form.Item label="分单号" name="SplitNumber" >
                            <Input onChange={onChange} />
                        </Form.Item>
                        <Form.Item label="客户" name="CustomerName" >
                            <Input onChange={onChange} />
                        </Form.Item>
                        <Form.Item label="货物类型" name="CargoType" >
                            <Input onChange={onChange} />
                        </Form.Item>
                        <Form.Item label="客户级别" name="CustomerLevel" >
                            <Input onChange={onChange} />
                        </Form.Item>
                        <Form.Item label="合约状态" name="ContractStatus" >
                            <Input onChange={onChange} />
                        </Form.Item>
                        <Form.Item label="承运人" name="CarrierName" >
                            <Input onChange={onChange} />
                        </Form.Item>
                        <Form.Item label="船名" name="VesselName" >
                            <Input onChange={onChange} />
                        </Form.Item>
                        <Form.Item label="航次/航班" name="VoyageFlight" >
                            <Input onChange={onChange} />
                        </Form.Item>
                        <Form.Item label="装货港/起运港" name="LoadingPort" >
                            <Input onChange={onChange} />
                        </Form.Item>
                        <Form.Item label="目的港" name="DestinationPort" >
                            <Input onChange={onChange} />
                        </Form.Item>
                        <Form.Item label="交货地" name="DeliveryPlace" >
                            <Input onChange={onChange} />
                        </Form.Item>
                        <Form.Item label="卸货港" name="DischargingPort" >
                            <Input onChange={onChange} />
                        </Form.Item>
                        <Form.Item label="ETD"  >
                            <DatePicker name="Etd" style={{ display: 'block' }} defaultValue={dayjs(formData.Etd)}  onChange={(_, dateStrings) => {onDateChange("Etd", dateStrings || '') }} />
                        </Form.Item>
                        <Form.Item label="ETA"  >
                            <DatePicker name="Eta" style={{ display: 'block' }} defaultValue={dayjs(formData.Eta)}  onChange={(_, dateStrings) => {onDateChange("Eta", dateStrings || '') }} />
                        </Form.Item>
                        <Form.Item label="业务日期"  >
                            <DatePicker name="BusinessDate" style={{ display: 'block' }} defaultValue={dayjs(formData.BusinessDate)}  onChange={(_, dateStrings) => {onDateChange("BusinessDate", dateStrings || '') }} />
                        </Form.Item>
                        <Form.Item label="订舱代理" name="BookingAgent" >
                            <Input onChange={onChange} />
                        </Form.Item>
                        <Form.Item label="创建日期"  >
                            <DatePicker name="CreationDate" style={{ display: 'block' }} defaultValue={dayjs(formData.CreationDate)}  onChange={(_, dateStrings) => {onDateChange("CreationDate", dateStrings || '') }} />
                        </Form.Item>
                        <Form.Item label="凭证字" name="VoucherWord" >
                            <Input onChange={onChange} />
                        </Form.Item>
                        <Form.Item label="凭证号" name="VoucherNumber" >
                            <Input onChange={onChange} />
                        </Form.Item>
                        <Form.Item label="业务参考号" name="BusinessRefNumber" >
                            <Input onChange={onChange} />
                        </Form.Item>
                        <Form.Item label="项目编号" name="ProjectNumber" >
                            <Input onChange={onChange} />
                        </Form.Item>
                        <Form.Item label="操作" name="OperationStaff" >
                            <Input onChange={onChange} />
                        </Form.Item>
                        <Form.Item label="销售" name="SalesStaff" >
                            <Input onChange={onChange} />
                        </Form.Item>
                        <Form.Item label="客服" name="CustomerServiceStaff" >
                            <Input onChange={onChange} />
                        </Form.Item>
                        <Form.Item label="单证" name="DocumentStaff" >
                            <Input onChange={onChange} />
                        </Form.Item>
                        <Form.Item label="揽货类型" name="SolicitationType" >
                            <Input onChange={onChange} />
                        </Form.Item>
                        <Form.Item label="状态" name="Status" >
                            <Input onChange={onChange} />
                        </Form.Item>
                        <Form.Item label="实际计费重量" name="ActualChargeableWeight" >
                            <InputNumber onChange={(value)=>onNumberChange("ActualChargeableWeight", value as number)} />
                        </Form.Item>
                        <Form.Item label="利润" name="Profit" >
                            <InputNumber onChange={(value)=>onNumberChange("Profit", value as number)} />
                        </Form.Item>
                        <Form.Item label="总收入" name="TotalRevenue" >
                            <InputNumber onChange={(value)=>onNumberChange("TotalRevenue", value as number)} />
                        </Form.Item>
                        <Form.Item label="总成本" name="TotalCost" >
                            <InputNumber onChange={(value)=>onNumberChange("TotalCost", value as number)} />
                        </Form.Item>
                        <Form.Item label="应付核销状态" name="PayableReconciliationStatus" >
                            <Input onChange={onChange} />
                        </Form.Item>
                        <Form.Item label="应收核销状态" name="ReceivableReconciliationStatus" >
                            <Input onChange={onChange} />
                        </Form.Item>
                        <Form.Item label="业务创建人" name="BusinessCreator" >
                            <Input onChange={onChange} />
                        </Form.Item>
                        <Form.Item label="箱量描述" name="ContainerDescription" >
                            <Input onChange={onChange} />
                        </Form.Item>
                        <Form.Item label="指定货代理" name="AppointedAgent" >
                            <Input onChange={onChange} />
                        </Form.Item>
                        <Form.Item label="主单运费条款" name="MasterFreightTerms" >
                            <Input onChange={onChange} />
                        </Form.Item>
                        <Form.Item label="分单运费条款" name="SplitFreightTerms" >
                            <Input onChange={onChange} />
                        </Form.Item>
                        <Form.Item label="贸易条款" name="TradeTerms" >
                            <Input onChange={onChange} />
                        </Form.Item>
                        <Form.Item label="操作模式" name="OperationMode" >
                            <Input onChange={onChange} />
                        </Form.Item>
                        <Form.Item label="自定义字段1" name="CustomField1" >
                            <Input onChange={onChange} />
                        </Form.Item>
                        <Form.Item label="自定义字段2" name="CustomField2" >
                            <Input onChange={onChange} />
                        </Form.Item>
                        <Form.Item label="自定义字段3" name="CustomField3" >
                            <Input onChange={onChange} />
                        </Form.Item>
                        <Form.Item label="利润审核状态" name="ProfitReviewStatus" >
                            <Input onChange={onChange} />
                        </Form.Item>
                        <Form.Item label="航线" name="RouteName" >
                            <Input onChange={onChange} />
                        </Form.Item>
                        <Form.Item label="航线负责人" name="RouteManager" >
                            <Input onChange={onChange} />
                        </Form.Item>
                        <Form.Item label="目的港代理" name="DestinationAgent" >
                            <Input onChange={onChange} />
                        </Form.Item>
                        <Form.Item label="自定义岗位1" name="CustomPosition1" >
                            <Input onChange={onChange} />
                        </Form.Item>
                        <Form.Item label="自定义岗位2" name="CustomPosition2" >
                            <Input onChange={onChange} />
                        </Form.Item>
                        <Form.Item label="收/发货地" name="PickupDeliveryLocation" >
                            <Input onChange={onChange} />
                        </Form.Item>
                        <Form.Item label="拖车实际提货时间"  >
                            <DatePicker name="TruckPickupTime" style={{ display: 'block' }} defaultValue={dayjs(formData.TruckPickupTime)}  onChange={(_, dateStrings) => {onDateChange("TruckPickupTime", dateStrings || '') }} />
                        </Form.Item>
                        <Form.Item label="订舱编号" name="BookingNumber" >
                            <Input onChange={onChange} />
                        </Form.Item>
                        <Form.Item label="SOP状态" name="SopStatus" >
                            <Input onChange={onChange} />
                        </Form.Item>
                        <Form.Item label="取消审核原因" name="CancellationReviewReason" >
                            <Input onChange={onChange} />
                        </Form.Item>
                        <Form.Item label="应收费用锁定时间"  >
                            <DatePicker name="ChargeLockTime" style={{ display: 'block' }} defaultValue={dayjs(formData.ChargeLockTime)}  onChange={(_, dateStrings) => {onDateChange("ChargeLockTime", dateStrings || '') }} />
                        </Form.Item>
                        <Form.Item label="应付费用锁定时间"  >
                            <DatePicker name="PayableLockTime" style={{ display: 'block' }} defaultValue={dayjs(formData.PayableLockTime)}  onChange={(_, dateStrings) => {onDateChange("PayableLockTime", dateStrings || '') }} />
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

