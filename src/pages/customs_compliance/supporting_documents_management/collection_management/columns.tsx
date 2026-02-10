import React from 'react';
import { Tag, Space, Upload, message } from 'antd';
import { DocumentItem } from '@/api/customs_compliance/supporting_documents_management/collection_service';
import LocaleHelper from '@/utils/locale';
import i18n from '@/i18n';

export const getColumns = (readonly: boolean = false) => [
    {
        title: i18n.t(LocaleHelper.getCcsdmCollectionManagementTableDocType()),
        dataIndex: 'type',
        key: 'type',
        render: (text: string) => {
            const map: any = { invoice: '商业发票', packing: '装箱单', contract: '合同', bl: '提单', license: '进口许可证', ciq: '入境货物通关单', inspection: '进口商品检验', '3c': '3C认证证书' };
            return map[text] || text;
        }
    },
    {
        title: i18n.t(LocaleHelper.getCcsdmCollectionManagementTableStatus()),
        dataIndex: 'status',
        key: 'status',
        render: (status: string) => {
            return status === 'collected' ? 
                <Tag color="success">{i18n.t(LocaleHelper.getCcsdmCollectionManagementStatusCollected())}</Tag> : 
                <Tag color="warning">{i18n.t(LocaleHelper.getCcsdmCollectionManagementStatusPending())}</Tag>;
        }
    },
    {
        title: i18n.t(LocaleHelper.getCcsdmCollectionManagementTableFileName()),
        dataIndex: 'fileName',
        key: 'fileName',
        render: (text: string) => text || '-'
    },
    {
        title: i18n.t(LocaleHelper.getCcsdmCollectionManagementTableUploadTime()),
        dataIndex: 'uploadTime',
        key: 'uploadTime',
        render: (text: string) => text || '-'
    },
    {
        title: i18n.t(LocaleHelper.getCcsdmCollectionManagementTableAction()),
        key: 'action',
        render: (_: any, record: DocumentItem) => {
            if (readonly) {
                return record.status === 'collected' ? (
                     <a>{i18n.t(LocaleHelper.getCcsdmCollectionManagementActionView())}</a>
                ) : '-';
            }
            return (
            <Space>
                {record.status === 'collected' ? (
                    <>
                        <a>{i18n.t(LocaleHelper.getCcsdmCollectionManagementActionView())}</a>
                        <Upload showUploadList={false}>
                            <a style={{ marginLeft: 8 }}>{i18n.t(LocaleHelper.getCcsdmCollectionManagementActionReplace())}</a>
                        </Upload>
                    </>
                ) : (
                    <>
                        <Upload showUploadList={false}>
                            <a>{i18n.t(LocaleHelper.getCcsdmCollectionManagementActionUpload())}</a>
                        </Upload>
                        <a style={{ marginLeft: 8 }} onClick={() => message.success('催办通知已发送')}>
                            {i18n.t(LocaleHelper.getCcsdmCollectionManagementActionRemind())}
                        </a>
                    </>
                )}
            </Space>
            );
        }
    }
];
