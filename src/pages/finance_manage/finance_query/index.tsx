
import React from 'react';
import { Tabs, Card, Button, Dropdown, Space } from 'antd';
import { HighlightOutlined, UserOutlined, AccountBookOutlined, WindowsOutlined, GithubOutlined, SplitCellsOutlined, OneToOneOutlined, VerifiedOutlined, GoldOutlined, FolderOutlined, DownOutlined, RedoOutlined } from '@ant-design/icons';
import { useLocation } from 'react-router-dom';
import { exportItems } from './menu_items';
import AdvancedSearchForm from '@/components/search-form';
import { fields } from './search_fields';
import Orders  from './tab_detail/businiess/index'
import FeeReconciliation  from './tab_detail/fee/index'
import Invoice from './tab_detail/invoice';
import BillManage from './tab_detail/bill';
import StatementObject from './tab_detail/statement_object';
const FinanceQuery: React.FC = () => {
    //获取路由参数
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const businessId = searchParams.get('businessId');
    const handleSearch = (values:any) => {
        console.log('handleSearch',values);
    };
    return (
        <div style={{ overflowY: 'auto', overflowX: 'hidden', height: 'calc(100vh - 80px)' }}>
            <div className="nc-bill-header-area">
                <div className="header-button-area">
                    <span className="button-app-wrapper header-button-area-button-app-wrapper"></span>
                    <div style={{ display: "flex" }}>
                        <div className="buttonGroup-component">
                            <div className="u-button-group">
                            </div>
                        </div>
                        <div className="buttonGroup-component" style={{ marginLeft: "10px" }}>
                            <div className="u-button-group"></div>
                        </div>
                        <div className="divider-button-wrapper">
                            <Dropdown menu={{items:exportItems}}>
                                <Button>
                                    <Space>
                                        导出
                                    <DownOutlined />
                                    </Space>
                                </Button>   
                            </Dropdown>
                        </div>
                        <span className="u-button">
                            <RedoOutlined className='iconfont' />
                        </span>
                    </div>
                </div>
            </div>
            <AdvancedSearchForm fields={fields} onSearch={handleSearch} />
            <div className='nc-bill-table-area'>
                <Tabs size='middle' type="card"
                    items={[
                        {
                            label: '业务明细',
                            key: 'business_all',
                            children: <Orders />,
                        },
                        {
                            label: '费用明细',
                            key: 'fee_all',
                            children: <FeeReconciliation />,
                        },
                        {
                            label: '发票',
                            key: 'invoice',
                            children: <Invoice />,
                        },
                        {
                            label: '账单',
                            key: 'bill',
                            children: <BillManage />,
                        },
                        {
                            label: '结算对象',
                            key: 'settlement_object',
                            children: <StatementObject />,
                        },
                    ]}
                />

            </div>
        </div>
    );
};

export default FinanceQuery;
