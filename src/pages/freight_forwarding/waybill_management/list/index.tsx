import React, { useState, useEffect } from 'react';
import { Table, Button, message, Modal } from 'antd';
import { useNavigate } from 'react-router-dom';
import { WaybillItem, WaybillListParams } from "@/types/freight_forwarding/waybill_management";
import { getWaybillList } from "@/api/freight_forwarding/waybill_management/waybill_service";
import CustomIcon from "@/components/custom-icon";
import i18n from '@/i18n';
import LocaleHelper from '@/utils/locale';
import AdvancedSearchForm from "@/components/search-form";
import { getColumns } from './columns';
import { fields } from './search_fields';
import '@/pages/page_list.less';

const WaybillList: React.FC = () => {
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

    const handleEdit = (record: WaybillItem) => {
        navigate(`/waybill_management/create?id=${record.waybillId}`);
    };

    const handleDelete = (record: WaybillItem) => {
        Modal.confirm({
            title: i18n.t(LocaleHelper.getWaybillListDelete()),
            content: `Are you sure to delete ${record.waybillNo}?`,
            onOk: () => {
                message.success('Deleted successfully');
                loadData({});
            }
        });
    };

    const handleSearch = (values: any) => {
        loadData(values);
    };

    const handleNew = () => {
        navigate('/waybill_management/create');
    };

    const handleDetail = (record: WaybillItem) => {
        navigate(`/waybill_management/create?id=${record.waybillId}&readonly=true`);
    };

    const columns = getColumns(handleEdit, handleDelete, handleDetail);

    return (
        <div style={{ overflowY: 'auto', overflowX: 'hidden', height: 'calc(100vh - 80px)' }}>
            <div className="nc-bill-header-area">
                <div className="header-title-search-area">
                    <div className="BillHeadInfoWrap BillHeadInfoWrap-showBackBtn">
                        <span className="bill-info-title" style={{ marginLeft: "10px" }}>
                            <CustomIcon type="icon-Currency" style={{ color: 'red', fontSize: '24px' }} />
                            {i18n.t(LocaleHelper.getWaybillListTitle())}
                        </span>
                    </div>
                </div>
                <div className="header-button-area">
                    <div className="buttonGroup-component">
                        <div className="u-button-group">
                            <Button type="primary" danger onClick={handleNew}>
                                {i18n.t(LocaleHelper.getWaybillListNewWaybill())}
                            </Button>
                            <Button>
                                {i18n.t(LocaleHelper.getWaybillListImport())}
                            </Button>
                            <Button>
                                {i18n.t(LocaleHelper.getWaybillListExport())}
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
            
            <AdvancedSearchForm fields={fields as any} onSearch={handleSearch} />
            
            <div className='nc-bill-table-area'>
                <Table<WaybillItem>
                    columns={columns}
                    dataSource={data}
                    rowKey="waybillId"
                    size="small"
                    bordered={true}
                    loading={loading}
                    scroll={{ x: 'max-content', y: 'calc(100vh - 380px)' }}
                    pagination={{
                        size: 'small',
                        total: total,
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

export default WaybillList;
