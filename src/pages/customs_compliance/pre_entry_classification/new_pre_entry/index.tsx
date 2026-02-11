import React, { useState, useEffect } from 'react';
import { Card, Form, Input, Select, Button, Space, message, Row, Col, Table, InputNumber, Tooltip } from 'antd';
import { useNavigate, useSearchParams } from 'react-router-dom';
import CustomIcon from '@/components/custom-icon';
import LocaleHelper from '@/utils/locale';
import i18n from '@/i18n';
import { createPreEntry, getPreEntryDetail, updatePreEntry, PreEntryGoods } from '@/api/customs_compliance/pre_entry_classification/new_pre_entry_service';

const { Option } = Select;

const NewPreEntry: React.FC = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const id = searchParams.get('id');
  const mode = searchParams.get('mode') || 'create'; // create, edit, view
  const isView = mode === 'view';

  const [loading, setLoading] = useState(false);
  const [goodsList, setGoodsList] = useState<PreEntryGoods[]>([]);

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
      const newGoods: PreEntryGoods = {
          key: Date.now(),
          seq: goodsList.length + 1,
          name: 'New Goods',
          spec: 'Spec...',
          qty: 100,
          unit: 'PCS',
          unit_price: 100,
          total_price: 10000,
          hs_code: '待归类'
      };
      setGoodsList([...goodsList, newGoods]);
  };

  const handleGoodsChange = (key: string | number, field: keyof PreEntryGoods, value: any) => {
      const newGoodsList = goodsList.map(item => {
          if (item.key === key) {
              const updatedItem = { ...item, [field]: value };
              if (field === 'qty' || field === 'unit_price') {
                  updatedItem.total_price = (updatedItem.qty || 0) * (updatedItem.unit_price || 0);
              }
              return updatedItem;
          }
          return item;
      });
      setGoodsList(newGoodsList);
  };

  const goodsColumns = [
      { title: i18n.t(LocaleHelper.getNewPreEntrySeq()), dataIndex: 'seq', width: 60 },
      { 
          title: i18n.t(LocaleHelper.getNewPreEntryGoodsName()), 
          dataIndex: 'name',
          render: (text: string, record: PreEntryGoods) => {
              if (isView) return text;
              return <Input value={text} onChange={e => handleGoodsChange(record.key, 'name', e.target.value)} />;
          }
      },
      { 
          title: i18n.t(LocaleHelper.getNewPreEntrySpec()), 
          dataIndex: 'spec',
          render: (text: string, record: PreEntryGoods) => {
              if (isView) return text;
              return <Input value={text} onChange={e => handleGoodsChange(record.key, 'spec', e.target.value)} />;
          }
      },
      { 
          title: i18n.t(LocaleHelper.getNewPreEntryQty()), 
          dataIndex: 'qty',
          render: (text: number, record: PreEntryGoods) => {
              if (isView) return text;
              return <InputNumber value={text} onChange={val => handleGoodsChange(record.key, 'qty', val)} style={{ width: '100%' }} />;
          }
      },
      { 
          title: i18n.t(LocaleHelper.getNewPreEntryUnit()), 
          dataIndex: 'unit',
          render: (text: string, record: PreEntryGoods) => {
              if (isView) return text;
              return <Input value={text} onChange={e => handleGoodsChange(record.key, 'unit', e.target.value)} />;
          }
      },
      { 
          title: i18n.t(LocaleHelper.getNewPreEntryUnitPrice()), 
          dataIndex: 'unit_price', 
          render: (text: number, record: PreEntryGoods) => {
              if (isView) return text?.toFixed(2);
              return <InputNumber value={text} onChange={val => handleGoodsChange(record.key, 'unit_price', val)} style={{ width: '100%' }} />;
          }
      },
      { 
          title: i18n.t(LocaleHelper.getNewPreEntryTotalPrice()), 
          dataIndex: 'total_price', 
          render: (text: number, record: PreEntryGoods) => {
              if (isView) return text?.toFixed(2);
              return <InputNumber value={text} onChange={val => handleGoodsChange(record.key, 'total_price', val)} style={{ width: '100%' }} />;
          }
      },
      { 
          title: i18n.t(LocaleHelper.getNewPreEntryHsCode()), 
          dataIndex: 'hs_code',
          render: (text: string, record: PreEntryGoods) => {
              if (isView) return text;
              return <Input value={text} onChange={e => handleGoodsChange(record.key, 'hs_code', e.target.value)} />;
          }
      },
      {
          title: i18n.t(LocaleHelper.getNewPreEntryAction()),
          width: 150,
          render: (_: any, record: any) => (
              <Space>
                  <a onClick={() => { message.info('跳转归类页面...') }}>{i18n.t(LocaleHelper.getNewPreEntryClassify())}</a>
                  <a onClick={() => {
                      setGoodsList(goodsList.filter(item => item.key !== record.key));
                  }} style={{ color: 'red' }}>{i18n.t(LocaleHelper.getNewPreEntryDelete())}</a>
              </Space>
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
              <Tooltip
                  title={
                      <div className='rul_title_tooltip' style={{ backgroundColor: '#fff', color: '#000' }}>
                          <ol style={{ color: '#666666', fontSize: '12px', paddingLeft: '2px' }}>
                              <li style={{ marginBottom: '10px' }}>
                                  <span style={{ marginRight: '10px', backgroundColor: '#f1f1f1', padding: '2px 10px' }}>
                                      <b>{i18n.t(LocaleHelper.getNewPreEntryHelpLabel())}</b>
                                  </span>
                                  <ul style={{ listStyleType: 'circle', paddingLeft: '20px', marginTop: '10px', lineHeight: '1.8' }}>
                                      <li>
                                          <b>{i18n.t(LocaleHelper.getNewPreEntryHelpRoleLabel())}</b>
                                          {i18n.t(LocaleHelper.getNewPreEntryHelpRoleDesc())}
                                      </li>
                                      <li>
                                          <b>{i18n.t(LocaleHelper.getNewPreEntryHelpOriginLabel())}</b>
                                          {i18n.t(LocaleHelper.getNewPreEntryHelpOriginDesc())}
                                      </li>
                                      <li>
                                          <b>{i18n.t(LocaleHelper.getNewPreEntryHelpFuncLabel())}</b>
                                          {i18n.t(LocaleHelper.getNewPreEntryHelpFuncSaveDraft())}；{i18n.t(LocaleHelper.getNewPreEntryHelpFuncSubmitClassify())}
                                      </li>
                                  </ul>
                              </li>
                          </ol>
                      </div>
                  }
                  color='white'
              >
                  <i className='iconfont icon-bangzhutishi' style={{ cursor: 'pointer', marginLeft: '10px' }}></i>
              </Tooltip>
            </span>
          </div>
        </div>
        <div className="header-button-area">
             <span className="button-app-wrapper"></span>
             <div className="buttonGroup-component">
                <div className="u-button-group">
                    {!isView && (
                        <>
                            <Button onClick={() => message.success('Draft saved')}>{i18n.t(LocaleHelper.getNewPreEntrySaveDraft())}</Button>
                            <Button type="primary" onClick={() => form.submit()} loading={loading}>
                                {i18n.t(LocaleHelper.getNewPreEntrySubmitClassify())}
                            </Button>
                        </>
                    )}
                    <Button onClick={() => navigate(-1)}>{i18n.t(LocaleHelper.getNewPreEntryCancel())}</Button>
                </div>
             </div>
        </div>
      </div>

      <div style={{ padding: '16px' }}>
        <Form form={form} layout="vertical" onFinish={onFinish} disabled={isView}>
          
          {/* 基本信息 */}
          <Card title={i18n.t(LocaleHelper.getNewPreEntryBasicInfo())} bordered={false} style={{ marginBottom: 16 }}>
            <Row gutter={24}>
              <Col span={8}>
                <Form.Item name="job_id" label={i18n.t(LocaleHelper.getNewPreEntryRelatedJob())} rules={[{ required: true }]}>
                  <Input placeholder={i18n.t(LocaleHelper.getNewPreEntrySelectJob())} addonAfter={<a onClick={() => message.info('选择作业')}>{i18n.t(LocaleHelper.getNewPreEntrySelectJob())}</a>} />
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
                <Form.Item name="exemption_nature" label={i18n.t(LocaleHelper.getNewPreEntryExemptionNature())}>
                   <Input placeholder={i18n.t(LocaleHelper.getNewPreEntryExemptionNature())} />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item name="transport_mode" label={i18n.t(LocaleHelper.getNewPreEntryTransportMode())} rules={[{ required: true }]}>
                   <Input placeholder={i18n.t(LocaleHelper.getNewPreEntryTransportMode())} />
                </Form.Item>
              </Col>
              <Col span={8}>
                 {/* Empty col for alignment or additional field */}
              </Col>
            </Row>
            <Row gutter={24}>
               <Col span={8}>
                  <Form.Item name="port_of_shipment" label={i18n.t(LocaleHelper.getNewPreEntryPortOfShipment())}>
                      <Input placeholder={i18n.t(LocaleHelper.getNewPreEntryPortOfShipment())} />
                  </Form.Item>
               </Col>
               <Col span={8}>
                  <Form.Item name="port_of_destination" label={i18n.t(LocaleHelper.getNewPreEntryPortOfDestination())}>
                      <Input placeholder={i18n.t(LocaleHelper.getNewPreEntryPortOfDestination())} />
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

          {/* 收发货人信息 */}
          <Card title={i18n.t(LocaleHelper.getNewPreEntryConsignorConsigneeInfo())} bordered={false} style={{ marginBottom: 16 }}>
            <Row gutter={24}>
               <Col span={12}>
                  <Form.Item name="consignee_name" label={i18n.t(LocaleHelper.getNewPreEntryConsignee())} rules={[{ required: true }]}>
                      <Input placeholder={i18n.t(LocaleHelper.getNewPreEntryConsignee())} addonAfter={<a onClick={() => message.info('Select Customer')}>{i18n.t(LocaleHelper.getNewPreEntrySelectCustomer())}</a>} />
                  </Form.Item>
               </Col>
               <Col span={12}>
                  <Form.Item name="consignee_address" label={i18n.t(LocaleHelper.getNewPreEntryConsigneeAddress())}>
                      <Input placeholder={i18n.t(LocaleHelper.getNewPreEntryConsigneeAddress())} />
                  </Form.Item>
               </Col>
            </Row>
            <Row gutter={24}>
               <Col span={12}>
                  <Form.Item name="shipper_name" label={i18n.t(LocaleHelper.getNewPreEntryConsignor())} rules={[{ required: true }]}>
                      <Input placeholder={i18n.t(LocaleHelper.getNewPreEntryConsignor())} addonAfter={<a onClick={() => message.info('Select Customer')}>{i18n.t(LocaleHelper.getNewPreEntrySelectCustomer())}</a>} />
                  </Form.Item>
               </Col>
               <Col span={12}>
                  <Form.Item name="shipper_address" label={i18n.t(LocaleHelper.getNewPreEntryConsignorAddress())}>
                      <Input placeholder={i18n.t(LocaleHelper.getNewPreEntryConsignorAddress())} />
                  </Form.Item>
               </Col>
            </Row>
          </Card>

          {/* 承运信息 */}
          <Card title={i18n.t(LocaleHelper.getNewPreEntryTransportInfo())} bordered={false} style={{ marginBottom: 16 }}>
             <Row gutter={24}>
                <Col span={8}>
                   <Form.Item name="carrier_name" label={i18n.t(LocaleHelper.getNewPreEntryCarrier())}>
                       <Input placeholder={i18n.t(LocaleHelper.getNewPreEntryCarrier())} />
                   </Form.Item>
                </Col>
                <Col span={8}>
                   <Form.Item label={i18n.t(LocaleHelper.getNewPreEntryVesselVoyage())} style={{ marginBottom: 24 }}>
                       <Row gutter={8}>
                          <Col span={12}>
                            <Form.Item name="vessel_name" noStyle>
                                <Input placeholder="船名" />
                            </Form.Item>
                          </Col>
                          <Col span={12}>
                            <Form.Item name="voyage_no" noStyle>
                                <Input placeholder="航次" />
                            </Form.Item>
                          </Col>
                       </Row>
                   </Form.Item>
                </Col>
             </Row>
             <Row gutter={24}>
                <Col span={8}>
                   <Form.Item name="bill_no" label={i18n.t(LocaleHelper.getNewPreEntryBillOfLadingNo())}>
                       <Input placeholder={i18n.t(LocaleHelper.getNewPreEntryBillOfLadingNo())} />
                   </Form.Item>
                </Col>
                <Col span={8}>
                   <Form.Item name="container_no" label={i18n.t(LocaleHelper.getNewPreEntryContainerNo())}>
                       <Input placeholder={i18n.t(LocaleHelper.getNewPreEntryContainerNo())} />
                   </Form.Item>
                </Col>
             </Row>
          </Card>

          {/* 商品信息 */}
          <Card 
            title={i18n.t(LocaleHelper.getNewPreEntryGoodsInfo())} 
            bordered={false} 
            extra={
                !isView && (
                    <Space>
                        <Button>{i18n.t(LocaleHelper.getNewPreEntrySelectFromTemplate())}</Button>
                        <Button>{i18n.t(LocaleHelper.getNewPreEntryBatchImport())}</Button>
                        <Button type="primary" onClick={handleAddGoods}>{i18n.t(LocaleHelper.getNewPreEntryAddGoods())}</Button>
                    </Space>
                )
            }
          >
              <Table 
                dataSource={goodsList} 
                columns={isView ? goodsColumns.filter(c => c.dataIndex !== undefined && c.title !== i18n.t(LocaleHelper.getNewPreEntryAction())) : goodsColumns} 
                pagination={false} 
                footer={() => (
                    <Row gutter={24} justify="end" style={{ textAlign: 'right', fontSize: '14px' }}>
                        <Col>
                            {i18n.t(LocaleHelper.getNewPreEntryTotalAmount())}: <span style={{ fontWeight: 'bold', marginLeft: 8 }}>USD 55,000.00</span>
                        </Col>
                        <Col>
                            {i18n.t(LocaleHelper.getNewPreEntryEstimatedTax())}: <span style={{ fontWeight: 'bold', marginLeft: 8 }}>CNY 8,250.00</span>
                        </Col>
                    </Row>
                )}
              />
          </Card>
        </Form>
      </div>
    </div>
  );
};

export default NewPreEntry;
