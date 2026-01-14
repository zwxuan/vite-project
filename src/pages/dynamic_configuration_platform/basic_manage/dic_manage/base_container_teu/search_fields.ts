import { AdvancedSearchFormProps } from "@/components/search-form";
import i18n from '@/i18n';
import LocaleHelper from '@/utils/locale';
export const fields: AdvancedSearchFormProps["fields"] = [

    {
        type: 'input',
        label: i18n.t(LocaleHelper.getBaseContainerTeuContainerCode()),
        key: 'ContainerCode',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getBaseContainerTeuContainerSize()),
        key: 'ContainerSize',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getBaseContainerTeuContainerType()),
        key: 'ContainerType',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getBaseContainerTeuExchangeCode()),
        key: 'ExchangeCode',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getBaseContainerTeuIsoCode()),
        key: 'IsoCode',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getBaseContainerTeuTeuValue()),
        key: 'TeuValue',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getBaseContainerTeuUpdatedBy()),
        key: 'UpdatedBy',
    },
    {
        type: 'date',
        label: i18n.t(LocaleHelper.getBaseContainerTeuUpdatedTime()),
        key: 'UpdatedTime',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getBaseContainerTeuCreatedBy()),
        key: 'CreatedBy',
    },
    {
        type: 'date',
        label: i18n.t(LocaleHelper.getBaseContainerTeuCreatedTime()),
        key: 'CreatedTime',
    },
    
]; 