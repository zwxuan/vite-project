﻿
import { TableColumnsType, Tag, Popconfirm } from 'antd';
import { FeeReconciliationItemProps } from "@/types/settlement_center/cost_manage/fee_reconciliation";
import i18n from '@/i18n';
import LocaleHelper from '@/utils/localeHelper';



export const getColumns = (handleEdit: (record: FeeReconciliationItemProps) => void, handleDelete: (record: FeeReconciliationItemProps) => void, handleDetail: (record: FeeReconciliationItemProps) => void): TableColumnsType<FeeReconciliationItemProps> => [

    {
        title: i18n.t(LocaleHelper.getFeeReconciliationShippingCompany()),
        width: 100,
        onHeaderCell: () => ({ style: { width: '100px' } }),
        dataIndex: 'ShippingCompany',
        sorter: true,
        align: 'left',
        fixed: 'left',
    },
    {
        title: i18n.t(LocaleHelper.getFeeReconciliationPricingNature()),
        width: 100,
        onHeaderCell: () => ({ style: { width: '100px' } }),
        dataIndex: 'PricingNature',
        sorter: true,
        align: 'left',
        fixed: 'left',
    },
    {
        title: i18n.t(LocaleHelper.getFeeReconciliationActualPortEntryDate()),
        width: 100,
        onHeaderCell: () => ({ style: { width: '100px' } }),
        dataIndex: 'ActualPortEntryDate',
        sorter: true,
        align: 'center',
    },
    {
        title: i18n.t(LocaleHelper.getFeeReconciliationBusinessModel()),
        width: 100,
        onHeaderCell: () => ({ style: { width: '100px' } }),
        dataIndex: 'BusinessModel',
        sorter: true,
        align: 'left',
    },
    {
        title: i18n.t(LocaleHelper.getFeeReconciliationBusinessNumber()),
        width: 100,
        onHeaderCell: () => ({ style: { width: '100px' } }),
        dataIndex: 'BusinessNumber',
        sorter: true,
        align: 'left',
    },
    {
        title: i18n.t(LocaleHelper.getFeeReconciliationWarehouseEntryNumber()),
        width: 100,
        onHeaderCell: () => ({ style: { width: '100px' } }),
        dataIndex: 'WarehouseEntryNumber',
        sorter: true,
        align: 'left',
    },
    {
        title: i18n.t(LocaleHelper.getFeeReconciliationBookingNumber()),
        width: 100,
        onHeaderCell: () => ({ style: { width: '100px' } }),
        dataIndex: 'BookingNumber',
        sorter: true,
        align: 'left',
    },
    {
        title: i18n.t(LocaleHelper.getFeeReconciliationCutoffDate()),
        width: 100,
        onHeaderCell: () => ({ style: { width: '100px' } }),
        dataIndex: 'CutoffDate',
        sorter: true,
        align: 'center',
    },
    {
        title: i18n.t(LocaleHelper.getFeeReconciliationProjectNumber()),
        width: 100,
        onHeaderCell: () => ({ style: { width: '100px' } }),
        dataIndex: 'ProjectNumber',
        sorter: true,
        align: 'left',
    },
    {
        title: i18n.t(LocaleHelper.getFeeReconciliationSono()),
        width: 100,
        onHeaderCell: () => ({ style: { width: '100px' } }),
        dataIndex: 'Sono',
        sorter: true,
        align: 'left',
    },
    {
        title: i18n.t(LocaleHelper.getFeeReconciliationContainerNumber()),
        width: 100,
        onHeaderCell: () => ({ style: { width: '100px' } }),
        dataIndex: 'ContainerNumber',
        sorter: true,
        align: 'left',
    },
    {
        title: i18n.t(LocaleHelper.getFeeReconciliationOverseasCustomerService()),
        width: 100,
        onHeaderCell: () => ({ style: { width: '100px' } }),
        dataIndex: 'OverseasCustomerService',
        sorter: true,
        align: 'left',
    },
    {
        title: i18n.t(LocaleHelper.getFeeReconciliationSiteOperation()),
        width: 100,
        onHeaderCell: () => ({ style: { width: '100px' } }),
        dataIndex: 'SiteOperation',
        sorter: true,
        align: 'left',
    },
    {
        title: i18n.t(LocaleHelper.getFeeReconciliationPaymentApplicationNumber()),
        width: 100,
        onHeaderCell: () => ({ style: { width: '100px' } }),
        dataIndex: 'PaymentApplicationNumber',
        sorter: true,
        align: 'left',
    },
    {
        title: i18n.t(LocaleHelper.getFeeReconciliationEta()),
        width: 100,
        onHeaderCell: () => ({ style: { width: '100px' } }),
        dataIndex: 'Eta',
        sorter: true,
        align: 'center',
    },
    {
        title: i18n.t(LocaleHelper.getFeeReconciliationEtd()),
        width: 100,
        onHeaderCell: () => ({ style: { width: '100px' } }),
        dataIndex: 'Etd',
        sorter: true,
        align: 'center',
    },
    {
        title: i18n.t(LocaleHelper.getFeeReconciliationAtd()),
        width: 100,
        onHeaderCell: () => ({ style: { width: '100px' } }),
        dataIndex: 'Atd',
        sorter: true,
        align: 'center',
    },
    {
        title: i18n.t(LocaleHelper.getFeeReconciliationAta()),
        width: 100,
        onHeaderCell: () => ({ style: { width: '100px' } }),
        dataIndex: 'Ata',
        sorter: true,
        align: 'center',
    },
    {
        title: i18n.t(LocaleHelper.getFeeReconciliationExchangeRate()),
        width: 100,
        onHeaderCell: () => ({ style: { width: '100px' } }),
        dataIndex: 'ExchangeRate',
        sorter: true,
        align: 'right',
    },
    {
        title: i18n.t(LocaleHelper.getFeeReconciliationBillNumber()),
        width: 100,
        onHeaderCell: () => ({ style: { width: '100px' } }),
        dataIndex: 'BillNumber',
        sorter: true,
        align: 'left',
    },
    {
        title: i18n.t(LocaleHelper.getFeeReconciliationSettlementObject()),
        width: 100,
        onHeaderCell: () => ({ style: { width: '100px' } }),
        dataIndex: 'SettlementObject',
        sorter: true,
        align: 'left',
    },
    {
        title: i18n.t(LocaleHelper.getFeeReconciliationCargoType()),
        width: 100,
        onHeaderCell: () => ({ style: { width: '100px' } }),
        dataIndex: 'CargoType',
        sorter: true,
        align: 'left',
    },
    {
        title: i18n.t(LocaleHelper.getFeeReconciliationMasterWaybillNumber()),
        width: 100,
        onHeaderCell: () => ({ style: { width: '100px' } }),
        dataIndex: 'MasterWaybillNumber',
        sorter: true,
        align: 'left',
    },
    {
        title: i18n.t(LocaleHelper.getFeeReconciliationHouseWaybillNumber()),
        width: 100,
        onHeaderCell: () => ({ style: { width: '100px' } }),
        dataIndex: 'HouseWaybillNumber',
        sorter: true,
        align: 'left',
    },
    {
        title: i18n.t(LocaleHelper.getFeeReconciliationConsignor()),
        width: 100,
        onHeaderCell: () => ({ style: { width: '100px' } }),
        dataIndex: 'Consignor',
        sorter: true,
        align: 'left',
    },
    {
        title: i18n.t(LocaleHelper.getFeeReconciliationBusinessType()),
        width: 100,
        onHeaderCell: () => ({ style: { width: '100px' } }),
        dataIndex: 'BusinessType',
        sorter: true,
        align: 'left',
    },
    {
        title: i18n.t(LocaleHelper.getFeeReconciliationBusinessDate()),
        width: 100,
        onHeaderCell: () => ({ style: { width: '100px' } }),
        dataIndex: 'BusinessDate',
        sorter: true,
        align: 'center',
    },
    {
        title: i18n.t(LocaleHelper.getFeeReconciliationIsFba()),
        width: 100,
        onHeaderCell: () => ({ style: { width: '100px' } }),
        dataIndex: 'IsFba',
        sorter: true,
        align: 'right',
    },
    {
        title: i18n.t(LocaleHelper.getFeeReconciliationAmazonWarehouseCode()),
        width: 100,
        onHeaderCell: () => ({ style: { width: '100px' } }),
        dataIndex: 'AmazonWarehouseCode',
        sorter: true,
        align: 'left',
    },
    {
        title: i18n.t(LocaleHelper.getFeeReconciliationDestinationDeliveryMethod()),
        width: 100,
        onHeaderCell: () => ({ style: { width: '100px' } }),
        dataIndex: 'DestinationDeliveryMethod',
        sorter: true,
        align: 'left',
    },
    {
        title: i18n.t(LocaleHelper.getFeeReconciliationCourierNumber()),
        width: 100,
        onHeaderCell: () => ({ style: { width: '100px' } }),
        dataIndex: 'CourierNumber',
        sorter: true,
        align: 'left',
    },
    {
        title: i18n.t(LocaleHelper.getFeeReconciliationIsRemoteWarehouse()),
        width: 100,
        onHeaderCell: () => ({ style: { width: '100px' } }),
        dataIndex: 'IsRemoteWarehouse',
        sorter: true,
        align: 'right',
    },
    {
        title: i18n.t(LocaleHelper.getFeeReconciliationShipNameAndVoyage()),
        width: 100,
        onHeaderCell: () => ({ style: { width: '100px' } }),
        dataIndex: 'ShipNameAndVoyage',
        sorter: true,
        align: 'left',
    },
    {
        title: i18n.t(LocaleHelper.getFeeReconciliationPortOfLoading()),
        width: 100,
        onHeaderCell: () => ({ style: { width: '100px' } }),
        dataIndex: 'PortOfLoading',
        sorter: true,
        align: 'left',
    },
    {
        title: i18n.t(LocaleHelper.getFeeReconciliationPortOfDestination()),
        width: 100,
        onHeaderCell: () => ({ style: { width: '100px' } }),
        dataIndex: 'PortOfDestination',
        sorter: true,
        align: 'left',
    },
    {
        title: i18n.t(LocaleHelper.getFeeReconciliationBookingAgent()),
        width: 100,
        onHeaderCell: () => ({ style: { width: '100px' } }),
        dataIndex: 'BookingAgent',
        sorter: true,
        align: 'left',
    },
    {
        title: i18n.t(LocaleHelper.getFeeReconciliationOriginStation()),
        width: 100,
        onHeaderCell: () => ({ style: { width: '100px' } }),
        dataIndex: 'OriginStation',
        sorter: true,
        align: 'left',
    },
    {
        title: i18n.t(LocaleHelper.getFeeReconciliationDestinationStation()),
        width: 100,
        onHeaderCell: () => ({ style: { width: '100px' } }),
        dataIndex: 'DestinationStation',
        sorter: true,
        align: 'left',
    },
    {
        title: i18n.t(LocaleHelper.getFeeReconciliationTransitStation()),
        width: 100,
        onHeaderCell: () => ({ style: { width: '100px' } }),
        dataIndex: 'TransitStation',
        sorter: true,
        align: 'left',
    },
    {
        title: i18n.t(LocaleHelper.getFeeReconciliationDestinationAgent()),
        width: 100,
        onHeaderCell: () => ({ style: { width: '100px' } }),
        dataIndex: 'DestinationAgent',
        sorter: true,
        align: 'left',
    },
    {
        title: i18n.t(LocaleHelper.getFeeReconciliationSalesPerson()),
        width: 100,
        onHeaderCell: () => ({ style: { width: '100px' } }),
        dataIndex: 'SalesPerson',
        sorter: true,
        align: 'left',
    },
    {
        title: i18n.t(LocaleHelper.getFeeReconciliationOperationPerson()),
        width: 100,
        onHeaderCell: () => ({ style: { width: '100px' } }),
        dataIndex: 'OperationPerson',
        sorter: true,
        align: 'left',
    },
    {
        title: i18n.t(LocaleHelper.getFeeReconciliationCustomerServicePerson()),
        width: 100,
        onHeaderCell: () => ({ style: { width: '100px' } }),
        dataIndex: 'CustomerServicePerson',
        sorter: true,
        align: 'left',
    },
    {
        title: i18n.t(LocaleHelper.getFeeReconciliationDocumentPerson()),
        width: 100,
        onHeaderCell: () => ({ style: { width: '100px' } }),
        dataIndex: 'DocumentPerson',
        sorter: true,
        align: 'left',
    },
    {
        title: i18n.t(LocaleHelper.getFeeReconciliationBusinessReferenceNumber()),
        width: 100,
        onHeaderCell: () => ({ style: { width: '100px' } }),
        dataIndex: 'BusinessReferenceNumber',
        sorter: true,
        align: 'left',
    },
    {
        title: i18n.t(LocaleHelper.getFeeReconciliationAccrualAmount()),
        width: 100,
        onHeaderCell: () => ({ style: { width: '100px' } }),
        dataIndex: 'AccrualAmount',
        sorter: true,
        align: 'right',
    },
    {
        title: i18n.t(LocaleHelper.getFeeReconciliationFinancialDate()),
        width: 100,
        onHeaderCell: () => ({ style: { width: '100px' } }),
        dataIndex: 'FinancialDate',
        sorter: true,
        align: 'center',
    },
    {
        title: i18n.t(LocaleHelper.getFeeReconciliationDomesticOrForeign()),
        width: 100,
        onHeaderCell: () => ({ style: { width: '100px' } }),
        dataIndex: 'DomesticOrForeign',
        sorter: true,
        align: 'left',
    },
    {
        title: i18n.t(LocaleHelper.getFeeReconciliationRevenueOrExpenditureType()),
        width: 100,
        onHeaderCell: () => ({ style: { width: '100px' } }),
        dataIndex: 'RevenueOrExpenditureType',
        sorter: true,
        align: 'left',
    },
    {
        title: i18n.t(LocaleHelper.getFeeReconciliationFeeStatus()),
        width: 100,
        onHeaderCell: () => ({ style: { width: '100px' } }),
        dataIndex: 'FeeStatus',
        sorter: true,
        align: 'left',
    },
    {
        title: i18n.t(LocaleHelper.getFeeReconciliationAuditor()),
        width: 100,
        onHeaderCell: () => ({ style: { width: '100px' } }),
        dataIndex: 'Auditor',
        sorter: true,
        align: 'left',
    },
    {
        title: i18n.t(LocaleHelper.getFeeReconciliationConfirmationStatus()),
        width: 100,
        onHeaderCell: () => ({ style: { width: '100px' } }),
        dataIndex: 'ConfirmationStatus',
        sorter: true,
        align: 'left',
    },
    {
        title: i18n.t(LocaleHelper.getFeeReconciliationFeeName()),
        width: 100,
        onHeaderCell: () => ({ style: { width: '100px' } }),
        dataIndex: 'FeeName',
        sorter: true,
        align: 'left',
    },
    {
        title: i18n.t(LocaleHelper.getFeeReconciliationUnit()),
        width: 100,
        onHeaderCell: () => ({ style: { width: '100px' } }),
        dataIndex: 'Unit',
        sorter: true,
        align: 'left',
    },
    {
        title: i18n.t(LocaleHelper.getFeeReconciliationCurrency()),
        width: 100,
        onHeaderCell: () => ({ style: { width: '100px' } }),
        dataIndex: 'Currency',
        sorter: true,
        align: 'left',
    },
    {
        title: i18n.t(LocaleHelper.getFeeReconciliationQuantity()),
        width: 100,
        onHeaderCell: () => ({ style: { width: '100px' } }),
        dataIndex: 'Quantity',
        sorter: true,
        align: 'right',
    },
    {
        title: i18n.t(LocaleHelper.getFeeReconciliationUnitPrice()),
        width: 100,
        onHeaderCell: () => ({ style: { width: '100px' } }),
        dataIndex: 'UnitPrice',
        sorter: true,
        align: 'right',
    },
    {
        title: i18n.t(LocaleHelper.getFeeReconciliationTaxInclusivePrice()),
        width: 100,
        onHeaderCell: () => ({ style: { width: '100px' } }),
        dataIndex: 'TaxInclusivePrice',
        sorter: true,
        align: 'right',
    },
    {
        title: i18n.t(LocaleHelper.getFeeReconciliationTaxExclusivePrice()),
        width: 100,
        onHeaderCell: () => ({ style: { width: '100px' } }),
        dataIndex: 'TaxExclusivePrice',
        sorter: true,
        align: 'right',
    },
    {
        title: i18n.t(LocaleHelper.getFeeReconciliationTaxAmount()),
        width: 100,
        onHeaderCell: () => ({ style: { width: '100px' } }),
        dataIndex: 'TaxAmount',
        sorter: true,
        align: 'right',
    },
    {
        title: i18n.t(LocaleHelper.getFeeReconciliationTaxRate()),
        width: 100,
        onHeaderCell: () => ({ style: { width: '100px' } }),
        dataIndex: 'TaxRate',
        sorter: true,
        align: 'right',
    },
    {
        title: i18n.t(LocaleHelper.getFeeReconciliationWriteOffAmount()),
        width: 100,
        onHeaderCell: () => ({ style: { width: '100px' } }),
        dataIndex: 'WriteOffAmount',
        sorter: true,
        align: 'right',
    },
    {
        title: i18n.t(LocaleHelper.getFeeReconciliationUnwrittenAmount()),
        width: 100,
        onHeaderCell: () => ({ style: { width: '100px' } }),
        dataIndex: 'UnwrittenAmount',
        sorter: true,
        align: 'right',
    },
    {
        title: i18n.t(LocaleHelper.getFeeReconciliationContactPerson()),
        width: 100,
        onHeaderCell: () => ({ style: { width: '100px' } }),
        dataIndex: 'ContactPerson',
        sorter: true,
        align: 'left',
    },
    {
        title: i18n.t(LocaleHelper.getFeeReconciliationCreator()),
        width: 100,
        onHeaderCell: () => ({ style: { width: '100px' } }),
        dataIndex: 'Creator',
        sorter: true,
        align: 'left',
    },
    {
        title: i18n.t(LocaleHelper.getFeeReconciliationRemark()),
        width: 100,
        onHeaderCell: () => ({ style: { width: '100px' } }),
        dataIndex: 'Remark',
        sorter: true,
        align: 'left',
    },
    {
        title: i18n.t(LocaleHelper.getFeeReconciliationRelatedNumber()),
        width: 100,
        onHeaderCell: () => ({ style: { width: '100px' } }),
        dataIndex: 'RelatedNumber',
        sorter: true,
        align: 'left',
    },
    {
        title: i18n.t(LocaleHelper.getFeeReconciliationConsignmentRelatedNumber()),
        width: 100,
        onHeaderCell: () => ({ style: { width: '100px' } }),
        dataIndex: 'ConsignmentRelatedNumber',
        sorter: true,
        align: 'left',
    },
    {
        title: i18n.t(LocaleHelper.getFeeReconciliationCarrier()),
        width: 100,
        onHeaderCell: () => ({ style: { width: '100px' } }),
        dataIndex: 'Carrier',
        sorter: true,
        align: 'left',
    },
    {
        title: i18n.t(LocaleHelper.getFeeReconciliationConfirmationDate()),
        width: 100,
        onHeaderCell: () => ({ style: { width: '100px' } }),
        dataIndex: 'ConfirmationDate',
        sorter: true,
        align: 'center',
    },
    {
        title: i18n.t(LocaleHelper.getFeeReconciliationFeeConfirmationPerson()),
        width: 100,
        onHeaderCell: () => ({ style: { width: '100px' } }),
        dataIndex: 'FeeConfirmationPerson',
        sorter: true,
        align: 'left',
    },
    {
        title: i18n.t(LocaleHelper.getFeeReconciliationRouteManager()),
        width: 100,
        onHeaderCell: () => ({ style: { width: '100px' } }),
        dataIndex: 'RouteManager',
        sorter: true,
        align: 'left',
    },
    {
        title: i18n.t(LocaleHelper.getFeeReconciliationInvoiceDate()),
        width: 100,
        onHeaderCell: () => ({ style: { width: '100px' } }),
        dataIndex: 'InvoiceDate',
        sorter: true,
        align: 'center',
    },
    {
        title: i18n.t(LocaleHelper.getFeeReconciliationInvoiceNumber()),
        width: 100,
        onHeaderCell: () => ({ style: { width: '100px' } }),
        dataIndex: 'InvoiceNumber',
        sorter: true,
        align: 'left',
    },
    {
        title: i18n.t(LocaleHelper.getFeeReconciliationInvoiceTitle()),
        width: 100,
        onHeaderCell: () => ({ style: { width: '100px' } }),
        dataIndex: 'InvoiceTitle',
        sorter: true,
        align: 'left',
    },
    {
        title: i18n.t(LocaleHelper.getFeeReconciliationIsInvoiceRequired()),
        width: 100,
        onHeaderCell: () => ({ style: { width: '100px' } }),
        dataIndex: 'IsInvoiceRequired',
        sorter: true,
        align: 'right',
    },
    {
        title: i18n.t(LocaleHelper.getFeeReconciliationWriteOffDate()),
        width: 100,
        onHeaderCell: () => ({ style: { width: '100px' } }),
        dataIndex: 'WriteOffDate',
        sorter: true,
        align: 'center',
    },
    {
        title: i18n.t(LocaleHelper.getFeeReconciliationBusinessStatus()),
        width: 100,
        onHeaderCell: () => ({ style: { width: '100px' } }),
        dataIndex: 'BusinessStatus',
        sorter: true,
        align: 'left',
    },
    {
        title: i18n.t(LocaleHelper.getFeeReconciliationBargeSailingDate()),
        width: 100,
        onHeaderCell: () => ({ style: { width: '100px' } }),
        dataIndex: 'BargeSailingDate',
        sorter: true,
        align: 'center',
    },
    {
        title: i18n.t(LocaleHelper.getFeeReconciliationBargeName()),
        width: 100,
        onHeaderCell: () => ({ style: { width: '100px' } }),
        dataIndex: 'BargeName',
        sorter: true,
        align: 'left',
    },
    {
        title: i18n.t(LocaleHelper.getFeeReconciliationBargeVoyage()),
        width: 100,
        onHeaderCell: () => ({ style: { width: '100px' } }),
        dataIndex: 'BargeVoyage',
        sorter: true,
        align: 'left',
    },
    {
        title: i18n.t(LocaleHelper.getFeeReconciliationBargePortOfLoading()),
        width: 100,
        onHeaderCell: () => ({ style: { width: '100px' } }),
        dataIndex: 'BargePortOfLoading',
        sorter: true,
        align: 'left',
    },
    {
        title: i18n.t(LocaleHelper.getFeeReconciliationPaymentDate()),
        width: 100,
        onHeaderCell: () => ({ style: { width: '100px' } }),
        dataIndex: 'PaymentDate',
        sorter: true,
        align: 'center',
    },
    {
        title: i18n.t(LocaleHelper.getFeeReconciliationSalesDepartment()),
        width: 100,
        onHeaderCell: () => ({ style: { width: '100px' } }),
        dataIndex: 'SalesDepartment',
        sorter: true,
        align: 'left',
    },
    {
        title: i18n.t(LocaleHelper.getFeeReconciliationDeliveryTime()),
        width: 100,
        onHeaderCell: () => ({ style: { width: '100px' } }),
        dataIndex: 'DeliveryTime',
        sorter: true,
        align: 'center',
    },
    {
        title: i18n.t(LocaleHelper.getFeeReconciliationConfirmationRemark()),
        width: 100,
        onHeaderCell: () => ({ style: { width: '100px' } }),
        dataIndex: 'ConfirmationRemark',
        sorter: true,
        align: 'left',
    },
    {
        title: i18n.t(LocaleHelper.getFeeReconciliationFeeWriteOffStatus()),
        width: 100,
        onHeaderCell: () => ({ style: { width: '100px' } }),
        dataIndex: 'FeeWriteOffStatus',
        sorter: true,
        align: 'left',
    },
    {
        title: i18n.t(LocaleHelper.getFeeReconciliationOperationDate()),
        width: 100,
        onHeaderCell: () => ({ style: { width: '100px' } }),
        dataIndex: 'OperationDate',
        sorter: true,
        align: 'center',
    },
    {
        title: i18n.t(LocaleHelper.getFeeReconciliationEstimatedLoadingDate()),
        width: 100,
        onHeaderCell: () => ({ style: { width: '100px' } }),
        dataIndex: 'EstimatedLoadingDate',
        sorter: true,
        align: 'center',
    },
    {
        title: i18n.t(LocaleHelper.getFeeReconciliationActualReturnEmptyTime()),
        width: 100,
        onHeaderCell: () => ({ style: { width: '100px' } }),
        dataIndex: 'ActualReturnEmptyTime',
        sorter: true,
        align: 'center',
    },
    {
        title: i18n.t(LocaleHelper.getFeeReconciliationContainerQuantityDescription()),
        width: 100,
        onHeaderCell: () => ({ style: { width: '100px' } }),
        dataIndex: 'ContainerQuantityDescription',
        sorter: true,
        align: 'left',
    },
    {
        title: i18n.t(LocaleHelper.getFeeReconciliationFeeCreationDate()),
        width: 100,
        onHeaderCell: () => ({ style: { width: '100px' } }),
        dataIndex: 'FeeCreationDate',
        sorter: true,
        align: 'center',
    },
    {
        title: i18n.t(LocaleHelper.getFeeReconciliationCustomerLevel()),
        width: 100,
        onHeaderCell: () => ({ style: { width: '100px' } }),
        dataIndex: 'CustomerLevel',
        sorter: true,
        align: 'left',
    },
    {
        title: i18n.t(LocaleHelper.getFeeReconciliationDeliveryCompletionTime()),
        width: 100,
        onHeaderCell: () => ({ style: { width: '100px' } }),
        dataIndex: 'DeliveryCompletionTime',
        sorter: true,
        align: 'center',
    },
    {
        title: i18n.t(LocaleHelper.getFeeReconciliationFeeChanger()),
        width: 100,
        onHeaderCell: () => ({ style: { width: '100px' } }),
        dataIndex: 'FeeChanger',
        sorter: true,
        align: 'left',
    },
    {
        title: i18n.t(LocaleHelper.getFeeReconciliationSettlementAgent()),
        width: 100,
        onHeaderCell: () => ({ style: { width: '100px' } }),
        dataIndex: 'SettlementAgent',
        sorter: true,
        align: 'left',
    },
    {
        title: i18n.t(LocaleHelper.getFeeReconciliationIsFeeAdjusted()),
        width: 100,
        onHeaderCell: () => ({ style: { width: '100px' } }),
        dataIndex: 'IsFeeAdjusted',
        sorter: true,
        align: 'right',
    },
    {
        title: i18n.t(LocaleHelper.getFeeReconciliationRoute()),
        width: 100,
        onHeaderCell: () => ({ style: { width: '100px' } }),
        dataIndex: 'Route',
        sorter: true,
        align: 'left',
    },
    {
        title: i18n.t(LocaleHelper.getFeeReconciliationFeeModificationTime()),
        width: 100,
        onHeaderCell: () => ({ style: { width: '100px' } }),
        dataIndex: 'FeeModificationTime',
        sorter: true,
        align: 'center',
    },
    {
        title: i18n.t(LocaleHelper.getFeeReconciliationFeeModifier()),
        width: 100,
        onHeaderCell: () => ({ style: { width: '100px' } }),
        dataIndex: 'FeeModifier',
        sorter: true,
        align: 'left',
    },
    {
        title: i18n.t(LocaleHelper.getFeeReconciliationBillDate()),
        width: 100,
        onHeaderCell: () => ({ style: { width: '100px' } }),
        dataIndex: 'BillDate',
        sorter: true,
        align: 'left',
    },
    {
        title: i18n.t(LocaleHelper.getFeeReconciliationInvoiceDueDate()),
        width: 100,
        onHeaderCell: () => ({ style: { width: '100px' } }),
        dataIndex: 'InvoiceDueDate',
        sorter: true,
        align: 'center',
    },
    {
        title: i18n.t(LocaleHelper.getFeeReconciliationCounterpartyInvoiceNumber()),
        width: 100,
        onHeaderCell: () => ({ style: { width: '100px' } }),
        dataIndex: 'CounterpartyInvoiceNumber',
        sorter: true,
        align: 'left',
    },
    {
        title: i18n.t(LocaleHelper.getFeeReconciliationReceivableWriteOffStatus()),
        width: 100,
        onHeaderCell: () => ({ style: { width: '100px' } }),
        dataIndex: 'ReceivableWriteOffStatus',
        sorter: true,
        align: 'left',
    },
    {
        title: i18n.t(LocaleHelper.getFeeReconciliationDesignatedForwarder()),
        width: 100,
        onHeaderCell: () => ({ style: { width: '100px' } }),
        dataIndex: 'DesignatedForwarder',
        sorter: true,
        align: 'left',
    },
    {
        title: i18n.t(LocaleHelper.getFeeReconciliationActualLoadingDate()),
        width: 100,
        onHeaderCell: () => ({ style: { width: '100px' } }),
        dataIndex: 'ActualLoadingDate',
        sorter: true,
        align: 'center',
    },
    {
        title: i18n.t(LocaleHelper.getFeeReconciliationCounterpartyCounterNumber()),
        width: 100,
        onHeaderCell: () => ({ style: { width: '100px' } }),
        dataIndex: 'CounterpartyCounterNumber',
        sorter: true,
        align: 'left',
    },
    {
        title: i18n.t(LocaleHelper.getFeeReconciliationFeeDueDate()),
        width: 100,
        onHeaderCell: () => ({ style: { width: '100px' } }),
        dataIndex: 'FeeDueDate',
        sorter: true,
        align: 'center',
    },
    {
        title: i18n.t(LocaleHelper.getFeeReconciliationRelatedFeeId()),
        width: 100,
        onHeaderCell: () => ({ style: { width: '100px' } }),
        dataIndex: 'RelatedFeeId',
        sorter: true,
        align: 'left',
    },
    {
        title: i18n.t(LocaleHelper.getFeeReconciliationFeeId()),
        width: 100,
        onHeaderCell: () => ({ style: { width: '100px' } }),
        dataIndex: 'FeeId',
        sorter: true,
        align: 'left',
    },
    {
        title: i18n.t(LocaleHelper.getFeeReconciliationDataSource()),
        width: 100,
        onHeaderCell: () => ({ style: { width: '100px' } }),
        dataIndex: 'DataSource',
        sorter: true,
        align: 'left',
    },
    {
        title: i18n.t(LocaleHelper.getFeeReconciliationFeeContainerNumber()),
        width: 100,
        onHeaderCell: () => ({ style: { width: '100px' } }),
        dataIndex: 'FeeContainerNumber',
        sorter: true,
        align: 'left',
    },
    {
        title: i18n.t(LocaleHelper.getFeeReconciliationPickupDeliveryLocation()),
        width: 100,
        onHeaderCell: () => ({ style: { width: '100px' } }),
        dataIndex: 'PickupDeliveryLocation',
        sorter: true,
        align: 'left',
    },
    {
        title: i18n.t(LocaleHelper.getFeeReconciliationActualPickupTime()),
        width: 100,
        onHeaderCell: () => ({ style: { width: '100px' } }),
        dataIndex: 'ActualPickupTime',
        sorter: true,
        align: 'center',
    },
    {
        title: i18n.t(LocaleHelper.getFeeReconciliationWriteOffBank()),
        width: 100,
        onHeaderCell: () => ({ style: { width: '100px' } }),
        dataIndex: 'WriteOffBank',
        sorter: true,
        align: 'left',
    },
    {
        title: i18n.t(LocaleHelper.getFeeReconciliationParentCompany()),
        width: 100,
        onHeaderCell: () => ({ style: { width: '100px' } }),
        dataIndex: 'ParentCompany',
        sorter: true,
        align: 'left',
    },
    {
        title: i18n.t(LocaleHelper.getFeeReconciliationSettlementDepartment()),
        width: 100,
        onHeaderCell: () => ({ style: { width: '100px' } }),
        dataIndex: 'SettlementDepartment',
        sorter: true,
        align: 'left',
    },
    {
        title: i18n.t(LocaleHelper.getFeeReconciliationCargoSales()),
        width: 100,
        onHeaderCell: () => ({ style: { width: '100px' } }),
        dataIndex: 'CargoSales',
        sorter: true,
        align: 'left',
    },
    {
        title: i18n.t(LocaleHelper.getFeeReconciliationSalesBranch()),
        width: 100,
        onHeaderCell: () => ({ style: { width: '100px' } }),
        dataIndex: 'SalesBranch',
        sorter: true,
        align: 'left',
    },
    {
        title: i18n.t(LocaleHelper.getFeeReconciliationOperationBranch()),
        width: 100,
        onHeaderCell: () => ({ style: { width: '100px' } }),
        dataIndex: 'OperationBranch',
        sorter: true,
        align: 'left',
    },
    {
        title: i18n.t(LocaleHelper.getFeeReconciliationFeeSyncStatus()),
        width: 100,
        onHeaderCell: () => ({ style: { width: '100px' } }),
        dataIndex: 'FeeSyncStatus',
        sorter: true,
        align: 'left',
    },
    {
        title: i18n.t(LocaleHelper.getFeeReconciliationExchangeAgent()),
        width: 100,
        onHeaderCell: () => ({ style: { width: '100px' } }),
        dataIndex: 'ExchangeAgent',
        sorter: true,
        align: 'left',
    },
    {
        title: i18n.t(LocaleHelper.getFeeReconciliationReconciliationAmount()),
        width: 100,
        onHeaderCell: () => ({ style: { width: '100px' } }),
        dataIndex: 'ReconciliationAmount',
        sorter: true,
        align: 'right',
    },
    {
        title: i18n.t(LocaleHelper.getFeeReconciliationDifference()),
        width: 100,
        onHeaderCell: () => ({ style: { width: '100px' } }),
        dataIndex: 'Difference',
        sorter: true,
        align: 'right',
    },
    {
        title: i18n.t(LocaleHelper.getFeeReconciliationIsConfirmed()),
        width: 100,
        onHeaderCell: () => ({ style: { width: '100px' } }),
        dataIndex: 'IsConfirmed',
        sorter: true,
        align: 'right',
    },
    {
        title: i18n.t(LocaleHelper.getFeeReconciliationSettlementObjectTerm()),
        width: 100,
        onHeaderCell: () => ({ style: { width: '100px' } }),
        dataIndex: 'SettlementObjectTerm',
        sorter: true,
        align: 'left',
    },
    {
        title: i18n.t(LocaleHelper.getFeeReconciliationSettlementMethod()),
        width: 100,
        onHeaderCell: () => ({ style: { width: '100px' } }),
        dataIndex: 'SettlementMethod',
        sorter: true,
        align: 'left',
    },
    {
        title: i18n.t(LocaleHelper.getFeeReconciliationAuditDate()),
        width: 100,
        onHeaderCell: () => ({ style: { width: '100px' } }),
        dataIndex: 'AuditDate',
        sorter: true,
        align: 'center',
    },
    {
        title: i18n.t(LocaleHelper.getFeeReconciliationGpDescription()),
        width: 100,
        onHeaderCell: () => ({ style: { width: '100px' } }),
        dataIndex: 'GpDescription',
        sorter: true,
        align: 'left',
    },
    {
        title: i18n.t(LocaleHelper.getFeeReconciliationChargeableWeightActual()),
        width: 100,
        onHeaderCell: () => ({ style: { width: '100px' } }),
        dataIndex: 'ChargeableWeightActual',
        sorter: true,
        align: 'right',
    },
    {
        title: i18n.t(LocaleHelper.getFeeReconciliationChargeableWeightCommission()),
        width: 100,
        onHeaderCell: () => ({ style: { width: '100px' } }),
        dataIndex: 'ChargeableWeightCommission',
        sorter: true,
        align: 'right',
    },
    {
        title: i18n.t(LocaleHelper.getFeeReconciliationNumberOfPiecesActual()),
        width: 100,
        onHeaderCell: () => ({ style: { width: '100px' } }),
        dataIndex: 'NumberOfPiecesActual',
        sorter: true,
        align: 'right',
    },
    {
        title: i18n.t(LocaleHelper.getFeeReconciliationNumberOfPiecesCommission()),
        width: 100,
        onHeaderCell: () => ({ style: { width: '100px' } }),
        dataIndex: 'NumberOfPiecesCommission',
        sorter: true,
        align: 'right',
    },
    {
        title: i18n.t(LocaleHelper.getFeeReconciliationVolumeActual()),
        width: 100,
        onHeaderCell: () => ({ style: { width: '100px' } }),
        dataIndex: 'VolumeActual',
        sorter: true,
        align: 'right',
    },
    {
        title: i18n.t(LocaleHelper.getFeeReconciliationVolumeCommission()),
        width: 100,
        onHeaderCell: () => ({ style: { width: '100px' } }),
        dataIndex: 'VolumeCommission',
        sorter: true,
        align: 'right',
    },
    {
        title: i18n.t(LocaleHelper.getFeeReconciliationGrossWeightCommission()),
        width: 100,
        onHeaderCell: () => ({ style: { width: '100px' } }),
        dataIndex: 'GrossWeightCommission',
        sorter: true,
        align: 'right',
    },
    {
        title: i18n.t(LocaleHelper.getFeeReconciliationGrossWeightActual()),
        width: 100,
        onHeaderCell: () => ({ style: { width: '100px' } }),
        dataIndex: 'GrossWeightActual',
        sorter: true,
        align: 'right',
    },
]; 

export const getFeeSumColumns = () => [
    {
        title: '',
        width: 60,
        dataIndex: 'sum_title',
        align: 'left',
    },
    {
        title: 'RMB',
        width: 100,
        dataIndex: 'rmb',
        align: 'right',
        render: (text:any) => (
            new Intl.NumberFormat('zh-CN', { style: 'decimal' }).format(text)
        ),
        
    },
    {
        title: 'USD',
        width: 100,
        dataIndex: 'usd',
        align: 'right',
        render: (text:any) => (
            new Intl.NumberFormat('zh-CN', { style: 'decimal' }).format(text)
        ),
    },
    {
        title: 'EUR',
        width: 100,
        dataIndex: 'eur',
        align: 'right',
        render: (text:any) => (
            new Intl.NumberFormat('zh-CN', { style: 'decimal' }).format(text)
        ),
    },
]; 
