import React, { useState, useEffect } from 'react';
import { Table, Button, message, Card, Input, Row, Col } from 'antd';
import { WaybillItem, WaybillListParams } from "@/types/freight_forwarding/waybill_management";
import { getWaybillList } from "@/api/freight_forwarding/waybill_management/waybill_service";
import CustomIcon from "@/components/custom-icon";
import i18n from '@/i18n';
import LocaleHelper from '@/utils/locale';
import AdvancedSearchForm from "@/components/search-form";
import { getColumns } from './columns';
import { fields } from './search_fields';
import '@/pages/page_list.less';
import { useNavigate } from 'react-router-dom';

const { Search } = Input;

const WaybillQuery: React.FC = () => {
    const [data, setData] = useState<WaybillItem[]>([]);
    const [loading, setLoading] = useState(false);
    const [total, setTotal] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
        loadData({});
    }, []);

    const loadData = async (params: WaybillListParams) => {
        setLoading(true);
        try {
            const res = await getWaybillList(params);
            if (res.success && res.data) {
                setData(res.data.list);
                setTotal(res.data.total);
            }
        } catch (error) {
            console.error(error);
            message.error('Load failed');
        }
        setLoading(false);
    };

    const handleSearch = (values: any) => {
        loadData(values);
    };

    const handleQuickSearch = (key: string, value: string) => {
        loadData({ [key]: value });
    };

    const handleDetail = (record: WaybillItem) => {
        navigate(`/waybill_management/create?id=${record.waybillId}&readonly=true`);
    };

    const handleTrack = (record: WaybillItem) => {
        message.info(`Tracking waybill: ${record.waybillNo}`);
    };

    const columns = getColumns(handleDetail, handleTrack);

    return (
        <div style={{ overflowY: 'auto', overflowX: 'hidden', height: 'calc(100vh - 80px)' }}>
            <div className="nc-bill-header-area">
                <div className="header-title-search-area">
                    <div className="BillHeadInfoWrap">
                        <span className="bill-info-title" style={{ marginLeft: "10px" }}>
                            <CustomIcon type="icon-Currency" style={{ color: 'red', fontSize: '24px' }} />
                            {i18n.t(LocaleHelper.getWaybillQueryTitle())}
                        </span>
                    </div>
                </div>
            </div>
            
            <div style={{ padding: '0 20px 20px 20px' }}>
                <Card title={i18n.t(LocaleHelper.getWaybillQueryQuickQuery())} bordered={false} className="nc-bill-card" style={{ marginBottom: '20px' }}>
                    <Row gutter={24}>
                        <Col span={8}>
                            <Search 
                                placeholder={i18n.t(LocaleHelper.getWaybillQueryWaybillNo())} 
                                onSearch={(value) => handleQuickSearch('waybillNo', value)} 
                                enterButton={i18n.t(LocaleHelper.getWaybillQueryQuery())} 
                            />
                        </Col>
                        <Col span={8}>
                            <Search 
                                placeholder={i18n.t(LocaleHelper.getWaybillQueryMblNo())} 
                                onSearch={(value) => handleQuickSearch('mblNo', value)} 
                                enterButton={i18n.t(LocaleHelper.getWaybillQueryQuery())} 
                            />
                        </Col>
                        <Col span={8}>
                            <Search 
                                placeholder={i18n.t(LocaleHelper.getWaybillQueryHblNo())} 
                                onSearch={(value) => handleQuickSearch('hblNo', value)} 
                                enterButton={i18n.t(LocaleHelper.getWaybillQueryQuery())} 
                            />
                        </Col>
                    </Row>
                </Card>

                <AdvancedSearchForm fields={fields as any} onSearch={handleSearch} />
                
                <div className='nc-bill-table-area'>
                    <Table<WaybillItem>
                        columns={columns}
                        dataSource={data}
                        rowKey="waybillId"
                        size="small"
                        bordered={true}
                        loading={loading}
                        scroll={{ x: 'max-content', y: 'calc(100vh - 480px)' }}
                        pagination={{
                            size: 'small',
                            total: total,
                            showTotal: (total) => `Total ${total} items`,
                            showQuickJumper: true,
                            showSizeChanger: true,
                        }}
                    />
                </div>
            </div>
        </div>
    );
};

export default WaybillQuery;
