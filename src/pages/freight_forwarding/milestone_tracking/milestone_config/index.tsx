import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Button, Checkbox, Col, Descriptions, Form, Input, InputNumber, Modal, Radio, Row, Space, Table } from 'antd';
import CustomIcon from '@/components/custom-icon';
import AdvancedSearchForm from '@/components/search-form';
import { getMilestoneConfigList } from '@/api/freight_forwarding/milestone_tracking/service';
import { MilestoneConfigItem } from '@/types/freight_forwarding/milestone_tracking';
import LocaleHelper from '@/utils/locale';
import i18n from '@/i18n';
import { searchFields } from './search_fields';
import { getColumns } from './columns';
import '@/pages/page_list.less';

const MilestoneConfig: React.FC = () => {
    const [data, setData] = useState<MilestoneConfigItem[]>([]);
    const [loading, setLoading] = useState(false);
    const [activeRecord, setActiveRecord] = useState<MilestoneConfigItem | null>(null);
    const [detailVisible, setDetailVisible] = useState(false);
    const [editVisible, setEditVisible] = useState(false);
    const [editMode, setEditMode] = useState<'add' | 'edit' | 'copy'>('add');
    const [form] = Form.useForm();

    const fetchData = async () => {
        setLoading(true);
        try {
            const result = await getMilestoneConfigList();
            setData(result);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const mapRecordToForm = useCallback((record: MilestoneConfigItem) => {
        const trigger = record.triggerCondition;
        let triggerMethod = '自动触发';
        if (trigger.includes('手动')) triggerMethod = '手动录入';
        if (trigger.includes('EDI')) triggerMethod = 'EDI接收';
        if (trigger.includes('API')) triggerMethod = 'API推送';
        return {
            milestoneName: record.milestoneName,
            sequence: record.sequence,
            triggerMethod,
            notificationSettings: record.notificationSettings,
            delayThreshold: record.delayThreshold ?? 2,
            alertEnabled: true,
        };
    }, []);

    const handleSearch = (values: any) => {
        console.log('Search:', values);
        fetchData();
    };

    const handleEdit = (record: MilestoneConfigItem) => {
        setEditMode('edit');
        setActiveRecord(record);
        form.setFieldsValue(mapRecordToForm(record));
        setEditVisible(true);
    };

    const handleNew = () => {
        setEditMode('add');
        setActiveRecord(null);
        form.resetFields();
        form.setFieldsValue({
            triggerMethod: '自动触发',
            notificationSettings: ['客户通知', '内部通知'],
            delayThreshold: 2,
            alertEnabled: true,
        });
        setEditVisible(true);
    };

    const handleCopy = (record: MilestoneConfigItem) => {
        setEditMode('copy');
        setActiveRecord(record);
        form.setFieldsValue(mapRecordToForm(record));
        setEditVisible(true);
    };

    const handleToggle = (record: MilestoneConfigItem) => {
        setData(prev => prev.map(item => item.id === record.id ? { ...item, status: !item.status } : item));
    };

    const handleRowClick = (record: MilestoneConfigItem) => {
        setActiveRecord(record);
        setDetailVisible(true);
    };

    const handleSave = (values: any) => {
        if (editMode === 'add' || editMode === 'copy') {
            const newItem: MilestoneConfigItem = {
                id: `${Date.now()}`,
                milestoneName: values.milestoneName,
                triggerCondition: values.triggerMethod,
                notificationSettings: values.notificationSettings || [],
                status: true,
                sequence: values.sequence,
                delayThreshold: values.delayThreshold,
            };
            setData(prev => [newItem, ...prev]);
        }
        if (editMode === 'edit' && activeRecord) {
            setData(prev => prev.map(item => item.id === activeRecord.id ? {
                ...item,
                milestoneName: values.milestoneName,
                triggerCondition: values.triggerMethod,
                notificationSettings: values.notificationSettings || [],
                sequence: values.sequence,
                delayThreshold: values.delayThreshold,
            } : item));
        }
        setEditVisible(false);
    };

    const handleReset = () => {
        form.resetFields();
    };

    const handleDelete = () => {
        if (!activeRecord) return;
        setData(prev => prev.filter(item => item.id !== activeRecord.id));
        setActiveRecord(null);
        setEditVisible(false);
    };

    const detailItems = useMemo(() => {
        const record = activeRecord;
        return [
            { label: '里程碑名称', children: record?.milestoneName || '-' },
            { label: '显示顺序', children: record?.sequence ?? '-' },
            { label: '触发条件', children: record?.triggerCondition || '-' },
            { label: '通知设置', children: record?.notificationSettings?.join('+') || '-' },
            { label: '状态', children: record?.status ? '启用' : '停用' },
            { label: '延迟阈值', children: record?.delayThreshold ?? '-' },
        ];
    }, [activeRecord]);

    return (
        <div style={{ overflowY: 'auto', overflowX: 'hidden', height: 'calc(100vh - 80px)' }}>
            <div className="nc-bill-header-area">
                <div className="header-title-search-area">
                    <div className="BillHeadInfoWrap BillHeadInfoWrap-showBackBtn">
                        <span className="bill-info-title" style={{ marginLeft: '10px' }}>
                            <CustomIcon type="icon-Currency" style={{ color: 'red', fontSize: '24px' }} />
                            {i18n.t(LocaleHelper.getMilestoneConfigTitle())}
                        </span>
                    </div>
                </div>
                <div className="header-button-area">
                    <div className="buttonGroup-component">
                        <div className="u-button-group">
                            <Button type="primary" onClick={handleNew}>新增配置</Button>
                            <Button>导入</Button>
                        </div>
                    </div>
                </div>
            </div>
            <AdvancedSearchForm
                fields={searchFields as any}
                onSearch={handleSearch}
            />
            <div className="nc-bill-table-area">
                <Table
                    columns={getColumns(handleEdit, handleCopy, handleToggle)}
                    dataSource={data}
                    rowKey="id"
                    loading={loading}
                    size="small"
                    bordered={true}
                    scroll={{ x: 'max-content', y: 'calc(100vh - 380px)' }}
                    onRow={(record) => ({
                        onClick: () => handleRowClick(record),
                    })}
                    pagination={{
                        showTotal: (total) => `总共 ${total} 条`,
                        showQuickJumper: true,
                        showSizeChanger: true,
                    }}
                />
            </div>
            <Modal
                open={detailVisible}
                title="配置详情"
                onCancel={() => setDetailVisible(false)}
                footer={[
                    <Button key="close" onClick={() => setDetailVisible(false)}>关闭</Button>,
                    <Button key="edit" type="primary" onClick={() => {
                        if (activeRecord) {
                            handleEdit(activeRecord);
                        }
                        setDetailVisible(false);
                    }}>编辑</Button>,
                ]}
            >
                <Descriptions bordered size="small" column={2} items={detailItems} />
            </Modal>
            <Modal
                open={editVisible}
                title={editMode === 'edit' ? '编辑配置' : '新增配置'}
                onCancel={() => setEditVisible(false)}
                footer={null}
                destroyOnClose={true}
            >
                <Form
                    form={form}
                    layout="vertical"
                    onFinish={handleSave}
                    initialValues={{
                        triggerMethod: '自动触发',
                        notificationSettings: ['客户通知', '内部通知'],
                        delayThreshold: 2,
                        alertEnabled: true,
                    }}
                >
                    <Row gutter={24}>
                        <Col span={12}>
                            <Form.Item
                                name="milestoneName"
                                label="里程碑名称"
                                rules={[{ required: true, message: '请输入里程碑名称' }]}
                            >
                                <Input />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                name="sequence"
                                label="显示顺序"
                                rules={[{ required: true, message: '请输入显示顺序' }]}
                            >
                                <InputNumber min={1} style={{ width: '100%' }} />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={24}>
                        <Col span={12}>
                            <Form.Item
                                name="triggerMethod"
                                label="触发方式"
                                rules={[{ required: true, message: '请选择触发方式' }]}
                            >
                                <Radio.Group>
                                    <Radio value="自动触发">自动触发</Radio>
                                    <Radio value="手动录入">手动录入</Radio>
                                    <Radio value="EDI接收">EDI接收</Radio>
                                    <Radio value="API推送">API推送</Radio>
                                </Radio.Group>
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                name="notificationSettings"
                                label="通知设置"
                            >
                                <Checkbox.Group>
                                    <Checkbox value="客户通知">客户通知</Checkbox>
                                    <Checkbox value="内部通知">内部通知</Checkbox>
                                    <Checkbox value="供应商通知">供应商通知</Checkbox>
                                </Checkbox.Group>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={24}>
                        <Col span={12}>
                            <Form.Item label="预警设置">
                                <Space>
                                    <span>延迟阈值</span>
                                    <Form.Item name="delayThreshold" noStyle>
                                        <InputNumber min={0} />
                                    </Form.Item>
                                    <span>小时</span>
                                    <Form.Item name="alertEnabled" valuePropName="checked" noStyle>
                                        <Checkbox>启用预警</Checkbox>
                                    </Form.Item>
                                </Space>
                            </Form.Item>
                        </Col>
                    </Row>
                    <div style={{ textAlign: 'right' }}>
                        <Button type="primary" onClick={() => form.submit()}>保存</Button>
                        <Button style={{ marginLeft: 8 }} onClick={handleReset}>重置</Button>
                        <Button style={{ marginLeft: 8 }} danger onClick={handleDelete} disabled={!activeRecord}>删除</Button>
                    </div>
                </Form>
            </Modal>
        </div>
    );
};

export default MilestoneConfig;
