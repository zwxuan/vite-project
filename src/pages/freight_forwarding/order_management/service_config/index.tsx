import '@/pages/page_list.less';
import React, { useState } from 'react';
import { Table, Button, Tabs, Space } from 'antd';
import { useNavigate } from 'react-router-dom';
import { RedoOutlined } from '@ant-design/icons';
import CustomIcon from "@/components/custom-icon";
import LocaleHelper from '@/utils/locale';
import i18n from '@/i18n';

interface ServiceConfigItem {
    id: string;
    name: string;
    status: string;
    scope: string;
    baseFee: number;
    processingTime: string;
}

const ServiceConfig: React.FC = () => {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('customs');

    // Mock Data
    const mockData: Record<string, ServiceConfigItem[]> = {
        customs: [
            { id: '1', name: 'Standard Export Clearance', status: 'Enabled', scope: 'General Trade', baseFee: 2000, processingTime: '3 Days' },
            { id: '3', name: 'Customs Clearance', status: 'Enabled', scope: 'General Trade', baseFee: 1500, processingTime: '2 Days' },
        ],
        warehouse: [
            { id: '2', name: 'Standard Bonded Storage', status: 'Enabled', scope: 'Bonded Warehouse', baseFee: 100, processingTime: 'N/A' },
            { id: '4', name: 'Bonded Storage 30 Days', status: 'Enabled', scope: 'Bonded Warehouse', baseFee: 200, processingTime: '30 Days' },
        ],
        document: [],
        insurance: [],
        consulting: [],
    };

    const handleDetail = () => {
        navigate('/order_management/service_config/detail');
    };

    const columns = [
        { title: i18n.t(LocaleHelper.getServiceConfigConfigName()), dataIndex: 'name', key: 'name' },
        { title: i18n.t(LocaleHelper.getServiceConfigStatus()), dataIndex: 'status', key: 'status' },
        { title: i18n.t(LocaleHelper.getServiceConfigScope()), dataIndex: 'scope', key: 'scope' },
        { title: i18n.t(LocaleHelper.getServiceConfigBaseFee()), dataIndex: 'baseFee', key: 'baseFee' },
        { title: i18n.t(LocaleHelper.getServiceConfigProcessingTime()), dataIndex: 'processingTime', key: 'processingTime' },
        {
            title: i18n.t(LocaleHelper.getOrderListActions()),
            key: 'action',
            render: (_: any, record: ServiceConfigItem) => (
                <Space size="middle">
                    <a onClick={handleDetail}>{i18n.t(LocaleHelper.getOrderListEdit())}</a>
                    <a>{i18n.t(LocaleHelper.getOrderListDelete())}</a>
                </Space>
            ),
        },
    ];

    const items = [
        { key: 'customs', label: i18n.t(LocaleHelper.getServiceConfigCustomsConfig()) },
        { key: 'warehouse', label: i18n.t(LocaleHelper.getServiceConfigWarehouseConfig()) },
        { key: 'document', label: i18n.t(LocaleHelper.getServiceConfigDocConfig()) },
        { key: 'insurance', label: i18n.t(LocaleHelper.getServiceConfigInsuranceConfig()) },
        { key: 'consulting', label: i18n.t(LocaleHelper.getServiceConfigConsultingConfig()) },
    ];

    return (
        <div style={{ overflowY: 'auto', overflowX: 'hidden', height: 'calc(100vh - 80px)' }}>
            <div className="nc-bill-header-area">
                <div className="header-title-search-area">
                    <div className="BillHeadInfoWrap BillHeadInfoWrap-showBackBtn">
                        <span className="bill-info-title" style={{ marginLeft: "10px" }}>
                            <CustomIcon type="icon-Currency" style={{ color: 'red', fontSize: '24px' }} />
                            {i18n.t(LocaleHelper.getServiceConfigTitle())}
                        </span>
                    </div>
                </div>
                <div className="header-button-area">
                    <div style={{ display: "flex" }}>
                        <div className="buttonGroup-component">
                            <div className="u-button-group">
                                <Button type="primary" danger onClick={handleDetail}>{i18n.t(LocaleHelper.getServiceConfigNewConfig())}</Button>
                                <Button>{i18n.t(LocaleHelper.getServiceConfigBatchImport())}</Button>
                            </div>
                        </div>
                        <span className="u-button">
                            <RedoOutlined className='iconfont' />
                        </span>
                    </div>
                </div>
            </div>
            
            <div className='nc-bill-table-area'>
                <Tabs activeKey={activeTab} onChange={setActiveTab} items={items} />
                <Table<ServiceConfigItem>
                    columns={columns}
                    dataSource={mockData[activeTab] || []}
                    rowKey="id"
                    pagination={false}
                    bordered
                    size="small"
                />
            </div>
        </div>
    );
};

export default ServiceConfig;
