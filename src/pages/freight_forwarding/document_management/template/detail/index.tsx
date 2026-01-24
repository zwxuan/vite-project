import React from 'react';
import { Descriptions, Button, Card, Space, Tabs, Table, Tag } from 'antd';
import { useNavigate, useParams } from 'react-router-dom';
import CustomIcon from "@/components/custom-icon";
import i18n from '@/i18n';
import LocaleHelper from '@/utils/locale';
import '@/pages/page_list.less';

const { TabPane } = Tabs;

const DocumentTemplateDetail: React.FC = () => {
    const navigate = useNavigate();
    const { id } = useParams();

    // Mock data - in a real app, fetch based on ID
    const mockData = {
        name: 'Bill of Lading Template A',
        category: 'Ocean Freight',
        version: '1.0',
        status: 'Active',
        description: 'Standard BOL template for outgoing shipments.',
        createdBy: 'Admin',
        createdAt: '2023-10-01',
        transportMode: 'Sea',
        customer: 'Global Logistics Inc.',
        route: 'Asia-US',
        paperSize: 'A4',
        orientation: 'Portrait',
        fields: [
            { key: '1', name: 'Shipper', visible: true, mandatory: true, defaultValue: '' },
            { key: '2', name: 'Consignee', visible: true, mandatory: true, defaultValue: '' },
            { key: '3', name: 'Notify Party', visible: true, mandatory: false, defaultValue: '' },
            { key: '4', name: 'Port of Loading', visible: true, mandatory: true, defaultValue: '' },
            { key: '5', name: 'Port of Discharge', visible: true, mandatory: true, defaultValue: '' },
        ]
    };

    return (
        <div style={{ overflowY: 'auto', overflowX: 'hidden', height: 'calc(100vh - 80px)' }}>
            <div className="nc-bill-header-area">
                <div className="header-title-search-area">
                    <div className="BillHeadInfoWrap">
                        <span className="bill-info-title" style={{ marginLeft: "10px" }}>
                            <CustomIcon type="icon-Currency" style={{ color: 'red', fontSize: '24px' }} />
                            {i18n.t(LocaleHelper.getDocumentTemplateDetail())}
                        </span>
                    </div>
                </div>
                <div className="header-button-area">
                    <div className="buttonGroup-component">
                        <div className="u-button-group">
                            <Space>
                                <Button onClick={() => navigate(-1)}>{i18n.t(LocaleHelper.getDocumentTemplateBack())}</Button>
                                <Button type="primary" onClick={() => navigate(`/document_management/template/edit/${id || '1'}`)}>{i18n.t(LocaleHelper.getDocumentTemplateEdit())}</Button>
                            </Space>
                        </div>
                    </div>
                </div>
            </div>

            <div className='nc-bill-table-area'>
                <Card bordered={false}>
                    <Tabs defaultActiveKey="1">
                         <TabPane tab={i18n.t(LocaleHelper.getDocumentTemplateTabBasic())} key="1">
                            <Descriptions title={i18n.t(LocaleHelper.getDocumentTemplateTitle())} bordered>
                                <Descriptions.Item label={i18n.t(LocaleHelper.getDocumentTemplateName())}>{mockData.name}</Descriptions.Item>
                                <Descriptions.Item label={i18n.t(LocaleHelper.getDocumentTemplateCategory())}>{mockData.category}</Descriptions.Item>
                                <Descriptions.Item label={i18n.t(LocaleHelper.getDocumentTemplateVersion())}>{mockData.version}</Descriptions.Item>
                                <Descriptions.Item label={i18n.t(LocaleHelper.getDocumentTemplateStatus())}><Tag color="green">{mockData.status}</Tag></Descriptions.Item>
                                <Descriptions.Item label={i18n.t(LocaleHelper.getDocumentTemplateCreatedBy())}>{mockData.createdBy}</Descriptions.Item>
                                <Descriptions.Item label={i18n.t(LocaleHelper.getDocumentTemplateCreatedAt())}>{mockData.createdAt}</Descriptions.Item>
                                <Descriptions.Item label={i18n.t(LocaleHelper.getDocumentTemplateDescription())} span={3}>{mockData.description}</Descriptions.Item>
                            </Descriptions>
                        </TabPane>

                        <TabPane tab={i18n.t(LocaleHelper.getDocumentTemplateTabRules())} key="2">
                             <Descriptions bordered column={2}>
                                <Descriptions.Item label={i18n.t(LocaleHelper.getDocumentTemplateTransportMode())}>{mockData.transportMode}</Descriptions.Item>
                                <Descriptions.Item label={i18n.t(LocaleHelper.getDocumentTemplateCustomer())}>{mockData.customer}</Descriptions.Item>
                                <Descriptions.Item label={i18n.t(LocaleHelper.getDocumentTemplateRoute())}>{mockData.route}</Descriptions.Item>
                             </Descriptions>
                        </TabPane>

                        <TabPane tab={i18n.t(LocaleHelper.getDocumentTemplateTabFields())} key="3">
                            <Table
                                dataSource={mockData.fields}
                                pagination={false}
                                columns={[
                                    { title: i18n.t(LocaleHelper.getDocumentTemplateFieldName()), dataIndex: 'name' },
                                    { title: i18n.t(LocaleHelper.getDocumentTemplateFieldVisible()), dataIndex: 'visible', render: (v) => v ? i18n.t(LocaleHelper.getDocumentTemplateYes()) : i18n.t(LocaleHelper.getDocumentTemplateNo()) },
                                    { title: i18n.t(LocaleHelper.getDocumentTemplateFieldMandatory()), dataIndex: 'mandatory', render: (v) => v ? i18n.t(LocaleHelper.getDocumentTemplateYes()) : i18n.t(LocaleHelper.getDocumentTemplateNo()) },
                                    { title: i18n.t(LocaleHelper.getDocumentTemplateFieldDefault()), dataIndex: 'defaultValue' },
                                ]}
                            />
                        </TabPane>

                        <TabPane tab={i18n.t(LocaleHelper.getDocumentTemplateTabPrint())} key="4">
                            <Descriptions bordered column={2}>
                                <Descriptions.Item label={i18n.t(LocaleHelper.getDocumentTemplatePaperSize())}>{mockData.paperSize}</Descriptions.Item>
                                <Descriptions.Item label={i18n.t(LocaleHelper.getDocumentTemplateOrientation())}>{mockData.orientation}</Descriptions.Item>
                            </Descriptions>
                        </TabPane>
                    </Tabs>
                </Card>
            </div>
        </div>
    );
};

export default DocumentTemplateDetail;