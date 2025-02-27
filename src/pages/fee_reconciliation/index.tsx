
import '@/pages/page_list.less';
import React, { useState,useEffect } from 'react';
import { Table,Button,Dropdown, Space,Progress,notification,Drawer } from 'antd';
import type { MenuProps,TableProps } from 'antd';
import { useNavigate } from 'react-router-dom';
import { FeeReconciliationItemProps } from "@/types/fee_reconciliation/fee_reconciliation";
import { getFeeReconciliationList,saveFeeReconciliation } from "@/api/fee_manage/fee_reconciliation_service";
import { requestWithProgress } from "@/api/request";
import {RedoOutlined,DownOutlined,HourglassOutlined} from '@ant-design/icons';
import CustomIcon from "@/components/custom-icon";
import i18n from '@/i18n';
import LocaleHelper from '@/utils/localeHelper';
import AdvancedSearchForm from "@/components/search-form";
import ModelExcelImport from '@/components/excel/modal_import';
import ModelExcelImportTemplate from '@/components/excel/modal_import_template';
import ModelExcelImportTemplateUpdate from '@/components/excel/modal_import_template_update';
import { getColumns } from './columns';
import { statusItems, importItems, exportItems,statusCheckItems } from './menu_items';
import { fields } from './search_fields';
import DetailModal from './detail_modal';

type TableRowSelection<T extends object = object> = TableProps<T>['rowSelection'];
const FeeReconciliation : React.FC = () => {

    // 费用对账数据
    const [feeReconciliationList, setFeeReconciliationList] = useState([] as FeeReconciliationItemProps[]);
    const [uploadImportType,setUploadImportType] = useState(1);
    const navigate = useNavigate();
    // 获取费用对账数据
    useEffect(() => {
        const getData = async () => {
            const res = await getFeeReconciliationList();
            const feeReconciliationData = res?.data as FeeReconciliationItemProps[];
            // 设置费用对账台账数据
            setFeeReconciliationList([...feeReconciliationData]);
        };
        getData();
    }, []);
      
    const handleDelete = (record:FeeReconciliationItemProps) => {
        alert(record);
    };
    const handleEdit = (record:FeeReconciliationItemProps) => {
        
    };
    const [openDetail, setOpenDetail] = useState(false);

    const showDrawer = (record:FeeReconciliationItemProps) => {
        setOpenDetail(true);
    };
  
    const onClose = () => {
        setOpenDetail(false);
    };
    const columnsType = getColumns(handleEdit, handleDelete,showDrawer);
    
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

    const initFormData = {} as FeeReconciliationItemProps;
    const [formData, setFormData] = useState<FeeReconciliationItemProps>(initFormData);
    
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
            const response = await saveFeeReconciliation(formData, (progress) => {
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
            
            if (response?.success) {
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
    const rowSelection: TableRowSelection<FeeReconciliationItemProps> = {
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
        <div  style={{overflowY: 'auto',overflowX:'hidden', height: 'calc(100vh - 80px)'}}>
            <Drawer title="Basic Drawer" onClose={onClose} open={openDetail}>
                <p>Some contents...</p>
                <p>Some contents...</p>
                <p>Some contents...</p>
            </Drawer>
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
            
            <ModelExcelImport open={openExcel} onCancel={handleExcelCancel} businessType='fee_reconciliation' importType={uploadImportType} />
            <ModelExcelImportTemplate open={openExcelTemplate} onCancel={handleExcelTemplateCancel}  businessType='fee_reconciliation' />
            <ModelExcelImportTemplateUpdate open={openExcelTemplateUpdate} onCancel={handleExcelTemplateUpdateCancel}  businessType='fee_reconciliation' />

            <div className="nc-bill-header-area">
                <div className="header-title-search-area">
                    <div className="BillHeadInfoWrap BillHeadInfoWrap-showBackBtn">
                        <span className="bill-info-title" style={{marginLeft: "10px"}}>
                            <CustomIcon type="icon-Currency"  style={{color:'red',fontSize:'24px'}} /> 费用对账
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
                                <Button type="primary" danger>创建账单</Button>
                                <Button type="primary" danger>开票收票</Button>
                                <Button type="primary" danger>核销</Button>
                                <Button type="primary" danger>付款申请</Button>
                                
                                <Button>审核</Button>
                                <Button>取消审核</Button>
                            </div>
                        </div> 
                        <div className="buttonGroup-component" style={{marginLeft: "10px"}}>
                            <div className="u-button-group"></div>
                        </div>
                        <div className="divider-button-wrapper">
                            <Dropdown menu={{items:statusCheckItems}}>
                                <Button>
                                    <Space>
                                        对账
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
                    </div>
                </div>
            </div>
            <AdvancedSearchForm fields={fields} onSearch={handleSearch} span={4} />
            <div className='nc-bill-table-area'>
                <Table<FeeReconciliationItemProps>
                    columns={columnsType}
                    rowSelection={{ ...rowSelection}}
                    rowKey={(record) => `${record.FeeId,record.BusinessNumber}`}
                    showSorterTooltip={false}
                    dataSource={feeReconciliationList}
                    loading={feeReconciliationList.length === 0}
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
                    footer={() => 'RMB:1,022.00 USD:3,000.00 对账金额 RMB:1,600.00 USD:8,000.00 差额 RMB:-578.00 USD:-5,000.00'}
                    bordered={true}
                />
            </div>
        </div>
        
        
    )
}
export default FeeReconciliation;
