import { AdvancedSearchFormProps } from "@/components/search-form";
import i18n from '@/i18n';
import LocaleHelper from '@/utils/locale';
export const fields: AdvancedSearchFormProps["fields"] = [

    {
        type: 'input',
        label: i18n.t(LocaleHelper.getSetFeeScheduleBusinessType()),
        key: 'BusinessType',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getSetFeeSchedulePlanName()),
        key: 'PlanName',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getSetFeeScheduleClient()),
        key: 'Client',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getSetFeeScheduleCarrier()),
        key: 'Carrier',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getSetFeeScheduleBookingAgent()),
        key: 'BookingAgent',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getSetFeeScheduleCargoType()),
        key: 'CargoType',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getSetFeeScheduleLclFclType()),
        key: 'LclFclType',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getSetFeeScheduleRouteRegion()),
        key: 'RouteRegion',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getSetFeeScheduleInputPerson()),
        key: 'InputPerson',
    },
    {
        type: 'date',
        label: i18n.t(LocaleHelper.getSetFeeScheduleInputDate()),
        key: 'InputDate',
    },
    {
        type: 'date',
        label: i18n.t(LocaleHelper.getSetFeeScheduleEffectiveDate()),
        key: 'EffectiveDate',
    },
    {
        type: 'date',
        label: i18n.t(LocaleHelper.getSetFeeScheduleExpirationDate()),
        key: 'ExpirationDate',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getSetFeeScheduleAuditStatus()),
        key: 'AuditStatus',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getSetFeeScheduleAuditor()),
        key: 'Auditor',
    },
    {
        type: 'date',
        label: i18n.t(LocaleHelper.getSetFeeScheduleAuditTime()),
        key: 'AuditTime',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getSetFeeSchedulePlanDescription()),
        key: 'PlanDescription',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getSetFeeScheduleDestinationAgent()),
        key: 'DestinationAgent',
    },
    
]; 