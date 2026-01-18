import '@/pages/page_list.less';
import React, { useState } from 'react';
import { Table, Button, Space } from 'antd';
import { useNavigate } from 'react-router-dom';
import { RedoOutlined } from '@ant-design/icons';
import CustomIcon from "@/components/custom-icon";
import AdvancedSearchForm from "@/components/search-form";
import { fields } from './search_fields';
import LocaleHelper from '@/utils/locale';
import i18n from '@/i18n';

interface TemplateItem {
    id: string;
    name: string;
    services: string;
    scenario: string;
    usageCount: number;
}

const ServiceTemplate: React.FC = () => {
    const navigate = useNavigate();

    // Mock Data
    const mockData: TemplateItem[] = [
        { id: 'TPL-01', name: 'Standard Import Package', services: 'Customs+Warehouse+Insurance', scenario: 'Import Trade', usageCount: 156 },
        { id: 'TPL-02', name: 'Export Full Service', services: 'Customs+Document+Insurance', scenario: 'Export Trade', usageCount: 89 },
        { id: 'TPL-03', name: 'Warehouse Value Added', services: 'Warehouse+Sorting+Packing', scenario: 'E-commerce', usageCount: 234 },
    ];

    const handleDetail = () => {
        navigate('/order_management/service_template/detail');
    };

    const columns = [
        { title: 'ID', dataIndex: 'id', key: 'id' },
        { title: i18n.t(LocaleHelper.getServiceTemplateTemplateName()), dataIndex: 'name', key: 'name' },
        { title: i18n.t(LocaleHelper.getServiceTemplateIncludedServices()), dataIndex: 'services', key: 'services' },
        { title: i18n.t(LocaleHelper.getServiceTemplateApplicableScenario()), dataIndex: 'scenario', key: 'scenario' },
        { title: i18n.t(LocaleHelper.getServiceTemplateUsageCount()), dataIndex: 'usageCount', key: 'usageCount' },
        {
            title: i18n.t(LocaleHelper.getOrderListActions()),
            key: 'action',
            render: (_: any, record: TemplateItem) => (
                <Space size="middle">
                    <a onClick={handleDetail}>{i18n.t(LocaleHelper.getOrderListDetail())}</a>
                    <a onClick={handleDetail}>{i18n.t(LocaleHelper.getOrderListEdit())}</a>
                    <a>{i18n.t(LocaleHelper.getServiceTemplateCopy())}</a>
                </Space>
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
                            {i18n.t(LocaleHelper.getServiceTemplateTitle())}
                        </span>
                    </div>
                </div>
                <div className="header-button-area">
                    <div style={{ display: "flex" }}>
                        <div className="buttonGroup-component">
                            <div className="u-button-group">
                                <Button type="primary" danger onClick={handleDetail}>{i18n.t(LocaleHelper.getServiceTemplateNewTemplate())}</Button>
                                <Button>{i18n.t(LocaleHelper.getStandaloneServiceBatchAction())}</Button>
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
                <Table<TemplateItem>
                    columns={columns}
                    dataSource={mockData}
                    rowKey="id"
                    pagination={false}
                    bordered
                    size="small"
                />
            </div>
        </div>
    );
};

export default ServiceTemplate;
