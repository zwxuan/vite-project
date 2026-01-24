
import React, { useState, useEffect } from 'react';
import { Table, Button, Tag, Space, message, Popconfirm } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import CustomIcon from "@/components/custom-icon";
import i18n from '@/i18n';
import LocaleHelper from '@/utils/locale';
import '@/pages/page_list.less';
import AdvancedSearchForm from "@/components/search-form";
import { signatureSearchFields } from './search_fields';
import { useNavigate } from 'react-router-dom';
import { getColumns, SignatureItem } from './columns';

const mockData: SignatureItem[] = [
    { id: '1', name: 'Company Official Seal', type: 'Company', status: 'Active', authorizedUsers: ['Admin', 'Manager'], updatedAt: '2023-10-01' },
    { id: '2', name: 'Finance Seal', type: 'Company', status: 'Active', authorizedUsers: ['Accountant'], updatedAt: '2023-10-02' },
    { id: '3', name: 'John Doe Personal Seal', type: 'Personal', status: 'Active', authorizedUsers: ['John Doe'], updatedAt: '2023-10-03' },
];

const DocumentSignature: React.FC = () => {
    const [data, setData] = useState<SignatureItem[]>(mockData);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSearch = (values: any) => {
        setLoading(true);
        console.log('Search values:', values);
        // Mock search logic
        setTimeout(() => {
            setLoading(false);
        }, 500);
    };

    const handleReset = () => {
        setData(mockData);
    };

    const handleDelete = (id: string) => {
        setData(data.filter(item => item.id !== id));
    };

    const columns = getColumns(
        (id) => navigate(`/document_management/signature/edit/${id}`),
        handleDelete
    );

    return (
        <div style={{ overflowY: 'auto', overflowX: 'hidden', height: 'calc(100vh - 80px)' }}>
            <div className="nc-bill-header-area">
                <div className="header-title-search-area">
                    <div className="BillHeadInfoWrap">
                        <span className="bill-info-title" style={{ marginLeft: "10px" }}>
                            <CustomIcon type="icon-Currency" style={{ color: 'red', fontSize: '24px' }} />
                            {i18n.t(LocaleHelper.getDocumentSignatureTitle())}
                        </span>
                    </div>
                </div>
                <div className="header-button-area">
                    <div className="buttonGroup-component">
                        <div className="u-button-group">
                            <Button type="primary" danger icon={<PlusOutlined />} onClick={() => navigate('/document_management/signature/create')}>
                                {i18n.t(LocaleHelper.getDocumentSignatureNew())}
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
            
            <AdvancedSearchForm
                fields={signatureSearchFields}
                onSearch={handleSearch}
            />

            <div className='nc-bill-table-area'>
                <Table<SignatureItem>
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

export default DocumentSignature;
