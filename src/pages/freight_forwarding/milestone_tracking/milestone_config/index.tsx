import React, { useEffect, useState } from 'react';
import { Button, Table } from 'antd';
import { useNavigate } from 'react-router-dom';
import CustomIcon from '@/components/custom-icon';
import AdvancedSearchForm from '@/components/search-form';
import { getMilestoneConfigList } from '@/api/freight_forwarding/milestone_tracking/service';
import { MilestoneConfigItem } from '@/types/freight_forwarding/milestone_tracking';
import LocaleHelper from '@/utils/locale';
import i18n from '@/i18n';
import { searchFields } from './search_fields';
import { getColumns } from './columns';
import '@/pages/page_list.less';

const MilestoneConfig: React.FC = () => {
    const [data, setData] = useState<MilestoneConfigItem[]>([]);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const fetchData = async () => {
        setLoading(true);
        try {
            const result = await getMilestoneConfigList();
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

    const handleEdit = (record: MilestoneConfigItem) => {
        navigate(`/milestone_tracking/milestone_config/edit/${record.id}`);
    };

    const handleNew = () => {
        navigate('/milestone_tracking/milestone_config/create');
    };

    return (
        <div style={{ overflowY: 'auto', overflowX: 'hidden', height: 'calc(100vh - 80px)' }}>
            <div className="nc-bill-header-area">
                <div className="header-title-search-area">
                    <div className="BillHeadInfoWrap BillHeadInfoWrap-showBackBtn">
                        <span className="bill-info-title" style={{ marginLeft: '10px' }}>
                            <CustomIcon type="icon-Currency" style={{ color: 'red', fontSize: '24px' }} />
                            {i18n.t(LocaleHelper.getMilestoneConfigTitle())}
                        </span>
                    </div>
                </div>
                <div className="header-button-area">
                    <div className="buttonGroup-component">
                        <div className="u-button-group">
                            <Button type="primary" danger onClick={handleNew}>New Config</Button>
                            <Button>Import</Button>
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
                    columns={getColumns(handleEdit)}
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
        </div>
    );
};

export default MilestoneConfig;
