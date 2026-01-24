
import React, { useState, useEffect } from 'react';
import { Table, Tag, Space } from 'antd';
import { DocumentItem } from "@/types/freight_forwarding/document_management";
import { DocumentService } from "@/api/freight_forwarding/document_management/document_service";
import CustomIcon from "@/components/custom-icon";
import i18n from '@/i18n';
import LocaleHelper from '@/utils/locale';
import '@/pages/page_list.less';

const DocumentVersion: React.FC = () => {
    const [data, setData] = useState<DocumentItem[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        DocumentService.getDocumentList({}).then(res => {
            if (res.success) setData(res.data);
            setLoading(false);
        });
    }, []);

    const columns = [
        { title: i18n.t(LocaleHelper.getDocumentListCode()), dataIndex: 'code', key: 'code' },
        { title: 'Current Version', dataIndex: 'version', key: 'version' },
        { title: i18n.t(LocaleHelper.getDocumentListCreateTime()), dataIndex: 'create_time', key: 'create_time' },
        { 
            title: 'Action', 
            key: 'action',
            render: () => (
                <Space>
                    <a>{i18n.t(LocaleHelper.getDocumentVersionHistory())}</a>
                    <a>{i18n.t(LocaleHelper.getDocumentVersionCompare())}</a>
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
                            {i18n.t(LocaleHelper.getDocumentVersionTitle())}
                        </span>
                    </div>
                </div>
            </div>
            
            <div className='nc-bill-table-area'>
                <Table<DocumentItem>
                    columns={columns}
                    dataSource={data}
                    rowKey="id"
                    size="small"
                    bordered={true}
                    loading={loading}
                />
            </div>
        </div>
    );
};

export default DocumentVersion;
