import { AdvancedSearchFormProps } from "@/components/search-form";
import i18n from '@/i18n';
import LocaleHelper from '@/utils/locale';
export const fields: AdvancedSearchFormProps["fields"] = [

    {
        type: 'input',
        label: i18n.t(LocaleHelper.getBaseSettlementMethodCode()),
        key: 'Code',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getBaseSettlementMethodSettlementMethodCn()),
        key: 'SettlementMethodCn',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getBaseSettlementMethodSettlementMethodEn()),
        key: 'SettlementMethodEn',
    },
    {
        type: 'select',
        label: i18n.t(LocaleHelper.getBaseSettlementMethodEnabledStatus()),
        key: 'EnabledStatus',
        selectOptions: [{ value: '1', label: 'Value1' }, { value: '2', label: 'Value2' }, { value: '3', label: 'Value3' }]
    },
    {
        type: 'select',
        label: i18n.t(LocaleHelper.getBaseSettlementMethodIsDefault()),
        key: 'IsDefault',
        selectOptions: [{ value: '1', label: 'Value1' }, { value: '2', label: 'Value2' }, { value: '3', label: 'Value3' }]
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getBaseSettlementMethodApplicableScenario()),
        key: 'ApplicableScenario',
    },
    
]; 