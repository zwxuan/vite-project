import '@/pages/page_list.less';
import React, { useState } from 'react';
import { Table, Button, Modal, Form, Radio, Input, Space, Descriptions } from 'antd';
import { RedoOutlined } from '@ant-design/icons';
import CustomIcon from "@/components/custom-icon";
import AdvancedSearchForm from "@/components/search-form";
import { fields } from './search_fields';
import LocaleHelper from '@/utils/locale';
import i18n from '@/i18n';

interface AuditItem {
    id: string;
    orderNo: string;
    customerName: string;
    amount: number;
    submitter: string;
    submitTime: string;
}

const OrderAudit: React.FC = () => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [currentOrder, setCurrentOrder] = useState<AuditItem | null>(null);

    // Mock Data
    const mockData: AuditItem[] = [
        { id: '1', orderNo: 'ORD-003', customerName: 'DEF Company', amount: 85000, submitter: 'Zhang', submitTime: '03-18 10:30' },
        { id: '2', orderNo: 'ORD-004', customerName: 'GHI Company', amount: 120000, submitter: 'Li', submitTime: '03-18 14:20' },
    ];

    const columns = [
        { title: i18n.t(LocaleHelper.getOrderManagementOrderNo()), dataIndex: 'orderNo', key: 'orderNo' },
        { title: i18n.t(LocaleHelper.getQueryCustomerName()), dataIndex: 'customerName', key: 'customerName' },
        { title: i18n.t(LocaleHelper.getOrderAuditOrderAmount()), dataIndex: 'amount', key: 'amount' },
        { title: i18n.t(LocaleHelper.getOrderAuditSubmitter()), dataIndex: 'submitter', key: 'submitter' },
        { title: i18n.t(LocaleHelper.getOrderAuditSubmissionTime()), dataIndex: 'submitTime', key: 'submitTime' },
        {
            title: i18n.t(LocaleHelper.getOrderListActions()),
            key: 'action',
            render: (_: any, record: AuditItem) => (
                <a onClick={() => { setCurrentOrder(record); setIsModalVisible(true); }}>
                    {i18n.t(LocaleHelper.getOrderAuditAuditResult())}
                </a>
            ),
        },
    ];

    const handleAuditSubmit = () => {
        setIsModalVisible(false);
    };

    return (
        <div style={{ overflowY: 'auto', overflowX: 'hidden', height: 'calc(100vh - 80px)' }}>
            <div className="nc-bill-header-area">
                <div className="header-title-search-area">
                    <div className="BillHeadInfoWrap BillHeadInfoWrap-showBackBtn">
                        <span className="bill-info-title" style={{ marginLeft: "10px" }}>
                            <CustomIcon type="icon-Currency" style={{ color: 'red', fontSize: '24px' }} />
                            {i18n.t(LocaleHelper.getOrderAuditTitle())}
                        </span>
                    </div>
                </div>
                <div className="header-button-area">
                    <div style={{ display: "flex" }}>
                        <div className="buttonGroup-component">
                            <div className="u-button-group">
                                <Button>{i18n.t(LocaleHelper.getOrderAuditBatchAudit())}</Button>
                                <Button>{i18n.t(LocaleHelper.getOrderListExport())}</Button>
                            </div>
                        </div>
                        <span className="u-button">
                            <RedoOutlined className='iconfont' />
                        </span>
                    </div>
                </div>
            </div>
            
            <AdvancedSearchForm fields={fields} onSearch={() => {}} />
            
            <div className='nc-bill-table-area'>
                <Table<AuditItem>
                    columns={columns}
                    dataSource={mockData}
                    rowKey="id"
                    rowSelection={{}}
                    pagination={false}
                    bordered
                    size="small"
                />
            </div>

            <Modal
                title={`${i18n.t(LocaleHelper.getOrderAuditAuditResult())} - ${currentOrder?.orderNo}`}
                open={isModalVisible}
                onOk={handleAuditSubmit}
                onCancel={() => setIsModalVisible(false)}
                width={800}
            >
                {currentOrder && (
                    <>
                        <Descriptions title="Order Details" bordered size="small" column={2}>
                            <Descriptions.Item label="Customer">{currentOrder.customerName}</Descriptions.Item>
                            <Descriptions.Item label="Contact">Manager Zhang</Descriptions.Item>
                            <Descriptions.Item label="Credit Limit">500,000 USD</Descriptions.Item>
                            <Descriptions.Item label="Used">320,000 USD</Descriptions.Item>
                            <Descriptions.Item label="Cargo">Machinery</Descriptions.Item>
                            <Descriptions.Item label="Route">Qingdao - Hamburg</Descriptions.Item>
                        </Descriptions>
                        <div style={{ marginTop: 20 }}>
                            <Form layout="vertical">
                                <Form.Item label={i18n.t(LocaleHelper.getOrderAuditAuditResult())}>
                                    <Radio.Group>
                                        <Radio value="pass">{i18n.t(LocaleHelper.getOrderAuditPass())}</Radio>
                                        <Radio value="reject">{i18n.t(LocaleHelper.getOrderAuditReject())}</Radio>
                                        <Radio value="info">{i18n.t(LocaleHelper.getOrderAuditRequestInfo())}</Radio>
                                    </Radio.Group>
                                </Form.Item>
                                <Form.Item label={i18n.t(LocaleHelper.getOrderAuditAuditRemark())}>
                                    <Input.TextArea rows={4} />
                                </Form.Item>
                            </Form>
                        </div>
                    </>
                )}
            </Modal>
        </div>
    );
};

export default OrderAudit;
