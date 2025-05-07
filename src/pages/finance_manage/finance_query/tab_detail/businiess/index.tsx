
import '@/pages/page_list.less';
import React, { useState,useEffect } from 'react';
import { Table,Button,Dropdown, Space,Progress,notification } from 'antd';
import type { MenuProps,TableProps } from 'antd';
import { useNavigate } from 'react-router-dom';
import { OrdersItemProps } from "@/types/orders/orders";
import { getOrdersList,saveOrders } from "@/api/business_order/orders_service";
import { getColumns } from './columns';

type TableRowSelection<T extends object = object> = TableProps<T>['rowSelection'];
const Orders : React.FC = () => {

    // 订单管理表，存储与业务相关的订单信息数据
    const [ordersList, setOrdersList] = useState([] as OrdersItemProps[]);
    const [uploadImportType,setUploadImportType] = useState(1);
    const [pageSize, setPageSize] = useState(50);
    const navigate = useNavigate();
    // 获取订单管理表，存储与业务相关的订单信息数据
    useEffect(() => {
        const getData = async () => {
            const ordersData = await getOrdersList();
            // 设置订单管理表，存储与业务相关的订单信息台账数据
            setOrdersList([...ordersData]);
        };
        getData();
    }, []);
      
    const columnsType = getColumns(()=>{}, ()=>{});
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
        <div  style={{overflowY: 'auto',overflowX:'hidden', height: 'calc(100vh - 80px)'}}>
            <div className='nc-bill-table-area'>
                <Table<OrdersItemProps>
                    columns={columnsType}
                    rowSelection={{ ...rowSelection}}
                    rowKey={(record) => `${record.BusinessId}`}
                    showSorterTooltip={false}
                    dataSource={ordersList}
                    loading={ordersList.length === 0}
                    pagination={{
                        size:'small',
                        pageSize:pageSize,
                        showTotal: (total) => `总共 ${total} 条`,
                        showQuickJumper:true,
                        showSizeChanger:true,
                        onShowSizeChange: (current, size) => {
                            setPageSize(size);
                        },
                        locale:{
                            items_per_page: '/页',
                            jump_to: '跳至',
                            page: '页',
                        }
                    }}
                    scroll={{ x: 'max-content', y: 'calc(100vh - 380px)' }}
                    footer={() => '底部汇总信息'}
                    bordered={true}
                />
            </div>
        </div>
        
        
    )
}
export default Orders;
