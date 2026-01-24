
import React, { useEffect } from 'react';
import { Form, Input, Select, DatePicker, Button, Card, Row, Col, Space, message, Upload } from 'antd';
import { UploadOutlined, SaveOutlined, SendOutlined } from '@ant-design/icons';
import { useNavigate, useSearchParams } from 'react-router-dom';
import i18n from '@/i18n';
import LocaleHelper from '@/utils/locale';
import CustomIcon from "@/components/custom-icon";
import { DocumentService } from "@/api/freight_forwarding/document_management/document_service";

const { Option } = Select;
const { TextArea } = Input;

const DocumentCreate: React.FC = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const id = searchParams.get('id');
  const type = searchParams.get('type');
  const readonly = searchParams.get('readonly') === 'true';

  useEffect(() => {
    if (id) {
        DocumentService.getDocumentDetail(id).then(res => {
            if (res.success) {
                form.setFieldsValue(res.data);
            }
        });
    }
    if (type) {
        form.setFieldsValue({ type });
    }
  }, [id, type]);

  const onFinish = (values: any) => {
    console.log('Received values of form: ', values);
    message.success('Submitted successfully');
    navigate('/document_management/list');
  };

  return (
    <div style={{ padding: '24px', overflowY: 'auto', height: 'calc(100vh - 80px)' }}>
      <div style={{ marginBottom: 24, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
         <span style={{ fontSize: '20px', fontWeight: 'bold' }}>
            <CustomIcon type="icon-Currency" style={{ marginRight: '8px' }} />
            {i18n.t(LocaleHelper.getDocumentCreateTitle())}
         </span>
         <Space>
             <Button icon={<SaveOutlined />} onClick={() => form.submit()}>{i18n.t(LocaleHelper.getDocumentCreateSaveDraft())}</Button>
             <Button type="primary" icon={<SendOutlined />} onClick={() => form.submit()}>{i18n.t(LocaleHelper.getDocumentCreateSubmit())}</Button>
         </Space>
      </div>

      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        disabled={readonly}
      >
        <Card title={i18n.t(LocaleHelper.getDocumentCreateBasicInfo())} style={{ marginBottom: 24 }}>
          <Row gutter={24}>
            <Col span={8}>
              <Form.Item name="code" label="Document Code">
                <Input disabled placeholder="Auto Generated" />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item name="type" label={i18n.t(LocaleHelper.getDocumentCreateDocType())} rules={[{ required: true }]}>
                <Select>
                   <Option value="提单(B/L)">提单(B/L)</Option>
                   <Option value="发票(Invoice)">发票(Invoice)</Option>
                   <Option value="装箱单(Packing List)">装箱单(Packing List)</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item name="waybill_no" label={i18n.t(LocaleHelper.getDocumentCreateWaybill())} rules={[{ required: true }]}>
                <Input />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item name="priority" label={i18n.t(LocaleHelper.getDocumentCreatePriority())}>
                <Select>
                    <Option value="High">High</Option>
                    <Option value="Medium">Medium</Option>
                    <Option value="Low">Low</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item name="deadline" label={i18n.t(LocaleHelper.getDocumentCreateDeadline())}>
                <DatePicker style={{ width: '100%' }} />
              </Form.Item>
            </Col>
          </Row>
        </Card>

        <Card title="Business Info" style={{ marginBottom: 24 }}>
            <Row gutter={24}>
                <Col span={12}>
                    <Form.Item name="shipper" label={i18n.t(LocaleHelper.getDocumentCreateShipper())}>
                        <TextArea rows={4} />
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item name="consignee" label={i18n.t(LocaleHelper.getDocumentCreateConsignee())}>
                        <TextArea rows={4} />
                    </Form.Item>
                </Col>
            </Row>
             <Row gutter={24}>
                <Col span={12}>
                    <Form.Item name="cargo" label={i18n.t(LocaleHelper.getDocumentCreateCargo())}>
                        <TextArea rows={4} />
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item name="transport" label={i18n.t(LocaleHelper.getDocumentCreateTransport())}>
                        <TextArea rows={4} />
                    </Form.Item>
                </Col>
            </Row>
        </Card>

        <Card title={i18n.t(LocaleHelper.getDocumentCreateAttachment())} style={{ marginBottom: 24 }}>
             <Form.Item name="attachments">
                <Upload>
                    <Button icon={<UploadOutlined />}>Click to Upload</Button>
                </Upload>
             </Form.Item>
        </Card>
      </Form>
    </div>
  );
};

export default DocumentCreate;
