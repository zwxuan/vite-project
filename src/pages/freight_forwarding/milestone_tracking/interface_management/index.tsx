import React, { useEffect, useState } from 'react';
import { Button, Card, Checkbox, Col, Descriptions, Form, Input, InputNumber, Modal, Radio, Row, Space, Table, Tabs, message } from 'antd';
import CustomIcon from '@/components/custom-icon';
import { getInterfaceConfigList } from '@/api/freight_forwarding/milestone_tracking/service';
import { InterfaceConfigItem } from '@/types/freight_forwarding/milestone_tracking';
import LocaleHelper from '@/utils/locale';
import i18n from '@/i18n';
import { getColumns } from './columns';
import '@/pages/page_list.less';

const InterfaceManagement: React.FC = () => {
    const [data, setData] = useState<InterfaceConfigItem[]>([]);
    const [loading, setLoading] = useState(false);
    const [form] = Form.useForm();
    const [editorOpen, setEditorOpen] = useState(false);

    const [syncLogs, setSyncLogs] = useState([
        {
            id: 'log-1',
            syncTime: '10:30',
            interfaceName: 'COSCO API',
            result: '成功',
            detail: '同步50条跟踪信息',
        },
        {
            id: 'log-2',
            syncTime: '10:15',
            interfaceName: 'MSK API',
            result: '失败',
            detail: '连接超时',
        },
        {
            id: 'log-3',
            syncTime: '10:00',
            interfaceName: '海关EDI',
            result: '成功',
            detail: '同步25条清关信息',
        },
    ]);
    const [logDetailOpen, setLogDetailOpen] = useState(false);
    const [activeLog, setActiveLog] = useState<typeof syncLogs[number] | null>(null);

    const syncLogColumns = [
        { title: '同步时间', dataIndex: 'syncTime', key: 'syncTime' },
        { title: '接口名称', dataIndex: 'interfaceName', key: 'interfaceName' },
        { title: '同步结果', dataIndex: 'result', key: 'result' },
        { title: '详细信息', dataIndex: 'detail', key: 'detail' },
        {
            title: '操作',
            key: 'action',
            render: (_: any, record: typeof syncLogs[number]) => (
                <Space size="middle">
                    <a onClick={() => openLogDetail(record)}>详情</a>
                    {record.result === '失败' && <a onClick={() => handleRetry(record)}>重试</a>}
                </Space>
            ),
        },
    ];

    const fetchData = async () => {
        setLoading(true);
        try {
            const result = await getInterfaceConfigList();
            setData(result);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const openConfig = (record?: InterfaceConfigItem) => {
        const nextConfig = record ?? null;
        form.setFieldsValue({
            interfaceName: nextConfig?.interfaceName || '',
            apiUrl: nextConfig?.apiUrl || '',
            authType: 'apiKey',
            syncFrequency: nextConfig?.syncFrequency ?? 15,
            autoSync: true,
        });
        setEditorOpen(true);
    };

    const closeEditor = () => {
        setEditorOpen(false);
    };

    const openLogDetail = (record: typeof syncLogs[number]) => {
        setActiveLog(record);
        setLogDetailOpen(true);
    };

    const closeLogDetail = () => {
        setLogDetailOpen(false);
        setActiveLog(null);
    };

    const handleRetry = (record: typeof syncLogs[number]) => {
        Modal.confirm({
            title: '确认重试',
            content: `${record.interfaceName} 同步失败，是否重试？`,
            onOk: () => {
                setSyncLogs((prev) =>
                    prev.map((item) =>
                        item.id === record.id
                            ? {
                                ...item,
                                result: '成功',
                                detail: '已重新同步',
                            }
                            : item
                    )
                );
                message.success('已提交重试');
            },
        });
    };

    return (
        <div style={{ overflowY: 'auto', overflowX: 'hidden', height: 'calc(100vh - 80px)' }}>
            <div className="nc-bill-header-area">
                <div className="header-title-search-area">
                    <div className="BillHeadInfoWrap BillHeadInfoWrap-showBackBtn">
                        <span className="bill-info-title" style={{ marginLeft: '10px' }}>
                            <CustomIcon type="icon-Currency" style={{ color: 'red', fontSize: '24px' }} />
                            {i18n.t(LocaleHelper.getInterfaceManagementTitle())}
                        </span>
                    </div>
                </div>
                <div className="header-button-area">
                    <div className="buttonGroup-component">
                        <div className="u-button-group">
                            <Button type="primary" onClick={() => openConfig()}>新增接口</Button>
                            <Button>测试</Button>
                        </div>
                    </div>
                </div>
            </div>
            <Tabs
                items={[
                    {
                        key: 'config',
                        label: '接口配置',
                        children: (
                            <Card className="nc-bill-table-area" bordered={false}>
                                <Table
                                    columns={getColumns(openConfig)}
                                    dataSource={data}
                                    rowKey="id"
                                    loading={loading}
                                    size="small"
                                    bordered={true}
                                    scroll={{ x: 'max-content' }}
                                    pagination={false}
                                />
                            </Card>
                        ),
                    },
                    {
                        key: 'logs',
                        label: '同步日志',
                        children: (
                            <Card bordered={false}>
                                <Table
                                    columns={syncLogColumns}
                                    dataSource={syncLogs}
                                    rowKey="id"
                                    size="small"
                                    bordered={true}
                                    pagination={false}
                                />
                            </Card>
                        ),
                    },
                ]}
            />
            <Modal
                open={logDetailOpen}
                title="同步日志详情"
                onCancel={closeLogDetail}
                footer={null}
                destroyOnClose
            >
                {activeLog && (
                    <Descriptions column={1} bordered size="small">
                        <Descriptions.Item label="同步时间">{activeLog.syncTime}</Descriptions.Item>
                        <Descriptions.Item label="接口名称">{activeLog.interfaceName}</Descriptions.Item>
                        <Descriptions.Item label="同步结果">{activeLog.result}</Descriptions.Item>
                        <Descriptions.Item label="详细信息">{activeLog.detail}</Descriptions.Item>
                    </Descriptions>
                )}
            </Modal>
            <Modal
                open={editorOpen}
                title="接口详情配置"
                onCancel={closeEditor}
                width={860}
                footer={null}
                destroyOnClose
            >
                <Form
                    form={form}
                    layout="vertical"
                >
                    <Row gutter={16}>
                        <Col span={8}>
                            <Form.Item label="接口名称" name="interfaceName">
                                <Input />
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item label="接口地址" name="apiUrl">
                                <Input />
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item label="认证方式" name="authType">
                                <Radio.Group>
                                    <Radio value="apiKey">API Key</Radio>
                                    <Radio value="oauth2">OAuth2</Radio>
                                    <Radio value="basic">Basic Auth</Radio>
                                </Radio.Group>
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item label="同步频率(分钟)" name="syncFrequency">
                                <InputNumber min={1} style={{ width: '100%' }} />
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item label="启用自动同步" name="autoSync" valuePropName="checked">
                                <Checkbox>启用</Checkbox>
                            </Form.Item>
                        </Col>
                    </Row>
                    <div style={{ textAlign: 'right' }}>
                        <Space>
                            <Button type="primary">保存</Button>
                            <Button>测试</Button>
                            <Button onClick={closeEditor}>取消</Button>
                        </Space>
                    </div>
                </Form>
            </Modal>
        </div>
    );
};

export default InterfaceManagement;
