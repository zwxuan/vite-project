import { AdvancedSearchFormProps } from "@/components/search-form";
import i18n from '@/i18n';
import LocaleHelper from '@/utils/locale';
export const fields: AdvancedSearchFormProps["fields"] = [

    {
        type: 'input',
        label: i18n.t(LocaleHelper.getBaseTradeLanesGroupingLaneGroupingCode()),
        key: 'LaneGroupingCode',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getBaseTradeLanesGroupingLaneGroupingNameCn()),
        key: 'LaneGroupingNameCn',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getBaseTradeLanesGroupingLaneGroupingNameEn()),
        key: 'LaneGroupingNameEn',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getBaseTradeLanesGroupingLaneGroupingManager()),
        key: 'LaneGroupingManager',
    },
    
]; 