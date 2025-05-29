import { AdvancedSearchFormProps } from "@/components/search-form";
import i18n from '@/i18n';
import LocaleHelper from '@/utils/locale';
export const fields: AdvancedSearchFormProps["fields"] = [

    {
        type: 'input',
        label: i18n.t(LocaleHelper.getBaseExchangeRatePurposeCurrency()),
        key: 'PurposeCurrency',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getBaseExchangeRateExchangeRateType()),
        key: 'ExchangeRateType',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getBaseExchangeRateSourceCurrency()),
        key: 'SourceCurrency',
    },
    {
        type: 'date',
        label: i18n.t(LocaleHelper.getBaseExchangeRateQuotationDate()),
        key: 'QuotationDate',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getBaseExchangeRateDirectExchangeRate()),
        key: 'DirectExchangeRate',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getBaseExchangeRateIndirectExchangeRate()),
        key: 'IndirectExchangeRate',
    },
    
]; 