
import React, { useState,useEffect } from 'react';
import { Table,Button,Dropdown, Space,Modal,Form,Input,InputNumber,Select,Progress,notification } from 'antd';
import type { MenuProps,TableProps } from 'antd';
import { useNavigate } from 'react-router-dom';
import { OrderBillItemProps,ExpandedDataType } from "@/types/order_bill/order_bill";
import { getOrderBillList,saveOrderBill } from "@/api/financial_basic_data/order_bill_service";
import { requestWithProgress } from "@/api/request";
import {RedoOutlined,DownOutlined,HourglassOutlined} from '@ant-design/icons';
import CustomIcon from "@/components/custom-icon";
import i18n from '@/i18n';
import LocaleHelper from '@/utils/localeHelper';
import ModelExcelImport from '@/components/excel/modal_import';
import ModelExcelImportTemplate from '@/components/excel/modal_import_template';
import ModelExcelImportTemplateUpdate from '@/components/excel/modal_import_template_update';
import { getColumns,expandColumns } from './columns';
import { statusItems, importItems, exportItems } from './menu_items';

type TableRowSelection<T extends object = object> = TableProps<T>['rowSelection'];
const OrderBill : React.FC = () => {

    // order_bill数据
    const [orderBillList, setOrderBillList] = useState([] as OrderBillItemProps[]);
    const [uploadImportType,setUploadImportType] = useState(1);
    const navigate = useNavigate();
    // 获取order_bill数据
    useEffect(() => {
        const getData = async () => {
            const res = await getOrderBillList();
            const orderBillData = res?.data as OrderBillItemProps[];
            // 设置order_bill台账数据
            setOrderBillList([...orderBillData]);
        };
        getData();
    }, []);
      
    const handleDelete = (record:OrderBillItemProps) => {
        alert(record);
    };
    const handleEdit = (record:OrderBillItemProps) => {
        const newData = orderBillList.filter((item) => `${item.BillNumber}` === `${record.BillNumber}`);
    };
    
    const expandDataSource = Array.from({ length: 3 }).map<ExpandedDataType>((_, i) => ({
        key: i.toString(),
        date: '2014-12-24 23:12:00',
        name: 'This is production name',
        upgradeNum: 'Upgraded: 56',
      }));

    const columnsType = getColumns(handleEdit, handleDelete);

    const expandedRowRender = () => (
        <div className='nc-bill-table-area'>
            <Table<ExpandedDataType>
            columns={expandColumns}
            dataSource={expandDataSource}
            pagination={false}
            />
        </div>
      );
    const excelImportOnClick: MenuProps['onClick'] = ({ key }) => {
        console.log(`Click on item ${key}`);
        if(key==='1'){
            setUploadImportType(1);
            setExcelOpen(true);
        }else if(key==='2'){
            setExcelTemplateOpen(true);
            console.log(openExcelTemplate)
        }else if(key==='3'){
            setUploadImportType(2);
            setExcelOpen(true);
        }else if(key==='4'){
            setExcelTemplateOpenUpdate(true);
        }
        else{
            navigate('/importlog');
        }
    };
    
    const [openExcel, setExcelOpen] = useState(false);
    const [openExcelTemplate, setExcelTemplateOpen] = useState(false);
    const [openExcelTemplateUpdate, setExcelTemplateOpenUpdate] = useState(false);
    
    const handleExcelCancel = () => {
        setExcelOpen(false);
    };
    const handleExcelTemplateCancel = () => {
        setExcelTemplateOpen(false);
    };
    const handleExcelTemplateUpdateCancel = () => {
        setExcelTemplateOpenUpdate(false);
    };
    //表格选中和取消时触发的函数
    const rowSelection: TableRowSelection<OrderBillItemProps> = {
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
        <div>
            <ModelExcelImport open={openExcel} onCancel={handleExcelCancel} businessType='order_bill' importType={uploadImportType} />
            <ModelExcelImportTemplate open={openExcelTemplate} onCancel={handleExcelTemplateCancel}  businessType='order_bill' />
            <ModelExcelImportTemplateUpdate open={openExcelTemplateUpdate} onCancel={handleExcelTemplateUpdateCancel}  businessType='order_bill' />

            <div className="nc-bill-header-area">
                <div className="header-title-search-area">
                    <div className="BillHeadInfoWrap BillHeadInfoWrap-showBackBtn">
                        <span className="bill-info-title" style={{marginLeft: "10px"}}>
                            
                        </span>
                    </div>
                    <span className="orgunit-customize-showOff" style={{marginLeft: "10px"}}>
                        
                    </span>
                </div>
                <div className="header-button-area">
                    <span className="button-app-wrapper header-button-area-button-app-wrapper"></span>
                    <div style={{display: "flex"}}>
                        <div className="buttonGroup-component">
                            <div className="u-button-group">
                                <Button type="primary" danger>新增应收</Button>
                                <Button type="primary" danger>新增应付</Button>
                                <Button>确认</Button>
                                <Button>取消确认</Button>
                                <Button>复核</Button>
                                <Button>取消复核</Button>
                                <Button>开票|收票</Button>
                                <Button>申请付款</Button>
                                <Button>销账</Button>
                                
                            </div>
                        </div> 
                        <div className="buttonGroup-component" style={{marginLeft: "10px"}}>
                            <div className="u-button-group"></div>
                        </div>
                        <div className="divider-button-wrapper">
                            <Dropdown menu={{items:importItems,onClick:excelImportOnClick}}>
                                <Button>
                                    <Space>
                                        导入
                                    <DownOutlined />
                                    </Space>
                                </Button>   
                            </Dropdown>
                            <Dropdown menu={{items:exportItems}}>
                                <Button>
                                    <Space>
                                        导出
                                    <DownOutlined />
                                    </Space>
                                </Button>   
                            </Dropdown>
                        </div>
                    </div>
                </div>
            </div>
            <div className='nc-bill-table-area'>
                <Table<OrderBillItemProps>
                    columns={columnsType}
                    rowSelection={{ ...rowSelection}}
                    rowKey={(record) => `${record.BillNumber}`}
                    expandable={{ expandedRowRender, defaultExpandedRowKeys: ['0'] }}
                    showSorterTooltip={false}
                    dataSource={orderBillList}
                    pagination={false}
                    scroll={{ x: 'max-content', y: 'calc(100vh - 280px)' }}
                    footer={() => '底部汇总信息'}
                    bordered={true}
                />
            </div>
        </div>
        
        
    )
}
export default OrderBill;
