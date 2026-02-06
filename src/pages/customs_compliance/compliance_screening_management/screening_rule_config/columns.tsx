import React from 'react';
import { Tag, Space } from 'antd';
import LocaleHelper from '@/utils/locale';
import i18n from '@/i18n';

export const getColumns = (handleEdit: (record: any) => void, handleCopy: (record: any) => void) => [
  { 
    title: i18n.t(LocaleHelper.getScreeningRuleConfigColName()), 
    dataIndex: 'name', 
    key: 'name',
    width: 200,
    fixed: 'left' as const,
  },
  { 
    title: i18n.t(LocaleHelper.getScreeningRuleConfigColScope()), 
    dataIndex: 'scope', 
    key: 'scope',
    width: 200,
    render: (text: string, record: any) => (
      <Space direction="vertical" size="small">
        <span>{text}</span>
        <span style={{ fontSize: '12px', color: '#999' }}>
           {record.bizTypes?.join(', ') || '-'}
        </span>
      </Space>
    )
  },
  { 
    title: i18n.t(LocaleHelper.getScreeningRuleConfigColAlgorithm()), 
    dataIndex: 'algorithm', 
    key: 'algorithm',
    width: 150,
  },
  { 
    title: i18n.t(LocaleHelper.getScreeningRuleConfigColAccuracy()), 
    dataIndex: 'accuracy', 
    key: 'accuracy',
    width: 120,
  },
  { 
    title: i18n.t(LocaleHelper.getScreeningRuleConfigColLists()), 
    dataIndex: 'lists', 
    key: 'lists',
    width: 200,
    render: (lists: string[]) => (
        lists && lists.length > 0 ? (
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
                {lists.slice(0, 2).map(list => <Tag key={list} color="blue">{list}</Tag>)}
                {lists.length > 2 && <Tag>+{lists.length - 2}</Tag>}
            </div>
        ) : '-'
    )
  },
  { 
    title: i18n.t(LocaleHelper.getScreeningRuleConfigColStatus()), 
    dataIndex: 'status', 
    key: 'status', 
    width: 100,
    render: (text: string) => (
      <Tag color={text === '启用' || text === 'Active' ? 'green' : 'red'}>
        {text === '启用' ? i18n.t(LocaleHelper.getScreeningRuleConfigStatusActive()) : text}
      </Tag>
    ) 
  },
  { 
    title: i18n.t(LocaleHelper.getScreeningRuleConfigColLastModified()), 
    dataIndex: 'lastModified', 
    key: 'lastModified',
    width: 150,
  },
  {
    title: i18n.t(LocaleHelper.getScreeningRuleConfigColAction()),
    key: 'action',
    fixed: 'right' as const,
    width: 150,
    render: (_: any, record: any) => (
      <Space size="middle">
        <a onClick={() => handleEdit(record)}>{i18n.t(LocaleHelper.getScreeningRuleConfigBtnEdit())}</a>
        <a onClick={() => handleCopy(record)}>{i18n.t(LocaleHelper.getScreeningRuleConfigBtnCopy())}</a>
      </Space>
    ),
  },
];
