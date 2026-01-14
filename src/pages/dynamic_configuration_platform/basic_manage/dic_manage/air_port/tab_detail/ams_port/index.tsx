import '@/pages/page_list.less';
import React, { useState,useEffect } from 'react';
import { Button, Table } from 'antd';
import type { MenuProps,TableProps } from 'antd';
import { useNavigate } from 'react-router-dom';
import { BaseAmsPortItemProps } from "@/types/dynamic_configuration_platform/basic_manage/base_ams_port";
import { getBaseAmsPortList2 } from "@/api/dynamic_configuration_platform/basic_manage/base_ams_port_service";
import { requestWithProgress } from "@/api/request";
import {RedoOutlined,DownOutlined,HourglassOutlined} from '@ant-design/icons';
import CustomIcon from "@/components/custom-icon";
import i18n from '@/i18n';
import LocaleHelper from '@/utils/localeHelper';
import { getColumns } from './columns';
import SumTableFooter from '@/components/table-footer/SumTableFooter';

type TableRowSelection<T extends object = object> = TableProps<T>['rowSelection'];

const AMSPortComponent : React.FC = () => {
    // 发票管理数据
    const [invoiceList, setInvoiceList] = useState([] as BaseAmsPortItemProps[]);
    const [pageSize, setPageSize] = useState(50);
    // 获取发票管理数据
    useEffect(() => {
        const getData = async () => {
            const invoiceData = await getBaseAmsPortList2();
            // 设置发票管理台账数据
            setInvoiceList([...invoiceData]);
        };
        getData();
    }, []);
    
    const columnsType = getColumns(()=>{}, ()=>{});
    

    //表格选中和取消时触发的函数
    const rowSelection: TableRowSelection<BaseAmsPortItemProps> = {
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
                <Table<BaseAmsPortItemProps>
                    columns={columnsType}
                    rowSelection={{ ...rowSelection}}
                    rowKey={(record) => `${record.UsNo}`}
                    showSorterTooltip={false}
                    dataSource={invoiceList}
                    loading={invoiceList.length === 0}
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
const AMSPort = React.memo(AMSPortComponent);
export default AMSPort;

