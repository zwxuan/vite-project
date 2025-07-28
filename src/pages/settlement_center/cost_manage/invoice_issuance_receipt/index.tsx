
import '@/pages/page_list.less';
import React, { useState,useEffect } from 'react';
import { Table,Button,Dropdown, Space,Radio,Progress,notification,Row,Col, Tooltip } from 'antd';
import type { MenuProps,RadioChangeEvent,TableProps,TableColumnsType } from 'antd';
import { useNavigate } from 'react-router-dom';
import { InvoiceIssuanceReceiptItemProps } from "@/types/settlement_center/cost_manage/invoice_issuance_receipt";
import { getInvoiceIssuanceReceiptList,saveInvoiceIssuanceReceipt } from "@/api/settlement_center/cost_manage/invoice_issuance_receipt_service";
import { requestWithProgress } from "@/api/request";
import {RedoOutlined,DownOutlined,HourglassOutlined} from '@ant-design/icons';
import CustomIcon from "@/components/custom-icon";
import i18n from '@/i18n';
import LocaleHelper from '@/utils/localeHelper';
import AdvancedSearchForm from "@/components/search-form";
import ModelExcelImport from '@/components/excel/modal_import';
import ModelExcelImportTemplate from '@/components/excel/modal_import_template';
import ModelExcelImportTemplateUpdate from '@/components/excel/modal_import_template_update';
import InvoiceIssuanceModal from './invoice_issuance';
import { getColumns } from './columns';
import { getColumns as getBillColumns } from '@/pages/settlement_center/cost_manage/bill_manage/columns';
import { getColumns as getStatementOfAccountColumns } from '@/pages/settlement_center/cost_manage/statement_of_account/columns';
import { statusItems, importItems, exportItems } from './menu_items';
import { fields } from './search_fields';

type TableRowSelection<T extends object = object> = TableProps<T>['rowSelection'];
const InvoiceIssuanceReceipt : React.FC = () => {

    // 开票收票数据
    const [invoiceIssuanceReceiptList, setInvoiceIssuanceReceiptList] = useState([] as InvoiceIssuanceReceiptItemProps[]);
    const [uploadImportType,setUploadImportType] = useState(1);
    const navigate = useNavigate();
    // 获取开票收票数据
    useEffect(() => {
        const getData = async () => {
            const invoiceIssuanceReceiptData = await getInvoiceIssuanceReceiptList();
            // 设置开票收票台账数据
            setInvoiceIssuanceReceiptList([...invoiceIssuanceReceiptData]);
        };
        getData();
    }, []);
      
    const handleDelete = (record:InvoiceIssuanceReceiptItemProps) => {
        alert(record);
    };

    const handInvoiceIssuance =()=>{
        showModal();
    };
    const handleEdit = (record:InvoiceIssuanceReceiptItemProps) => {
        const newData = invoiceIssuanceReceiptList.filter((item) => ` === `);
        setFormData(newData[0]);
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
    const [billFlag, setBillFlag] = useState(false);
    const [creditFlag, setCredit] = useState(true);
    const [columnsType, setColumns] = useState<TableColumnsType<any>>(getColumns(handleEdit, handleDelete));

    // setColumns(getBillColumns(handleEdit, handleDelete));
    const showModal = () => {
        setOpen(true);
    };

    const initFormData = {} as InvoiceIssuanceReceiptItemProps;
    const [formData, setFormData] = useState<InvoiceIssuanceReceiptItemProps>(initFormData);
    
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
            const response = await saveInvoiceIssuanceReceipt(formData, (progress) => {
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
    const rowSelection: TableRowSelection<InvoiceIssuanceReceiptItemProps> = {
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

    const onChange = (e: RadioChangeEvent) => {
        if(e.target.value === 1){
            setColumns(getColumns(handleEdit, handleDelete));
        }else if(e.target.value === 3){
            setBillFlag(true);
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
    const handleSearch = (values:any) => {
        console.log('handleSearch',values);
    };

    return (
        <div  style={{overflowY: 'auto',overflowX:'hidden', height: 'calc(100vh - 80px)'}}>
            <InvoiceIssuanceModal 
                open={open}
                saving={saving}
                onCancel={handleCancel}
                onOk={handleOk}
                onChange={handleChange}
            />

            <ModelExcelImport open={openExcel} onCancel={handleExcelCancel} businessType='invoice_issuance_receipt' importType={uploadImportType} />
            <ModelExcelImportTemplate open={openExcelTemplate} onCancel={handleExcelTemplateCancel}  businessType='invoice_issuance_receipt' />
            <ModelExcelImportTemplateUpdate open={openExcelTemplateUpdate} onCancel={handleExcelTemplateUpdateCancel}  businessType='invoice_issuance_receipt' />

            <div className="nc-bill-header-area">
                <div className="header-title-search-area">
                    <div className="BillHeadInfoWrap BillHeadInfoWrap-showBackBtn">
                        <span className="bill-info-title" style={{marginLeft: "10px"}}>
                            <CustomIcon type="icon-Currency"  style={{color:'red',fontSize:'24px'}} /> 开票收票
                            <Tooltip
                                title={
                                    <div className='rul_title_tooltip' style={{ backgroundColor: '#fff', color: '#000' }}>
                                        <ol style={{ color: '#666666', fontSize: '12px', paddingLeft: '2px' }}>
                                            <li style={{ marginBottom: '10px' }}><span style={{ marginRight: '10px', backgroundColor: '#f1f1f1', padding: '2px 10px' }}><b>开票</b></span>指服务提供方或销售方向购买方开具发票，确认收入并作为税务申报凭证。
                                            </li>
                                            <li style={{ marginBottom: '10px' }}><span style={{ marginRight: '10px', backgroundColor: '#f1f1f1', padding: '2px 10px' }}><b>收票</b></span>指服务接收方或购买方收到发票，用于成本确认和税务抵扣。
                                            </li>
                                            <li style={{ marginBottom: '10px' }}><span style={{ marginRight: '10px', backgroundColor: '#f1f1f1', padding: '2px 10px' }}><b>对冲开票</b></span>当同一交易对手（客户/供应商）同时存在应收和应付账款时，双方通过系统或协议将应收和应付金额相抵，仅对净额部分开具发票（而非全额开票）。
                                            </li>
                                            <li style={{ marginBottom: '10px' }}><span style={{ marginRight: '10px', backgroundColor: '#f1f1f1', padding: '2px 10px' }}><b>完整流程示例</b></span>
                                            <p>1. 原始交易：货代A为客户B提供运输服务，应收运费10万元（A开票给B）；客户B为货代A提供仓储服务，应付仓储费8万元（B开票给A）。</p>
                                            <p>2. 对冲抵消：双方协商后，将应收10万与应付8万对冲，净应收2万元（B需支付A）。</p>
                                            <p>3. 开票调整：A向B开具净额发票2万元（原10万运费发票 - 8万仓储发票对冲）；B不再单独支付10万，A也不再支付8万。</p>
                                            <p>4. 结算	    B根据净额发票支付A 2万元。</p>
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
                                
                            </label>
                        </div>
                    </span>
                </div>
                <div className="header-button-area">
                    <span className="button-app-wrapper header-button-area-button-app-wrapper"></span>
                    <div style={{display: "flex"}}>
                        <div className="buttonGroup-component">
                            <div className="u-button-group">
                                <Button type="primary" danger onClick={handInvoiceIssuance}>{creditFlag?'开票':'收票'}</Button>
                                <Button type="primary" danger>{creditFlag?'对冲开票':'对冲收票'}</Button>
                                {billFlag && (
                                    <>
                                        <Button>取消账单确认</Button>
                                        <Button>标记</Button>
                                        <Button>取消标记</Button>
                                    </>
                                )}
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
                            <label style={{fontWeight:'bolder'}}>单据类型：</label>
                            <Radio.Group
                                name="radiogroup"
                                defaultValue={1}
                                onChange={onChange}
                                options={[
                                    { value: 1, label: '费用' },
                                    { value: 2, label: '业务' },
                                    { value: 3, label: '账单' },
                                    { value: 4, label: '对账单' },
                                ]}
                            />   
                        </Space>
                    </div>
                </div>
            </div>
            <AdvancedSearchForm fields={fields} onSearch={handleSearch} />
            <div className='nc-bill-table-area'>
                <Table
                    columns={columnsType}
                    rowSelection={{ ...rowSelection}}
                    rowKey={(record) => `${record.BusinessId}`}
                    showSorterTooltip={false}
                    dataSource={invoiceIssuanceReceiptList}
                    loading={invoiceIssuanceReceiptList.length === 0}
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
export default InvoiceIssuanceReceipt;

