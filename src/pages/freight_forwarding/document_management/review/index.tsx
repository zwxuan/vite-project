
import React, { useState, useEffect } from 'react';
import { Table, Button, message, Typography, Divider } from 'antd';
import { useNavigate } from 'react-router-dom';
import { DocumentItem, DocumentListParams } from "@/types/freight_forwarding/document_management";
import { DocumentService } from "@/api/freight_forwarding/document_management/document_service";
import CustomIcon from "@/components/custom-icon";
import i18n from '@/i18n';
import LocaleHelper from '@/utils/locale';
import AdvancedSearchForm from "@/components/search-form";
import { getReviewColumns } from './columns';
import { searchFields } from './search_fields';
import '@/pages/page_list.less';

const { Title } = Typography;

const DocumentReview: React.FC = () => {
    const [data, setData] = useState<DocumentItem[]>([]);
    const [loading, setLoading] = useState(false);
    const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
    const [total, setTotal] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
        loadData({ status: 'PendingReview' });
    }, []);

    const loadData = async (params: DocumentListParams) => {
        setLoading(true);
        try {
            const res = await DocumentService.getDocumentList({ ...params, status: 'PendingReview' });
            if (res.success && res.data) {
                setData(res.data);
                setTotal(res.total);
            }
        } catch (error) {
            console.error(error);
            message.error('Load failed');
        }
        setLoading(false);
    };

    const handleReview = (record: DocumentItem) => {
        navigate(`/document_management/review/detail/${record.id}`);
    };

    const handleBatchReview = () => {
        if (selectedRowKeys.length === 0) {
            message.warning('Please select at least one document');
            return;
        }
        message.info(`Batch review ${selectedRowKeys.length} documents`);
    };

    const handleExport = () => {
        message.success('Export started');
    };

    const handleSearch = (values: DocumentListParams) => {
        loadData(values);
    };

    const columns = getReviewColumns(handleReview);

    const rowSelection = {
        selectedRowKeys,
        onChange: (keys: React.Key[]) => setSelectedRowKeys(keys),
    };

    return (
        <div style={{ overflowY: 'auto', overflowX: 'hidden', height: 'calc(100vh - 80px)' }}>
            <div className="nc-bill-header-area">
                <div className="header-title-search-area">
                    <div className="BillHeadInfoWrap BillHeadInfoWrap-showBackBtn">
                        <span className="bill-info-title" style={{ marginLeft: "10px" }}>
                            <CustomIcon type="icon-Currency" style={{ color: 'red', fontSize: '24px' }} />
                            {i18n.t(LocaleHelper.getDocumentReviewTitle())}
                        </span>
                    </div>
                </div>
                <div className="header-button-area">
                    <div className="buttonGroup-component">
                        <div className="u-button-group">
                            <Button type="primary" danger onClick={handleBatchReview}>
                                {i18n.t(LocaleHelper.getDocumentReviewBatchReview())}
                            </Button>
                            <Button onClick={handleExport}>
                                {i18n.t(LocaleHelper.getDocumentReviewExport())}
                            </Button>
                        </div>
                    </div>
                </div>
            </div>

            <div style={{ padding: '0 20px' }}>
                <Title level={5} style={{ marginTop: 10, marginBottom: 10 }}>{i18n.t(LocaleHelper.getDocumentReviewFilter())}</Title>
                <AdvancedSearchForm fields={searchFields as any} onSearch={handleSearch} />
                <Divider style={{ margin: '12px 0' }} />
                <Title level={5} style={{ marginBottom: 10 }}>{i18n.t(LocaleHelper.getDocumentReviewList())}</Title>
            </div>

            <div className='nc-bill-table-area'>
                <Table<DocumentItem>
                    columns={columns}
                    dataSource={data}
                    rowKey="id"
                    size="small"
                    bordered={true}
                    loading={loading}
                    rowSelection={rowSelection}
                    scroll={{ x: 'max-content', y: 'calc(100vh - 380px)' }}
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
    );
};

export default DocumentReview;
