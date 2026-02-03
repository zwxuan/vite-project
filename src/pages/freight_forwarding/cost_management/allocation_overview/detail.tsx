import '@/pages/page_list.less';
import React, { useEffect, useMemo, useState } from 'react';
import { Button, Card, Col, Row, Table, Tabs, Tag, Steps, Modal, Radio, message, Space, InputNumber, Descriptions, Statistic, Divider } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { ArrowLeftOutlined } from '@ant-design/icons';
import CustomIcon from '@/components/custom-icon';
import LocaleHelper from '@/utils/locale';
import i18n from '@/i18n';
import { AllocationItem, queryAllocationList } from '@/api/freight_forwarding/cost_management/allocation_service';

const AllocationOverviewDetail: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const [loading, setLoading] = useState(false);
  const [detail, setDetail] = useState<AllocationItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [allocationType, setAllocationType] = useState('standard');
  const [salesWeight, setSalesWeight] = useState<number>(50);
  const [opsWeight, setOpsWeight] = useState<number>(50);

  useEffect(() => {
    if (searchParams.get('mode') === 'allocate') {
      setIsModalOpen(true);
    }
  }, [searchParams]);

  const handleModalOk = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setIsModalOpen(false);
      message.success(i18n.t(LocaleHelper.getAllocationOverviewModalSuccess()));
      if (detail) {
        setDetail({ ...detail, status: 'allocated' });
      }
      navigate(`/cost_management/allocation_overview/detail/${id}`, { replace: true });
    }, 1000);
  };

  const handleReallocate = () => {
    setIsModalOpen(true);
  };

  useEffect(() => {
    setLoading(true);
    queryAllocationList({}).then((res) => {
      const found = res.data.find((item) => item.id === id) || res.data[0] || null;
      setDetail(found);
    }).finally(() => {
      setLoading(false);
    });
  }, [id]);

  const statusTag = useMemo(() => {
    if (!detail) {
      return null;
    }
    let color: 'success' | 'warning' | 'error' | 'processing' | undefined;
    let text = detail.status;
    if (detail.status === 'allocated') {
      color = 'success';
      text = i18n.t(LocaleHelper.getAllocationOverviewStatusAllocated());
    } else if (detail.status === 'pending') {
      color = 'warning';
      text = i18n.t(LocaleHelper.getAllocationOverviewStatusPending());
    } else if (detail.status === 'exception') {
      color = 'error';
      text = i18n.t(LocaleHelper.getAllocationOverviewStatusException());
    }
    return <Tag color={color}>{text}</Tag>;
  }, [detail]);

  const recordColumns: ColumnsType<AllocationItem> = [
    {
      title: i18n.t(LocaleHelper.getAllocationOverviewColOrderNo()),
      dataIndex: 'orderNo',
      key: 'orderNo',
      width: 150,
    },
    {
      title: i18n.t(LocaleHelper.getAllocationOverviewColCustomer()),
      dataIndex: 'customerName',
      key: 'customerName',
      width: 200,
    },
    {
      title: i18n.t(LocaleHelper.getAllocationOverviewColTotalIncome()),
      dataIndex: 'totalIncome',
      key: 'totalIncome',
      align: 'right',
      render: (val) => `¥${val.toLocaleString()}`,
    },
    {
      title: i18n.t(LocaleHelper.getAllocationOverviewColSalesIncome()),
      dataIndex: 'salesIncome',
      key: 'salesIncome',
      align: 'right',
      render: (val) => `¥${val.toLocaleString()}`,
    },
    {
      title: i18n.t(LocaleHelper.getAllocationOverviewColOpsIncome()),
      dataIndex: 'opsIncome',
      key: 'opsIncome',
      align: 'right',
      render: (val) => `¥${val.toLocaleString()}`,
    },
    {
      title: i18n.t(LocaleHelper.getAllocationOverviewColStatus()),
      dataIndex: 'status',
      key: 'status',
      render: (status) => {
        let color: 'success' | 'warning' | 'error' | 'processing' | undefined;
        let text = status;
        if (status === 'allocated') {
          color = 'success';
          text = i18n.t(LocaleHelper.getAllocationOverviewStatusAllocated());
        } else if (status === 'pending') {
          color = 'warning';
          text = i18n.t(LocaleHelper.getAllocationOverviewStatusPending());
        } else if (status === 'exception') {
          color = 'error';
          text = i18n.t(LocaleHelper.getAllocationOverviewStatusException());
        }
        return <Tag color={color}>{text}</Tag>;
      },
    },
    {
      title: i18n.t(LocaleHelper.getAllocationOverviewColSalesman()),
      dataIndex: 'salesman',
      key: 'salesman',
    },
  ];

  const currentStep = useMemo(() => {
    if (!detail) {
      return 0;
    }
    if (detail.status === 'allocated') {
      return 3;
    }
    if (detail.status === 'exception') {
      return 2;
    }
    return 1;
  }, [detail]);

  return (
    <div style={{ overflowY: 'auto', overflowX: 'hidden', height: 'calc(100vh - 80px)' }}>
      <div className="nc-bill-header-area">
        <div className="header-title-search-area">
            <div className="BillHeadInfoWrap BillHeadInfoWrap-showBackBtn">
                <span className="bill-info-title" style={{ marginLeft: '10px' }}>
                    <CustomIcon type="icon-Currency" style={{ color: 'red', fontSize: '24px' }} />
                    {i18n.t(LocaleHelper.getAllocationOverviewDetailTitle())}
                </span>
            </div>
        </div>
        <div className="header-button-area">
          <div className="buttonGroup-component">
            <div className="u-button-group">
              <Button icon={<ArrowLeftOutlined />} onClick={() => navigate(-1)}>
                {i18n.t(LocaleHelper.getAllocationOverviewDetailActionBack())}
              </Button>
              <Button type="primary" danger onClick={handleReallocate}>
                {i18n.t(LocaleHelper.getAllocationOverviewDetailActionReallocate())}
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="nc-bill-table-area">
        <div style={{ padding: '24px', background: '#f0f2f5' }}>
          <Card bordered={false} style={{ marginBottom: 24 }}>
            <Descriptions title={i18n.t(LocaleHelper.getAllocationOverviewDetailSectionSummary())} bordered>
              <Descriptions.Item label={i18n.t(LocaleHelper.getAllocationOverviewColOrderNo())}>{detail?.orderNo || '-'}</Descriptions.Item>
              <Descriptions.Item label={i18n.t(LocaleHelper.getAllocationOverviewColCustomer())}>{detail?.customerName || '-'}</Descriptions.Item>
              <Descriptions.Item label={i18n.t(LocaleHelper.getAllocationOverviewColSalesman())}>{detail?.salesman || '-'}</Descriptions.Item>
              <Descriptions.Item label={i18n.t(LocaleHelper.getAllocationOverviewColStatus())}>{statusTag}</Descriptions.Item>
            </Descriptions>
            <Divider />
            <Row gutter={24}>
              <Col span={8}>
                <Statistic 
                  title={i18n.t(LocaleHelper.getAllocationOverviewColTotalIncome())} 
                  value={detail?.totalIncome} 
                  precision={2} 
                  prefix="¥" 
                />
              </Col>
              <Col span={8}>
                <Statistic 
                  title={i18n.t(LocaleHelper.getAllocationOverviewColSalesIncome())} 
                  value={detail?.salesIncome} 
                  precision={2} 
                  prefix="¥" 
                  valueStyle={{ color: '#3f8600' }}
                />
              </Col>
              <Col span={8}>
                <Statistic 
                  title={i18n.t(LocaleHelper.getAllocationOverviewColOpsIncome())} 
                  value={detail?.opsIncome} 
                  precision={2} 
                  prefix="¥" 
                  valueStyle={{ color: '#cf1322' }}
                />
              </Col>
            </Row>
          </Card>

          <Card bordered={false}>
            <Tabs
              items={[
              {
                key: 'base',
                label: i18n.t(LocaleHelper.getAllocationOverviewDetailTabBaseInfo()),
                children: (
                  <Descriptions bordered column={2}>
                    <Descriptions.Item label={i18n.t(LocaleHelper.getAllocationOverviewDetailLabelAllocateTime())}>2024-01-15 10:30:00</Descriptions.Item>
                    <Descriptions.Item label={i18n.t(LocaleHelper.getAllocationOverviewDetailLabelRule())}>{i18n.t(LocaleHelper.getAllocationOverviewDetailValueRuleStandard())}</Descriptions.Item>
                    <Descriptions.Item label={i18n.t(LocaleHelper.getAllocationOverviewDetailLabelSource())}>{i18n.t(LocaleHelper.getAllocationOverviewDetailValueSourceSystem())}</Descriptions.Item>
                    <Descriptions.Item label={i18n.t(LocaleHelper.getAllocationOverviewDetailLabelRemark())}>{i18n.t(LocaleHelper.getAllocationOverviewDetailValueRemarkAuto())}</Descriptions.Item>
                  </Descriptions>
                ),
              },
              {
                key: 'records',
                label: i18n.t(LocaleHelper.getAllocationOverviewDetailTabRecords()),
                children: (
                  <Table
                    columns={recordColumns}
                    dataSource={detail ? [detail] : []}
                    rowKey="id"
                    loading={loading}
                    pagination={false}
                    size="small"
                    bordered
                  />
                ),
              },
              {
                key: 'flow',
                label: i18n.t(LocaleHelper.getAllocationOverviewDetailTabFlow()),
                children: (
                  <div style={{ padding: '24px' }}>
                    <Steps
                      current={currentStep}
                      items={[
                        {
                          title: i18n.t(LocaleHelper.getAllocationOverviewDetailFlowStep1Title()),
                          description: i18n.t(LocaleHelper.getAllocationOverviewDetailFlowStep1Desc()),
                        },
                        {
                          title: i18n.t(LocaleHelper.getAllocationOverviewDetailFlowStep2Title()),
                          description: i18n.t(LocaleHelper.getAllocationOverviewDetailFlowStep2Desc()),
                        },
                        {
                          title: i18n.t(LocaleHelper.getAllocationOverviewDetailFlowStep3Title()),
                          description: i18n.t(LocaleHelper.getAllocationOverviewDetailFlowStep3Desc()),
                        },
                        {
                          title: i18n.t(LocaleHelper.getAllocationOverviewDetailFlowStep4Title()),
                          description: i18n.t(LocaleHelper.getAllocationOverviewDetailFlowStep4Desc()),
                        },
                      ]}
                    />
                  </div>
                ),
              },
              ]}
            />
          </Card>
        </div>
      </div>
      <Modal
        title={i18n.t(LocaleHelper.getAllocationOverviewModalTitle())}
        open={isModalOpen}
        onOk={handleModalOk}
        onCancel={() => {
          setIsModalOpen(false);
          navigate(`/cost_management/allocation_overview/detail/${id}`, { replace: true });
        }}
        confirmLoading={loading}
      >
        <Radio.Group onChange={(e) => setAllocationType(e.target.value)} value={allocationType}>
          <Space direction="vertical">
            <Radio value="standard">{i18n.t(LocaleHelper.getAllocationOverviewDetailValueRuleStandard())}</Radio>
            <Radio value="manual">{i18n.t(LocaleHelper.getAllocationOverviewModalOptionManual())}</Radio>
          </Space>
        </Radio.Group>
        {allocationType === 'manual' && (
          <div style={{ marginTop: 16, marginLeft: 24 }}>
            <Space>
              <div>
                <div style={{ marginBottom: 4 }}>{i18n.t(LocaleHelper.getAllocationOverviewModalWeightSales())}</div>
                <InputNumber
                  min={0}
                  max={100}
                  value={salesWeight}
                  onChange={(v) => setSalesWeight(v || 0)}
                  formatter={value => `${value}%`}
                  parser={value => value!.replace('%', '') as unknown as number}
                />
              </div>
              <div>
                <div style={{ marginBottom: 4 }}>{i18n.t(LocaleHelper.getAllocationOverviewModalWeightOps())}</div>
                <InputNumber
                  min={0}
                  max={100}
                  value={opsWeight}
                  onChange={(v) => setOpsWeight(v || 0)}
                  formatter={value => `${value}%`}
                  parser={value => value!.replace('%', '') as unknown as number}
                />
              </div>
            </Space>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default AllocationOverviewDetail;
