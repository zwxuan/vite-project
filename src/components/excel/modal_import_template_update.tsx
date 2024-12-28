import React, { useState, useEffect } from 'react';
import { Modal, Table, Button, Tooltip, Tag,Space,Radio } from 'antd';
import type { TableColumnsType, TableProps } from 'antd';
import { FundViewOutlined } from '@ant-design/icons';
import { ImportTemplateItem } from "@/types/excel/import_template";
import { getImportTemplateList } from "@/api/financial_basic_data/currency_service";
import CustomeExcelTemplate from './custom_template';
interface ModelExcelImportTemplateProps {
    open: boolean;
    businessType?: string;//后期添加实现，根据类型判断模板类型
    onCancel: () => void;
}
type TableRowSelection<T extends object = object> = TableProps<T>['rowSelection'];
const ModelExcelImportTemplateUpdate: React.FC<ModelExcelImportTemplateProps> = ({ open, onCancel, businessType }) => {
    console.log(businessType);
    const handleExcelTemplateCancel = () => {
        onCancel();
    };
    // 模板数据
    const [importTemplateList, setTemplateList] = useState([] as ImportTemplateItem[]);
    const [currencyKey, setCurrencyKey] = useState('MB10002')
    // 获取模板数据
    useEffect(() => {
        // 获取模板数据
        const getData = async () => {
            const res = await getImportTemplateList();
            const templateData = res?.data as ImportTemplateItem[];
            // 设置模板台账数据
            setTemplateList([...templateData]);
        };
        getData();
    }, []);

    const columnsType: TableColumnsType<ImportTemplateItem> = [
        {
            title: '序号',
            dataIndex: 'SerialNo',
            sorter: true,
            align: 'center',
            width: '60px',
        },
        {
            title: '版本',
            dataIndex: 'Version',
            sorter: true,
            align: 'left',
            width: '60px',
        },
        {
            title: '模板编号',
            dataIndex: 'TemplateCode',
            sorter: true,
        },
        {
            title: '模板名称',
            dataIndex: 'TemplateName',
            sorter: true,
        },
        {
            title: '模板来源',
            dataIndex: 'TemplateSource',
            sorter: true,
        },
        {
            title: '创建时间',
            dataIndex: 'CreatDate',
            sorter: true,
            align: 'center',
        },
        {
            title: '更新时间',
            dataIndex: 'LastDate',
            sorter: true,
            align: 'center',
        },
        {
            title: '操作人',
            dataIndex: 'Operator',
            sorter: true,
        },
        {
            title: '状态',
            dataIndex: 'Status',
            sorter: true,
            align: 'center',
            width: '60px',
            render: (text) => {
                if (text === 0) {
                    return <Tag color='red'>未发布</Tag>;
                } else {
                    return <Tag color='green'>已发布</Tag>;
                }
            },
        },
        {
            title: '国家|地区',
            dataIndex: 'Country',
            sorter: true,
            align: 'center',
            width: 140,
        },
        {
            title: '是否默认模板',
            dataIndex: 'IsDefault',
            sorter: true,
            align: 'center',
            width: 140,
            render: (text) => {
                if (text === 0) {
                    return <Tag color='red'>否</Tag>;
                } else {
                    return <Tag color='green'>是</Tag>;
                }
            },
        },
        {
            title: '操作',
            key: 'operation',
            fixed: 'right',
            width: 40,
            render: (_, record) => (
                <>
                    <a href='#' key={record.TemplateCode} onClick={()=>{handOnOpenCustom(true);}}>查看</a>
                </>
            ),
        },
    ];

    //表格选中和取消时触发的函数
    const rowSelection: TableRowSelection<ImportTemplateItem> = {
        onChange: (selectedRowKeys, selectedRows) => {
            console.log('onchange');
            console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
        },
        onSelect: (record, selected, selectedRows) => {
            console.log('onselect');
            setCurrencyKey(record.TemplateCode);
            console.log(record, selected, selectedRows);
        },
        onSelectAll: (selected, selectedRows, changeRows) => {
            console.log('onallselect');
            console.log(selected, selectedRows, changeRows);
        },
        type: 'radio',
        columnWidth: '20px',
        selectedRowKeys: [currencyKey],
    };
    const [openCustom, setOpenCustom] = useState(false);
    const [readOnlyCustom, setReadOnlyCustom] = useState(false);
    const handleOnCancel = () => {
        setOpenCustom(false);
    };
    const handOnOpenCustom = (readonly:boolean) => {
        setReadOnlyCustom(readonly);
        setOpenCustom(true);
    };
    return (
        <>
            <Modal open={openCustom} title="自定义模板"
                onCancel={handleOnCancel}
                width={'75%'}
                destroyOnClose={true}
                maskClosable={false}
                footer={(_) => readOnlyCustom?'':(
                        <div style={{ textAlign: 'right' }}>
                            <Space>
                                <Button onClick={handleOnCancel}>取消</Button>
                                <Button type="primary">保存</Button>
                            </Space>
                        </div>
                    )
                }
            >
                <CustomeExcelTemplate title='币制详情' readonly={readOnlyCustom} formType='update' />
            </Modal>
            <Modal open={open} title="导出工作台"
                onCancel={handleExcelTemplateCancel}
                width={'75%'}
                destroyOnClose={true}
                maskClosable={false}
                footer={(_) => (
                    <>
                        <div style={{ textAlign: 'right' }}>
                            <Space>
                                <Button>导出日志</Button>
                                <Button onClick={handleExcelTemplateCancel}>取消</Button>
                                <Button type="primary">导出</Button>
                            </Space>
                        </div>
                    </>
                )}
            >
                <div style={{ minHeight: 'calc(100vh - 280px)' }}>
                    <div className="nc-bill-header-area">
                        <div className="header-title-search-area" style={{width:'300px'}}>
                            <span style={{marginLeft:'10px',marginRight:'10px'}}>导出类型</span>
                            <Tooltip
                                title={
                                    <div className='rul_title_tooltip' style={{ backgroundColor: '#fff', color: '#000'}}>
                                        <ol style={{ color: '#666666', fontSize: '12px' }}>
                                            <li style={{ marginBottom: '10px' }}><span style={{ marginRight: '10px', backgroundColor: '#f1f1f1', padding: '2px 10px' }}><b>更新导入的导出</b></span>此导出用于修改后再覆盖更新导入，导出为文本格式，遵循导入模板形式。若表单存在“表头”与“表头+明细”两种模式时，不受切换影响，但“表头+明细”模式下，当子表多行时导致表头重复，也不受是否勾选影响，会自动去重。</li>
                                            <li style={{ marginBottom: '10px' }}><span style={{ marginRight: '10px', backgroundColor: '#f1f1f1', padding: '2px 10px' }}><b>列表导出</b></span>是获取列表的导出模型，若表单存在“表头”与“表头+明细”两种模式时，查看模板时，“是否列入模板”数量会根据两种模式切换。 “时间、日期、数值”按自定义格式导出，而“文本、枚举、参照”等则采用文本格式，其余空白处采用常规格式。</li>
                                            <li style={{ marginBottom: '10px' }}><span style={{ marginRight: '10px', backgroundColor: '#f1f1f1', padding: '2px 10px' }}><b>详情导出</b></span>是获取详情的导出模型，不受“表头、表头+明细”模式切换影响，但“表头+明细”模式下，当子表多行时导致表头重复，则会自动去重。 格式同【列表导出】。</li>
                                            <li style={{ marginBottom: '10px' }}><span style={{ marginRight: '10px', backgroundColor: '#f1f1f1', padding: '2px 10px' }}><b>按列表设置导出</b></span>根据列表界面设置导出，包括列表项的显示/隐藏、字段顺序等，支持“表头”与“表头+明细”两种模式切换。格式同【列表导出】。</li>
                                        </ol>
                                    </div>
                                }
                                color='white'
                                placement='rightBottom'
                                overlayInnerStyle={{ width: '300px' }}
                            >
                                <i className='iconfont icon-bangzhutishi' style={{ cursor: 'pointer',fontSize:'14px' }}></i>
                            </Tooltip>
                            <span className='rule_tilte_info' style={{marginLeft:'10px',marginRight:'10px'}}>
                                <Radio.Group name="radiogroup" defaultValue={1}>
                                    <Radio value={1}>更新导入的导出</Radio>
                                </Radio.Group>
                            </span> 
                        </div>
                        <div className="header-button-area">
                            <span className="button-app-wrapper header-button-area-button-app-wrapper"></span>
                            <div style={{ display: "flex" }}>
                                <div className="buttonGroup-component">
                                    <Button type="primary" danger >从导入模板添加</Button>
                                    <Button style={{ margin: "0px 5px" }} onClick={()=>{handOnOpenCustom(false);}}>自定义模板</Button>
                                    <Tooltip
                                        title={
                                            <div className='rul_title_tooltip' style={{ backgroundColor: '#fff', color: '#000' }}>
                                                <ol style={{ color: '#666666', fontSize: '12px' }}>
                                                    <li style={{ marginBottom: '10px' }}><span style={{ marginRight: '10px', backgroundColor: '#f1f1f1', padding: '2px 10px' }}><b>自定义模板</b></span>用户创建的模板仅自己可见，管理员可见所有模板。基于管理员创建的企业级模板进行配置（企业级模板由管理员在【导入导出模板】菜单创建管理）。
                                                    </li>
                                                </ol>
                                            </div>
                                        }
                                        color='white'
                                        placement='left'
                                        overlayInnerStyle={{ width: '200px' }}
                                    >
                                        <i className='iconfont icon-bangzhutishi' style={{ cursor: 'pointer' }}></i>
                                    </Tooltip>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='nc-bill-table-area'>
                        <Table<ImportTemplateItem>
                            columns={columnsType}
                            rowSelection={{ ...rowSelection }}
                            rowKey={(record) => record.TemplateCode}
                            dataSource={importTemplateList}
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
                            showSorterTooltip={false}
                        />
                    </div>
                </div>
            </Modal>
        </>
    )
}
export default ModelExcelImportTemplateUpdate;