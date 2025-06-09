
import React from 'react';
import { Modal, Form, Input, InputNumber, Select, Button, Space,DatePicker } from 'antd';
import { BusinessPartnerItemProps } from "@/types/basic_manage/business_partner";
import dayjs from 'dayjs';
interface DetailModalProps {
    open: boolean;
    modalFlag: 'add' | 'edit';
    saving: boolean;
    formData: Partial<BusinessPartnerItemProps>;
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
            title={modalFlag === 'add' ? "新增合作伙伴" : "编辑合作伙伴"}
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
                        <Form.Item label="编号" name="Id" rules={[{ required: true, message: '' }]}>
                            <Input onChange={onChange} />
                        </Form.Item>
                        <Form.Item label="简称" name="AbbreviatedName" >
                            <Input onChange={onChange} />
                        </Form.Item>
                        <Form.Item label="代码" name="Code" >
                            <Input onChange={onChange} />
                        </Form.Item>
                        <Form.Item label="国家(地区)" name="CountryRegion" >
                            <Input onChange={onChange} />
                        </Form.Item>
                        <Form.Item label="中文名称" name="ChineseName" >
                            <Input onChange={onChange} />
                        </Form.Item>
                        <Form.Item label="英文名称" name="EnglishName" >
                            <Input onChange={onChange} />
                        </Form.Item>
                        <Form.Item label="客户合同签约状态" name="CustomerContractStatus" >
                            <Input onChange={onChange} />
                        </Form.Item>
                        <Form.Item label="附加说明" name="AdditionalRemarks" >
                            <Input onChange={onChange} />
                        </Form.Item>
                        <Form.Item label="所属分公司" name="BranchCompany" >
                            <Input onChange={onChange} />
                        </Form.Item>
                        <Form.Item label="审核状态" name="AuditStatus" >
                            <Input onChange={onChange} />
                        </Form.Item>
                        <Form.Item label="拒绝原因" name="RejectionReason" >
                            <Input onChange={onChange} />
                        </Form.Item>
                        <Form.Item label="审核人" name="Auditor" >
                            <Input onChange={onChange} />
                        </Form.Item>
                        <Form.Item label="审核日期"  >
                            <DatePicker name="AuditDate" style={{ display: 'block' }} defaultValue={dayjs(formData.AuditDate)}  onChange={(_, dateStrings) => {onDateChange("AuditDate", dateStrings) }} />
                        </Form.Item>
                        <Form.Item label="创建人" name="Creator" >
                            <Input onChange={onChange} />
                        </Form.Item>
                        <Form.Item label="创建日期"  >
                            <DatePicker name="CreationDate" style={{ display: 'block' }} defaultValue={dayjs(formData.CreationDate)}  onChange={(_, dateStrings) => {onDateChange("CreationDate", dateStrings) }} />
                        </Form.Item>
                        <Form.Item label="修改人" name="Modifier" >
                            <Input onChange={onChange} />
                        </Form.Item>
                        <Form.Item label="修改日期"  >
                            <DatePicker name="ModificationDate" style={{ display: 'block' }} defaultValue={dayjs(formData.ModificationDate)}  onChange={(_, dateStrings) => {onDateChange("ModificationDate", dateStrings) }} />
                        </Form.Item>
                        <Form.Item label="是否有效" name="IsActive" >
                            <Select onChange={onChange} />
                        </Form.Item>
                        <Form.Item label="电商客户" name="E-commerceCustomer" >
                            <Select onChange={onChange} />
                        </Form.Item>
                        <Form.Item label="销售" name="Sales" >
                            <Input onChange={onChange} />
                        </Form.Item>
                        <Form.Item label="结算类型" name="SettlementType" >
                            <Input onChange={onChange} />
                        </Form.Item>
                        <Form.Item label="信控日期类型" name="CreditControlDateType" >
                            <Input onChange={onChange} />
                        </Form.Item>
                        <Form.Item label="结算方式" name="SettlementMethod" >
                            <Input onChange={onChange} />
                        </Form.Item>
                        <Form.Item label="黑名单" name="Blacklist" >
                            <Select onChange={onChange} />
                        </Form.Item>
                        <Form.Item label="揽货类型" name="FreightType" >
                            <Input onChange={onChange} />
                        </Form.Item>
                        <Form.Item label="收支类型" name="RevenueExpenditureType" >
                            <Input onChange={onChange} />
                        </Form.Item>
                        <Form.Item label="账期" name="CreditPeriod" >
                            <Select onChange={onChange} />
                        </Form.Item>
                        <Form.Item label="额度" name="CreditLimit" >
                            <InputNumber onChange={(value)=>onNumberChange("CreditLimit", value as number)} />
                        </Form.Item>
                        <Form.Item label="信控额度" name="CreditControlLimit" >
                            <InputNumber onChange={(value)=>onNumberChange("CreditControlLimit", value as number)} />
                        </Form.Item>
                        <Form.Item label="信控币种" name="CreditCurrency" >
                            <Input onChange={onChange} />
                        </Form.Item>
                        <Form.Item label="30天(票)" name="Over30Days" >
                            <InputNumber onChange={(value)=>onNumberChange("Over30Days", value as number)} />
                        </Form.Item>
                        <Form.Item label="60天(票)" name="Over60Days" >
                            <InputNumber onChange={(value)=>onNumberChange("Over60Days", value as number)} />
                        </Form.Item>
                        <Form.Item label="90天(票)" name="Over90Days" >
                            <InputNumber onChange={(value)=>onNumberChange("Over90Days", value as number)} />
                        </Form.Item>
                        <Form.Item label="大于90天(票)" name="Over90PlusDays" >
                            <InputNumber onChange={(value)=>onNumberChange("Over90PlusDays", value as number)} />
                        </Form.Item>
                        <Form.Item label="来源" name="Source" >
                            <Input onChange={onChange} />
                        </Form.Item>
                        <Form.Item label="客户来源" name="CustomerSource" >
                            <Input onChange={onChange} />
                        </Form.Item>
                        <Form.Item label="客户接触渠道" name="CustomerContactChannel" >
                            <Input onChange={onChange} />
                        </Form.Item>
                        <Form.Item label="供应商负责人" name="SupplierResponsiblePerson" >
                            <Input onChange={onChange} />
                        </Form.Item>
                        <Form.Item label="客商类型" name="BusinessType" >
                            <Input onChange={onChange} />
                        </Form.Item>
                        <Form.Item label="地址" name="Address" >
                            <Input onChange={onChange} />
                        </Form.Item>
                        <Form.Item label="客户级别" name="CustomerLevel" >
                            <Input onChange={onChange} />
                        </Form.Item>
                        <Form.Item label="归属部门" name="AffiliationDepartment" >
                            <Input onChange={onChange} />
                        </Form.Item>
                        <Form.Item label="海外客服" name="OverseasCustomerService" >
                            <Input onChange={onChange} />
                        </Form.Item>
                        <Form.Item label="客户编码" name="CustomerCode" >
                            <Input onChange={onChange} />
                        </Form.Item>
                        <Form.Item label="供应商编码" name="SupplierCode" >
                            <Input onChange={onChange} />
                        </Form.Item>
                        <Form.Item label="信用账款附加说明" name="CreditAccountsReceivableRemarks" >
                            <Input onChange={onChange} />
                        </Form.Item>
                        <Form.Item label="供应商合同签约状态" name="SupplierContractStatus" >
                            <Input onChange={onChange} />
                        </Form.Item>
                        <Form.Item label="海外代理合同签约状态" name="OverseasAgentContractStatus" >
                            <Input onChange={onChange} />
                        </Form.Item>
                        <Form.Item label="其他合同签约状态" name="OtherContractStatus" >
                            <Input onChange={onChange} />
                        </Form.Item>
                        <Form.Item label="合同约号状态" name="ContractNumberStatus" >
                            <Input onChange={onChange} />
                        </Form.Item>
                        <Form.Item label="舱位承运人类型" name="CarriageType" >
                            <Input onChange={onChange} />
                        </Form.Item>
                        <Form.Item label="文件编号" name="DocumentNumber" >
                            <Input onChange={onChange} />
                        </Form.Item>
                        <Form.Item label="是否上传合同附件" name="IsContractAttachmentUploaded" >
                            <Select onChange={onChange} />
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
