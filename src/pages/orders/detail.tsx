
import React from 'react';
import { Tabs, Card } from 'antd';
import { AppleOutlined, AndroidOutlined, HighlightOutlined, UserOutlined, AccountBookOutlined, WindowsOutlined, GithubOutlined, SplitCellsOutlined, OneToOneOutlined, VerifiedOutlined, GoldOutlined, FolderOutlined } from '@ant-design/icons';
import CustomIcon from "@/components/custom-icon";
import { useLocation } from 'react-router-dom';
import BaseBusiness from './details/base_business.tsx';
import Fee from './details/order_fee';
import FeeCAP from './details/order_fee_cap/index_cap.tsx';
import OrderBill from './details/order_bill/index.tsx';
import OrderBillForeign from './details/order_bill/index_foreign.tsx';
import FeeQuickInput from './details/fee_quick_input.tsx';
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
                        key: '1',
                        children: <BaseBusiness />,
                        icon: <UserOutlined />,
                    },
                    {
                        label: '费用快速录入',
                        key: '22',
                        children: <FeeQuickInput />,
                        icon: <HighlightOutlined />,
                    },
                    {
                        label: '费用相关',
                        key: '2',
                        children: <Fee />,
                        icon: <AccountBookOutlined />,
                    },
                    {
                        label: '国内账单',
                        key: '3',
                        children: <OrderBill />,
                        icon: <WindowsOutlined />,
                    },
                    {
                        label: '国外账单',
                        key: '4',
                        children: <OrderBillForeign />,
                        icon: <GithubOutlined />,
                    },
                    {
                        label: '代收垫付',
                        key: '24',
                        children: <FeeCAP />,
                        icon: <SplitCellsOutlined />,
                    },
                    {
                        label: '关联交易',
                        key: '242',
                        children: 'Tab ${businessId}',
                        icon: <OneToOneOutlined />,
                    },
                    {
                        label: '财务状态',
                        key: '5',
                        children: `Tab ${businessId}`,
                        icon: <VerifiedOutlined />,
                    },
                    {
                        label: '利润分配',
                        key: '7',
                        children: `Tab ${businessId}`,
                        icon: <GoldOutlined />,
                    },
                    {
                        label: '文档',
                        key: '6',
                        children: `Tab ${businessId}`,
                        icon: <FolderOutlined />,
                    },
                ]}
            />
        </Card>
        
    );
};

export default Detail;
