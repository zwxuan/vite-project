import { AdvancedSearchFormProps } from "@/components/search-form";
import i18n from '@/i18n';
import LocaleHelper from '@/utils/locale';
export const fields: AdvancedSearchFormProps["fields"] = [

    {
        type: 'input',
        label: i18n.t(LocaleHelper.getBaseBillTermsCode()),
        key: 'Code',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getBaseBillTermsName()),
        key: 'Name',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getBaseBillTermsLocalName()),
        key: 'LocalName',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getBaseBillTermsExchangeCode()),
        key: 'ExchangeCode',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getBaseBillTermsIsoCode()),
        key: 'IsoCode',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getBaseBillTermsBillType()),
        key: 'BillType',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getBaseBillTermsRemarks()),
        key: 'Remarks',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getBaseBillTermsReleaseType()),
        key: 'ReleaseType',
    },
    
]; 