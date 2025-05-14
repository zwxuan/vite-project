
import '@/pages/page_list.less';
import React, { useState, useEffect } from 'react';
import { Table, Button, Dropdown, Space, Modal, Form, Input, InputNumber, Select, Progress, notification, Tooltip } from 'antd';
import type { MenuProps, TableProps } from 'antd';
import { useNavigate } from 'react-router-dom';
import { ExpenseReviewItemProps } from "@/types/finance_manage/expense_review/expense_review";
import { getExpenseReviewList, saveExpenseReview } from "@/api/finance_manage/expense_review_service";
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
import { statusItems, appropriateItems, exportItems, printItems, archiveItems, editBusinessItems } from './menu_items';
import { fields } from './search_fields';
import DetailModal from './detail_modal';

type TableRowSelection<T extends object = object> = TableProps<T>['rowSelection'];
const ExpenseReview: React.FC = () => {

    // 费用审核数据
    const [expenseReviewList, setExpenseReviewList] = useState([] as ExpenseReviewItemProps[]);
    const [uploadImportType, setUploadImportType] = useState(1);
    const [pageSize, setPageSize] = useState(50);
    const navigate = useNavigate();
    // 获取费用审核数据
    useEffect(() => {
        const getData = async () => {
            const expenseReviewData = await getExpenseReviewList();
            // 设置费用审核台账数据
            setExpenseReviewList([...expenseReviewData]);
        };
        getData();
    }, []);

    const handleDelete = (record: ExpenseReviewItemProps) => {
        alert(record);
    };
    const handleEdit = (record: ExpenseReviewItemProps) => {
        const newData = expenseReviewList.filter((item) => ` === `);
        navigate('/importlog');
    };

    const columnsType = getColumns(handleEdit, handleDelete);

    const appropriateOnClick: MenuProps['onClick'] = ({ key }) => {
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

    const initFormData = {} as ExpenseReviewItemProps;
    const [formData, setFormData] = useState<ExpenseReviewItemProps>(initFormData);

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
            const response = await saveExpenseReview(formData, (progress) => {
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
    const rowSelection: TableRowSelection<ExpenseReviewItemProps> = {
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
        <div style={{ overflowY: 'auto', overflowX: 'hidden', height: 'calc(100vh - 80px)' }}>
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

            <ModelExcelImport open={openExcel} onCancel={handleExcelCancel} businessType='expense_review' importType={uploadImportType} />
            <ModelExcelImportTemplate open={openExcelTemplate} onCancel={handleExcelTemplateCancel} businessType='expense_review' />
            <ModelExcelImportTemplateUpdate open={openExcelTemplateUpdate} onCancel={handleExcelTemplateUpdateCancel} businessType='expense_review' />

            <div className="nc-bill-header-area">
                <div className="header-title-search-area">
                    <div className="BillHeadInfoWrap BillHeadInfoWrap-showBackBtn">
                        <span className="bill-info-title" style={{ marginLeft: "10px" }}>
                            <CustomIcon type="icon-Currency" style={{ color: 'red', fontSize: '24px' }} /> 费用审核
                            <Tooltip
                                title={
                                    <div className='rul_title_tooltip' style={{ backgroundColor: '#fff', color: '#000' }}>
                                        <ol style={{ color: '#666666', fontSize: '12px', paddingLeft: '2px' }}>
                                            <li style={{ marginBottom: '10px' }}><span style={{ marginRight: '10px', backgroundColor: '#f1f1f1', padding: '2px 10px' }}><b>审核</b></span>财务对于操作提交的业务单据审核收入和成本费用是否合理。
                                            </li>
                                            <li style={{ marginBottom: '10px' }}><span style={{ marginRight: '10px', backgroundColor: '#f1f1f1', padding: '2px 10px' }}><b>计提</b></span>财务将业务单据打上计提标记和计提日期，表示在计提时间以后销售可以提取该票业务的业绩,业务单据的应收费用必须全部核销才能计提。
                                            </li>
                                            <li style={{ marginBottom: '10px' }}><span style={{ marginRight: '10px', backgroundColor: '#f1f1f1', padding: '2px 10px' }}><b>业务提成</b></span>财务对于已经打上计提标记的业务单据计算提成金额，根据规则设置自动计算（账期、提成比例、客户、业务类型等等）。
                                            </li>
                                            <li style={{ marginBottom: '10px' }}><span style={{ marginRight: '10px', backgroundColor: '#f1f1f1', padding: '2px 10px' }}><b>修改</b></span>财务可以对于已经审核通过的业务单据修改业务日期和其他信息，不需要取消审核后退回给操作修改。
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
                    <div style={{ display: "flex" }}>
                        <div className="buttonGroup-component">
                            <div className="u-button-group">
                                <Button type="primary" danger onClick={handleAdd}>锁单</Button>
                                <Button type="primary" danger>业务提成</Button>
                            </div>
                        </div>
                        <div className="buttonGroup-component" style={{ marginLeft: "10px" }}>
                            <div className="u-button-group"></div>
                        </div>
                        <div className="divider-button-wrapper">
                            <Dropdown menu={{ items: statusItems }}>
                                <Button>
                                    <Space>
                                        批量审批
                                        <DownOutlined />
                                    </Space>
                                </Button>
                            </Dropdown>
                            <Dropdown menu={{ items: appropriateItems, onClick: appropriateOnClick }}>
                                <Button>
                                    <Space>
                                        计提
                                        <DownOutlined />
                                    </Space>
                                </Button>
                            </Dropdown>
                            <Dropdown menu={{ items: printItems }}>
                                <Button>
                                    <Space>
                                        打印
                                        <DownOutlined />
                                    </Space>
                                </Button>
                            </Dropdown>
                            <Dropdown menu={{ items: archiveItems }}>
                                <Button>
                                    <Space>
                                        归档
                                        <DownOutlined />
                                    </Space>
                                </Button>
                            </Dropdown>
                            <Dropdown menu={{ items: editBusinessItems }}>
                                <Button>
                                    <Space>
                                        修改
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
            <AdvancedSearchForm fields={fields} onSearch={handleSearch} />
            <div className='nc-bill-table-area'>
                <Table<ExpenseReviewItemProps>
                    columns={columnsType}
                    rowSelection={{ ...rowSelection }}
                    rowKey={(record) => `${record.BusinessNumber}`}
                    showSorterTooltip={false}
                    dataSource={expenseReviewList}
                    loading={expenseReviewList.length === 0}
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
                    scroll={{ x: 'max-content', y: 'calc(100vh - 320px)' }}
                    footer={() => '底部汇总信息'}
                    bordered={true}
                />
            </div>
        </div>


    )
}
export default ExpenseReview;
