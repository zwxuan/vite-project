import { ColumnType } from 'antd/es/table';
import { Button, Space, Tag, Progress } from 'antd';
import { JobItem } from '@/types/freight_forwarding/job_management';
import LocaleHelper from '@/utils/locale';
import i18n from '@/i18n';

export const getColumns = (
  onEdit: (record: JobItem) => void
): ColumnType<JobItem>[] => [
  {
    title: i18n.t(LocaleHelper.getJobId()),
    dataIndex: 'jobId',
    key: 'jobId',
    width: 150,
  },
  {
    title: i18n.t(LocaleHelper.getJobType()),
    dataIndex: 'jobType',
    key: 'jobType',
    width: 120,
    render: (text) => {
        const map: any = {
            BOOKING_JOB: '订舱作业',
            WAYBILL_JOB: '运单作业',
            TRUCKING_JOB: '拖车作业',
            CUSTOMS_JOB: '关务作业',
            WAREHOUSE_JOB: '仓储作业',
            DOCUMENT_JOB: '单证作业',
        };
        return map[text] || text;
    }
  },
  {
    title: i18n.t(LocaleHelper.getOrderNo()),
    dataIndex: 'orderNo',
    key: 'orderNo',
    width: 150,
  },
  {
    title: i18n.t(LocaleHelper.getPriority()),
    dataIndex: 'priority',
    key: 'priority',
    width: 100,
    render: (text) => {
        const color = text === 'HIGH' ? 'red' : text === 'MEDIUM' ? 'orange' : 'green';
        return <Tag color={color}>{text}</Tag>;
    }
  },
  {
    title: i18n.t(LocaleHelper.getStatus()),
    dataIndex: 'status',
    key: 'status',
    width: 120,
    render: (text) => <Tag>{text}</Tag>
  },
  {
    title: 'Progress',
    dataIndex: 'progress',
    key: 'progress',
    width: 150,
    render: (text) => <Progress percent={text || 0} size="small" />
  },
  {
    title: i18n.t(LocaleHelper.getDeadline()),
    dataIndex: 'deadline',
    key: 'deadline',
    width: 120,
  },
  {
    title: i18n.t(LocaleHelper.getCreatedAt()),
    dataIndex: 'createTime',
    key: 'createTime',
    width: 120,
  },
  {
    title: i18n.t(LocaleHelper.getActions()),
    key: 'action',
    fixed: 'right',
    width: 120,
    render: (_, record) => (
      <Space size="middle">
        <Button type="link" onClick={() => onEdit(record)}>
          {i18n.t(LocaleHelper.getUpdate())}
        </Button>
        <Button type="link" onClick={() => onEdit(record)}>
          {i18n.t(LocaleHelper.getDetail())}
        </Button>
      </Space>
    ),
  },
];
