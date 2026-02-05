import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, Descriptions, Button, Tag, Spin, message } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import i18n from '@/i18n';
import LocaleHelper from '@/utils/locale';
import { getCustomsJobDetail, CustomsJob } from '@/api/customs_compliance/customs_job_management/job_center_service';
import CustomIcon from "@/components/custom-icon";
import '@/pages/page_list.less';

const JobDetail: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState<CustomsJob | null>(null);

    useEffect(() => {
        if (id) {
            fetchData(id);
        }
    }, [id]);

    const fetchData = async (jobId: string) => {
        setLoading(true);
        try {
            const res = await getCustomsJobDetail(jobId);
            if (res.success && res.data) {
                setData(res.data);
            } else {
                message.error(res.message || 'Failed to load data');
            }
        } catch (error) {
            console.error(error);
            message.error('An error occurred while fetching data');
        } finally {
            setLoading(false);
        }
    };

    const handleBack = () => {
        navigate(-1);
    };

    if (loading) {
        return <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}><Spin /></div>;
    }

    if (!data) {
        return <div style={{ padding: 24 }}>{i18n.t(LocaleHelper.getLoading())}</div>;
    }

    return (
        <div style={{ overflowY: 'auto', overflowX: 'hidden', height: 'calc(100vh - 80px)' }}>
             <div className="nc-bill-header-area">
                <div className="header-title-search-area">
                    <div className="BillHeadInfoWrap BillHeadInfoWrap-showBackBtn">
                         <span className="bill-info-title" style={{ marginLeft: "10px" }}>
                            <CustomIcon type="icon-Currency" style={{ color: 'red', fontSize: '24px', marginRight: '8px' }} />
                            {i18n.t(LocaleHelper.getJobCenterPageTitle())} - {i18n.t(LocaleHelper.getJobCenterView())}
                        </span>
                    </div>
                </div>
                <div className="header-button-area">
                    <span className="button-app-wrapper header-button-area-button-app-wrapper"></span>
                    <div style={{ display: "flex" }}>
                         <div className="buttonGroup-component">
                            <div className="u-button-group">
                                <Button onClick={handleBack}>{i18n.t(LocaleHelper.getBack())}</Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div style={{ padding: '24px' }}>
                <Card title="基本信息" bordered={false}>
                    <Descriptions bordered column={2}>
                        <Descriptions.Item label={i18n.t(LocaleHelper.getJobCenterJobId())}>{data.job_id}</Descriptions.Item>
                        <Descriptions.Item label={i18n.t(LocaleHelper.getJobCenterUpstreamOrderNo())}>{data.upstream_order_no}</Descriptions.Item>
                        <Descriptions.Item label={i18n.t(LocaleHelper.getJobCenterDeclarationNo())}>{data.declaration_no}</Descriptions.Item>
                        <Descriptions.Item label={i18n.t(LocaleHelper.getJobCenterBusinessType())}>{data.business_type}</Descriptions.Item>
                        <Descriptions.Item label={i18n.t(LocaleHelper.getJobCenterTransportMode())}>{data.transport_mode}</Descriptions.Item>
                        <Descriptions.Item label={i18n.t(LocaleHelper.getJobCenterCustomerName())}>{data.customer_name}</Descriptions.Item>
                        <Descriptions.Item label={i18n.t(LocaleHelper.getJobCenterStatus())}>
                             <Tag color={data.status === 'completed' ? 'success' : 'processing'}>{data.status}</Tag>
                        </Descriptions.Item>
                        <Descriptions.Item label={i18n.t(LocaleHelper.getJobCenterSlaStatus())}>
                            <Tag color={data.sla_status === 'warning' ? 'warning' : 'success'}>{data.sla_status}</Tag>
                        </Descriptions.Item>
                        <Descriptions.Item label={i18n.t(LocaleHelper.getJobCenterAssignedTo())}>{data.assigned_to_name}</Descriptions.Item>
                        <Descriptions.Item label={i18n.t(LocaleHelper.getJobCenterCreateTime())}>{data.created_at}</Descriptions.Item>
                    </Descriptions>
                </Card>
            </div>
        </div>
    );
};

export default JobDetail;
