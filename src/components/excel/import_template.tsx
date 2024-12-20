import React, { useState,useEffect } from 'react';
import { Table,Button,Tooltip } from 'antd';
import type { TableColumnsType,TableProps } from 'antd';
import { CurrencyItemProps } from "@/types/currency/currency";
import { getCurrencyList } from "@/api/financial_basic_data/currency_service";
import {RedoOutlined,DownOutlined} from '@ant-design/icons';
import CustomIcon from "@/components/custom-icon";
import i18n from '@/i18n';
import LocaleHelper from '@/utils/localeHelper';
type TableRowSelection<T extends object = object> = TableProps<T>['rowSelection'];
const ExcelImportTemplate : React.FC = () => {

    // 币制数据
    const [currentyList, setCurrencyList] = useState([] as CurrencyItemProps[]);
    // 获取币制数据
    useEffect(() => {
        // 获取币制数据
        const getData = async () => {
            const res = await getCurrencyList();
            const currencyData = res?.data as CurrencyItemProps[];
            // 设置币制台账数据
            // setCurrencyList([...currencyData]);
        };
        getData();
    }, []);
      
    const columnsType: TableColumnsType<CurrencyItemProps> = [
    {
        title: '序号',
        dataIndex: 'SerialNo',
        sorter: true,
        align: 'center',
        width:'60px',
    },
    {
        title: '版本',
        dataIndex: 'Version',
        sorter: true,
        align: 'left',
    },
    {
        title: '模板编号',
        dataIndex: 'TemplateCode',
        sorter: true,
    },
    {
        title: '模板名称',
        dataIndex: 'TemplateName',
        sorter: true,
    },
    {
        title: '模板来源',
        dataIndex: 'TemplateSource',
        sorter: true,
        align: 'right',
    },
    {
        title: '创建时间',
        dataIndex: 'CreatDate',
        sorter: true,
    },
    {
        title: '更新时间',
        dataIndex: 'LastDate',
        sorter: true,
        align: 'right',
    },
    {
        title: '操作人',
        dataIndex: 'Operator',
        sorter: true,
    },
    {
        title: '状态',
        dataIndex: 'Status',
        sorter: true,
    },
    {
        title: '国家|地区',
        dataIndex: 'Country',
        sorter: true,
        align: 'center',
        width: 140, 
    },
    {
        title: '是否默认模板',
        dataIndex: 'Country',
        sorter: true,
        align: 'center',
        width: 140, 
    },
    {
        title: '操作',
        key: 'operation',
        fixed: 'right',
        width: 40,
        render: (_, record) => (
        <>
            <a href='#' key={record.Code}>查看</a>
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
                <div className="header-button-area">
                    <span className="button-app-wrapper header-button-area-button-app-wrapper"></span>
                    <div style={{display: "flex"}}>
                        <div className="buttonGroup-component">
                            <Button type="primary" danger >下载模板</Button>
                            <Button style={{margin:"0px 5px"}}>设置默认</Button>
                            <Button style={{margin:"0px 5px"}}>自定义模板</Button>
                            <Tooltip
                                title={
                                    <div className='rul_title_tooltip' style={{backgroundColor:'#fff',color:'#000'}}>
                                        <ol style={{color:'#666666',fontSize:'12px'}}>
                                            <li style={{marginBottom:'10px'}}><span style={{marginRight:'10px',backgroundColor:'#f1f1f1',padding:'2px 10px'}}><b>自定义模板</b></span>用户创建的模板仅自己可见，管理员可见所有模板。基于管理员创建的企业级模板进行配置（企业级模板由管理员在【导入导出模板】菜单创建管理）。
                                            </li>
                                        </ol>
                                    </div>
                                }
                                color='white'
                                placement='left'
                                overlayInnerStyle={{width:'200px'}}
                                >
                                <i className='iconfont icon-bangzhutishi' style={{ cursor: 'pointer' }}></i>
                            </Tooltip>
                        </div> 
                    </div>
                </div>
            </div>
            <div className='nc-bill-table-area'>
                <Table<CurrencyItemProps>
                    columns={columnsType}
                    rowSelection={{ ...rowSelection}}
                    rowKey={(record) => record.Code}
                    
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
                    scroll={{ y: 'calc(100vh - 280px)' }}
                    footer={() => ''}
                    bordered={true}
                />
            </div>
        </div>
        
        
    )
}
export default ExcelImportTemplate;