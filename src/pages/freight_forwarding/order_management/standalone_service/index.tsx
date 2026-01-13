import React, { useState } from 'react';
import { Table, Button, Space, Tag } from 'antd';
import CustomIcon from "@/components/custom-icon";
import AdvancedSearchForm from "@/components/search-form";
import { fields } from './search_fields';
import '@/pages/page_list.less';

const StandaloneService: React.FC = () => {
    const [dataSource] = useState([
        { key: '1', serviceId: 'SRV-001', customerName: 'ABC公司', serviceType: '单独报关', content: '出口报关服务', status: '进行中', cost: '2,800' },
        { key: '2', serviceId: 'SRV-002', customerName: 'DEF公司', serviceType: '单独仓储', content: '保税仓储30天', status: '已完成', cost: '3,000' },
        { key: '3', serviceId: 'SRV-003', customerName: 'GHI公司', serviceType: '单证代理', content: '提单制作', status: '待开始', cost: '500' },
        { key: '4', serviceId: 'SRV-004', customerName: 'JKL公司', serviceType: '保险代理', content: '货物运输险', status: '已完成', cost: '300' },
    ]);

    const handleSearch = (values: any) => {
        console.log('Search', values);
    };

    const columns = [
        { title: '服务ID', dataIndex: 'serviceId', key: 'serviceId' },
        { title: '客户名称', dataIndex: 'customerName', key: 'customerName' },
        { title: '服务类型', dataIndex: 'serviceType', key: 'serviceType' },
        { title: '服务内容', dataIndex: 'content', key: 'content' },
        { 
            title: '状态', 
            dataIndex: 'status', 
            key: 'status',
            render: (text: string) => {
                let color = 'default';
                if (text === '进行中') color = 'processing';
                if (text === '已完成') color = 'success';
                if (text === '待开始') color = 'warning';
                return <Tag color={color}>{text}</Tag>;
            }
        },
        { title: '费用', dataIndex: 'cost', key: 'cost' },
        {
            title: '操作',
            key: 'action',
            render: (_: any, record: any) => (
                <Space size="middle">
                    <a style={{ color: '#1890ff' }}>[详情]</a>
                    {record.status === '待开始' ? <a style={{ color: '#52c41a' }}>[开始]</a> : null}
                    {record.status === '已完成' ? <a style={{ color: '#1890ff' }}>[结算]</a> : null}
                    {record.status === '进行中' ? <a style={{ color: '#1890ff' }}>[编辑]</a> : null}
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
                            <span>订单管理 {'>'} 单项服务管理</span>
                        </span>
                    </div>
                </div>
                <div className="header-button-area">
                    <div className="buttonGroup-component">
                        <div className="u-button-group">
                            <Button type="primary" danger>新建服务</Button>
                            <Button>批量操作</Button>
                            <Button>导出</Button>
                        </div>
                    </div>
                </div>
            </div>

            <AdvancedSearchForm fields={fields as any} onSearch={handleSearch} />

            <div style={{ padding: '0 10px' }}>
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

export default StandaloneService;
