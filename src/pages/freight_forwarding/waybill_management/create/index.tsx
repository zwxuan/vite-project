import React, { useEffect, useState } from 'react';
import { Card, Row, Col, Button, Form, Input, Select, DatePicker, InputNumber, Radio, message, Tabs, Tag, Descriptions, Space, Dropdown, Table, Steps, List, Upload, Timeline, Empty } from 'antd';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { DownOutlined, UploadOutlined, FileOutlined, ExclamationCircleOutlined, ClockCircleOutlined } from '@ant-design/icons';
import CustomIcon from "@/components/custom-icon";
import i18n from '@/i18n';
import LocaleHelper from '@/utils/locale';
import { getWaybillDetail, saveWaybill } from "@/api/freight_forwarding/waybill_management/waybill_service";
import '@/pages/page_list.less';
import dayjs from 'dayjs';

const { TextArea } = Input;
const { Option } = Select;
const { Step } = Steps;

const WaybillCreate: React.FC = () => {
    const [searchParams] = useSearchParams();
    const id = searchParams.get('id');
    const isReadonly = searchParams.get('readonly') === 'true';
    const navigate = useNavigate();
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
    const [activeTab, setActiveTab] = useState('1');

    // Mock Data for Tables
    const cargoData = [
        { key: '1', no: 1, desc: 'Electronics', hsCode: '850000', pcs: 100, pkg: 'Cartons', weight: 500, volume: 2.5, marks: 'N/M' }
    ];

    const feeData = [
        { key: '1', type: 'Receivable', item: 'Ocean Freight', unit: 'Container', qty: 1, price: 2000, amount: 2000, currency: 'USD', status: 'Unpaid' }
    ];

    const nodeData = [
        { title: 'Booking Confirmed', status: 'finish', date: '2024-03-15 10:00' },
        { title: 'Cargo Picked Up', status: 'finish', date: '2024-03-16 14:30' },
        { title: 'Gate In', status: 'process', date: '2024-03-18' },
        { title: 'Loaded on Vessel', status: 'wait', date: '2024-03-20' },
    ];

    const mockExceptions: any[] = []; // Mock empty exceptions
    const columnsExceptions = [
        { title: i18n.t(LocaleHelper.getWaybillCreateExceptionType()), dataIndex: 'type', key: 'type' },
        { title: i18n.t(LocaleHelper.getWaybillCreateExceptionDesc()), dataIndex: 'description', key: 'description' },
        { title: i18n.t(LocaleHelper.getWaybillCreateExceptionTime()), dataIndex: 'time', key: 'time' },
    ];

    useEffect(() => {
        if (id) {
            loadData(id);
        }
    }, [id]);

    const loadData = async (waybillId: string) => {
        setLoading(true);
        try {
            const res = await getWaybillDetail(waybillId);
            if (res.success && res.data) {
                const data = res.data;
                form.setFieldsValue({
                    ...data,
                    etd: data.etd ? dayjs(data.etd) : null,
                    eta: data.eta ? dayjs(data.eta) : null,
                    ...(data as any).isDangerous !== undefined && { isDangerous: (data as any).isDangerous ? 'yes' : 'no' }
                });
            }
        } catch (error) {
            console.error(error);
            message.error('Load failed');
        }
        setLoading(false);
    };

    const handleSave = async () => {
        try {
            const values = await form.validateFields();
            const res = await saveWaybill(values);
            if (res.success) {
                message.success('Saved successfully');
                navigate('/waybill_management/list');
            }
        } catch (error) {
            console.error(error);
        }
    };

    const handleSubmit = async () => {
        message.success('Submitted for audit');
    };

    const handleAction = (action: string) => {
        message.info(`Action triggered: ${action}`);
    };

    const moreActionsMenu = (
        <div style={{ padding: 8, background: '#fff', boxShadow: '0 2px 8px rgba(0,0,0,0.15)', borderRadius: 4 }}>
            <div style={{ padding: '4px 8px', cursor: 'pointer' }} onClick={() => handleAction('Copy')}>{i18n.t(LocaleHelper.getWaybillTemplateCopy())}</div>
            <div style={{ padding: '4px 8px', cursor: 'pointer' }} onClick={() => handleAction('Archive')}>{i18n.t(LocaleHelper.getWaybillArchiveDoArchive())}</div>
            <div style={{ padding: '4px 8px', cursor: 'pointer', color: 'red' }} onClick={() => handleAction('Void')}>{i18n.t(LocaleHelper.getWaybillListDelete())}</div>
        </div>
    );

    const renderInfoBanner = () => (
        <Card bordered={false} className="nc-bill-card" style={{ marginBottom: 16 }}>
            <Descriptions size="small" column={4}>
                <Descriptions.Item label={i18n.t(LocaleHelper.getWaybillListStatus())}>
                    <Tag color="blue">ISSUED</Tag>
                </Descriptions.Item>
                <Descriptions.Item label={i18n.t(LocaleHelper.getWaybillListTransportMode())}>
                    <Tag color="cyan">SEA</Tag>
                </Descriptions.Item>
                <Descriptions.Item label={i18n.t(LocaleHelper.getWaybillCreateCustomer())}>ABC Trading Co.</Descriptions.Item>
                <Descriptions.Item label={i18n.t(LocaleHelper.getWaybillCreateBusinessType())}>FCL</Descriptions.Item>
                
                <Descriptions.Item label={i18n.t(LocaleHelper.getWaybillListWaybillNo())}>{id || 'New'}</Descriptions.Item>
                <Descriptions.Item label={i18n.t(LocaleHelper.getWaybillListOrderNo())}>ORD-2024001</Descriptions.Item>
                <Descriptions.Item label={i18n.t(LocaleHelper.getWaybillListJobNo())}>JOB-2024001</Descriptions.Item>
                <Descriptions.Item label={i18n.t(LocaleHelper.getWaybillListCarrier())}>COSCO</Descriptions.Item>
                
                <Descriptions.Item label={i18n.t(LocaleHelper.getWaybillCreateMbl())}>MBL123456</Descriptions.Item>
                <Descriptions.Item label={i18n.t(LocaleHelper.getWaybillCreateHbl())}>HBL123456</Descriptions.Item>
            </Descriptions>
        </Card>
    );

    const renderTabs = () => {
        const items = [
            {
                key: '1',
                label: i18n.t(LocaleHelper.getWaybillCreateTabOverview()),
                children: (
                    <Row gutter={16}>
                        <Col span={16}>
                             <Card title={i18n.t(LocaleHelper.getWaybillCreateRoute())} size="small" style={{ marginBottom: 16 }}>
                                <Steps current={1} size="small">
                                    {nodeData.map((node, index) => (
                                        <Step key={index} title={node.title} description={node.date} status={node.status as any} />
                                    ))}
                                </Steps>
                             </Card>
                             <Card title={i18n.t(LocaleHelper.getWaybillCreateSummary())} size="small">
                                <Descriptions column={3}>
                                    <Descriptions.Item label={i18n.t(LocaleHelper.getWaybillCreatePackages())}>100</Descriptions.Item>
                                    <Descriptions.Item label={i18n.t(LocaleHelper.getWaybillCreateGrossWeight())}>500 KGS</Descriptions.Item>
                                    <Descriptions.Item label={i18n.t(LocaleHelper.getWaybillCreateVolume())}>2.5 CBM</Descriptions.Item>
                                    <Descriptions.Item label={i18n.t(LocaleHelper.getWaybillCreateValue())}>$50,000</Descriptions.Item>
                                </Descriptions>
                             </Card>
                        </Col>
                        <Col span={8}>
                            <Card title={i18n.t(LocaleHelper.getWaybillCreateLatestUpdates())} size="small">
                                <Timeline>
                                    <Timeline.Item color="green">Shipment created 2024-03-15</Timeline.Item>
                                    <Timeline.Item color="green">Booking Confirmed 2024-03-15</Timeline.Item>
                                    <Timeline.Item color="blue">Docs uploaded 2024-03-16</Timeline.Item>
                                </Timeline>
                            </Card>
                        </Col>
                    </Row>
                )
            },
            {
                key: '2',
                label: i18n.t(LocaleHelper.getWaybillCreateTabBasic()),
                children: (
                    <Row gutter={16}>
                        <Col span={8}>
                            <Form.Item label={i18n.t(LocaleHelper.getWaybillCreateTransportMode())} name="transportMode"><Radio.Group><Radio value="SEA">SEA</Radio><Radio value="AIR">AIR</Radio></Radio.Group></Form.Item>
                            <Form.Item label={i18n.t(LocaleHelper.getWaybillCreateRelatedJob())} name="jobNo"><Select><Option value="JOB-001">JOB-001</Option></Select></Form.Item>
                            <Form.Item label={i18n.t(LocaleHelper.getWaybillCreateCarrier())} name="carrier"><Input /></Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item label={i18n.t(LocaleHelper.getWaybillCreateOrigin())} name="origin"><Input /></Form.Item>
                            <Form.Item label={i18n.t(LocaleHelper.getWaybillCreateDestination())} name="destination"><Input /></Form.Item>
                            <Form.Item label={i18n.t(LocaleHelper.getWaybillCreateEtd())} name="etd"><DatePicker style={{width:'100%'}} /></Form.Item>
                            <Form.Item label={i18n.t(LocaleHelper.getWaybillCreateEta())} name="eta"><DatePicker style={{width:'100%'}} /></Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item label={i18n.t(LocaleHelper.getWaybillCreateRemarks())} name="remarks"><TextArea rows={4} /></Form.Item>
                        </Col>
                    </Row>
                )
            },
            {
                key: '3',
                label: i18n.t(LocaleHelper.getWaybillCreateTabParties()),
                children: (
                    <Row gutter={16}>
                        <Col span={12}><Form.Item label={i18n.t(LocaleHelper.getWaybillCreateShipper())} name="shipper"><TextArea rows={3} /></Form.Item></Col>
                        <Col span={12}><Form.Item label={i18n.t(LocaleHelper.getWaybillCreateConsignee())} name="consignee"><TextArea rows={3} /></Form.Item></Col>
                        <Col span={12}><Form.Item label={i18n.t(LocaleHelper.getWaybillCreateNotify())} name="notify"><TextArea rows={3} /></Form.Item></Col>
                        <Col span={12}><Form.Item label={i18n.t(LocaleHelper.getWaybillCreateBookingAgent())} name="agent"><Input /></Form.Item></Col>
                    </Row>
                )
            },
            {
                key: '4',
                label: i18n.t(LocaleHelper.getWaybillCreateTabCargo()),
                children: (
                    <Table dataSource={cargoData} columns={[
                        { title: 'No', dataIndex: 'no' },
                        { title: i18n.t(LocaleHelper.getWaybillCreateCommodity()), dataIndex: 'desc' },
                        { title: 'HS Code', dataIndex: 'hsCode' },
                        { title: i18n.t(LocaleHelper.getWaybillCreatePackages()), dataIndex: 'pcs' },
                        { title: i18n.t(LocaleHelper.getWaybillCreateGrossWeight()), dataIndex: 'weight' },
                        { title: i18n.t(LocaleHelper.getWaybillCreateVolume()), dataIndex: 'volume' },
                    ]} pagination={false} size="small" />
                )
            },
            {
                key: '5',
                label: i18n.t(LocaleHelper.getWaybillCreateTabTransport()),
                children: (
                    <Row gutter={16}>
                        <Col span={8}><Form.Item label={i18n.t(LocaleHelper.getWaybillCreateVesselName())} name="vessel"><Input /></Form.Item></Col>
                        <Col span={8}><Form.Item label={i18n.t(LocaleHelper.getWaybillCreateVoyage())} name="voyage"><Input /></Form.Item></Col>
                    </Row>
                )
            },
            {
                key: '6',
                label: i18n.t(LocaleHelper.getWaybillCreateTabFees()),
                children: (
                     <Table dataSource={feeData} columns={[
                        { title: 'Type', dataIndex: 'type' },
                        { title: i18n.t(LocaleHelper.getWaybillCreateFeeItem()), dataIndex: 'item' },
                        { title: 'Unit', dataIndex: 'unit' },
                        { title: i18n.t(LocaleHelper.getWaybillCreateAmount()), dataIndex: 'amount' },
                        { title: 'Currency', dataIndex: 'currency' },
                        { title: i18n.t(LocaleHelper.getWaybillCreateStatus()), dataIndex: 'status' },
                    ]} pagination={false} size="small" />
                )
            },
            {
                key: '7',
                label: i18n.t(LocaleHelper.getWaybillCreateTabDocs()),
                children: (
                    <div>
                        <div style={{ padding: '24px', textAlign: 'center', border: '1px dashed #d9d9d9', background: '#fafafa', marginBottom: '16px' }}>
                            <p>{i18n.t(LocaleHelper.getWaybillCreateDragDrop())}</p>
                            <Button icon={<CustomIcon type="icon-CloudUpload" />}>{i18n.t(LocaleHelper.getWaybillCreateUploadFile())}</Button>
                        </div>
                        <List
                            header={<div>{i18n.t(LocaleHelper.getWaybillCreateTabDocs())} List</div>}
                            dataSource={['Bill of Lading.pdf', 'Commercial Invoice.pdf']}
                            renderItem={item => <List.Item><FileOutlined /> {item}</List.Item>}
                        />
                    </div>
                )
            },
             {
                key: '8',
                label: i18n.t(LocaleHelper.getWaybillCreateTabExceptions()),
                children: (
                    mockExceptions.length > 0 ? (
                        <Table dataSource={mockExceptions} columns={columnsExceptions} pagination={false} scroll={{ x: 'max-content' }} />
                    ) : (
                        <Empty description={i18n.t(LocaleHelper.getWaybillCreateNoExceptions())} />
                    )
                )
            },
            {
                key: '9',
                label: i18n.t(LocaleHelper.getWaybillCreateTabLogs()),
                children: (
                    <List
                        dataSource={['User1 created waybill at 2024-03-15 10:00', 'User1 updated status at 2024-03-15 11:00']}
                        renderItem={item => <List.Item><ClockCircleOutlined /> {item}</List.Item>}
                    />
                )
            }
        ];

        return <Tabs activeKey={activeTab} onChange={setActiveTab} items={items} />;
    };

    return (
        <div style={{ overflowY: 'auto', overflowX: 'hidden', height: 'calc(100vh - 80px)' }}>
            <div className="nc-bill-header-area">
                <div className="header-title-search-area">
                    <div className="BillHeadInfoWrap BillHeadInfoWrap-showBackBtn">
                        <span className="bill-info-title" style={{ marginLeft: "10px" }}>
                            <CustomIcon type="icon-Currency" style={{ color: 'red', fontSize: '24px' }} />
                            {i18n.t(LocaleHelper.getWaybillCreateTitle())} {id ? `- ${id}` : '- New'}
                        </span>
                    </div>
                </div>
                <div className="header-button-area">
                    <div className="buttonGroup-component">
                        <div className="u-button-group">
                            {!isReadonly && (
                                <>
                                    <Button onClick={() => handleAction('Edit')}>{i18n.t(LocaleHelper.getWaybillCreateEdit())}</Button>
                                    <Button onClick={handleSubmit}>{i18n.t(LocaleHelper.getWaybillCreateAudit())}</Button>
                                    <Button type="primary" onClick={handleSave} loading={loading}>{i18n.t(LocaleHelper.getWaybillCreateSave())}</Button>
                                    <Button onClick={() => handleAction('Confirm')}>{i18n.t(LocaleHelper.getWaybillCreateConfirm())}</Button>
                                    <Button onClick={() => handleAction('Sync')}>{i18n.t(LocaleHelper.getWaybillCreateSyncStatus())}</Button>
                                    <Button onClick={() => handleAction('Doc')}>{i18n.t(LocaleHelper.getWaybillCreateGenerateDoc())}</Button>
                                    <Button onClick={() => handleAction('Print')}>{i18n.t(LocaleHelper.getWaybillCreatePrint())}</Button>
                                    <Dropdown overlay={moreActionsMenu}>
                                        <Button>{i18n.t(LocaleHelper.getWaybillCreateMore())} <DownOutlined /></Button>
                                    </Dropdown>
                                </>
                            )}
                            <Button onClick={() => navigate('/waybill_management/list')}>
                                {i18n.t(LocaleHelper.getWaybillCreateBackToList())}
                            </Button>
                        </div>
                    </div>
                </div>
            </div>

            <div style={{ padding: '10px' }}>
                <Form form={form} layout="vertical" disabled={isReadonly}>
                    {renderInfoBanner()}
                    <Card bordered={false} className="nc-bill-card">
                        {renderTabs()}
                    </Card>
                </Form>
            </div>
        </div>
    );
};

export default WaybillCreate;
