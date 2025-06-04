import { AdvancedSearchFormProps } from "@/components/search-form";
import i18n from '@/i18n';
import LocaleHelper from '@/utils/locale';
export const fields: AdvancedSearchFormProps["fields"] = [

    {
        type: 'input',
        label: i18n.t(LocaleHelper.getBaseTradeLanesLaneCode()),
        key: 'LaneCode',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getBaseTradeLanesLaneNameCn()),
        key: 'LaneNameCn',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getBaseTradeLanesLaneNameEn()),
        key: 'LaneNameEn',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getBaseTradeLanesLaneManager()),
        key: 'LaneManager',
    },
    
]; 