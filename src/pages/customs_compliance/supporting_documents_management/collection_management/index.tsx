import React, { useState, useEffect } from 'react';
import { Card, Descriptions, Progress, Table, Button, Space, message, Tooltip } from 'antd';
import CustomIcon from '@/components/custom-icon';
import LocaleHelper from '@/utils/locale';
import i18n from '@/i18n';
import { getCollectionDetail, CollectionDetail } from '@/api/customs_compliance/supporting_documents_management/collection_service';
import { useSearchParams, useNavigate } from 'react-router-dom';
import '@/pages/page_list.less';
import { getColumns } from './columns';

const CollectionManagement: React.FC = () => {
    const [searchParams] = useSearchParams();
    const id = searchParams.get('id');
    const readonly = searchParams.get('readonly') === 'true';
    const [data, setData] = useState<CollectionDetail | null>(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        // If id is not present, fetch a default one for display purposes in this context
        fetchData(id || '1');
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

    return (
        <div style={{ overflowY: 'auto', overflowX: 'hidden', height: 'calc(100vh - 80px)' }}>
             <div className='nc-bill-header-area'>
                <div className='header-title-search-area'>
                    <div className='BillHeadInfoWrap BillHeadInfoWrap-showBackBtn'>
                        <span className='bill-info-title' style={{ display: 'flex', alignItems: 'center' }}>
                            <CustomIcon type="icon-Currency" style={{ color: 'red', fontSize: '24px' }} />
                            <span style={{ marginLeft: 8 }}>{i18n.t(LocaleHelper.getCcsdmCollectionManagementPageTitle())}</span>
                            {data && <span style={{ marginLeft: 8, fontSize: '14px', color: '#666' }}> {'>'} {data.preEntryNo}</span>}
                            <Tooltip
                                title={
                                    <div className='rul_title_tooltip' style={{ backgroundColor: '#fff', color: '#000' }}>
                                        <ol style={{ color: '#666666', fontSize: '12px', paddingLeft: '2px' }}>
                                            <li style={{ marginBottom: '10px' }}>
                                                <span style={{ marginRight: '10px', backgroundColor: '#f1f1f1', padding: '2px 10px' }}>
                                                    <b>{i18n.t(LocaleHelper.getCcsdmCollectionManagementHelpLabel())}</b>
                                                </span>
                                                <ul style={{ listStyleType: 'circle', paddingLeft: '20px', marginTop: '10px', lineHeight: '1.8' }}>
                                                    <li><b>{i18n.t(LocaleHelper.getCcsdmCollectionManagementHelpRole())}</b>{i18n.t(LocaleHelper.getCcsdmCollectionManagementHelpRoleDesc())}</li>
                                                    <li><b>{i18n.t(LocaleHelper.getCcsdmCollectionManagementHelpOrigin())}</b>{i18n.t(LocaleHelper.getCcsdmCollectionManagementHelpOriginDesc())}</li>
                                                    <li><b>{i18n.t(LocaleHelper.getCcsdmCollectionManagementHelpFunc())}</b>{i18n.t(LocaleHelper.getCcsdmCollectionManagementHelpFuncDesc())}</li>
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
                <div className='header-button-area'>
                    <span className='button-app-wrapper'></span>
                    <div className='buttonGroup-component'>
                        <div className='u-button-group'>
                             <Space>
                                 {!readonly && (
                                     <>
                                        <Button onClick={() => message.info(i18n.t(LocaleHelper.getCcsdmCollectionManagementBtnBatchUpload()))}>{i18n.t(LocaleHelper.getCcsdmCollectionManagementBtnBatchUpload())}</Button>
                                        <Button type="primary" danger onClick={() => message.success(i18n.t(LocaleHelper.getCcsdmCollectionManagementActionRemind()) + ' Sent')}>
                                            {i18n.t(LocaleHelper.getCcsdmCollectionManagementBtnRemind())}
                                        </Button>
                                     </>
                                 )}
                                 <Button onClick={() => navigate(-1)}>{i18n.t(LocaleHelper.getBack())}</Button>
                             </Space>
                        </div>
                    </div>
                </div>
            </div>

            <div className='nc-bill-table-area'>
                <Card bordered={false} loading={loading}>
                    {data && (
                        <>
                            <Descriptions title={i18n.t(LocaleHelper.getCcsdmCollectionManagementSectionPreEntry())} bordered column={3}>
                                <Descriptions.Item label="预录入单号">{data.preEntryNo}</Descriptions.Item>
                                <Descriptions.Item label="业务类型">{data.businessType}</Descriptions.Item>
                                <Descriptions.Item label="收货人">{data.consignee}</Descriptions.Item>
                                <Descriptions.Item label="发货人">{data.consignor}</Descriptions.Item>
                                <Descriptions.Item label="商品">{data.goodsName}</Descriptions.Item>
                                <Descriptions.Item label="总价值">{data.totalValue}</Descriptions.Item>
                            </Descriptions>
                            <div style={{ marginTop: 24, marginBottom: 24 }}>
                                <h3>{i18n.t(LocaleHelper.getCcsdmCollectionManagementSectionProgress())}</h3>
                                <Progress percent={data.progress} />
                            </div>
                            <Table
                                columns={getColumns(readonly)}
                                dataSource={data.documents}
                                rowKey="id"
                                pagination={false}
                                size="small"
                                bordered
                                scroll={{ x: 'max-content' }}
                            />
                            <div style={{ marginTop: 24, padding: '16px', backgroundColor: '#fafafa', border: '1px dashed #d9d9d9', borderRadius: '2px' }}>
                                <h4 style={{ marginBottom: 12 }}>{i18n.t(LocaleHelper.getCcsdmCollectionManagementSectionInstructions())}:</h4>
                                <ul style={{ paddingLeft: 20, color: '#666' }}>
                                    <li style={{ marginBottom: 4 }}>• {i18n.t(LocaleHelper.getCcsdmCollectionManagementInstruction1())}</li>
                                    <li style={{ marginBottom: 4 }}>• {i18n.t(LocaleHelper.getCcsdmCollectionManagementInstruction2())}</li>
                                    <li>• {i18n.t(LocaleHelper.getCcsdmCollectionManagementInstruction3())}</li>
                                </ul>
                            </div>
                        </>
                    )}
                </Card>
            </div>
        </div>
    );
};

export default CollectionManagement;
