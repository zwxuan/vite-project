import React, { useState } from 'react';
import { Card, Row, Col, Button, Radio, Input, Space, Table, Tag, Timeline, message } from 'antd';
import CustomIcon from '@/components/custom-icon';
import LocaleHelper from '@/utils/locale';
import { useNavigate } from 'react-router-dom';
import i18n from '@/i18n';
import '@/pages/page_list.less';
import './index.less'; // Assuming we might want some custom styles, but inline is okay for now or reuse existing

const { TextArea } = Input;

const HitProcessing: React.FC = () => {
  const navigate = useNavigate();
  const [decision, setDecision] = useState<string>('false_positive');
  const [comments, setComments] = useState<string>('');

  const handleCancel = () => {
      navigate(-1);
  };

  const handleSubmit = () => {
      message.success(i18n.t(LocaleHelper.getSuccess()));
      setTimeout(() => navigate(-1), 1000);
  };

  // Mock Data
  const basicInfo = {
      screeningId: 'SCR-20231027-001',
      entityName: 'Shanghai Electronics Co.',
      riskLevel: 'High',
      listSource: 'SDN List (OFAC)',
  };

  const comparisonData = [
      {
          key: '1',
          field: i18n.t(LocaleHelper.getHitProcessingFieldName()),
          inputValue: 'Shanghai Electronics Co.',
          listValue: 'Shanghai Electronics Company Ltd.',
          matchScore: 95,
      },
      {
          key: '2',
          field: i18n.t(LocaleHelper.getHitProcessingFieldAddress()),
          inputValue: '123 Zhangjiang Rd, Shanghai',
          listValue: 'No. 123, Zhangjiang High-Tech Park, Shanghai, China',
          matchScore: 88,
      },
      {
          key: '3',
          field: i18n.t(LocaleHelper.getHitProcessingFieldCountry()),
          inputValue: 'CN',
          listValue: 'China',
          matchScore: 100,
      },
  ];

  const columns = [
      {
          title: i18n.t(LocaleHelper.getHitProcessingColField()),
          dataIndex: 'field',
          key: 'field',
          width: '20%',
      },
      {
          title: i18n.t(LocaleHelper.getHitProcessingColInputValue()),
          dataIndex: 'inputValue',
          key: 'inputValue',
          width: '35%',
      },
      {
          title: i18n.t(LocaleHelper.getHitProcessingColListValue()),
          dataIndex: 'listValue',
          key: 'listValue',
          width: '35%',
          render: (text: string) => <span style={{ color: 'red' }}>{text}</span>, // Highlight list value
      },
      {
          title: i18n.t(LocaleHelper.getHitProcessingColMatchScore()),
          dataIndex: 'matchScore',
          key: 'matchScore',
          width: '10%',
          render: (score: number) => (
              <Tag color={score > 90 ? 'red' : score > 70 ? 'orange' : 'green'}>
                  {score}%
              </Tag>
          ),
      },
  ];

  return (
    <div style={{ overflowY: 'auto', overflowX: 'hidden', height: 'calc(100vh - 80px)' }}>
       <div className="nc-bill-header-area">
        <div className="header-title-search-area">
          <div className="BillHeadInfoWrap">
            <div className="bill-info-title">
              <span>
                <CustomIcon type="icon-Currency" style={{ color: 'red', fontSize: '24px', marginRight: '8px' }} />
                {i18n.t(LocaleHelper.getHitProcessingPageTitle())}
              </span>
            </div>
          </div>
        </div>
        <div className="header-button-area">
            <span className="button-app-wrapper header-button-area-button-app-wrapper"></span>
            <div style={{ display: "flex" }}>
                <div className="buttonGroup-component">
                    <div className="u-button-group">
                        <Button onClick={handleCancel}>{i18n.t(LocaleHelper.getBack())}</Button>
                    </div>
                </div>
            </div>
        </div>
      </div>
      
      <div style={{ padding: '20px' }}>
        {/* Basic Info */}
        <Card title={i18n.t(LocaleHelper.getHitProcessingSectionBasicInfo())} style={{ marginBottom: '20px' }}>
            <Row gutter={24}>
                <Col span={6}>
                    <p><strong>{i18n.t(LocaleHelper.getScreeningTaskCenterColScreeningId())}:</strong> {basicInfo.screeningId}</p>
                </Col>
                <Col span={6}>
                    <p><strong>{i18n.t(LocaleHelper.getHitProcessingFieldName())}:</strong> {basicInfo.entityName}</p>
                </Col>
                <Col span={6}>
                    <p><strong>{i18n.t(LocaleHelper.getScreeningTaskCenterColRiskLevel())}:</strong> <Tag color="red">{basicInfo.riskLevel}</Tag></p>
                </Col>
                <Col span={6}>
                    <p><strong>{i18n.t(LocaleHelper.getHitProcessingFieldListSource())}:</strong> {basicInfo.listSource}</p>
                </Col>
            </Row>
        </Card>

        {/* Comparison Table */}
        <Card title={i18n.t(LocaleHelper.getHitProcessingSectionComparison())} style={{ marginBottom: '20px' }}>
            <div className='nc-bill-table-area'>
                <Table 
                    columns={columns} 
                    dataSource={comparisonData} 
                    pagination={false} 
                    bordered
                    size="small"
                />
            </div>
        </Card>

        <Row gutter={24}>
            {/* Decision Section */}
            <Col span={16}>
                <Card title={i18n.t(LocaleHelper.getHitProcessingSectionDecision())} style={{ height: '100%' }}>
                    <Space direction="vertical" style={{ width: '100%' }} size="large">
                        <div>
                            <p style={{ marginBottom: '10px' }}><strong>{i18n.t(LocaleHelper.getHitProcessingLabelReason())}:</strong></p>
                            <Radio.Group onChange={(e) => setDecision(e.target.value)} value={decision}>
                                <Radio value="false_positive">{i18n.t(LocaleHelper.getHitProcessingDecisionFalsePositive())}</Radio>
                                <Radio value="true_match">{i18n.t(LocaleHelper.getHitProcessingDecisionTrueMatch())}</Radio>
                                <Radio value="escalate">{i18n.t(LocaleHelper.getHitProcessingDecisionEscalate())}</Radio>
                            </Radio.Group>
                        </div>
                        
                        <div>
                            <p style={{ marginBottom: '10px' }}><strong>{i18n.t(LocaleHelper.getHitProcessingLabelComments())}:</strong></p>
                            <TextArea 
                                rows={4} 
                                value={comments}
                                onChange={(e) => setComments(e.target.value)}
                                placeholder="Please enter your comments..."
                            />
                        </div>

                        <div style={{ textAlign: 'right' }}>
                            <Space>
                                <Button onClick={handleCancel}>{i18n.t(LocaleHelper.getHitProcessingBtnCancel())}</Button>
                                <Button type="primary" onClick={handleSubmit}>{i18n.t(LocaleHelper.getHitProcessingBtnSubmit())}</Button>
                            </Space>
                        </div>
                    </Space>
                </Card>
            </Col>

            {/* Audit Log */}
            <Col span={8}>
                <Card title={i18n.t(LocaleHelper.getHitProcessingSectionAuditLog())} style={{ height: '100%' }}>
                    <Timeline>
                        <Timeline.Item color="green">
                            <p><strong>System</strong> 2023-10-27 10:00:00</p>
                            <p>Screening initiated.</p>
                        </Timeline.Item>
                        <Timeline.Item color="red">
                            <p><strong>System</strong> 2023-10-27 10:00:05</p>
                            <p>Hit found in SDN List. Match Score: 95%.</p>
                        </Timeline.Item>
                        <Timeline.Item color="blue">
                            <p><strong>Pending Review</strong></p>
                            <p>Waiting for compliance officer.</p>
                        </Timeline.Item>
                    </Timeline>
                </Card>
            </Col>
        </Row>
      </div>
    </div>
  );
};

export default HitProcessing;
