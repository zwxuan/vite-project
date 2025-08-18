import { AdvancedSearchFormProps } from "@/components/search-form";
import i18n from '@/i18n';
import LocaleHelper from '@/utils/locale';
export const fields: AdvancedSearchFormProps["fields"] = [

    {
        type: 'input',
        label: i18n.t(LocaleHelper.getBaseBankBranchBankBranchCode()),
        key: 'BankBranchCode',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getBaseBankBranchBankBranchName()),
        key: 'BankBranchName',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getBaseBankBranchBankType()),
        key: 'BankType',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getBaseBankBranchBankUnionCode()),
        key: 'BankUnionCode',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getBaseBankBranchStatus()),
        key: 'Status',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getBaseBankBranchDetailAddress()),
        key: 'DetailAddress',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getBaseBankBranchSwiftCode()),
        key: 'SwiftCode',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getBaseBankBranchIban()),
        key: 'Iban',
    },
    
]; 