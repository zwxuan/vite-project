import { AdvancedSearchFormProps } from "@/components/search-form";
import i18n from '@/i18n';
import LocaleHelper from '@/utils/locale';
export const fields: AdvancedSearchFormProps["fields"] = [

    {
        type: 'input',
        label: i18n.t(LocaleHelper.getBaseTaxRateTaxRateCode()),
        key: 'TaxRateCode',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getBaseTaxRateTaxRateDescription()),
        key: 'TaxRateDescription',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getBaseTaxRateTaxSystem()),
        key: 'TaxSystem',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getBaseTaxRateTaxType()),
        key: 'TaxType',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getBaseTaxRateCountryRegion()),
        key: 'CountryRegion',
    },
    {
        type: 'select',
        label: i18n.t(LocaleHelper.getBaseTaxRatePrecision()),
        key: 'Precision',
        selectOptions: [{ value: '1', label: 'Value1' }, { value: '2', label: 'Value2' }, { value: '3', label: 'Value3' }]
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getBaseTaxRateRoundingRule()),
        key: 'RoundingRule',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getBaseTaxRateTaxRateValue()),
        key: 'TaxRateValue',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getBaseTaxRateCurrency()),
        key: 'Currency',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getBaseTaxRateUnit()),
        key: 'Unit',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getBaseTaxRateStatus()),
        key: 'Status',
    },
    {
        type: 'date',
        label: i18n.t(LocaleHelper.getBaseTaxRateCreationDate()),
        key: 'CreationDate',
    },
    
]; 