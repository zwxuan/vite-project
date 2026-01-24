
import React, { useEffect, useState } from 'react';
import { Card, Col, Row, Statistic, Button, List } from 'antd';
import { FileTextOutlined, AuditOutlined, CheckCircleOutlined, WarningOutlined, FileAddOutlined, ProfileOutlined, PrinterOutlined, ReloadOutlined } from '@ant-design/icons';
import { DocumentService } from "@/api/freight_forwarding/document_management/document_service";
import { DocumentStatistic, DocumentItem } from "@/types/freight_forwarding/document_management";
import i18n from '@/i18n';
import LocaleHelper from '@/utils/locale';
import CustomIcon from "@/components/custom-icon";
import { useNavigate } from 'react-router-dom';
import '@/pages/page_list.less';

const DocumentOverview: React.FC = () => {
  const [statistic, setStatistic] = useState<DocumentStatistic | null>(null);
  const [recentDocs, setRecentDocs] = useState<DocumentItem[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    DocumentService.getDocumentStatistic().then(res => {
      if (res.success) {
        setStatistic(res.data);
      }
    });
    DocumentService.getDocumentList({ pageSize: 5 }).then(res => {
      if (res.success) {
        setRecentDocs(res.data);
      }
    });
  }, []);

  return (
    <div style={{ overflowY: 'auto', overflowX: 'hidden', height: 'calc(100vh - 80px)' }}>
      <div className="nc-bill-header-area">
        <div className="header-title-search-area">
          <div className="BillHeadInfoWrap BillHeadInfoWrap-showBackBtn">
            <span className="bill-info-title" style={{ marginLeft: '10px' }}>
              <CustomIcon type="icon-Currency" style={{ color: 'red', fontSize: '24px' }} />
              {i18n.t(LocaleHelper.getDocumentOverviewTitle())}
            </span>
          </div>
        </div>
        <div className="header-button-area">
          <div className="buttonGroup-component">
            <div className="u-button-group">
                <Button icon={<ReloadOutlined />}>Refresh</Button>
            </div>
          </div>
        </div>
      </div>

      <div style={{ padding: '24px' }}>
        <Row gutter={16} style={{ marginBottom: 24 }}>
            <Col span={6}>
            <Card>
                <Statistic
                title={i18n.t(LocaleHelper.getDocumentOverviewPendingGenerate())}
                value={statistic?.pending_generate || 0}
                prefix={<FileTextOutlined />}
                valueStyle={{ color: '#1890ff' }}
                />
            </Card>
            </Col>
            <Col span={6}>
            <Card>
                <Statistic
                title={i18n.t(LocaleHelper.getDocumentOverviewPendingReview())}
                value={statistic?.pending_review || 0}
                prefix={<AuditOutlined />}
                valueStyle={{ color: '#faad14' }}
                />
            </Card>
            </Col>
            <Col span={6}>
            <Card>
                <Statistic
                title={i18n.t(LocaleHelper.getDocumentOverviewIssued())}
                value={statistic?.issued || 0}
                prefix={<CheckCircleOutlined />}
                valueStyle={{ color: '#52c41a' }}
                />
            </Card>
            </Col>
            <Col span={6}>
            <Card>
                <Statistic
                title={i18n.t(LocaleHelper.getDocumentOverviewException())}
                value={statistic?.exception || 0}
                prefix={<WarningOutlined />}
                valueStyle={{ color: '#cf1322' }}
                />
            </Card>
            </Col>
        </Row>

        <Row gutter={16}>
            <Col span={16}>
            <Card title={i18n.t(LocaleHelper.getDocumentOverviewTrend())} style={{ marginBottom: 24 }}>
                <div style={{ height: 350, border: '1px dashed #d9d9d9', background: '#fafafa', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <span>Chart Placeholder (ECharts/AntV)</span>
                </div>
            </Card>
            <Card title={i18n.t(LocaleHelper.getDocumentOverviewRecentDocs())}>
                <List
                dataSource={recentDocs}
                renderItem={item => (
                    <List.Item
                    actions={[<a key="view" onClick={() => navigate(`/document_management/detail/${item.id}`)}>{i18n.t(LocaleHelper.getDocumentListDetail())}</a>]}
                    >
                    <List.Item.Meta
                        title={item.code}
                        description={`${item.type} - ${item.customer}`}
                    />
                    <div>{item.status}</div>
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

export default DocumentOverview;
