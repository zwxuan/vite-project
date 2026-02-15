import { ColumnsType } from 'antd/es/table';
import i18n from '@/i18n';
import LocaleHelper from '@/utils/locale';
import { Tag, Space,Popconfirm } from 'antd';
import { SecurityFiling } from '@/types/customs_compliance/manifest_security/security_filing';

export const getColumns = (onAction: (key: string, record: SecurityFiling) => void): ColumnsType<SecurityFiling> => [
  {
    title: i18n.t(LocaleHelper.getSecurityFilingManagementColumnsFilingNo()),
    dataIndex: 'filing_no',
    key: 'filing_no',
    width: 150,
  },
  {
    title: i18n.t(LocaleHelper.getSecurityFilingManagementColumnsType()),
    dataIndex: 'type',
    key: 'type',
    width: 80,
  },
  {
    title: i18n.t(LocaleHelper.getSecurityFilingManagementColumnsVessel()),
    dataIndex: 'vessel_name',
    key: 'vessel_name',
    width: 150,
  },
  {
    title: i18n.t(LocaleHelper.getSecurityFilingManagementColumnsVoyage()),
    dataIndex: 'voyage_number',
    key: 'voyage_number',
    width: 100,
  },
  {
    title: i18n.t(LocaleHelper.getSecurityFilingManagementColumnsMbl()),
    dataIndex: 'mbl_no',
    key: 'mbl_no',
    width: 150,
  },
  {
    title: i18n.t(LocaleHelper.getSecurityFilingManagementColumnsHbl()),
    dataIndex: 'hbl_no',
    key: 'hbl_no',
    width: 150,
  },
  {
    title: i18n.t(LocaleHelper.getSecurityFilingManagementColumnsPol()),
    dataIndex: 'pol',
    key: 'pol',
    width: 100,
  },
  {
    title: i18n.t(LocaleHelper.getSecurityFilingManagementColumnsPod()),
    dataIndex: 'pod',
    key: 'pod',
    width: 100,
  },
  {
    title: i18n.t(LocaleHelper.getSecurityFilingManagementColumnsStatus()),
    dataIndex: 'status',
    key: 'status',
    width: 100,
    render: (status) => {
        let color = 'default';
        if (status === '已接受' || status === 'Accepted') color = 'success';
        if (status === '处理中' || status === 'Processing') color = 'processing';
        if (status === '被拒绝' || status === 'Rejected' || status === 'Amendment Needed') color = 'error';
        if (status === '待申报' || status === 'Pending') color = 'warning';
        return <Tag color={color}>{status}</Tag>;
    }
  },
  {
    title: i18n.t(LocaleHelper.getSecurityFilingManagementColumnsResponseCode()),
    dataIndex: 'response_code',
    key: 'response_code',
    width: 100,
  },
  {
    title: i18n.t(LocaleHelper.getSecurityFilingManagementColumnsSourceType()),
    dataIndex: 'source_type',
    key: 'source_type',
    width: 100,
    render: (text) => {
        if (text === 'manifest') return '舱单';
        if (text === 'booking') return '订舱';
        if (text === 'manual') return '手工';
        return text;
    }
  },
  {
    title: i18n.t(LocaleHelper.getSecurityFilingManagementColumnsSourceNo()),
    dataIndex: 'source_no',
    key: 'source_no',
    width: 150,
  },
  {
    title: i18n.t(LocaleHelper.getSecurityFilingManagementColumnsSubmissionTime()),
    dataIndex: 'submission_time',
    key: 'submission_time',
    width: 180,
  },
  {
    title: i18n.t(LocaleHelper.getSecurityFilingManagementColumnsOperation()),
    key: 'operation',
    fixed: 'right',
    width: 140,
    render: (_, record) => (
      <Space size="middle">
        <a onClick={() => onAction('view', record)}>{i18n.t(LocaleHelper.getViewDetail()) || '详情'}</a>
        <a onClick={() => onAction('edit', record)}>{i18n.t(LocaleHelper.getEdit()) || '编辑'}</a>
        {(record.status === 'Pending' || record.status === '待申报') && (
            <Popconfirm title="Confirm to submit?" onConfirm={() => onAction('submit', record)}>
                <a>Submit</a>
            </Popconfirm>
        )}
        <a onClick={() => onAction('track', record)}>{i18n.t(LocaleHelper.getStatus()) || '状态'}</a>
      </Space>
    ),
  },
];
