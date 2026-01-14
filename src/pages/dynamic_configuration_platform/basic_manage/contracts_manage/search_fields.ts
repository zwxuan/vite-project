import { AdvancedSearchFormProps } from "@/components/search-form";
import i18n from '@/i18n';
import LocaleHelper from '@/utils/locale';
export const fields: AdvancedSearchFormProps["fields"] = [

    {
        type: 'input',
        label: i18n.t(LocaleHelper.getContractsManageContractId()),
        key: 'ContractId',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getContractsManagePartner()),
        key: 'Partner',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getContractsManageCustomerLevel()),
        key: 'CustomerLevel',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getContractsManageAuditStatus()),
        key: 'AuditStatus',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getContractsManageContractStatus()),
        key: 'ContractStatus',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getContractsManageContractType()),
        key: 'ContractType',
    },
    {
        type: 'date',
        label: i18n.t(LocaleHelper.getContractsManageEffectiveDate()),
        key: 'EffectiveDate',
    },
    {
        type: 'date',
        label: i18n.t(LocaleHelper.getContractsManageExpirationDate()),
        key: 'ExpirationDate',
    },
    {
        type: 'select',
        label: i18n.t(LocaleHelper.getContractsManageAttachmentCount()),
        key: 'AttachmentCount',
        selectOptions: [{ value: '1', label: 'Value1' }, { value: '2', label: 'Value2' }, { value: '3', label: 'Value3' }]
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getContractsManageOperator()),
        key: 'Operator',
    },
    {
        type: 'date',
        label: i18n.t(LocaleHelper.getContractsManageOperationDate()),
        key: 'OperationDate',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getContractsManageContractAgreement()),
        key: 'ContractAgreement',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getContractsManageLogRecord()),
        key: 'LogRecord',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getContractsManageCreditLimit()),
        key: 'CreditLimit',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getContractsManageCreditCurrency()),
        key: 'CreditCurrency',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getContractsManageDateType()),
        key: 'DateType',
    },
    {
        type: 'select',
        label: i18n.t(LocaleHelper.getContractsManagePaymentCycle()),
        key: 'PaymentCycle',
        selectOptions: [{ value: '1', label: 'Value1' }, { value: '2', label: 'Value2' }, { value: '3', label: 'Value3' }]
    },
    {
        type: 'select',
        label: i18n.t(LocaleHelper.getContractsManageIsExtension()),
        key: 'IsExtension',
        selectOptions: [{ value: '1', label: 'Value1' }, { value: '2', label: 'Value2' }, { value: '3', label: 'Value3' }]
    },
    {
        type: 'select',
        label: i18n.t(LocaleHelper.getContractsManageExtensionPeriod()),
        key: 'ExtensionPeriod',
        selectOptions: [{ value: '1', label: 'Value1' }, { value: '2', label: 'Value2' }, { value: '3', label: 'Value3' }]
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getContractsManageRemarks()),
        key: 'Remarks',
    },
    {
        type: 'select',
        label: i18n.t(LocaleHelper.getContractsManageIsShippingChapterUploaded()),
        key: 'IsShippingChapterUploaded',
        selectOptions: [{ value: '1', label: 'Value1' }, { value: '2', label: 'Value2' }, { value: '3', label: 'Value3' }]
    },
    {
        type: 'select',
        label: i18n.t(LocaleHelper.getContractsManageIsContractUploaded()),
        key: 'IsContractUploaded',
        selectOptions: [{ value: '1', label: 'Value1' }, { value: '2', label: 'Value2' }, { value: '3', label: 'Value3' }]
    },
    {
        type: 'select',
        label: i18n.t(LocaleHelper.getContractsManageIsNeedUpdate()),
        key: 'IsNeedUpdate',
        selectOptions: [{ value: '1', label: 'Value1' }, { value: '2', label: 'Value2' }, { value: '3', label: 'Value3' }]
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getContractsManageCompanyBranch()),
        key: 'CompanyBranch',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getContractsManageSalesRep()),
        key: 'SalesRep',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getContractsManageSettlementMethod()),
        key: 'SettlementMethod',
    },
    
]; 