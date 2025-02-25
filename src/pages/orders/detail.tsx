
import React from 'react';
import { Tabs, Card } from 'antd';
import { HighlightOutlined, UserOutlined, AccountBookOutlined, WindowsOutlined, GithubOutlined, SplitCellsOutlined, OneToOneOutlined, VerifiedOutlined, GoldOutlined, FolderOutlined } from '@ant-design/icons';
import { useLocation } from 'react-router-dom';
import { BaseBusiness, Fee, FeeCAP, OrderBill, OrderBillForeign, FeeQuickInput, FinancialState, OrderFeeRelation, OrderProft,OrderDocument } from './details';
const Detail: React.FC = () => {
    //获取路由参数
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const businessId = searchParams.get('businessId');
    return (
        <Card>
            <Tabs
                items={[
                    {
                        label: '基本信息',
                        key: 'base_business',
                        children: <BaseBusiness />,
                        icon: <UserOutlined />,
                    },
                    {
                        label: '费用快速录入',
                        key: 'fee_quick_input',
                        children: <FeeQuickInput />,
                        icon: <HighlightOutlined />,
                    },
                    {
                        label: '费用相关',
                        key: 'fee_all',
                        children: <Fee />,
                        icon: <AccountBookOutlined />,
                    },
                    {
                        label: '国内账单',
                        key: 'order_bill',
                        children: <OrderBill />,
                        icon: <WindowsOutlined />,
                    },
                    {
                        label: '国外账单',
                        key: 'order_bill_foreign',
                        children: <OrderBillForeign />,
                        icon: <GithubOutlined />,
                    },
                    {
                        label: '代收垫付',
                        key: 'fee_cap',
                        children: <FeeCAP />,
                        icon: <SplitCellsOutlined />,
                    },
                    {
                        label: '关联交易',
                        key: 'fee_relation',
                        children: <OrderFeeRelation />,
                        icon: <OneToOneOutlined />,
                    },
                    {
                        label: '财务状态',
                        key: 'financial_state',
                        children: <FinancialState />,
                        icon: <VerifiedOutlined />,
                    },
                    {
                        label: '利润分配',
                        key: 'order_profit',
                        children: <OrderProft />,
                        icon: <GoldOutlined />,
                    },
                    {
                        label: '文档',
                        key: 'order_document',
                        children: <OrderDocument />,
                        icon: <FolderOutlined />,
                    },
                ]}
            />
        </Card>
        
    );
};

export default Detail;
