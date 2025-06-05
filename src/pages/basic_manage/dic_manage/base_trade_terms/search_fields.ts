import { AdvancedSearchFormProps } from "@/components/search-form";
import i18n from '@/i18n';
import LocaleHelper from '@/utils/locale';
export const fields: AdvancedSearchFormProps["fields"] = [

    {
        type: 'input',
        label: i18n.t(LocaleHelper.getBaseTradeTermsCode()),
        key: 'Code',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getBaseTradeTermsEnglishName()),
        key: 'EnglishName',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getBaseTradeTermsChineseName()),
        key: 'ChineseName',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getBaseTradeTermsMeaning()),
        key: 'Meaning',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getBaseTradeTermsApplicableScenario()),
        key: 'ApplicableScenario',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getBaseTradeTermsAdvantage()),
        key: 'Advantage',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getBaseTradeTermsDisadvantage()),
        key: 'Disadvantage',
    },
    
]; 