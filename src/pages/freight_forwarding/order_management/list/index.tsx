import '@/pages/page_list.less';
import React, { useState, useEffect } from 'react';
import { Table, Button, Dropdown, Space, MenuProps } from 'antd';
import { useNavigate } from 'react-router-dom';
import { OrderItem } from "@/types/freight_forwarding/order_management";
import { getOrderList } from "@/api/freight_forwarding/order_management/order_service";
import { RedoOutlined, DownOutlined } from '@ant-design/icons';
import CustomIcon from "@/components/custom-icon";
import AdvancedSearchForm from "@/components/search-form";
import { getColumns } from './columns';
import { fields } from './search_fields';
import LocaleHelper from '@/utils/locale';
import i18n from '@/i18n';

const OrderList: React.FC = () => {
    const [orderList, setOrderList] = useState([] as OrderItem[]);
    const [pageSize, setPageSize] = useState(50);
    const navigate = useNavigate();

    useEffect(() => {
        const getData = async () => {
            const data = await getOrderList();
            setOrderList([...data]);
        };
        getData();
    }, []);

    const handleDelete = (record: OrderItem) => {
        console.log('Delete', record);
    };

    const handleEdit = (record: OrderItem) => {
        navigate(`/order_management/detail?id=${record.id}&mode=edit`);
    };

    const handleDetail = (record: OrderItem) => {
        navigate(`/order_management/detail?id=${record.id}&mode=view`);
    };

    const handleAdd = () => {
        navigate(`/order_management/new_order?mode=add`);
    };

    const handleSearch = (values: any) => {
        console.log('Search', values);
    };

    const columns = getColumns(handleEdit, handleDelete, handleDetail);

    const importItems: MenuProps['items'] = [
        { key: '1', label: i18n.t(LocaleHelper.getOrderListImport()) },
    ];

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
                            {i18n.t(LocaleHelper.getOrderManagementPageTitle())}
                        </span>
                    </div>
                </div>
                <div className="header-button-area">
                    <div style={{ display: "flex" }}>
                        <div className="buttonGroup-component">
                            <div className="u-button-group">
                                <Button type="primary" danger onClick={handleAdd}>
                                    {i18n.t(LocaleHelper.getOrderListNewOrder())}
                                </Button>
                                <Button>{i18n.t(LocaleHelper.getOrderListBatchAudit())}</Button>
                                <Button>{i18n.t(LocaleHelper.getOrderListBatchBreakdown())}</Button>
                            </div>
                        </div>
                        <div className="divider-button-wrapper">
                            <Dropdown menu={{ items: importItems }}>
                                <Button>
                                    <Space>
                                        {i18n.t(LocaleHelper.getOrderListImport())}
                                        <DownOutlined />
                                    </Space>
                                </Button>
                            </Dropdown>
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
                <Table<OrderItem>
                    columns={columns}
                    rowKey={(record) => record.id}
                    dataSource={orderList}
                    loading={orderList.length === 0}
                    pagination={{
                        size: 'small',
                        pageSize: pageSize,
                        showTotal: (total) => `总共 ${total} 条`,
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

export default OrderList;
