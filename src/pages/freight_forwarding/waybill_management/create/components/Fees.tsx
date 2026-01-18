import React from 'react';
import { Table, Button, Statistic, Row, Col, Card, Tag } from 'antd';
import i18n from '@/i18n';
import LocaleHelper from '@/utils/locale';

const Fees: React.FC = () => {
    const feeData = [
        { key: '1', type: 'Receivable', item: 'Ocean Freight', unit: 'CNTR', qty: 2, price: 3000, amount: 6000, tax: '0%', payer: 'Client', settler: 'ABC Trading', status: 'Uninvoiced' },
        { key: '2', type: 'Payable', item: 'Terminal Handling', unit: 'BILL', qty: 1, price: 1500, amount: 1500, tax: '0%', payer: 'Self', settler: 'Terminal Co.', status: 'Unreconciled' },
    ];

    const columns = [
        { title: 'Type', dataIndex: 'type', render: (text: string) => <Tag color={text === 'Receivable' ? 'blue' : 'orange'}>{text}</Tag> },
        { title: i18n.t(LocaleHelper.getWaybillCreateFeeItem()), dataIndex: 'item' },
        { title: 'Unit', dataIndex: 'unit' },
        { title: 'Qty', dataIndex: 'qty' },
        { title: 'Price', dataIndex: 'price' },
        { title: i18n.t(LocaleHelper.getWaybillCreateAmount()), dataIndex: 'amount' },
        { title: 'Tax', dataIndex: 'tax' },
        { title: 'Payer/Payee', dataIndex: 'payer' },
        { title: 'Settler', dataIndex: 'settler' },
        { title: i18n.t(LocaleHelper.getWaybillCreateStatus()), dataIndex: 'status' },
        { title: i18n.t(LocaleHelper.getWaybillTemplateAction()), key: 'action', render: () => <Button type="link" size="small">Edit</Button> },
    ];

    return (
        <div style={{ padding: '0 20px' }}>
            <Card size="small" style={{ marginBottom: 16, background: '#f9f9f9' }}>
                <Row gutter={24} style={{ textAlign: 'center' }}>
                    <Col span={8}><Statistic title={i18n.t(LocaleHelper.getWaybillCreateFeeReceivable())} value={12000} precision={2} /></Col>
                    <Col span={8}><Statistic title={i18n.t(LocaleHelper.getWaybillCreateFeePayable())} value={9500} precision={2} /></Col>
                    <Col span={8}><Statistic title={i18n.t(LocaleHelper.getWaybillCreateFeeProfit())} value={2500} precision={2} valueStyle={{ color: '#3f8600' }} /></Col>
                </Row>
            </Card>
            <Table dataSource={feeData} columns={columns} pagination={false} size="small" scroll={{ x: 'max-content' }} />
        </div>
    );
};

export default Fees;
