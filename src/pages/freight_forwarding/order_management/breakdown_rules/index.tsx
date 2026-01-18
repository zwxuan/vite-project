import '@/pages/page_list.less';
import React from 'react';
import { Table, Button, Space } from 'antd';
import { useNavigate } from 'react-router-dom';
import { RedoOutlined } from '@ant-design/icons';
import CustomIcon from "@/components/custom-icon";
import LocaleHelper from '@/utils/locale';
import i18n from '@/i18n';

interface RuleItem {
    id: string;
    name: string;
    type: string;
    condition: string;
    lastModified: string;
}

const BreakdownRules: React.FC = () => {
    const navigate = useNavigate();

    // Mock Data
    const mockData: RuleItem[] = [
        { id: '1', name: 'Standard Sea Export', type: 'Sea Export', condition: 'General Cargo', lastModified: '2023-10-01' },
        { id: '2', name: 'US Line Special', type: 'Sea Export', condition: 'Dest=US', lastModified: '2023-10-05' },
    ];

    const handleEdit = () => {
        navigate('/order_management/breakdown_rules/detail');
    };

    const columns = [
        { title: i18n.t(LocaleHelper.getBreakdownRulesRuleName()), dataIndex: 'name', key: 'name' },
        { title: i18n.t(LocaleHelper.getBreakdownRulesApplicableType()), dataIndex: 'type', key: 'type' },
        { title: i18n.t(LocaleHelper.getBreakdownRulesApplicableCondition()), dataIndex: 'condition', key: 'condition' },
        { title: i18n.t(LocaleHelper.getBreakdownRulesLastModified()), dataIndex: 'lastModified', key: 'lastModified' },
        {
            title: i18n.t(LocaleHelper.getOrderListActions()),
            key: 'action',
            render: (_: any, record: RuleItem) => (
                <Space size="middle">
                    <a onClick={handleEdit}>{i18n.t(LocaleHelper.getOrderListEdit())}</a>
                    <a>{i18n.t(LocaleHelper.getBreakdownRulesTest())}</a>
                    <a>{i18n.t(LocaleHelper.getOrderListDelete())}</a>
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
                            {i18n.t(LocaleHelper.getBreakdownRulesTitle())}
                        </span>
                    </div>
                </div>
                <div className="header-button-area">
                    <div style={{ display: "flex" }}>
                        <div className="buttonGroup-component">
                            <div className="u-button-group">
                                <Button type="primary" danger onClick={handleEdit}>{i18n.t(LocaleHelper.getBreakdownRulesNewRule())}</Button>
                            </div>
                        </div>
                        <span className="u-button">
                            <RedoOutlined className='iconfont' />
                        </span>
                    </div>
                </div>
            </div>
            
            <div className='nc-bill-table-area'>
                <Table<RuleItem>
                    columns={columns}
                    dataSource={mockData}
                    rowKey="id"
                    pagination={false}
                    bordered
                    size="small"
                />
            </div>
        </div>
    );
};

export default BreakdownRules;
