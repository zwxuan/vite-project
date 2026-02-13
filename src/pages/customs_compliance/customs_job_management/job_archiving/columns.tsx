import { TableColumnsType } from 'antd';
import { Button, Space, Tag } from 'antd';
import { CustomsJob } from '@/types/customs_compliance/customs_job_management/job_center';
import i18n from '@/i18n';
import LocaleHelper from '@/utils/locale';
import { CommonLocale } from '@/utils/locale/common';

export const getColumns = (
  onRestore: (record: CustomsJob) => void,
  onView: (record: CustomsJob) => void,
): TableColumnsType<CustomsJob> => [
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
    title: i18n.t(LocaleHelper.getJobCenterCustomerName()),
    dataIndex: 'customer_name',
    key: 'customer_name',
    width: 200,
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
    title: i18n.t(LocaleHelper.getArchiveDate()),
    dataIndex: 'archive_date',
    key: 'archive_date',
    width: 160,
  },
  {
    title: i18n.t(LocaleHelper.getArchiveReason()),
    dataIndex: 'archive_reason',
    key: 'archive_reason',
    width: 160,
  },
  {
    title: i18n.t(LocaleHelper.getArchivedBy()),
    dataIndex: 'archived_by',
    key: 'archived_by',
    width: 100,
  },
  {
    title: i18n.t(CommonLocale.getOperation()),
    key: 'operation',
    fixed: 'right',
    width: 150,
    render: (_, record) => (
      <Space>
        <Button type="link" size="small" onClick={() => onRestore(record)}>
          {i18n.t(LocaleHelper.getRestore())}
        </Button>
        <Button type="link" size="small" onClick={() => onView(record)}>
          {i18n.t(LocaleHelper.getJobCenterView())}
        </Button>
      </Space>
    ),
  },
];
