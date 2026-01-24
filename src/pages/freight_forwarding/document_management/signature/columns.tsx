import React from 'react';
import { Tag, Space, Popconfirm } from 'antd';
import i18n from '@/i18n';
import LocaleHelper from '@/utils/locale';
import { ColumnType } from 'antd/es/table';

export interface SignatureItem {
    id: string;
    name: string;
    type: 'Company' | 'Personal';
    status: 'Active' | 'Inactive';
    authorizedUsers: string[];
    updatedAt: string;
}

export const getColumns = (
    onEdit: (id: string) => void,
    onDelete: (id: string) => void
): ColumnType<SignatureItem>[] => [
    { title: i18n.t(LocaleHelper.getDocumentSignatureName()), dataIndex: 'name', key: 'name' },
    { 
        title: i18n.t(LocaleHelper.getDocumentSignatureType()), 
        dataIndex: 'type', 
        key: 'type',
        render: (type: string) => type === 'Company' ? i18n.t(LocaleHelper.getDocumentSignatureTypeCompany()) : i18n.t(LocaleHelper.getDocumentSignatureTypePersonal())
    },
    { 
        title: i18n.t(LocaleHelper.getDocumentSignatureAuthorizedUser()), 
        dataIndex: 'authorizedUsers', 
        key: 'authorizedUsers',
        render: (users: string[]) => users.join(', ')
    },
    { 
        title: i18n.t(LocaleHelper.getDocumentSignatureStatus()), 
        dataIndex: 'status', 
        key: 'status', 
        render: (s: string) => <Tag color={s === 'Active' ? 'green' : 'red'}>{s === 'Active' ? i18n.t(LocaleHelper.getDocumentTemplateStatusActive()) : i18n.t(LocaleHelper.getDocumentTemplateStatusInactive())}</Tag> 
    },
    { title: i18n.t(LocaleHelper.getUpdate()), dataIndex: 'updatedAt', key: 'updatedAt' },
    { 
        title: i18n.t(LocaleHelper.getDocumentSignatureAction()), 
        key: 'action',
        render: (_: any, record: SignatureItem) => (
            <Space>
                <a onClick={() => onEdit(record.id)}>{i18n.t(LocaleHelper.getDocumentSignatureEdit())}</a>
                <Popconfirm title={i18n.t(LocaleHelper.getDocumentSignatureDelete())} onConfirm={() => onDelete(record.id)}>
                    <a style={{ color: 'red' }}>{i18n.t(LocaleHelper.getDocumentSignatureDelete())}</a>
                </Popconfirm>
            </Space>
        )
    }
];
