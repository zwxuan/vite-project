import { AdvancedSearchFormProps } from "@/components/search-form";
import i18n from '@/i18n';
import LocaleHelper from '@/utils/locale';
export const fields: AdvancedSearchFormProps["fields"] = [

    {
        type: 'input',
        label: i18n.t(LocaleHelper.getBusinessPartnerId()),
        key: 'Id',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getBusinessPartnerAbbreviatedName()),
        key: 'AbbreviatedName',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getBusinessPartnerCode()),
        key: 'Code',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getBusinessPartnerCountryRegion()),
        key: 'CountryRegion',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getBusinessPartnerChineseName()),
        key: 'ChineseName',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getBusinessPartnerEnglishName()),
        key: 'EnglishName',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getBusinessPartnerCustomerContractStatus()),
        key: 'CustomerContractStatus',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getBusinessPartnerAdditionalRemarks()),
        key: 'AdditionalRemarks',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getBusinessPartnerBranchCompany()),
        key: 'BranchCompany',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getBusinessPartnerAuditStatus()),
        key: 'AuditStatus',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getBusinessPartnerRejectionReason()),
        key: 'RejectionReason',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getBusinessPartnerAuditor()),
        key: 'Auditor',
    },
    {
        type: 'date',
        label: i18n.t(LocaleHelper.getBusinessPartnerAuditDate()),
        key: 'AuditDate',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getBusinessPartnerCreator()),
        key: 'Creator',
    },
    {
        type: 'date',
        label: i18n.t(LocaleHelper.getBusinessPartnerCreationDate()),
        key: 'CreationDate',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getBusinessPartnerModifier()),
        key: 'Modifier',
    },
    {
        type: 'date',
        label: i18n.t(LocaleHelper.getBusinessPartnerModificationDate()),
        key: 'ModificationDate',
    },
    {
        type: 'select',
        label: i18n.t(LocaleHelper.getBusinessPartnerIsActive()),
        key: 'IsActive',
        selectOptions: [{ value: '1', label: 'Value1' }, { value: '2', label: 'Value2' }, { value: '3', label: 'Value3' }]
    },
    {
        type: 'select',
        label: i18n.t(LocaleHelper.getBusinessPartnerECommerceCustomer()),
        key: 'ECommerceCustomer',
        selectOptions: [{ value: '1', label: 'Value1' }, { value: '2', label: 'Value2' }, { value: '3', label: 'Value3' }]
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getBusinessPartnerSales()),
        key: 'Sales',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getBusinessPartnerSettlementType()),
        key: 'SettlementType',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getBusinessPartnerCreditControlDateType()),
        key: 'CreditControlDateType',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getBusinessPartnerSettlementMethod()),
        key: 'SettlementMethod',
    },
    {
        type: 'select',
        label: i18n.t(LocaleHelper.getBusinessPartnerBlacklist()),
        key: 'Blacklist',
        selectOptions: [{ value: '1', label: 'Value1' }, { value: '2', label: 'Value2' }, { value: '3', label: 'Value3' }]
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getBusinessPartnerFreightType()),
        key: 'FreightType',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getBusinessPartnerRevenueExpenditureType()),
        key: 'RevenueExpenditureType',
    },
    {
        type: 'select',
        label: i18n.t(LocaleHelper.getBusinessPartnerCreditPeriod()),
        key: 'CreditPeriod',
        selectOptions: [{ value: '1', label: 'Value1' }, { value: '2', label: 'Value2' }, { value: '3', label: 'Value3' }]
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getBusinessPartnerCreditLimit()),
        key: 'CreditLimit',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getBusinessPartnerCreditControlLimit()),
        key: 'CreditControlLimit',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getBusinessPartnerCreditCurrency()),
        key: 'CreditCurrency',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getBusinessPartnerOver30Days()),
        key: 'Over30Days',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getBusinessPartnerOver60Days()),
        key: 'Over60Days',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getBusinessPartnerOver90Days()),
        key: 'Over90Days',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getBusinessPartnerOver90PlusDays()),
        key: 'Over90PlusDays',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getBusinessPartnerSource()),
        key: 'Source',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getBusinessPartnerCustomerSource()),
        key: 'CustomerSource',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getBusinessPartnerCustomerContactChannel()),
        key: 'CustomerContactChannel',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getBusinessPartnerSupplierResponsiblePerson()),
        key: 'SupplierResponsiblePerson',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getBusinessPartnerBusinessType()),
        key: 'BusinessType',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getBusinessPartnerAddress()),
        key: 'Address',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getBusinessPartnerCustomerLevel()),
        key: 'CustomerLevel',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getBusinessPartnerAffiliationDepartment()),
        key: 'AffiliationDepartment',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getBusinessPartnerOverseasCustomerService()),
        key: 'OverseasCustomerService',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getBusinessPartnerCustomerCode()),
        key: 'CustomerCode',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getBusinessPartnerSupplierCode()),
        key: 'SupplierCode',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getBusinessPartnerCreditAccountsReceivableRemarks()),
        key: 'CreditAccountsReceivableRemarks',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getBusinessPartnerSupplierContractStatus()),
        key: 'SupplierContractStatus',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getBusinessPartnerOverseasAgentContractStatus()),
        key: 'OverseasAgentContractStatus',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getBusinessPartnerOtherContractStatus()),
        key: 'OtherContractStatus',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getBusinessPartnerContractNumberStatus()),
        key: 'ContractNumberStatus',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getBusinessPartnerCarriageType()),
        key: 'CarriageType',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getBusinessPartnerDocumentNumber()),
        key: 'DocumentNumber',
    },
    {
        type: 'select',
        label: i18n.t(LocaleHelper.getBusinessPartnerIsContractAttachmentUploaded()),
        key: 'IsContractAttachmentUploaded',
        selectOptions: [{ value: '1', label: 'Value1' }, { value: '2', label: 'Value2' }, { value: '3', label: 'Value3' }]
    },
    
]; 