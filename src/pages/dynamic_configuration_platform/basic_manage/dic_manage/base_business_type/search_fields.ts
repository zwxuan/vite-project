import { AdvancedSearchFormProps } from "@/components/search-form";
import i18n from '@/i18n';
import LocaleHelper from '@/utils/locale';
export const fields: AdvancedSearchFormProps["fields"] = [

    {
        type: 'input',
        label: i18n.t(LocaleHelper.getBaseBusinessTypeBusinessTypeCode()),
        key: 'BusinessTypeCode',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getBaseBusinessTypeBusinessTypeName()),
        key: 'BusinessTypeName',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getBaseBusinessTypeBusinessTypeMeaning()),
        key: 'BusinessTypeMeaning',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getBaseBusinessTypeApplicableScenario()),
        key: 'ApplicableScenario',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getBaseBusinessTypeAdvantage()),
        key: 'Advantage',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getBaseBusinessTypeDisadvantage()),
        key: 'Disadvantage',
    },
    
]; 