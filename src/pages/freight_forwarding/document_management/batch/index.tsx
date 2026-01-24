import React, { useState } from 'react';
import { Card, Radio, Form, Upload, Button, Select, Checkbox, Progress, List, Space, Typography, Steps } from 'antd';
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

    const logs = [
        { status: 'success', text: '[Success] WAY-001 -> Generated DOC-101' },
        { status: 'success', text: '[Success] WAY-002 -> Generated DOC-102' },
        { status: 'error', text: '[Fail] WAY-003 -> Missing Shipper Info' },
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
                        </span>
                    </div>
                </div>
                <div className="header-button-area">
                    <div className="buttonGroup-component">
                        <div className="u-button-group">
                            <Button icon={<UnorderedListOutlined />}>{i18n.t(LocaleHelper.getDocumentBatchViewTask())}</Button>
                            <Button icon={<SettingOutlined />}>{i18n.t(LocaleHelper.getDocumentBatchSettings())}</Button>
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
                            <Select defaultValue="ocean_bl_standard" style={{ width: 300 }}>
                                <Option value="ocean_bl_standard">Ocean B/L Standard Template</Option>
                            </Select>
                        </Form.Item>

                        <Form.Item label={`3. ${i18n.t(LocaleHelper.getDocumentBatchSettings())}`}>
                            <Space direction="vertical">
                                <Checkbox defaultChecked>Auto merge same shipper/consignee</Checkbox>
                                <Checkbox defaultChecked>Auto validate after generation</Checkbox>
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
        </div>
    );
};

export default DocumentBatch;
