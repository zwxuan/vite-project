
import React, { useState,useEffect } from 'react';
import { Table,Button,Dropdown, Space, Tooltip } from 'antd';
import type { MenuProps,TableProps } from 'antd';
import { useNavigate } from 'react-router-dom';
import { OrderBillItemProps } from "@/types/settlement_center/business_manage/order_bill";
import {OrderFeeItemProps} from "@/types/settlement_center/business_manage/order_fee";
import { getOrderBillList } from "@/api/settlement_center/business_manage/order_bill_service";
import { getOrderFeeList } from "@/api/settlement_center/business_manage/order_fee_service";
import { requestWithProgress } from "@/api/request";
import {DownOutlined,RedoOutlined} from '@ant-design/icons';
import CustomIcon from "@/components/custom-icon";
import AdvancedSearchForm from "@/components/search-form";
import i18n from '@/i18n';
import LocaleHelper from '@/utils/localeHelper';
import ModelExcelImport from '@/components/excel/modal_import';
import ModelExcelImportTemplate from '@/components/excel/modal_import_template';
import ModelExcelImportTemplateUpdate from '@/components/excel/modal_import_template_update';
import { expandColumns } from './columns';
import { importItems, exportItems } from './menu_items';
import { fields } from './search_fields';

type TableRowSelection<T extends object = object> = TableProps<T>['rowSelection'];
const LCLFeeShare : React.FC = () => {

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
            columns={expandColumns}
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
                            <CustomIcon type="icon-Currency"  style={{color:'red',fontSize:'24px'}} /> 拼箱分摊模式
                            <Tooltip
                                title={
                                    <div className='rul_title_tooltip' style={{ backgroundColor: '#fff', color: '#000' }}>
                                        <ol style={{ color: '#666666', fontSize: '12px', paddingLeft: '2px' }}>
                                            <li style={{ marginBottom: '10px' }}><span style={{ marginRight: '10px', backgroundColor: '#f1f1f1', padding: '2px 10px' }}><b>说明</b></span>将多个货主的小批量货物整合装入同一个集装箱，通过共享集装箱资源来降低单个货主的运输成本。这种模式的核心在于费用分摊机制和操作流程整合。
                                            </li>
                                            <li style={{ marginBottom: '10px' }}><span style={{ marginRight: '10px', backgroundColor: '#f1f1f1', padding: '2px 10px' }}><b>费用分摊原则</b></span>按比例，比如重量、体积、数量等。
                                            </li>
                                            <li style={{ marginBottom: '10px' }}><span style={{ marginRight: '10px', backgroundColor: '#f1f1f1', padding: '2px 10px' }}><b>优势</b></span>
                                                成本低：小批量货物无需支付整柜费用；
                                                <p>灵活性高：适合试单、样品、电商小批量发货；</p>
                                                <p>门槛低：发货人无需具备整柜操作经验。</p>
                                            </li>
                                            <li style={{ marginBottom: '10px' }}><span style={{ marginRight: '10px', backgroundColor: '#f1f1f1', padding: '2px 10px' }}><b>劣势</b></span>
                                                时效慢：需等待集货（通常3–7天），目的港还需拆箱分拨；
                                                <p>操作依赖货代：无法监装，货物混装易受损；</p>
                                                <p>费用不透明：部分货代隐藏附加费（如亏舱费、最低收费）；</p>
                                                <p>连带风险：若其他货主瞒报、侵权，可能导致整柜被查扣。</p>
                                            </li>
                                        </ol>
                                    </div>
                                }
                                color='white'>
                                <i className='iconfont icon-bangzhutishi' style={{ cursor: 'pointer', marginLeft: '10px' }}></i>
                            </Tooltip>
                        </span>
                    </div>
                    <span className="orgunit-customize-showOff" style={{marginLeft: "10px"}}>
                        
                    </span>
                </div>
                <div className="header-button-area">
                    <span className="button-app-wrapper header-button-area-button-app-wrapper"></span>
                    <div style={{display: "flex"}}>
                        {/* <div className="buttonGroup-component">
                            <div className="u-button-group">
                                <Button type="primary" danger >开票|收票</Button>
                                <Button type="primary" danger >申请付款</Button>
                                <Button type="primary" danger >销账</Button>
                            </div>
                        </div>  */}
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
                    // rowSelection={{ ...rowSelection}}
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
export default LCLFeeShare;

