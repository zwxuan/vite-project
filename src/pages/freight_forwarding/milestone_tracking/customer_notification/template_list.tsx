import React, { useState } from 'react';
import { Button, Table, Space, Switch, message } from 'antd';
import { useNavigate } from 'react-router-dom';
import { ArrowLeftOutlined } from '@ant-design/icons';
import '@/pages/page_list.less';
import LocaleHelper from '@/utils/locale';
import i18n from '@/i18n';
const TemplateList: React.FC = () => {
    const navigate = useNavigate();
    const [data] = useState([
        { id: '1', name: '里程碑更新模板', type: '里程碑更新', status: true },
        { id: '2', name: '延迟通知模板', type: '延迟通知', status: true },
        { id: '3', name: '到港通知模板', type: '到港通知', status: false },
    ]);

    const handleBack = () => {
        navigate(-1);
    };

    const handleEdit = (id: string) => {
        navigate(`/milestone_tracking/customer_notification/templates/detail/${id}`);
    };

    const handleDelete = () => {
        message.success('已删除');
    };

    const handleCreate = () => {
        navigate('/milestone_tracking/customer_notification/templates/detail/new');
    };

    const columns = [
        { title: '模板名称', dataIndex: 'name', key: 'name' },
        { title: '通知类型', dataIndex: 'type', key: 'type' },
        {
            title: '状态',
            dataIndex: 'status',
            key: 'status',
            render: (checked: boolean) => <Switch checked={checked} />,
        },
        {
            title: '操作',
            key: 'action',
            render: (_: unknown, record: { id: string }) => (
                <Space>
                    <a onClick={() => handleEdit(record.id)}>编辑</a>
                    <a onClick={handleDelete}>删除</a>
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
                            通知模板
                        </span>
                    </div>
                </div>
                <div className="header-button-area">
                    <div className="buttonGroup-component">
                        <div className="u-button-group">
                            <Button type="primary" onClick={handleCreate}>新建模板</Button>
                            <Button onClick={handleBack} style={{ marginRight: 8 }} >{i18n.t(LocaleHelper.getBack())}</Button>
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
