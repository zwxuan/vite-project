
import '@/pages/page_list.less';
import React, { useState, useEffect } from 'react';
import { Table, Button, Dropdown, Space, Modal, Form, Input, InputNumber, Select, Progress, notification, Popconfirm } from 'antd';
import type { MenuProps, TableProps } from 'antd';
import { useNavigate } from 'react-router-dom';
import { BaseGoodsItemProps } from "@/types/basic_manage/base_goods";
import { getBaseGoodsList, saveBaseGoods } from "@/api/basic_manage/base_goods_service";
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
// 添加行操作按钮的样式
const rowActionButtonStyle: React.CSSProperties = {
    float: 'right',      // 使用float实现浮动
    position: 'absolute', // 使用绝对定位
    right: '10px',       // 距离右侧10px
    top: '50%',          // 垂直居中
    transform: 'translateY(-50%)', // 确保垂直居中
    zIndex: 100,         // 确保按钮在上层
    display: 'flex',
    gap: '8px',
    background: '#fff',  // 白色背景
    padding: '4px 8px',
    borderRadius: '4px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
};
const BaseGoods: React.FC = () => {

    // 海关商品数据
    const [baseGoodsList, setBaseGoodsList] = useState([] as BaseGoodsItemProps[]);
    const [uploadImportType, setUploadImportType] = useState(1);
    const [pageSize, setPageSize] = useState(50);
    const [hoveredRow, setHoveredRow] = useState<string | null>(null); // 添加状态跟踪鼠标悬
    const navigate = useNavigate();
    // 获取海关商品数据
    useEffect(() => {
        const getData = async () => {
            const baseGoodsData = await getBaseGoodsList();
            // 设置海关商品台账数据
            setBaseGoodsList([...baseGoodsData]);
        };
        getData();
    }, []);

    const handleDelete = (record: BaseGoodsItemProps) => {
        alert(record);
    };
    const handleEdit = (record: BaseGoodsItemProps) => {
        const newData = baseGoodsList.filter((item) => item.GoodsCode === record.GoodsCode);
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

    const initFormData = {} as BaseGoodsItemProps;
    const [formData, setFormData] = useState<BaseGoodsItemProps>(initFormData);

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
            const response = await saveBaseGoods(formData, (progress) => {
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
    const rowSelection: TableRowSelection<BaseGoodsItemProps> = {
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

            <ModelExcelImport open={openExcel} onCancel={handleExcelCancel} businessType='base_goods' importType={uploadImportType} />
            <ModelExcelImportTemplate open={openExcelTemplate} onCancel={handleExcelTemplateCancel} businessType='base_goods' />
            <ModelExcelImportTemplateUpdate open={openExcelTemplateUpdate} onCancel={handleExcelTemplateUpdateCancel} businessType='base_goods' />

            <div className="nc-bill-header-area">
                <div className="header-title-search-area">
                    <div className="BillHeadInfoWrap BillHeadInfoWrap-showBackBtn">
                        <span className="bill-info-title" style={{ marginLeft: "10px" }}>
                            <CustomIcon type="icon-Currency" style={{ color: 'red', fontSize: '24px' }} /> 海关商品
                        </span>
                    </div>
                    <span className="orgunit-customize-showOff" style={{ marginLeft: "10px" }}>
                        <div style={{ display: "inline" }}>
                            <label className="u-checkbox nc-checkbox">
                                <input type="checkbox" className='u-checkbox-middle' /><label className="u-checkbox-label u-checkbox-label-middle">显示停用</label>
                            </label>
                        </div>
                    </span>
                </div>
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
                    </div>
                </div>
            </div>
            <AdvancedSearchForm fields={fields} onSearch={handleSearch} />
            <div className='nc-bill-table-area'>
                <Table<BaseGoodsItemProps>
                    columns={columnsType}
                    rowSelection={{ ...rowSelection }}
                    rowKey={(record) => `${record.GoodsCode}`}
                    showSorterTooltip={false}
                    dataSource={baseGoodsList}
                    loading={baseGoodsList.length === 0}
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
                    scroll={{ x: 'max-content', y: 'calc(100vh - 280px)' }}
                    footer={() => '底部汇总信息'}
                    bordered={true}
                    onRow={(record) => {
                        return {
                            onClick: (event) => { }, // 点击行
                            onDoubleClick: (event) => { }, // 双击行
                            onContextMenu: (event) => { }, // 右键点击行
                            onMouseEnter: (event) => {
                                setHoveredRow(record.GoodsCode); // 设置当前悬停的行
                            },
                            onMouseOut: (event) => { 
                                setHoveredRow(null);
                            },
                            onMouseLeave: (event) => {
                                setHoveredRow(null); // 清除悬停状态
                            },
                        };
                    }}
                    components={{
                        body: {
                            row: (props: any) => {
                                const record = props['data-row-key'] && baseGoodsList.find(item => `${item.GoodsCode}` === props['data-row-key']);
                                // 创建一个包含原始子元素和浮动按钮的新数组
                                const childrenWithButtons = React.Children.toArray(props.children);

                                // 如果当前行被悬停，添加浮动按钮
                                if (hoveredRow === record?.GoodsCode) {
                                    // 将按钮单元格添加到最后一个单元格中
                                    const lastCellIndex = childrenWithButtons.length - 1;
                                    const lastCell = childrenWithButtons[lastCellIndex];

                                    // 替换最后一个单元格，在其中添加浮动按钮
                                    childrenWithButtons[lastCellIndex] = React.cloneElement(
                                        lastCell as React.ReactElement,
                                        {},
                                        <>
                                            {React.Children.toArray((lastCell as React.ReactElement).props.children)}
                                            <div style={rowActionButtonStyle}>
                                                <Button size="small" onClick={(e) => {
                                                    handleEdit(record);
                                                }}>编辑</Button>
                                                <Button size="small" type="primary" onClick={(e) => { handleDelete(record);}}>删除</Button>
                                            </div>
                                        </>
                                    );
                                }
                                return (
                                    <tr {...props}>
                                        {childrenWithButtons}
                                    </tr>
                                );
                            }
                        }
                    }}
                />
            </div>
        </div>


    )
}
export default BaseGoods;

