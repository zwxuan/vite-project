import { AdvancedSearchFormProps } from "@/components/search-form";
import i18n from '@/i18n';
import LocaleHelper from '@/utils/locale';
export const fields: AdvancedSearchFormProps["fields"] = [

    {
        type: 'select',
        label: i18n.t(LocaleHelper.getChargingStandardId()),
        key: 'Id',
        selectOptions: [{ value: '1', label: 'Value1' }, { value: '2', label: 'Value2' }, { value: '3', label: 'Value3' }]
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getChargingStandardPaymentMethod()),
        key: 'PaymentMethod',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getChargingStandardFeeName()),
        key: 'FeeName',
    },
    {
        type: 'select',
        label: i18n.t(LocaleHelper.getChargingStandardIsControlled()),
        key: 'IsControlled',
        selectOptions: [{ value: '1', label: 'Value1' }, { value: '2', label: 'Value2' }, { value: '3', label: 'Value3' }]
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getChargingStandardSettlementUnitType()),
        key: 'SettlementUnitType',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getChargingStandardFixedSettlementUnit()),
        key: 'FixedSettlementUnit',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getChargingStandardCurrency()),
        key: 'Currency',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getChargingStandardCity()),
        key: 'City',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getChargingStandardBillingUnit()),
        key: 'BillingUnit',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getChargingStandardValueLowerLimit()),
        key: 'ValueLowerLimit',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getChargingStandardValueUpperLimit()),
        key: 'ValueUpperLimit',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getChargingStandardContainerType()),
        key: 'ContainerType',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getChargingStandardContainerCategory()),
        key: 'ContainerCategory',
    },
    {
        type: 'select',
        label: i18n.t(LocaleHelper.getChargingStandardQuantity()),
        key: 'Quantity',
        selectOptions: [{ value: '1', label: 'Value1' }, { value: '2', label: 'Value2' }, { value: '3', label: 'Value3' }]
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getChargingStandardBillingUnitPrice()),
        key: 'BillingUnitPrice',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getChargingStandardUnitPrice()),
        key: 'UnitPrice',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getChargingStandardMinimumCharge()),
        key: 'MinimumCharge',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getChargingStandardTaxRate()),
        key: 'TaxRate',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getChargingStandardRemarks()),
        key: 'Remarks',
    },
    {
        type: 'select',
        label: i18n.t(LocaleHelper.getChargingStandardRequiresInvoice()),
        key: 'RequiresInvoice',
        selectOptions: [{ value: '1', label: 'Value1' }, { value: '2', label: 'Value2' }, { value: '3', label: 'Value3' }]
    },
    
]; 