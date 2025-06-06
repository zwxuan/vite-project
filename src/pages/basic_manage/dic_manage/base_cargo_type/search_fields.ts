import { AdvancedSearchFormProps } from "@/components/search-form";
import i18n from '@/i18n';
import LocaleHelper from '@/utils/locale';
export const fields: AdvancedSearchFormProps["fields"] = [

    {
        type: 'input',
        label: i18n.t(LocaleHelper.getBaseCargoTypeId()),
        key: 'Id',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getBaseCargoTypeEnglishName()),
        key: 'EnglishName',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getBaseCargoTypeChineseName()),
        key: 'ChineseName',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getBaseCargoTypeDescription()),
        key: 'Description',
    },
    {
        type: 'select',
        label: i18n.t(LocaleHelper.getBaseCargoTypeOceanUse()),
        key: 'OceanUse',
        selectOptions: [{ value: '1', label: 'Value1' }, { value: '2', label: 'Value2' }, { value: '3', label: 'Value3' }]
    },
    {
        type: 'select',
        label: i18n.t(LocaleHelper.getBaseCargoTypeAirUse()),
        key: 'AirUse',
        selectOptions: [{ value: '1', label: 'Value1' }, { value: '2', label: 'Value2' }, { value: '3', label: 'Value3' }]
    },
    {
        type: 'select',
        label: i18n.t(LocaleHelper.getBaseCargoTypeFbaOceanUse()),
        key: 'FbaOceanUse',
        selectOptions: [{ value: '1', label: 'Value1' }, { value: '2', label: 'Value2' }, { value: '3', label: 'Value3' }]
    },
    {
        type: 'select',
        label: i18n.t(LocaleHelper.getBaseCargoTypeFbaAirUse()),
        key: 'FbaAirUse',
        selectOptions: [{ value: '1', label: 'Value1' }, { value: '2', label: 'Value2' }, { value: '3', label: 'Value3' }]
    },
    {
        type: 'select',
        label: i18n.t(LocaleHelper.getBaseCargoTypeFbaRailUse()),
        key: 'FbaRailUse',
        selectOptions: [{ value: '1', label: 'Value1' }, { value: '2', label: 'Value2' }, { value: '3', label: 'Value3' }]
    },
    
]; 