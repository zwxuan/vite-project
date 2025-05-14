
import '@/pages/page_list.less';
import React, { useState,useEffect } from 'react';
import { Table,Button,Dropdown, Space,Progress,notification, Checkbox } from 'antd';
import type { MenuProps,TableProps } from 'antd';
import { useNavigate } from 'react-router-dom';
import { OrderFeeItemProps } from "@/types/business_manage/order_fee/order_fee";
import { getOrderFeeList,saveOrderFee } from "@/api/business_manage/order_fee_service";
import {DownOutlined,HourglassOutlined,RedoOutlined} from '@ant-design/icons';
import i18n from '@/i18n';
import LocaleHelper from '@/utils/localeHelper';
import ModelExcelImport from '@/components/excel/modal_import';
import ModelExcelImportTemplate from '@/components/excel/modal_import_template';
import ModelExcelImportTemplateUpdate from '@/components/excel/modal_import_template_update';
import { getColumns,getServiceColumns } from './columns';

type TableRowSelection<T extends object = object> = TableProps<T>['rowSelection'];
const OrderProft : React.FC = () => {

    // order_fee数据
    const [orderFeeList, setOrderFeeList] = useState([] as OrderFeeItemProps[]);
    const [uploadImportType,setUploadImportType] = useState(1);
    const navigate = useNavigate();
    // 获取order_fee数据
    useEffect(() => {
        const getData = async () => {
            const orderFeeData = await getOrderFeeList();
            // 设置order_fee台账数据
            // 填充5个空白行
            setOrderFeeList([...Array(Math.max(0, 5)).fill({})]);
        };
        getData();
    }, []);
      
    const handleDelete = (record:OrderFeeItemProps) => {
        alert(record);
    };
    const handleEdit = (record:OrderFeeItemProps) => {
        const newData = orderFeeList.filter((item) => `${item.FeeId}` === `${record.FeeId}`);
        setModalFlag('edit');
        showModal();
    };
    
    const columnsType = getColumns(handleEdit, handleDelete);
    const columnsServiceType = getServiceColumns(handleEdit, handleDelete);
    
    const [open, setOpen] = useState(false);
    const [openExcel, setExcelOpen] = useState(false);
    const [openExcelTemplate, setExcelTemplateOpen] = useState(false);
    const [openExcelTemplateUpdate, setExcelTemplateOpenUpdate] = useState(false);
    const [saving, setSaving] = useState(false);
    const [modalFlag, setModalFlag] = useState<'add' | 'edit'>('add');

    const showModal = () => {
        setOpen(true);
    };

    const handleAdd = () => {
        setModalFlag('add');
        showModal();
    };

    const initFormData = {} as OrderFeeItemProps;
    
    //表格选中和取消时触发的函数
    const rowSelection: TableRowSelection<OrderFeeItemProps> = {
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
        <div style={{overflowY: 'auto', height: 'calc(100vh - 80px)'}}>
            <div className="nc-bill-header-area">
                <div className="header-title-search-area">
                    
                </div>
                <div className="header-button-area">
                    <span className="button-app-wrapper header-button-area-button-app-wrapper"></span>
                    <div style={{display: "flex"}}>
                        <div className="buttonGroup-component">
                        </div> 
                        <div className="buttonGroup-component" style={{marginLeft: "10px"}}>
                            <div className="u-button-group"></div>
                        </div>
                        <span className="u-button">
                            <RedoOutlined className='iconfont' />
                        </span>
                    </div>
                </div>
            </div>
            
            <div className='nc-bill-table-area'>
                <Table<OrderFeeItemProps>
                    columns={columnsServiceType}
                    rowSelection={{ ...rowSelection}}
                    rowKey={(record) => `${record.FeeId}`}
                    showSorterTooltip={false}
                    dataSource={orderFeeList}
                    loading={orderFeeList.length === 0}
                    pagination={false}
                    scroll={{ x: 'max-content', y: 'calc(100vh/3 - 150px)' }}
                    title={() => (
                        <div style={{marginLeft: '10px'}}>
                            <span className="modal-body-left-commons-title-text">
                            排除内部前，应收 USD:3,000.00 RMB:24,540.00 折合RMB:45,840.00 成本 USD:3,000.00 RMB:24,540.00 折合RMB:45,840.00 利润 USD:3,000.00 RMB:24,540.00 折合RMB:45,840.00
                            </span>
                        </div>
                    )}
                    footer={() => (
                        <div style={{marginLeft: '10px'}}>
                            <span className="modal-body-left-commons-title-text">
                            排除内部后，应收 USD:3,000.00 RMB:24,540.00 折合RMB:45,840.00 成本 USD:3,000.00 RMB:24,540.00 折合RMB:45,840.00 利润 USD:3,000.00 RMB:24,540.00 折合RMB:45,840.00
                            </span>
                        </div>
                    )}
                    bordered={true}
                />
            </div>

            <div className='nc-bill-table-area'>
                <Table<OrderFeeItemProps>
                    columns={columnsType}
                    rowSelection={{ ...rowSelection}}
                    rowKey={(record) => `${record.FeeId}`}
                    showSorterTooltip={false}
                    dataSource={orderFeeList}
                    loading={orderFeeList.length === 0}
                    pagination={false}
                    scroll={{ x: 'max-content', y: 'calc(100vh/3 - 150px)' }}
                    title={() => (
                        <div style={{marginLeft: '10px'}}>
                            <span className="modal-body-left-commons-title-text">
                            销售部门
                            </span>
                        </div>
                    )}
                    bordered={true}
                />
            </div>

            <div className='nc-bill-table-area'>
                <Table<OrderFeeItemProps>
                    columns={columnsType}
                    rowSelection={{ ...rowSelection}}
                    rowKey={(record) => `${record.FeeId}`}
                    showSorterTooltip={false}
                    dataSource={orderFeeList}
                    loading={orderFeeList.length === 0}
                    pagination={false}
                    scroll={{ x: 'max-content', y: 'calc(100vh/3 - 150px)' }}
                    title={() => (
                        <div style={{marginLeft: '10px'}}>
                            <span className="modal-body-left-commons-title-text">
                            操作部门
                            </span>
                        </div>
                    )}
                    bordered={true}
                />
            </div>
        </div>
    )
}
export default OrderProft;
