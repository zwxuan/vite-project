import React from 'react';
import { Card, Row, Col, Statistic, Progress } from 'antd';
import { DatabaseOutlined, HistoryOutlined, CalendarOutlined } from '@ant-design/icons';
import i18n from '@/i18n';
import LocaleHelper from '@/utils/locale';

const ArchiveStatistics: React.FC = () => {
    return (
        <div style={{ padding: '20px' }}>
            <Row gutter={16}>
                <Col span={8}>
                    <Card>
                        <Statistic 
                            title={i18n.t(LocaleHelper.getWaybillArchiveThisMonthArchive())} 
                            value={45} 
                            prefix={<CalendarOutlined style={{ color: '#1890ff' }} />} 
                        />
                    </Card>
                </Col>
                <Col span={8}>
                    <Card>
                        <Statistic 
                            title={i18n.t(LocaleHelper.getWaybillArchiveThisYearArchive())} 
                            value={320} 
                            prefix={<HistoryOutlined style={{ color: '#faad14' }} />} 
                        />
                    </Card>
                </Col>
                <Col span={8}>
                    <Card>
                        <Statistic 
                            title={i18n.t(LocaleHelper.getWaybillArchiveStorageSpace())} 
                            value={65} 
                            suffix="/ 100 GB"
                            prefix={<DatabaseOutlined style={{ color: '#52c41a' }} />} 
                        />
                         <Progress percent={65} status="active" />
                         <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: '#999' }}>
                             <span>{i18n.t(LocaleHelper.getWaybillArchiveUsedSpace())}: 65GB</span>
                             <span>{i18n.t(LocaleHelper.getWaybillArchiveTotalCapacity())}: 100GB</span>
                         </div>
                    </Card>
                </Col>
            </Row>
        </div>
    );
};

export default ArchiveStatistics;
