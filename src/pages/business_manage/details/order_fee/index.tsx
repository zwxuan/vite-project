
import '@/pages/page_list.less';
import React, { useState,useEffect } from 'react';
import { Table,Button,Dropdown, Space,Progress,notification, Checkbox, Tooltip } from 'antd';
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
import { getColumns } from './columns';
import { statusItems,statusCheckItems, importItems, exportItems, feeAdjustmentItems, costControlItems } from './menu_items';
import DetailModal from './detail_modal';

type TableRowSelection<T extends object = object> = TableProps<T>['rowSelection'];
const OrderFee : React.FC = () => {

    // order_fee数据
    const [orderFeeList, setOrderFeeList] = useState([] as OrderFeeItemProps[]);
    const [uploadImportType,setUploadImportType] = useState(1);
    const navigate = useNavigate();
    // 获取order_fee数据
    useEffect(() => {
        const getData = async () => {
            const orderFeeData = await getOrderFeeList();
            // 设置order_fee台账数据
            setOrderFeeList([...orderFeeData]);
        };
        getData();
    }, []);
      
    const handleDelete = (record:OrderFeeItemProps) => {
        alert(record);
    };
    const handleEdit = (record:OrderFeeItemProps) => {
        const newData = orderFeeList.filter((item) => `${item.FeeId}` === `${record.FeeId}`);
        setFormData(newData[0]);
        setModalFlag('edit');
        showModal();
    };
    
    const columnsType = getColumns(handleEdit, handleDelete);
    
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
        setFormData(initFormData);
        showModal();
    };

    const initFormData = {} as OrderFeeItemProps;
    const [formData, setFormData] = useState<OrderFeeItemProps>(initFormData);
    
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };
    const handleDateChange = (name: string, value: string | Array<string>) => {
        setFormData({ ...formData, [name]: value });
    };
    const handleNumberChange = (name:string,value: number | null) => {
        setFormData({ ...formData, [name]: value });
    };
    const handleOk = async () => {
        setSaving(true);
        
        // 打开通知
        const key = `progress_${Date.now()}`;
        notification.open({
            key,
            message: '提示',
            placement:'bottomRight',
            description: <Progress type='circle' percent={0} size={60} />,
            duration: 0,
            icon: <HourglassOutlined />,
            style: {
                width: 200,
            },
        });

        try {
            const response = await saveOrderFee(formData, (progress) => {
                // 更新通知中的进度条
                notification.open({
                    key,
                    message: '提示',
                    description: <Progress type='circle' percent={progress} strokeColor={progress === 100 ? "" : "#ff1648"}  size={60} />,
                    duration: 0,
                    placement:'bottomRight',
                    icon: <HourglassOutlined />,
                    style: {
                        width: 200,
                    },
                });
            });
            
            if (response) {
                setFormData(initFormData);
                // 等待1秒
                await new Promise(resolve => setTimeout(resolve, 500));
                notification.destroy(key);
                setOpen(false);
            }
        } catch (error) {
            console.error('Save failed:', error);
            notification.destroy(key);
        } finally {
            setSaving(false);
        }
    };

    const handleCancel = () => {
        if (!saving) {
            setFormData(initFormData);
            setOpen(false);
        }
    };
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
        columnWidth: '20px',
    };

    return (
        <div style={{overflowY: 'auto', height: 'calc(100vh - 80px)'}}>
            <DetailModal
                open={open}
                modalFlag={modalFlag}
                saving={saving}
                formData={formData}
                onCancel={handleCancel}
                onOk={handleOk}
                onChange={handleChange}
                onDateChange={handleDateChange}
                onNumberChange={handleNumberChange}
            />
            
            <ModelExcelImport open={openExcel} onCancel={handleExcelCancel} businessType='order_fee' importType={uploadImportType} />
            <ModelExcelImportTemplate open={openExcelTemplate} onCancel={handleExcelTemplateCancel}  businessType='order_fee' />
            <ModelExcelImportTemplateUpdate open={openExcelTemplateUpdate} onCancel={handleExcelTemplateUpdateCancel}  businessType='order_fee' />

            <div className="nc-bill-header-area">
                <div className="header-title-search-area">
                    
                </div>
                <div className="header-button-area">
                    <span className="button-app-wrapper header-button-area-button-app-wrapper"></span>
                    <div style={{display: "flex"}}>
                        <div className="buttonGroup-component">
                            <div className="u-button-group">
                                <Button type="primary" danger onClick={handleAdd}>新增</Button>
                                <Button>修改</Button>
                                <Button>删除</Button>
                                <Button>复制</Button>
                                <Button>创建账单</Button>
                                <Button>费用方案</Button>
                            </div>
                        </div> 
                        <div className="buttonGroup-component" style={{marginLeft: "10px"}}>
                            <div className="u-button-group"></div>
                        </div>
                        <div className="divider-button-wrapper">
                        <Dropdown menu={{items:costControlItems}}>
                                <Button>
                                    <Space>
                                        受控
                                    <DownOutlined />
                                    </Space>
                                </Button>   
                            </Dropdown>
                            <Dropdown menu={{items:statusCheckItems}}>
                                <Button>
                                    <Space>
                                        人工对账
                                    <DownOutlined />
                                    </Space>
                                </Button>   
                            </Dropdown>
                            <Dropdown menu={{items:feeAdjustmentItems}}>
                                <Button>
                                    <Space>
                                        费用调整
                                    <DownOutlined />
                                    </Space>
                                </Button>   
                            </Dropdown>
                            <Dropdown menu={{items:statusItems}}>
                                <Button>
                                    <Space>
                                        财务处理
                                    <DownOutlined />
                                    </Space>
                                </Button>   
                            </Dropdown>
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
                        <span className="u-button">
                            <RedoOutlined className='iconfont' />
                        </span>
                        <Tooltip
                            title={
                                <div className='rul_title_tooltip' style={{ backgroundColor: '#fff', color: '#000' }}>
                                    <ol style={{ color: '#666666', fontSize: '12px', paddingLeft: '2px' }}>
                                        <li style={{ marginBottom: '10px' }}><span style={{ marginRight: '10px', backgroundColor: '#f1f1f1', padding: '2px 10px' }}><b>受控</b></span>受控的费用，只有具有受控权限的用户或者管理员用户可以看到。
                                        </li>
                                        <li style={{ marginBottom: '10px' }}><span style={{ marginRight: '10px', backgroundColor: '#f1f1f1', padding: '2px 10px' }}><b>处理差额</b></span>费用手动对账后如果费用还有差额，将差额新生成一条费用，源费用变成确认状态。
                                        </li>
                                        <li style={{ marginBottom: '10px' }}><span style={{ marginRight: '10px', backgroundColor: '#f1f1f1', padding: '2px 10px' }}><b>增加费用</b></span>已经审核的业务单据，操作不能再增加费用，但是财务可以增加费用。
                                        </li>
                                        <li style={{ marginBottom: '10px' }}><span style={{ marginRight: '10px', backgroundColor: '#f1f1f1', padding: '2px 10px' }}><b>修改费用</b></span>已经审核的业务单据，操作不能再修改费用，但是财务可以修改费用，在原来费用的基础上生成一个相同的负数费用，同时在生成一个调整后的新费用。
                                        </li>
                                        <li style={{ marginBottom: '10px' }}><span style={{ marginRight: '10px', backgroundColor: '#f1f1f1', padding: '2px 10px' }}><b>删除费用</b></span>已经审核的业务单据，操作不能再删除费用，但是财务可以删除费用，在原来费用的基础上生成一个相同的负数费用。
                                        </li>
                                    </ol>
                                </div>
                            }
                            color='white'>
                            <i className='iconfont icon-bangzhutishi' style={{ cursor: 'pointer', marginLeft: '10px' }}></i>
                        </Tooltip>
                    </div>
                </div>
            </div>
            
            <div className='nc-bill-table-area'>
                <Table<OrderFeeItemProps>
                    columns={columnsType}
                    rowSelection={{ ...rowSelection}}
                    rowKey={(record) => `${record.FeeId}`}
                    showSorterTooltip={false}
                    dataSource={orderFeeList}
                    pagination={false}
                    scroll={{ x: 'max-content', y: 'calc(100vh/2 - 150px)' }}
                    title={() => (
                        <div style={{marginLeft: '10px'}}>
                            <span className="modal-body-left-commons-title-text">
                                应收 USD:3,000.00 RMB:24,540.00 折合RMB:45,840.00
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
                    scroll={{ x: 'max-content', y: 'calc(100vh/2 - 150px)' }}
                    title={() => (
                        <div style={{marginLeft: '10px'}}>
                            <span className="modal-body-left-commons-title-text">
                                应付 USD:3,000.00 RMB:24,540.00 折合RMB:45,840.00
                            </span>
                        </div>
                    )}
                    bordered={true}
                />
            </div>

            <div className='nc-bill-header-area'>
                <div style={{display:'flex',alignItems:'center',paddingLeft:'15px'}}>
                    <Space size={10}>
                        <span className="modal-body-left-commons-title-text">
                            利润 USD:1,000.00 RMB:24,540.00 折合RMB:31,640.00 毛利率: 69.02 %
                        </span>
                        <span className='rule_tilte_info'>
                            <Checkbox checked  value="1">显示分票费用</Checkbox>
                            <Checkbox checked  value="2">显示红冲费用</Checkbox>
                        </span>
                    </Space> 
                </div>
            </div>
        </div>
        
        
    )
}
export default OrderFee;
