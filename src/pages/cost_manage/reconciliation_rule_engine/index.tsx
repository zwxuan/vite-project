import '@/pages/page_list.less';
import React, { useState, useEffect } from 'react';
import { Table, Button, Dropdown, Space, Modal, Row, Input, Col, Select, Progress, message } from 'antd';
import type { MenuProps, TableProps } from 'antd';
import { ReconciliationMatchFieldsItemProps,ReconciliationCompareFieldsItemProps,ReconciliationRuleEngineItemProps } from '@/types/cost_manage/fee_reconciliation/reconciliation_rule_engine';
import { requestWithProgress } from "@/api/request";
import { RedoOutlined, DownOutlined, HourglassOutlined } from '@ant-design/icons';
import CustomIcon from "@/components/custom-icon";
import i18n from '@/i18n';
import LocaleHelper from '@/utils/localeHelper';
import { getCompareFieldsColumns,getMatchFieldsColumns,getRuleEngineColumns } from './columns';
import CodeBoxMeta from '@/components/code-box-meta';
import { getReconciliationRuleEngineList,getCompareFieldsList,getMatchFieldsList } from '@/api/cost_manage/fee_reconciliation_service';
import { useTableOperations } from './hooks/useTableOperations';
type TableRowSelection<T extends object = object> = TableProps<T>['rowSelection'];
const ReconciliationRuleEngine: React.FC = () => {
    // 数据
    const [reconciliationRuleEngineList, setReconciliationRuleEngineList] = useState([] as ReconciliationRuleEngineItemProps[]);
    const [reconciliationMatchFieldsList, setReconciliationMatchFieldsList] = useState([] as ReconciliationMatchFieldsItemProps[]);
    const [reconciliationCompareFieldsList, setReconciliationCompareFieldsList] = useState([] as ReconciliationCompareFieldsItemProps[]);
    // 获取计费标准数据
    useEffect(() => {
        const getData = async () => {
            const chargingStandardData = await getReconciliationRuleEngineList();
            setReconciliationRuleEngineList([...chargingStandardData]);

            const reconciliationMatchFieldsList = await getMatchFieldsList();
            setReconciliationMatchFieldsList([...reconciliationMatchFieldsList]);

            const reconciliationCompareFieldsList = await getCompareFieldsList();
            setReconciliationCompareFieldsList([...reconciliationCompareFieldsList]);
        };
        getData();
    }, []);

    // 使用自定义Hook处理规则引擎表格操作
    const ruleEngineOperations = useTableOperations({
        dataList: reconciliationRuleEngineList,
        setDataList: setReconciliationRuleEngineList,
        createNewRow: () => ({
            CompanyName: '',
            ReconciliationRuleName: '',
        } as ReconciliationRuleEngineItemProps)
    });

    // 使用自定义Hook处理匹配字段表格操作
    const matchFieldsOperations = useTableOperations({
        dataList: reconciliationMatchFieldsList,
        setDataList: setReconciliationMatchFieldsList,
        createNewRow: () => ({
            MatchFieldsName: '',
            MatchFieldRelation: '',
            MatchFieldOrderBy: '',
        } as ReconciliationMatchFieldsItemProps)
    });

    // 使用自定义Hook处理对比字段表格操作
    const compareFieldsOperations = useTableOperations({
        dataList: reconciliationCompareFieldsList,
        setDataList: setReconciliationCompareFieldsList,
        createNewRow: () => ({
            CompareFieldsName: '',
            CompareFieldRelation: '',
            CompareFieldOperator: '',
            CompareFieldOrderBy: '',
        } as ReconciliationCompareFieldsItemProps)
    });

    const columnsType = getRuleEngineColumns(
        ruleEngineOperations.handleEdit,
        ruleEngineOperations.handleDelete,
        ruleEngineOperations.handleSave,
        ruleEngineOperations.handleCancel,
        ruleEngineOperations.editingKey
    );

    const columnsMatchFieldsType = getMatchFieldsColumns(
        matchFieldsOperations.handleEdit,
        matchFieldsOperations.handleDelete,
        matchFieldsOperations.handleSave,
        matchFieldsOperations.handleCancel,
        matchFieldsOperations.editingKey
    );
    const columnsCompareFieldsType = getCompareFieldsColumns(
        compareFieldsOperations.handleEdit,
        compareFieldsOperations.handleDelete,
        compareFieldsOperations.handleSave,
        compareFieldsOperations.handleCancel,
        compareFieldsOperations.editingKey
    );
    //表格选中和取消时触发的函数
    const rowSelection: TableRowSelection<ReconciliationRuleEngineItemProps> = {
        onSelect: (record, selected, selectedRows) => {
            console.log('onselect');
            console.log(record, selected, selectedRows);
        },
        type: 'radio',
        columnWidth: '20px',
    };

    //表格选中和取消时触发的函数
    const rowMatchSelection: TableRowSelection<ReconciliationMatchFieldsItemProps> = {
        onSelect: (record, selected, selectedRows) => {
            console.log('onselect');
            console.log(record, selected, selectedRows);
        },
        type: 'radio',
        columnWidth: '20px',
    };

    //表格选中和取消时触发的函数
    const rowCompareSelection: TableRowSelection<ReconciliationCompareFieldsItemProps> = {
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
                    </div>
                </div>
            </div>
            <div className='nc-bill-table-area'>
                <Row gutter={24} style={{ paddingRight: '6px' }} className='ant-tranfer-row'>
                    <Col span={12} className='ant-tranfer-col-left' style={{ borderRight: '1px solid #e8e8e8', height: 'calc(100vh - 125px)' }}>
                        <CodeBoxMeta title="对账规则">
                            <div className='nc-bill-table-area'>
                                <div style={{ textAlign: 'left', margin: '6px 4px' }}>
                                    <div className="u-button-group">
                                        <Button type='primary' size='small' onClick={ruleEngineOperations.handleAdd}>新增</Button>
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
                    <Col span={12}>
                        <Row gutter={24} style={{ paddingRight: '6px' }} className='ant-tranfer-row'>
                            <Col span={24}>
                                <CodeBoxMeta title="匹配字段设置">
                                    <div style={{ textAlign: 'left', margin: '6px 4px' }}>
                                        <div className="u-button-group">
                                            <Button type='primary' size='small' onClick={matchFieldsOperations.handleAdd}>新增</Button>
                                        </div>
                                    </div>
                                    <div className='nc-bill-table-area'>
                                        <Table<ReconciliationMatchFieldsItemProps>
                                            columns={columnsMatchFieldsType}
                                            rowSelection={{ ...rowMatchSelection }}
                                            rowKey={(record) => `${record.RowKey}`}
                                            showSorterTooltip={false}
                                            dataSource={reconciliationMatchFieldsList}
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
                                <CodeBoxMeta title="对比字段设置">
                                    <div style={{ textAlign: 'left', margin: '6px 4px' }}>
                                        <div className="u-button-group">
                                            <Button type='primary' size='small' onClick={compareFieldsOperations.handleAdd}>新增</Button>
                                        </div>
                                    </div>
                                    <div className='nc-bill-table-area'>
                                        <Table<ReconciliationCompareFieldsItemProps>
                                            columns={columnsCompareFieldsType}
                                            rowSelection={{ ...rowCompareSelection }}
                                            rowKey={(record) => `${record.RowKey}`}
                                            showSorterTooltip={false}
                                            dataSource={reconciliationCompareFieldsList}
                                            pagination={false}
                                            scroll={{ x: 'max-content', y: 'calc(100vh/2-100px)' }}
                                            footer={() => ''}
                                            bordered={true}
                                        />
                                    </div>
                                </CodeBoxMeta>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </div>

        </div>
    )
}
export default ReconciliationRuleEngine;