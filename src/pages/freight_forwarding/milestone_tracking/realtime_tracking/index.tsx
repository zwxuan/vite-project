import React, { useEffect, useState } from 'react';
import { Table } from 'antd';
import CustomIcon from '@/components/custom-icon';
import AdvancedSearchForm from '@/components/search-form';
import { getRealtimeTrackingList } from '@/api/freight_forwarding/milestone_tracking/service';
import { RealtimeTrackingItem } from '@/types/freight_forwarding/milestone_tracking';
import LocaleHelper from '@/utils/locale';
import i18n from '@/i18n';
import { searchFields } from './search_fields';
import { getColumns } from './columns';
import '@/pages/page_list.less';

const RealtimeTracking: React.FC = () => {
    const [data, setData] = useState<RealtimeTrackingItem[]>([]);
    const [loading, setLoading] = useState(false);

    const fetchData = async () => {
        setLoading(true);
        try {
            const result = await getRealtimeTrackingList();
            setData(result);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleSearch = (values: any) => {
        console.log('Search:', values);
        fetchData();
    };

    const handleViewMap = (record: RealtimeTrackingItem) => {
        console.log('View Map:', record);
    };

    return (
        <div style={{ overflowY: 'auto', overflowX: 'hidden', height: 'calc(100vh - 80px)' }}>
            <div className="nc-bill-header-area">
                <div className="header-title-search-area">
                    <div className="BillHeadInfoWrap BillHeadInfoWrap-showBackBtn">
                        <span className="bill-info-title" style={{ marginLeft: '10px' }}>
                            <CustomIcon type="icon-Currency" style={{ color: 'red', fontSize: '24px' }} />
                            {i18n.t(LocaleHelper.getRealtimeTrackingTitle())}
                        </span>
                    </div>
                </div>
            </div>
            <AdvancedSearchForm
                fields={searchFields as any}
                onSearch={handleSearch}
            />
            <div className="nc-bill-table-area">
                <Table
                    columns={getColumns(handleViewMap)}
                    dataSource={data}
                    rowKey="id"
                    loading={loading}
                    size="small"
                    bordered={true}
                    scroll={{ x: 'max-content', y: 'calc(100vh - 380px)' }}
                    pagination={{
                        showTotal: (total) => `Total ${total} items`,
                        showQuickJumper: true,
                        showSizeChanger: true,
                        locale: {
                            items_per_page: i18n.t(LocaleHelper.getItemsPerPage()),
                            jump_to: i18n.t(LocaleHelper.getJumpTo()),
                            page: i18n.t(LocaleHelper.getPage()),
                        },
                    }}
                />
            </div>
        </div>
    );
};

export default RealtimeTracking;
