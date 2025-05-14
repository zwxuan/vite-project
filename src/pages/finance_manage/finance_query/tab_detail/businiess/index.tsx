
import '@/pages/page_list.less';
import React, { useState, useEffect } from 'react';
import { Table } from 'antd';
import type {TableProps } from 'antd';
import { OrdersItemProps } from "@/types/business_manage/orders/orders";
import { getOrdersList } from "@/api/business_manage/orders_service";
import { getColumns,getBusinessSumColumns } from './columns';
import SumTableFooter from '@/components/table-footer/SumTableFooter';

type TableRowSelection<T extends object = object> = TableProps<T>['rowSelection'];
interface OrdersProps {
  isCurrentTabActive?: boolean;
}

const OrdersComponent: React.FC<OrdersProps> = ({ isCurrentTabActive = true }) => {

    // 订单管理表，存储与业务相关的订单信息数据
    const [ordersList, setOrdersList] = useState([] as OrdersItemProps[]);
    const [pageSize, setPageSize] = useState(50);
    // 获取订单管理表，存储与业务相关的订单信息数据
    useEffect(() => {
        const getData = async () => {
            const ordersData = await getOrdersList();
            // 设置订单管理表，存储与业务相关的订单信息台账数据
            setOrdersList([...ordersData]);
        };
        getData();
    }, []);

    const summaryData = [
        {
            sum_title: '应收',
            rmb: 1568739.80,
            usd: 7435355.00,
        },
        {
            sum_title: '应付',
            rmb: 705318.30,
            usd: 50976.37,
        },
        {
            sum_title: '已收',
            rmb: 54022674.21,
            usd: 458799.00,
        },
        {
            sum_title: '已付',
            rmb: 54022674.21,
            usd: 458799.00,
        },
        {
            sum_title: '未收',
            rmb: 54022674.21,
            usd: 458799.00,
        },
        {
            sum_title: '未付',
            rmb: 54022674.21,
            usd: 458799.00,
        }
    ]

    const columnsType = getColumns(() => { }, () => { });
    const sumColumnsType = getBusinessSumColumns() as any[];
    //表格选中和取消时触发的函数
    const rowSelection: TableRowSelection<OrdersItemProps> = {
        onChange: (selectedRowKeys, selectedRows) => {
            console.log('onchange');
            console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
        },
        onSelect: (record, selected, selectedRows) => {
            console.log('onselect');
            console.log(record, selected, selectedRows);
        },
        onSelectAll: (selected, selectedRows, changeRows) => {
            console.log('onallselect');
            console.log(selected, selectedRows, changeRows);
        },
        type: 'checkbox',
        columnWidth: '20px',
    };

    return (
        <div style={{ overflowY: 'auto', overflowX: 'hidden', height: 'calc(100vh - 80px)' }}>
            <div className='nc-bill-table-area'>
                <Table<OrdersItemProps>
                    columns={columnsType}
                    rowSelection={{ ...rowSelection }}
                    rowKey={(record) => `${record.BusinessId}`}
                    showSorterTooltip={false}
                    dataSource={ordersList}
                    loading={ordersList.length === 0}
                    pagination={{
                        size: 'small',
                        pageSize: pageSize,
                        showTotal: (total) => `总共 ${total} 条`,
                        showQuickJumper: true,
                        showSizeChanger: true,
                        onShowSizeChange: (current, size) => {
                            setPageSize(size);
                        },
                        locale: {
                            items_per_page: '/页',
                            jump_to: '跳至',
                            page: '页',
                        }
                    }}
                    scroll={{ x: 'max-content', y: 'calc(100vh - 380px)' }}
                    footer={() => (
                        <SumTableFooter 
                            summaryColumns={sumColumnsType} 
                            summaryData={summaryData}
                            isParentTabActive={isCurrentTabActive}
                        />
                    )}
                    bordered={true}
                />
            </div>
        </div>
    )
}
const Orders = React.memo(OrdersComponent);
export default Orders;
