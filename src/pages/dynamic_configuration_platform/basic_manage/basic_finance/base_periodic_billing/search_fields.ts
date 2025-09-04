import { AdvancedSearchFormProps } from "@/components/search-form";
import i18n from '@/i18n';
import LocaleHelper from '@/utils/locale';
export const fields: AdvancedSearchFormProps["fields"] = [

    {
        type: 'input',
        label: i18n.t(LocaleHelper.getBasePeriodicBillingCode()),
        key: 'Code',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getBasePeriodicBillingEnName()),
        key: 'EnName',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getBasePeriodicBillingCnName()),
        key: 'CnName',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getBasePeriodicBillingMeaning()),
        key: 'Meaning',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getBasePeriodicBillingScenario()),
        key: 'Scenario',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getBasePeriodicBillingAdvantage()),
        key: 'Advantage',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getBasePeriodicBillingDisadvantage()),
        key: 'Disadvantage',
    },
    
]; 