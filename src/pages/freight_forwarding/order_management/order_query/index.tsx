import React, { useState } from 'react';
import { Table, Button } from 'antd';
import CustomIcon from "@/components/custom-icon";
import AdvancedSearchForm from "@/components/search-form";
import { fields } from './search_fields';
import '@/pages/page_list.less';

const OrderQuery: React.FC = () => {
    const [dataSource] = useState([
        {
            key: '1',
            orderNo: 'ORD-001',
            customerName: 'ABC公司',
            sales: '小李',
            orderType: '海运出口',
            status: '已确认',
            createDate: '03-15',
        },
        {
            key: '2',
            orderNo: 'ORD-002',
            customerName: 'XYZ公司',
            sales: '小王',
            orderType: '空运进口',
            status: '执行中',
            createDate: '03-16',
        },
    ]);

    const handleSearch = (values: any) => {
        console.log('Search', values);
    };

    const columns = [
        { title: '订单号', dataIndex: 'orderNo', key: 'orderNo' },
        { title: '客户名称', dataIndex: 'customerName', key: 'customerName' },
        { title: '业务员', dataIndex: 'sales', key: 'sales' },
        { title: '订单类型', dataIndex: 'orderType', key: 'orderType' },
        { title: '状态', dataIndex: 'status', key: 'status' },
        { title: '创建日期', dataIndex: 'createDate', key: 'createDate' },
        {
            title: '操作',
            key: 'action',
            render: () => (
                <div style={{ display: 'flex', gap: '8px' }}>
                    <a style={{ color: '#1890ff' }}>[详情]</a>
                    <a style={{ color: '#1890ff' }}>[跟踪]</a>
                </div>
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
                            <span>订单管理 {'>'} 订单查询</span>
                        </span>
                    </div>
                </div>
                <div className="header-button-area">
                    <div className="buttonGroup-component">
                        <div className="u-button-group">
                            <Button>高级搜索</Button>
                            <Button>导出</Button>
                        </div>
                    </div>
                </div>
            </div>

            <AdvancedSearchForm fields={fields as any} onSearch={handleSearch} />

            <div style={{ padding: '0 10px' }}>
                <div style={{ fontWeight: 'bold', marginBottom: '5px' }}>搜索结果：</div>
                <div className='nc-bill-table-area'>
                    <Table
                        columns={columns}
                        dataSource={dataSource}
                        pagination={{
                            total: 25,
                            showTotal: (total) => `共找到 ${total} 条记录，第 1/3 页`,
                            pageSize: 10,
                            size: 'small',
                            showSizeChanger: false,
                            itemRender: (page, type, originalElement) => {
                                if (type === 'prev') return <a>[上页]</a>;
                                if (type === 'next') return <a>[下页]</a>;
                                return originalElement;
                            }
                        }}
                        size="small"
                        bordered
                    />
                </div>
            </div>
        </div>
    );
};

export default OrderQuery;
