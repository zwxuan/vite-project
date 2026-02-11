import React, { useState, useEffect } from 'react';
import { Card, Form, Input, Select, Button, Space, message, Row, Col, Divider, Table } from 'antd';
import { useNavigate, useSearchParams } from 'react-router-dom';
import CustomIcon from '@/components/custom-icon';
import LocaleHelper from '@/utils/locale';
import i18n from '@/i18n';
import { createPreEntry, getPreEntryDetail, updatePreEntry } from '@/api/customs_compliance/pre_entry_classification/new_pre_entry_service';

const { Option } = Select;

const NewPreEntry: React.FC = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const id = searchParams.get('id');
  const mode = searchParams.get('mode') || 'create'; // create, edit, view
  const isView = mode === 'view';

  const [loading, setLoading] = useState(false);
  const [goodsList, setGoodsList] = useState<any[]>([]);

  useEffect(() => {
    if (id) {
        fetchDetail(id);
    }
  }, [id]);

  const fetchDetail = async (id: string) => {
      setLoading(true);
      try {
          const res = await getPreEntryDetail(id);
          if (res.success && res.data) {
              form.setFieldsValue(res.data);
              setGoodsList(res.data.goods_list || []);
          }
      } catch (error) {
          message.error('Failed to load detail');
      } finally {
          setLoading(false);
      }
  };

  const onFinish = async (values: any) => {
    if (isView) return;
    setLoading(true);
    try {
      let res;
      if (mode === 'edit' && id) {
          res = await updatePreEntry(id, { ...values, goods_list: goodsList });
      } else {
          res = await createPreEntry({ ...values, goods_list: goodsList });
      }
      
      if (res.success) {
        message.success(mode === 'edit' ? 'Updated successfully' : i18n.t(LocaleHelper.getNewPreEntrySubmitSuccess()));
        navigate('/pre_entry_classification/pre_entry_workbench');
      }
    } catch (error) {
      message.error(i18n.t(LocaleHelper.getNewPreEntrySubmitFail()));
    } finally {
      setLoading(false);
    }
  };


  const handleAddGoods = () => {
      // Mock add goods
      const newGoods = {
          key: Date.now(),
          seq: goodsList.length + 1,
          name: 'New Goods',
          spec: 'Spec...',
          qty: 100,
          unit: 'PCS'
      };
      setGoodsList([...goodsList, newGoods]);
  };

  const goodsColumns = [
      { title: i18n.t(LocaleHelper.getNewPreEntrySeq()), dataIndex: 'seq' },
      { title: i18n.t(LocaleHelper.getNewPreEntryGoodsName()), dataIndex: 'name' },
      { title: i18n.t(LocaleHelper.getNewPreEntrySpec()), dataIndex: 'spec' },
      { title: i18n.t(LocaleHelper.getNewPreEntryQty()), dataIndex: 'qty' },
      { title: i18n.t(LocaleHelper.getNewPreEntryUnit()), dataIndex: 'unit' },
      {
          title: i18n.t(LocaleHelper.getNewPreEntryAction()),
          render: (_: any, record: any) => (
              <a onClick={() => {
                  setGoodsList(goodsList.filter(item => item.key !== record.key));
              }}>{i18n.t(LocaleHelper.getNewPreEntryDelete())}</a>
          )
      }
  ];

  return (
    <div style={{ height: 'calc(100vh - 80px)', overflowY: 'auto' }}>
      <div className="nc-bill-header-area">
        <div className="header-title-search-area">
          <div className="BillHeadInfoWrap BillHeadInfoWrap-showBackBtn">
            <span className="bill-info-title">
              <CustomIcon type="icon-Currency" style={{ color: 'red', fontSize: '24px', marginRight: '8px' }} />
              {i18n.t(LocaleHelper.getNewPreEntryPageTitle())}
            </span>
          </div>
        </div>
        <div className="header-button-area">
             <span className="button-app-wrapper"></span>
             <div className="buttonGroup-component">
                <div className="u-button-group">
                    {!isView && (
                        <Button type="primary" onClick={() => form.submit()} loading={loading}>
                            {i18n.t(LocaleHelper.getNewPreEntrySubmit())}
                        </Button>
                    )}
                    <Button onClick={() => navigate(-1)}>{i18n.t(LocaleHelper.getNewPreEntryCancel())}</Button>
                </div>
             </div>
        </div>
      </div>

      <div style={{ padding: '16px' }}>
        <Form form={form} layout="vertical" onFinish={onFinish} disabled={isView}>
          <Card title={i18n.t(LocaleHelper.getNewPreEntryBasicInfo())} bordered={false} style={{ marginBottom: 16 }}>
            <Row gutter={24}>
              <Col span={8}>
                <Form.Item name="job_id" label={i18n.t(LocaleHelper.getNewPreEntryRelatedJob())} rules={[{ required: true }]}>
                  <Input placeholder={i18n.t(LocaleHelper.getNewPreEntryRelatedJob())} />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item name="entry_type" label={i18n.t(LocaleHelper.getNewPreEntryEntryType())} rules={[{ required: true }]}>
                  <Select>
                    <Option value="import">{i18n.t(LocaleHelper.getNewPreEntryImport())}</Option>
                    <Option value="export">{i18n.t(LocaleHelper.getNewPreEntryExport())}</Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item name="trade_mode" label={i18n.t(LocaleHelper.getNewPreEntryTradeMode())} rules={[{ required: true }]}>
                  <Input placeholder={i18n.t(LocaleHelper.getNewPreEntryTradeMode())} />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={24}>
              <Col span={8}>
                <Form.Item name="transport_mode" label={i18n.t(LocaleHelper.getNewPreEntryTransportMode())} rules={[{ required: true }]}>
                   <Input placeholder={i18n.t(LocaleHelper.getNewPreEntryTransportMode())} />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item name="consignee" label={i18n.t(LocaleHelper.getNewPreEntryConsignee())} rules={[{ required: true }]}>
                   <Input placeholder={i18n.t(LocaleHelper.getNewPreEntryConsignee())} />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item name="shipper" label={i18n.t(LocaleHelper.getNewPreEntryShipper())} rules={[{ required: true }]}>
                   <Input placeholder={i18n.t(LocaleHelper.getNewPreEntryShipper())} />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={24}>
               <Col span={24}>
                  <Form.Item name="remarks" label={i18n.t(LocaleHelper.getNewPreEntryRemarks())}>
                      <Input.TextArea rows={2} placeholder={i18n.t(LocaleHelper.getNewPreEntryRemarks())} />
                  </Form.Item>
               </Col>
            </Row>
          </Card>

          <Card title={i18n.t(LocaleHelper.getNewPreEntryGoodsInfo())} bordered={false} extra={!isView && <Button onClick={handleAddGoods}>{i18n.t(LocaleHelper.getNewPreEntryAddGoods())}</Button>}>
              <Table dataSource={goodsList} columns={isView ? goodsColumns.filter(c => c.dataIndex !== undefined) : goodsColumns} pagination={false} />
          </Card>
        </Form>
      </div>
    </div>
  );
};

export default NewPreEntry;
