
import React from 'react';
import { Tabs, Card } from 'antd';
import { AppleOutlined, AndroidOutlined } from '@ant-design/icons';
import { useLocation } from 'react-router-dom';
import BaseBusiness from './details/base_business.tsx';
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
                        icon: <AppleOutlined />,
                    },
                    {
                        label: '费用',
                        key: '2',
                        children: `Tab ${businessId}`,
                        icon: <AppleOutlined />,
                    },
                    {
                        label: '国内账单',
                        key: '3',
                        children: `Tab ${businessId}`,
                        icon: <AndroidOutlined />,
                    },
                    {
                        label: '国外账单',
                        key: '4',
                        children: `Tab ${businessId}`,
                        icon: <AndroidOutlined />,
                    },
                    {
                        label: '业务状态',
                        key: '5',
                        children: `Tab ${businessId}`,
                        icon: <AndroidOutlined />,
                    },
                    {
                        label: '文档',
                        key: '6',
                        children: `Tab ${businessId}`,
                        icon: <AndroidOutlined />,
                    },
                ]}
            />
        </Card>

    );
};

export default Detail;
