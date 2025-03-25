import { AdvancedSearchFormProps } from "@/components/search-form";
import i18n from '@/i18n';
import LocaleHelper from '@/utils/localeHelper';
export const fields: AdvancedSearchFormProps["fields"] = [
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getOrdersBusinessId()),
        key: 'BusinessId',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getOrdersMainOrderNumber()),
        key: 'MainOrderNumber',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getOrdersCarrier()),
        key: 'Carrier',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getOrdersShipName()),
        key: 'ShipName',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getOrdersVoyage()),
        key: 'Voyage',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getOrdersCustomer()),
        key: 'Customer',
    },
    {
        type: 'date',
        label: i18n.t(LocaleHelper.getOrdersBusinessDate()),
        key: 'BusinessDate',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getOrdersContractStatus()),
        key: 'ContractStatus',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getOrdersDeparturePort()),
        key: 'DeparturePort',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getOrdersDestinationPort()),
        key: 'DestinationPort',
    },
    {
        type: 'date',
        label: i18n.t(LocaleHelper.getOrdersDepartureDate()),
        key: 'DepartureDate',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getOrdersCustomerService()),
        key: 'CustomerService',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getOrdersAirWaybillChargedWeight()),
        key: 'AirWaybillChargedWeight',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getOrdersAirBookingChargedWeight()),
        key: 'AirBookingChargedWeight',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getOrdersBookingAgent()),
        key: 'BookingAgent',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getOrdersProjectId()),
        key: 'ProjectId',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getOrdersOperation()),
        key: 'Operation',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getOrdersSales()),
        key: 'Sales',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getOrdersSalesDepartment()),
        key: 'SalesDepartment',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getOrdersOverseasService()),
        key: 'OverseasService',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getOrdersStatus()),
        key: 'Status',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getOrdersBusinessType()),
        key: 'BusinessType',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getOrdersActualChargedWeight()),
        key: 'ActualChargedWeight',
    },
    {
        type: 'select',
        label: i18n.t(LocaleHelper.getOrdersEntrustedPieces()),
        key: 'EntrustedPieces',
        selectOptions: [{ value: '1', label: 'Value1' }, { value: '2', label: 'Value2' }, { value: '3', label: 'Value3' }]
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getOrdersContainerNumber()),
        key: 'ContainerNumber',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getOrdersEntrustedGrossWeight()),
        key: 'EntrustedGrossWeight',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getOrdersEntrustedVolume()),
        key: 'EntrustedVolume',
    },
    {
        type: 'select',
        label: i18n.t(LocaleHelper.getOrdersActualPieces()),
        key: 'ActualPieces',
        selectOptions: [{ value: '1', label: 'Value1' }, { value: '2', label: 'Value2' }, { value: '3', label: 'Value3' }]
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getOrdersActualGrossWeight()),
        key: 'ActualGrossWeight',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getOrdersActualVolume()),
        key: 'ActualVolume',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getOrdersPayableVerificationStatus()),
        key: 'PayableVerificationStatus',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getOrdersReceivableVerificationStatus()),
        key: 'ReceivableVerificationStatus',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getOrdersPurchasePrice()),
        key: 'PurchasePrice',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getOrdersSellingPrice()),
        key: 'SellingPrice',
    },
    {
        type: 'date',
        label: i18n.t(LocaleHelper.getOrdersArrivalDate()),
        key: 'ArrivalDate',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getOrdersDesignatedFreightAgent()),
        key: 'DesignatedFreightAgent',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getOrdersFinalDestination()),
        key: 'FinalDestination',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getOrdersLocalService()),
        key: 'LocalService',
    },
    {
        type: 'date',
        label: i18n.t(LocaleHelper.getOrdersCreationDate()),
        key: 'CreationDate',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getOrdersCustomBusinessType()),
        key: 'CustomBusinessType',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getOrdersBusinessReferenceNumber()),
        key: 'BusinessReferenceNumber',
    },
    {
        type: 'date',
        label: i18n.t(LocaleHelper.getOrdersDeliveryDate()),
        key: 'DeliveryDate',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getOrdersShippingCompanyContractNumber()),
        key: 'ShippingCompanyContractNumber',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getOrdersInternalContractNumber()),
        key: 'InternalContractNumber',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getOrdersQuotationNumber()),
        key: 'QuotationNumber',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getOrdersShippingRoute()),
        key: 'ShippingRoute',
    },
    {
        type: 'select',
        label: i18n.t(LocaleHelper.getOrdersTeu()),
        key: 'Teu',
        selectOptions: [{ value: '1', label: 'Value1' }, { value: '2', label: 'Value2' }, { value: '3', label: 'Value3' }]
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getOrdersContainerTypeQuantity()),
        key: 'ContainerTypeQuantity',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getOrdersCollectionSales()),
        key: 'CollectionSales',
    },
    {
        type: 'date',
        label: i18n.t(LocaleHelper.getOrdersOperationDate()),
        key: 'OperationDate',
    },
    {
        type: 'date',
        label: i18n.t(LocaleHelper.getOrdersActualDepartureDateAtd()),
        key: 'ActualDepartureDateAtd',
    },
    {
        type: 'date',
        label: i18n.t(LocaleHelper.getOrdersActualArrivalDateAta()),
        key: 'ActualArrivalDateAta',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getOrdersConsignee()),
        key: 'Consignee',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getOrdersShipper()),
        key: 'Shipper',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getOrdersReceivableInvoiceStatus()),
        key: 'ReceivableInvoiceStatus',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getOrdersPayableInvoiceStatus()),
        key: 'PayableInvoiceStatus',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getOrdersCustomerContact()),
        key: 'CustomerContact',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getOrdersSopStatus()),
        key: 'SopStatus',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getOrdersSopTemplateName()),
        key: 'SopTemplateName',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getOrdersCargoType()),
        key: 'CargoType',
    },
    {
        type: 'date',
        label: i18n.t(LocaleHelper.getOrdersActualPickupTime()),
        key: 'ActualPickupTime',
    },
    {
        type: 'date',
        label: i18n.t(LocaleHelper.getOrdersActualReturnEmptyTime()),
        key: 'ActualReturnEmptyTime',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getOrdersSubOrderNumber()),
        key: 'SubOrderNumber',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getOrdersCustomerLevel()),
        key: 'CustomerLevel',
    },
    {
        type: 'date',
        label: i18n.t(LocaleHelper.getOrdersActualDeliveryTime()),
        key: 'ActualDeliveryTime',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getOrdersCustomerServiceDepartment()),
        key: 'CustomerServiceDepartment',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getOrdersDocumentationDepartment()),
        key: 'DocumentationDepartment',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getOrdersReceivableFeesEntered()),
        key: 'ReceivableFeesEntered',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getOrdersPayableFeesEntered()),
        key: 'PayableFeesEntered',
    },
    {
        type: 'date',
        label: i18n.t(LocaleHelper.getOrdersBranchDepartureDate()),
        key: 'BranchDepartureDate',
    },
    {
        type: 'date',
        label: i18n.t(LocaleHelper.getOrdersBranchArrivalDate()),
        key: 'BranchArrivalDate',
    },
    {
        type: 'date',
        label: i18n.t(LocaleHelper.getOrdersBargeDepartureDate()),
        key: 'BargeDepartureDate',
    },
    {
        type: 'date',
        label: i18n.t(LocaleHelper.getOrdersBargeArrivalDate()),
        key: 'BargeArrivalDate',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getOrdersMark()),
        key: 'Mark',
    },
    {
        type: 'date',
        label: i18n.t(LocaleHelper.getOrdersEntryTime()),
        key: 'EntryTime',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getOrdersCollectionType()),
        key: 'CollectionType',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getOrdersProfit()),
        key: 'Profit',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getOrdersIncome()),
        key: 'Income',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getOrdersExpenditure()),
        key: 'Expenditure',
    },
    
]; 