/**
 * 描述： 导入模板台账
 * 作者： freesky
 * 创建日期： 2024-12-08
 * 修改人: freesky
 * 修改日期: 2024-12-08
 * 修改记录:
 * 版本： 1.0.0
*/
import React, { useState,useEffect } from 'react';
import { Table,Button,Tooltip,Tag, Modal } from 'antd';
import type { TableColumnsType,TableProps } from 'antd';
import { ImportTemplateItem } from "@/types/dynamic_onfiguration_platform/system_manage/import_template";
import { getImportTemplateList } from "@/api/dynamic_onfiguration_platform/basic_manage/currency_service";
import CustomeExcelTemplate from './custom_template';
import i18n from '@/i18n';
import LocaleHelper from '@/utils/localeHelper';
type TableRowSelection<T extends object = object> = TableProps<T>['rowSelection'];
const ExcelImportTemplate : React.FC = () => {

    // 模板数据
    const [importTemplateList, setTemplateList] = useState([] as ImportTemplateItem[]);
    const [currencyKey,setCurrencyKey] = useState('MB10002')
    // 获取模板数据
    useEffect(() => {
        // 获取模板数据
        const getData = async () => {
            const templateData = await getImportTemplateList();
            // 设置模板台账数据
            setTemplateList([...templateData]);
        };
        getData();
    }, []);
      
    const columnsType: TableColumnsType<ImportTemplateItem> = [
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
        width:'60px',
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
    },
    {
        title: '创建时间',
        dataIndex: 'CreatDate',
        sorter: true,
        align: 'center',
    },
    {
        title: '更新时间',
        dataIndex: 'LastDate',
        sorter: true,
        align: 'center',
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
        align: 'center',
        width:'60px',
        render: (text) => {
            if (text === 0) {
                return <Tag color='red'>未发布</Tag>;
            } else {
                return <Tag color='green'>已发布</Tag>;
            }
        },
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
        dataIndex: 'IsDefault',
        sorter: true,
        align: 'center',
        width: 140,
        render: (text) => {
            if (text === 0) {
                return <Tag color='red'>否</Tag>;
            } else {
                return <Tag color='green'>是</Tag>;
            }
        }, 
    },
    {
        title: '操作',
        key: 'operation',
        fixed: 'right',
        width: 40,
        render: (_, record) => (
        <>
            <a href='#' key={record.TemplateCode}>查看</a>
        </>
        ),
    },
    ];
    
    //表格选中和取消时触发的函数
    const rowSelection: TableRowSelection<ImportTemplateItem> = {
        onChange: (selectedRowKeys, selectedRows) => {
            console.log('onchange');
            console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
        },
        onSelect: (record, selected, selectedRows) => {
            console.log('onselect');
            setCurrencyKey(record.TemplateCode);
            console.log(record, selected, selectedRows);
        },
        onSelectAll: (selected, selectedRows, changeRows) => {
            console.log('onallselect');
            console.log(selected, selectedRows, changeRows);
        },
        type: 'radio',
        columnWidth: '20px',
        selectedRowKeys: [currencyKey],
    };
    const [open, setOpen] = useState(false);
    const handleOnCancel = () => {
        setOpen(false);
    };
    return (
        <>
        <div style={{minHeight:'calc(100vh - 280px)'}}>
            <Modal  open={open} title="自定义模板"
                onCancel={handleOnCancel}
                width={'75%'}
                destroyOnClose={true}
                maskClosable={false}
                footer={(_) => (<></>)}
            >
                <CustomeExcelTemplate title='币制详情' />
            </Modal>
            <div className="nc-bill-header-area">
                <div className="header-button-area">
                    <span className="button-app-wrapper header-button-area-button-app-wrapper"></span>
                    <div style={{display: "flex"}}>
                        <div className="buttonGroup-component">
                            <Button type="primary" danger >下载模板</Button>
                            <Button style={{margin:"0px 5px"}}>设置默认</Button>
                            <Button style={{margin:"0px 5px"}} onClick={()=>{setOpen(true);}}>自定义模板</Button>
                            <Tooltip
                                title={
                                    <div className='rul_title_tooltip' style={{backgroundColor:'#fff',color:'#000'}}>
                                        <ol style={{color:'#666666',fontSize:'12px',paddingLeft:'2px'}}>
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
                <Table<ImportTemplateItem>
                    columns={columnsType}
                    rowSelection={{ ...rowSelection}}
                    rowKey={(record) => record.TemplateCode}
                    dataSource={importTemplateList}
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
                    scroll={{x: 'max-content', y: 'calc(100vh - 280px)' }}
                    footer={() => ''}
                    bordered={true}
                    showSorterTooltip={false}
                />
            </div>
        </div>
        </>
        
    )
}
export default ExcelImportTemplate;