
import React, { useState, useEffect } from 'react';
import { Table, Button, Tag, Space } from 'antd';
import { useNavigate } from 'react-router-dom';
import { DocumentTemplate } from "@/types/freight_forwarding/document_management";
import { DocumentService } from "@/api/freight_forwarding/document_management/document_service";
import CustomIcon from "@/components/custom-icon";
import AdvancedSearchForm from '@/components/search-form';
import { fields } from './search_fields';
import i18n from '@/i18n';
import LocaleHelper from '@/utils/locale';
import '@/pages/page_list.less';

const DocumentTemplatePage: React.FC = () => {
    const navigate = useNavigate();
    const [data, setData] = useState<DocumentTemplate[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        DocumentService.getTemplateList().then(res => {
            if (res.success) setData(res.data);
            setLoading(false);
        });
    }, []);

    const handleSearch = (values: any) => {
        setLoading(true);
        console.log('Search values:', values);
        // Implement search logic here, potentially calling DocumentService with params
        // For now, we'll just reload the list
        DocumentService.getTemplateList().then(res => {
            if (res.success) setData(res.data);
            setLoading(false);
        });
    };

    const columns = [
        { title: i18n.t(LocaleHelper.getDocumentTemplateName()), dataIndex: 'name', key: 'name' },
        { title: i18n.t(LocaleHelper.getDocumentTemplateCategory()), dataIndex: 'category', key: 'category' },
        { title: i18n.t(LocaleHelper.getDocumentTemplateVersion()), dataIndex: 'version', key: 'version' },
        { title: i18n.t(LocaleHelper.getDocumentTemplateStatus()), dataIndex: 'status', key: 'status', render: (s: string) => <Tag color="green">{s}</Tag> },
        { 
            title: i18n.t(LocaleHelper.getDocumentTemplateAction()), 
            key: 'action',
            render: (text: string, record: DocumentTemplate) => (
                <Space>
                    <a onClick={() => navigate(`/document_management/template/detail/${record.id}`)}>{i18n.t(LocaleHelper.getDocumentTemplateDetail())}</a>
                    <a onClick={() => navigate(`/document_management/template/edit/${record.id}`)}>{i18n.t(LocaleHelper.getDocumentTemplateEdit())}</a>
                    <a>{i18n.t(LocaleHelper.getDocumentTemplateCopy())}</a>
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
                            {i18n.t(LocaleHelper.getDocumentTemplateTitle())}
                        </span>
                    </div>
                </div>
                <div className="header-button-area">
                    <div className="buttonGroup-component">
                        <div className="u-button-group">
                            <Button type="primary" danger onClick={() => navigate('/document_management/template/create')}>{i18n.t(LocaleHelper.getDocumentTemplateNew())}</Button>
                        </div>
                    </div>
                </div>
            </div>

            <AdvancedSearchForm
                fields={fields}
                onSearch={handleSearch}
            />
            
            <div className='nc-bill-table-area'>
                <Table<DocumentTemplate>
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

export default DocumentTemplatePage;
