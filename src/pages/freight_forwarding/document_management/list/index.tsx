
import React, { useState, useEffect } from 'react';
import { Table, Button, message, Modal } from 'antd';
import { useNavigate } from 'react-router-dom';
import { DocumentItem, DocumentListParams } from "@/types/freight_forwarding/document_management";
import { DocumentService } from "@/api/freight_forwarding/document_management/document_service";
import CustomIcon from "@/components/custom-icon";
import i18n from '@/i18n';
import LocaleHelper from '@/utils/locale';
import AdvancedSearchForm from "@/components/search-form";
import { getColumns } from './columns';
import { searchFields } from './search_fields';
import '@/pages/page_list.less';

const DocumentList: React.FC = () => {
    const [data, setData] = useState<DocumentItem[]>([]);
    const [loading, setLoading] = useState(false);
    const [total, setTotal] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
        loadData({});
    }, []);

    const loadData = async (params: DocumentListParams) => {
        setLoading(true);
        try {
            const res = await DocumentService.getDocumentList(params);
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

    const handleEdit = (record: DocumentItem) => {
        navigate(`/document_management/create?id=${record.id}`);
    };

    const handleDelete = (record: DocumentItem) => {
        Modal.confirm({
            title: i18n.t(LocaleHelper.getDocumentListDelete()),
            content: `Are you sure to delete ${record.code}?`,
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
        navigate('/document_management/create');
    };

    const handleDetail = (record: DocumentItem) => {
        navigate(`/document_management/detail/${record.id}`);
    };

    const columns = getColumns(handleEdit, handleDelete, handleDetail);

    return (
        <div style={{ overflowY: 'auto', overflowX: 'hidden', height: 'calc(100vh - 80px)' }}>
            <div className="nc-bill-header-area">
                <div className="header-title-search-area">
                    <div className="BillHeadInfoWrap BillHeadInfoWrap-showBackBtn">
                        <span className="bill-info-title" style={{ marginLeft: "10px" }}>
                            <CustomIcon type="icon-Currency" style={{ color: 'red', fontSize: '24px' }} />
                            {i18n.t(LocaleHelper.getDocumentListTitle())}
                        </span>
                    </div>
                </div>
                <div className="header-button-area">
                    <div className="buttonGroup-component">
                        <div className="u-button-group">
                            <Button type="primary" danger onClick={handleNew}>
                                {i18n.t(LocaleHelper.getDocumentListNew())}
                            </Button>
                            <Button>
                                {i18n.t(LocaleHelper.getDocumentListExport())}
                            </Button>
                            <Button>
                                {i18n.t(LocaleHelper.getDocumentListBatchReview())}
                            </Button>
                            <Button>
                                {i18n.t(LocaleHelper.getDocumentListBatchIssue())}
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
            
            <AdvancedSearchForm fields={searchFields as any} onSearch={handleSearch} />
            
            <div className='nc-bill-table-area'>
                <Table<DocumentItem>
                    columns={columns}
                    dataSource={data}
                    rowKey="id"
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

export default DocumentList;
