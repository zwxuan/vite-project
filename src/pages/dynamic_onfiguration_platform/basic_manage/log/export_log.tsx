import '@/pages/page_list.less'
import React, { useState,useEffect } from 'react';
import { Table,Tag } from 'antd';
import type { TableColumnsType,TableProps } from 'antd';
import { ExportOutlined } from '@ant-design/icons';
import { ExportLogItem } from "@/types/dynamic_onfiguration_platform/basic_manage/export_template";
import { getExportLogList } from "@/api/dynamic_onfiguration_platform/basic_manage/excel_service";
import CustomIcon from "@/components/custom-icon";
import i18n from '@/i18n';
import LocaleHelper from '@/utils/localeHelper';

type TableRowSelection<T extends object = object> = TableProps<T>['rowSelection'];
const ExportLog : React.FC = () => {

    // 导出日志数据
    const [exportLogList, setExportLogList] = useState([] as ExportLogItem[]);
    // 获取日志数据
    useEffect(() => {
        // 获取日志数据
        const getData = async () => {
            const exportLogData = await getExportLogList();
            // 设置日志台账数据
            setExportLogList([...exportLogData]);
        };
        getData();
    }, []);
      
    const columnsType: TableColumnsType<ExportLogItem> = [
    {
        title: '序号',
        width: 40,
        dataIndex: 'SerialNo',
        align: 'center',
        
    },
    {
        title: '批次号',
        width: 100,
        dataIndex: 'BatchNo',
        align: 'left',
    },
    {
        title: '服务名称',
        dataIndex: 'ServiceName',
        width: 150,
    },
    {
        title: '模板名称',
        dataIndex: 'TemplateName',
        width: 150,
    },
    {
        title: '导出类型',
        dataIndex: 'ExportType',
        width: 150,
    },
    {
        title: '导出数量',
        dataIndex: 'ExportCount',
        align: 'right',
        width: 150,
    },
    {
        title: '导出开始时间',
        dataIndex: 'ExportStartDate',
        align: 'center',
        width: 150,
    },     
    {
        title: '导出结束时间',
        dataIndex: 'ExportEndDate',
        align: 'center',
        width: 150,
    },
    {
        title: '状态',
        dataIndex: 'Status',
        align: 'center',
        width: 40,
        render: (text) => {
            if (text === 0) {
                return <Tag color='blue'>异常</Tag>;
            } else if (text === 1) {
                return <Tag color='green'>成功</Tag>;
            } else {
                return <Tag color='red'>失败</Tag>;
            }
        },
    },
    {
        title: '操作员',
        dataIndex: 'Operator',
        align: 'center',
        width: 100,
    },
    {
        title: '',
        key: 'operation',
        fixed: 'right',
        width: 100,
        render: (_, record) => (
        <>
            <a href='#' title={record.ExportFile}>导出文件</a>
        </>
        ),
    },
    ];
    

    return (
        <div>
            <div className="nc-bill-header-area">
                <div className="header-title-search-area">
                    <div className="BillHeadInfoWrap BillHeadInfoWrap-showBackBtn">
                        <span className="bill-info-title" style={{marginLeft: "10px"}}>
                            <ExportOutlined  style={{color:'red',fontSize:'20px',marginRight:'5px'}} />导出日志
                        </span>
                    </div>
                </div>
            </div>
            <div className='nc-bill-table-area'>
                <Table<ExportLogItem>
                    columns={columnsType}
                    rowKey={(record) => record.BatchNo}
                    showSorterTooltip={false}
                    dataSource={exportLogList}
                    loading={exportLogList.length === 0}
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
                    footer={() => ''}
                    bordered={true}
                />
            </div>
        </div>
        
        
    )
}
export default ExportLog;