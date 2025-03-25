
import React from 'react';
import { Modal, Form, Input, InputNumber, Select, Button, Space,DatePicker } from 'antd';
import { OrdersItemProps } from "@/types/orders/orders";
import dayjs from 'dayjs';
interface DetailModalProps {
    open: boolean;
    modalFlag: 'add' | 'edit';
    saving: boolean;
    formData: Partial<OrdersItemProps>;
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
            title={modalFlag === 'add' ? '新增订单': '编辑订单'}
            onCancel={onCancel}
            width={600}
            destroyOnClose={true}
            maskClosable={false}
            closable={!saving}
            footer={null}
        >
            <Form {...formItemLayout} style={{ maxWidth: 600 }} initialValues={formData} disabled={saving} onFinish={onOk}>
                        <Form.Item label="业务编号" name="BusinessId" rules={[{ required: true, message: '' }]}>
                            <Input onChange={onChange} />
                        </Form.Item>
                        <Form.Item label="主单号" name="MainOrderNumber" >
                            <Input onChange={onChange} />
                        </Form.Item>
                        <Form.Item label="承运人名称" name="Carrier" >
                            <Input onChange={onChange} />
                        </Form.Item>
                        <Form.Item label="船名" name="ShipName" >
                            <Input onChange={onChange} />
                        </Form.Item>
                        <Form.Item label="航次" name="Voyage" >
                            <Input onChange={onChange} />
                        </Form.Item>
                        <Form.Item label="客户名称" name="Customer" >
                            <Input onChange={onChange} />
                        </Form.Item>
                        <Form.Item label="业务日期"  >
                            <DatePicker name="BusinessDate" style={{ display: 'block' }} defaultValue={dayjs(formData.BusinessDate)}  onChange={(_, dateStrings) => {onDateChange("BusinessDate", dateStrings) }} />
                        </Form.Item>
                        <Form.Item label="合约状态" name="ContractStatus" >
                            <Input onChange={onChange} />
                        </Form.Item>
                        <Form.Item label="起运港" name="DeparturePort" >
                            <Input onChange={onChange} />
                        </Form.Item>
                        <Form.Item label="目的港" name="DestinationPort" >
                            <Input onChange={onChange} />
                        </Form.Item>
                        <Form.Item label="开航日期"  >
                            <DatePicker name="DepartureDate" style={{ display: 'block' }} defaultValue={dayjs(formData.DepartureDate)}  onChange={(_, dateStrings) => {onDateChange("DepartureDate", dateStrings) }} />
                        </Form.Item>
                        <Form.Item label="客服名称" name="CustomerService" >
                            <Input onChange={onChange} />
                        </Form.Item>
                        <Form.Item label="空运制单计费重量" name="AirWaybillChargedWeight" >
                            <InputNumber onChange={(value)=>onNumberChange("AirWaybillChargedWeight", value as number)} />
                        </Form.Item>
                        <Form.Item label="空运订舱计费重量" name="AirBookingChargedWeight" >
                            <InputNumber onChange={(value)=>onNumberChange("AirBookingChargedWeight", value as number)} />
                        </Form.Item>
                        <Form.Item label="订舱代理" name="BookingAgent" >
                            <Input onChange={onChange} />
                        </Form.Item>
                        <Form.Item label="项目编号" name="ProjectId" >
                            <Input onChange={onChange} />
                        </Form.Item>
                        <Form.Item label="操作" name="Operation" >
                            <Input onChange={onChange} />
                        </Form.Item>
                        <Form.Item label="销售人员" name="Sales" >
                            <Input onChange={onChange} />
                        </Form.Item>
                        <Form.Item label="销售部门" name="SalesDepartment" >
                            <Input onChange={onChange} />
                        </Form.Item>
                        <Form.Item label="海外客服" name="OverseasService" >
                            <Input onChange={onChange} />
                        </Form.Item>
                        <Form.Item label="状态" name="Status" >
                            <Input onChange={onChange} />
                        </Form.Item>
                        <Form.Item label="业务类型" name="BusinessType" >
                            <Input onChange={onChange} />
                        </Form.Item>
                        <Form.Item label="实际计费重量" name="ActualChargedWeight" >
                            <InputNumber onChange={(value)=>onNumberChange("ActualChargedWeight", value as number)} />
                        </Form.Item>
                        <Form.Item label="委托件数" name="EntrustedPieces" >
                            <Select onChange={onChange} />
                        </Form.Item>
                        <Form.Item label="箱号" name="ContainerNumber" >
                            <Input onChange={onChange} />
                        </Form.Item>
                        <Form.Item label="委托毛重" name="EntrustedGrossWeight" >
                            <InputNumber onChange={(value)=>onNumberChange("EntrustedGrossWeight", value as number)} />
                        </Form.Item>
                        <Form.Item label="委托体积" name="EntrustedVolume" >
                            <InputNumber onChange={(value)=>onNumberChange("EntrustedVolume", value as number)} />
                        </Form.Item>
                        <Form.Item label="实际件数" name="ActualPieces" >
                            <Select onChange={onChange} />
                        </Form.Item>
                        <Form.Item label="实际毛重" name="ActualGrossWeight" >
                            <InputNumber onChange={(value)=>onNumberChange("ActualGrossWeight", value as number)} />
                        </Form.Item>
                        <Form.Item label="实际体积" name="ActualVolume" >
                            <InputNumber onChange={(value)=>onNumberChange("ActualVolume", value as number)} />
                        </Form.Item>
                        <Form.Item label="应付核销状态" name="PayableVerificationStatus" >
                            <Input onChange={onChange} />
                        </Form.Item>
                        <Form.Item label="应收核销状态" name="ReceivableVerificationStatus" >
                            <Input onChange={onChange} />
                        </Form.Item>
                        <Form.Item label="买价" name="PurchasePrice" >
                            <InputNumber onChange={(value)=>onNumberChange("PurchasePrice", value as number)} />
                        </Form.Item>
                        <Form.Item label="卖价" name="SellingPrice" >
                            <InputNumber onChange={(value)=>onNumberChange("SellingPrice", value as number)} />
                        </Form.Item>
                        <Form.Item label="到港日期"  >
                            <DatePicker name="ArrivalDate" style={{ display: 'block' }} defaultValue={dayjs(formData.ArrivalDate)}  onChange={(_, dateStrings) => {onDateChange("ArrivalDate", dateStrings) }} />
                        </Form.Item>
                        <Form.Item label="指定货代理" name="DesignatedFreightAgent" >
                            <Input onChange={onChange} />
                        </Form.Item>
                        <Form.Item label="最终目的地" name="FinalDestination" >
                            <Input onChange={onChange} />
                        </Form.Item>
                        <Form.Item label="本地服务" name="LocalService" >
                            <Input onChange={onChange} />
                        </Form.Item>
                        <Form.Item label="创建日期，默认当前日期时间"  >
                            <DatePicker name="CreationDate" style={{ display: 'block' }} defaultValue={dayjs(formData.CreationDate)}  onChange={(_, dateStrings) => {onDateChange("CreationDate", dateStrings) }} />
                        </Form.Item>
                        <Form.Item label="自定义业务类型" name="CustomBusinessType" >
                            <Input onChange={onChange} />
                        </Form.Item>
                        <Form.Item label="业务参考号" name="BusinessReferenceNumber" >
                            <Input onChange={onChange} />
                        </Form.Item>
                        <Form.Item label="送货日期"  >
                            <DatePicker name="DeliveryDate" style={{ display: 'block' }} defaultValue={dayjs(formData.DeliveryDate)}  onChange={(_, dateStrings) => {onDateChange("DeliveryDate", dateStrings) }} />
                        </Form.Item>
                        <Form.Item label="船公司约号" name="ShippingCompanyContractNumber" >
                            <Input onChange={onChange} />
                        </Form.Item>
                        <Form.Item label="内部约号" name="InternalContractNumber" >
                            <Input onChange={onChange} />
                        </Form.Item>
                        <Form.Item label="报价单号" name="QuotationNumber" >
                            <Input onChange={onChange} />
                        </Form.Item>
                        <Form.Item label="航线" name="ShippingRoute" >
                            <Input onChange={onChange} />
                        </Form.Item>
                        <Form.Item label="TEU（标准箱数）" name="Teu" >
                            <Select onChange={onChange} />
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
                        <Form.Item label="自定义字段4" name="CustomField4" >
                            <Input onChange={onChange} />
                        </Form.Item>
                        <Form.Item label="揽货销售" name="CollectionSales" >
                            <Input onChange={onChange} />
                        </Form.Item>
                        <Form.Item label="操作日期"  >
                            <DatePicker name="OperationDate" style={{ display: 'block' }} defaultValue={dayjs(formData.OperationDate)}  onChange={(_, dateStrings) => {onDateChange("OperationDate", dateStrings) }} />
                        </Form.Item>
                        <Form.Item label="实际开航日期"  >
                            <DatePicker name="ActualDepartureDateAtd" style={{ display: 'block' }} defaultValue={dayjs(formData.ActualDepartureDateAtd)}  onChange={(_, dateStrings) => {onDateChange("ActualDepartureDateAtd", dateStrings) }} />
                        </Form.Item>
                        <Form.Item label="实际到港日期"  >
                            <DatePicker name="ActualArrivalDateAta" style={{ display: 'block' }} defaultValue={dayjs(formData.ActualArrivalDateAta)}  onChange={(_, dateStrings) => {onDateChange("ActualArrivalDateAta", dateStrings) }} />
                        </Form.Item>
                        <Form.Item label="收货人" name="Consignee" >
                            <Input onChange={onChange} />
                        </Form.Item>
                        <Form.Item label="发货人" name="Shipper" >
                            <Input onChange={onChange} />
                        </Form.Item>
                        <Form.Item label="应收开票状态" name="ReceivableInvoiceStatus" >
                            <Input onChange={onChange} />
                        </Form.Item>
                        <Form.Item label="应付开票状态" name="PayableInvoiceStatus" >
                            <Input onChange={onChange} />
                        </Form.Item>
                        <Form.Item label="客户联系人" name="CustomerContact" >
                            <Input onChange={onChange} />
                        </Form.Item>
                        <Form.Item label="SOP状态" name="SopStatus" >
                            <Input onChange={onChange} />
                        </Form.Item>
                        <Form.Item label="SOP模板名称" name="SopTemplateName" >
                            <Input onChange={onChange} />
                        </Form.Item>
                        <Form.Item label="货物类型" name="CargoType" >
                            <Input onChange={onChange} />
                        </Form.Item>
                        <Form.Item label="实际提重时间"  >
                            <DatePicker name="ActualPickupTime" style={{ display: 'block' }} defaultValue={dayjs(formData.ActualPickupTime)}  onChange={(_, dateStrings) => {onDateChange("ActualPickupTime", dateStrings) }} />
                        </Form.Item>
                        <Form.Item label="实际还空时间"  >
                            <DatePicker name="ActualReturnEmptyTime" style={{ display: 'block' }} defaultValue={dayjs(formData.ActualReturnEmptyTime)}  onChange={(_, dateStrings) => {onDateChange("ActualReturnEmptyTime", dateStrings) }} />
                        </Form.Item>
                        <Form.Item label="分单号" name="SubOrderNumber" >
                            <Input onChange={onChange} />
                        </Form.Item>
                        <Form.Item label="客户级别" name="CustomerLevel" >
                            <Input onChange={onChange} />
                        </Form.Item>
                        <Form.Item label="实际送货时间"  >
                            <DatePicker name="ActualDeliveryTime" style={{ display: 'block' }} defaultValue={dayjs(formData.ActualDeliveryTime)}  onChange={(_, dateStrings) => {onDateChange("ActualDeliveryTime", dateStrings) }} />
                        </Form.Item>
                        <Form.Item label="客服部门" name="CustomerServiceDepartment" >
                            <Input onChange={onChange} />
                        </Form.Item>
                        <Form.Item label="单证部门" name="DocumentationDepartment" >
                            <Input onChange={onChange} />
                        </Form.Item>
                        <Form.Item label="应收费用是否录入" name="ReceivableFeesEntered" >
                            <Input onChange={onChange} />
                        </Form.Item>
                        <Form.Item label="应付费用是否录入" name="PayableFeesEntered" >
                            <Input onChange={onChange} />
                        </Form.Item>
                        <Form.Item label="支线开航日期"  >
                            <DatePicker name="BranchDepartureDate" style={{ display: 'block' }} defaultValue={dayjs(formData.BranchDepartureDate)}  onChange={(_, dateStrings) => {onDateChange("BranchDepartureDate", dateStrings) }} />
                        </Form.Item>
                        <Form.Item label="支线到港日期"  >
                            <DatePicker name="BranchArrivalDate" style={{ display: 'block' }} defaultValue={dayjs(formData.BranchArrivalDate)}  onChange={(_, dateStrings) => {onDateChange("BranchArrivalDate", dateStrings) }} />
                        </Form.Item>
                        <Form.Item label="驳车发运日期"  >
                            <DatePicker name="BargeDepartureDate" style={{ display: 'block' }} defaultValue={dayjs(formData.BargeDepartureDate)}  onChange={(_, dateStrings) => {onDateChange("BargeDepartureDate", dateStrings) }} />
                        </Form.Item>
                        <Form.Item label="驳车抵运日期"  >
                            <DatePicker name="BargeArrivalDate" style={{ display: 'block' }} defaultValue={dayjs(formData.BargeArrivalDate)}  onChange={(_, dateStrings) => {onDateChange("BargeArrivalDate", dateStrings) }} />
                        </Form.Item>
                        <Form.Item label="唛头" name="Mark" >
                            <Input onChange={onChange} />
                        </Form.Item>
                        <Form.Item label="进场时间"  >
                            <DatePicker name="EntryTime" style={{ display: 'block' }} defaultValue={dayjs(formData.EntryTime)}  onChange={(_, dateStrings) => {onDateChange("EntryTime", dateStrings) }} />
                        </Form.Item>
                        <Form.Item label="揽货类型" name="CollectionType" >
                            <Input onChange={onChange} />
                        </Form.Item>
                        <Form.Item label="利润" name="Profit" >
                            <InputNumber onChange={(value)=>onNumberChange("Profit", value as number)} />
                        </Form.Item>
                        <Form.Item label="收入" name="Income" >
                            <InputNumber onChange={(value)=>onNumberChange("Income", value as number)} />
                        </Form.Item>
                        <Form.Item label="支出" name="Expenditure" >
                            <InputNumber onChange={(value)=>onNumberChange("Expenditure", value as number)} />
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
