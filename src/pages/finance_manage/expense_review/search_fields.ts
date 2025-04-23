import { AdvancedSearchFormProps } from "@/components/search-form";
import i18n from '@/i18n';
import LocaleHelper from '@/utils/locale';
export const fields: AdvancedSearchFormProps["fields"] = [

    {
        type: 'input',
        label: i18n.t(LocaleHelper.getExpenseReviewBusinessNumber()),
        key: 'BusinessNumber',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getExpenseReviewContainerType()),
        key: 'ContainerType',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getExpenseReviewBusinessType()),
        key: 'BusinessType',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getExpenseReviewMasterNumber()),
        key: 'MasterNumber',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getExpenseReviewSplitNumber()),
        key: 'SplitNumber',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getExpenseReviewCustomerName()),
        key: 'CustomerName',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getExpenseReviewCargoType()),
        key: 'CargoType',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getExpenseReviewCustomerLevel()),
        key: 'CustomerLevel',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getExpenseReviewContractStatus()),
        key: 'ContractStatus',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getExpenseReviewCarrierName()),
        key: 'CarrierName',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getExpenseReviewVesselName()),
        key: 'VesselName',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getExpenseReviewVoyageFlight()),
        key: 'VoyageFlight',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getExpenseReviewLoadingPort()),
        key: 'LoadingPort',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getExpenseReviewDestinationPort()),
        key: 'DestinationPort',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getExpenseReviewDeliveryPlace()),
        key: 'DeliveryPlace',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getExpenseReviewDischargingPort()),
        key: 'DischargingPort',
    },
    {
        type: 'date',
        label: i18n.t(LocaleHelper.getExpenseReviewEtd()),
        key: 'Etd',
    },
    {
        type: 'date',
        label: i18n.t(LocaleHelper.getExpenseReviewEta()),
        key: 'Eta',
    },
    {
        type: 'date',
        label: i18n.t(LocaleHelper.getExpenseReviewBusinessDate()),
        key: 'BusinessDate',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getExpenseReviewBookingAgent()),
        key: 'BookingAgent',
    },
    {
        type: 'date',
        label: i18n.t(LocaleHelper.getExpenseReviewCreationDate()),
        key: 'CreationDate',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getExpenseReviewVoucherWord()),
        key: 'VoucherWord',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getExpenseReviewVoucherNumber()),
        key: 'VoucherNumber',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getExpenseReviewBusinessRefNumber()),
        key: 'BusinessRefNumber',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getExpenseReviewProjectNumber()),
        key: 'ProjectNumber',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getExpenseReviewOperationStaff()),
        key: 'OperationStaff',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getExpenseReviewSalesStaff()),
        key: 'SalesStaff',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getExpenseReviewCustomerServiceStaff()),
        key: 'CustomerServiceStaff',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getExpenseReviewDocumentStaff()),
        key: 'DocumentStaff',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getExpenseReviewSolicitationType()),
        key: 'SolicitationType',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getExpenseReviewStatus()),
        key: 'Status',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getExpenseReviewActualChargeableWeight()),
        key: 'ActualChargeableWeight',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getExpenseReviewProfit()),
        key: 'Profit',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getExpenseReviewTotalRevenue()),
        key: 'TotalRevenue',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getExpenseReviewTotalCost()),
        key: 'TotalCost',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getExpenseReviewPayableReconciliationStatus()),
        key: 'PayableReconciliationStatus',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getExpenseReviewReceivableReconciliationStatus()),
        key: 'ReceivableReconciliationStatus',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getExpenseReviewBusinessCreator()),
        key: 'BusinessCreator',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getExpenseReviewContainerDescription()),
        key: 'ContainerDescription',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getExpenseReviewAppointedAgent()),
        key: 'AppointedAgent',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getExpenseReviewMasterFreightTerms()),
        key: 'MasterFreightTerms',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getExpenseReviewSplitFreightTerms()),
        key: 'SplitFreightTerms',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getExpenseReviewTradeTerms()),
        key: 'TradeTerms',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getExpenseReviewOperationMode()),
        key: 'OperationMode',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getExpenseReviewCustomField1()),
        key: 'CustomField1',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getExpenseReviewCustomField2()),
        key: 'CustomField2',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getExpenseReviewCustomField3()),
        key: 'CustomField3',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getExpenseReviewProfitReviewStatus()),
        key: 'ProfitReviewStatus',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getExpenseReviewRouteName()),
        key: 'RouteName',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getExpenseReviewRouteManager()),
        key: 'RouteManager',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getExpenseReviewDestinationAgent()),
        key: 'DestinationAgent',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getExpenseReviewCustomPosition1()),
        key: 'CustomPosition1',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getExpenseReviewCustomPosition2()),
        key: 'CustomPosition2',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getExpenseReviewPickupDeliveryLocation()),
        key: 'PickupDeliveryLocation',
    },
    {
        type: 'date',
        label: i18n.t(LocaleHelper.getExpenseReviewTruckPickupTime()),
        key: 'TruckPickupTime',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getExpenseReviewBookingNumber()),
        key: 'BookingNumber',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getExpenseReviewSopStatus()),
        key: 'SopStatus',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getExpenseReviewCancellationReviewReason()),
        key: 'CancellationReviewReason',
    },
    {
        type: 'date',
        label: i18n.t(LocaleHelper.getExpenseReviewChargeLockTime()),
        key: 'ChargeLockTime',
    },
    {
        type: 'date',
        label: i18n.t(LocaleHelper.getExpenseReviewPayableLockTime()),
        key: 'PayableLockTime',
    },
    
]; 