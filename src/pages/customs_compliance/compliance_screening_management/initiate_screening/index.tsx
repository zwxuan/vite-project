import React, { useState } from 'react';
import { Form, Input, Select, Button, Space, Row, Col, Checkbox, Card, message, InputNumber } from 'antd';
import CustomIcon from '@/components/custom-icon';
import LocaleHelper from '@/utils/locale';
import { useNavigate } from 'react-router-dom';
import i18n from '@/i18n';

const { Option } = Select;

const InitiateScreening: React.FC = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const onFinish = (values: any) => {
    setLoading(true);
    console.log('Received values of form: ', values);
    setTimeout(() => {
      setLoading(false);
      message.success('Screening initiated successfully');
      navigate('/compliance_screening_management/screening_task_center');
    }, 1000);
  };

  const handleCancel = () => {
    navigate('/compliance_screening_management/screening_task_center');
  };

  const handleSaveTemplate = () => {
    message.success('Template saved successfully');
  };

  return (
    <div style={{ overflowY: 'auto', overflowX: 'hidden', height: 'calc(100vh - 80px)' }}>
      <div className="nc-bill-header-area">
        <div className="header-title-search-area">
          <div className="BillHeadInfoWrap">
            <div className="bill-info-title">
              <span>
                <CustomIcon type="icon-Currency" style={{ color: 'red', fontSize: '24px' }} />
                {i18n.t(LocaleHelper.getInitiateScreeningPageTitle())}
              </span>
            </div>
          </div>
        </div>
        <div className="header-button-area">
          <div className="button-app-wrapper">
            <div className="buttonGroup-component">
              <div className="u-button-group">
                <Space>
                  <Button onClick={handleSaveTemplate}>
                    {i18n.t(LocaleHelper.getInitiateScreeningBtnSaveTemplate())}
                  </Button>
                  <Button type="primary" onClick={() => form.submit()} loading={loading}>
                    {i18n.t(LocaleHelper.getInitiateScreeningBtnSubmit())}
                  </Button>
                  <Button onClick={handleCancel}>
                    {i18n.t(LocaleHelper.getInitiateScreeningBtnCancel())}
                  </Button>
                </Space>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div style={{ padding: '20px' }}>
        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          initialValues={{
            type: 'COMPREHENSIVE',
            scope: ['shipper', 'consignee', 'carrier', 'goods', 'bank', 'agent'],
            database: ['OFAC', 'BIS', 'UN', 'EU', 'CUSTOM'],
            accuracy: 'STANDARD',
            language: 'BOTH',
            autoProcess: ['LOW_RISK', 'REPORT'],
          }}
        >
          <Card className="mb-4">
            <Row gutter={24}>
              <Col span={8}>
                <Form.Item
                  name="type"
                  label={i18n.t(LocaleHelper.getInitiateScreeningFieldType())}
                  rules={[{ required: true }]}
                >
                  <Select>
                    <Option value="COMPREHENSIVE">全面筛查</Option>
                    <Option value="QUICK">快速筛查</Option>
                    <Option value="TARGETED">定向筛查</Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item
                  name="jobId"
                  label={i18n.t(LocaleHelper.getInitiateScreeningFieldJobId())}
                >
                  <Input placeholder="JOB-..." />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item
                  name="reason"
                  label={i18n.t(LocaleHelper.getInitiateScreeningFieldReason())}
                >
                  <Input />
                </Form.Item>
              </Col>
            </Row>
          </Card>

          <Card className="mb-4">
            <Form.Item name="scope">
              <Checkbox.Group style={{ width: '100%' }}>
                <Space direction="horizontal" wrap>
                  <Checkbox value="shipper">{i18n.t(LocaleHelper.getInitiateScreeningFieldShipper())}</Checkbox>
                  <Checkbox value="consignee">{i18n.t(LocaleHelper.getInitiateScreeningFieldConsignee())}</Checkbox>
                  <Checkbox value="carrier">{i18n.t(LocaleHelper.getInitiateScreeningFieldCarrier())}</Checkbox>
                  <Checkbox value="goods">{i18n.t(LocaleHelper.getInitiateScreeningFieldGoods())}</Checkbox>
                  <Checkbox value="bank">{i18n.t(LocaleHelper.getInitiateScreeningFieldBank())}</Checkbox>
                  <Checkbox value="agent">{i18n.t(LocaleHelper.getInitiateScreeningFieldAgent())}</Checkbox>
                </Space>
              </Checkbox.Group>
            </Form.Item>
          </Card>

          <Card className="mb-4">
            <Row gutter={24}>
              <Col span={12}>
                <Form.Item
                  name="consigneeName"
                  label={i18n.t(LocaleHelper.getInitiateScreeningFieldConsigneeName())}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  name="consigneeAddress"
                  label={i18n.t(LocaleHelper.getInitiateScreeningFieldConsigneeAddress())}
                >
                  <Input />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="shipperName"
                  label={i18n.t(LocaleHelper.getInitiateScreeningFieldShipperName())}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  name="shipperAddress"
                  label={i18n.t(LocaleHelper.getInitiateScreeningFieldShipperAddress())}
                >
                  <Input />
                </Form.Item>
              </Col>
            </Row>
          </Card>

          <Card className="mb-4">
            <Row gutter={24}>
              <Col span={8}>
                <Form.Item
                  name="carrierName"
                  label={i18n.t(LocaleHelper.getInitiateScreeningFieldCarrierName())}
                >
                  <Input />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item
                  name="vesselVoyage"
                  label={i18n.t(LocaleHelper.getInitiateScreeningFieldVesselVoyage())}
                >
                  <Input />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item
                  name="scac"
                  label={i18n.t(LocaleHelper.getInitiateScreeningFieldScac())}
                >
                  <Input />
                </Form.Item>
              </Col>
            </Row>
          </Card>

          <Card className="mb-4">
            <Row gutter={24}>
              <Col span={8}>
                <Form.Item
                  name="goodsName"
                  label={i18n.t(LocaleHelper.getInitiateScreeningFieldGoodsName())}
                >
                  <Input />
                </Form.Item>
              </Col>
              <Col span={4}>
                <Form.Item
                  name="hsCode"
                  label={i18n.t(LocaleHelper.getInitiateScreeningFieldHsCode())}
                >
                  <Input />
                </Form.Item>
              </Col>
              <Col span={4}>
                <Form.Item
                  name="origin"
                  label={i18n.t(LocaleHelper.getInitiateScreeningFieldOrigin())}
                >
                  <Input />
                </Form.Item>
              </Col>
              <Col span={4}>
                <Form.Item
                  name="value"
                  label={i18n.t(LocaleHelper.getInitiateScreeningFieldValue())}
                >
                  <InputNumber style={{ width: '100%' }} />
                </Form.Item>
              </Col>
              <Col span={4}>
                <Form.Item
                  name="usage"
                  label={i18n.t(LocaleHelper.getInitiateScreeningFieldUsage())}
                >
                  <Input />
                </Form.Item>
              </Col>
            </Row>
          </Card>

          <Card className="mb-4">
            <Row gutter={24}>
              <Col span={24}>
                <Form.Item
                  name="database"
                  label={i18n.t(LocaleHelper.getInitiateScreeningFieldDatabase())}
                >
                  <Checkbox.Group>
                    <Space direction="horizontal" wrap>
                      <Checkbox value="OFAC">OFAC</Checkbox>
                      <Checkbox value="BIS">BIS</Checkbox>
                      <Checkbox value="UN">UN</Checkbox>
                      <Checkbox value="EU">EU</Checkbox>
                      <Checkbox value="CUSTOM">自定义</Checkbox>
                    </Space>
                  </Checkbox.Group>
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={24}>
              <Col span={8}>
                <Form.Item
                  name="accuracy"
                  label={i18n.t(LocaleHelper.getInitiateScreeningFieldAccuracy())}
                >
                  <Select>
                    <Option value="STANDARD">标准</Option>
                    <Option value="HIGH">高</Option>
                    <Option value="LOW">低</Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item
                  name="language"
                  label={i18n.t(LocaleHelper.getInitiateScreeningFieldLanguage())}
                >
                  <Select>
                    <Option value="BOTH">中英文</Option>
                    <Option value="EN">英文</Option>
                    <Option value="CN">中文</Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item
                  name="autoProcess"
                  label={i18n.t(LocaleHelper.getInitiateScreeningFieldAutoProcess())}
                >
                  <Checkbox.Group>
                    <Space orientation="vertical" wrap>
                      <Checkbox value="LOW_RISK">低风险自动通过</Checkbox>
                      <Checkbox value="REPORT">生成筛查报告</Checkbox>
                    </Space>
                  </Checkbox.Group>
                </Form.Item>
              </Col>
            </Row>
          </Card>
        </Form>
      </div>
    </div>
  );
};

export default InitiateScreening;
