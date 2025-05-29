import '@/pages/page_list.less';
import React, { useState,useEffect } from 'react';
import { Table } from 'antd';
import type { MenuProps,TableProps } from 'antd';
import { useNavigate } from 'react-router-dom';
import { InvoiceItemProps } from "@/types/cost_manage/invoice";
import { getInvoiceList,saveInvoice } from "@/api/cost_manage/invoice_service";
import { requestWithProgress } from "@/api/request";
import {RedoOutlined,DownOutlined,HourglassOutlined} from '@ant-design/icons';
import CustomIcon from "@/components/custom-icon";
import i18n from '@/i18n';
import LocaleHelper from '@/utils/localeHelper';
import { getColumns, getInvoiceSumColumns } from './columns';
import SumTableFooter from '@/components/table-footer/SumTableFooter';

type TableRowSelection<T extends object = object> = TableProps<T>['rowSelection'];
interface InvoiceProps {
  isCurrentTabActive?: boolean;
}

const InvoiceComponent : React.FC<InvoiceProps> = ({ isCurrentTabActive = true }) => {
    // 发票管理数据
    const [invoiceList, setInvoiceList] = useState([] as InvoiceItemProps[]);
    // 获取发票管理数据
    useEffect(() => {
        const getData = async () => {
            const invoiceData = await getInvoiceList();
            // 设置发票管理台账数据
            setInvoiceList([...invoiceData]);
        };
        getData();
    }, []);
    
    const columnsType = getColumns(()=>{}, ()=>{});
    const sumColumnsType = getInvoiceSumColumns() as any[];
    const summaryData = [
        {
            sum_title: '已收折合CNY',
            rmb: 54022674.21,
            usd: 458799.00,
            eur: 0.00,
            jpy: 0.00,
        },
        {
            sum_title: '已付折合CNY',
            rmb: 54022674.21,
            usd: 458799.00,
            eur: 0.00,
            jpy: 0.00,
        },
        {
            sum_title: '未收折合CNY',
            rmb: 54022674.21,
            usd: 458799.00,
            eur: 0.00,
            jpy: 0.00,
        },
        {
            sum_title: '未付折合CNY',
            rmb: 54022674.21,
            usd: 458799.00,
            eur: 0.00,
            jpy: 0.00,
        }
    ]

    //表格选中和取消时触发的函数
    const rowSelection: TableRowSelection<InvoiceItemProps> = {
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
                <Table<InvoiceItemProps>
                    columns={columnsType}
                    rowSelection={{ ...rowSelection}}
                    rowKey={(record) => `${record.InvoiceId}`}
                    showSorterTooltip={false}
                    dataSource={invoiceList}
                    loading={invoiceList.length === 0}
                    pagination={
                        {
                            size:'small',
                            pageSize:50,showTotal: (total) => `总共 ${total} 条`,
                            showQuickJumper:true,
                            locale:
                            {
                                items_per_page: '/页',
                                jump_to: '跳至',
                                page: '页',
                            }
                        }
                    }
                    scroll={{ x: 'max-content', y: 'calc(100vh - 280px)' }}
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
const Invoice = React.memo(InvoiceComponent);
export default Invoice;

