import React, { useState } from 'react';
import { Button, Table, Space, Switch } from 'antd';
import { useNavigate } from 'react-router-dom';
import { ArrowLeftOutlined } from '@ant-design/icons';
import CustomIcon from '@/components/custom-icon';
import LocaleHelper from '@/utils/locale';
import i18n from '@/i18n';
import '@/pages/page_list.less';

const TemplateList: React.FC = () => {
    const navigate = useNavigate();
    const [data] = useState([
        { id: '1', name: 'Milestone Update', type: 'Email', status: true },
        { id: '2', name: 'Delay Alert', type: 'SMS', status: true },
        { id: '3', name: 'Arrival Notice', type: 'WeChat', status: false },
    ]);

    const handleBack = () => {
        navigate(-1);
    };

    const columns = [
        { title: 'Template Name', dataIndex: 'name', key: 'name' },
        { title: 'Notification Type', dataIndex: 'type', key: 'type' },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            render: (checked: boolean) => <Switch checked={checked} />,
        },
        {
            title: 'Action',
            key: 'action',
            render: () => (
                <Space>
                    <a>Edit</a>
                    <a>Delete</a>
                </Space>
            ),
        },
    ];

    return (
        <div style={{ overflowY: 'auto', overflowX: 'hidden', height: 'calc(100vh - 80px)' }}>
            <div className="nc-bill-header-area">
                <div className="header-title-search-area">
                    <div className="BillHeadInfoWrap BillHeadInfoWrap-showBackBtn">
                        <span className="bill-info-title" style={{ marginLeft: '10px' }}>
                            <Button icon={<ArrowLeftOutlined />} onClick={handleBack} style={{ marginRight: 8 }} />
                            Notification Templates
                        </span>
                    </div>
                </div>
                <div className="header-button-area">
                    <div className="buttonGroup-component">
                        <div className="u-button-group">
                            <Button type="primary">New Template</Button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="nc-bill-table-area">
                <Table
                    columns={columns}
                    dataSource={data}
                    rowKey="id"
                    size="small"
                    bordered
                />
            </div>
        </div>
    );
};

export default TemplateList;
