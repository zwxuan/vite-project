import { ColumnType } from 'antd/es/table';
import { Button, Tag } from 'antd';
import { JobItem } from '@/types/freight_forwarding/job_management';
import LocaleHelper from '@/utils/locale';
import i18n from '@/i18n';

export const getColumns = (
  onAssign: (record: JobItem) => void
): ColumnType<JobItem>[] => [
  {
    title: i18n.t(LocaleHelper.getJobId()),
    dataIndex: 'jobId',
    key: 'jobId',
    width: 120,
  },
  {
    title: i18n.t(LocaleHelper.getJobType()),
    dataIndex: 'jobType',
    key: 'jobType',
    width: 100,
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
    width: 120,
  },
  {
    title: i18n.t(LocaleHelper.getPriority()),
    dataIndex: 'priority',
    key: 'priority',
    width: 80,
    render: (text) => {
        const color = text === 'HIGH' ? 'red' : text === 'MEDIUM' ? 'orange' : 'green';
        return <Tag color={color}>{text}</Tag>;
    }
  },
  {
    title: '客户',
    dataIndex: 'customerName',
    key: 'customerName',
    width: 150,
    render: () => 'ABC Company' // Mock
  },
  {
    title: '预计工期',
    dataIndex: 'estDuration',
    key: 'estDuration',
    width: 100,
    render: () => '24h' // Mock
  },
  {
    title: i18n.t(LocaleHelper.getActions()),
    key: 'action',
    width: 100,
    render: (_, record) => (
        <Button type="link" onClick={() => onAssign(record)}>
          {i18n.t(LocaleHelper.getAssign())}
        </Button>
    ),
  },
];
