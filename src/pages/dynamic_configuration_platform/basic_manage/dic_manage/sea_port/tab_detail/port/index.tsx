
import '@/pages/page_list.less';
import React, { useState, useEffect } from 'react';
import { Button, Dropdown, Space, Table } from 'antd';
import type { TableProps } from 'antd';
import { BaseSeaportItemProps } from "@/types/dynamic_configuration_platform/basic_manage/base_seaport";
import { getBaseSeaportList } from "@/api/dynamic_configuration_platform/basic_manage/base_seaport_service";
import { getColumns } from './columns';
import { RedoOutlined, DownOutlined, HourglassOutlined } from '@ant-design/icons';
import { statusItems, importItems, exportItems } from './menu_items';

type TableRowSelection<T extends object = object> = TableProps<T>['rowSelection'];

const PortComponent: React.FC = () => {

    // 订单管理表，存储与业务相关的订单信息数据
    const [ordersList, setOrdersList] = useState([] as BaseSeaportItemProps[]);
    const [pageSize, setPageSize] = useState(50);
    // 获取订单管理表，存储与业务相关的订单信息数据
    useEffect(() => {
        const getData = async () => {
            const ordersData = await getBaseSeaportList();
            // 设置订单管理表，存储与业务相关的订单信息台账数据
            setOrdersList([...ordersData]);
        };
        getData();
    }, []);


    const columnsType = getColumns(() => { }, () => { });
    //表格选中和取消时触发的函数
    const rowSelection: TableRowSelection<BaseSeaportItemProps> = {
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
            <div className="nc-bill-header-area">
                <div className="header-title-search-area">
                    <div className="BillHeadInfoWrap BillHeadInfoWrap-showBackBtn">
                        <span className="bill-info-title" style={{marginLeft: "10px"}}></span>
                    </div>
                    <span className="orgunit-customize-showOff" style={{marginLeft: "10px"}}>
                        <div style={{display: "inline"}}>
                        </div>
                    </span>
                </div>
                <div className="header-button-area">
                    <span className="button-app-wrapper header-button-area-button-app-wrapper"></span>
                    <div style={{display: "flex"}}>
                        <div className="buttonGroup-component">
                            <div className="u-button-group">
                                <Button type="primary" danger>新增</Button>
                                <Button>修改</Button>
                                <Button>删除</Button>
                                <Button>复制</Button>
                            </div>
                        </div> 
                        <div className="buttonGroup-component" style={{marginLeft: "10px"}}>
                            <div className="u-button-group"></div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='nc-bill-table-area'>
                <Table<BaseSeaportItemProps>
                    columns={columnsType}
                    rowSelection={{ ...rowSelection }}
                    rowKey={(record) => `${record.Id}`}
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
                    bordered={true}
                />
            </div>
        </div>
    )
}
const Port = React.memo(PortComponent);
export default Port;
