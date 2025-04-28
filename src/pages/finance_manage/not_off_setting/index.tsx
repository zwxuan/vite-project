
import '@/pages/page_list.less';
import React, { useState,useEffect } from 'react';
import { Table,Button,Dropdown, Space,Radio,Modal,Form,Input,InputNumber,Select,Progress,notification, Checkbox, Tooltip } from 'antd';
import type { MenuProps,RadioChangeEvent,TableColumnsType,TableProps } from 'antd';
import { useNavigate } from 'react-router-dom';
import { NotOffSettingItemProps } from "@/types/not_off_setting/not_off_setting";
import { getNotOffSettingList,saveNotOffSetting } from "@/api/finance_manage/not_off_setting_service";
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
import { getColumns as getBillColumns } from '@/pages/cost_manage/bill_manage/columns';
import { getColumns as getStatementOfAccountColumns } from '@/pages/cost_manage/statement_of_account/columns';
import { getColumns as getInvoiceColumns } from '@/pages/invoice_manage/invoice/columns';
import { statusItems, importItems, exportItems } from './menu_items';
import { fields } from './search_fields';
import DetailModal from './detail_modal';

type TableRowSelection<T extends object = object> = TableProps<T>['rowSelection'];
const NotOffSetting : React.FC = () => {

    // 未核销数据
    const [notOffSettingList, setNotOffSettingList] = useState([] as NotOffSettingItemProps[]);
    const [uploadImportType,setUploadImportType] = useState(1);
    const navigate = useNavigate();
    // 获取未核销数据
    useEffect(() => {
        const getData = async () => {
            const notOffSettingData = await getNotOffSettingList();
            // 设置未核销台账数据
            setNotOffSettingList([...notOffSettingData]);
        };
        getData();
    }, []);
      
    const handleDelete = (record:NotOffSettingItemProps) => {
        alert(record);
    };
    const handleEdit = (record:NotOffSettingItemProps) => {
        setModalFlag('edit');
        showModal();
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

    
    const [open, setOpen] = useState(false);
    const [openExcel, setExcelOpen] = useState(false);
    const [openExcelTemplate, setExcelTemplateOpen] = useState(false);
    const [openExcelTemplateUpdate, setExcelTemplateOpenUpdate] = useState(false);
    const [saving, setSaving] = useState(false);
    const [modalFlag, setModalFlag] = useState<'add' | 'edit'>('add');
    const [creditFlag, setCredit] = useState(true);
    const [columnsType, setColumns] = useState<TableColumnsType<any>>(getColumns(handleEdit, handleDelete));
    const showModal = () => {
        setOpen(true);
    };

    const handleAdd = () => {
        setModalFlag('add');
        setFormData(initFormData);
        showModal();
    };

    const initFormData = {} as NotOffSettingItemProps;
    const [formData, setFormData] = useState<NotOffSettingItemProps>(initFormData);
    
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
            const response = await saveNotOffSetting(formData, (progress) => {
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
    const rowSelection: TableRowSelection<NotOffSettingItemProps> = {
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
    const onChange = (e: RadioChangeEvent) => {
        if(e.target.value === 1){
            setColumns(getColumns(handleEdit, handleDelete));
        }else if(e.target.value === 2){
            setColumns(getInvoiceColumns(() => {}, () => {}));
        }else if(e.target.value === 3){
            setColumns(getBillColumns(() => {}, () => {}));
        }else if(e.target.value === 4){
            setColumns(getStatementOfAccountColumns(() => {}, () => {}));
        }
    };
    const onChangeCD = (e: RadioChangeEvent)=>{
        if(e.target.value === 1){
            setCredit(true);
        }else{
            setCredit(false);
        }
    }
    
    return (
        <div  style={{overflowY: 'auto',overflowX:'hidden', height: 'calc(100vh - 80px)'}}>
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
            
            <ModelExcelImport open={openExcel} onCancel={handleExcelCancel} businessType='not_off_setting' importType={uploadImportType} />
            <ModelExcelImportTemplate open={openExcelTemplate} onCancel={handleExcelTemplateCancel}  businessType='not_off_setting' />
            <ModelExcelImportTemplateUpdate open={openExcelTemplateUpdate} onCancel={handleExcelTemplateUpdateCancel}  businessType='not_off_setting' />

            <div className="nc-bill-header-area">
                <div className="header-title-search-area">
                    <div className="BillHeadInfoWrap BillHeadInfoWrap-showBackBtn">
                        <span className="bill-info-title" style={{marginLeft: "10px"}}>
                            <CustomIcon type="icon-Currency"  style={{color:'red',fontSize:'24px'}} /> 未核销列表
                            <Tooltip
                                title={
                                    <div className='rul_title_tooltip' style={{ backgroundColor: '#fff', color: '#000' }}>
                                        <ol style={{ color: '#666666', fontSize: '12px', paddingLeft: '2px' }}>
                                            <li style={{ marginBottom: '10px' }}><span style={{ marginRight: '10px', backgroundColor: '#f1f1f1', padding: '2px 10px' }}><b>对冲销账</b></span>指通过相互抵消应收款项和应付款项来简化账务结算，避免实际资金流动。其核心是当同一交易对手（客户或供应商）同时存在“应收”和“应付”关系时，双方协商将部分或全部金额直接抵消，减少资金流转的繁琐和成本。
                                            </li>
                                            <li style={{ marginBottom: '10px' }}><span style={{ marginRight: '10px', backgroundColor: '#f1f1f1', padding: '2px 10px' }}><b>客户与供应商双重身份</b></span>作为客户：例如，货代A委托合作车队B运输货物，需向B支付运费（应付账款）。作为供应商：同一车队B可能委托货代A处理报关服务，需向A支付服务费（应收账款）。此时，双方可协商对冲账目（如A应付B的运费与B应付A的服务费抵消），减少实际付款。
                                            </li>
                                            <li style={{ marginBottom: '10px' }}><span style={{ marginRight: '10px', backgroundColor: '#f1f1f1', padding: '2px 10px' }}><b>跨境业务中的汇率风险对冲</b></span>在国际货代中，若同时存在外币应收和应付，对冲可减少汇率波动的影响。货代公司有一笔美元应收账款和一笔美元应付账款，对冲后仅需处理差额，降低外汇兑换风险。
                                            </li>
                                            <li style={{ marginBottom: '10px' }}><span style={{ marginRight: '10px', backgroundColor: '#f1f1f1', padding: '2px 10px' }}><b>关联企业内部交易</b></span>集团内不同子公司或关联企业之间频繁交易时，对冲销账可简化内部资金调拨。集团内货代子公司与报关子公司互相提供服务，定期对冲账目以减少资金占用。
                                            </li>
                                            <li style={{ marginBottom: '10px' }}><span style={{ marginRight: '10px', backgroundColor: '#f1f1f1', padding: '2px 10px' }}><b>账目差异或错误调整</b></span>当发生重复记账、金额错误或费用争议时，对冲销账可用于快速调整账目。货代公司误向客户多收运费，后续业务中直接在应付客户的款项中抵消多收部分，无需退款。
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
                                <Button type="primary" danger onClick={handleAdd}>销账</Button>
                                <Button type="primary" danger>对冲销账</Button>
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
                        <span className="u-button">
                            <RedoOutlined className='iconfont' />
                        </span>
                    </div>
                </div>
            </div>
            <div className="nc-bill-search-area">
                <div className="search-area-contant">
                    <div className="item-contant" style={{ display: "block",textAlign: "left" }}>
                        <Space>
                            <label style={{fontWeight:'bolder'}}>收付方式：</label>
                            <Radio.Group
                                name="radiogroup"
                                defaultValue={1}
                                onChange={onChangeCD}
                                options={[
                                    { value: 1, label: '应收' },
                                    { value: 2, label: '应付' },
                                ]}
                            />
                            <label style={{fontWeight:'bolder'}}>销账模式：</label>
                            <Radio.Group
                                name="radiogroup"
                                defaultValue={1}
                                onChange={onChange}
                                options={[
                                    { value: 1, label: '费用' },
                                    { value: 2, label: '发票' },
                                    { value: 3, label: '账单' },
                                    { value: 4, label: '对账单' },
                                    { value: 5, label: '付款申请' },
                                ]}
                            />   
                        </Space>
                    </div>
                </div>
            </div>
            <AdvancedSearchForm fields={fields} onSearch={handleSearch} />
            <div className='nc-bill-table-area'>
                <Table<NotOffSettingItemProps>
                    columns={columnsType}
                    rowSelection={{ ...rowSelection}}
                    rowKey={(record) => `${record.BillNumber}`}
                    showSorterTooltip={false}
                    dataSource={notOffSettingList}
                    loading={notOffSettingList.length === 0}
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
                    footer={() => '底部汇总信息'}
                    bordered={true}
                />
            </div>
        </div>
        
        
    )
}
export default NotOffSetting;
