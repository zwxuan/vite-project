import { AdvancedSearchFormProps } from "@/components/search-form";
import i18n from '@/i18n';
import LocaleHelper from '@/utils/locale';
export const fields: AdvancedSearchFormProps["fields"] = [

    {
        type: 'select',
        label: i18n.t(LocaleHelper.getBaseShipmentTypeShipmentTypeId()),
        key: 'ShipmentTypeId',
        selectOptions: [{ value: '1', label: 'Value1' }, { value: '2', label: 'Value2' }, { value: '3', label: 'Value3' }]
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getBaseShipmentTypeShipmentTypeName()),
        key: 'ShipmentTypeName',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getBaseShipmentTypeShipmentTypeMeaning()),
        key: 'ShipmentTypeMeaning',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getBaseShipmentTypeApplicableScenario()),
        key: 'ApplicableScenario',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getBaseShipmentTypeAdvantage()),
        key: 'Advantage',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getBaseShipmentTypeDisadvantage()),
        key: 'Disadvantage',
    },
    
]; 