import React, { useEffect, useRef, useState } from 'react';
import { Form, Input, InputNumber, Select, Button, Space, DatePicker, Radio, Col, Row, Table, Modal, Checkbox } from 'antd';
import { ContractsCompareFieldsItemProps, ContractsRuleEngineItemProps } from "@/types/dynamic_onfiguration_platform/basic_manage/contracts_manage";
import dayjs from 'dayjs';
import TextArea from 'antd/es/input/TextArea';
import CodeBoxMeta from '@/components/code-box-meta';
import CustomIcon from '@/components/custom-icon';
import { TableRowSelection } from 'antd/es/table/interface';
import { useTableOperations } from '@/hooks/useTableOperations';
import { getCompareFieldsColumns, getRuleEngineColumns } from './columns';
import { getContractsCompareFieldsList, getContractsRuleEngineList } from '@/api/dynamic_onfiguration_platform/basic_manage/contracts_manage_service';

interface DetailModalProps {
    open: boolean;
    modalFlag: 'add' | 'edit';
    saving: boolean;
    onCancel: () => void;
    onOk: (values: any) => void;
}

const formItemLayout = {
    labelCol: {
        xs: { span: 24 },
        sm: { span: 6 },
    },
    wrapperCol: {
        xs: { span: 24 },
        sm: { span: 14 },
    },
};

const DetailSetModal: React.FC<DetailModalProps> = ({
    open,
    modalFlag,
    saving,
    onCancel,
    onOk,
}) => {
    // 数据
    const [contractsRuleEngineList, setContractsRuleEngineList] = useState([] as ContractsRuleEngineItemProps[]);
    const [contractsCompareFieldsList, setContractsCompareFieldsList] = useState([] as ContractsCompareFieldsItemProps[]);
    // 获取计费标准数据
    useEffect(() => {
        const getData = async () => {
            const contractsRuleEngineList = await getContractsRuleEngineList();
            setContractsRuleEngineList([...contractsRuleEngineList]);

            const contractsCompareFieldsList = await getContractsCompareFieldsList();
            setContractsCompareFieldsList([...contractsCompareFieldsList]);
        };
        getData();
    }, []);

    // 使用自定义Hook处理规则引擎表格操作
    const ruleEngineOperations = useTableOperations({
        dataList: contractsRuleEngineList,
        setDataList: setContractsRuleEngineList,
        createNewRow: () => ({
            SeqNo: Date.now().toString(),
            ReconciliationRuleName: '',
            MatchFieldRelation: '',
        } as ContractsRuleEngineItemProps)
    });

    // 使用自定义Hook处理对比字段表格操作
    const compareFieldsOperations = useTableOperations({
        dataList: contractsCompareFieldsList,
        setDataList: setContractsCompareFieldsList,
        createNewRow: () => ({
            SeqNo: Date.now().toString(),
            CompareFieldsName: '',
            CompareFieldRelation: '',
            CompareFieldValue: '',
        } as ContractsCompareFieldsItemProps)
    });

    const columnsType = getRuleEngineColumns(
        ruleEngineOperations.handleEdit,
        ruleEngineOperations.handleDelete,
        ruleEngineOperations.handleSave,
        ruleEngineOperations.handleCancel,
        ruleEngineOperations.editingKey
    );
    const columnsCompareFieldsType = getCompareFieldsColumns(
        compareFieldsOperations.handleEdit,
        compareFieldsOperations.handleDelete,
        compareFieldsOperations.handleSave,
        compareFieldsOperations.handleCancel,
        compareFieldsOperations.editingKey
    );
    //表格选中和取消时触发的函数
    const rowSelection: TableRowSelection<ContractsRuleEngineItemProps> = {
        onSelect: (record, selected, selectedRows) => {
            console.log('onselect');
            console.log(record, selected, selectedRows);
        },
        type: 'radio',
        columnWidth: '20px',
    };

    //表格选中和取消时触发的函数
    const rowCompareSelection: TableRowSelection<ContractsCompareFieldsItemProps> = {
        onSelect: (record, selected, selectedRows) => {
            console.log('onselect');
            console.log(record, selected, selectedRows);
        },
        type: 'radio',
        columnWidth: '20px',
    };

    return (
        <Modal
            open={open}
            title={'合同配置'}
            onCancel={onCancel}
            destroyOnClose={true}
            maskClosable={false}
            closable={!saving}
            width={'85%'}
            footer={null}
        >

            <div className="nc-bill-header-area">
                <div className="header-title-search-area">
                    <div className="BillHeadInfoWrap BillHeadInfoWrap-showBackBtn">
                        <span className="bill-info-title" style={{ marginLeft: "10px" }}>
                            <CustomIcon type="icon-Currency" style={{ color: 'red', fontSize: '24px' }} /> 合同规则
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
            <div className='nc-bill-table-area' style={{ overflowY: 'auto', overflowX: 'hidden', height: 'calc(100vh - 480px)' }}>
                <Row gutter={24} style={{ paddingRight: '6px' }} className='ant-tranfer-row'>
                    <Col span={8} className='ant-tranfer-col-left' style={{ borderRight: '1px solid #e8e8e8' }}>
                        <CodeBoxMeta title="合同规则">
                            <div className='nc-bill-table-area'>
                                <div style={{ textAlign: 'left', margin: '6px 4px' }}>
                                    <div className="u-button-group">
                                        <Button type='primary' size='small' onClick={ruleEngineOperations.handleAdd}>新增</Button>
                                    </div>
                                </div>

                                <Table<ContractsRuleEngineItemProps>
                                    columns={columnsType}
                                    rowSelection={{ ...rowSelection }}
                                    rowKey={(record) => `${record.SeqNo}`}
                                    showSorterTooltip={false}
                                    dataSource={contractsRuleEngineList}
                                    pagination={false}
                                    scroll={{ x: 'max-content', y: '150px' }}
                                    footer={() => ''}
                                    bordered={true}
                                />
                            </div>
                        </CodeBoxMeta>
                    </Col>
                    <Col span={16}>
                        <Row gutter={24} style={{ paddingRight: '6px' }} className='ant-tranfer-row'>
                            <Col span={24}>
                                <CodeBoxMeta title="对比字段设置">
                                    <div style={{ textAlign: 'left', margin: '6px 4px' }}>
                                        <div className="u-button-group">
                                            <Button type='primary' size='small' onClick={compareFieldsOperations.handleAdd}>新增</Button>
                                        </div>
                                    </div>
                                    <div className='nc-bill-table-area'>
                                        <Table<ContractsCompareFieldsItemProps>
                                            columns={columnsCompareFieldsType}
                                            rowSelection={{ ...rowCompareSelection }}
                                            rowKey={(record) => `${record.SeqNo}`}
                                            showSorterTooltip={false}
                                            dataSource={contractsCompareFieldsList}
                                            pagination={false}
                                            scroll={{ x: 'max-content', y: '150px' }}
                                            footer={() => ''}
                                            bordered={true}
                                        />
                                    </div>
                                </CodeBoxMeta>
                            </Col>
                        </Row>
                    </Col>
                </Row>
                <Row gutter={24} style={{ paddingRight: '6px' }} className='ant-tranfer-row'>
                    <Col span={24} className='ant-tranfer-col-left' style={{ borderRight: '1px solid #e8e8e8' }}>
                        <CodeBoxMeta title="合同预警">
                            <div className='nc-bill-table-area'>
                                <Row gutter={24} style={{}}>
                                    <Col span={24}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                            <label className='item-lable-title'>距到期日期剩余</label>
                                            <InputNumber defaultValue={30} />天提醒
                                        </div>
                                    </Col>
                                </Row>
                                <Row gutter={24} style={{}}>
                                    <Col span={24}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                            <label className='item-lable-title'>提醒用户</label>
                                            <Checkbox.Group
                                                name="contractAgreementCheckbox"
                                                style={{ flex: 1 }}
                                                defaultValue={[1,2,3,4]}
                                                options={[
                                                    { value: 1, label: '客户合同' },
                                                    { value: 2, label: '供应商合同' },
                                                    { value: 3, label: '海外代理合同' },
                                                    { value: 4, label: '其他合同' },
                                                ]}
                                            />
                                        </div>
                                    </Col>
                                </Row>
                                <Row gutter={24} style={{}}>
                                    <Col span={24}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                            <label className='item-lable-title'>通知方式</label>
                                            <Checkbox.Group
                                                name="noticeTypeCheckbox"
                                                style={{ flex: 1 }}
                                                defaultValue={[2]}
                                                options={[
                                                    { value: 1, label: '铃铛' },
                                                    { value: 2, label: '邮件' },
                                                ]}
                                            />
                                        </div>
                                    </Col>
                                </Row>
                                <Row gutter={24} style={{}}>
                                    <Col span={24}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: 8,color: 'red' }}>
                                            注：提醒方式为"系统提醒",系统会在到期前2日再提醒
                                        </div>
                                    </Col>
                                </Row>
                                <Row gutter={24} style={{}}>
                                    <Col span={24}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                        <label className='item-lable-title'>禁止创建业务配置</label>
                                            <Checkbox.Group
                                                name="businessDisabledCheckbox"
                                                style={{ flex: 1 }}
                                                defaultValue={[1]}
                                                options={[
                                                    { value: 1, label: '合同到期后将不能再创建业务' },
                                                ]}
                                            />
                                        </div>
                                    </Col>
                                </Row>
                            </div>
                        </CodeBoxMeta>
                    </Col>
                </Row>
            </div>

            <div style={{ textAlign: 'right', marginTop: 8 }}>
                <Space>
                    <Button onClick={onCancel} disabled={saving}>取消</Button>
                    <Button type="primary" onClick={onOk} danger>确定</Button>
                </Space>
            </div>
        </Modal>

    )
};

export default DetailSetModal;