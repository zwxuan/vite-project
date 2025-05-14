
import React, { useState,useEffect } from 'react';
import { Table,Button,Dropdown, Space, Tooltip } from 'antd';
import type { MenuProps,TableProps } from 'antd';
import { useNavigate } from 'react-router-dom';
import { OrderBillItemProps } from "@/types/business_manage/order_bill/order_bill";
import {OrderFeeItemProps} from "@/types/business_manage/order_fee/order_fee";
import { getOrderBillList } from "@/api/business_manage/order_bill_service";
import { getOrderFeeList } from "@/api/business_manage/order_fee_service";
import { requestWithProgress } from "@/api/request";
import {DownOutlined,RedoOutlined} from '@ant-design/icons';
import CustomIcon from "@/components/custom-icon";
import AdvancedSearchForm from "@/components/search-form";
import i18n from '@/i18n';
import LocaleHelper from '@/utils/localeHelper';
import ModelExcelImport from '@/components/excel/modal_import';
import ModelExcelImportTemplate from '@/components/excel/modal_import_template';
import ModelExcelImportTemplateUpdate from '@/components/excel/modal_import_template_update';
import { expandColumns,expandSplitColumns } from './columns';
import { importItems, exportItems } from './menu_items';
import { fields } from './search_fields';

type TableRowSelection<T extends object = object> = TableProps<T>['rowSelection'];
const OrderFeeSplit : React.FC = () => {

    // order_bill数据
    const [orderFeeSource, setOrderFeeSource] = useState([] as OrderFeeItemProps[]);
    const [uploadImportType,setUploadImportType] = useState(1);
    const [expandDataSource, setExpandDataSource] = useState([] as OrderFeeItemProps[]);
    const navigate = useNavigate();
    // 获取order_bill数据
    useEffect(() => {
        const getData = async () => {
            const orderBillData = await getOrderFeeList();
            // 设置order_bill台账数据
            setOrderFeeSource([...orderBillData]);
        };
        getData();
    }, []);
      
    const handleDelete = (record:OrderBillItemProps) => {
        alert(record);
    };
    const handleEdit = (record:OrderBillItemProps) => {
        const newData = expandDataSource.filter((item) => `${item.BillNumber}` === `${record.BillNumber}`);
    };
    
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
        columnWidth: '24px',
    };
    const handExpand  = async (expanded: boolean, record: OrderFeeItemProps) => {
            const orderBillData = await getOrderFeeList();

            const filterOrderFeeList = orderBillData.filter((item) => {
                return item.FeeName === record.FeeName;
            });

            setExpandDataSource([...filterOrderFeeList]);
    }
    const expandedRowRender = () => (
        <div className='nc-bill-table-area nc-bill-table-area-expand'>
            <Table<OrderFeeItemProps>
            columns={expandSplitColumns}
            dataSource={expandDataSource}
            pagination={false}
            />
        </div>
      );
      const handleSearch = (values:any) => {
        console.log('handleSearch',values);
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
                            <CustomIcon type="icon-Currency"  style={{color:'red',fontSize:'24px'}} /> 费用拆分
                            <Tooltip
                                title={
                                    <div className='rul_title_tooltip' style={{ backgroundColor: '#fff', color: '#000' }}>
                                        <ol style={{ color: '#666666', fontSize: '12px', paddingLeft: '2px' }}>
                                            <li style={{ marginBottom: '10px' }}><span style={{ marginRight: '10px', backgroundColor: '#f1f1f1', padding: '2px 10px' }}><b>合同条款</b></span>分段计价,阶梯折扣
                                            </li>
                                            <li style={{ marginBottom: '10px' }}><span style={{ marginRight: '10px', backgroundColor: '#f1f1f1', padding: '2px 10px' }}><b>客户需求</b></span>分开发票,隐藏真实成本
                                            </li>
                                            <li style={{ marginBottom: '10px' }}><span style={{ marginRight: '10px', backgroundColor: '#f1f1f1', padding: '2px 10px' }}><b>税务合规</b></span>税率分离,跨境结算
                                            </li>
                                            <li style={{ marginBottom: '10px' }}><span style={{ marginRight: '10px', backgroundColor: '#f1f1f1', padding: '2px 10px' }}><b>物流需求</b></span>分段运输,异常费用调整
                                            </li>
                                            <li style={{ marginBottom: '10px' }}><span style={{ marginRight: '10px', backgroundColor: '#f1f1f1', padding: '2px 10px' }}><b>规避风险</b></span>汇率波动,争议准备金
                                            </li>
                                            <li style={{ marginBottom: '10px' }}><span style={{ marginRight: '10px', backgroundColor: '#f1f1f1', padding: '2px 10px' }}><b>佣金分成</b></span>代理佣金分离,多方分成
                                            </li>
                                            <li style={{ marginBottom: '10px' }}><span style={{ marginRight: '10px', backgroundColor: '#f1f1f1', padding: '2px 10px' }}><b>特殊说明</b></span>没有生成后续单据的费用才能拆分，例如已经生成账单、开票、销账的费用不能拆分
                                            </li>
                                        </ol>
                                    </div>
                                }
                                color='white'>
                                <i className='iconfont icon-bangzhutishi' style={{ cursor: 'pointer', marginLeft: '10px' }}></i>
                            </Tooltip>
                        </span>
                    </div>
                </div>
                <div className="header-button-area">
                    <span className="button-app-wrapper header-button-area-button-app-wrapper"></span>
                    <div style={{display: "flex"}}>
                        <div className="buttonGroup-component">
                            <div className="u-button-group">
                                <Button type="primary" danger >开票|收票</Button>
                                <Button type="primary" danger >申请付款</Button>
                                <Button type="primary" danger >销账</Button>
                            </div>
                        </div> 
                        <div className="buttonGroup-component" style={{marginLeft: "10px"}}>
                            <div className="u-button-group"></div>
                        </div>
                        <div className="divider-button-wrapper">
                            <Dropdown menu={{items:exportItems}}>
                                <Button>
                                    <Space>
                                        导出
                                    <DownOutlined />
                                    </Space>
                                </Button>   
                            </Dropdown>
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
                    columns={expandColumns}
                    rowSelection={{ ...rowSelection}}
                    rowKey={(record) => `${record.FeeId}`}
                    expandable={{ expandedRowRender, defaultExpandedRowKeys: ['0'],onExpand: (expanded, record) => {handExpand(expanded, record);} }}
                    showSorterTooltip={false}
                    dataSource={orderFeeSource}
                    loading={orderFeeSource.length === 0}
                    pagination={false}
                    scroll={{ x: 'max-content', y: 'calc(100vh - 280px)' }}
                    footer={() => '底部汇总信息'}
                    bordered={true}
                />
            </div>
        </div>
        
        
    )
}
export default OrderFeeSplit;
