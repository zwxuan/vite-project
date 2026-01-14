import '@/pages/page_list.less';
import React, { useState, useEffect } from 'react';
import { Table, Button, Dropdown, Space, Modal, Row, Input, Col, Select, Progress, message } from 'antd';
import type { MenuProps, TableProps } from 'antd';
import { ReconciliationMatchFieldsItemProps, ReconciliationCompareFieldsItemProps, ReconciliationRuleEngineItemProps } from '@/types/settlement_center/cost_manage/reconciliation_rule_engine';
import { requestWithProgress } from "@/api/request";
import { RedoOutlined, DownOutlined, HourglassOutlined } from '@ant-design/icons';
import CustomIcon from "@/components/custom-icon";
import { getKpiDefinitionColumns, getPartnerPerformanceRuleColumns, getRuleKpiItemColumns } from './columns';
import CodeBoxMeta from '@/components/code-box-meta';
import { getKpiDefinitionList, getPartnerPerformanceRuleList, getRuleKpiItemList } from '@/api/dynamic_configuration_platform/basic_manage/partner_performance_rule_service';
import { useTableOperations } from './hooks/useTableOperations';
import { PartnerPerformanceRuleItemProps } from '@/types/dynamic_configuration_platform/basic_manage/partner_performance_rule';
import { KpiDefinitionItemProps } from '@/types/dynamic_configuration_platform/basic_manage/kpi_definition';
import { RuleKpiItemItemProps } from '@/types/dynamic_configuration_platform/basic_manage/rule_kpi_item';
import RuleKpiItemModal from './rule_kpi_item_modal';
type TableRowSelection<T extends object = object> = TableProps<T>['rowSelection'];
const PartnerPerformance: React.FC = () => {
    // 数据
    const [partnerPerformanceRuleList, setPartnerPerformanceRuleList] = useState([] as PartnerPerformanceRuleItemProps[]);
    const [kpiDefinitionList, setKpiDefinitionList] = useState([] as KpiDefinitionItemProps[]);
    const [ruleKpiItemList, setRuleKpiItemList] = useState([] as RuleKpiItemItemProps[]);
    const [pageSize, setPageSize] = useState(50);
    const [open, setOpen] = useState(false);
    const [modalFlag, setModalFlag] = useState<'add' | 'edit'>('add');
    const [saving, setSaving] = useState(false);
    // 获取计费标准数据
    useEffect(() => {
        const getData = async () => {
            const partnerPerformanceRuleData = await getPartnerPerformanceRuleList();
            setPartnerPerformanceRuleList([...partnerPerformanceRuleData]);


            const kpiDefinitionData = await getKpiDefinitionList();
            setKpiDefinitionList([...kpiDefinitionData]);

            const ruleKpiItemData = await getRuleKpiItemList();
            setRuleKpiItemList([...ruleKpiItemData]);
        };
        getData();
    }, []);

    // 使用自定义Hook处理规则引擎表格操作
    const newPartnerRowId = Date.now().toString();
    const partnerPerformanceRuleOperations = useTableOperations({
        dataList: partnerPerformanceRuleList,
        setDataList: setPartnerPerformanceRuleList,
        createNewRow: () => ({
            RowKey: newPartnerRowId,
            RuleId: '',
            RuleName: '',
            PartnerType: '',
            EffectiveDate: '',
            ExpireDate: '',
            IsActive: '',
            CreatedBy: '',
            CreatedAt: '',
        } as PartnerPerformanceRuleItemProps)
    });

    // 使用自定义Hook处理匹配字段表格操作
    const newKpiDefinitionRowId = Date.now().toString();
    const kpiDefinitionOperations = useTableOperations({
        dataList: kpiDefinitionList,
        setDataList: setKpiDefinitionList,
        createNewRow: () => ({
            RowKey: newKpiDefinitionRowId,
            KpiId: '',
            KpiName: '',
            KpiCode: '',
            Description: '',
            DataType: 'string',
            IsCritical: '0',
        } as KpiDefinitionItemProps)
    });

    // 使用自定义Hook处理对比字段表格操作
    const columnsPartnerPerformanceRuleType = getPartnerPerformanceRuleColumns(
        partnerPerformanceRuleOperations.handleEdit,
        partnerPerformanceRuleOperations.handleDelete,
        partnerPerformanceRuleOperations.handleSave,
        partnerPerformanceRuleOperations.handleCancel,
        partnerPerformanceRuleOperations.editingKey
    );

    const columnsKpiDefinitionType = getKpiDefinitionColumns(
        kpiDefinitionOperations.handleEdit,
        kpiDefinitionOperations.handleDelete,
        kpiDefinitionOperations.handleSave,
        kpiDefinitionOperations.handleCancel,
        kpiDefinitionOperations.editingKey
    );
    //表格选中和取消时触发的函数
    const rowPartnerPermanceRuleSelection: TableRowSelection<PartnerPerformanceRuleItemProps> = {
        onSelect: (record, selected, selectedRows) => {
            console.log('onselect');
            console.log(record, selected, selectedRows);
        },
        type: 'radio',
        columnWidth: '20px',
    };

    //表格选中和取消时触发的函数
    const rowKpiDefitionSelection: TableRowSelection<KpiDefinitionItemProps> = {
        onSelect: (record, selected, selectedRows) => {
            console.log('onselect');
            console.log(record, selected, selectedRows);
        },
        type: 'radio',
        columnWidth: '20px',
    };

    //表格选中和取消时触发的函数
    const rowRuleKpiItemSelection: TableRowSelection<RuleKpiItemItemProps> = {

        onSelect: (record, selected, selectedRows) => {
            console.log('onselect');
            console.log(record, selected, selectedRows);
        },
        type: 'radio',
        columnWidth: '20px',
    };

    const initFormData = {} as RuleKpiItemItemProps;
    const [formData, setFormData] = useState<RuleKpiItemItemProps>(initFormData);

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


    const handleCancel = () => {
        if (!saving) {
            setFormData(initFormData);
            setOpen(false);
        }
    };
    const showModal = () => {
        setOpen(true);
    };

    const handleAdd = () => {
        setModalFlag('add');
        setFormData(initFormData);
        showModal();
    };
    const handleDelete = (record: RuleKpiItemItemProps) => {
        alert(record);
    };
    const handleEdit = (record: RuleKpiItemItemProps) => {
        const newData = ruleKpiItemList.filter((item) => `${item.ItemId}` === `${record.ItemId}`);
        setFormData(newData[0]);
        setModalFlag('edit');
        showModal();
    };

    const columnsType = getRuleKpiItemColumns(handleEdit, handleDelete);

    return (
        <div style={{ overflowY: 'auto', overflowX: 'hidden', height: 'calc(100vh - 80px)', background: '#f9fbff'  }}>

            <div className="nc-bill-header-area">
                <div className="header-title-search-area">
                    <div className="BillHeadInfoWrap BillHeadInfoWrap-showBackBtn">
                        <span className="bill-info-title" style={{ marginLeft: "10px" }}>
                            <CustomIcon type="icon-Currency" style={{ color: 'red', fontSize: '24px' }} /> 绩效规则配置
                            <a href='/remark.html' target='_blank'><i className='iconfont icon-bangzhutishi' style={{ cursor: 'pointer', marginLeft: '10px' }}></i></a>
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
                    <Col span={12} className='ant-tranfer-col-left'>
                        <CodeBoxMeta title="绩效规则">
                            <div className='nc-bill-table-area' style={{ height: '300px' }}>
                                <div style={{ textAlign: 'left', margin: '6px 4px' }}>
                                    <div className="u-button-group">
                                        <Button type='primary' size='small' onClick={partnerPerformanceRuleOperations.handleAdd}>新增</Button>
                                    </div>
                                </div>

                                <Table<PartnerPerformanceRuleItemProps>
                                    columns={columnsPartnerPerformanceRuleType}
                                    rowSelection={{ ...rowPartnerPermanceRuleSelection }}
                                    rowKey={(record) => `${record.RowKey}`}
                                    showSorterTooltip={false}
                                    dataSource={partnerPerformanceRuleList}
                                    pagination={false}
                                    scroll={{ x: 'max-content', y: '260px' }}
                                    footer={() => ''}
                                    bordered={true}
                                />
                            </div>
                        </CodeBoxMeta>
                    </Col>
                    <Col span={12}>
                        <CodeBoxMeta title="KPI定义">
                            <div className='nc-bill-table-area' style={{ height: '300px' }}>
                                <div style={{ textAlign: 'left', margin: '6px 4px' }}>
                                    <div className="u-button-group">
                                        <Button type='primary' size='small' onClick={kpiDefinitionOperations.handleAdd}>新增</Button>
                                    </div>
                                </div>
                                <div className='nc-bill-table-area'>
                                    <Table<KpiDefinitionItemProps>
                                        columns={columnsKpiDefinitionType}
                                        rowSelection={{ ...rowKpiDefitionSelection }}
                                        rowKey={(record) => `${record.RowKey}`}
                                        showSorterTooltip={false}
                                        dataSource={kpiDefinitionList}
                                        pagination={false}
                                        scroll={{ x: 'max-content', y: '260px' }}
                                        footer={() => ''}
                                        bordered={true}
                                    />
                                </div>
                            </div>

                        </CodeBoxMeta>
                    </Col>
                </Row>
                <RuleKpiItemModal
                    open={open}
                    modalFlag={modalFlag}
                    saving={saving}
                    formData={formData}
                    onCancel={handleCancel}
                    onOk={() => { }}
                    onChange={handleChange}
                    onDateChange={handleDateChange}
                    onNumberChange={handleNumberChange}
                />
                <Row gutter={24} style={{ paddingRight: '6px' }} className='ant-tranfer-row'>
                    <Col span={24}>
                        <CodeBoxMeta title="规则KPI关系">
                            <div style={{ textAlign: 'left', margin: '6px 4px' }}>
                                <div className="u-button-group">
                                    <Button type='primary' size='small' onClick={handleAdd}>新增</Button>
                                </div>
                            </div>
                            <div className='nc-bill-table-area'>
                                <Table<RuleKpiItemItemProps>
                                    columns={columnsType}
                                    rowSelection={{ ...rowRuleKpiItemSelection }}
                                    rowKey={(record) => `${record.ItemId}`}
                                    showSorterTooltip={false}
                                    dataSource={ruleKpiItemList}
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
                        </CodeBoxMeta>
                    </Col>
                </Row>
            </div>

        </div>
    )
}
export default PartnerPerformance;