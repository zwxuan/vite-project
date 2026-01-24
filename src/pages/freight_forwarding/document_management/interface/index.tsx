import React, { useState } from 'react';
import { Card, Table, Tag, Statistic, Row, Col, Button, Space, List, Typography } from 'antd';
import { SettingOutlined, FileTextOutlined, CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons';
import LocaleHelper from '@/utils/locale';
import i18n from '@/i18n';
import CustomIcon from '@/components/custom-icon';
import AdvancedSearchForm from '@/components/search-form';
import { fields } from './search_fields';
import '@/pages/page_list.less';

const { Text } = Typography;

const DocumentInterface: React.FC = () => {
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState([
        { key: '1', name: 'Manifest Send', provider: 'US Customs', type: 'EDI', status: 'Normal', count: '1,250', rate: '99.8%' },
        { key: '2', name: 'e-BL Upload', provider: 'CargoX', type: 'API', status: 'Normal', count: '500', rate: '100%' },
        { key: '3', name: 'Exchange Rate', provider: 'HSBC', type: 'API', status: 'Normal', count: '3,000', rate: '99.9%' },
        { key: '4', name: 'Booking', provider: 'Maersk', type: 'API', status: 'Abnormal', count: '120', rate: '85.0%' },
    ]);

    const logs = [
        { time: '10:00:01', type: 'INFO', msg: 'Send manifest data for WAY-001... Success' },
        { time: '09:55:23', type: 'ERROR', msg: 'Connection timeout... Retrying' },
    ];

    const columns = [
        {
            title: i18n.t(LocaleHelper.getDocumentInterfaceName()),
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: i18n.t(LocaleHelper.getDocumentInterfaceServiceProvider()),
            dataIndex: 'provider',
            key: 'provider',
        },
        {
            title: i18n.t(LocaleHelper.getDocumentInterfaceType()),
            dataIndex: 'type',
            key: 'type',
        },
        {
            title: i18n.t(LocaleHelper.getDocumentInterfaceInterfaceStatus()),
            dataIndex: 'status',
            key: 'status',
            render: (status: string) => (
                <Tag color={status === 'Normal' ? 'success' : 'error'}>
                    {status === 'Normal' ? i18n.t(LocaleHelper.getDocumentInterfaceNormal()) : i18n.t(LocaleHelper.getDocumentInterfaceAbnormal())}
                </Tag>
            ),
        },
        {
            title: i18n.t(LocaleHelper.getDocumentInterfaceCallCount()),
            dataIndex: 'count',
            key: 'count',
        },
        {
            title: i18n.t(LocaleHelper.getDocumentInterfaceSuccessRate()),
            dataIndex: 'rate',
            key: 'rate',
        },
    ];

    const handleSearch = (values: any) => {
        setLoading(true);
        console.log('Search values:', values);
        setTimeout(() => setLoading(false), 500);
    };

    return (
        <div style={{ overflowY: 'auto', overflowX: 'hidden', height: 'calc(100vh - 80px)' }}>
            <div className="nc-bill-header-area">
                <div className="header-title-search-area">
                    <div className="BillHeadInfoWrap BillHeadInfoWrap-showBackBtn">
                        <span className="bill-info-title" style={{ marginLeft: '10px' }}>
                            <CustomIcon type="icon-Currency" style={{ color: 'red', fontSize: '24px' }} />
                            {i18n.t(LocaleHelper.getDocumentInterfaceTitle())}
                        </span>
                    </div>
                </div>
                <div className="header-button-area">
                    <div className="buttonGroup-component">
                        <div className="u-button-group">
                            <Button icon={<SettingOutlined />}>{i18n.t(LocaleHelper.getDocumentInterfaceConfig())}</Button>
                            <Button icon={<FileTextOutlined />}>{i18n.t(LocaleHelper.getDocumentInterfaceLog())}</Button>
                        </div>
                    </div>
                </div>
            </div>

            <div style={{ padding: '0 16px', marginTop: 16 }}>
                <Row gutter={16}>
                    <Col span={8}>
                        <Card size="small">
                            <Statistic
                                title="Customs API"
                                value="Normal"
                                valueStyle={{ color: '#3f8600' }}
                                prefix={<CheckCircleOutlined />}
                            />
                        </Card>
                    </Col>
                    <Col span={8}>
                        <Card size="small">
                            <Statistic
                                title="Maersk Booking"
                                value="Abnormal"
                                valueStyle={{ color: '#cf1322' }}
                                prefix={<CloseCircleOutlined />}
                            />
                        </Card>
                    </Col>
                    <Col span={8}>
                        <Card size="small">
                            <Statistic
                                title="Bank Settlement"
                                value="Normal"
                                valueStyle={{ color: '#3f8600' }}
                                prefix={<CheckCircleOutlined />}
                            />
                        </Card>
                    </Col>
                </Row>
            </div>

            <AdvancedSearchForm fields={fields} onSearch={handleSearch} />

            <div className="nc-bill-table-area">
                <Table
                    columns={columns}
                    dataSource={data}
                    size="small"
                    bordered={true}
                    loading={loading}
                    scroll={{ x: 'max-content', y: 'calc(100vh - 380px)' }}
                    pagination={{
                        size: 'small',
                        showTotal: total => `Total ${total} items`,
                        showQuickJumper: true,
                        showSizeChanger: true,
                    }}
                />
            </div>

             <div style={{ padding: '0 16px 16px 16px' }}>
                <Row gutter={24}>
                    <Col span={12}>
                        <Card type="inner" title={`${i18n.t(LocaleHelper.getDocumentInterfaceMonitor())} (Manifest Send)`} size="small">
                            <div style={{ height: 200, display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f0f2f5' }}>
                                [Response Time Trend Chart Placeholder]
                            </div>
                            <div style={{ textAlign: 'center', marginTop: 8 }}>
                                <Text>{i18n.t(LocaleHelper.getDocumentInterfaceAvgTime())}: 250ms</Text>
                            </div>
                        </Card>
                    </Col>
                    <Col span={12}>
                        <Card type="inner" title={i18n.t(LocaleHelper.getDocumentInterfaceLog())} size="small">
                            <List
                                size="small"
                                dataSource={logs}
                                renderItem={item => (
                                    <List.Item>
                                        <Text type="secondary" style={{ marginRight: 8 }}>{item.time}</Text>
                                        <Tag color={item.type === 'ERROR' ? 'red' : 'blue'}>{item.type}</Tag>
                                        {item.msg}
                                    </List.Item>
                                )}
                            />
                        </Card>
                    </Col>
                </Row>
            </div>
        </div>
    );
};

export default DocumentInterface;
