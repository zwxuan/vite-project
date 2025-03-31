import { AdvancedSearchFormProps } from "@/components/search-form";
import i18n from '@/i18n';
import LocaleHelper from '@/utils/locale';
export const fields: AdvancedSearchFormProps["fields"] = [

    {
        type: 'input',
        label: i18n.t(LocaleHelper.getEntryGroupingRuleEntryId()),
        key: 'EntryId',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getEntryGroupingRuleBookName()),
        key: 'BookName',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getEntryGroupingRuleRuleName()),
        key: 'RuleName',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getEntryGroupingRuleEntryName()),
        key: 'EntryName',
    },
    {
        type: 'date',
        label: i18n.t(LocaleHelper.getEntryGroupingRuleCreatedAt()),
        key: 'CreatedAt',
    },
    {
        type: 'date',
        label: i18n.t(LocaleHelper.getEntryGroupingRuleUpdatedAt()),
        key: 'UpdatedAt',
    },
    
]; 