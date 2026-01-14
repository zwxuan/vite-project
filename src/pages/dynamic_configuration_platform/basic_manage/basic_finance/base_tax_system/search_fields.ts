import { AdvancedSearchFormProps } from "@/components/search-form";
import i18n from '@/i18n';
import LocaleHelper from '@/utils/locale';
export const fields: AdvancedSearchFormProps["fields"] = [

    {
        type: 'input',
        label: i18n.t(LocaleHelper.getBaseTaxSystemTaxSystemCode()),
        key: 'TaxSystemCode',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getBaseTaxSystemTaxSystemName()),
        key: 'TaxSystemName',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getBaseTaxSystemCountryRegion()),
        key: 'CountryRegion',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getBaseTaxSystemTaxLevel()),
        key: 'TaxLevel',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getBaseTaxSystemDefaultTaxCurrency()),
        key: 'DefaultTaxCurrency',
    },
    {
        type: 'select',
        label: i18n.t(LocaleHelper.getBaseTaxSystemDefaultPrecision()),
        key: 'DefaultPrecision',
        selectOptions: [{ value: '1', label: 'Value1' }, { value: '2', label: 'Value2' }, { value: '3', label: 'Value3' }]
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getBaseTaxSystemDefaultRoundingRule()),
        key: 'DefaultRoundingRule',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getBaseTaxSystemDefaultExchangeType()),
        key: 'DefaultExchangeType',
    },
    {
        type: 'date',
        label: i18n.t(LocaleHelper.getBaseTaxSystemEffectiveDate()),
        key: 'EffectiveDate',
    },
    {
        type: 'date',
        label: i18n.t(LocaleHelper.getBaseTaxSystemExpiryDate()),
        key: 'ExpiryDate',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getBaseTaxSystemStatus()),
        key: 'Status',
    },
    
]; 