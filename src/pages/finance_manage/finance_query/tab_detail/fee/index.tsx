
import '@/pages/page_list.less';
import React, { useState,useEffect } from 'react';
import { Table,Button,Dropdown, Space,Progress,notification,Drawer, Tooltip } from 'antd';
import type { MenuProps,TableProps } from 'antd';
import { useNavigate } from 'react-router-dom';
import { FeeReconciliationItemProps } from "@/types/fee_reconciliation/fee_reconciliation";
import { getFeeReconciliationList,saveFeeReconciliation } from "@/api/fee_manage/fee_reconciliation_service";
import {RedoOutlined,DownOutlined,HourglassOutlined} from '@ant-design/icons';
import CustomIcon from "@/components/custom-icon";
import i18n from '@/i18n';
import LocaleHelper from '@/utils/localeHelper';
import { getColumns, getFeeSumColumns } from './columns';
import SumTableFooter from '@/components/table-footer/SumTableFooter';

type TableRowSelection<T extends object = object> = TableProps<T>['rowSelection'];
interface FeeReconciliationProps {
    isCurrentTabActive?: boolean;
  }
const FeeReconciliationComponent : React.FC<FeeReconciliationProps> = ({ isCurrentTabActive = true }) => {
    // 费用对账数据
    const [feeReconciliationList, setFeeReconciliationList] = useState([] as FeeReconciliationItemProps[]);
    
    // 获取费用对账数据
    useEffect(() => {
        const getData = async () => {
            const feeReconciliationData = await getFeeReconciliationList();
            // 设置费用对账台账数据
            setFeeReconciliationList([...feeReconciliationData]);
        };
        getData();
    }, []);
    const summaryData = [
        {
            sum_title: '应收',
            rmb: 1568739.80,
            usd: 7435355.00,
            eur: 0.00,
            jpy: 0.00,
        },
        {
            sum_title: '应付',
            rmb: 705318.30,
            usd: 50976.37,
            eur: 0.00,
            jpy: 0.00,
        },
        {
            sum_title: '已收',
            rmb: 54022674.21,
            usd: 458799.00,
            eur: 0.00,
            jpy: 0.00,
        },
        {
            sum_title: '已付',
            rmb: 54022674.21,
            usd: 458799.00,
            eur: 0.00,
            jpy: 0.00,
        },
        {
            sum_title: '未收',
            rmb: 54022674.21,
            usd: 458799.00,
            eur: 0.00,
            jpy: 0.00,
        },
        {
            sum_title: '未付',
            rmb: 54022674.21,
            usd: 458799.00,
            eur: 0.00,
            jpy: 0.00,
        }
    ]
    const columnsType = getColumns(()=>{}, ()=>{},()=>{});
    const sumColumnsType = getFeeSumColumns() as any[];
    //表格选中和取消时触发的函数
    const rowSelection: TableRowSelection<FeeReconciliationItemProps> = {
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
                <Table<FeeReconciliationItemProps>
                    columns={columnsType}
                    rowSelection={{ ...rowSelection}}
                    rowKey={(record) => `${record.FeeId,record.BusinessNumber}`}
                    showSorterTooltip={false}
                    dataSource={feeReconciliationList}
                    loading={feeReconciliationList.length === 0}
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
const FeeReconciliation = React.memo(FeeReconciliationComponent);
export default FeeReconciliation;
