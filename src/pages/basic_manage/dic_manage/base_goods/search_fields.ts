import { AdvancedSearchFormProps } from "@/components/search-form";
import i18n from '@/i18n';
import LocaleHelper from '@/utils/locale';
export const fields: AdvancedSearchFormProps["fields"] = [

    {
        type: 'input',
        label: i18n.t(LocaleHelper.getBaseGoodsGoodsCode()),
        key: 'GoodsCode',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getBaseGoodsGoodsName()),
        key: 'GoodsName',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getBaseGoodsMostFavoredNationRate()),
        key: 'MostFavoredNationRate',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getBaseGoodsOrdinaryRate()),
        key: 'OrdinaryRate',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getBaseGoodsValueAddedTax()),
        key: 'ValueAddedTax',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getBaseGoodsLegalUnit()),
        key: 'LegalUnit',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getBaseGoodsEnglishGoodsName()),
        key: 'EnglishGoodsName',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getBaseGoodsSecondUnit()),
        key: 'SecondUnit',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getBaseGoodsRegulatoryMode()),
        key: 'RegulatoryMode',
    },
    
]; 