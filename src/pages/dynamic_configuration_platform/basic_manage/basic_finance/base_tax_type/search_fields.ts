import { AdvancedSearchFormProps } from "@/components/search-form";
import i18n from '@/i18n';
import LocaleHelper from '@/utils/locale';
export const fields: AdvancedSearchFormProps["fields"] = [

    {
        type: 'input',
        label: i18n.t(LocaleHelper.getBaseTaxTypeTaxTypeCode()),
        key: 'TaxTypeCode',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getBaseTaxTypeTaxTypeName()),
        key: 'TaxTypeName',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getBaseTaxTypeTaxSystemName()),
        key: 'TaxSystemName',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getBaseTaxTypeCountryRegion()),
        key: 'CountryRegion',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getBaseTaxTypeTaxPeriod()),
        key: 'TaxPeriod',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getBaseTaxTypeTaxCurrency()),
        key: 'TaxCurrency',
    },
    {
        type: 'select',
        label: i18n.t(LocaleHelper.getBaseTaxTypePrecisionVal()),
        key: 'PrecisionVal',
        selectOptions: [{ value: '1', label: 'Value1' }, { value: '2', label: 'Value2' }, { value: '3', label: 'Value3' }]
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getBaseTaxTypeRoundingRule()),
        key: 'RoundingRule',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getBaseTaxTypeExchangeType()),
        key: 'ExchangeType',
    },
    {
        type: 'date',
        label: i18n.t(LocaleHelper.getBaseTaxTypeEffectiveDate()),
        key: 'EffectiveDate',
    },
    {
        type: 'date',
        label: i18n.t(LocaleHelper.getBaseTaxTypeExpiryDate()),
        key: 'ExpiryDate',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getBaseTaxTypeCreatedBy()),
        key: 'CreatedBy',
    },
    {
        type: 'date',
        label: i18n.t(LocaleHelper.getBaseTaxTypeCreatedTime()),
        key: 'CreatedTime',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getBaseTaxTypeStatus()),
        key: 'Status',
    },
    
]; 