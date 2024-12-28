import '../page_list.less'
import React, { useState,useEffect } from 'react';
import { Table,Tag } from 'antd';
import type { TableColumnsType,TableProps } from 'antd';
import { CurrencyItemProps } from "@/types/currency/currency";
import { getCurrencyList } from "@/api/financial_basic_data/currency_service";
import CustomIcon from "@/components/custom-icon";
import i18n from '@/i18n';
import LocaleHelper from '@/utils/localeHelper';

type TableRowSelection<T extends object = object> = TableProps<T>['rowSelection'];
const ExportLog : React.FC = () => {

    // 币制数据
    const [currentyList, setCurrencyList] = useState([] as CurrencyItemProps[]);
    // 获取币制数据
    useEffect(() => {
        // 获取币制数据
        const getData = async () => {
            const res = await getCurrencyList();
            const currencyData = res?.data as CurrencyItemProps[];
            // 设置币制台账数据
            setCurrencyList([...currencyData]);
        };
        getData();
    }, []);
      
    const columnsType: TableColumnsType<CurrencyItemProps> = [
    {
        title: i18n.t(LocaleHelper.getCode()),
        width: 100,
        dataIndex: 'Code',
        sorter: true,
        fixed: 'left',
        align: 'center',
        
    },
    {
        title: '币制名称',
        width: 100,
        dataIndex: 'CurrencyFullName',
        sorter: true,
        fixed: 'left',
        align: 'left',
    },
    {
        title: '币制简称',
        dataIndex: 'CurrencyShortName',
        sorter: true,
        width: 150,
    },
    {
        title: '币制符号',
        dataIndex: 'CurrencyMark',
        sorter: true,
        width: 150,
    },
    {
        title: '价格精度',
        dataIndex: 'PricePrecision',
        sorter: true,
        align: 'right',
        width: 150,
    },
    {
        title: '价格舍入规则',
        dataIndex: 'PriceRoundingRule',
        sorter: true,
        width: 150,
    },
    {
        title: '金额精度',
        dataIndex: 'AmountPrecision',
        sorter: true,
        align: 'right',
        width: 150,
    },
    {
        title: '金额舍入规则',
        dataIndex: 'AmountRoundingRule',
        sorter: true,
        width: 150,
    },
    {
        title: '备注',
        dataIndex: 'Remark',
        sorter: true,
        width: 150,
    },
    {
        title: '状态',
        dataIndex: 'Status',
        sorter: true,
        align: 'center',
        width: 40,
        render: (text) => {
            if (text === 0) {
                return <Tag color='green'>启用</Tag>;
            } else if (text === 1) {
                return <Tag>停用</Tag>;
            } else {
                return <Tag color='red'>删除</Tag>;
            }
        },
    },
    {
        title: '操作',
        key: 'operation',
        fixed: 'right',
        width: 100,
        render: (_, record) => (
        <>
            <a href='#' title={record.Code}>导出文件</a>
        </>
        ),
    },
    ];
    
    //表格选中和取消时触发的函数
    const rowSelection: TableRowSelection<CurrencyItemProps> = {
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
        type: 'radio',
        columnWidth: '20px',
    };
    

    return (
        <div>
            <div className="nc-bill-header-area">
                <div className="header-title-search-area">
                    <div className="BillHeadInfoWrap BillHeadInfoWrap-showBackBtn">
                        <span className="bill-info-title" style={{marginLeft: "10px"}}>
                            <CustomIcon type="icon-Currency"  style={{color:'red',fontSize:'24px'}} /> 导出日志
                        </span>
                    </div>
                </div>
            </div>
            <div className='nc-bill-table-area'>
                <Table<CurrencyItemProps>
                    columns={columnsType}
                    rowSelection={{ ...rowSelection}}
                    rowKey={(record) => record.Code}
                    showSorterTooltip={false}
                    dataSource={currentyList}
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
                    footer={() => '底部汇总信息'}
                    bordered={true}
                />
            </div>
        </div>
        
        
    )
}
export default ExportLog;