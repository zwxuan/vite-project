
import React, { useState,useEffect } from 'react';
import { Table,Button,Dropdown, Space,Modal,Form,Input,InputNumber,Select,Progress,notification,Popconfirm } from 'antd';
import type { MenuProps,TableProps } from 'antd';
import { useNavigate } from 'react-router-dom';
import { ChargingStandardItemProps } from "@/types/charging_standard/charging_standard";
import { getChargingStandardList,saveChargingStandard } from "@/api/financial_basic_data/charging_standard_service";
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
import { fields } from './search_fields';

type TableRowSelection<T extends object = object> = TableProps<T>['rowSelection'];
const FeeTab : React.FC = () => {

    // 计费标准数据
    const [chargingStandardList, setChargingStandardList] = useState([] as ChargingStandardItemProps[]);
    const [uploadImportType,setUploadImportType] = useState(1);
    const [editingKey, setEditingKey] = useState('');
    const [editingRow, setEditingRow] = useState<ChargingStandardItemProps | null>(null);
    const navigate = useNavigate();
    // 获取计费标准数据
    useEffect(() => {
        const getData = async () => {
            const chargingStandardData = await getChargingStandardList();
            // 设置计费标准台账数据
            setChargingStandardList([...chargingStandardData]);
        };
        getData();
    }, []);
      
    const handleDelete = (record:ChargingStandardItemProps) => {
        Modal.confirm({
            title: '确认删除',
            content: '确定要删除这条记录吗？',
            okText: '确定',
            cancelText: '取消',
            onOk: async () => {
                try {
                    // TODO: 调用删除API
                    const newData = chargingStandardList.filter(item => item.Id !== record.Id);
                    setChargingStandardList(newData);
                } catch (error) {
                    console.error('Delete failed:', error);
                    notification.error({
                        message: '删除失败',
                        description: '请稍后重试'
                    });
                }
            }
        });
    };
    const handleEdit = (record:ChargingStandardItemProps) => {
        if (editingKey !== '') {
            notification.warning({
                message: '提示',
                description: '请先完成当前编辑'
            });
            return;
        }
        setEditingKey(record.Id?.toString() || '');
        setEditingRow({...record});
    };
    const handleSave = async (record:ChargingStandardItemProps) => {
        try {
            // TODO: 调用保存API
            const newData = [...chargingStandardList];
            const index = newData.findIndex(item => record.Id === item.Id);
            if (index > -1) {
                const item = newData[index];
                newData.splice(index, 1, {
                    ...item,
                    ...record,
                });
                setChargingStandardList(newData);
                setEditingKey('');
                setEditingRow(null);
                notification.success({
                    message: '保存成功'
                });
            }
        } catch (error) {
            console.error('Save failed:', error);
            notification.error({
                message: '保存失败',
                description: '请稍后重试'
            });
        }
    };
    const handleCancel = () => {
        setEditingKey('');
        setEditingRow(null);
    };
    const handleAdd = () => {
        if (editingKey !== '') {
            notification.warning({
                message: '提示',
                description: '请先完成当前编辑'
            });
            return;
        }
        const newId = Date.now().toString();
        const newRow: ChargingStandardItemProps = {
            Id: newId,
            PaymentMethod: "应收",
            FeeName: "空运费",
            IsControlled: "否",
            SettlementUnitType: "客户",
            FixedSettlementUnit: "",
            Currency: "USD",
            City: "",
            BillingUnit: "计费重量价",
            ValueLowerLimit: 0,
            ValueUpperLimit: 0,
            ContainerType: "",
            ContainerCategory: "",
            Quantity: 0,
            BillingUnitPrice: "0",
            UnitPrice: 1000,
            MinimumCharge: 0,
            TaxRate: 0,
            Remarks: "",
            RequiresInvoice: "是",
        };
        setChargingStandardList([...chargingStandardList, newRow]);
        setEditingKey(newId);
        setEditingRow(newRow);
    };
    
    const isEditing = (record: ChargingStandardItemProps) => record.Id?.toString() === editingKey;

    const columnsType = getColumns(handleEdit, handleDelete, handleSave, handleCancel, isEditing, editingRow, setEditingRow);
    
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

    const initFormData = {} as ChargingStandardItemProps;
    const [formData, setFormData] = useState<ChargingStandardItemProps>(initFormData);
    
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
            const response = await saveChargingStandard(formData, (progress) => {
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
    const rowSelection: TableRowSelection<ChargingStandardItemProps> = {
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
            
            <ModelExcelImport open={openExcel} onCancel={handleExcelCancel} businessType='charging_standard' importType={uploadImportType} />
            <ModelExcelImportTemplate open={openExcelTemplate} onCancel={handleExcelTemplateCancel}  businessType='charging_standard' />
            <ModelExcelImportTemplateUpdate open={openExcelTemplateUpdate} onCancel={handleExcelTemplateUpdateCancel}  businessType='charging_standard' />

            
            <div className="header-button-area">
                <div style={{textAlign:'right',paddingRight:'8px',paddingTop:'3px'}}>
                    <div className="buttonGroup-component">
                        <div className="u-button-group">
                            <Button onClick={handleAdd}>新增</Button>
                            <Button>修改</Button>
                            <Button>删除</Button>
                            <Button>复制</Button>
                        </div>
                    </div> 
                </div>
            </div>
            <div className='nc-bill-table-area'>
                <Table<ChargingStandardItemProps>
                    columns={columnsType}
                    rowSelection={{ ...rowSelection}}
                    rowKey={(record) => `${record.Id}`}
                    showSorterTooltip={false}
                    dataSource={chargingStandardList}
                    loading={chargingStandardList.length === 0}
                    pagination={false}
                    scroll={{ x: 'max-content', y: 'calc(100vh - 280px)' }}
                    footer={() => ''}
                    bordered={true}
                />
            </div>
        </div>
        
        
    )
}
export default FeeTab;
