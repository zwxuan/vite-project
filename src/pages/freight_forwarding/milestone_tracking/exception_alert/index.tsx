import React, { useEffect, useState } from 'react';
import { Button, Table, Card, Row, Col, Statistic } from 'antd';
import CustomIcon from '@/components/custom-icon';
import AdvancedSearchForm from '@/components/search-form';
import { getExceptionAlertList } from '@/api/freight_forwarding/milestone_tracking/service';
import { ExceptionAlertItem } from '@/types/freight_forwarding/milestone_tracking';
import LocaleHelper from '@/utils/locale';
import i18n from '@/i18n';
import { searchFields } from './search_fields';
import { getColumns } from './columns';
import '@/pages/page_list.less';

const ExceptionAlert: React.FC = () => {
    const [data, setData] = useState<ExceptionAlertItem[]>([]);
    const [loading, setLoading] = useState(false);
    const [pageSize, setPageSize] = useState(50);
    const fetchData = async () => {
        setLoading(true);
        try {
            const result = await getExceptionAlertList();
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

    const handleProcess = (record: ExceptionAlertItem) => {
        console.log('Process:', record);
    };

    return (
        <div style={{ overflowY: 'auto', overflowX: 'hidden', height: 'calc(100vh - 80px)' }}>
            <div className="nc-bill-header-area">
                <div className="header-title-search-area">
                    <div className="BillHeadInfoWrap BillHeadInfoWrap-showBackBtn">
                        <span className="bill-info-title" style={{ marginLeft: '10px' }}>
                            <CustomIcon type="icon-Currency" style={{ color: 'red', fontSize: '24px' }} />
                            {i18n.t(LocaleHelper.getExceptionAlertTitle())}
                        </span>
                    </div>
                </div>
                <div className="header-button-area">
                    <div className="buttonGroup-component">
                        <div className="u-button-group">
                            <Button>{i18n.t(LocaleHelper.getAlertSettings())}</Button>
                            <Button>{i18n.t(LocaleHelper.getExport())}</Button>
                        </div>
                    </div>
                </div>
            </div>

            <div style={{ padding: '0 16px 16px 16px' }}>
                <Row gutter={16}>
                    <Col span={6}>
                        <Card>
                            <Statistic title="Today's Alerts" value={23} valueStyle={{ color: '#cf1322' }} />
                        </Card>
                    </Col>
                    <Col span={6}>
                        <Card>
                            <Statistic title="Pending" value={12} valueStyle={{ color: '#faad14' }} />
                        </Card>
                    </Col>
                    <Col span={6}>
                        <Card>
                            <Statistic title="Processed" value={11} valueStyle={{ color: '#3f8600' }} />
                        </Card>
                    </Col>
                    <Col span={6}>
                        <Card>
                            <Statistic title="Alert Rate" value={15.3} precision={1} suffix="%" />
                        </Card>
                    </Col>
                </Row>
            </div>

            <AdvancedSearchForm
                fields={searchFields as any}
                onSearch={handleSearch}
            />
            <div className="nc-bill-table-area">
                <Table
                    columns={getColumns(handleProcess)}
                    dataSource={data}
                    rowKey="id"
                    loading={loading}
                    size="small"
                    bordered={true}
                    scroll={{ x: 'max-content', y: 'calc(100vh - 500px)' }}
                    pagination={{
                        size:'small',
                        pageSize:pageSize,
                        showTotal: (total) => `总共 ${total} 条`,
                        showQuickJumper:true,
                        showSizeChanger:true,
                        onShowSizeChange: (current, size) => {
                            setPageSize(size);
                        },
                        locale:{
                            items_per_page: '/页',
                            jump_to: '跳至',
                            page: '页',
                        }
                    }}
                />
            </div>
        </div>
    );
};

export default ExceptionAlert;
