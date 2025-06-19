import { AdvancedSearchFormProps } from "@/components/search-form";
import i18n from '@/i18n';
import LocaleHelper from '@/utils/locale';
export const fields: AdvancedSearchFormProps["fields"] = [

    {
        type: 'input',
        label: i18n.t(LocaleHelper.getInternalAgentSettlementId()),
        key: 'Id',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getInternalAgentSettlementSettlementNumber()),
        key: 'SettlementNumber',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getInternalAgentSettlementOrderNumber()),
        key: 'OrderNumber',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getInternalAgentSettlementServiceNumber()),
        key: 'ServiceNumber',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getInternalAgentSettlementCostId()),
        key: 'CostId',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getInternalAgentSettlementCostName()),
        key: 'CostName',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getInternalAgentSettlementCurrency()),
        key: 'Currency',
    },
    {
        type: 'select',
        label: i18n.t(LocaleHelper.getInternalAgentSettlementDomesticToHk()),
        key: 'DomesticToHk',
        selectOptions: [{ value: '1', label: 'Value1' }, { value: '2', label: 'Value2' }, { value: '3', label: 'Value3' }]
    },
    {
        type: 'select',
        label: i18n.t(LocaleHelper.getInternalAgentSettlementHkReceiveDomestic()),
        key: 'HkReceiveDomestic',
        selectOptions: [{ value: '1', label: 'Value1' }, { value: '2', label: 'Value2' }, { value: '3', label: 'Value3' }]
    },
    {
        type: 'select',
        label: i18n.t(LocaleHelper.getInternalAgentSettlementHkAgentPayment()),
        key: 'HkAgentPayment',
        selectOptions: [{ value: '1', label: 'Value1' }, { value: '2', label: 'Value2' }, { value: '3', label: 'Value3' }]
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getInternalAgentSettlementStatus()),
        key: 'Status',
    },
    
]; 