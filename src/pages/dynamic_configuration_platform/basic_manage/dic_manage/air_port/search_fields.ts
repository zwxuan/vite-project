import { AdvancedSearchFormProps } from "@/components/search-form";
import i18n from '@/i18n';
import LocaleHelper from '@/utils/localeHelper';
export const fields: AdvancedSearchFormProps["fields"] = [

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
        type: 'date',
        label: i18n.t(LocaleHelper.getOrdersDepartureDate()),
        key: 'DepartureDate',
    },
    
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getOrdersSalesDepartment()),
        key: 'SalesDepartment',
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
        label: i18n.t(LocaleHelper.getOrdersPayableVerificationStatus()),
        key: 'PayableVerificationStatus',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getOrdersReceivableVerificationStatus()),
        key: 'ReceivableVerificationStatus',
    },
    
    {
        type: 'date',
        label: i18n.t(LocaleHelper.getOrdersArrivalDate()),
        key: 'ArrivalDate',
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
        type: 'date',
        label: i18n.t(LocaleHelper.getOrdersDeliveryDate()),
        key: 'DeliveryDate',
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
        label: i18n.t(LocaleHelper.getOrdersSopStatus()),
        key: 'SopStatus',
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
    
    
]; 