import React, { useEffect, useState } from 'react';
import { Button, Table } from 'antd';
import { useNavigate } from 'react-router-dom';
import CustomIcon from '@/components/custom-icon';
import { getInterfaceConfigList } from '@/api/freight_forwarding/milestone_tracking/service';
import { InterfaceConfigItem } from '@/types/freight_forwarding/milestone_tracking';
import LocaleHelper from '@/utils/locale';
import i18n from '@/i18n';
import { getColumns } from './columns';
import '@/pages/page_list.less';

const InterfaceManagement: React.FC = () => {
    const [data, setData] = useState<InterfaceConfigItem[]>([]);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const fetchData = async () => {
        setLoading(true);
        try {
            const result = await getInterfaceConfigList();
            setData(result);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleConfig = (record: InterfaceConfigItem) => {
        navigate(`/milestone_tracking/interface_management/edit/${record.id}`);
    };

    const handleNew = () => {
        navigate('/milestone_tracking/interface_management/create');
    };

    return (
        <div style={{ overflowY: 'auto', overflowX: 'hidden', height: 'calc(100vh - 80px)' }}>
            <div className="nc-bill-header-area">
                <div className="header-title-search-area">
                    <div className="BillHeadInfoWrap BillHeadInfoWrap-showBackBtn">
                        <span className="bill-info-title" style={{ marginLeft: '10px' }}>
                            <CustomIcon type="icon-Currency" style={{ color: 'red', fontSize: '24px' }} />
                            {i18n.t(LocaleHelper.getInterfaceManagementTitle())}
                        </span>
                    </div>
                </div>
                <div className="header-button-area">
                    <div className="buttonGroup-component">
                        <div className="u-button-group">
                            <Button type="primary" danger onClick={handleNew}>New Interface</Button>
                            <Button>Test</Button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="nc-bill-table-area">
                <Table
                    columns={getColumns(handleConfig)}
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

export default InterfaceManagement;
