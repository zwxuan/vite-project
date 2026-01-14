import { AdvancedSearchFormProps } from "@/components/search-form";
import i18n from '@/i18n';
import LocaleHelper from '@/utils/locale';
export const fields: AdvancedSearchFormProps["fields"] = [

    {
        type: 'input',
        label: i18n.t(LocaleHelper.getBaseSettlementCycleCode()),
        key: 'Code',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getBaseSettlementCycleEnName()),
        key: 'EnName',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getBaseSettlementCycleCnName()),
        key: 'CnName',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getBaseSettlementCycleMeaning()),
        key: 'Meaning',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getBaseSettlementCycleScenario()),
        key: 'Scenario',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getBaseSettlementCycleAdvantage()),
        key: 'Advantage',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getBaseSettlementCycleDisadvantage()),
        key: 'Disadvantage',
    },
    
]; 