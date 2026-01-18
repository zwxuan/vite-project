import '@/pages/page_list.less';
import React, { useState } from 'react';
import { Table, Button, Modal, Select, List, Card, Space } from 'antd';
import { RedoOutlined } from '@ant-design/icons';
import CustomIcon from "@/components/custom-icon";
import AdvancedSearchForm from "@/components/search-form";
import { fields } from './search_fields';
import LocaleHelper from '@/utils/locale';
import i18n from '@/i18n';

interface BreakdownItem {
    id: string;
    orderNo: string;
    customerName: string;
    orderType: string;
    route: string;
    salesman: string;
}

const OrderBreakdown: React.FC = () => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [currentOrder, setCurrentOrder] = useState<BreakdownItem | null>(null);

    // Mock Data
    const mockData: BreakdownItem[] = [
        { id: '1', orderNo: 'ORD-005', customerName: 'XYZ Trading', orderType: 'Sea Export', route: 'Ningbo -> LA', salesman: 'Wang' },
        { id: '2', orderNo: 'ORD-006', customerName: 'OPQ Logistics', orderType: 'Air Import', route: 'Frankfurt -> Beijing', salesman: 'Zhao' },
    ];

    const columns = [
        { title: i18n.t(LocaleHelper.getOrderManagementOrderNo()), dataIndex: 'orderNo', key: 'orderNo' },
        { title: i18n.t(LocaleHelper.getQueryCustomerName()), dataIndex: 'customerName', key: 'customerName' },
        { title: i18n.t(LocaleHelper.getQueryOrderType()), dataIndex: 'orderType', key: 'orderType' },
        { title: 'Route', dataIndex: 'route', key: 'route' },
        { title: i18n.t(LocaleHelper.getQuerySalesman()), dataIndex: 'salesman', key: 'salesman' },
        {
            title: i18n.t(LocaleHelper.getOrderListActions()),
            key: 'action',
            render: (_: any, record: BreakdownItem) => (
                <a onClick={() => { setCurrentOrder(record); setIsModalVisible(true); }}>
                    {i18n.t(LocaleHelper.getOrderBreakdownExecuteBreakdown())}
                </a>
            ),
        },
    ];

    return (
        <div style={{ overflowY: 'auto', overflowX: 'hidden', height: 'calc(100vh - 80px)' }}>
            <div className="nc-bill-header-area">
                <div className="header-title-search-area">
                    <div className="BillHeadInfoWrap BillHeadInfoWrap-showBackBtn">
                        <span className="bill-info-title" style={{ marginLeft: "10px" }}>
                            <CustomIcon type="icon-Currency" style={{ color: 'red', fontSize: '24px' }} />
                            {i18n.t(LocaleHelper.getOrderBreakdownTitle())}
                        </span>
                    </div>
                </div>
                <div className="header-button-area">
                    <div style={{ display: "flex" }}>
                        <div className="buttonGroup-component">
                            <div className="u-button-group">
                                <Button>{i18n.t(LocaleHelper.getOrderBreakdownBatchBreakdown())}</Button>
                                <Button>{i18n.t(LocaleHelper.getOrderBreakdownRuleManagement())}</Button>
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
                <Table<BreakdownItem>
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
                title={i18n.t(LocaleHelper.getOrderBreakdownExecuteBreakdown())}
                open={isModalVisible}
                onOk={() => setIsModalVisible(false)}
                onCancel={() => setIsModalVisible(false)}
                width={800}
            >
                {currentOrder && (
                    <>
                        <div style={{ marginBottom: 20 }}>
                            <span>{i18n.t(LocaleHelper.getOrderBreakdownRuleSelection())}: </span>
                            <Select defaultValue="default" style={{ width: 300 }}>
                                <Select.Option value="default">Default Sea Export Process</Select.Option>
                                <Select.Option value="custom">Custom Process A</Select.Option>
                            </Select>
                        </div>
                        <Card title={i18n.t(LocaleHelper.getOrderBreakdownPreviewResult())} size="small">
                            <List
                                size="small"
                                bordered
                                dataSource={[
                                    { name: 'Booking', dept: 'OP Dept', days: '1 Day' },
                                    { name: 'Trailer', dept: 'Trailer Dept', days: '2 Days' },
                                    { name: 'Customs', dept: 'Customs Dept', days: '1 Day' },
                                    { name: 'Loading', dept: 'Port Dept', days: '0.5 Days' },
                                ]}
                                renderItem={item => (
                                    <List.Item>
                                        <Space>
                                            <span style={{ fontWeight: 'bold' }}>{item.name}</span>
                                            <span>- {item.dept}</span>
                                            <span>({item.days})</span>
                                        </Space>
                                    </List.Item>
                                )}
                            />
                        </Card>
                    </>
                )}
            </Modal>
        </div>
    );
};

export default OrderBreakdown;
