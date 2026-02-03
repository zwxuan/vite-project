/**
 * 应收费用管理列表页面
 */
import React, { useState, useEffect } from 'react';
import { Table, Button, Space, message, Modal } from 'antd';
import { PlusOutlined, ExportOutlined } from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import { useNavigate } from 'react-router-dom';
import AdvancedSearchForm from '@/components/search-form';
import CustomIcon from '@/components/custom-icon';
import { receivableCostSearchFields } from './search_fields';
import { getColumns } from './columns';
import {
    getReceivableCostList,
    deleteReceivableCost,
} from '@/api/freight_forwarding/cost_management/cost_management_service';
import { ReceivableCost, CostStatus } from '@/types/freight_forwarding/cost_management';
import LocaleHelper from '@/utils/locale';
import i18n from '@/i18n';
import '@/pages/page_list.less';

const ReceivableCostList: React.FC = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [dataSource, setDataSource] = useState<ReceivableCost[]>([]);
    const [total, setTotal] = useState(0);
    const [searchParams, setSearchParams] = useState<any>({
        pageNum: 1,
        pageSize: 10,
    });



    // 加载数据
    const loadData = async () => {
        setLoading(true);
        try {
            const response = await getReceivableCostList(searchParams);
            setDataSource(response.list);
            setTotal(response.total);
        } catch (error) {
            message.error(i18n.t(LocaleHelper.getFail()));
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadData();
    }, [searchParams]);

    // 搜索处理
    const handleSearch = (values: any) => {
        setSearchParams({
            ...values,
            pageNum: 1,
            pageSize: searchParams.pageSize,
        });
    };

    // 新建
    const handleCreate = () => {
        navigate('/cost_management/receivable_cost/create');
    };

    // 编辑
    const handleEdit = (id: string) => {
        navigate(`/cost_management/receivable_cost/edit/${id}`);
    };

    // 删除
    const handleDelete = (id: string) => {
        Modal.confirm({
            title: i18n.t(LocaleHelper.getReceivableCostMsgConfirmDeleteTitle()),
            content: i18n.t(LocaleHelper.getReceivableCostMsgConfirmDeleteContent()),
            onOk: async () => {
                try {
                    await deleteReceivableCost(id);
                    message.success(i18n.t(LocaleHelper.getReceivableCostMsgDeleteSuccess()));
                    loadData();
                } catch (error) {
                    message.error(i18n.t(LocaleHelper.getFail()));
                }
            },
        });
    };

    // 表格列定义
    // 使用 import 的 getColumns
    const columns = getColumns(handleEdit, handleDelete);

    // 分页变化
    const handleTableChange = (pagination: any) => {
        setSearchParams({
            ...searchParams,
            pageNum: pagination.current,
            pageSize: pagination.pageSize,
        });
    };

    return (
        <div style={{ overflowY: 'auto', overflowX: 'hidden', height: 'calc(100vh - 80px)' }}>
            {/* 页面头部 */}
            <div className="nc-bill-header-area">
                <div className="header-title-search-area">
                    <div className="BillHeadInfoWrap BillHeadInfoWrap-showBackBtn">
                        <span className="bill-info-title" style={{ marginLeft: '10px' }}>
                            <CustomIcon type="icon-Currency" style={{ color: 'red', fontSize: '24px' }} />
                            {i18n.t(LocaleHelper.getReceivableCostListTitle())}
                        </span>
                    </div>
                </div>
                <div className="header-button-area">
                    <div className="buttonGroup-component">
                        <div className="u-button-group">
                            <Button
                                type="primary"
                                danger
                                icon={<PlusOutlined />}
                                onClick={handleCreate}
                            >
                                {i18n.t(LocaleHelper.getReceivableCostBtnCreate())}
                            </Button>
                            <Button icon={<ExportOutlined />}>
                                {i18n.t(LocaleHelper.getReceivableCostBtnExport())}
                            </Button>
                        </div>
                    </div>
                </div>
            </div>

            {/* 搜索表单 */}
            <AdvancedSearchForm
                fields={receivableCostSearchFields}
                onSearch={handleSearch}
            />

            {/* 表格 */}
            <div className="nc-bill-table-area">
                <Table
                    columns={columns}
                    dataSource={dataSource}
                    loading={loading}
                    rowKey="id"
                    size="small"
                    bordered={true}
                    scroll={{ x: 'max-content', y: 'calc(100vh - 380px)' }}
                    pagination={{
                        current: searchParams.pageNum,
                        pageSize: searchParams.pageSize,
                        total: total,
                        showTotal: (total) => i18n.t(LocaleHelper.getReceivableCostPaginationTotal(), { total }),
                        showQuickJumper: true,
                        showSizeChanger: true,
                    }}
                    onChange={handleTableChange}
                />
            </div>
        </div>
    );
};

export default ReceivableCostList;
