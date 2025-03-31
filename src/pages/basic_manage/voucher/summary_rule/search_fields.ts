import { AdvancedSearchFormProps } from "@/components/search-form";
import i18n from '@/i18n';
import LocaleHelper from '@/utils/locale';
export const fields: AdvancedSearchFormProps["fields"] = [

    {
        type: 'input',
        label: i18n.t(LocaleHelper.getSummaryRuleSummaryRuleCode()),
        key: 'SummaryRuleCode',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getSummaryRuleBookName()),
        key: 'BookName',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getSummaryRuleRuleName()),
        key: 'RuleName',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getSummaryRuleEntryName()),
        key: 'EntryName',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getSummaryRuleGroupBy()),
        key: 'GroupBy',
    },
    
]; 