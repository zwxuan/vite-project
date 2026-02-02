import '@/pages/page_list.less';
import React, { useState, useEffect } from 'react';
import { Button, Card, Row, Col, Table, Form, Input, Select, Tag, message } from 'antd';
import { ColumnsType } from 'antd/es/table';
import CustomIcon from "@/components/custom-icon";
import { queryRuleDetail, RuleDetail } from '@/api/freight_forwarding/cost_management/allocation_service';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { ArrowLeftOutlined } from '@ant-design/icons';
import LocaleHelper from '@/utils/locale';
import i18n from '@/i18n';

const AllocationRulesDetail: React.FC = () => {
  const [searchParams] = useSearchParams();
  const id = searchParams.get('id');
  const navigate = useNavigate();
  const [data, setData] = useState<RuleDetail | null>(null);
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();

  useEffect(() => {
    if (id) {
      setLoading(true);
      queryRuleDetail(id).then(res => {
        setData(res);
        form.setFieldsValue(res);
        setLoading(false);
      });
    }
  }, [id, form]);

  const salesColumns: ColumnsType<any> = [
    { title: i18n.t(LocaleHelper.getAllocationRulesColCustomerType()), dataIndex: 'type', key: 'type' },
    { title: i18n.t(LocaleHelper.getAllocationRulesColCommissionRate()), dataIndex: 'rate', key: 'rate', render: val => `${val}%` },
    { title: i18n.t(LocaleHelper.getAllocationRulesColMinCommission()), dataIndex: 'min', key: 'min', render: val => `¥${val.toLocaleString()}` },
    { title: i18n.t(LocaleHelper.getAllocationRulesColMaxCommission()), dataIndex: 'max', key: 'max', render: val => `¥${val.toLocaleString()}` },
    { title: i18n.t(LocaleHelper.getAllocationRulesColStatus()), dataIndex: 'status', key: 'status', render: val => <Tag color="success">{val}</Tag> },
  ];

  const opsColumns: ColumnsType<any> = [
    { title: i18n.t(LocaleHelper.getAllocationRulesColDeptName()), dataIndex: 'deptName', key: 'deptName' },
    { title: i18n.t(LocaleHelper.getAllocationRulesColBaseWeight()), dataIndex: 'baseWeight', key: 'baseWeight' },
    { title: i18n.t(LocaleHelper.getAllocationRulesColAdjustCoeff()), dataIndex: 'adjustCoeff', key: 'adjustCoeff' },
    { title: i18n.t(LocaleHelper.getAllocationRulesColEffectiveWeight()), dataIndex: 'effectiveWeight', key: 'effectiveWeight' },
    { title: i18n.t(LocaleHelper.getAllocationRulesColStatus()), dataIndex: 'status', key: 'status', render: val => <Tag color="success">{val}</Tag> },
  ];

  const complexityColumns: ColumnsType<any> = [
    { title: i18n.t(LocaleHelper.getAllocationRulesColSlaRate()), dataIndex: 'slaRate', key: 'slaRate' },
    { title: i18n.t(LocaleHelper.getAllocationRulesColAdjustCoeff()), dataIndex: 'adjustCoeff', key: 'adjustCoeff' },
    { title: i18n.t(LocaleHelper.getAllocationRulesColDescription()), dataIndex: 'description', key: 'description' },
  ];

  return (
    <div style={{ overflowY: 'auto', overflowX: 'hidden', height: 'calc(100vh - 80px)' }}>
      <div className="nc-bill-header-area">
        <div className="header-title-search-area">
          <div className="BillHeadInfoWrap BillHeadInfoWrap-showBackBtn">
            <ArrowLeftOutlined onClick={() => navigate(-1)} style={{ marginRight: 10, cursor: 'pointer' }} />
            <CustomIcon type="icon-Currency" className="page-title-Icon" />
            <span className="bill-info-title">
              {id ? i18n.t(LocaleHelper.getAllocationRulesDetailEditTitle()) : i18n.t(LocaleHelper.getAllocationRulesDetailCreateTitle())}
            </span>
          </div>
        </div>
        <div className="header-button-area">
          <span className="buttonGroup-component">
            <div className="u-button-group">
              <Button type="primary" danger>{i18n.t(LocaleHelper.getAllocationRulesActionSaveConfig())}</Button>
              <Button>{i18n.t(LocaleHelper.getAllocationRulesActionReset())}</Button>
              <Button>{i18n.t(LocaleHelper.getAllocationRulesActionImportConfig())}</Button>
              <Button>{i18n.t(LocaleHelper.getAllocationRulesActionExportConfig())}</Button>
              <Button>{i18n.t(LocaleHelper.getAllocationRulesActionPreview())}</Button>
            </div>
          </span>
        </div>
      </div>

      <div style={{ padding: '10px' }}>
        <Form form={form} layout="vertical">
          <Card size="small" title={i18n.t(LocaleHelper.getAllocationRulesBasicInfoTitle())} style={{ marginBottom: 10 }}>
             <Row gutter={16}>
               <Col span={8}>
                 <Form.Item label={i18n.t(LocaleHelper.getAllocationRulesFormRuleName())} name="ruleName" rules={[{ required: true }]}>
                   <Input placeholder={i18n.t(LocaleHelper.getAllocationRulesFormRuleNamePlaceholder())} />
                 </Form.Item>
               </Col>
               <Col span={8}>
                 <Form.Item label={i18n.t(LocaleHelper.getAllocationRulesFormRuleType())} name="ruleType" rules={[{ required: true }]}>
                   <Select options={[
                     { label: i18n.t(LocaleHelper.getAllocationRulesTypeWeight()), value: 'Weight' },
                     { label: i18n.t(LocaleHelper.getAllocationRulesTypeRatio()), value: 'Ratio' },
                     { label: i18n.t(LocaleHelper.getAllocationRulesTypeFixed()), value: 'Fixed' },
                   ]} />
                 </Form.Item>
               </Col>
               <Col span={8}>
                 <Form.Item label={i18n.t(LocaleHelper.getAllocationRulesFormDescription())} name="description">
                   <Input.TextArea rows={1} />
                 </Form.Item>
               </Col>
             </Row>
          </Card>

          <Card size="small" title={i18n.t(LocaleHelper.getAllocationRulesConfigSalesCommission())} style={{ marginBottom: 10 }}>
            <Table
              columns={salesColumns}
              dataSource={data?.customerConfig || []}
              pagination={false}
              size="small"
              bordered
            />
          </Card>

          <Card size="small" title={i18n.t(LocaleHelper.getAllocationRulesConfigOpsWeight())} style={{ marginBottom: 10 }}>
            <Table
              columns={opsColumns}
              dataSource={data?.deptConfig || []}
              pagination={false}
              size="small"
              bordered
            />
          </Card>

          <Card size="small" title={i18n.t(LocaleHelper.getAllocationRulesConfigComplexity())} style={{ marginBottom: 10 }}>
            <Table
              columns={complexityColumns}
              dataSource={data?.complexityConfig || []}
              pagination={false}
              size="small"
              bordered
            />
          </Card>
        </Form>
      </div>
    </div>
  );
};

export default AllocationRulesDetail;
