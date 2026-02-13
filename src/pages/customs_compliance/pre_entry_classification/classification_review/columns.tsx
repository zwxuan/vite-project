import { ColumnsType } from 'antd/es/table';
import { Tag, Space } from 'antd';
import { ReviewTask } from '@/types/customs_compliance/pre_entry_classification/classification_review';
import { ClassificationReviewLocale } from '@/utils/locale/customs_compliance/pre_entry_classification/classification_review';
import i18n from '@/i18n';

export const getColumns = (
  handleReview: (record: ReviewTask) => void
): ColumnsType<ReviewTask> => [
  {
    title: i18n.t(ClassificationReviewLocale.getClassificationReviewReviewNo()),
    dataIndex: 'id',
    key: 'id',
    width: 150,
  },
  {
    title: i18n.t(ClassificationReviewLocale.getClassificationReviewInvoiceNo()),
    dataIndex: 'invoice_no',
    key: 'invoice_no',
    width: 150,
  },
  {
    title: i18n.t(ClassificationReviewLocale.getClassificationReviewProductName()),
    dataIndex: 'product_name',
    key: 'product_name',
    width: 200,
  },
  {
      title: i18n.t(ClassificationReviewLocale.getClassificationReviewHsCode()),
      dataIndex: 'hs_code',
      key: 'hs_code',
      width: 120,
  },
  {
      title: i18n.t(ClassificationReviewLocale.getClassificationReviewDeclaredPrice()),
      dataIndex: 'declared_price',
      key: 'declared_price',
      width: 120,
      render: (val, record) => `${record.currency} ${val}`,
  },
  {
    title: i18n.t(ClassificationReviewLocale.getClassificationReviewStatus()),
    dataIndex: 'status',
    key: 'status',
    width: 120,
    render: (status) => {
        let color = 'default';
        if (status === 'Approved') color = 'green';
        if (status === 'Rejected') color = 'red';
        if (status === 'Pending') color = 'gold';
        return <Tag color={color}>{status}</Tag>;
    }
  },
  {
      title: i18n.t(ClassificationReviewLocale.getClassificationReviewReviewer()),
      dataIndex: 'reviewer',
      key: 'reviewer',
      width: 120,
  },
  {
      title: i18n.t(ClassificationReviewLocale.getClassificationReviewReviewTime()),
      dataIndex: 'review_time',
      key: 'review_time',
      width: 180,
  },
  {
    title: '操作',
    key: 'action',
    width: 100,
    fixed: 'right',
    render: (_, record) => (
      <Space size="middle">
        <a onClick={() => handleReview(record)}>审核</a>
      </Space>
    ),
  },
];
