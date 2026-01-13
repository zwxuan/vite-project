import React, { useState } from 'react';
import { Table, Button, Input, Form, Row, Col, Radio, Space, Divider } from 'antd';
import CustomIcon from "@/components/custom-icon";
import AdvancedSearchForm from "@/components/search-form";
import { fields } from './search_fields';
import '@/pages/page_list.less';

const { TextArea } = Input;

const OrderAudit: React.FC = () => {
    const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
    const [selectedOrder, setSelectedOrder] = useState<any>(null);

    const [dataSource] = useState([
        {
            key: '1',
            orderNo: 'ORD-003',
            customerName: 'DEF公司',
            amount: '85,000',
            submitter: '小张',
            submitTime: '03-18 10:30',
        },
        {
            key: '2',
            orderNo: 'ORD-004',
            customerName: 'GHI公司',
            amount: '120,000',
            submitter: '小李',
            submitTime: '03-18 14:20',
        },
    ]);

    const handleSearch = (values: any) => {
        console.log('Search', values);
    };

    const columns = [
        { title: '订单号', dataIndex: 'orderNo', key: 'orderNo' },
        { title: '客户名称', dataIndex: 'customerName', key: 'customerName' },
        { title: '订单金额', dataIndex: 'amount', key: 'amount' },
        { title: '提交人', dataIndex: 'submitter', key: 'submitter' },
        { title: '提交时间', dataIndex: 'submitTime', key: 'submitTime' },
        {
            title: '操作',
            key: 'action',
            render: (_: any, record: any) => (
                <a style={{ color: '#1890ff' }} onClick={() => setSelectedOrder(record)}>[审核]</a>
            ),
        },
    ];

    const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
        setSelectedRowKeys(newSelectedRowKeys);
    };

    const rowSelection = {
        selectedRowKeys,
        onChange: onSelectChange,
    };

    return (
        <div style={{ overflowY: 'auto', overflowX: 'hidden', height: 'calc(100vh - 80px)' }}>
            <div className="nc-bill-header-area">
                <div className="header-title-search-area">
                    <div className="BillHeadInfoWrap BillHeadInfoWrap-showBackBtn">
                        <span className="bill-info-title" style={{ marginLeft: "10px" }}>
                            <CustomIcon type="icon-Currency" style={{ color: 'red', fontSize: '24px' }} />
                            <span>订单管理 {'>'} 订单审核</span>
                        </span>
                    </div>
                </div>
                <div className="header-button-area">
                    <div className="buttonGroup-component">
                        <div className="u-button-group">
                            <Button>批量审核</Button>
                            <Button>导出</Button>
                        </div>
                    </div>
                </div>
            </div>

            <AdvancedSearchForm fields={fields as any} onSearch={handleSearch} />

            <div style={{ padding: '0 10px' }}>
                <div style={{ fontWeight: 'bold', marginBottom: '5px' }}>待审核订单列表：</div>
                <div className='nc-bill-table-area'>
                    <Table
                        rowSelection={rowSelection}
                        columns={columns}
                        dataSource={dataSource}
                        pagination={false}
                        size="small"
                        bordered
                    />
                </div>

                {selectedOrder && (
                    <div style={{ marginTop: '20px', border: '1px solid #d9d9d9', padding: '10px', backgroundColor: '#fff' }}>
                        <div style={{ fontWeight: 'bold', marginBottom: '10px', borderBottom: '1px solid #eee', paddingBottom: '5px' }}>
                            订单详情（{selectedOrder.orderNo}）：
                        </div>
                        <Row gutter={[24, 12]}>
                            <Col span={8}>客户：{selectedOrder.customerName}</Col>
                            <Col span={8}>联系人：张经理</Col>
                            <Col span={8}>信用额度：500,000 USD</Col>
                            <Col span={8}>已用额度：320,000 USD</Col>
                            <Col span={8}>可用额度：180,000 USD</Col>
                            <Col span={8}></Col>
                            <Col span={8}>货物：机械设备</Col>
                            <Col span={8}>重量：8,500 KG</Col>
                            <Col span={8}>体积：45 CBM</Col>
                            <Col span={24}>路线：青岛港 → 汉堡港 | 要求ETD：2024-03-25</Col>
                        </Row>
                        
                        <Divider dashed />
                        
                        <div style={{ fontWeight: 'bold', marginBottom: '10px' }}>审核意见：</div>
                        <Form layout="vertical">
                            <Form.Item label="审核结果">
                                <Radio.Group defaultValue="pass">
                                    <Radio value="pass">通过</Radio>
                                    <Radio value="reject">驳回</Radio>
                                    <Radio value="more_info">需补充资料</Radio>
                                </Radio.Group>
                            </Form.Item>
                            <Form.Item label="审核备注">
                                <TextArea rows={2} placeholder="客户信用良好，货物信息完整，可以通过_____________" />
                            </Form.Item>
                            <Form.Item>
                                <Space>
                                    <Button type="primary">提交审核</Button>
                                    <Button onClick={() => setSelectedOrder(null)}>取消</Button>
                                </Space>
                            </Form.Item>
                        </Form>
                    </div>
                )}
            </div>
        </div>
    );
};

export default OrderAudit;
