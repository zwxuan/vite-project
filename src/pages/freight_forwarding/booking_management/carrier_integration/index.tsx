import React, { useEffect, useMemo, useState } from 'react';
import { Card, Descriptions, Progress, Table, Tag, message } from 'antd';
import CustomIcon from '@/components/custom-icon';
import i18n from '@/i18n';
import LocaleHelper from '@/utils/locale';
import { getCarrierIntegrationList, getCarrierErrorLogs } from '@/api/freight_forwarding/booking_management/booking_service';
import { CarrierIntegrationItem, CarrierErrorLogItem } from '@/types/freight_forwarding/booking_management';
import '@/pages/page_list.less';

const connectionColorMap: Record<CarrierIntegrationItem['connectionStatus'], string> = {
  NORMAL: 'green',
  ABNORMAL: 'red',
};

const errorStatusColorMap: Record<CarrierErrorLogItem['status'], string> = {
  RETRYING: 'orange',
  RESOLVED: 'green',
};

const CarrierIntegration: React.FC = () => {
  const [integrationList, setIntegrationList] = useState<CarrierIntegrationItem[]>([]);
  const [errorLogs, setErrorLogs] = useState<CarrierErrorLogItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [logLoading, setLogLoading] = useState(false);
  const [selectedCarrier, setSelectedCarrier] = useState<CarrierIntegrationItem | null>(null);

  const detailByCarrierId = useMemo(
    () => ({
      'C-001': {
        address: 'edi.cosco.com:8080',
        username: 'SHFREIGHT001',
        authType: i18n.t(LocaleHelper.getCarrierIntegrationDetailAuthCertificate()),
        lastTest: '10:30',
        messageStats: { total: 128, success: 122, failed: 4, retrying: 2 },
      },
      'C-002': {
        address: 'api.maersk.com/v1/edi',
        username: 'MAERSK_SH',
        authType: i18n.t(LocaleHelper.getCarrierIntegrationDetailAuthToken()),
        lastTest: '10:25',
        messageStats: { total: 96, success: 92, failed: 1, retrying: 3 },
      },
      'C-003': {
        address: 'mail.msc.com/edi',
        username: 'MSC_BKG',
        authType: i18n.t(LocaleHelper.getCarrierIntegrationDetailAuthMail()),
        lastTest: '09:40',
        messageStats: { total: 64, success: 45, failed: 12, retrying: 7 },
      },
      'C-004': {
        address: 'api.crcn.com/edi',
        username: 'CR_BOOK',
        authType: i18n.t(LocaleHelper.getCarrierIntegrationDetailAuthToken()),
        lastTest: '10:20',
        messageStats: { total: 110, success: 107, failed: 1, retrying: 2 },
      },
      'C-005': {
        address: '-',
        username: 'OOCL_OP',
        authType: i18n.t(LocaleHelper.getCarrierIntegrationDetailAuthManual()),
        lastTest: '-',
        messageStats: { total: 38, success: 36, failed: 1, retrying: 1 },
      },
    }),
    []
  );

  useEffect(() => {
    loadIntegration();
    loadLogs();
  }, []);

  const loadIntegration = async () => {
    setLoading(true);
    try {
      const res = await getCarrierIntegrationList();
      if (res.success && res.data) {
        setIntegrationList(res.data.list);
        if (!selectedCarrier && res.data.list.length > 0) {
          setSelectedCarrier(res.data.list[0]);
        }
      }
    } catch (error) {
      message.error('Load failed');
    }
    setLoading(false);
  };

  const loadLogs = async () => {
    setLogLoading(true);
    try {
      const res = await getCarrierErrorLogs();
      if (res.success && res.data) {
        setErrorLogs(res.data.list);
      }
    } catch (error) {
      message.error('Load failed');
    }
    setLogLoading(false);
  };

  const integrationColumns = [
    {
      title: i18n.t(LocaleHelper.getCarrierIntegrationCarrier()),
      dataIndex: 'carrierName',
      key: 'carrierName',
      width: 140,
    },
    {
      title: i18n.t(LocaleHelper.getCarrierIntegrationType()),
      dataIndex: 'integrationType',
      key: 'integrationType',
      width: 120,
    },
    {
      title: i18n.t(LocaleHelper.getCarrierIntegrationStatus()),
      dataIndex: 'connectionStatus',
      key: 'connectionStatus',
      width: 120,
      render: (status: CarrierIntegrationItem['connectionStatus']) => (
        <Tag color={connectionColorMap[status]}>
          {status === 'NORMAL' ? i18n.t(LocaleHelper.getCarrierIntegrationStatusNormal()) : i18n.t(LocaleHelper.getCarrierIntegrationStatusAbnormal())}
        </Tag>
      ),
    },
    {
      title: i18n.t(LocaleHelper.getCarrierIntegrationLastSync()),
      dataIndex: 'lastSync',
      key: 'lastSync',
      width: 120,
    },
    {
      title: i18n.t(LocaleHelper.getCarrierIntegrationSuccessRate()),
      dataIndex: 'successRate',
      key: 'successRate',
      width: 200,
      render: (val: number) => <Progress percent={val} size="small" />,
    },
  ];

  const logColumns = [
    {
      title: i18n.t(LocaleHelper.getCarrierIntegrationLogTime()),
      dataIndex: 'time',
      key: 'time',
      width: 120,
    },
    {
      title: i18n.t(LocaleHelper.getCarrierIntegrationLogType()),
      dataIndex: 'messageType',
      key: 'messageType',
      width: 120,
    },
    {
      title: i18n.t(LocaleHelper.getCarrierIntegrationLogMessage()),
      dataIndex: 'errorMessage',
      key: 'errorMessage',
      width: 220,
    },
    {
      title: i18n.t(LocaleHelper.getCarrierIntegrationLogStatus()),
      dataIndex: 'status',
      key: 'status',
      width: 120,
      render: (status: CarrierErrorLogItem['status']) => (
        <Tag color={errorStatusColorMap[status]}>
          {status === 'RETRYING' ? i18n.t(LocaleHelper.getCarrierIntegrationLogStatusRetrying()) : i18n.t(LocaleHelper.getCarrierIntegrationLogStatusResolved())}
        </Tag>
      ),
    },
  ];

  const detailInfo = selectedCarrier ? detailByCarrierId[selectedCarrier.carrierId as keyof typeof detailByCarrierId] : null;
  const messageStats = detailInfo?.messageStats || { total: 0, success: 0, failed: 0, retrying: 0 };

  return (
    <div style={{ overflowY: 'auto', overflowX: 'hidden', height: 'calc(100vh - 80px)' }}>
      <div className="nc-bill-header-area">
        <div className="header-title-search-area">
          <div className="BillHeadInfoWrap">
            <span className="bill-info-title" style={{ marginLeft: '10px' }}>
              <CustomIcon type="icon-Currency" style={{ color: 'red', fontSize: '24px' }} />
              {i18n.t(LocaleHelper.getCarrierIntegrationTitle())}
            </span>
          </div>
        </div>
      </div>

      <div style={{ padding: '16px' }}>
        <Card title={i18n.t(LocaleHelper.getCarrierIntegrationListTitle())} bordered={false} style={{ marginBottom: 16 }}>
          <Table<CarrierIntegrationItem>
            columns={integrationColumns}
            dataSource={integrationList}
            rowKey="carrierId"
            size="small"
            bordered={true}
            loading={loading}
            pagination={false}
            scroll={{ x: 'max-content' }}
            onRow={(record) => ({
              onClick: () => setSelectedCarrier(record),
            })}
          />
        </Card>
        <Card title={i18n.t(LocaleHelper.getCarrierIntegrationDetailTitle())} bordered={false} style={{ marginBottom: 16 }}>
          <Descriptions size="small" column={2} title={i18n.t(LocaleHelper.getCarrierIntegrationDetailInfoTitle())}>
            <Descriptions.Item label={i18n.t(LocaleHelper.getCarrierIntegrationDetailCarrier())}>
              {selectedCarrier?.carrierName || '-'}
            </Descriptions.Item>
            <Descriptions.Item label={i18n.t(LocaleHelper.getCarrierIntegrationDetailType())}>
              {selectedCarrier?.integrationType || '-'}
            </Descriptions.Item>
            <Descriptions.Item label={i18n.t(LocaleHelper.getCarrierIntegrationDetailAddress())}>
              {detailInfo?.address || '-'}
            </Descriptions.Item>
            <Descriptions.Item label={i18n.t(LocaleHelper.getCarrierIntegrationDetailUsername())}>
              {detailInfo?.username || '-'}
            </Descriptions.Item>
            <Descriptions.Item label={i18n.t(LocaleHelper.getCarrierIntegrationDetailAuth())}>
              {detailInfo?.authType || '-'}
            </Descriptions.Item>
            <Descriptions.Item label={i18n.t(LocaleHelper.getCarrierIntegrationDetailStatus())}>
              {selectedCarrier ? (
                <Tag color={connectionColorMap[selectedCarrier.connectionStatus]}>
                  {selectedCarrier.connectionStatus === 'NORMAL'
                    ? i18n.t(LocaleHelper.getCarrierIntegrationStatusNormal())
                    : i18n.t(LocaleHelper.getCarrierIntegrationStatusAbnormal())}
                </Tag>
              ) : (
                '-'
              )}
            </Descriptions.Item>
            <Descriptions.Item label={i18n.t(LocaleHelper.getCarrierIntegrationDetailLastTest())}>
              {detailInfo?.lastTest || '-'}
            </Descriptions.Item>
            <Descriptions.Item label={i18n.t(LocaleHelper.getCarrierIntegrationDetailLastSync())}>
              {selectedCarrier?.lastSync || '-'}
            </Descriptions.Item>
            <Descriptions.Item label={i18n.t(LocaleHelper.getCarrierIntegrationDetailSuccessRate())} span={2}>
              {selectedCarrier ? <Progress percent={selectedCarrier.successRate} size="small" /> : '-'}
            </Descriptions.Item>
          </Descriptions>
        </Card>
        <Card title={i18n.t(LocaleHelper.getCarrierIntegrationStatsTitle())} bordered={false} style={{ marginBottom: 16 }}>
          <Descriptions size="small" column={4}>
            <Descriptions.Item label={i18n.t(LocaleHelper.getCarrierIntegrationStatsTotal())}>{messageStats.total}</Descriptions.Item>
            <Descriptions.Item label={i18n.t(LocaleHelper.getCarrierIntegrationStatsSuccess())}>{messageStats.success}</Descriptions.Item>
            <Descriptions.Item label={i18n.t(LocaleHelper.getCarrierIntegrationStatsFailed())}>{messageStats.failed}</Descriptions.Item>
            <Descriptions.Item label={i18n.t(LocaleHelper.getCarrierIntegrationStatsRetrying())}>{messageStats.retrying}</Descriptions.Item>
          </Descriptions>
        </Card>
        <Card title={i18n.t(LocaleHelper.getCarrierIntegrationLogTitle())} bordered={false}>
          <Table<CarrierErrorLogItem>
            columns={logColumns}
            dataSource={errorLogs}
            rowKey="logId"
            size="small"
            bordered={true}
            loading={logLoading}
            pagination={false}
            scroll={{ x: 'max-content' }}
          />
        </Card>
      </div>
    </div>
  );
};

export default CarrierIntegration;
