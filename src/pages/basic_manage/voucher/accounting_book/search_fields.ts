import { AdvancedSearchFormProps } from "@/components/search-form";
import i18n from '@/i18n';
import LocaleHelper from '@/utils/locale';
export const fields: AdvancedSearchFormProps["fields"] = [

    {
        type: 'select',
        label: i18n.t(LocaleHelper.getAccountingBookBookId()),
        key: 'BookId',
        selectOptions: [{ value: '1', label: 'Value1' }, { value: '2', label: 'Value2' }, { value: '3', label: 'Value3' }]
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getAccountingBookCompanyCode()),
        key: 'CompanyCode',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getAccountingBookCompanyName()),
        key: 'CompanyName',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getAccountingBookBookCode()),
        key: 'BookCode',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getAccountingBookBookName()),
        key: 'BookName',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getAccountingBookFiscalYear()),
        key: 'FiscalYear',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getAccountingBookCurrency()),
        key: 'Currency',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getAccountingBookThirdSystemName()),
        key: 'ThirdSystemName',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getAccountingBookApiRemark()),
        key: 'ApiRemark',
    },
    {
        type: 'select',
        label: i18n.t(LocaleHelper.getAccountingBookIsActive()),
        key: 'IsActive',
        selectOptions: [{ value: '1', label: 'Value1' }, { value: '2', label: 'Value2' }, { value: '3', label: 'Value3' }]
    },
    {
        type: 'date',
        label: i18n.t(LocaleHelper.getAccountingBookCreatedAt()),
        key: 'CreatedAt',
    },
    {
        type: 'date',
        label: i18n.t(LocaleHelper.getAccountingBookUpdatedAt()),
        key: 'UpdatedAt',
    },
    
]; 