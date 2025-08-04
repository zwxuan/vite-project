
import '@/pages/page_list.less';
import React, { useState,useEffect } from 'react';
import { Button, Table } from 'antd';
import type { MenuProps,TableProps } from 'antd';
import { useNavigate } from 'react-router-dom';
import { BaseEdiPortItemProps } from "@/types/dynamic_configuration_platform/basic_manage/base_edi_port";
import { getBaseEdiPortList } from "@/api/dynamic_configuration_platform/basic_manage/base_edi_port_service";
import CustomIcon from "@/components/custom-icon";
import i18n from '@/i18n';
import { getColumns } from './columns';

type TableRowSelection<T extends object = object> = TableProps<T>['rowSelection'];
const EDIPortComponent : React.FC = () => {
    // 费用对账数据
    const [feeReconciliationList, setFeeReconciliationList] = useState([] as BaseEdiPortItemProps[]);
    
    // 获取费用对账数据
    useEffect(() => {
        const getData = async () => {
            const feeReconciliationData = await getBaseEdiPortList();
            // 设置费用对账台账数据
            setFeeReconciliationList([...feeReconciliationData]);
        };
        getData();
    }, []);
    
    const columnsType = getColumns(()=>{}, ()=>{});
    //表格选中和取消时触发的函数
    const rowSelection: TableRowSelection<BaseEdiPortItemProps> = {
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
                <Table<BaseEdiPortItemProps>
                    columns={columnsType}
                    rowSelection={{ ...rowSelection}}
                    rowKey={(record) => `${record.CurrentPortCode,record.Shipper}`}
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
                    
                    bordered={true}
                />
            </div>
        </div>
        
        
    )
}
const EDIPort = React.memo(EDIPortComponent);
export default EDIPort;

