import React, { useEffect, useMemo, useState } from 'react';
import { Button, Table } from 'antd';
import { useNavigate } from 'react-router-dom';
import CustomIcon from '@/components/custom-icon';
import AdvancedSearchForm from '@/components/search-form';
import { getTrackingOverviewList } from '@/api/freight_forwarding/milestone_tracking/service';
import { TrackingOverviewItem } from '@/types/freight_forwarding/milestone_tracking';
import LocaleHelper from '@/utils/locale';
import i18n from '@/i18n';
import { searchFields } from './search_fields';
import { getColumns } from './columns';
import '@/pages/page_list.less';

const TrackingOverview: React.FC = () => {
    const [data, setData] = useState<TrackingOverviewItem[]>([]);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const fetchData = async () => {
        setLoading(true);
        try {
            const result = await getTrackingOverviewList();
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

    const handleDetail = (record: TrackingOverviewItem) => {
        navigate(`/milestone_tracking/tracking_overview/detail/${record.waybillNumber}`);
    };

    const summary = useMemo(() => {
        return {
            total: data.length,
            inTransit: data.filter(d => d.status === 'In Transit').length,
            arrived: data.filter(d => d.status === 'Arrived').length,
            exception: data.filter(d => d.status === 'Exception').length,
            delivered: data.filter(d => d.status === 'Delivered').length,
        };
    }, [data]);

    return (
        <div style={{ overflowY: 'auto', overflowX: 'hidden', height: 'calc(100vh - 80px)' }}>
            <div className="nc-bill-header-area">
                <div className="header-title-search-area">
                    <div className="BillHeadInfoWrap BillHeadInfoWrap-showBackBtn">
                        <span className="bill-info-title" style={{ marginLeft: '10px' }}>
                            <CustomIcon type="icon-Currency" style={{ color: 'red', fontSize: '24px' }} />
                            {i18n.t(LocaleHelper.getTrackingOverviewTitle())}
                        </span>
                    </div>
                </div>
                <div className="header-button-area">
                    <div className="buttonGroup-component">
                        <div className="u-button-group">
                            <Button type="primary" danger>New Tracking</Button>
                            <Button>Export</Button>
                        </div>
                    </div>
                </div>
            </div>
            <AdvancedSearchForm
                fields={searchFields as any}
                onSearch={handleSearch}
            />
            <div className="nc-bill-table-area">
                <Table
                    columns={getColumns(handleDetail)}
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
                    }}
                />
            </div>
            <div style={{ padding: '8px 16px', textAlign: 'left' }}>
                Total: {summary.total}
                <span style={{ marginLeft: 16 }}>In Transit: {summary.inTransit}</span>
                <span style={{ marginLeft: 16 }}>Arrived: {summary.arrived}</span>
                <span style={{ marginLeft: 16 }}>Exception: {summary.exception}</span>
                <span style={{ marginLeft: 16 }}>Delivered: {summary.delivered}</span>
            </div>
        </div>
    );
};

export default TrackingOverview;
