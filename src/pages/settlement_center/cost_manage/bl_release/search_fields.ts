import { AdvancedSearchFormProps } from "@/components/search-form";
import i18n from '@/i18n';
import LocaleHelper from '@/utils/locale';
export const fields: AdvancedSearchFormProps["fields"] = [

    {
        type: 'select',
        label: i18n.t(LocaleHelper.getBlReleaseBusinessId()),
        key: 'BusinessId',
        selectOptions: [{ value: '1', label: 'Value1' }, { value: '2', label: 'Value2' }, { value: '3', label: 'Value3' }]
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getBlReleaseConsignor()),
        key: 'Consignor',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getBlReleaseBookingAgent()),
        key: 'BookingAgent',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getBlReleaseShippingCompany()),
        key: 'ShippingCompany',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getBlReleasePostOfDestination()),
        key: 'PostOfDestination',
    },
    {
        type: 'date',
        label: i18n.t(LocaleHelper.getBlReleaseSailingDate()),
        key: 'SailingDate',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getBlReleaseVesselVoyage()),
        key: 'VesselVoyage',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getBlReleaseMblNumber()),
        key: 'MblNumber',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getBlReleaseReleaseAuditStatus()),
        key: 'ReleaseAuditStatus',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getBlReleaseBlStatus()),
        key: 'BlStatus',
    },
    {
        type: 'date',
        label: i18n.t(LocaleHelper.getBlReleaseAuditTime()),
        key: 'AuditTime',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getBlReleaseSalesPerson()),
        key: 'SalesPerson',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getBlReleaseReleaseNumber()),
        key: 'ReleaseNumber',
    },
    {
        type: 'select',
        label: i18n.t(LocaleHelper.getBlReleaseContractValid()),
        key: 'ContractValid',
        selectOptions: [{ value: '1', label: 'Value1' }, { value: '2', label: 'Value2' }, { value: '3', label: 'Value3' }]
    },
    {
        type: 'select',
        label: i18n.t(LocaleHelper.getBlReleaseInvoiced()),
        key: 'Invoiced',
        selectOptions: [{ value: '1', label: 'Value1' }, { value: '2', label: 'Value2' }, { value: '3', label: 'Value3' }]
    },
    {
        type: 'select',
        label: i18n.t(LocaleHelper.getBlReleaseFullyWrittenOff()),
        key: 'FullyWrittenOff',
        selectOptions: [{ value: '1', label: 'Value1' }, { value: '2', label: 'Value2' }, { value: '3', label: 'Value3' }]
    },
    {
        type: 'select',
        label: i18n.t(LocaleHelper.getBlReleaseOverdue()),
        key: 'Overdue',
        selectOptions: [{ value: '1', label: 'Value1' }, { value: '2', label: 'Value2' }, { value: '3', label: 'Value3' }]
    },
    {
        type: 'select',
        label: i18n.t(LocaleHelper.getBlReleaseOverLimit()),
        key: 'OverLimit',
        selectOptions: [{ value: '1', label: 'Value1' }, { value: '2', label: 'Value2' }, { value: '3', label: 'Value3' }]
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getBlReleaseRemarks()),
        key: 'Remarks',
    },
    
]; 