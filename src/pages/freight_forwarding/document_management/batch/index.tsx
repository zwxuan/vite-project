import React, { useState } from 'react';
import { Card, Radio, Form, Upload, Button, Select, Checkbox, Progress, List, Space, Typography, Steps, Tooltip, Modal, Table, message } from 'antd';
import { UploadOutlined, PlayCircleOutlined, DownloadOutlined, UnorderedListOutlined, SettingOutlined } from '@ant-design/icons';
import LocaleHelper from '@/utils/locale';
import i18n from '@/i18n';
import CustomIcon from '@/components/custom-icon';
import '@/pages/page_list.less';

const { Text } = Typography;
const { Option } = Select;

const DocumentBatch: React.FC = () => {
    const [operationType, setOperationType] = useState('generate');
    const [executing, setExecuting] = useState(false);
    const [percent, setPercent] = useState(0);
    const [taskModalOpen, setTaskModalOpen] = useState(false);
    const [settingsModalOpen, setSettingsModalOpen] = useState(false);
    const [settingsForm] = Form.useForm();
    const [settings, setSettings] = useState({
        autoMerge: true,
        autoValidate: true,
        defaultTemplate: 'ocean_bl_standard',
    });

    const logs = [
        { status: 'success', text: '[Success] WAY-001 -> Generated DOC-101' },
        { status: 'success', text: '[Success] WAY-002 -> Generated DOC-102' },
        { status: 'error', text: '[Fail] WAY-003 -> Missing Shipper Info' },
    ];
    const tasks = [
        { id: 'TASK-202403-001', op: i18n.t(LocaleHelper.getDocumentBatchGenerate()), createdAt: '2024-03-21 10:30', status: i18n.t(LocaleHelper.getDocumentBatchTaskStatusCompleted()), success: 23, fail: 2 },
        { id: 'TASK-202403-002', op: i18n.t(LocaleHelper.getDocumentBatchAudit()), createdAt: '2024-03-22 09:15', status: i18n.t(LocaleHelper.getDocumentBatchTaskStatusCompleted()), success: 45, fail: 1 },
        { id: 'TASK-202403-003', op: i18n.t(LocaleHelper.getDocumentBatchIssue()), createdAt: '2024-03-23 16:40', status: i18n.t(LocaleHelper.getDocumentBatchTaskStatusRunning()), success: 12, fail: 0 },
    ];

    const startExecution = () => {
        setExecuting(true);
        setPercent(0);
        let p = 0;
        const interval = setInterval(() => {
            p += 10;
            if (p > 100) {
                clearInterval(interval);
                // setExecuting(false);
            } else {
                setPercent(p);
            }
        }, 200);
    };

    return (
        <div style={{ overflowY: 'auto', overflowX: 'hidden', height: 'calc(100vh - 80px)' }}>
            <div className="nc-bill-header-area">
                <div className="header-title-search-area">
                    <div className="BillHeadInfoWrap BillHeadInfoWrap-showBackBtn">
                        <span className="bill-info-title" style={{ marginLeft: '10px' }}>
                            <CustomIcon type="icon-Currency" style={{ color: 'red', fontSize: '24px' }} />
                            {i18n.t(LocaleHelper.getDocumentBatchTitle())}
                            <Tooltip
                                title={
                                    <div className='rul_title_tooltip' style={{ backgroundColor: '#fff', color: '#000' }}>
                                        <ol style={{ color: '#666666', fontSize: '12px', paddingLeft: '2px' }}>
                                            <li style={{ marginBottom: '10px' }}>
                                                <span style={{ marginRight: '10px', backgroundColor: '#f1f1f1', padding: '2px 10px' }}><b>{i18n.t(LocaleHelper.getDocumentBatchHintGenerateTitle())}</b></span>
                                                {i18n.t(LocaleHelper.getDocumentBatchHintGenerateDesc())}
                                            </li>
                                            <li style={{ marginBottom: '10px' }}>
                                                <span style={{ marginRight: '10px', backgroundColor: '#f1f1f1', padding: '2px 10px' }}><b>{i18n.t(LocaleHelper.getDocumentBatchHintReviewTitle())}</b></span>
                                                {i18n.t(LocaleHelper.getDocumentBatchHintReviewDesc())}
                                            </li>
                                            <li style={{ marginBottom: '10px' }}>
                                                <span style={{ marginRight: '10px', backgroundColor: '#f1f1f1', padding: '2px 10px' }}><b>{i18n.t(LocaleHelper.getDocumentBatchHintIssuePrintTitle())}</b></span>
                                                {i18n.t(LocaleHelper.getDocumentBatchHintIssuePrintDesc())}
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
                    <div className="buttonGroup-component">
                        <div className="u-button-group">
                            <Button icon={<UnorderedListOutlined />} onClick={() => setTaskModalOpen(true)}>{i18n.t(LocaleHelper.getDocumentBatchViewTask())}</Button>
                            <Button icon={<SettingOutlined />} onClick={() => {
                                settingsForm.setFieldsValue({
                                    autoMerge: settings.autoMerge,
                                    autoValidate: settings.autoValidate,
                                    defaultTemplate: settings.defaultTemplate,
                                });
                                setSettingsModalOpen(true);
                            }}>{i18n.t(LocaleHelper.getDocumentBatchSettings())}</Button>
                        </div>
                    </div>
                </div>
            </div>

            <div style={{ padding: 24 }}>
                <Form layout="vertical">
                    <Form.Item label={i18n.t(LocaleHelper.getDocumentBatchOperationType())}>
                        <Radio.Group value={operationType} onChange={e => setOperationType(e.target.value)} buttonStyle="solid">
                            <Radio.Button value="generate">{i18n.t(LocaleHelper.getDocumentBatchGenerate())}</Radio.Button>
                            <Radio.Button value="review">{i18n.t(LocaleHelper.getDocumentBatchAudit())}</Radio.Button>
                            <Radio.Button value="issue">{i18n.t(LocaleHelper.getDocumentBatchIssue())}</Radio.Button>
                            <Radio.Button value="print">{i18n.t(LocaleHelper.getDocumentBatchPrint())}</Radio.Button>
                        </Radio.Group>
                    </Form.Item>

                    <Card type="inner" title={i18n.t(LocaleHelper.getDocumentBatchTaskConfig())} style={{ marginTop: 16 }}>
                        <Form.Item label={`1. ${i18n.t(LocaleHelper.getDocumentBatchDataSource())}`}>
                            <Space>
                                <Upload>
                                    <Button icon={<UploadOutlined />}>Import Excel...</Button>
                                </Upload>
                                <Text>OR</Text>
                                <Button>Select System Waybills...</Button>
                                <Text type="secondary">Selected: 25 waybills</Text>
                            </Space>
                        </Form.Item>

                        <Form.Item label={`2. ${i18n.t(LocaleHelper.getDocumentBatchTemplate())}`}>
                            <Select
                                value={settings.defaultTemplate}
                                onChange={(value) => setSettings(prev => ({ ...prev, defaultTemplate: value }))}
                                style={{ width: 300 }}
                            >
                                <Option value="ocean_bl_standard">Ocean B/L Standard Template</Option>
                            </Select>
                        </Form.Item>

                        <Form.Item label={`3. ${i18n.t(LocaleHelper.getDocumentBatchSettings())}`}>
                            <Space direction="vertical">
                                <Checkbox checked={settings.autoMerge} onChange={(e) => setSettings(prev => ({ ...prev, autoMerge: e.target.checked }))}>
                                    {i18n.t(LocaleHelper.getDocumentBatchSettingsAutoMerge())}
                                </Checkbox>
                                <Checkbox checked={settings.autoValidate} onChange={(e) => setSettings(prev => ({ ...prev, autoValidate: e.target.checked }))}>
                                    {i18n.t(LocaleHelper.getDocumentBatchSettingsAutoValidate())}
                                </Checkbox>
                            </Space>
                        </Form.Item>

                        <Form.Item>
                            <Button type="primary" icon={<PlayCircleOutlined />} onClick={startExecution} loading={executing && percent < 100}>
                                {i18n.t(LocaleHelper.getDocumentBatchStart())}
                            </Button>
                        </Form.Item>
                    </Card>

                    {executing && (
                        <Card type="inner" title={i18n.t(LocaleHelper.getDocumentBatchProgress())} style={{ marginTop: 16 }}>
                            <div style={{ marginBottom: 16 }}>
                                <Progress percent={percent} status={percent === 100 ? "success" : "active"} />
                                <Space style={{ marginTop: 8 }}>
                                    <Text>{percent === 100 ? "Completed" : "Processing..."}</Text>
                                    <Text type="success">{i18n.t(LocaleHelper.getDocumentBatchSuccess())}: 23</Text>
                                    <Text type="danger">{i18n.t(LocaleHelper.getDocumentBatchFail())}: 2</Text>
                                </Space>
                            </div>

                            <List
                                bordered
                                size="small"
                                dataSource={logs}
                                renderItem={item => (
                                    <List.Item>
                                        <Text type={item.status === 'success' ? 'success' : 'danger'}>{item.text}</Text>
                                    </List.Item>
                                )}
                            />
                        </Card>
                    )}
                </Form>
            </div>
            <Modal
                title={i18n.t(LocaleHelper.getDocumentBatchTaskListTitle())}
                open={taskModalOpen}
                onCancel={() => setTaskModalOpen(false)}
                footer={null}
                width={800}
            >
                <Table
                    size="small"
                    bordered
                    rowKey="id"
                    dataSource={tasks}
                    pagination={false}
                    columns={[
                        { title: i18n.t(LocaleHelper.getDocumentBatchTaskId()), dataIndex: 'id', width: 180 },
                        { title: i18n.t(LocaleHelper.getDocumentBatchTaskOperation()), dataIndex: 'op', width: 140 },
                        { title: i18n.t(LocaleHelper.getDocumentBatchTaskCreatedAt()), dataIndex: 'createdAt', width: 180 },
                        { title: i18n.t(LocaleHelper.getDocumentBatchTaskStatus()), dataIndex: 'status', width: 120 },
                        { title: i18n.t(LocaleHelper.getDocumentBatchTaskSuccessCount()), dataIndex: 'success', width: 100 },
                        { title: i18n.t(LocaleHelper.getDocumentBatchTaskFailCount()), dataIndex: 'fail', width: 100 },
                        {
                            title: i18n.t(LocaleHelper.getDocumentBatchTaskAction()),
                            width: 160,
                            render: (_, record) => (
                                <Button type="link" icon={<DownloadOutlined />}>
                                    {i18n.t(LocaleHelper.getDocumentBatchDownloadReport())}
                                </Button>
                            )
                        },
                    ]}
                />
            </Modal>
            <Modal
                title={i18n.t(LocaleHelper.getDocumentBatchSettingsTitle())}
                open={settingsModalOpen}
                onCancel={() => setSettingsModalOpen(false)}
                onOk={() => {
                    settingsForm.validateFields().then(vals => {
                        setSettings({
                            autoMerge: !!vals.autoMerge,
                            autoValidate: !!vals.autoValidate,
                            defaultTemplate: vals.defaultTemplate,
                        });
                        setSettingsModalOpen(false);
                        message.success(i18n.t(LocaleHelper.getDocumentBatchSettingsSaveSuccess()));
                    });
                }}
                okText={i18n.t(LocaleHelper.getSave())}
                cancelText={i18n.t(LocaleHelper.getCancel())}
                width={520}
                destroyOnClose
            >
                <Form form={settingsForm} layout="vertical" initialValues={{
                    autoMerge: settings.autoMerge,
                    autoValidate: settings.autoValidate,
                    defaultTemplate: settings.defaultTemplate,
                }}>
                    <Form.Item name="defaultTemplate" label={i18n.t(LocaleHelper.getDocumentBatchSettingsDefaultTemplate())} rules={[{ required: true }]}>
                        <Select style={{ width: '100%' }}>
                            <Option value="ocean_bl_standard">Ocean B/L Standard Template</Option>
                        </Select>
                    </Form.Item>
                    <Form.Item name="autoMerge" label={i18n.t(LocaleHelper.getDocumentBatchSettingsAutoMerge())} valuePropName="checked">
                        <Checkbox />
                    </Form.Item>
                    <Form.Item name="autoValidate" label={i18n.t(LocaleHelper.getDocumentBatchSettingsAutoValidate())} valuePropName="checked">
                        <Checkbox />
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};

export default DocumentBatch;
