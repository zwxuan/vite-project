import React, { useState, useEffect } from 'react';
import { Card, Descriptions, Progress, Table, Button, Space, message, Upload, Tag } from 'antd';
import CustomIcon from '@/components/custom-icon';
import LocaleHelper from '@/utils/locale';
import i18n from '@/i18n';
import { getCollectionDetail, CollectionDetail, DocumentItem } from '@/api/customs_compliance/supporting_documents_management/collection_service';
import { useSearchParams, useNavigate } from 'react-router-dom';
import '@/pages/page_list.less';

const CollectionManagement: React.FC = () => {
    const [searchParams] = useSearchParams();
    const id = searchParams.get('id');
    const [data, setData] = useState<CollectionDetail | null>(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (id) {
            fetchData(id);
        }
    }, [id]);

    const fetchData = async (id: string) => {
        setLoading(true);
        try {
            const res = await getCollectionDetail(id);
            if (res.success) {
                setData(res.data);
            }
        } catch (error) {
            message.error('Failed to fetch detail');
        } finally {
            setLoading(false);
        }
    };

    const columns = [
        {
            title: i18n.t(LocaleHelper.getCustomsComplianceSupportingDocumentsManagementCollectionManagementTableDocType()),
            dataIndex: 'type',
            key: 'type',
            render: (text: string) => {
                const map: any = { invoice: '商业发票', packing: '装箱单', contract: '合同', bl: '提单', license: '进口许可证', ciq: '入境货物通关单', inspection: '进口商品检验', '3c': '3C认证证书' };
                return map[text] || text;
            }
        },
        {
            title: i18n.t(LocaleHelper.getCustomsComplianceSupportingDocumentsManagementCollectionManagementTableStatus()),
            dataIndex: 'status',
            key: 'status',
            render: (status: string) => {
                return status === 'collected' ? <Tag color="success">已收集</Tag> : <Tag color="warning">待收集</Tag>;
            }
        },
        {
            title: i18n.t(LocaleHelper.getCustomsComplianceSupportingDocumentsManagementCollectionManagementTableFileName()),
            dataIndex: 'fileName',
            key: 'fileName',
        },
        {
            title: i18n.t(LocaleHelper.getCustomsComplianceSupportingDocumentsManagementCollectionManagementTableUploadTime()),
            dataIndex: 'uploadTime',
            key: 'uploadTime',
        },
        {
            title: i18n.t(LocaleHelper.getCustomsComplianceSupportingDocumentsManagementCollectionManagementTableAction()),
            key: 'action',
            render: (_: any, record: DocumentItem) => (
                <Space>
                    {record.status === 'collected' ? (
                        <>
                            <a>查看</a>
                            <Upload showUploadList={false}><a style={{ marginLeft: 8 }}>替换</a></Upload>
                        </>
                    ) : (
                        <>
                            <Upload showUploadList={false}><a>上传</a></Upload>
                            <a style={{ marginLeft: 8 }} onClick={() => message.success('催办通知已发送')}>催办</a>
                        </>
                    )}
                </Space>
            )
        }
    ];

    return (
        <div style={{ overflowY: 'auto', overflowX: 'hidden', height: 'calc(100vh - 80px)', padding: '24px' }}>
            <Card title={
                <span>
                    <CustomIcon type="icon-Currency" style={{ color: 'red', fontSize: '24px', marginRight: '8px' }} />
                    {i18n.t(LocaleHelper.getCustomsComplianceSupportingDocumentsManagementCollectionManagementPageTitle())}
                </span>
            } extra={
                <Space>
                    <Button onClick={() => message.info('Batch Upload')}>{i18n.t(LocaleHelper.getCustomsComplianceSupportingDocumentsManagementCollectionManagementBtnBatchUpload())}</Button>
                    <Button type="primary" danger onClick={() => message.success('Reminders Sent')}>
                        {i18n.t(LocaleHelper.getCustomsComplianceSupportingDocumentsManagementCollectionManagementBtnRemind())}
                    </Button>
                    <Button onClick={() => navigate(-1)}>Back</Button>
                </Space>
            } loading={loading}>
                {data && (
                    <>
                        <Descriptions title={i18n.t(LocaleHelper.getCustomsComplianceSupportingDocumentsManagementCollectionManagementSectionPreEntry())} bordered>
                            <Descriptions.Item label="预录入单号">{data.preEntryNo}</Descriptions.Item>
                            <Descriptions.Item label="业务类型">{data.businessType}</Descriptions.Item>
                            <Descriptions.Item label="收货人">{data.consignee}</Descriptions.Item>
                            <Descriptions.Item label="发货人">{data.consignor}</Descriptions.Item>
                            <Descriptions.Item label="商品">{data.goodsName}</Descriptions.Item>
                            <Descriptions.Item label="总价值">{data.totalValue}</Descriptions.Item>
                        </Descriptions>
                        <div style={{ marginTop: 24, marginBottom: 24 }}>
                            <h3>{i18n.t(LocaleHelper.getCustomsComplianceSupportingDocumentsManagementCollectionManagementSectionProgress())}</h3>
                            <Progress percent={data.progress} />
                        </div>
                        <Table
                            columns={columns}
                            dataSource={data.documents}
                            rowKey="id"
                            pagination={false}
                            size="small"
                            bordered
                        />
                    </>
                )}
            </Card>
        </div>
    );
};

export default CollectionManagement;
