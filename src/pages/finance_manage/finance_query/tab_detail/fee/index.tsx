
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
import { getColumns } from './columns';

type TableRowSelection<T extends object = object> = TableProps<T>['rowSelection'];
const FeeReconciliation : React.FC = () => {
    // 费用对账数据
    const [feeReconciliationList, setFeeReconciliationList] = useState([] as FeeReconciliationItemProps[]);
    const navigate = useNavigate();
    // 获取费用对账数据
    useEffect(() => {
        const getData = async () => {
            const feeReconciliationData = await getFeeReconciliationList();
            // 设置费用对账台账数据
            setFeeReconciliationList([...feeReconciliationData]);
        };
        getData();
    }, []);
  
    const columnsType = getColumns(()=>{}, ()=>{},()=>{});
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
                    footer={() => 'RMB:1,022.00 USD:3,000.00 对账金额 RMB:1,600.00 USD:8,000.00 差额 RMB:-578.00 USD:-5,000.00'}
                    bordered={true}
                />
            </div>
        </div>
        
        
    )
}
export default FeeReconciliation;
