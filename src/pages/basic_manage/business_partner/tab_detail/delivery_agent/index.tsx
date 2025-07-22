
import '@/pages/page_list.less';
import React, { useState,useEffect } from 'react';
import { Table,Button,Dropdown, Space,Modal,Form,Input,InputNumber,Select,Progress,notification, Tooltip } from 'antd';
import type { MenuProps,TableProps } from 'antd';
import { useNavigate } from 'react-router-dom';
import { DeliveryAgentItemProps } from "@/types/basic_manage/delivery_agent";
import { getDeliveryAgentList,saveDeliveryAgent } from "@/api/basic_manage/delivery_agent_service";
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
import { statusItems, importItems, exportItems } from './menu_items';
import DetailModal from './detail_modal';

type TableRowSelection<T extends object = object> = TableProps<T>['rowSelection'];
const DeliveryAgent : React.FC = () => {

    // 换单代理数据
    const [deliveryAgentList, setDeliveryAgentList] = useState([] as DeliveryAgentItemProps[]);
    const [uploadImportType,setUploadImportType] = useState(1);
    const [pageSize, setPageSize] = useState(50);
    const navigate = useNavigate();
    // 获取换单代理数据
    useEffect(() => {
        const getData = async () => {
            const deliveryAgentData = await getDeliveryAgentList();
            // 设置换单代理台账数据
            setDeliveryAgentList([...deliveryAgentData]);
        };
        getData();
    }, []);
      
    const handleDelete = (record:DeliveryAgentItemProps) => {
        alert(record);
    };
    const handleEdit = (record:DeliveryAgentItemProps) => {
        const newData = deliveryAgentList.filter((item) => `${item.Id}` === `${record.Id}`);
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

    const initFormData = {} as DeliveryAgentItemProps;
    const [formData, setFormData] = useState<DeliveryAgentItemProps>(initFormData);
    
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
            const response = await saveDeliveryAgent(formData, (progress) => {
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
    const rowSelection: TableRowSelection<DeliveryAgentItemProps> = {
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
        <div  style={{overflowY: 'auto',overflowX:'hidden', height: 'calc(100vh - 120px)'}}>
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
            
            <ModelExcelImport open={openExcel} onCancel={handleExcelCancel} businessType='delivery_agent' importType={uploadImportType} />
            <ModelExcelImportTemplate open={openExcelTemplate} onCancel={handleExcelTemplateCancel}  businessType='delivery_agent' />
            <ModelExcelImportTemplateUpdate open={openExcelTemplateUpdate} onCancel={handleExcelTemplateUpdateCancel}  businessType='delivery_agent' />

            <div className="nc-bill-header-area">
                <div className="header-button-area">
                    <span className="button-app-wrapper header-button-area-button-app-wrapper"></span>
                    <div style={{display: "flex"}}>
                        <div className="buttonGroup-component">
                            <div className="u-button-group">
                                <Button type="primary" danger onClick={handleAdd}>新增</Button>
                                <Button>修改</Button>
                                <Button>删除</Button>
                                <Button>复制</Button>
                            </div>
                        </div> 
                        <div className="buttonGroup-component" style={{marginLeft: "10px"}}>
                            <div className="u-button-group"></div>
                        </div>
                        <span className="u-button">
                            <RedoOutlined className='iconfont' />
                        </span>
                        <Tooltip
                            title={
                                <div className='rul_title_tooltip' style={{ backgroundColor: '#fff', color: '#000' }}>
                                    <ol style={{ color: '#666666', fontSize: '12px', paddingLeft: '2px' }}>
                                        <li style={{ marginBottom: '10px' }}><span style={{ marginRight: '10px', backgroundColor: '#f1f1f1', padding: '2px 10px' }}><b>换单代理</b></span>特指在目的港或中转港，负责代表货代公司或船公司，从实际承运人（船公司）处领取正本提单，并根据货代指示（通常是货代提单-HBL）将其替换为提货单（D/O-Delivery Order）或其他必要文件，以便最终收货人能顺利提货的当地合作方。
                                        </li>
                                        <li style={{ marginBottom: '10px' }}><span style={{ marginRight: '10px', backgroundColor: '#f1f1f1', padding: '2px 10px' }}><b>代理信息</b></span>完整地址： 代理的实际办公地址，尤其是指定用于文件交接的地址。
                                                <p>关键联系人： 换单操作负责人的姓名、电话、邮箱。这是最常用、最关键的信息。</p>
                                                <p>换单要求/流程： 该代理特定的换单所需文件清单（如正本HBL/电放保函、付款证明、授权书格式要求等）、工作时间、截止时间、费用支付方式（到付/预付给代理）等特殊说明。</p>
                                                <p>银行信息： 如果需要预付换单费给该代理（有时是收货人直接付给代理，但货代需要知道信息）。</p>
                                                <p>网站/系统链接： 代理可能提供的在线查询或提交换单指令的网址。</p>
                                                <p>备注： 其他任何需要注意的事项，如擅长处理哪些船公司、节假日安排、特殊服务能力（如加急）等。</p>
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
                <Table<DeliveryAgentItemProps>
                    columns={columnsType}
                    rowSelection={{ ...rowSelection}}
                    rowKey={(record) => `${record.Id}`}
                    showSorterTooltip={false}
                    dataSource={deliveryAgentList}
                    loading={deliveryAgentList.length === 0}
                    pagination={{
                        size:'small',
                        pageSize:pageSize,
                        showTotal: (total) => `总共 ${total} 条`,
                        showQuickJumper:true,
                        showSizeChanger:true,
                        onShowSizeChange: (current, size) => {
                            setPageSize(size);
                        },
                        locale:{
                            items_per_page: '/页',
                            jump_to: '跳至',
                            page: '页',
                        }
                    }}
                    scroll={{ x: 'max-content', y: 'calc(100vh - 340px)' }}
                    footer={() => '底部汇总信息'}
                    bordered={true}
                />
            </div>
        </div>
        
        
    )
}
export default DeliveryAgent;
