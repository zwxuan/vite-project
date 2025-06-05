import { AdvancedSearchFormProps } from "@/components/search-form";
import i18n from '@/i18n';
import LocaleHelper from '@/utils/locale';
export const fields: AdvancedSearchFormProps["fields"] = [

    {
        type: 'input',
        label: i18n.t(LocaleHelper.getBaseFreightTermsCode()),
        key: 'Code',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getBaseFreightTermsEnglishName()),
        key: 'EnglishName',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getBaseFreightTermsChineseName()),
        key: 'ChineseName',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getBaseFreightTermsMeaning()),
        key: 'Meaning',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getBaseFreightTermsApplicableScenarios()),
        key: 'ApplicableScenarios',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getBaseFreightTermsAdvantages()),
        key: 'Advantages',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getBaseFreightTermsDisadvantages()),
        key: 'Disadvantages',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getBaseFreightTermsExchangeCode()),
        key: 'ExchangeCode',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getBaseFreightTermsIsoCode()),
        key: 'IsoCode',
    },
    
]; 