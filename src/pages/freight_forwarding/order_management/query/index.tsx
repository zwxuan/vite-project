import '@/pages/page_list.less';
import React, { useState, useEffect } from 'react';
import { Table, Button, Card, Input, Row, Col } from 'antd';
import { useNavigate } from 'react-router-dom';
import { OrderItem } from "@/types/freight_forwarding/order_management";
import { getOrderList } from "@/api/freight_forwarding/order_management/order_service";
import CustomIcon from "@/components/custom-icon";
import AdvancedSearchForm from "@/components/search-form";
import { getColumns } from './columns';
import { fields } from './search_fields';
import LocaleHelper from '@/utils/locale';
import i18n from '@/i18n';

const OrderQuery: React.FC = () => {
    const [orderList, setOrderList] = useState([] as OrderItem[]);
    const [pageSize, setPageSize] = useState(50);
    const navigate = useNavigate();

    useEffect(() => {
        const getData = async () => {
            const data = await getOrderList();
            // Mock adding salesman
            const enrichedData = data.map(item => ({ ...item, salesman: 'Sales Person A' }));
            setOrderList(enrichedData);
        };
        getData();
    }, []);

    const handleDetail = (record: OrderItem) => {
        navigate(`/order_management/detail?id=${record.id}&mode=view`);
    };

    const handleTrack = (record: OrderItem) => {
        console.log('Track', record);
    };

    const handleSearch = (values: any) => {
        console.log('Search', values);
    };

    const columns = getColumns(handleDetail, handleTrack);

    return (
        <div style={{ overflowY: 'auto', overflowX: 'hidden', height: 'calc(100vh - 80px)' }}>
            <div className="nc-bill-header-area">
                <div className="header-title-search-area">
                    <div className="BillHeadInfoWrap BillHeadInfoWrap-showBackBtn">
                        <span className="bill-info-title" style={{ marginLeft: "10px" }}>
                            <CustomIcon type="icon-Currency" style={{ color: 'red', fontSize: '24px' }} />
                            {i18n.t(LocaleHelper.getQueryTitle())}
                        </span>
                    </div>
                </div>
                <div className="header-button-area">
                    <div style={{ display: "flex" }}>
                        <div className="buttonGroup-component">
                            <div className="u-button-group">
                                <Button>{i18n.t(LocaleHelper.getOrderListExport())}</Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            {/* Quick Search Section */}
            <Card title={i18n.t(LocaleHelper.getQueryQuickSearch())} style={{ margin: '10px' }} size="small">
                <Row gutter={16}>
                    <Col span={8}>
                        <Input.Search 
                            placeholder={i18n.t(LocaleHelper.getOrderManagementOrderNo())} 
                            enterButton={i18n.t(LocaleHelper.getOrderStatisticsQuery())} 
                            onSearch={value => console.log(value)} 
                        />
                    </Col>
                </Row>
            </Card>

            <AdvancedSearchForm fields={fields} onSearch={handleSearch} />
            
            <div className='nc-bill-table-area'>
                <Table<OrderItem>
                    columns={columns}
                    rowKey={(record) => record.id}
                    dataSource={orderList}
                    loading={orderList.length === 0}
                    pagination={{
                        size: 'small',
                        pageSize: pageSize,
                        showTotal: (total) => i18n.t(LocaleHelper.getQueryTotalRecords(), { total }),
                        showQuickJumper: true,
                        showSizeChanger: true,
                        onShowSizeChange: (current, size) => setPageSize(size),
                    }}
                    scroll={{ x: 'max-content', y: 'calc(100vh - 450px)' }}
                    bordered={true}
                    size="small"
                />
            </div>
        </div>
    );
};

export default OrderQuery;
