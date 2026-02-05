import { ColumnsType } from 'antd/es/table';
import { Button, Space, Tag } from 'antd';
import { CustomsJob } from '@/api/customs_compliance/customs_job_management/job_center_service';
import i18n from '@/i18n';
import LocaleHelper from '@/utils/locale';

export const getColumns = (
  onView: (record: CustomsJob) => void,
  onEdit: (record: CustomsJob) => void,
  onAssign: (record: CustomsJob) => void,
): ColumnsType<CustomsJob> => [
  {
    title: i18n.t(LocaleHelper.getJobCenterJobId()),
    dataIndex: 'job_id',
    key: 'job_id',
    width: 150,
    fixed: 'left',
  },
  {
    title: i18n.t(LocaleHelper.getJobCenterUpstreamOrderNo()),
    dataIndex: 'upstream_order_no',
    key: 'upstream_order_no',
    width: 160,
  },
  {
    title: i18n.t(LocaleHelper.getJobCenterDeclarationNo()),
    dataIndex: 'declaration_no',
    key: 'declaration_no',
    width: 160,
  },
  {
    title: i18n.t(LocaleHelper.getJobCenterBusinessType()),
    dataIndex: 'business_type',
    key: 'business_type',
    width: 120,
    render: (type: string) => {
        const map: any = {
            'import_customs': '进口报关',
            'export_customs': '出口报关',
            'transfer_customs': '转关作业'
        };
        return map[type] || type;
    }
  },
  {
    title: i18n.t(LocaleHelper.getJobCenterTransportMode()),
    dataIndex: 'transport_mode',
    key: 'transport_mode',
    width: 100,
  },
  {
    title: i18n.t(LocaleHelper.getJobCenterCustomerName()),
    dataIndex: 'customer_name',
    key: 'customer_name',
    width: 200,
  },
  {
    title: i18n.t(LocaleHelper.getJobCenterStatus()),
    dataIndex: 'status',
    key: 'status',
    width: 120,
    render: (status: string) => {
        let color = 'default';
        let text = status;
        if (status === 'assigned') { color = 'blue'; text = i18n.t(LocaleHelper.getJobCenterProcessing()); }
        if (status === 'processing') { color = 'processing'; text = i18n.t(LocaleHelper.getJobCenterProcessing()); }
        if (status === 'pending_assign') { color = 'warning'; text = i18n.t(LocaleHelper.getJobCenterPending()); }
        if (status === 'completed') { color = 'success'; text = i18n.t(LocaleHelper.getJobCenterCompleted()); }
        return <Tag color={color}>{text}</Tag>;
    }
  },
  {
    title: i18n.t(LocaleHelper.getJobCenterSlaStatus()),
    dataIndex: 'sla_status',
    key: 'sla_status',
    width: 120,
    render: (status: string) => {
        let color = 'success';
        if (status === 'warning') color = 'warning';
        if (status === 'overdue') color = 'error';
        return <Tag color={color}>{status?.toUpperCase()}</Tag>;
    }
  },
  {
    title: i18n.t(LocaleHelper.getJobCenterAssignedTo()),
    dataIndex: 'assigned_to_name',
    key: 'assigned_to_name',
    width: 120,
  },
  {
    title: i18n.t(LocaleHelper.getJobCenterCreateTime()),
    dataIndex: 'created_at',
    key: 'created_at',
    width: 180,
  },
  {
    title: i18n.t(LocaleHelper.getJobCenterOperation()),
    key: 'operation',
    fixed: 'right',
    width: 200,
    render: (_, record) => (
      <Space>
        <Button type="link" size="small" onClick={() => onView(record)}>
          {i18n.t(LocaleHelper.getJobCenterView())}
        </Button>
        <Button type="link" size="small" onClick={() => onEdit(record)}>
          {i18n.t(LocaleHelper.getJobCenterEdit())}
        </Button>
        <Button type="link" size="small" onClick={() => onAssign(record)} disabled={record.status === 'completed'}>
          {i18n.t(LocaleHelper.getJobCenterAssign())}
        </Button>
      </Space>
    ),
  },
];
