import '@/pages/page_list.less';
import React, { useState, useEffect } from 'react';
import { Button, Card, Row, Col, Form, Input, Select, message, Table, Modal, Tooltip } from 'antd';
import { PlusOutlined, ArrowLeftOutlined } from '@ant-design/icons';
import CustomIcon from "@/components/custom-icon";
import { queryRuleDetail } from '@/api/freight_forwarding/cost_management/allocation_service';
import { useSearchParams, useNavigate } from 'react-router-dom';
import LocaleHelper from '@/utils/locale';
import i18n from '@/i18n';
import { getSalesColumns, getOpsColumns, getComplexityColumns } from './columns';

const { Option } = Select;

const AllocationRulesDetail: React.FC = () => {
  const [searchParams] = useSearchParams();
  const id = searchParams.get('id');
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const [previewVisible, setPreviewVisible] = useState(false);

  const handlePreview = () => {
    setPreviewVisible(true);
  };

  useEffect(() => {
    if (id) {
      setLoading(true);
      queryRuleDetail(id).then(res => {
        form.setFieldsValue(res);
        setLoading(false);
      });
    }
  }, [id, form]);

  const handleSave = () => {
    form.validateFields().then(values => {
      console.log('Saving config:', values);
      message.success('Rules saved successfully (Mock)');
      // Here you would call the update API
    }).catch(info => {
      console.log('Validate Failed:', info);
    });
  };

  // Column definitions extracted to detail_columns.tsx


  return (
    <div style={{ overflowY: 'auto', overflowX: 'hidden', height: 'calc(100vh - 80px)' }}>
      <div className="nc-bill-header-area">
        <div className="header-title-search-area">
          <div className="BillHeadInfoWrap BillHeadInfoWrap-showBackBtn">
            <span className="bill-info-title" style={{ marginLeft: '10px' }}>
              <CustomIcon type="icon-Currency" style={{ color: 'red', fontSize: '24px' }} />
              {id ? i18n.t(LocaleHelper.getAllocationRulesDetailEditTitle()) : i18n.t(LocaleHelper.getAllocationRulesDetailCreateTitle())}
              <Tooltip
                title={
                  <div className='rul_title_tooltip' style={{ backgroundColor: '#fff', color: '#000' }}>
                    <ol style={{ color: '#666666', fontSize: '12px', paddingLeft: '2px' }}>
                      <li style={{ marginBottom: '10px' }}>
                        <div style={{ marginBottom: '8px' }}>
                          <span style={{ backgroundColor: '#f1f1f1', padding: '4px 12px', borderRadius: '2px', fontWeight: 'bold' }}>说明</span>
                        </div>
                        <ul style={{ listStyleType: 'circle', paddingLeft: '20px', marginTop: '5px', lineHeight: '1.8' }}>
                          <li><b>角色：</b>本页面是<b>“制定公式”</b>的地方，相当于系统的<b>“大脑”</b>或<b>“设置中心”</b>。</li>
                          <li><b>作用：</b>配置具体的分配逻辑（例如：销售拿多少提成、操作部门分摊多少权重、SLA 达标率如何影响系数等）。</li>
                        </ul>
                      </li>
                    </ol>
                  </div>
                }
                color='white'>
                <i className='iconfont icon-bangzhutishi' style={{ cursor: 'pointer', marginLeft: '10px' }}></i>
              </Tooltip>
            </span>
          </div>
        </div>
        <div className="header-button-area">
          <span className="buttonGroup-component">
            <div className="u-button-group">
              <Button type="primary" danger onClick={handleSave}>{i18n.t(LocaleHelper.getAllocationRulesActionSaveConfig())}</Button>
              <Button>{i18n.t(LocaleHelper.getAllocationRulesActionReset())}</Button>
              <Button>{i18n.t(LocaleHelper.getAllocationRulesActionImportConfig())}</Button>
              <Button>{i18n.t(LocaleHelper.getAllocationRulesActionExportConfig())}</Button>
              <Button onClick={handlePreview}>{i18n.t(LocaleHelper.getAllocationRulesActionPreview())}</Button>
              <Button onClick={() => navigate(-1)}>{i18n.t(LocaleHelper.getBack())}</Button>
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
                  <Select>
                    <Option value="Weight">{i18n.t(LocaleHelper.getAllocationRulesTypeWeight())}</Option>
                    <Option value="Ratio">{i18n.t(LocaleHelper.getAllocationRulesTypeRatio())}</Option>
                    <Option value="Fixed">{i18n.t(LocaleHelper.getAllocationRulesTypeFixed())}</Option>
                  </Select>
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={24}>
                <Form.Item label={i18n.t(LocaleHelper.getAllocationRulesFormDescription())} name="description">
                  <Input.TextArea rows={3} />
                </Form.Item>
              </Col>
            </Row>
          </Card>

          <Card size="small" title={i18n.t(LocaleHelper.getAllocationRulesConfigSalesCommission())} style={{ marginBottom: 10 }}>
            <Form.List name="customerConfig">
              {(fields, { add, remove }) => (
                <>
                  <Table
                    rowKey="key"
                    dataSource={fields}
                    columns={getSalesColumns(remove)}
                    pagination={false}
                    scroll={{ x: 960 }}
                  />
                  <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />} style={{ marginTop: 8 }}>
                    {i18n.t(LocaleHelper.getAdd())}
                  </Button>
                </>
              )}
            </Form.List>
          </Card>

          <Card size="small" title={i18n.t(LocaleHelper.getAllocationRulesConfigOpsWeight())} style={{ marginBottom: 10 }}>
            <Form.List name="deptConfig">
              {(fields, { add, remove }) => (
                <>
                  <Table
                    rowKey="key"
                    dataSource={fields}
                    columns={getOpsColumns(remove)}
                    pagination={false}
                    scroll={{ x: 960 }}
                  />
                  <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />} style={{ marginTop: 8 }}>
                    {i18n.t(LocaleHelper.getAdd())}
                  </Button>
                </>
              )}
            </Form.List>
          </Card>

          <Card size="small" title={i18n.t(LocaleHelper.getAllocationRulesConfigComplexity())} style={{ marginBottom: 10 }}>
            <Form.List name="complexityConfig">
              {(fields, { add, remove }) => (
                <>
                  <Table
                    rowKey="key"
                    dataSource={fields}
                    columns={getComplexityColumns(remove)}
                    pagination={false}
                    scroll={{ x: 960 }}
                  />
                  <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />} style={{ marginTop: 8 }}>
                    {i18n.t(LocaleHelper.getAdd())}
                  </Button>
                </>
              )}
            </Form.List>
          </Card>
        </Form>
      </div>

      <Modal
        title={i18n.t(LocaleHelper.getAllocationRulesPreviewTitle())}
        open={previewVisible}
        onCancel={() => setPreviewVisible(false)}
        footer={[
          <Button key="close" onClick={() => setPreviewVisible(false)}>
            {i18n.t(LocaleHelper.getBack())}
          </Button>
        ]}
        width={800}
      >
        <Table
          dataSource={[
            { key: '1', jobNo: 'JOB001', profit: 1000, allocated: 200 },
            { key: '2', jobNo: 'JOB002', profit: 2000, allocated: 400 },
            { key: '3', jobNo: 'JOB003', profit: 500, allocated: 100 },
          ]}
          columns={[
            { title: i18n.t(LocaleHelper.getAllocationRulesPreviewColJobNo()), dataIndex: 'jobNo', key: 'jobNo' },
            { title: i18n.t(LocaleHelper.getAllocationRulesPreviewColProfit()), dataIndex: 'profit', key: 'profit', render: (val) => `$${val}` },
            { title: i18n.t(LocaleHelper.getAllocationRulesPreviewColAllocatedAmount()), dataIndex: 'allocated', key: 'allocated', render: (val) => `$${val}` },
          ]}
          pagination={false}
        />
      </Modal>
    </div>
  );
};

export default AllocationRulesDetail;
