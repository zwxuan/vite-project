import '@/pages/page_list.less';
import React, { useState } from 'react';
import { Table, Button, Dropdown, Space, MenuProps } from 'antd';
import { useNavigate } from 'react-router-dom';
import { DownOutlined, RedoOutlined } from '@ant-design/icons';
import CustomIcon from "@/components/custom-icon";
import AdvancedSearchForm from "@/components/search-form";
import { getColumns, StandaloneServiceItem } from './columns';
import { fields } from './search_fields';
import LocaleHelper from '@/utils/locale';
import i18n from '@/i18n';

const StandaloneService: React.FC = () => {
    const navigate = useNavigate();
    const [pageSize, setPageSize] = useState(50);
    
    // Mock Data
    const mockData: StandaloneServiceItem[] = [
        { id: 'SRV-001', customerName: 'ABC Company', serviceType: 'Customs', serviceContent: 'Export Clearance', status: 'In Progress', fee: 2800 },
        { id: 'SRV-002', customerName: 'DEF Company', serviceType: 'Warehouse', serviceContent: 'Bonded Storage 30 Days', status: 'Completed', fee: 3000 },
        { id: 'SRV-003', customerName: 'GHI Company', serviceType: 'Document', serviceContent: 'BL Creation', status: 'Pending', fee: 500 },
        { id: 'SRV-004', customerName: 'JKL Company', serviceType: 'Insurance', serviceContent: 'Cargo Insurance', status: 'Completed', fee: 300 },
    ];

    const handleDetail = (record: StandaloneServiceItem) => {
        navigate('/order_management/standalone_service/detail');
    };

    const handleEdit = (record: StandaloneServiceItem) => {
        navigate('/order_management/standalone_service/detail');
    };

    const handleSearch = (values: any) => {
        console.log('Search', values);
    };

    const columns = getColumns(handleDetail, handleEdit);

    const exportItems: MenuProps['items'] = [
        { key: '1', label: i18n.t(LocaleHelper.getOrderListExport()) },
    ];

    return (
        <div style={{ overflowY: 'auto', overflowX: 'hidden', height: 'calc(100vh - 80px)' }}>
            <div className="nc-bill-header-area">
                <div className="header-title-search-area">
                    <div className="BillHeadInfoWrap BillHeadInfoWrap-showBackBtn">
                        <span className="bill-info-title" style={{ marginLeft: "10px" }}>
                            <CustomIcon type="icon-Currency" style={{ color: 'red', fontSize: '24px' }} />
                            {i18n.t(LocaleHelper.getStandaloneServiceTitle())}
                        </span>
                    </div>
                </div>
                <div className="header-button-area">
                    <div style={{ display: "flex" }}>
                        <div className="buttonGroup-component">
                            <div className="u-button-group">
                                <Button type="primary" danger onClick={() => navigate('/order_management/standalone_service/detail')}>{i18n.t(LocaleHelper.getStandaloneServiceNewService())}</Button>
                                <Button>{i18n.t(LocaleHelper.getStandaloneServiceBatchAction())}</Button>
                            </div>
                        </div>
                        <div className="divider-button-wrapper">
                            <Dropdown menu={{ items: exportItems }}>
                                <Button>
                                    <Space>
                                        {i18n.t(LocaleHelper.getOrderListExport())}
                                        <DownOutlined />
                                    </Space>
                                </Button>
                            </Dropdown>
                        </div>
                        <span className="u-button">
                            <RedoOutlined className='iconfont' />
                        </span>
                    </div>
                </div>
            </div>
            <AdvancedSearchForm fields={fields} onSearch={handleSearch} />
            <div className='nc-bill-table-area'>
                <Table<StandaloneServiceItem>
                    columns={columns}
                    rowKey={(record) => record.id}
                    dataSource={mockData}
                    pagination={{
                        size: 'small',
                        pageSize: pageSize,
                        showTotal: (total) => `Total ${total}`,
                        showQuickJumper: true,
                        showSizeChanger: true,
                        onShowSizeChange: (current, size) => setPageSize(size),
                        locale: {
                            items_per_page: i18n.t(LocaleHelper.getItemsPerPage()),
                            jump_to: i18n.t(LocaleHelper.getJumpTo()),
                            page: i18n.t(LocaleHelper.getPage()),
                        },
                    }}
                    scroll={{ x: 'max-content', y: 'calc(100vh - 380px)' }}
                    bordered={true}
                    size="small"
                />
            </div>
        </div>
    );
};

export default StandaloneService;
