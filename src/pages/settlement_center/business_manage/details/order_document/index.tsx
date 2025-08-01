﻿
import '@/pages/page_list.less';
import React, { useState, useEffect } from 'react';
import { Table, Button, Dropdown, Space, Progress, notification } from 'antd';
import type { MenuProps, TableProps } from 'antd';
import { useNavigate } from 'react-router-dom';
import { OrderDocumentItemProps } from "@/types/settlement_center/business_manage/order_document";
import { getOrderDocumentList, saveOrderDocument } from "@/api/settlement_center/business_manage/order_document_service";
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
import { fields } from './search_fields';
import DetailModal from './detail_modal';

type TableRowSelection<T extends object = object> = TableProps<T>['rowSelection'];
const OrderDocument: React.FC = () => {

    // 订单文档数据
    const [orderDocumentList, setOrderDocumentList] = useState([] as OrderDocumentItemProps[]);
    const [uploadImportType, setUploadImportType] = useState(1);
    const navigate = useNavigate();
    // 获取订单文档数据
    useEffect(() => {
        const getData = async () => {
            const orderDocumentData = await getOrderDocumentList();
            // 设置订单文档台账数据
            setOrderDocumentList([...orderDocumentData]);
        };
        getData();
    }, []);

    const handleDelete = (record: OrderDocumentItemProps) => {
        alert(record);
    };
    const handleEdit = (record: OrderDocumentItemProps) => {
        const newData = orderDocumentList.filter((item) => ` === `);
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

    const initFormData = {} as OrderDocumentItemProps;
    const [formData, setFormData] = useState<OrderDocumentItemProps>(initFormData);

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
            const response = await saveOrderDocument(formData, (progress) => {
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
    const rowSelection: TableRowSelection<OrderDocumentItemProps> = {
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
        <div>
            <div className="nc-bill-header-area">
                <div className="header-title-search-area">
                    <div className="BillHeadInfoWrap BillHeadInfoWrap-showBackBtn">
                        <span className="bill-info-title" style={{ marginLeft: "10px" }}>
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
                                <Button type="primary" danger onClick={handleAdd}>上传</Button>
                                <Button type="primary" danger onClick={handleAdd}>下载</Button>
                                <Button>删除</Button>
                            </div>
                        </div>
                        <div className="buttonGroup-component" style={{ marginLeft: "10px" }}>
                            <div className="u-button-group"></div>
                        </div>
                        <span className="u-button">
                            <RedoOutlined className='iconfont' />
                        </span>
                    </div>
                </div>
            </div>
            <div className='nc-bill-table-area'>
                <Table<OrderDocumentItemProps>
                    columns={columnsType}
                    rowSelection={{ ...rowSelection }}
                    rowKey={(record) => `${record.FileName}`}
                    showSorterTooltip={false}
                    dataSource={orderDocumentList}
                    loading={orderDocumentList.length === 0}
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
                    bordered={true}
                />
            </div>
        </div>
    )
}
export default OrderDocument;

