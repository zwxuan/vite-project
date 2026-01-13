import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, message } from 'antd';
import { useNavigate } from 'react-router-dom';
import { OrderItem } from "@/types/freight_forwarding/order_management";
import { getOrderList, deleteOrder } from "@/api/freight_forwarding/order_management/order_service";
import CustomIcon from "@/components/custom-icon";
import i18n from '@/i18n';
import LocaleHelper from '@/utils/locale/freight_forwarding/order_management/orders';
import AdvancedSearchForm from "@/components/search-form";
import { getColumns } from './columns';
import { fields } from './search_fields';
import '@/pages/page_list.less';

const OrderList: React.FC = () => {
    const [data, setData] = useState<OrderItem[]>([]);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        setLoading(true);
        const res = await getOrderList();
        setData(res);
        setLoading(false);
    };

    const handleEdit = (record: OrderItem) => {
        console.log('Edit', record);
        message.info('Edit feature coming soon');
    };

    const handleDelete = (record: OrderItem) => {
        Modal.confirm({
            title: i18n.t('common.delete') + '?',
            content: `${i18n.t(LocaleHelper.getOrderNo())}: ${record.orderNo}`,
            okText: i18n.t('common.confirm') || 'Yes',
            cancelText: i18n.t('common.cancel') || 'No',
            onOk: async () => {
                try {
                    await deleteOrder(record.id);
                    message.success('Delete successfully');
                    loadData();
                } catch (error) {
                    console.error(error);
                    message.error('Delete failed');
                }
            },
        });
    };

    const handleAdd = () => {
        navigate('/order_management/new_order');
    };

    const handleSearch = (values: any) => {
        console.log('Search', values);
    };

    const columns = getColumns(handleEdit, handleDelete);

    return (
        <div style={{ overflowY: 'auto', overflowX: 'hidden', height: 'calc(100vh - 80px)' }}>
            <div className="nc-bill-header-area">
                <div className="header-title-search-area">
                    <div className="BillHeadInfoWrap BillHeadInfoWrap-showBackBtn">
                        <span className="bill-info-title" style={{ marginLeft: "10px" }}>
                            <CustomIcon type="icon-Currency" style={{ color: 'red', fontSize: '24px' }} />
                            {i18n.t(LocaleHelper.getPageTitle())}
                        </span>
                    </div>
                </div>
                <div className="header-button-area">
                    <div className="buttonGroup-component">
                        <div className="u-button-group">
                            <Button type="primary" danger onClick={handleAdd}>
                                {i18n.t(LocaleHelper.getButtonAdd())}
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
            
            <AdvancedSearchForm fields={fields as any} onSearch={handleSearch} />
            
            <div className='nc-bill-table-area'>
                <Table<OrderItem>
                    columns={columns}
                    dataSource={data}
                    rowKey="id"
                    size="small"
                    bordered={true}
                    loading={loading}
                    scroll={{ x: 'max-content', y: 'calc(100vh - 380px)' }}
                    pagination={{
                        size: 'small',
                        showTotal: (total) => `Total ${total} items`,
                        showQuickJumper: true,
                        showSizeChanger: true,
                    }}
                />
            </div>
        </div>
    );
};

export default OrderList;
