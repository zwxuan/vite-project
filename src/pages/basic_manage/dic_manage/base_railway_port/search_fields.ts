import { AdvancedSearchFormProps } from "@/components/search-form";
import i18n from '@/i18n';
import LocaleHelper from '@/utils/locale';
export const fields: AdvancedSearchFormProps["fields"] = [

    {
        type: 'input',
        label: i18n.t(LocaleHelper.getBaseRailwayPortCountryId()),
        key: 'CountryId',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getBaseRailwayPortStationId()),
        key: 'StationId',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getBaseRailwayPortStationNameCn()),
        key: 'StationNameCn',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getBaseRailwayPortStationNameEn()),
        key: 'StationNameEn',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getBaseRailwayPortCountryCn()),
        key: 'CountryCn',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getBaseRailwayPortCountryEn()),
        key: 'CountryEn',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getBaseRailwayPortContinentCn()),
        key: 'ContinentCn',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getBaseRailwayPortContinentEn()),
        key: 'ContinentEn',
    },
    
]; 