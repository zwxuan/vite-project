import { AdvancedSearchFormProps } from "@/components/search-form";
import i18n from '@/i18n';
import LocaleHelper from '@/utils/locale';
export const fields: AdvancedSearchFormProps["fields"] = [

    {
        type: 'input',
        label: i18n.t(LocaleHelper.getVoucherGroupingRuleRuleCode()),
        key: 'RuleCode',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getVoucherGroupingRuleBookCode()),
        key: 'BookCode',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getVoucherGroupingRuleRuleName()),
        key: 'RuleName',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getVoucherGroupingRuleGroupBy()),
        key: 'GroupBy',
    },
    
]; 