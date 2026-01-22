
import React from 'react';
import { Modal, Form, Input, InputNumber, Select, Button, Space,DatePicker } from 'antd';
import { FeeReconciliationItemProps } from "@/types/settlement_center/cost_manage/fee_reconciliation";
import dayjs from 'dayjs';
interface DetailModalProps {
    open: boolean;
    modalFlag: 'add' | 'edit';
    saving: boolean;
    formData: Partial<FeeReconciliationItemProps>;
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
            title={modalFlag === 'add' ? "新增费用对账" : "编辑费用对账"}
            onCancel={onCancel}
            width={600}
            destroyOnClose={true}
            maskClosable={false}
            closable={!saving}
            footer={null}
        >
            <Form {...formItemLayout} style={{ maxWidth: 600 }} initialValues={formData} disabled={saving} onFinish={onOk}>
                        <Form.Item label="" name="Id" rules={[{ required: true, message: '' }]}>
                            <Select onChange={onChange} />
                        </Form.Item>
                        <Form.Item label="船公司约号" name="ShippingCompany" rules={[{ required: true, message: '' }]}>
                            <Input onChange={onChange} />
                        </Form.Item>
                        <Form.Item label="约价性质" name="PricingNature" >
                            <Input onChange={onChange} />
                        </Form.Item>
                        <Form.Item label="实际进港日期"  >
                            <DatePicker name="ActualPortEntryDate" style={{ display: 'block' }} defaultValue={dayjs(formData.ActualPortEntryDate)}  onChange={(_, dateStrings) => {onDateChange("ActualPortEntryDate", dateStrings || '') }} />
                        </Form.Item>
                        <Form.Item label="业务模式" name="BusinessModel" >
                            <Input onChange={onChange} />
                        </Form.Item>
                        <Form.Item label="业务编号" name="BusinessNumber" >
                            <Input onChange={onChange} />
                        </Form.Item>
                        <Form.Item label="进仓编号" name="WarehouseEntryNumber" >
                            <Input onChange={onChange} />
                        </Form.Item>
                        <Form.Item label="订舱编号" name="BookingNumber" >
                            <Input onChange={onChange} />
                        </Form.Item>
                        <Form.Item label="截单日期"  >
                            <DatePicker name="CutoffDate" style={{ display: 'block' }} defaultValue={dayjs(formData.CutoffDate)}  onChange={(_, dateStrings) => {onDateChange("CutoffDate", dateStrings || '') }} />
                        </Form.Item>
                        <Form.Item label="项目编号" name="ProjectNumber" >
                            <Input onChange={onChange} />
                        </Form.Item>
                        <Form.Item label="SONO" name="Sono" >
                            <Input onChange={onChange} />
                        </Form.Item>
                        <Form.Item label="箱号" name="ContainerNumber" >
                            <Input onChange={onChange} />
                        </Form.Item>
                        <Form.Item label="海外客服" name="OverseasCustomerService" >
                            <Input onChange={onChange} />
                        </Form.Item>
                        <Form.Item label="现场操作" name="SiteOperation" >
                            <Input onChange={onChange} />
                        </Form.Item>
                        <Form.Item label="付款申请单号" name="PaymentApplicationNumber" >
                            <Input onChange={onChange} />
                        </Form.Item>
                        <Form.Item label="预计到港时间"  >
                            <DatePicker name="Eta" style={{ display: 'block' }} defaultValue={dayjs(formData.Eta)}  onChange={(_, dateStrings) => {onDateChange("Eta", dateStrings || '') }} />
                        </Form.Item>
                        <Form.Item label="预计开船时间"  >
                            <DatePicker name="Etd" style={{ display: 'block' }} defaultValue={dayjs(formData.Etd)}  onChange={(_, dateStrings) => {onDateChange("Etd", dateStrings || '') }} />
                        </Form.Item>
                        <Form.Item label="实际开船时间"  >
                            <DatePicker name="Atd" style={{ display: 'block' }} defaultValue={dayjs(formData.Atd)}  onChange={(_, dateStrings) => {onDateChange("Atd", dateStrings || '') }} />
                        </Form.Item>
                        <Form.Item label="实际到港时间"  >
                            <DatePicker name="Ata" style={{ display: 'block' }} defaultValue={dayjs(formData.Ata)}  onChange={(_, dateStrings) => {onDateChange("Ata", dateStrings || '') }} />
                        </Form.Item>
                        <Form.Item label="汇率" name="ExchangeRate" >
                            <InputNumber onChange={(value)=>onNumberChange("ExchangeRate", value as number)} />
                        </Form.Item>
                        <Form.Item label="账单号" name="BillNumber" >
                            <Input onChange={onChange} />
                        </Form.Item>
                        <Form.Item label="结算对象" name="SettlementObject" >
                            <Input onChange={onChange} />
                        </Form.Item>
                        <Form.Item label="揽货类型" name="CargoType" >
                            <Input onChange={onChange} />
                        </Form.Item>
                        <Form.Item label="主单号" name="MasterWaybillNumber" >
                            <Input onChange={onChange} />
                        </Form.Item>
                        <Form.Item label="分单号" name="HouseWaybillNumber" >
                            <Input onChange={onChange} />
                        </Form.Item>
                        <Form.Item label="委托单位" name="Consignor" >
                            <Input onChange={onChange} />
                        </Form.Item>
                        <Form.Item label="业务类型" name="BusinessType" >
                            <Input onChange={onChange} />
                        </Form.Item>
                        <Form.Item label="业务日期"  >
                            <DatePicker name="BusinessDate" style={{ display: 'block' }} defaultValue={dayjs(formData.BusinessDate)}  onChange={(_, dateStrings) => {onDateChange("BusinessDate", dateStrings || '') }} />
                        </Form.Item>
                        <Form.Item label="是否FBA" name="IsFba" >
                            <Select onChange={onChange} />
                        </Form.Item>
                        <Form.Item label="亚马逊仓库编码" name="AmazonWarehouseCode" >
                            <Input onChange={onChange} />
                        </Form.Item>
                        <Form.Item label="目的地配送方式" name="DestinationDeliveryMethod" >
                            <Input onChange={onChange} />
                        </Form.Item>
                        <Form.Item label="快递单号" name="CourierNumber" >
                            <Input onChange={onChange} />
                        </Form.Item>
                        <Form.Item label="是否偏远仓" name="IsRemoteWarehouse" >
                            <Select onChange={onChange} />
                        </Form.Item>
                        <Form.Item label="船名航次" name="ShipNameAndVoyage" >
                            <Input onChange={onChange} />
                        </Form.Item>
                        <Form.Item label="起运港" name="PortOfLoading" >
                            <Input onChange={onChange} />
                        </Form.Item>
                        <Form.Item label="目的港" name="PortOfDestination" >
                            <Input onChange={onChange} />
                        </Form.Item>
                        <Form.Item label="订舱代理" name="BookingAgent" >
                            <Input onChange={onChange} />
                        </Form.Item>
                        <Form.Item label="始发站" name="OriginStation" >
                            <Input onChange={onChange} />
                        </Form.Item>
                        <Form.Item label="目的站" name="DestinationStation" >
                            <Input onChange={onChange} />
                        </Form.Item>
                        <Form.Item label="过境站" name="TransitStation" >
                            <Input onChange={onChange} />
                        </Form.Item>
                        <Form.Item label="目的港代理" name="DestinationAgent" >
                            <Input onChange={onChange} />
                        </Form.Item>
                        <Form.Item label="销售" name="SalesPerson" >
                            <Input onChange={onChange} />
                        </Form.Item>
                        <Form.Item label="操作" name="OperationPerson" >
                            <Input onChange={onChange} />
                        </Form.Item>
                        <Form.Item label="客服" name="CustomerServicePerson" >
                            <Input onChange={onChange} />
                        </Form.Item>
                        <Form.Item label="单证" name="DocumentPerson" >
                            <Input onChange={onChange} />
                        </Form.Item>
                        <Form.Item label="业务参考号" name="BusinessReferenceNumber" >
                            <Input onChange={onChange} />
                        </Form.Item>
                        <Form.Item label="已计提" name="AccrualAmount" >
                            <InputNumber onChange={(value)=>onNumberChange("AccrualAmount", value as number)} />
                        </Form.Item>
                        <Form.Item label="财务日期"  >
                            <DatePicker name="FinancialDate" style={{ display: 'block' }} defaultValue={dayjs(formData.FinancialDate)}  onChange={(_, dateStrings) => {onDateChange("FinancialDate", dateStrings || '') }} />
                        </Form.Item>
                        <Form.Item label="国内/国外" name="DomesticOrForeign" >
                            <Input onChange={onChange} />
                        </Form.Item>
                        <Form.Item label="收支类型" name="RevenueOrExpenditureType" >
                            <Input onChange={onChange} />
                        </Form.Item>
                        <Form.Item label="费用状态" name="FeeStatus" >
                            <Input onChange={onChange} />
                        </Form.Item>
                        <Form.Item label="审核人" name="Auditor" >
                            <Input onChange={onChange} />
                        </Form.Item>
                        <Form.Item label="确认状态" name="ConfirmationStatus" >
                            <Input onChange={onChange} />
                        </Form.Item>
                        <Form.Item label="费用名称" name="FeeName" >
                            <Input onChange={onChange} />
                        </Form.Item>
                        <Form.Item label="单位" name="Unit" >
                            <Input onChange={onChange} />
                        </Form.Item>
                        <Form.Item label="币种" name="Currency" >
                            <Input onChange={onChange} />
                        </Form.Item>
                        <Form.Item label="数量" name="Quantity" >
                            <InputNumber onChange={(value)=>onNumberChange("Quantity", value as number)} />
                        </Form.Item>
                        <Form.Item label="单价" name="UnitPrice" >
                            <InputNumber onChange={(value)=>onNumberChange("UnitPrice", value as number)} />
                        </Form.Item>
                        <Form.Item label="含税价" name="TaxInclusivePrice" >
                            <InputNumber onChange={(value)=>onNumberChange("TaxInclusivePrice", value as number)} />
                        </Form.Item>
                        <Form.Item label="不含税价" name="TaxExclusivePrice" >
                            <InputNumber onChange={(value)=>onNumberChange("TaxExclusivePrice", value as number)} />
                        </Form.Item>
                        <Form.Item label="税额" name="TaxAmount" >
                            <InputNumber onChange={(value)=>onNumberChange("TaxAmount", value as number)} />
                        </Form.Item>
                        <Form.Item label="税率" name="TaxRate" >
                            <InputNumber onChange={(value)=>onNumberChange("TaxRate", value as number)} />
                        </Form.Item>
                        <Form.Item label="核销金额" name="WriteOffAmount" >
                            <InputNumber onChange={(value)=>onNumberChange("WriteOffAmount", value as number)} />
                        </Form.Item>
                        <Form.Item label="未销金额" name="UnwrittenAmount" >
                            <InputNumber onChange={(value)=>onNumberChange("UnwrittenAmount", value as number)} />
                        </Form.Item>
                        <Form.Item label="联系人" name="ContactPerson" >
                            <Input onChange={onChange} />
                        </Form.Item>
                        <Form.Item label="创建人" name="Creator" >
                            <Input onChange={onChange} />
                        </Form.Item>
                        <Form.Item label="备注" name="Remark" >
                            <Input onChange={onChange} />
                        </Form.Item>
                        <Form.Item label="往来关联号" name="RelatedNumber" >
                            <Input onChange={onChange} />
                        </Form.Item>
                        <Form.Item label="委托关联号" name="ConsignmentRelatedNumber" >
                            <Input onChange={onChange} />
                        </Form.Item>
                        <Form.Item label="承运人" name="Carrier" >
                            <Input onChange={onChange} />
                        </Form.Item>
                        <Form.Item label="确认日期"  >
                            <DatePicker name="ConfirmationDate" style={{ display: 'block' }} defaultValue={dayjs(formData.ConfirmationDate)}  onChange={(_, dateStrings) => {onDateChange("ConfirmationDate", dateStrings || '') }} />
                        </Form.Item>
                        <Form.Item label="费用确认人" name="FeeConfirmationPerson" >
                            <Input onChange={onChange} />
                        </Form.Item>
                        <Form.Item label="航线负责人" name="RouteManager" >
                            <Input onChange={onChange} />
                        </Form.Item>
                        <Form.Item label="开票日期"  >
                            <DatePicker name="InvoiceDate" style={{ display: 'block' }} defaultValue={dayjs(formData.InvoiceDate)}  onChange={(_, dateStrings) => {onDateChange("InvoiceDate", dateStrings || '') }} />
                        </Form.Item>
                        <Form.Item label="发票号码" name="InvoiceNumber" >
                            <Input onChange={onChange} />
                        </Form.Item>
                        <Form.Item label="开票抬头" name="InvoiceTitle" >
                            <Input onChange={onChange} />
                        </Form.Item>
                        <Form.Item label="是否需要开票" name="IsInvoiceRequired" >
                            <Select onChange={onChange} />
                        </Form.Item>
                        <Form.Item label="销账日期"  >
                            <DatePicker name="WriteOffDate" style={{ display: 'block' }} defaultValue={dayjs(formData.WriteOffDate)}  onChange={(_, dateStrings) => {onDateChange("WriteOffDate", dateStrings || '') }} />
                        </Form.Item>
                        <Form.Item label="业务状态" name="BusinessStatus" >
                            <Input onChange={onChange} />
                        </Form.Item>
                        <Form.Item label="驳船开航日期"  >
                            <DatePicker name="BargeSailingDate" style={{ display: 'block' }} defaultValue={dayjs(formData.BargeSailingDate)}  onChange={(_, dateStrings) => {onDateChange("BargeSailingDate", dateStrings || '') }} />
                        </Form.Item>
                        <Form.Item label="驳船船名" name="BargeName" >
                            <Input onChange={onChange} />
                        </Form.Item>
                        <Form.Item label="驳船航次" name="BargeVoyage" >
                            <Input onChange={onChange} />
                        </Form.Item>
                        <Form.Item label="驳船起运港(POL)" name="BargePortOfLoading" >
                            <Input onChange={onChange} />
                        </Form.Item>
                        <Form.Item label="收付日期"  >
                            <DatePicker name="PaymentDate" style={{ display: 'block' }} defaultValue={dayjs(formData.PaymentDate)}  onChange={(_, dateStrings) => {onDateChange("PaymentDate", dateStrings || '') }} />
                        </Form.Item>
                        <Form.Item label="销售部门" name="SalesDepartment" >
                            <Input onChange={onChange} />
                        </Form.Item>
                        <Form.Item label="送货时间"  >
                            <DatePicker name="DeliveryTime" style={{ display: 'block' }} defaultValue={dayjs(formData.DeliveryTime)}  onChange={(_, dateStrings) => {onDateChange("DeliveryTime", dateStrings || '') }} />
                        </Form.Item>
                        <Form.Item label="确认备注" name="ConfirmationRemark" >
                            <Input onChange={onChange} />
                        </Form.Item>
                        <Form.Item label="费用核销状态" name="FeeWriteOffStatus" >
                            <Input onChange={onChange} />
                        </Form.Item>
                        <Form.Item label="操作日期"  >
                            <DatePicker name="OperationDate" style={{ display: 'block' }} defaultValue={dayjs(formData.OperationDate)}  onChange={(_, dateStrings) => {onDateChange("OperationDate", dateStrings || '') }} />
                        </Form.Item>
                        <Form.Item label="预计装箱日期"  >
                            <DatePicker name="EstimatedLoadingDate" style={{ display: 'block' }} defaultValue={dayjs(formData.EstimatedLoadingDate)}  onChange={(_, dateStrings) => {onDateChange("EstimatedLoadingDate", dateStrings || '') }} />
                        </Form.Item>
                        <Form.Item label="实际还空时间"  >
                            <DatePicker name="ActualReturnEmptyTime" style={{ display: 'block' }} defaultValue={dayjs(formData.ActualReturnEmptyTime)}  onChange={(_, dateStrings) => {onDateChange("ActualReturnEmptyTime", dateStrings || '') }} />
                        </Form.Item>
                        <Form.Item label="箱量描述" name="ContainerQuantityDescription" >
                            <Input onChange={onChange} />
                        </Form.Item>
                        <Form.Item label="费用创建日期"  >
                            <DatePicker name="FeeCreationDate" style={{ display: 'block' }} defaultValue={dayjs(formData.FeeCreationDate)}  onChange={(_, dateStrings) => {onDateChange("FeeCreationDate", dateStrings || '') }} />
                        </Form.Item>
                        <Form.Item label="客户级别" name="CustomerLevel" >
                            <Input onChange={onChange} />
                        </Form.Item>
                        <Form.Item label="送货完成时间"  >
                            <DatePicker name="DeliveryCompletionTime" style={{ display: 'block' }} defaultValue={dayjs(formData.DeliveryCompletionTime)}  onChange={(_, dateStrings) => {onDateChange("DeliveryCompletionTime", dateStrings || '') }} />
                        </Form.Item>
                        <Form.Item label="费用变更人" name="FeeChanger" >
                            <Input onChange={onChange} />
                        </Form.Item>
                        <Form.Item label="结算代理" name="SettlementAgent" >
                            <Input onChange={onChange} />
                        </Form.Item>
                        <Form.Item label="是否调整费用" name="IsFeeAdjusted" >
                            <Select onChange={onChange} />
                        </Form.Item>
                        <Form.Item label="航线" name="Route" >
                            <Input onChange={onChange} />
                        </Form.Item>
                        <Form.Item label="费用修改时间"  >
                            <DatePicker name="FeeModificationTime" style={{ display: 'block' }} defaultValue={dayjs(formData.FeeModificationTime)}  onChange={(_, dateStrings) => {onDateChange("FeeModificationTime", dateStrings || '') }} />
                        </Form.Item>
                        <Form.Item label="费用修改人" name="FeeModifier" >
                            <Input onChange={onChange} />
                        </Form.Item>
                        <Form.Item label="账单日期" name="BillDate" >
                            <Input onChange={onChange} />
                        </Form.Item>
                        <Form.Item label="账单到期日"  >
                            <DatePicker name="InvoiceDueDate" style={{ display: 'block' }} defaultValue={dayjs(formData.InvoiceDueDate)}  onChange={(_, dateStrings) => {onDateChange("InvoiceDueDate", dateStrings || '') }} />
                        </Form.Item>
                        <Form.Item label="对方账单号" name="CounterpartyInvoiceNumber" >
                            <Input onChange={onChange} />
                        </Form.Item>
                        <Form.Item label="应收核销状态" name="ReceivableWriteOffStatus" >
                            <Input onChange={onChange} />
                        </Form.Item>
                        <Form.Item label="指定货代理" name="DesignatedForwarder" >
                            <Input onChange={onChange} />
                        </Form.Item>
                        <Form.Item label="实际装箱日期"  >
                            <DatePicker name="ActualLoadingDate" style={{ display: 'block' }} defaultValue={dayjs(formData.ActualLoadingDate)}  onChange={(_, dateStrings) => {onDateChange("ActualLoadingDate", dateStrings || '') }} />
                        </Form.Item>
                        <Form.Item label="对方对账单号" name="CounterpartyCounterNumber" >
                            <Input onChange={onChange} />
                        </Form.Item>
                        <Form.Item label="费用到期日"  >
                            <DatePicker name="FeeDueDate" style={{ display: 'block' }} defaultValue={dayjs(formData.FeeDueDate)}  onChange={(_, dateStrings) => {onDateChange("FeeDueDate", dateStrings || '') }} />
                        </Form.Item>
                        <Form.Item label="关联费用ID" name="RelatedFeeId" >
                            <Input onChange={onChange} />
                        </Form.Item>
                        <Form.Item label="费用ID" name="FeeId" >
                            <Input onChange={onChange} />
                        </Form.Item>
                        <Form.Item label="数据来源" name="DataSource" >
                            <Input onChange={onChange} />
                        </Form.Item>
                        <Form.Item label="费用箱号" name="FeeContainerNumber" >
                            <Input onChange={onChange} />
                        </Form.Item>
                        <Form.Item label="收/发货地" name="PickupDeliveryLocation" >
                            <Input onChange={onChange} />
                        </Form.Item>
                        <Form.Item label="拖车实际提货时间"  >
                            <DatePicker name="ActualPickupTime" style={{ display: 'block' }} defaultValue={dayjs(formData.ActualPickupTime)}  onChange={(_, dateStrings) => {onDateChange("ActualPickupTime", dateStrings || '') }} />
                        </Form.Item>
                        <Form.Item label="销账银行" name="WriteOffBank" >
                            <Input onChange={onChange} />
                        </Form.Item>
                        <Form.Item label="母公司" name="ParentCompany" >
                            <Input onChange={onChange} />
                        </Form.Item>
                        <Form.Item label="结算部门" name="SettlementDepartment" >
                            <Input onChange={onChange} />
                        </Form.Item>
                        <Form.Item label="揽货销售" name="CargoSales" >
                            <Input onChange={onChange} />
                        </Form.Item>
                        <Form.Item label="销售分公司" name="SalesBranch" >
                            <Input onChange={onChange} />
                        </Form.Item>
                        <Form.Item label="操作分公司" name="OperationBranch" >
                            <Input onChange={onChange} />
                        </Form.Item>
                        <Form.Item label="费用同步状态" name="FeeSyncStatus" >
                            <Input onChange={onChange} />
                        </Form.Item>
                        <Form.Item label="换单代理" name="ExchangeAgent" >
                            <Input onChange={onChange} />
                        </Form.Item>
                        <Form.Item label="对账金额" name="ReconciliationAmount" >
                            <InputNumber onChange={(value)=>onNumberChange("ReconciliationAmount", value as number)} />
                        </Form.Item>
                        <Form.Item label="差额" name="Difference" >
                            <InputNumber onChange={(value)=>onNumberChange("Difference", value as number)} />
                        </Form.Item>
                        <Form.Item label="是否确认" name="IsConfirmed" >
                            <Select onChange={onChange} />
                        </Form.Item>
                        <Form.Item label="结算对象账期" name="SettlementObjectTerm" >
                            <Input onChange={onChange} />
                        </Form.Item>
                        <Form.Item label="结算方式" name="SettlementMethod" >
                            <Input onChange={onChange} />
                        </Form.Item>
                        <Form.Item label="审核日期"  >
                            <DatePicker name="AuditDate" style={{ display: 'block' }} defaultValue={dayjs(formData.AuditDate)}  onChange={(_, dateStrings) => {onDateChange("AuditDate", dateStrings || '') }} />
                        </Form.Item>
                        <Form.Item label="GP说明" name="GpDescription" >
                            <Input onChange={onChange} />
                        </Form.Item>
                        <Form.Item label="计费重量(实)" name="ChargeableWeightActual" >
                            <InputNumber onChange={(value)=>onNumberChange("ChargeableWeightActual", value as number)} />
                        </Form.Item>
                        <Form.Item label="计费重量(委)" name="ChargeableWeightCommission" >
                            <InputNumber onChange={(value)=>onNumberChange("ChargeableWeightCommission", value as number)} />
                        </Form.Item>
                        <Form.Item label="件数(实)" name="NumberOfPiecesActual" >
                            <Select onChange={onChange} />
                        </Form.Item>
                        <Form.Item label="件数(委)" name="NumberOfPiecesCommission" >
                            <Select onChange={onChange} />
                        </Form.Item>
                        <Form.Item label="体积(实)" name="VolumeActual" >
                            <InputNumber onChange={(value)=>onNumberChange("VolumeActual", value as number)} />
                        </Form.Item>
                        <Form.Item label="体积(委)" name="VolumeCommission" >
                            <InputNumber onChange={(value)=>onNumberChange("VolumeCommission", value as number)} />
                        </Form.Item>
                        <Form.Item label="毛重(委)" name="GrossWeightCommission" >
                            <InputNumber onChange={(value)=>onNumberChange("GrossWeightCommission", value as number)} />
                        </Form.Item>
                        <Form.Item label="毛重(实)" name="GrossWeightActual" >
                            <InputNumber onChange={(value)=>onNumberChange("GrossWeightActual", value as number)} />
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

