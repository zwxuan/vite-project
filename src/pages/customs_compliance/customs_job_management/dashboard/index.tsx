import '@/pages/page_list.less';
import React, { useState, useEffect } from 'react';
import { Spin, Tooltip } from 'antd';
import { getDashboardData } from '@/api/customs_compliance/customs_job_management/dashboard_service';
import i18n from '@/i18n';
import LocaleHelper from '@/utils/locale';
import CustomIcon from "@/components/custom-icon";
import KanbanColumn from './KanbanColumn';

const Dashboard: React.FC = () => {
    const [data, setData] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetch = async () => {
            try {
                const res = await getDashboardData();
                if (res.success) setData(res.data);
            } finally {
                setLoading(false);
            }
        };
        fetch();
    }, []);

    if (loading) return <div style={{ padding: 24, display: 'flex', justifyContent: 'center' }}><Spin size="large" /></div>;
    if (!data) return <div style={{ padding: 24 }}>No data available</div>;

    const columns = [
        { key: 'pending', color: '#faad14' },   // Orange
        { key: 'assigned', color: '#1890ff' },  // Blue
        { key: 'processing', color: '#52c41a' }, // Green
        { key: 'auditing', color: '#722ed1' },  // Purple
        { key: 'completed', color: '#595959' }, // Grey
        { key: 'archived', color: '#bfbfbf' }   // Light Grey
    ];

    return (
        <div style={{ overflowY: 'hidden', overflowX: 'hidden', height: 'calc(100vh - 80px)', display: 'flex', flexDirection: 'column' }}>
            <div className="nc-bill-header-area">
                <div className="header-title-search-area">
                    <div className="BillHeadInfoWrap BillHeadInfoWrap-showBackBtn">
                        <span className="bill-info-title" style={{ marginLeft: "10px" }}>
                            <CustomIcon type="icon-Currency" style={{ color: 'red', fontSize: '24px' }} />
                            {i18n.t(LocaleHelper.getDashboardPageTitle())}
                            <Tooltip
                                title={
                                    <div className='rul_title_tooltip' style={{ backgroundColor: '#fff', color: '#000' }}>
                                        <ol style={{ color: '#666666', fontSize: '12px', paddingLeft: '2px' }}>
                                            <li style={{ marginBottom: '10px' }}>
                                                <span style={{ marginRight: '10px', backgroundColor: '#f1f1f1', padding: '2px 10px' }}>
                                                    <b>{i18n.t(LocaleHelper.getDashboardHelpLabel())}</b>
                                                </span>
                                                <ul style={{ listStyleType: 'circle', paddingLeft: '20px', marginTop: '10px', lineHeight: '1.8' }}>
                                                    <li><b>{i18n.t(LocaleHelper.getDashboardHelpRole())}</b>{i18n.t(LocaleHelper.getDashboardHelpRoleDesc())}</li>
                                                    <li><b>{i18n.t(LocaleHelper.getDashboardHelpOrigin())}</b>{i18n.t(LocaleHelper.getDashboardHelpOriginDesc())}</li>
                                                    <li><b>{i18n.t(LocaleHelper.getDashboardHelpFunctionality())}</b>{i18n.t(LocaleHelper.getDashboardHelpFunctionalityDesc())}</li>
                                                </ul>
                                            </li>
                                        </ol>
                                    </div>
                                }
                                color='white'
                            >
                                <i className='iconfont icon-bangzhutishi' style={{ cursor: 'pointer', marginLeft: '10px' }}></i>
                            </Tooltip>
                        </span>
                    </div>
                </div>
                <div className="header-button-area">
                    <span className="button-app-wrapper header-button-area-button-app-wrapper"></span>
                    <div style={{ display: "flex", alignItems: 'center', marginRight: '20px' }}>
                        <span style={{ color: '#666', marginRight: '16px', fontSize: '14px' }}>
                             {i18n.t(LocaleHelper.getDashboardTotalJobs())}: <span style={{ color: '#1890ff', fontWeight: 'bold' }}>{data.total}</span>
                        </span>
                    </div>
                </div>
            </div>
            
            <div style={{ 
                flex: 1, 
                display: 'flex', 
                gap: '16px', 
                overflowX: 'auto', 
                padding: '16px 24px',
                backgroundColor: '#fff'
            }}>
                {columns.map(col => {
                    const colData = data.columns[col.key];
                    if (!colData) return null;
                    return (
                        <KanbanColumn 
                            key={col.key}
                            title={colData.title}
                            count={colData.count}
                            items={colData.items}
                            color={col.color}
                        />
                    );
                })}
            </div>
        </div>
    );
};

export default Dashboard;
