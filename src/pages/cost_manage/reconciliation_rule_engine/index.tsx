import '@/pages/page_list.less';
import React, { useState, useEffect } from 'react';
import { Table, Button, Dropdown, Space, Modal, Row, Input, Col, Select, Progress, message } from 'antd';
import type { MenuProps, TableProps } from 'antd';
import { ReconciliationMatchFieldsItemProps,ReconciliationCompareFieldsItemProps,ReconciliationRuleEngineItemProps } from '@/types/fee_reconciliation/reconciliation_rule_engine';
import { requestWithProgress } from "@/api/request";
import { RedoOutlined, DownOutlined, HourglassOutlined } from '@ant-design/icons';
import CustomIcon from "@/components/custom-icon";
import i18n from '@/i18n';
import LocaleHelper from '@/utils/localeHelper';
import { getCompareFieldsColumns,getMatchFieldsColumns,getRuleEngineColumns } from './columns';
import CodeBoxMeta from '@/components/code-box-meta';
import { getReconciliationRuleEngineList } from '@/api/fee_manage/fee_reconciliation_service';
type TableRowSelection<T extends object = object> = TableProps<T>['rowSelection'];
const ReconciliationRuleEngine: React.FC = () => {
    // 数据
    const [reconciliationRuleEngineList, setReconciliationRuleEngineList] = useState([] as ReconciliationRuleEngineItemProps[]);
    const [editingKey, setEditingKey] = useState('');
    // 获取计费标准数据
    useEffect(() => {
        const getData = async () => {
            const chargingStandardData = await getReconciliationRuleEngineList();
            // 设置计费标准台账数据
            setReconciliationRuleEngineList([...chargingStandardData]);
        };
        getData();
    }, []);

    const handleDelete = (record: ReconciliationRuleEngineItemProps) => {
        const newData = reconciliationRuleEngineList.filter(item => item.RowKey !== record.RowKey);
        setReconciliationRuleEngineList(newData);
    };
    const handleEdit = (record: ReconciliationRuleEngineItemProps) => {
        setEditingKey(record.RowKey?.toString() || '');
    };
    const handleSave = async (record: ReconciliationRuleEngineItemProps) => {
        try {
            // TODO: 调用保存API
            const newData = [...reconciliationRuleEngineList];
            const index = newData.findIndex(item => record.RowKey === item.RowKey);
            if (index > -1) {
                const item = newData[index];
                newData.splice(index, 1, {
                    ...item,
                    ...record,
                });
            } else {
                newData.push(record);
            }
            setReconciliationRuleEngineList(newData);
            setEditingKey('');
            message.success('保存成功');
        } catch (error) {
            console.error('Save failed:', error);
            message.error('保存失败');
        }
    };
    const handleCancel = () => {
        setEditingKey('');
    };
    const handleAdd = () => {
        if (editingKey !== '') {
            message.warning('请先完成当前编辑');
            return;
        }
        const newId = Date.now().toString();
        const newRow: ReconciliationRuleEngineItemProps = {
            CompanyName: '',
            ReconciliationRuleName: '',
            RowKey: newId,
        };
        setReconciliationRuleEngineList([...reconciliationRuleEngineList, newRow]);
        setEditingKey(newId);
    };

    const columnsType = getRuleEngineColumns(handleEdit, handleDelete, handleSave, handleCancel, editingKey);

    //表格选中和取消时触发的函数
    const rowSelection: TableRowSelection<ReconciliationRuleEngineItemProps> = {
        onSelect: (record, selected, selectedRows) => {
            console.log('onselect');
            console.log(record, selected, selectedRows);
        },
        type: 'radio',
        columnWidth: '20px',
    };

    return (
        <div style={{ overflowY: 'auto', overflowX: 'hidden', height: 'calc(100vh - 80px)' }}>

            <div className="nc-bill-header-area">
                <div className="header-title-search-area">
                    <div className="BillHeadInfoWrap BillHeadInfoWrap-showBackBtn">
                        <span className="bill-info-title" style={{ marginLeft: "10px" }}>
                            <CustomIcon type="icon-Currency" style={{ color: 'red', fontSize: '24px' }} /> 对账规则引擎配置
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
                <Row gutter={24} style={{ paddingRight: '6px' }} className='ant-tranfer-row'>
                    <Col span={12} className='ant-tranfer-col-left' style={{ borderRight: '1px solid #e8e8e8', height: 'calc(100vh - 125px)' }}>
                        <CodeBoxMeta title="基本用法">
                            <div className='nc-bill-table-area'>
                                <div style={{ textAlign: 'left', margin: '6px 4px' }}>
                                    <div className="u-button-group">
                                        <Button type='primary' onClick={handleAdd}>新增</Button>
                                    </div>
                                </div>

                                <Table<ReconciliationRuleEngineItemProps>
                                    columns={columnsType}
                                    rowSelection={{ ...rowSelection }}
                                    rowKey={(record) => `${record.RowKey}`}
                                    showSorterTooltip={false}
                                    dataSource={reconciliationRuleEngineList}
                                    pagination={false}
                                    scroll={{ x: 'max-content', y: 'calc(100vh - 280px)' }}
                                    footer={() => ''}
                                    bordered={true}
                                />
                            </div>
                        </CodeBoxMeta>
                    </Col>
                    {/* <Col span={12}>
                        <Row gutter={24} style={{ paddingRight: '6px' }} className='ant-tranfer-row'>
                            <Col span={24}>
                                <CodeBoxMeta title="基本用法">
                                    <div style={{ textAlign: 'left', margin: '6px 4px' }}>
                                        <div className="u-button-group">
                                            <Button type='primary' onClick={handleAdd}>新增</Button>
                                        </div>
                                    </div>
                                    <div className='nc-bill-table-area'>
                                        <Table<ReconciliationRuleEngineItemProps>
                                            columns={columnsType}
                                            rowSelection={{ ...rowSelection }}
                                            rowKey={(record) => `${record.CompanyName}`}
                                            showSorterTooltip={false}
                                            title={() => title}
                                            dataSource={chargingStandardList}
                                            pagination={false}
                                            scroll={{ x: 'max-content', y: 'calc(100vh/2-100px)' }}
                                            footer={() => ''}
                                            bordered={true}
                                        />
                                    </div>
                                </CodeBoxMeta>
                            </Col>
                        </Row>
                        <Row gutter={24} style={{ paddingRight: '6px' }} className='ant-tranfer-row'>
                            <Col span={24}>
                                <CodeBoxMeta title="基本用法">
                                    <div style={{ textAlign: 'left', margin: '6px 4px' }}>
                                        <div className="u-button-group">
                                            <Button type='primary' onClick={handleAdd}>新增</Button>
                                        </div>
                                    </div>
                                    <div className='nc-bill-table-area'>
                                        <Table<ReconciliationRuleEngineItemProps>
                                            columns={columnsType}
                                            rowSelection={{ ...rowSelection }}
                                            rowKey={(record) => `${record.CompanyName}`}
                                            showSorterTooltip={false}
                                            title={() => title}
                                            dataSource={chargingStandardList}
                                            pagination={false}
                                            scroll={{ x: 'max-content', y: 'calc(100vh/2-100px)' }}
                                            footer={() => ''}
                                            bordered={true}
                                        />
                                    </div>
                                </CodeBoxMeta>
                            </Col>
                        </Row>
                    </Col> */}
                </Row>
            </div>

        </div>
    )
}
export default ReconciliationRuleEngine;