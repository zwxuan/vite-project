import { AdvancedSearchFormProps } from "@/components/search-form";
import i18n from '@/i18n';
import LocaleHelper from '@/utils/localeHelper';
export const fields: AdvancedSearchFormProps["fields"] = [

    {
        type: 'input',
        label: i18n.t(LocaleHelper.getFeeReconciliationShippingCompany()),
        key: 'ShippingCompany',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getFeeReconciliationPricingNature()),
        key: 'PricingNature',
    },
    {
        type: 'date',
        label: i18n.t(LocaleHelper.getFeeReconciliationActualPortEntryDate()),
        key: 'ActualPortEntryDate',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getFeeReconciliationBusinessModel()),
        key: 'BusinessModel',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getFeeReconciliationBusinessNumber()),
        key: 'BusinessNumber',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getFeeReconciliationWarehouseEntryNumber()),
        key: 'WarehouseEntryNumber',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getFeeReconciliationBookingNumber()),
        key: 'BookingNumber',
    },
    {
        type: 'date',
        label: i18n.t(LocaleHelper.getFeeReconciliationCutoffDate()),
        key: 'CutoffDate',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getFeeReconciliationProjectNumber()),
        key: 'ProjectNumber',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getFeeReconciliationSono()),
        key: 'Sono',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getFeeReconciliationContainerNumber()),
        key: 'ContainerNumber',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getFeeReconciliationOverseasCustomerService()),
        key: 'OverseasCustomerService',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getFeeReconciliationSiteOperation()),
        key: 'SiteOperation',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getFeeReconciliationPaymentApplicationNumber()),
        key: 'PaymentApplicationNumber',
    },
    {
        type: 'date',
        label: i18n.t(LocaleHelper.getFeeReconciliationEta()),
        key: 'Eta',
    },
    {
        type: 'date',
        label: i18n.t(LocaleHelper.getFeeReconciliationEtd()),
        key: 'Etd',
    },
    {
        type: 'date',
        label: i18n.t(LocaleHelper.getFeeReconciliationAtd()),
        key: 'Atd',
    },
    {
        type: 'date',
        label: i18n.t(LocaleHelper.getFeeReconciliationAta()),
        key: 'Ata',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getFeeReconciliationExchangeRate()),
        key: 'ExchangeRate',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getFeeReconciliationBillNumber()),
        key: 'BillNumber',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getFeeReconciliationSettlementObject()),
        key: 'SettlementObject',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getFeeReconciliationCargoType()),
        key: 'CargoType',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getFeeReconciliationMasterWaybillNumber()),
        key: 'MasterWaybillNumber',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getFeeReconciliationHouseWaybillNumber()),
        key: 'HouseWaybillNumber',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getFeeReconciliationConsignor()),
        key: 'Consignor',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getFeeReconciliationBusinessType()),
        key: 'BusinessType',
    },
    {
        type: 'date',
        label: i18n.t(LocaleHelper.getFeeReconciliationBusinessDate()),
        key: 'BusinessDate',
    },
    // {
    //     type: 'select',
    //     label: i18n.t(LocaleHelper.getFeeReconciliationIsFba()),
    //     key: 'IsFba',
    //     selectOptions: [{ value: '1', label: 'Value1' }, { value: '2', label: 'Value2' }, { value: '3', label: 'Value3' }]
    // },
    // {
    //     type: 'input',
    //     label: i18n.t(LocaleHelper.getFeeReconciliationAmazonWarehouseCode()),
    //     key: 'AmazonWarehouseCode',
    // },
    // {
    //     type: 'input',
    //     label: i18n.t(LocaleHelper.getFeeReconciliationDestinationDeliveryMethod()),
    //     key: 'DestinationDeliveryMethod',
    // },
    // {
    //     type: 'input',
    //     label: i18n.t(LocaleHelper.getFeeReconciliationCourierNumber()),
    //     key: 'CourierNumber',
    // },
    // {
    //     type: 'select',
    //     label: i18n.t(LocaleHelper.getFeeReconciliationIsRemoteWarehouse()),
    //     key: 'IsRemoteWarehouse',
    //     selectOptions: [{ value: '1', label: 'Value1' }, { value: '2', label: 'Value2' }, { value: '3', label: 'Value3' }]
    // },
    // {
    //     type: 'input',
    //     label: i18n.t(LocaleHelper.getFeeReconciliationShipNameAndVoyage()),
    //     key: 'ShipNameAndVoyage',
    // },
    // {
    //     type: 'input',
    //     label: i18n.t(LocaleHelper.getFeeReconciliationPortOfLoading()),
    //     key: 'PortOfLoading',
    // },
    // {
    //     type: 'input',
    //     label: i18n.t(LocaleHelper.getFeeReconciliationPortOfDestination()),
    //     key: 'PortOfDestination',
    // },
    // {
    //     type: 'input',
    //     label: i18n.t(LocaleHelper.getFeeReconciliationBookingAgent()),
    //     key: 'BookingAgent',
    // },
    // {
    //     type: 'input',
    //     label: i18n.t(LocaleHelper.getFeeReconciliationOriginStation()),
    //     key: 'OriginStation',
    // },
    // {
    //     type: 'input',
    //     label: i18n.t(LocaleHelper.getFeeReconciliationDestinationStation()),
    //     key: 'DestinationStation',
    // },
    // {
    //     type: 'input',
    //     label: i18n.t(LocaleHelper.getFeeReconciliationTransitStation()),
    //     key: 'TransitStation',
    // },
    // {
    //     type: 'input',
    //     label: i18n.t(LocaleHelper.getFeeReconciliationDestinationAgent()),
    //     key: 'DestinationAgent',
    // },
    // {
    //     type: 'input',
    //     label: i18n.t(LocaleHelper.getFeeReconciliationSalesPerson()),
    //     key: 'SalesPerson',
    // },
    // {
    //     type: 'input',
    //     label: i18n.t(LocaleHelper.getFeeReconciliationOperationPerson()),
    //     key: 'OperationPerson',
    // },
    // {
    //     type: 'input',
    //     label: i18n.t(LocaleHelper.getFeeReconciliationCustomerServicePerson()),
    //     key: 'CustomerServicePerson',
    // },
    // {
    //     type: 'input',
    //     label: i18n.t(LocaleHelper.getFeeReconciliationDocumentPerson()),
    //     key: 'DocumentPerson',
    // },
    // {
    //     type: 'input',
    //     label: i18n.t(LocaleHelper.getFeeReconciliationBusinessReferenceNumber()),
    //     key: 'BusinessReferenceNumber',
    // },
    // {
    //     type: 'input',
    //     label: i18n.t(LocaleHelper.getFeeReconciliationAccrualAmount()),
    //     key: 'AccrualAmount',
    // },
    // {
    //     type: 'date',
    //     label: i18n.t(LocaleHelper.getFeeReconciliationFinancialDate()),
    //     key: 'FinancialDate',
    // },
    // {
    //     type: 'input',
    //     label: i18n.t(LocaleHelper.getFeeReconciliationDomesticOrForeign()),
    //     key: 'DomesticOrForeign',
    // },
    // {
    //     type: 'input',
    //     label: i18n.t(LocaleHelper.getFeeReconciliationRevenueOrExpenditureType()),
    //     key: 'RevenueOrExpenditureType',
    // },
    // {
    //     type: 'input',
    //     label: i18n.t(LocaleHelper.getFeeReconciliationFeeStatus()),
    //     key: 'FeeStatus',
    // },
    // {
    //     type: 'input',
    //     label: i18n.t(LocaleHelper.getFeeReconciliationAuditor()),
    //     key: 'Auditor',
    // },
    // {
    //     type: 'input',
    //     label: i18n.t(LocaleHelper.getFeeReconciliationConfirmationStatus()),
    //     key: 'ConfirmationStatus',
    // },
    // {
    //     type: 'input',
    //     label: i18n.t(LocaleHelper.getFeeReconciliationFeeName()),
    //     key: 'FeeName',
    // },
    // {
    //     type: 'input',
    //     label: i18n.t(LocaleHelper.getFeeReconciliationUnit()),
    //     key: 'Unit',
    // },
    // {
    //     type: 'input',
    //     label: i18n.t(LocaleHelper.getFeeReconciliationCurrency()),
    //     key: 'Currency',
    // },
    // {
    //     type: 'input',
    //     label: i18n.t(LocaleHelper.getFeeReconciliationQuantity()),
    //     key: 'Quantity',
    // },
    // {
    //     type: 'input',
    //     label: i18n.t(LocaleHelper.getFeeReconciliationUnitPrice()),
    //     key: 'UnitPrice',
    // },
    // {
    //     type: 'input',
    //     label: i18n.t(LocaleHelper.getFeeReconciliationTaxInclusivePrice()),
    //     key: 'TaxInclusivePrice',
    // },
    // {
    //     type: 'input',
    //     label: i18n.t(LocaleHelper.getFeeReconciliationTaxExclusivePrice()),
    //     key: 'TaxExclusivePrice',
    // },
    // {
    //     type: 'input',
    //     label: i18n.t(LocaleHelper.getFeeReconciliationTaxAmount()),
    //     key: 'TaxAmount',
    // },
    // {
    //     type: 'input',
    //     label: i18n.t(LocaleHelper.getFeeReconciliationTaxRate()),
    //     key: 'TaxRate',
    // },
    // {
    //     type: 'input',
    //     label: i18n.t(LocaleHelper.getFeeReconciliationWriteOffAmount()),
    //     key: 'WriteOffAmount',
    // },
    // {
    //     type: 'input',
    //     label: i18n.t(LocaleHelper.getFeeReconciliationUnwrittenAmount()),
    //     key: 'UnwrittenAmount',
    // },
    // {
    //     type: 'input',
    //     label: i18n.t(LocaleHelper.getFeeReconciliationContactPerson()),
    //     key: 'ContactPerson',
    // },
    // {
    //     type: 'input',
    //     label: i18n.t(LocaleHelper.getFeeReconciliationCreator()),
    //     key: 'Creator',
    // },
    // {
    //     type: 'input',
    //     label: i18n.t(LocaleHelper.getFeeReconciliationRemark()),
    //     key: 'Remark',
    // },
    // {
    //     type: 'input',
    //     label: i18n.t(LocaleHelper.getFeeReconciliationRelatedNumber()),
    //     key: 'RelatedNumber',
    // },
    // {
    //     type: 'input',
    //     label: i18n.t(LocaleHelper.getFeeReconciliationConsignmentRelatedNumber()),
    //     key: 'ConsignmentRelatedNumber',
    // },
    // {
    //     type: 'input',
    //     label: i18n.t(LocaleHelper.getFeeReconciliationCarrier()),
    //     key: 'Carrier',
    // },
    // {
    //     type: 'date',
    //     label: i18n.t(LocaleHelper.getFeeReconciliationConfirmationDate()),
    //     key: 'ConfirmationDate',
    // },
    // {
    //     type: 'input',
    //     label: i18n.t(LocaleHelper.getFeeReconciliationFeeConfirmationPerson()),
    //     key: 'FeeConfirmationPerson',
    // },
    // {
    //     type: 'input',
    //     label: i18n.t(LocaleHelper.getFeeReconciliationRouteManager()),
    //     key: 'RouteManager',
    // },
    // {
    //     type: 'date',
    //     label: i18n.t(LocaleHelper.getFeeReconciliationInvoiceDate()),
    //     key: 'InvoiceDate',
    // },
    // {
    //     type: 'input',
    //     label: i18n.t(LocaleHelper.getFeeReconciliationInvoiceNumber()),
    //     key: 'InvoiceNumber',
    // },
    // {
    //     type: 'input',
    //     label: i18n.t(LocaleHelper.getFeeReconciliationInvoiceTitle()),
    //     key: 'InvoiceTitle',
    // },
    // {
    //     type: 'select',
    //     label: i18n.t(LocaleHelper.getFeeReconciliationIsInvoiceRequired()),
    //     key: 'IsInvoiceRequired',
    //     selectOptions: [{ value: '1', label: 'Value1' }, { value: '2', label: 'Value2' }, { value: '3', label: 'Value3' }]
    // },
    // {
    //     type: 'date',
    //     label: i18n.t(LocaleHelper.getFeeReconciliationWriteOffDate()),
    //     key: 'WriteOffDate',
    // },
    // {
    //     type: 'input',
    //     label: i18n.t(LocaleHelper.getFeeReconciliationBusinessStatus()),
    //     key: 'BusinessStatus',
    // },
    // {
    //     type: 'date',
    //     label: i18n.t(LocaleHelper.getFeeReconciliationBargeSailingDate()),
    //     key: 'BargeSailingDate',
    // },
    // {
    //     type: 'input',
    //     label: i18n.t(LocaleHelper.getFeeReconciliationBargeName()),
    //     key: 'BargeName',
    // },
    // {
    //     type: 'input',
    //     label: i18n.t(LocaleHelper.getFeeReconciliationBargeVoyage()),
    //     key: 'BargeVoyage',
    // },
    // {
    //     type: 'input',
    //     label: i18n.t(LocaleHelper.getFeeReconciliationBargePortOfLoading()),
    //     key: 'BargePortOfLoading',
    // },
    // {
    //     type: 'date',
    //     label: i18n.t(LocaleHelper.getFeeReconciliationPaymentDate()),
    //     key: 'PaymentDate',
    // },
    // {
    //     type: 'input',
    //     label: i18n.t(LocaleHelper.getFeeReconciliationSalesDepartment()),
    //     key: 'SalesDepartment',
    // },
    // {
    //     type: 'date',
    //     label: i18n.t(LocaleHelper.getFeeReconciliationDeliveryTime()),
    //     key: 'DeliveryTime',
    // },
    // {
    //     type: 'input',
    //     label: i18n.t(LocaleHelper.getFeeReconciliationConfirmationRemark()),
    //     key: 'ConfirmationRemark',
    // },
    // {
    //     type: 'input',
    //     label: i18n.t(LocaleHelper.getFeeReconciliationFeeWriteOffStatus()),
    //     key: 'FeeWriteOffStatus',
    // },
    // {
    //     type: 'date',
    //     label: i18n.t(LocaleHelper.getFeeReconciliationOperationDate()),
    //     key: 'OperationDate',
    // },
    // {
    //     type: 'date',
    //     label: i18n.t(LocaleHelper.getFeeReconciliationEstimatedLoadingDate()),
    //     key: 'EstimatedLoadingDate',
    // },
    // {
    //     type: 'date',
    //     label: i18n.t(LocaleHelper.getFeeReconciliationActualReturnEmptyTime()),
    //     key: 'ActualReturnEmptyTime',
    // },
    // {
    //     type: 'input',
    //     label: i18n.t(LocaleHelper.getFeeReconciliationContainerQuantityDescription()),
    //     key: 'ContainerQuantityDescription',
    // },
    // {
    //     type: 'date',
    //     label: i18n.t(LocaleHelper.getFeeReconciliationFeeCreationDate()),
    //     key: 'FeeCreationDate',
    // },
    // {
    //     type: 'input',
    //     label: i18n.t(LocaleHelper.getFeeReconciliationCustomerLevel()),
    //     key: 'CustomerLevel',
    // },
    // {
    //     type: 'date',
    //     label: i18n.t(LocaleHelper.getFeeReconciliationDeliveryCompletionTime()),
    //     key: 'DeliveryCompletionTime',
    // },
    // {
    //     type: 'input',
    //     label: i18n.t(LocaleHelper.getFeeReconciliationFeeChanger()),
    //     key: 'FeeChanger',
    // },
    // {
    //     type: 'input',
    //     label: i18n.t(LocaleHelper.getFeeReconciliationSettlementAgent()),
    //     key: 'SettlementAgent',
    // },
    // {
    //     type: 'select',
    //     label: i18n.t(LocaleHelper.getFeeReconciliationIsFeeAdjusted()),
    //     key: 'IsFeeAdjusted',
    //     selectOptions: [{ value: '1', label: 'Value1' }, { value: '2', label: 'Value2' }, { value: '3', label: 'Value3' }]
    // },
    // {
    //     type: 'input',
    //     label: i18n.t(LocaleHelper.getFeeReconciliationRoute()),
    //     key: 'Route',
    // },
    // {
    //     type: 'date',
    //     label: i18n.t(LocaleHelper.getFeeReconciliationFeeModificationTime()),
    //     key: 'FeeModificationTime',
    // },
    // {
    //     type: 'input',
    //     label: i18n.t(LocaleHelper.getFeeReconciliationFeeModifier()),
    //     key: 'FeeModifier',
    // },
    // {
    //     type: 'input',
    //     label: i18n.t(LocaleHelper.getFeeReconciliationBillDate()),
    //     key: 'BillDate',
    // },
    // {
    //     type: 'date',
    //     label: i18n.t(LocaleHelper.getFeeReconciliationInvoiceDueDate()),
    //     key: 'InvoiceDueDate',
    // },
    // {
    //     type: 'input',
    //     label: i18n.t(LocaleHelper.getFeeReconciliationCounterpartyInvoiceNumber()),
    //     key: 'CounterpartyInvoiceNumber',
    // },
    // {
    //     type: 'input',
    //     label: i18n.t(LocaleHelper.getFeeReconciliationReceivableWriteOffStatus()),
    //     key: 'ReceivableWriteOffStatus',
    // },
    // {
    //     type: 'input',
    //     label: i18n.t(LocaleHelper.getFeeReconciliationDesignatedForwarder()),
    //     key: 'DesignatedForwarder',
    // },
    // {
    //     type: 'date',
    //     label: i18n.t(LocaleHelper.getFeeReconciliationActualLoadingDate()),
    //     key: 'ActualLoadingDate',
    // },
    // {
    //     type: 'input',
    //     label: i18n.t(LocaleHelper.getFeeReconciliationCounterpartyCounterNumber()),
    //     key: 'CounterpartyCounterNumber',
    // },
    // {
    //     type: 'date',
    //     label: i18n.t(LocaleHelper.getFeeReconciliationFeeDueDate()),
    //     key: 'FeeDueDate',
    // },
    // {
    //     type: 'input',
    //     label: i18n.t(LocaleHelper.getFeeReconciliationRelatedFeeId()),
    //     key: 'RelatedFeeId',
    // },
    // {
    //     type: 'input',
    //     label: i18n.t(LocaleHelper.getFeeReconciliationFeeId()),
    //     key: 'FeeId',
    // },
    // {
    //     type: 'input',
    //     label: i18n.t(LocaleHelper.getFeeReconciliationDataSource()),
    //     key: 'DataSource',
    // },
    // {
    //     type: 'input',
    //     label: i18n.t(LocaleHelper.getFeeReconciliationFeeContainerNumber()),
    //     key: 'FeeContainerNumber',
    // },
    // {
    //     type: 'input',
    //     label: i18n.t(LocaleHelper.getFeeReconciliationPickupDeliveryLocation()),
    //     key: 'PickupDeliveryLocation',
    // },
    // {
    //     type: 'date',
    //     label: i18n.t(LocaleHelper.getFeeReconciliationActualPickupTime()),
    //     key: 'ActualPickupTime',
    // },
    // {
    //     type: 'input',
    //     label: i18n.t(LocaleHelper.getFeeReconciliationWriteOffBank()),
    //     key: 'WriteOffBank',
    // },
    // {
    //     type: 'input',
    //     label: i18n.t(LocaleHelper.getFeeReconciliationParentCompany()),
    //     key: 'ParentCompany',
    // },
    // {
    //     type: 'input',
    //     label: i18n.t(LocaleHelper.getFeeReconciliationSettlementDepartment()),
    //     key: 'SettlementDepartment',
    // },
    // {
    //     type: 'input',
    //     label: i18n.t(LocaleHelper.getFeeReconciliationCargoSales()),
    //     key: 'CargoSales',
    // },
    // {
    //     type: 'input',
    //     label: i18n.t(LocaleHelper.getFeeReconciliationSalesBranch()),
    //     key: 'SalesBranch',
    // },
    // {
    //     type: 'input',
    //     label: i18n.t(LocaleHelper.getFeeReconciliationOperationBranch()),
    //     key: 'OperationBranch',
    // },
    // {
    //     type: 'input',
    //     label: i18n.t(LocaleHelper.getFeeReconciliationFeeSyncStatus()),
    //     key: 'FeeSyncStatus',
    // },
    // {
    //     type: 'input',
    //     label: i18n.t(LocaleHelper.getFeeReconciliationExchangeAgent()),
    //     key: 'ExchangeAgent',
    // },
    // {
    //     type: 'input',
    //     label: i18n.t(LocaleHelper.getFeeReconciliationReconciliationAmount()),
    //     key: 'ReconciliationAmount',
    // },
    // {
    //     type: 'input',
    //     label: i18n.t(LocaleHelper.getFeeReconciliationDifference()),
    //     key: 'Difference',
    // },
    // {
    //     type: 'select',
    //     label: i18n.t(LocaleHelper.getFeeReconciliationIsConfirmed()),
    //     key: 'IsConfirmed',
    //     selectOptions: [{ value: '1', label: 'Value1' }, { value: '2', label: 'Value2' }, { value: '3', label: 'Value3' }]
    // },
    // {
    //     type: 'input',
    //     label: i18n.t(LocaleHelper.getFeeReconciliationSettlementObjectTerm()),
    //     key: 'SettlementObjectTerm',
    // },
    // {
    //     type: 'input',
    //     label: i18n.t(LocaleHelper.getFeeReconciliationSettlementMethod()),
    //     key: 'SettlementMethod',
    // },
    // {
    //     type: 'date',
    //     label: i18n.t(LocaleHelper.getFeeReconciliationAuditDate()),
    //     key: 'AuditDate',
    // },
    // {
    //     type: 'input',
    //     label: i18n.t(LocaleHelper.getFeeReconciliationGpDescription()),
    //     key: 'GpDescription',
    // },
    // {
    //     type: 'input',
    //     label: i18n.t(LocaleHelper.getFeeReconciliationChargeableWeightActual()),
    //     key: 'ChargeableWeightActual',
    // },
    // {
    //     type: 'input',
    //     label: i18n.t(LocaleHelper.getFeeReconciliationChargeableWeightCommission()),
    //     key: 'ChargeableWeightCommission',
    // },
    // {
    //     type: 'select',
    //     label: i18n.t(LocaleHelper.getFeeReconciliationNumberOfPiecesActual()),
    //     key: 'NumberOfPiecesActual',
    //     selectOptions: [{ value: '1', label: 'Value1' }, { value: '2', label: 'Value2' }, { value: '3', label: 'Value3' }]
    // },
    // {
    //     type: 'select',
    //     label: i18n.t(LocaleHelper.getFeeReconciliationNumberOfPiecesCommission()),
    //     key: 'NumberOfPiecesCommission',
    //     selectOptions: [{ value: '1', label: 'Value1' }, { value: '2', label: 'Value2' }, { value: '3', label: 'Value3' }]
    // },
    // {
    //     type: 'input',
    //     label: i18n.t(LocaleHelper.getFeeReconciliationVolumeActual()),
    //     key: 'VolumeActual',
    // },
    // {
    //     type: 'input',
    //     label: i18n.t(LocaleHelper.getFeeReconciliationVolumeCommission()),
    //     key: 'VolumeCommission',
    // },
    // {
    //     type: 'input',
    //     label: i18n.t(LocaleHelper.getFeeReconciliationGrossWeightCommission()),
    //     key: 'GrossWeightCommission',
    // },
    // {
    //     type: 'input',
    //     label: i18n.t(LocaleHelper.getFeeReconciliationGrossWeightActual()),
    //     key: 'GrossWeightActual',
    // },
    
]; 