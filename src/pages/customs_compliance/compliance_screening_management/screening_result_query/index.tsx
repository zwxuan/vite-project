import React from 'react';
import { Card, Descriptions, Badge, Table, Button, Tooltip } from 'antd';
import CustomIcon from '@/components/custom-icon';
import LocaleHelper from '@/utils/locale';
import { useNavigate } from 'react-router-dom';
import i18n from '@/i18n';

const ScreeningResultQuery: React.FC = () => {
  const navigate = useNavigate();

  const handleCancel = () => {
      navigate(-1);
  };

  return (
    <div style={{ overflowY: 'auto', overflowX: 'hidden', height: 'calc(100vh - 80px)' }}>
      <div className="nc-bill-header-area">
        <div className="header-title-search-area">
          <div className="BillHeadInfoWrap">
            <div className="bill-info-title">
              <span style={{ display: 'flex', alignItems: 'center' }}>
                <CustomIcon type="icon-Currency" style={{ color: 'red', fontSize: '24px', marginRight: '8px' }} />
                {i18n.t(LocaleHelper.getScreeningResultQueryPageTitle())}
                <Tooltip
                  title={
                    <div className='rul_title_tooltip' style={{ backgroundColor: '#fff', color: '#000' }}>
                      <ol style={{ color: '#666666', fontSize: '12px', paddingLeft: '2px' }}>
                        <li style={{ marginBottom: '10px' }}>
                          <span style={{ marginRight: '10px', backgroundColor: '#f1f1f1', padding: '2px 10px' }}>
                            <b>{i18n.t(LocaleHelper.getScreeningResultQueryPageHelpLabel())}</b>
                          </span>
                          <ul style={{ listStyleType: 'circle', paddingLeft: '20px', marginTop: '10px', lineHeight: '1.8' }}>
                            <li><b>{i18n.t(LocaleHelper.getScreeningResultQueryPageHelpRole())}</b>{i18n.t(LocaleHelper.getScreeningResultQueryPageHelpRoleDesc())}</li>
                            <li><b>{i18n.t(LocaleHelper.getScreeningResultQueryPageHelpOrigin())}</b>{i18n.t(LocaleHelper.getScreeningResultQueryPageHelpOriginDesc())}</li>
                            <li><b>{i18n.t(LocaleHelper.getScreeningResultQueryPageHelpFunc())}</b>{i18n.t(LocaleHelper.getScreeningResultQueryPageHelpFuncDesc())}</li>
                          </ul>
                        </li>
                      </ol>
                    </div>
                  }
                  color='white'
                >
                  <i className='iconfont icon-bangzhutishi' style={{ cursor: 'pointer', marginLeft: '10px' }}></i>
                </Tooltip>
              </span>
            </div>
          </div>
        </div>
        <div className="header-button-area">
            <span className="button-app-wrapper header-button-area-button-app-wrapper"></span>
            <div style={{ display: "flex" }}>
                <div className="buttonGroup-component">
                    <div className="u-button-group">
                        <Button onClick={handleCancel}>{i18n.t(LocaleHelper.getScreeningResultQueryBtnBack())}</Button>
                    </div>
                </div>
            </div>
        </div>
      </div>
      <div style={{ padding: '20px' }}>
        <Card title={i18n.t(LocaleHelper.getScreeningResultQuerySectionResult())} className="mb-4">
            <Descriptions bordered>
            <Descriptions.Item label={i18n.t(LocaleHelper.getScreeningResultQueryFieldScreeningId())}>SCR-20231001-001</Descriptions.Item>
            <Descriptions.Item label={i18n.t(LocaleHelper.getScreeningResultQueryFieldTime())}>2023-10-01 10:30:00</Descriptions.Item>
            <Descriptions.Item label={i18n.t(LocaleHelper.getScreeningResultQueryFieldJobId())}>JOB-COM-20231001-001</Descriptions.Item>
            <Descriptions.Item label={i18n.t(LocaleHelper.getScreeningResultQueryFieldRiskLevel())}><Badge status="processing" text="中风险" /></Descriptions.Item>
            <Descriptions.Item label={i18n.t(LocaleHelper.getScreeningResultQueryFieldTotalHits())}>2</Descriptions.Item>
            <Descriptions.Item label={i18n.t(LocaleHelper.getScreeningResultQueryFieldStatus())}>待处理</Descriptions.Item>
            </Descriptions>
        </Card>
        <Card title={i18n.t(LocaleHelper.getScreeningResultQuerySectionHits())} style={{ marginTop: '20px' }}>
            <Table
                dataSource={[
                    { key: '1', type: '发货人', entity: '上海电子', db: 'OFAC', match: '85%', risk: '高风险', status: '待处理' },
                    { key: '2', type: '货物', entity: '测量设备', db: 'BIS', match: '92%', risk: '中风险', status: '待处理' },
                ]}
                columns={[
                    { title: i18n.t(LocaleHelper.getScreeningResultQueryColType()), dataIndex: 'type' },
                    { title: i18n.t(LocaleHelper.getScreeningResultQueryColEntity()), dataIndex: 'entity' },
                    { title: i18n.t(LocaleHelper.getScreeningResultQueryColDb()), dataIndex: 'db' },
                    { title: i18n.t(LocaleHelper.getScreeningResultQueryColMatch()), dataIndex: 'match' },
                    { title: i18n.t(LocaleHelper.getScreeningResultQueryColRisk()), dataIndex: 'risk' },
                    { title: i18n.t(LocaleHelper.getScreeningResultQueryColStatus()), dataIndex: 'status' },
                ]}
                pagination={false}
            />
        </Card>
      </div>
    </div>
  );
};
export default ScreeningResultQuery;
