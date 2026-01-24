
import React, { useState, useEffect } from 'react';
import { Table, Button, message, Tag, Space } from 'antd';
import { useNavigate } from 'react-router-dom';
import { DocumentItem, DocumentListParams } from "@/types/freight_forwarding/document_management";
import { DocumentService } from "@/api/freight_forwarding/document_management/document_service";
import CustomIcon from "@/components/custom-icon";
import i18n from '@/i18n';
import LocaleHelper from '@/utils/locale';
import AdvancedSearchForm from "@/components/search-form";
import '@/pages/page_list.less';
import { searchFields } from '../list/search_fields';

const DocumentReview: React.FC = () => {
    const [data, setData] = useState<DocumentItem[]>([]);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        loadData({ status: 'PendingReview' });
    }, []);

    const loadData = async (params: DocumentListParams) => {
        setLoading(true);
        try {
            const res = await DocumentService.getDocumentList(params);
            if (res.success && res.data) {
                setData(res.data);
            }
        } catch (error) {
            console.error(error);
        }
        setLoading(false);
    };

    const handleReview = (record: DocumentItem, pass: boolean) => {
        message.success(`${pass ? 'Passed' : 'Rejected'} ${record.code}`);
        loadData({ status: 'PendingReview' });
    };

    const columns = [
        { title: i18n.t(LocaleHelper.getDocumentListCode()), dataIndex: 'code', key: 'code' },
        { title: i18n.t(LocaleHelper.getDocumentListType()), dataIndex: 'type', key: 'type' },
        { title: i18n.t(LocaleHelper.getDocumentListStatus()), dataIndex: 'status', key: 'status', render: (s: string) => <Tag color="warning">{s}</Tag> },
        { 
            title: 'Action', 
            key: 'action',
            render: (_: any, record: DocumentItem) => (
                <Space>
                    <a onClick={() => handleReview(record, true)}>{i18n.t(LocaleHelper.getDocumentReviewPass())}</a>
                    <a onClick={() => handleReview(record, false)} style={{ color: 'red' }}>{i18n.t(LocaleHelper.getDocumentReviewReject())}</a>
                </Space>
            )
        }
    ];

    return (
        <div style={{ overflowY: 'auto', overflowX: 'hidden', height: 'calc(100vh - 80px)' }}>
            <div className="nc-bill-header-area">
                <div className="header-title-search-area">
                    <div className="BillHeadInfoWrap">
                        <span className="bill-info-title" style={{ marginLeft: "10px" }}>
                            <CustomIcon type="icon-Currency" style={{ color: 'red', fontSize: '24px' }} />
                            {i18n.t(LocaleHelper.getDocumentReviewTitle())}
                        </span>
                    </div>
                </div>
            </div>
            
            <AdvancedSearchForm fields={searchFields as any} onSearch={(v) => loadData({...v, status: 'PendingReview'})} />
            
            <div className='nc-bill-table-area'>
                <Table<DocumentItem>
                    columns={columns}
                    dataSource={data}
                    rowKey="id"
                    size="small"
                    bordered={true}
                    loading={loading}
                    scroll={{ x: 'max-content', y: 'calc(100vh - 380px)' }}
                />
            </div>
        </div>
    );
};

export default DocumentReview;
