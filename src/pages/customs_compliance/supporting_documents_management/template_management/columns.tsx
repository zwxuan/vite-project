import React from 'react';
import { Space, Tag, Popconfirm } from 'antd';
import { TemplateItem } from '@/types/customs_compliance/supporting_documents_management/template';
import LocaleHelper from '@/utils/locale';
import i18n from '@/i18n';

export const getColumns = (
  onEdit: (record: TemplateItem) => void,
  onCopy: (record: TemplateItem) => void,
  onDelete: (record: TemplateItem) => void
) => [
  {
    title: i18n.t(LocaleHelper.getCcsdmTemplateManagementTableTemplateName()),
    dataIndex: 'templateName',
    key: 'templateName',
    width: 200,
  },
  {
    title: i18n.t(LocaleHelper.getCcsdmTemplateManagementTableDescription()),
    dataIndex: 'description',
    key: 'description',
    width: 250,
    ellipsis: true,
  },
  {
    title: i18n.t(LocaleHelper.getCcsdmTemplateManagementTableBusinessType()),
    dataIndex: 'businessType',
    key: 'businessType',
    width: 100,
    render: (text: string) => text === 'import' ? '进口' : '出口',
  },
  {
    title: i18n.t(LocaleHelper.getCcsdmTemplateManagementTableTradeMode()),
    dataIndex: 'tradeMode',
    key: 'tradeMode',
    width: 120,
    render: (text: string) => {
        const map: any = {
            'general': '一般贸易',
            'processing': '加工贸易',
            'temporary': '暂时进出口',
            'e_commerce': '跨境电商'
        };
        return map[text] || text;
    }
  },
  {
      title: i18n.t(LocaleHelper.getCcsdmTemplateManagementTableDocCount()),
      dataIndex: 'docCount',
      key: 'docCount',
      width: 100,
      align: 'center',
  },
  {
    title: i18n.t(LocaleHelper.getCcsdmTemplateManagementTableStatus()),
    dataIndex: 'status',
    key: 'status',
    width: 100,
    render: (status: string) => (
      <Tag color={status === 'active' ? 'success' : 'default'}>
        {status === 'active' ? '启用' : '禁用'}
      </Tag>
    ),
  },
  {
      title: i18n.t(LocaleHelper.getCcsdmTemplateManagementTableUpdateUser()),
      dataIndex: 'updateUser',
      key: 'updateUser',
      width: 100,
  },
  {
      title: i18n.t(LocaleHelper.getCcsdmTemplateManagementTableUpdateTime()),
      dataIndex: 'updateTime',
      key: 'updateTime',
      width: 160,
  },
  {
    title: i18n.t(LocaleHelper.getCcsdmTemplateManagementTableAction()),
    key: 'action',
    width: 150,
    fixed: 'right',
    render: (_: any, record: TemplateItem) => (
      <Space size="middle">
        <a onClick={() => onEdit(record)}>{i18n.t(LocaleHelper.getCcsdmTemplateManagementBtnEdit())}</a>
        <a onClick={() => onCopy(record)}>{i18n.t(LocaleHelper.getCcsdmTemplateManagementBtnCopy())}</a>
        <Popconfirm title="确定删除?" onConfirm={() => onDelete(record)}>
            <a style={{ color: 'red' }}>{i18n.t(LocaleHelper.getCcsdmTemplateManagementBtnDelete())}</a>
        </Popconfirm>
      </Space>
    ),
  },
];
