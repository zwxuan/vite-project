import React, { useMemo } from 'react';
import { Button, Tabs, Descriptions, Tag, Row, Col } from 'antd';
import { useParams, useNavigate } from 'react-router-dom';
import i18n from '@/i18n';
import LocaleHelper from '@/utils/locale';
import CustomIcon from '@/components/custom-icon';
import '@/pages/page_list.less';
import CheckResult from './components/CheckResult';
import DocumentPreview from './components/DocumentPreview';
import CheckLogs from './components/CheckLogs';

type ComplianceResult = 'pass' | 'fail';
type ComplianceRisk = 'high' | 'medium' | 'low';

// 添加 ComplianceCheckItem 类型定义
interface ComplianceCheckItem {
  type: 'pass' | 'warning' | 'error';
  title: string;
  suggestion: string;
}

const { TabPane } = Tabs;

const DocumentComplianceDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const mockDetail = useMemo(() => ({
    documentNo: id || 'DOC-008',
    type: i18n.t(LocaleHelper.getDocumentComplianceDocTypeBl()),
    destination: i18n.t(LocaleHelper.getDocumentComplianceCountryUs()),
    status: i18n.t(LocaleHelper.getDocumentComplianceChecking()),
    progress: 70,
    overallRisk: 'medium' as ComplianceRisk,
    result: 'fail' as ComplianceResult,
    lastCheckTime: '2024-03-19 10:30',
    checker: i18n.t(LocaleHelper.getDocumentComplianceCheckerBot()),
    ruleVersion: 'v1.2.0',
    items: [
      { type: 'warning', title: i18n.t(LocaleHelper.getDocumentComplianceWarningAddress()), suggestion: i18n.t(LocaleHelper.getDocumentComplianceSuggestionAddress()) },
      { type: 'error', title: i18n.t(LocaleHelper.getDocumentComplianceErrorHsCode()), suggestion: i18n.t(LocaleHelper.getDocumentComplianceSuggestionHsCode()) },
      { type: 'pass', title: i18n.t(LocaleHelper.getDocumentCompliancePassSensitive()), suggestion: '' },
    ] as ComplianceCheckItem[], // 添加类型断言
    logs: [
      { time: '10:00', message: i18n.t(LocaleHelper.getDocumentComplianceLogCheckStart()) },
      { time: '10:25', message: i18n.t(LocaleHelper.getDocumentComplianceLogRuleUpdate()) },
      { time: '10:30', message: i18n.t(LocaleHelper.getDocumentComplianceLogCheckComplete()) },
    ],
  }), [id]);

  const riskColor = mockDetail.overallRisk === 'high' ? 'red' : mockDetail.overallRisk === 'medium' ? 'orange' : 'green';
  const resultColor = mockDetail.result === 'fail' ? 'red' : 'green';

  return (
    <div style={{ height: 'calc(100vh - 80px)', display: 'flex', flexDirection: 'column' }}>
      <div className="nc-bill-header-area" style={{ flexShrink: 0 }}>
        <div className="header-title-search-area">
          <div className="BillHeadInfoWrap BillHeadInfoWrap-showBackBtn">
            <span className="bill-info-title" style={{ marginLeft: '10px' }}>
              <CustomIcon type="icon-Currency" style={{ color: 'red', fontSize: '24px' }} />
              {i18n.t(LocaleHelper.getDocumentComplianceDetailTitle())} - {mockDetail.documentNo}
            </span>
          </div>
        </div>
        <div className="header-button-area">
          <div className="buttonGroup-component">
            <div className="u-button-group">
              <Button onClick={() => navigate(-1)}>{i18n.t(LocaleHelper.getBack())}</Button>
              <Button type="primary" danger>{i18n.t(LocaleHelper.getDocumentComplianceCheckNow())}</Button>
            </div>
          </div>
        </div>
      </div>

      <div style={{ flex: 1, overflowY: 'auto', padding: '16px', backgroundColor: '#f0f2f5' }}>
        <div style={{ padding: '16px', background: '#fff', marginBottom: '16px', borderRadius: '4px' }}>
          <Row gutter={16}>
            <Col span={8}>
              <Descriptions size="small" column={1} bordered>
                <Descriptions.Item label={i18n.t(LocaleHelper.getDocumentComplianceDocumentNo())}>
                  {mockDetail.documentNo}
                </Descriptions.Item>
                <Descriptions.Item label={i18n.t(LocaleHelper.getDocumentComplianceType())}>
                  {mockDetail.type}
                </Descriptions.Item>
                <Descriptions.Item label={i18n.t(LocaleHelper.getDocumentComplianceDestination())}>
                  {mockDetail.destination}
                </Descriptions.Item>
                <Descriptions.Item label={i18n.t(LocaleHelper.getDocumentComplianceCheckStatus())}>
                  {mockDetail.status} [{i18n.t(LocaleHelper.getDocumentComplianceProgress())}: {mockDetail.progress}%]
                </Descriptions.Item>
              </Descriptions>
            </Col>
            <Col span={16}>
              <Descriptions size="small" column={2} bordered>
                <Descriptions.Item label={i18n.t(LocaleHelper.getDocumentComplianceOverallRisk())}>
                  <Tag color={riskColor}>
                    {mockDetail.overallRisk === 'high'
                      ? i18n.t(LocaleHelper.getDocumentComplianceHighRisk())
                      : mockDetail.overallRisk === 'medium'
                      ? i18n.t(LocaleHelper.getDocumentComplianceMediumRisk())
                      : i18n.t(LocaleHelper.getDocumentComplianceLowRisk())}
                  </Tag>
                </Descriptions.Item>
                <Descriptions.Item label={i18n.t(LocaleHelper.getDocumentComplianceResult())}>
                  <Tag color={resultColor}>
                    {mockDetail.result === 'fail'
                      ? i18n.t(LocaleHelper.getDocumentComplianceFail())
                      : i18n.t(LocaleHelper.getDocumentCompliancePass())}
                  </Tag>
                </Descriptions.Item>
                <Descriptions.Item label={i18n.t(LocaleHelper.getDocumentComplianceLastCheckTime())}>
                  {mockDetail.lastCheckTime}
                </Descriptions.Item>
                <Descriptions.Item label={i18n.t(LocaleHelper.getDocumentComplianceChecker())}>
                  {mockDetail.checker}
                </Descriptions.Item>
                <Descriptions.Item label={i18n.t(LocaleHelper.getDocumentComplianceRuleVersion())} span={2}>
                  {mockDetail.ruleVersion}
                </Descriptions.Item>
              </Descriptions>
            </Col>
          </Row>
        </div>

        <div style={{ background: '#fff', padding: '16px', borderRadius: '4px', minHeight: 400 }}>
          <Tabs defaultActiveKey="1">
            <TabPane tab={i18n.t(LocaleHelper.getDocumentComplianceTabResult())} key="1">
              <CheckResult items={mockDetail.items} />
            </TabPane>
            <TabPane tab={i18n.t(LocaleHelper.getDocumentComplianceTabDocument())} key="2">
              <DocumentPreview />
            </TabPane>
            <TabPane tab={i18n.t(LocaleHelper.getDocumentComplianceTabLogs())} key="3">
              <CheckLogs logs={mockDetail.logs} />
            </TabPane>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default DocumentComplianceDetail;