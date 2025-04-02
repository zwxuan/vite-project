import '@/pages/page_list.less';
import React, { useState, useEffect } from 'react';
import { Table, Button, Dropdown, Space, Modal, Row, Input, Col, Select, Progress, notification } from 'antd';
import type { MenuProps, TableProps } from 'antd';
import { useNavigate } from 'react-router-dom';
import { CodeMappingItemProps } from "@/types/code_mapping/code_mapping";
import { getCodeMappingList, saveCodeMapping } from "@/api/financial_basic_data/code_mapping_service";
import { requestWithProgress } from "@/api/request";
import { RedoOutlined, DownOutlined, HourglassOutlined } from '@ant-design/icons';
import CustomIcon from "@/components/custom-icon";
import i18n from '@/i18n';
import LocaleHelper from '@/utils/localeHelper';
import AdvancedSearchForm from "@/components/search-form";
import ModelExcelImport from '@/components/excel/modal_import';
import ModelExcelImportTemplate from '@/components/excel/modal_import_template';
import ModelExcelImportTemplateUpdate from '@/components/excel/modal_import_template_update';
import { getColumns } from './columns';
import { importItems, exportItems } from './menu_items';
type TableRowSelection<T extends object = object> = TableProps<T>['rowSelection'];
const VoucherCodeMapping: React.FC = () => {
    // 数据
    const [chargingStandardList, setChargingStandardList] = useState([] as CodeMappingItemProps[]);
    const [uploadImportType, setUploadImportType] = useState(1);
    const [editingKey, setEditingKey] = useState('');
    const [editingRow, setEditingRow] = useState<CodeMappingItemProps | null>(null);
    const navigate = useNavigate();
    // 获取计费标准数据
    useEffect(() => {
        const getData = async () => {
            const res = await getCodeMappingList();
            const chargingStandardData = res?.data as CodeMappingItemProps[];
            // 设置计费标准台账数据
            setChargingStandardList([...chargingStandardData]);
        };
        getData();
    }, []);

    const handleDelete = (record: CodeMappingItemProps) => {
        Modal.confirm({
            title: '确认删除',
            content: '确定要删除这条记录吗？',
            okText: '确定',
            cancelText: '取消',
            onOk: async () => {
                try {
                    // TODO: 调用删除API
                    const newData = chargingStandardList.filter(item => item.MappingCode !== record.MappingCode);
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
    const handleEdit = (record: CodeMappingItemProps) => {
        if (editingKey !== '') {
            notification.warning({
                message: '提示',
                description: '请先完成当前编辑'
            });
            return;
        }
        setEditingKey(record.MappingCode?.toString() || '');
        setEditingRow({ ...record });
    };
    const handleSave = async (record: CodeMappingItemProps) => {
        try {
            // TODO: 调用保存API
            const newData = [...chargingStandardList];
            const index = newData.findIndex(item => record.MappingCode === item.MappingCode);
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
        const newRow: CodeMappingItemProps = {
            MappingCode: newId,
            BookingName: '管理账套',
            BusinessCode: '',
            BusinessName: '',
            FinanceCode: '',
            Remark: '',
        };
        setChargingStandardList([...chargingStandardList, newRow]);
        setEditingKey(newId);
        setEditingRow(newRow);
    };

    const isEditing = (record: CodeMappingItemProps) => record.MappingCode?.toString() === editingKey;

    const columnsType = getColumns(handleEdit, handleDelete, handleSave, handleCancel, isEditing, editingRow, setEditingRow);

    const excelImportOnClick: MenuProps['onClick'] = ({ key }) => {
        console.log(`Click on item ${key}`);
        if (key === '1') {
            setUploadImportType(1);
            setExcelOpen(true);
        } else if (key === '2') {
            setExcelTemplateOpen(true);
            console.log(openExcelTemplate)
        } else if (key === '3') {
            setUploadImportType(2);
            setExcelOpen(true);
        } else if (key === '4') {
            setExcelTemplateOpenUpdate(true);
        }
        else {
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

    const initFormData = {} as CodeMappingItemProps;
    const [formData, setFormData] = useState<CodeMappingItemProps>(initFormData);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };
    const handleDateChange = (name: string, value: string | Array<string>) => {
        setFormData({ ...formData, [name]: value });
    };
    const handleNumberChange = (name: string, value: number | null) => {
        setFormData({ ...formData, [name]: value });
    };
    const handleOk = async () => {
        setSaving(true);

        // 打开通知
        const key = `progress_${Date.now()}`;
        notification.open({
            key,
            message: '提示',
            placement: 'bottomRight',
            description: <Progress type='circle' percent={0} size={60} />,
            duration: 0,
            icon: <HourglassOutlined />,
            style: {
                width: 200,
            },
        });

        try {
            const response = await saveCodeMapping(formData, (progress) => {
                // 更新通知中的进度条
                notification.open({
                    key,
                    message: '提示',
                    description: <Progress type='circle' percent={progress} strokeColor={progress === 100 ? "" : "#ff1648"} size={60} />,
                    duration: 0,
                    placement: 'bottomRight',
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
    const rowSelection: TableRowSelection<CodeMappingItemProps> = {
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

    const handleSearch = (values: any) => {
        console.log('handleSearch', values);
    };

    return (
        <div className='transferModal' style={{ overflowY: 'auto', overflowX: 'hidden', height: 'calc(100vh - 80px)' }}>

            <ModelExcelImport open={openExcel} onCancel={handleExcelCancel} businessType='charging_standard' importType={uploadImportType} />
            <ModelExcelImportTemplate open={openExcelTemplate} onCancel={handleExcelTemplateCancel} businessType='charging_standard' />
            <ModelExcelImportTemplateUpdate open={openExcelTemplateUpdate} onCancel={handleExcelTemplateUpdateCancel} businessType='charging_standard' />

            <div className="nc-bill-header-area">
                <div className="header-title-search-area">
                    <div className="BillHeadInfoWrap BillHeadInfoWrap-showBackBtn">
                        <span className="bill-info-title" style={{ marginLeft: "10px" }}>
                            <CustomIcon type="icon-Currency" style={{ color: 'red', fontSize: '24px' }} /> 编码映射
                        </span>
                    </div>
                    <span className="orgunit-customize-showOff" style={{ marginLeft: "10px" }}>
                        <div style={{ display: "inline" }}>
                        </div>
                    </span>
                </div>
                <div className="header-button-area">
                    <span className="button-app-wrapper header-button-area-button-app-wrapper"></span>
                    <div style={{ display: "flex" }}>
                        <div className="buttonGroup-component">
                            <div className="u-button-group">
                                <Button onClick={handleAdd}>新增</Button>
                                <Button>修改</Button>
                                <Button>删除</Button>
                                <Button>复制</Button>
                            </div>
                        </div>
                        <div className="buttonGroup-component" style={{ marginLeft: "10px" }}>
                            <div className="u-button-group"></div>
                        </div>
                        <div className="divider-button-wrapper">
                            <Dropdown menu={{ items: importItems, onClick: excelImportOnClick }}>
                                <Button>
                                    <Space>
                                        导入
                                        <DownOutlined />
                                    </Space>
                                </Button>
                            </Dropdown>
                            <Dropdown menu={{ items: exportItems }}>
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
            <div className='nc-bill-table-area'>
                <Row gutter={24} style={{ paddingRight: '6px' }} className='ant-tranfer-row'>
                    <Col span={4} className='ant-tranfer-col-left' style={{borderRight: '1px solid #e8e8e8',height: 'calc(100vh - 125px)' }}>
                        <ul style={{ height: '400px', overflowY: 'auto', overflowX: 'hidden' }}>
                            {chargingStandardList.map((item) => {
                                return (
                                    <li key={item.MappingCode}>
                                        <div className='tranfer-col-left-item'>
                                            {item.BookingName}
                                        </div>
                                    </li>
                                )
                            })
                            }
                        </ul>
                    </Col>
                    <Col span={20}>
                        <div className='nc-bill-table-area'>
                            <Table<CodeMappingItemProps>
                                columns={columnsType}
                                rowSelection={{ ...rowSelection }}
                                rowKey={(record) => `${record.MappingCode}`}
                                showSorterTooltip={false}
                                dataSource={chargingStandardList}
                                loading={chargingStandardList.length === 0}
                                pagination={
                                    {
                                        size: 'small',
                                        pageSize: 50, showTotal: (total) => `总共 ${total} 条`,
                                        showQuickJumper: true,
                                        locale:
                                        {
                                            items_per_page: '/页',
                                            jump_to: '跳至',
                                            page: '页',
                                        }
                                    }
                                }
                                scroll={{ x: 'max-content', y: 'calc(100vh - 280px)' }}
                                footer={() => ''}
                                bordered={true}
                            />
                        </div>
                    </Col>
                </Row>
            </div>

        </div>
    )
}
export default VoucherCodeMapping;
