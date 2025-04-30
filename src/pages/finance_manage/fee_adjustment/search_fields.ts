import { AdvancedSearchFormProps } from "@/components/search-form";
import i18n from '@/i18n';
import LocaleHelper from '@/utils/locale';
export const fields: AdvancedSearchFormProps["fields"] = [

    {
        type: 'input',
        label: i18n.t(LocaleHelper.getReleaseOrderVerificationBusinessId()),
        key: 'BusinessId',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getReleaseOrderVerificationConsignor()),
        key: 'Consignor',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getReleaseOrderVerificationBookingAgent()),
        key: 'BookingAgent',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getReleaseOrderVerificationShippingCompany()),
        key: 'ShippingCompany',
    },
    {
        type: 'date',
        label: i18n.t(LocaleHelper.getReleaseOrderVerificationSailingDate()),
        key: 'SailingDate',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getReleaseOrderVerificationVesselVoyage()),
        key: 'VesselVoyage',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getReleaseOrderVerificationMblNumber()),
        key: 'MblNumber',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getReleaseOrderVerificationMblType()),
        key: 'MblType',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getReleaseOrderVerificationBusinessStatus()),
        key: 'BusinessStatus',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getReleaseOrderVerificationSalesPerson()),
        key: 'SalesPerson',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getReleaseOrderVerificationBlStatus()),
        key: 'BlStatus',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getReleaseOrderVerificationReleaseAuditStatus()),
        key: 'ReleaseAuditStatus',
    },
    {
        type: 'date',
        label: i18n.t(LocaleHelper.getReleaseOrderVerificationAuditTime()),
        key: 'AuditTime',
    },
    {
        type: 'date',
        label: i18n.t(LocaleHelper.getReleaseOrderVerificationHoldTime()),
        key: 'HoldTime',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getReleaseOrderVerificationHoldReason()),
        key: 'HoldReason',
    },
    {
        type: 'select',
        label: i18n.t(LocaleHelper.getReleaseOrderVerificationContractValid()),
        key: 'ContractValid',
        selectOptions: [{ value: '1', label: 'Value1' }, { value: '2', label: 'Value2' }, { value: '3', label: 'Value3' }]
    },
    {
        type: 'select',
        label: i18n.t(LocaleHelper.getReleaseOrderVerificationInvoiced()),
        key: 'Invoiced',
        selectOptions: [{ value: '1', label: 'Value1' }, { value: '2', label: 'Value2' }, { value: '3', label: 'Value3' }]
    },
    {
        type: 'select',
        label: i18n.t(LocaleHelper.getReleaseOrderVerificationFullyWrittenOff()),
        key: 'FullyWrittenOff',
        selectOptions: [{ value: '1', label: 'Value1' }, { value: '2', label: 'Value2' }, { value: '3', label: 'Value3' }]
    },
    {
        type: 'select',
        label: i18n.t(LocaleHelper.getReleaseOrderVerificationOverdue()),
        key: 'Overdue',
        selectOptions: [{ value: '1', label: 'Value1' }, { value: '2', label: 'Value2' }, { value: '3', label: 'Value3' }]
    },
    {
        type: 'select',
        label: i18n.t(LocaleHelper.getReleaseOrderVerificationOverLimit()),
        key: 'OverLimit',
        selectOptions: [{ value: '1', label: 'Value1' }, { value: '2', label: 'Value2' }, { value: '3', label: 'Value3' }]
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getReleaseOrderVerificationRemarks()),
        key: 'Remarks',
    },
    
]; 