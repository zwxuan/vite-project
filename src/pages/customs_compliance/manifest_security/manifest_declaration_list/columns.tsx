import React from 'react';
import { Tag, Space, Popconfirm } from 'antd';
import { ColumnsType } from 'antd/es/table';
import i18n from '@/i18n';
import LocaleHelper from '@/utils/locale';

export const getColumns = (onAction: (key: string, record: any) => void): ColumnsType<any> => [
  {
    title: i18n.t(LocaleHelper.getManifestDeclarationListColumnsDeclarationNo()),
    dataIndex: 'declaration_no',
    key: 'declaration_no',
    width: 150,
  },
  {
    title: i18n.t(LocaleHelper.getManifestDeclarationListColumnsSourceType()),
    dataIndex: 'source_type',
    key: 'source_type',
    width: 100,
    render: (val: string) => val === 'booking' ? '订舱' : (val === 'bill_of_lading' ? '提单' : '手工'),
  },
  {
    title: i18n.t(LocaleHelper.getManifestDeclarationListColumnsSourceNo()),
    dataIndex: 'source_no',
    key: 'source_no',
    width: 150,
  },
  {
    title: i18n.t(LocaleHelper.getManifestDeclarationListColumnsBlNumber()),
    dataIndex: 'bl_number',
    key: 'bl_number',
    width: 150,
  },
  {
    title: i18n.t(LocaleHelper.getManifestDeclarationListColumnsVesselVoyage()),
    key: 'vessel_voyage',
    width: 200,
    render: (_, record) => `${record.vessel_name} / ${record.voyage_number}`,
  },
  {
    title: i18n.t(LocaleHelper.getManifestDeclarationListColumnsDeclarationType()),
    dataIndex: 'declaration_type',
    key: 'declaration_type',
    width: 120,
  },
  {
    title: i18n.t(LocaleHelper.getManifestDeclarationListColumnsContainerCount()),
    dataIndex: 'container_count',
    key: 'container_count',
    width: 100,
    align: 'right',
  },
  {
    title: i18n.t(LocaleHelper.getManifestDeclarationListColumnsGrossWeight()),
    dataIndex: 'gross_weight',
    key: 'gross_weight',
    width: 100,
    align: 'right',
    render: (val) => val ? `${val} kg` : '-',
  },
  {
    title: i18n.t(LocaleHelper.getManifestDeclarationListColumnsDestinationPort()),
    dataIndex: 'destination_port',
    key: 'destination_port',
    width: 120,
  },
  {
    title: i18n.t(LocaleHelper.getManifestDeclarationListColumnsStatus()),
    dataIndex: 'status',
    key: 'status',
    width: 100,
    render: (status) => {
        let color = 'default';
        if (status === '已接受' || status === 'accepted') color = 'success';
        if (status === '处理中' || status === 'processing') color = 'processing';
        if (status === '被拒绝' || status === 'rejected') color = 'error';
        if (status === '待申报' || status === 'pending') color = 'warning';
        return <Tag color={color}>{status}</Tag>;
    }
  },
  {
    title: i18n.t(LocaleHelper.getManifestDeclarationListColumnsDeclarationTime()),
    dataIndex: 'declaration_time',
    key: 'declaration_time',
    width: 160,
  },
  {
    title: i18n.t(LocaleHelper.getManifestDeclarationListColumnsOperation()),
    key: 'operation',
    width: 200,
    fixed: 'right',
    render: (_, record) => (
      <Space size="middle">
        <a onClick={() => onAction('view', record)}>{i18n.t(LocaleHelper.getViewDetail()) || '详情'}</a>
        {(record.status === '待申报' || record.status === '草稿') && (
            <Popconfirm title="确认申报?" onConfirm={() => onAction('submit', record)}>
                <a>申报</a>
            </Popconfirm>
        )}
        <a onClick={() => onAction('edit', record)}>{i18n.t(LocaleHelper.getEdit()) || '更正'}</a>
        <a onClick={() => onAction('query', record)}>{i18n.t(LocaleHelper.getStatus()) || '状态'}</a>
        <Popconfirm title="确认删除?" onConfirm={() => onAction('delete', record)}>
            <a style={{ color: 'red' }}>{i18n.t(LocaleHelper.getDelete()) || '删除'}</a>
        </Popconfirm>
      </Space>
    ),
  },
];
