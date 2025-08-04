
import '@/pages/page_list.less';
import React, { useState, useEffect } from 'react';
import { Table, Button, Dropdown, Space, Modal, Form, Input, InputNumber, Select, Progress, notification, Tooltip, Row, Col, Radio, Checkbox } from 'antd';
import type { MenuProps, TableProps } from 'antd';
import { useNavigate } from 'react-router-dom';
import { InvoiceRequirementItemProps } from "@/types/dynamic_configuration_platform/basic_manage/invoice_requirement";
import { getInvoiceRequirementList, saveInvoiceRequirement } from "@/api/dynamic_configuration_platform/basic_manage/invoice_requirement_service";
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
import { statusItems, importItems, exportItems } from './menu_items';
import DetailModal from './detail_modal';
import TextArea from 'antd/es/input/TextArea';

type TableRowSelection<T extends object = object> = TableProps<T>['rowSelection'];
const InvoiceRequirement: React.FC = () => {

    // 开票要求数据
    const [invoiceRequirementList, setInvoiceRequirementList] = useState([] as InvoiceRequirementItemProps[]);
    const [uploadImportType, setUploadImportType] = useState(1);
    const [pageSize, setPageSize] = useState(50);
    const navigate = useNavigate();
    // 获取开票要求数据
    useEffect(() => {
        const getData = async () => {
            const invoiceRequirementData = await getInvoiceRequirementList();
            // 设置开票要求台账数据
            setInvoiceRequirementList([...invoiceRequirementData]);
        };
        getData();
    }, []);

    const handleDelete = (record: InvoiceRequirementItemProps) => {
        alert(record);
    };
    const handleEdit = (record: InvoiceRequirementItemProps) => {
        const newData = invoiceRequirementList.filter((item) => `${item.CustomerNo}` === `${record.CustomerNo}`);
        setFormData(newData[0]);
        setModalFlag('edit');
        showModal();
    };

    const columnsType = getColumns(handleEdit, handleDelete);

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

    const handleAdd = () => {
        setModalFlag('add');
        setFormData(initFormData);
        showModal();
    };

    const initFormData = {} as InvoiceRequirementItemProps;
    const [formData, setFormData] = useState<InvoiceRequirementItemProps>(initFormData);

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
            const response = await saveInvoiceRequirement(formData, (progress) => {
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
    const rowSelection: TableRowSelection<InvoiceRequirementItemProps> = {
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
        <div style={{ overflowY: 'auto', overflowX: 'hidden', height: 'calc(100vh - 120px)' }}>
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

            <ModelExcelImport open={openExcel} onCancel={handleExcelCancel} businessType='invoice_requirement' importType={uploadImportType} />
            <ModelExcelImportTemplate open={openExcelTemplate} onCancel={handleExcelTemplateCancel} businessType='invoice_requirement' />
            <ModelExcelImportTemplateUpdate open={openExcelTemplateUpdate} onCancel={handleExcelTemplateUpdateCancel} businessType='invoice_requirement' />

            <div className="nc-bill-header-area">
                <div className="header-button-area">
                    <span className="button-app-wrapper header-button-area-button-app-wrapper"></span>
                    <div style={{ display: "flex" }}>
                        <div className="buttonGroup-component">
                            <div className="u-button-group">
                                <Button type="primary" danger onClick={handleAdd}>新增</Button>
                                <Button>修改</Button>
                                <Button>删除</Button>
                                <Button>复制</Button>
                            </div>
                        </div>
                        <div className="buttonGroup-component" style={{ marginLeft: "10px" }}>
                            <div className="u-button-group"></div>
                        </div>
                        <div className="divider-button-wrapper">
                            <Dropdown menu={{ items: statusItems }}>
                                <Button>
                                    <Space>
                                        启用
                                        <DownOutlined />
                                    </Space>
                                </Button>
                            </Dropdown>
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
                        <Tooltip
                            title={
                                <div className='rul_title_tooltip' style={{ backgroundColor: '#fff', color: '#000' }}>
                                    <ol style={{ color: '#666666', fontSize: '12px', paddingLeft: '2px' }}>
                                        <li style={{ marginBottom: '10px' }}><span style={{ marginRight: '10px', backgroundColor: '#f1f1f1', padding: '2px 10px' }}><b>自动发送邮件设置</b></span>税控平台及本系统可分别发送邮件到指定邮箱。若启用自动发送，但选择的邮件推送对象邮箱地址为空，则发送给发票创建人。
                                        </li>
                                        <li style={{ marginBottom: '10px' }}><span style={{ marginRight: '10px', backgroundColor: '#f1f1f1', padding: '2px 10px' }}><b>适用WHT税</b></span>适用于泰国WHT（代扣代缴税）退税功能，需要配合分公司设置开启该功能。
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
                <Row gutter={24} style={{}} className='ant-tranfer-row'>
                    <Col span={6}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                            <label className='item-lable-title'>币种要求</label>
                            <Radio.Group
                                name="contractAgreementCheckbox"
                                defaultValue={[]}
                                options={[
                                    { value: 1, label: '未指定' },
                                    { value: 2, label: '指定' },
                                    { value: 3, label: '原币支付' },
                                ]}
                            />
                            <Select style={{ width:'80px' }} disabled options={[
                                { "value": "1", "label": "RMB" },
                                { "value": "2", "label": "USD" },
                                { "value": "3", "label": "EUR" },
                                { "value": "4", "label": "IDR" },
                            ]}></Select>
                        </div>
                    </Col>
                    <Col span={8}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                            <label className='item-lable-title'>开票方式</label>
                            <Radio.Group
                                name="contractAgreementCheckbox"
                                defaultValue={[]}
                                options={[
                                    { value: 1, label: '单票开票' },
                                    { value: 2, label: '月结开票' },
                                ]}
                            />
                            <Checkbox.Group
                                name="contractAgreementCheckbox"
                                defaultValue={[]}
                                options={[
                                    { value: 1, label: '是否可高开' },
                                ]}
                            />

                        </div>
                    </Col>
                </Row>
                <Row gutter={24} style={{}} className='ant-tranfer-row'>
                    <Col span={14}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                            <label className='item-lable-title'>开票备注</label>
                            <TextArea  style={{ flex: 1 }}  rows={2} />
                        </div>
                    </Col>
                </Row>
            </div>
            <div className='nc-bill-table-area'>
                <Table<InvoiceRequirementItemProps>
                    columns={columnsType}
                    rowSelection={{ ...rowSelection }}
                    rowKey={(record) => `${record.CustomerNo}`}
                    showSorterTooltip={false}
                    dataSource={invoiceRequirementList}
                    loading={invoiceRequirementList.length === 0}
                    pagination={{
                        size: 'small',
                        pageSize: pageSize,
                        showTotal: (total) => `总共 ${total} 条`,
                        showQuickJumper: true,
                        showSizeChanger: true,
                        onShowSizeChange: (current, size) => {
                            setPageSize(size);
                        },
                        locale: {
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
export default InvoiceRequirement;
