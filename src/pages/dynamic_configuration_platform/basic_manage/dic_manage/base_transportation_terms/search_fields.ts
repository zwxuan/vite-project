import { AdvancedSearchFormProps } from "@/components/search-form";
import i18n from '@/i18n';
import LocaleHelper from '@/utils/locale';
export const fields: AdvancedSearchFormProps["fields"] = [

    {
        type: 'input',
        label: i18n.t(LocaleHelper.getBaseTransportationTermsCode()),
        key: 'Code',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getBaseTransportationTermsEnglishName()),
        key: 'EnglishName',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getBaseTransportationTermsChineseName()),
        key: 'ChineseName',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getBaseTransportationTermsMeaning()),
        key: 'Meaning',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getBaseTransportationTermsApplicableScenarios()),
        key: 'ApplicableScenarios',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getBaseTransportationTermsAdvantages()),
        key: 'Advantages',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getBaseTransportationTermsDisadvantages()),
        key: 'Disadvantages',
    },
    
]; 