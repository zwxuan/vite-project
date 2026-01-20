import React from 'react';
import { Button, Card, Checkbox, Col, DatePicker, Form, Input, InputNumber, Row, Select, Space, Upload } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import CustomIcon from '@/components/custom-icon';
import i18n from '@/i18n';
import LocaleHelper from '@/utils/locale';
import '@/pages/page_list.less';

const BookingCreate: React.FC = () => {
  const [form] = Form.useForm();

  return (
    <div style={{ overflowY: 'auto', overflowX: 'hidden', height: 'calc(100vh - 80px)' }}>
      <div className="nc-bill-header-area">
        <div className="header-title-search-area">
          <div className="BillHeadInfoWrap BillHeadInfoWrap-showBackBtn">
            <span className="bill-info-title" style={{ marginLeft: '10px' }}>
              <CustomIcon type="icon-Currency" style={{ color: 'red', fontSize: '24px' }} />
              {i18n.t(LocaleHelper.getBookingCreateTitle())}
            </span>
          </div>
        </div>
        <div className="header-button-area">
          <div className="buttonGroup-component">
            <div className="u-button-group">
              <Button type="primary" danger>
                {i18n.t(LocaleHelper.getBookingCreateSave())}
              </Button>
              <Button>
                {i18n.t(LocaleHelper.getBookingCreateSubmit())}
              </Button>
            </div>
          </div>
        </div>
      </div>

      <Row gutter={16} style={{ padding: '16px' }}>
        <Col span={24}>
          <Form form={form} layout="vertical">
            <Card title={i18n.t(LocaleHelper.getBookingCreateBasicInfo())} style={{ marginBottom: 16 }}>
              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item label={i18n.t(LocaleHelper.getBookingCreateRelatedWaybill())} name="waybill">
                    <Select
                      options={[
                        { label: i18n.t(LocaleHelper.getBookingCommonSampleWaybillOne()), value: 'WAY-20240315-001' },
                        { label: i18n.t(LocaleHelper.getBookingCommonSampleWaybillTwo()), value: 'WAY-20240315-002' },
                      ]}
                    />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label={i18n.t(LocaleHelper.getBookingCreateCarrier())} name="carrier">
                    <Select
                      options={[
                        { label: i18n.t(LocaleHelper.getBookingCarrierCosco()), value: 'COSCO' },
                        { label: i18n.t(LocaleHelper.getBookingCarrierMaersk()), value: 'MAERSK' },
                        { label: i18n.t(LocaleHelper.getBookingCarrierMsc()), value: 'MSC' },
                      ]}
                    />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label={i18n.t(LocaleHelper.getBookingCreateContact())} name="contact">
                    <Input />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label={i18n.t(LocaleHelper.getBookingCreatePhone())} name="phone">
                    <Input />
                  </Form.Item>
                </Col>
              </Row>
            </Card>

            <Card title={i18n.t(LocaleHelper.getBookingCreateRouteInfo())} style={{ marginBottom: 16 }}>
              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item label={i18n.t(LocaleHelper.getBookingCreatePol())} name="pol">
                    <Select
                      options={[
                        { label: i18n.t(LocaleHelper.getBookingPortShanghai()), value: 'SHANGHAI' },
                        { label: i18n.t(LocaleHelper.getBookingPortShenzhen()), value: 'SHENZHEN' },
                      ]}
                    />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label={i18n.t(LocaleHelper.getBookingCreatePod())} name="pod">
                    <Select
                      options={[
                        { label: i18n.t(LocaleHelper.getBookingPortLosAngeles()), value: 'LOS_ANGELES' },
                        { label: i18n.t(LocaleHelper.getBookingPortHamburg()), value: 'HAMBURG' },
                      ]}
                    />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label={i18n.t(LocaleHelper.getBookingCreateRequestEtd())} name="etd">
                    <DatePicker style={{ width: '100%' }} />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label={i18n.t(LocaleHelper.getBookingCreateRequestEta())} name="eta">
                    <DatePicker style={{ width: '100%' }} />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label={i18n.t(LocaleHelper.getBookingCreateServiceType())} name="serviceType">
                    <Select
                      options={[
                        { label: i18n.t(LocaleHelper.getBookingServiceTypeCyCy()), value: 'CY-CY' },
                        { label: i18n.t(LocaleHelper.getBookingServiceTypeDoorDoor()), value: 'DOOR-DOOR' },
                      ]}
                    />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label={i18n.t(LocaleHelper.getBookingCreateTransportTerms())} name="transportTerms">
                    <Select
                      options={[
                        { label: i18n.t(LocaleHelper.getBookingTransportTermsFcl()), value: 'FCL' },
                        { label: i18n.t(LocaleHelper.getBookingTransportTermsLcl()), value: 'LCL' },
                      ]}
                    />
                  </Form.Item>
                </Col>
              </Row>
            </Card>

            <Card title={i18n.t(LocaleHelper.getBookingCreateContainerInfo())} style={{ marginBottom: 16 }}>
              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item label={i18n.t(LocaleHelper.getBookingCreateContainerType())} name="containerType">
                    <Select
                      options={[
                        { label: i18n.t(LocaleHelper.getBookingContainerType20GP()), value: '20GP' },
                        { label: i18n.t(LocaleHelper.getBookingContainerType40GP()), value: '40GP' },
                        { label: i18n.t(LocaleHelper.getBookingContainerType40HQ()), value: '40HQ' },
                      ]}
                    />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label={i18n.t(LocaleHelper.getBookingCreateContainerQuantity())} name="containerQty">
                    <InputNumber min={1} style={{ width: '100%' }} />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label={i18n.t(LocaleHelper.getBookingCreateWeight())} name="weight">
                    <InputNumber min={0} style={{ width: '100%' }} />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label={i18n.t(LocaleHelper.getBookingCreateSpecialTypes())} name="specialTypes">
                    <Space direction="horizontal" wrap>
                      <Checkbox value="dangerous">{i18n.t(LocaleHelper.getBookingCreateDangerous())}</Checkbox>
                      <Checkbox value="oversize">{i18n.t(LocaleHelper.getBookingCreateOversize())}</Checkbox>
                      <Checkbox value="refrigerated">{i18n.t(LocaleHelper.getBookingCreateRefrigerated())}</Checkbox>
                    </Space>
                  </Form.Item>
                </Col>
              </Row>
            </Card>

            <Card title={i18n.t(LocaleHelper.getBookingCreateCargoInfo())} style={{ marginBottom: 16 }}>
              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item label={i18n.t(LocaleHelper.getBookingCreateCargoName())} name="cargoName">
                    <Input />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label={i18n.t(LocaleHelper.getBookingCreateHsCode())} name="hsCode">
                    <Input />
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item label={i18n.t(LocaleHelper.getBookingCreatePieces())} name="pieces">
                    <InputNumber min={1} style={{ width: '100%' }} />
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item label={i18n.t(LocaleHelper.getBookingCreateGrossWeight())} name="grossWeight">
                    <InputNumber min={0} style={{ width: '100%' }} />
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item label={i18n.t(LocaleHelper.getBookingCreateVolume())} name="volume">
                    <InputNumber min={0} style={{ width: '100%' }} />
                  </Form.Item>
                </Col>
              </Row>
            </Card>

            <Card title={i18n.t(LocaleHelper.getBookingCreateSpecialRequirement())}>
              <Row gutter={16}>
                <Col span={16}>
                  <Form.Item label={i18n.t(LocaleHelper.getBookingCreateRemark())} name="remark">
                    <Input.TextArea rows={3} />
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item label={i18n.t(LocaleHelper.getBookingCreateAttachment())} name="attachment">
                    <Upload>
                      <Button icon={<UploadOutlined />}>{i18n.t(LocaleHelper.getBookingCreateUpload())}</Button>
                    </Upload>
                  </Form.Item>
                </Col>
              </Row>
            </Card>
          </Form>
        </Col>
      </Row>
    </div>
  );
};

export default BookingCreate;
