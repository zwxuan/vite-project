import React, { useState } from 'react';
import { Table, Button, Space, Tag } from 'antd';
import CustomIcon from "@/components/custom-icon";
import AdvancedSearchForm from "@/components/search-form";
import { fields } from './search_fields';
import '@/pages/page_list.less';

const BreakdownRules: React.FC = () => {
    const [dataSource] = useState([
        {
            key: '1',
            ruleName: '海运出口标准流程',
            applicableType: '海运出口',
            status: '启用',
            lastModified: '03-15',
        },
        {
            key: '2',
            ruleName: '空运进口快速流程',
            applicableType: '空运进口',
            status: '启用',
            lastModified: '03-10',
        },
        {
            key: '3',
            ruleName: '危险品处理流程',
            applicableType: '全部',
            status: '启用',
            lastModified: '03-08',
        },
    ]);

    const handleSearch = (values: any) => {
        console.log('Search', values);
    };

    const columns = [
        {
            title: '规则名称',
            dataIndex: 'ruleName',
            key: 'ruleName',
        },
        {
            title: '适用类型',
            dataIndex: 'applicableType',
            key: 'applicableType',
        },
        {
            title: '状态',
            dataIndex: 'status',
            key: 'status',
            render: (text: string) => (
                <Tag color={text === '启用' ? 'green' : 'red'}>{text}</Tag>
            ),
        },
        {
            title: '最后修改',
            dataIndex: 'lastModified',
            key: 'lastModified',
        },
        {
            title: '操作',
            key: 'action',
            render: (_: any, record: any) => (
                <Space size="middle">
                    <a style={{ color: '#1890ff' }}>编辑</a>
                    <a style={{ color: '#1890ff' }}>复制</a>
                    <a style={{ color: 'red' }}>停用</a>
                </Space>
            ),
        },
    ];

    return (
        <div style={{ overflowY: 'auto', overflowX: 'hidden', height: 'calc(100vh - 80px)' }}>
            <div className="nc-bill-header-area">
                <div className="header-title-search-area">
                    <div className="BillHeadInfoWrap BillHeadInfoWrap-showBackBtn">
                        <span className="bill-info-title" style={{ marginLeft: "10px" }}>
                            <CustomIcon type="icon-Currency" style={{ color: 'red', fontSize: '24px' }} />
                            <span>订单管理 {'>'} 拆解规则配置</span>
                        </span>
                    </div>
                </div>
                <div className="header-button-area">
                    <div className="buttonGroup-component">
                        <div className="u-button-group">
                            <Button type="primary" danger>
                                新建规则
                            </Button>
                            <Button>
                                导入
                            </Button>
                        </div>
                    </div>
                </div>
            </div>

            <AdvancedSearchForm fields={fields as any} onSearch={handleSearch} />

            <div style={{ padding: '0 10px' }}>
                <div style={{ fontWeight: 'bold', marginBottom: '5px' }}>规则列表：</div>
                <div className='nc-bill-table-area'>
                    <Table
                        columns={columns}
                        dataSource={dataSource}
                        pagination={false}
                        size="small"
                        bordered
                    />
                </div>
            </div>
        </div>
    );
};

export default BreakdownRules;
