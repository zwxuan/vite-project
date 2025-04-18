
import React from 'react';
import { Descriptions,Collapse, Card } from 'antd';
import type { DescriptionsProps} from 'antd';
import i18n from '@/i18n';
import LocaleHelper from '@/utils/localeHelper';
const BaseBusiness: React.FC = () => {
    const baseItems: DescriptionsProps['items'] = [
        {
            key: 'BusinessId',
            label: i18n.t(LocaleHelper.getOrdersBusinessId()),
            labelStyle: { width: '120px', textAlign: 'right'},
            contentStyle: {textAlign: 'left' },
            children: '',
            span: 2,
        },
        {
            key: 'MainOrderNumber',
            label: i18n.t(LocaleHelper.getOrdersMainOrderNumber()),
            labelStyle: { width: '120px', textAlign: 'right' },
            contentStyle: {textAlign: 'left' },
            children: '',
            span: 2,
        },
        {
            key: 'Carrier',
            label: i18n.t(LocaleHelper.getOrdersCarrier()),
            labelStyle: { width: '120px', textAlign: 'right' },
            contentStyle: {textAlign: 'left' },
            children: '',
            span: 2,
        },
        {
            key: 'ShipName',
            label: i18n.t(LocaleHelper.getOrdersShipName()),
            labelStyle: { width: '120px', textAlign: 'right' },
            contentStyle: {textAlign: 'left' },
            children: '',
            span: 2,
        },
        {
            key: 'Voyage',
            label: i18n.t(LocaleHelper.getOrdersVoyage()),
            labelStyle: { width: '120px', textAlign: 'right' },
            contentStyle: {textAlign: 'left' },
            children: '',
            span: 2,
        },
        {
            key: 'Customer',
            label: i18n.t(LocaleHelper.getOrdersCustomer()),
            labelStyle: { width: '120px', textAlign: 'right' },
            contentStyle: {textAlign: 'left' },
            children: '',
            span: 2,
        },
        {
            key: 'BusinessDate',
            label: i18n.t(LocaleHelper.getOrdersBusinessDate()),
            labelStyle: { width: '120px', textAlign: 'right' },
            contentStyle: {textAlign: 'left' },
            children: '',
            span: 2,
        },
        {
            key: 'ContractStatus',
            label: i18n.t(LocaleHelper.getOrdersContractStatus()),
            labelStyle: { width: '120px', textAlign: 'right' },
            contentStyle: {textAlign: 'left' },
            children: '',
            span: 2,
        },
        {
            key: 'DeparturePort',
            label: i18n.t(LocaleHelper.getOrdersDeparturePort()),
            labelStyle: { width: '120px', textAlign: 'right' },
            contentStyle: {textAlign: 'left' },
            children: '',
            span: 2,
        },
        {
            key: 'DestinationPort',
            label: i18n.t(LocaleHelper.getOrdersDestinationPort()),
            labelStyle: { width: '120px', textAlign: 'right' },
            contentStyle: {textAlign: 'left' },
            children: '',
            span: 2,
        },
        {
            key: 'DepartureDate',
            label: i18n.t(LocaleHelper.getOrdersDepartureDate()),
            labelStyle: { width: '120px', textAlign: 'right' },
            contentStyle: {textAlign: 'left' },
            children: '',
            span: 2,
        },
        {
            key: 'CustomerService',
            label: i18n.t(LocaleHelper.getOrdersCustomerService()),
            labelStyle: { width: '120px', textAlign: 'right' },
            contentStyle: {textAlign: 'left' },
            children: '',
            span: 2,
        },
        {
            key: 'BookingAgent',
            label: i18n.t(LocaleHelper.getOrdersBookingAgent()),
            labelStyle: { width: '120px', textAlign: 'right' },
            contentStyle: {textAlign: 'left' },
            children: '',
            span: 2,
        },
        {
            key: 'Status',
            label: i18n.t(LocaleHelper.getOrdersStatus()),
            labelStyle: { width: '120px', textAlign: 'right' },
            contentStyle: {textAlign: 'left' },
            children: '',
            span: 2,
        },
        {
            key: 'BusinessType',
            label: i18n.t(LocaleHelper.getOrdersBusinessType()),
            labelStyle: { width: '120px', textAlign: 'right' },
            contentStyle: {textAlign: 'left' },
            children: '',
            span: 2,
        },
        {
            key: 'ArrivalDate',
            label: i18n.t(LocaleHelper.getOrdersArrivalDate()),
            labelStyle: { width: '120px', textAlign: 'right' },
            contentStyle: {textAlign: 'left' },
            children: '',
            span: 2,
        },
        {
            key: 'DesignatedFreightAgent',
            label: i18n.t(LocaleHelper.getOrdersDesignatedFreightAgent()),
            labelStyle: { width: '120px', textAlign: 'right' },
            contentStyle: {textAlign: 'left' },
            children: '',
            span: 2,
        },
        {
            key: 'FinalDestination',
            label: i18n.t(LocaleHelper.getOrdersFinalDestination()),
            labelStyle: { width: '120px', textAlign: 'right' },
            contentStyle: {textAlign: 'left' },
            children: '',
            span: 2,
        },
        {
            key: 'LocalService',
            label: i18n.t(LocaleHelper.getOrdersLocalService()),
            labelStyle: { width: '120px', textAlign: 'right' },
            contentStyle: {textAlign: 'left' },
            children: '',
            span: 2,
        },
        {
            key: 'CreationDate',
            label: i18n.t(LocaleHelper.getOrdersCreationDate()),
            labelStyle: { width: '120px', textAlign: 'right' },
            contentStyle: {textAlign: 'left' },
            children: '',
            span: 2,
        },
        {
            key: 'BusinessReferenceNumber',
            label: i18n.t(LocaleHelper.getOrdersBusinessReferenceNumber()),
            labelStyle: { width: '120px', textAlign: 'right' },
            contentStyle: {textAlign: 'left' },
            children: '',
            span: 2,
        },
        {
            key: 'DeliveryDate',
            label: i18n.t(LocaleHelper.getOrdersDeliveryDate()),
            labelStyle: { width: '120px', textAlign: 'right' },
            contentStyle: {textAlign: 'left' },
            children: '',
            span: 2,
        },
        {
            key: 'ShippingCompanyContractNumber',
            label: i18n.t(LocaleHelper.getOrdersShippingCompanyContractNumber()),
            labelStyle: { width: '120px', textAlign: 'right' },
            contentStyle: {textAlign: 'left' },
            children: '',
            span: 2,
        },
        {
            key: 'InternalContractNumber',
            label: i18n.t(LocaleHelper.getOrdersInternalContractNumber()),
            labelStyle: { width: '120px', textAlign: 'right' },
            contentStyle: {textAlign: 'left' },
            children: '',
            span: 2,
        },
        {
            key: 'ShippingRoute',
            label: i18n.t(LocaleHelper.getOrdersShippingRoute()),
            labelStyle: { width: '120px', textAlign: 'right' },
            contentStyle: {textAlign: 'left' },
            children: '',
            span: 2,
        },
        {
            key: 'OperationDate',
            label: i18n.t(LocaleHelper.getOrdersOperationDate()),
            labelStyle: { width: '120px', textAlign: 'right' },
            contentStyle: {textAlign: 'left' },
            children: '',
            span: 2,
        },
        {
            key: 'ActualDepartureDateAtd',
            label: i18n.t(LocaleHelper.getOrdersActualDepartureDateAtd()),
            labelStyle: { width: '120px', textAlign: 'right' },
            contentStyle: {textAlign: 'left' },
            children: '',
            span: 2,
        },
        {
            key: 'ActualArrivalDateAta',
            label: i18n.t(LocaleHelper.getOrdersActualArrivalDateAta()),
            labelStyle: { width: '120px', textAlign: 'right' },
            contentStyle: {textAlign: 'left' },
            children: '',
            span: 2,
        },
        {
            key: 'Consignee',
            label: i18n.t(LocaleHelper.getOrdersConsignee()),
            labelStyle: { width: '120px', textAlign: 'right' },
            contentStyle: {textAlign: 'left' },
            children: '',
            span: 2,
        },
        {
            key: 'Shipper',
            label: i18n.t(LocaleHelper.getOrdersShipper()),
            labelStyle: { width: '120px', textAlign: 'right' },
            contentStyle: {textAlign: 'left' },
            children: '',
            span: 2,
        },
        {
            key: 'CustomerContact',
            label: i18n.t(LocaleHelper.getOrdersCustomerContact()),
            labelStyle: { width: '120px', textAlign: 'right' },
            contentStyle: {textAlign: 'left' },
            children: '',
            span: 2,
        },
        {
            key: 'CargoType',
            label: i18n.t(LocaleHelper.getOrdersCargoType()),
            labelStyle: { width: '120px', textAlign: 'right' },
            contentStyle: {textAlign: 'left' },
            children: '',
            span: 2,
        },
        {
            key: 'ActualPickupTime',
            label: i18n.t(LocaleHelper.getOrdersActualPickupTime()),
            labelStyle: { width: '120px', textAlign: 'right' },
            contentStyle: {textAlign: 'left' },
            children: '',
            span: 2,
        },
        {
            key: 'ActualReturnEmptyTime',
            label: i18n.t(LocaleHelper.getOrdersActualReturnEmptyTime()),
            labelStyle: { width: '120px', textAlign: 'right' },
            contentStyle: {textAlign: 'left' },
            children: '',
            span: 2,
        },
        {
            key: 'SubOrderNumber',
            label: i18n.t(LocaleHelper.getOrdersSubOrderNumber()),
            labelStyle: { width: '120px', textAlign: 'right' },
            contentStyle: {textAlign: 'left' },
            children: '',
            span: 2,
        },
        {
            key: 'CustomerLevel',
            label: i18n.t(LocaleHelper.getOrdersCustomerLevel()),
            labelStyle: { width: '120px', textAlign: 'right' },
            contentStyle: {textAlign: 'left' },
            children: '',
            span: 2,
        },
        {
            key: 'ActualDeliveryTime',
            label: i18n.t(LocaleHelper.getOrdersActualDeliveryTime()),
            labelStyle: { width: '120px', textAlign: 'right' },
            contentStyle: {textAlign: 'left' },
            children: '',
            span: 2,
        },
        {
            key: 'BranchDepartureDate',
            label: i18n.t(LocaleHelper.getOrdersBranchDepartureDate()),
            labelStyle: { width: '120px', textAlign: 'right' },
            contentStyle: {textAlign: 'left' },
            children: '',
            span: 2,
        },
        {
            key: 'BranchArrivalDate',
            label: i18n.t(LocaleHelper.getOrdersBranchArrivalDate()),
            labelStyle: { width: '120px', textAlign: 'right' },
            contentStyle: {textAlign: 'left' },
            children: '',
            span: 2,
        },
        {
            key: 'BargeDepartureDate',
            label: i18n.t(LocaleHelper.getOrdersBargeDepartureDate()),
            labelStyle: { width: '120px', textAlign: 'right' },
            contentStyle: {textAlign: 'left' },
            children: '',
            span: 2,
        },
        {
            key: 'BargeArrivalDate',
            label: i18n.t(LocaleHelper.getOrdersBargeArrivalDate()),
            labelStyle: { width: '120px', textAlign: 'right' },
            contentStyle: {textAlign: 'left' },
            children: '',
            span: 2,
        },
        {
            key: 'Mark',
            label: i18n.t(LocaleHelper.getOrdersMark()),
            labelStyle: { width: '120px', textAlign: 'right' },
            contentStyle: {textAlign: 'left' },
            children: '',
            span: 2,
        },
        {
            key: 'EntryTime',
            label: i18n.t(LocaleHelper.getOrdersEntryTime()),
            labelStyle: { width: '120px', textAlign: 'right' },
            contentStyle: {textAlign: 'left' },
            children: '',
            span: 2,
        },
        {
            key: 'CollectionType',
            label: i18n.t(LocaleHelper.getOrdersCollectionType()),
            labelStyle: { width: '120px', textAlign: 'right' },
            contentStyle: {textAlign: 'left' },
            children: '',
            span: 2,
        },
      ];
      const attachItems: DescriptionsProps['items'] = [
        {
            key: 'ActualChargedWeight',
            label: i18n.t(LocaleHelper.getOrdersActualChargedWeight()),
            labelStyle: { width: '120px', textAlign: 'right' },
            contentStyle: {textAlign: 'right' },
            children: '',
            span: 2,
        },
        {
            key: 'EntrustedPieces',
            label: i18n.t(LocaleHelper.getOrdersEntrustedPieces()),
            labelStyle: { width: '120px', textAlign: 'right' },
            contentStyle: {textAlign: 'right' },
            children: '',
            span: 2,
        },
        {
            key: 'ContainerNumber',
            label: i18n.t(LocaleHelper.getOrdersContainerNumber()),
            labelStyle: { width: '120px', textAlign: 'right' },
            contentStyle: {textAlign: 'left' },
            children: '',
            span: 2,
        },
        {
            key: 'EntrustedGrossWeight',
            label: i18n.t(LocaleHelper.getOrdersEntrustedGrossWeight()),
            labelStyle: { width: '120px', textAlign: 'right' },
            contentStyle: {textAlign: 'right' },
            children: '',
            span: 2,
        },
        {
            key: 'EntrustedVolume',
            label: i18n.t(LocaleHelper.getOrdersEntrustedVolume()),
            labelStyle: { width: '120px', textAlign: 'right' },
            contentStyle: {textAlign: 'right' },
            children: '',
            span: 2,
        },
        {
            key: 'ActualPieces',
            label: i18n.t(LocaleHelper.getOrdersActualPieces()),
            labelStyle: { width: '120px', textAlign: 'right' },
            contentStyle: {textAlign: 'right' },
            children: '',
            span: 2,
        },
        {
            key: 'ActualGrossWeight',
            label: i18n.t(LocaleHelper.getOrdersActualGrossWeight()),
            labelStyle: { width: '120px', textAlign: 'right' },
            contentStyle: {textAlign: 'right' },
            children: '',
            span: 2,
        },
        {
            key: 'ActualVolume',
            label: i18n.t(LocaleHelper.getOrdersActualVolume()),
            labelStyle: { width: '120px', textAlign: 'right' },
            contentStyle: {textAlign: 'right' },
            children: '',
            span: 2,
        },
        {
            key: 'LocalService',
            label: i18n.t(LocaleHelper.getOrdersLocalService()),
            labelStyle: { width: '120px', textAlign: 'right' },
            contentStyle: {textAlign: 'left' },
            children: '',
            span: 2,
        },
        {
            key: 'ShippingCompanyContractNumber',
            label: i18n.t(LocaleHelper.getOrdersShippingCompanyContractNumber()),
            labelStyle: { width: '120px', textAlign: 'right' },
            contentStyle: {textAlign: 'left' },
            children: '',
            span: 2,
        },
        {
            key: 'InternalContractNumber',
            label: i18n.t(LocaleHelper.getOrdersInternalContractNumber()),
            labelStyle: { width: '120px', textAlign: 'right' },
            contentStyle: {textAlign: 'left' },
            children: '',
            span: 2,
        },
        {
            key: 'Teu',
            label: i18n.t(LocaleHelper.getOrdersTeu()),
            labelStyle: { width: '120px', textAlign: 'right' },
            contentStyle: {textAlign: 'right' },
            children: '',
            span: 2,
        },
        {
            key: 'ContainerTypeQuantity',
            label: i18n.t(LocaleHelper.getOrdersContainerTypeQuantity()),
            labelStyle: { width: '120px', textAlign: 'right' },
            contentStyle: {textAlign: 'left' },
            children: '',
            span: 2,
        },
      ];
      const operatorItems: DescriptionsProps['items'] = [
        {
            key: 'Operation',
            label: i18n.t(LocaleHelper.getOrdersOperation()),
            labelStyle: { width: '120px', textAlign: 'right' },
            contentStyle: {textAlign: 'left' },
            children: '',
            span: 2,
        },
        {
            key: 'OperationCompany',
            label: '操作公司',
            labelStyle: { width: '120px', textAlign: 'right' },
            contentStyle: {textAlign: 'left' },
            children: '',
            span: 4,
        },
        {
            key: 'OperationDept',
            label: '操作部门',
            labelStyle: { width: '120px', textAlign: 'right' },
            contentStyle: {textAlign: 'left' },
            children: '',
            span: 6,
        },
        {
            key: 'Sales',
            label: i18n.t(LocaleHelper.getOrdersSales()),
            labelStyle: { width: '120px', textAlign: 'right' },
            contentStyle: {textAlign: 'left' },
            children: '',
            span: 2,
        },
        {
            key: 'SalesCompany',
            label: '销售公司',
            labelStyle: { width: '120px', textAlign: 'right' },
            contentStyle: {textAlign: 'left' },
            children: '',
            span: 4,
        },
        {
            key: 'SalesDepartment',
            label: i18n.t(LocaleHelper.getOrdersSalesDepartment()),
            labelStyle: { width: '120px', textAlign: 'right' },
            contentStyle: {textAlign: 'left' },
            children: '',
            span: 6,
        },
        {
            key: 'OverseasService',
            label: i18n.t(LocaleHelper.getOrdersOverseasService()),
            labelStyle: { width: '120px', textAlign: 'right' },
            contentStyle: {textAlign: 'left' },
            children: '',
            span: 2,
        },
        {
            key: 'OverseasServiceCompany',
            label: '海外服务公司',
            labelStyle: { width: '120px', textAlign: 'right' },
            contentStyle: {textAlign: 'left' },
            children: '',
            span: 4,
        },
        {
            key: 'OverseasServiceDept',
            label: '海外服务部门',
            labelStyle: { width: '120px', textAlign: 'right' },
            contentStyle: {textAlign: 'left' },
            children: '',
            span: 6,
        },
        {
            key: 'Document',
            label: '单证',
            labelStyle: { width: '120px', textAlign: 'right' },
            contentStyle: {textAlign: 'left' },
            children: '',
            span: 2,
        },
        {
            key: 'DocumentCompany',
            label: '单证公司',
            labelStyle: { width: '120px', textAlign: 'right' },
            contentStyle: {textAlign: 'left' },
            children: '',
            span: 4,
        },
        {
            key: 'DocumentDept',
            label: '单证部门',
            labelStyle: { width: '120px', textAlign: 'right' },
            contentStyle: {textAlign: 'left' },
            children: '',
            span: 6,
        },
        {
            key: 'CollectionSales',
            label: '揽货销售',
            labelStyle: { width: '120px', textAlign: 'right' },
            contentStyle: {textAlign: 'left' },
            children: '',
            span: 2,
        },
        {
            key: 'CollectionSalesCompany',
            label: '揽货销售公司',
            labelStyle: { width: '120px', textAlign: 'right' },
            contentStyle: {textAlign: 'left' },
            children: '',
            span: 4,
        },
        {
            key: 'CollectionSalesDept',
            label: '揽货销售部门',
            labelStyle: { width: '120px', textAlign: 'right' },
            contentStyle: {textAlign: 'left' },
            children: '',
            span: 6,
        },
        {
            key: 'AirLine',
            label: '航线操作',
            labelStyle: { width: '120px', textAlign: 'right' },
            contentStyle: {textAlign: 'left' },
            children: '',
            span: 2,
        },
        {
            key: 'AirLineCompany',
            label: '航线操作公司',
            labelStyle: { width: '120px', textAlign: 'right' },
            contentStyle: {textAlign: 'left' },
            children: '',
            span: 4,
        },
        {
            key: 'AirLineDept',
            label: '航线操作部门',
            labelStyle: { width: '120px', textAlign: 'right' },
            contentStyle: {textAlign: 'left' },
            children: '',
            span: 6,
        },
      ];
    //获取路由参数
    return (
        <div  style={{overflowY: 'auto', height: 'calc(100vh - 80px)'}}>
            <Collapse
                collapsible="header"
                defaultActiveKey={['1']}
                ghost
                items={[
                    {
                    key: '1',
                    label: '委托信息',
                    children: <Descriptions column={12} size='small' bordered items={baseItems} />,
                    },
                ]}
            />
            <Collapse
                collapsible="header"
                defaultActiveKey={['3']}
                ghost
                items={[
                    {
                    key: '3',
                    label: '箱货信息',
                    children: <Descriptions  column={12}  size='small' bordered items={attachItems} />,
                    },
                ]}
            />
            <Collapse
                collapsible="header"
                defaultActiveKey={['4']}
                ghost
                items={[
                    {
                    key: '4',
                    label: '操作信息',
                    children: <Descriptions  column={12}  size='small' bordered items={operatorItems} />,
                    },
                ]}
            />
            
        </div>
    );
};

export default BaseBusiness;
