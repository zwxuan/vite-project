
import '@/pages/page_list.less';
import React, { useState,useEffect } from 'react';
import { Table,Button,Dropdown, Space,Progress,notification, Checkbox } from 'antd';
import type { MenuProps,TableProps } from 'antd';
import { useNavigate } from 'react-router-dom';
import { OrderFeeItemProps } from "@/types/order_fee/order_fee";
import { getOrderFeeList,saveOrderFee } from "@/api/business_order/order_fee_service";
import {DownOutlined,HourglassOutlined,RedoOutlined} from '@ant-design/icons';
import CustomIcon from "@/components/custom-icon";
import AdvancedSearchForm from "@/components/search-form";
import i18n from '@/i18n';
import LocaleHelper from '@/utils/localeHelper';
import ModelExcelImport from '@/components/excel/modal_import';
import ModelExcelImportTemplate from '@/components/excel/modal_import_template';
import ModelExcelImportTemplateUpdate from '@/components/excel/modal_import_template_update';
import { getColumns,getColumns2 } from './columns';
import { fields } from './search_fields';

type TableRowSelection<T extends object = object> = TableProps<T>['rowSelection'];
const OrderFeeRelation : React.FC = () => {

    // order_fee数据
    const [orderFeeList, setOrderFeeList] = useState([] as OrderFeeItemProps[]);
    const [uploadImportType,setUploadImportType] = useState(1);
    const navigate = useNavigate();
    // 获取order_fee数据
    useEffect(() => {
        const getData = async () => {
            const res = await getOrderFeeList();
            const orderFeeData = res?.data as OrderFeeItemProps[];
            // 设置order_fee台账数据
            // 填充15个空白行
            setOrderFeeList([...Array(Math.max(0, 15)).fill({})]);
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
    const columnsType2 = getColumns2(handleEdit, handleDelete);
    
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
    const handleSearch = (values:any) => {
        console.log('handleSearch',values);
    };
    return (
        <div style={{overflowY: 'auto', height: 'calc(100vh - 80px)'}}>
            <div className="nc-bill-header-area">
                <div className="header-title-search-area">
                    <div className="BillHeadInfoWrap BillHeadInfoWrap-showBackBtn">
                        <span className="bill-info-title" style={{marginLeft: "10px"}}>
                            <CustomIcon type="icon-Currency"  style={{color:'red',fontSize:'24px'}} /> 关联交易
                        </span>
                    </div>
                    <span className="orgunit-customize-showOff" style={{marginLeft: "10px"}}>
                        <div style={{display: "inline"}}>
                            <label className="u-checkbox nc-checkbox">
                                <input type="checkbox" className='u-checkbox-middle' /><label className="u-checkbox-label u-checkbox-label-middle">显示停用</label>
                            </label>
                        </div>
                    </span>
                </div>
                <div className="header-button-area">
                    <span className="button-app-wrapper header-button-area-button-app-wrapper"></span>
                    <div style={{display: "flex"}}>
                        <div className="buttonGroup-component">
                            <div className="u-button-group">
                                <Button type="primary" danger>新增</Button>
                                <Button>删除</Button>
                            </div>
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
            <AdvancedSearchForm fields={fields} onSearch={handleSearch} />
            <div className='nc-bill-table-area'>
                <Table<OrderFeeItemProps>
                    columns={columnsType}
                    rowSelection={{ ...rowSelection}}
                    rowKey={(record) => `${record.FeeId}`}
                    showSorterTooltip={false}
                    dataSource={orderFeeList}
                    loading={orderFeeList.length === 0}
                    pagination={false}
                    scroll={{ x: 'max-content', y: 'calc(100vh - 680px)' }}
                    title={() => (
                        <div style={{marginLeft: '10px'}}>
                            <span className="modal-body-left-commons-title-text">
                            成本
                            </span>
                        </div>
                    )}
                    bordered={true}
                />
            </div>

            <div className='nc-bill-table-area'>
                <Table<OrderFeeItemProps>
                    columns={columnsType2}
                    rowSelection={{ ...rowSelection}}
                    rowKey={(record) => `${record.FeeId}`}
                    showSorterTooltip={false}
                    dataSource={orderFeeList}
                    loading={orderFeeList.length === 0}
                    pagination={false}
                    scroll={{ x: 'max-content', y: 'calc(100vh - 680px)' }}
                    title={() => (
                        <div style={{marginLeft: '10px'}}>
                            <span className="modal-body-left-commons-title-text">
                            收入
                            </span>
                        </div>
                    )}
                    bordered={true}
                />
            </div>
        </div>
    )
}
export default OrderFeeRelation;
