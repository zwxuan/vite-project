import React from 'react';
import { Form, Input, InputNumber, Select, Popconfirm, Space, Tag } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { RuleItem } from '@/api/freight_forwarding/cost_management/allocation_service';
import i18n from '@/i18n';
import LocaleHelper from '@/utils/locale';

const { Option } = Select;

// Columns for the List Page (index.tsx)
export const getColumns = (navigate: (path: string) => void): ColumnsType<RuleItem> => [
    {
        title: i18n.t(LocaleHelper.getAllocationRulesColRuleId()),
        dataIndex: 'ruleId',
        key: 'ruleId',
        width: 100,
    },
    {
        title: i18n.t(LocaleHelper.getAllocationRulesColRuleName()),
        dataIndex: 'ruleName',
        key: 'ruleName',
        width: 200,
    },
    {
        title: i18n.t(LocaleHelper.getAllocationRulesColRuleType()),
        dataIndex: 'ruleType',
        key: 'ruleType',
        width: 120,
    },
    {
        title: i18n.t(LocaleHelper.getAllocationRulesColStatus()),
        dataIndex: 'status',
        key: 'status',
        render: (status) => {
            let color = 'default';
            let text = status;
            if (status === 'active') {
                color = 'success';
                text = i18n.t(LocaleHelper.getAllocationRulesStatusActive());
            } else if (status === 'pending') {
                color = 'processing';
                text = i18n.t(LocaleHelper.getAllocationRulesStatusPending());
            } else if (status === 'draft') {
                color = 'default';
                text = i18n.t(LocaleHelper.getAllocationRulesStatusDraft());
            } else if (status === 'disabled') {
                color = 'error';
                text = i18n.t(LocaleHelper.getAllocationRulesStatusDisabled());
            }
            return <Tag color={color}>{text}</Tag>;
        },
    },
    {
        title: i18n.t(LocaleHelper.getAllocationRulesColCreator()),
        dataIndex: 'creator',
        key: 'creator',
        width: 120,
    },
    {
        title: i18n.t(LocaleHelper.getAllocationRulesColCreateTime()),
        dataIndex: 'createTime',
        key: 'createTime',
        width: 150,
    },
    {
        title: i18n.t(LocaleHelper.getOperation()),
        key: 'action',
        fixed: 'right',
        width: 200,
        render: (_, record) => (
            <Space size="middle">
                <a onClick={() => navigate(`/cost_management/allocation_rules/detail?id=${record.id}`)}>{i18n.t(LocaleHelper.getAllocationRulesActionEdit())}</a>
                {record.status === 'pending' && <a>{i18n.t(LocaleHelper.getAllocationRulesActionApprove())}</a>}
                {record.status === 'disabled' && <a>{i18n.t(LocaleHelper.getAllocationRulesActionEnable())}</a>}
            </Space>
        ),
    },
];

// Columns for the Detail Page (detail.tsx)
export const getSalesColumns = (remove: (index: number | number[]) => void) => [
    {
        title: i18n.t(LocaleHelper.getAllocationRulesColCustomerType()),
        dataIndex: 'type',
        key: 'type',
        render: (_: any, field: any) => (
            <Input />
        ),
    },
    {
        title: i18n.t(LocaleHelper.getAllocationRulesColCommissionRate()),
        dataIndex: 'rate',
        key: 'rate',
        render: (_: any, field: any) => (
            <InputNumber
                style={{ width: '100%' }}
                formatter={value => `${value}%`}
                parser={value => value?.replace('%', '') as unknown as number}
            />
        ),
    },
    {
        title: i18n.t(LocaleHelper.getAllocationRulesColMinCommission()),
        dataIndex: 'min',
        key: 'min',
        render: (_: any, field: any) => (
            <InputNumber style={{ width: '100%' }} />
        ),
    },
    {
        title: i18n.t(LocaleHelper.getAllocationRulesColMaxCommission()),
        dataIndex: 'max',
        key: 'max',
        render: (_: any, field: any) => (
            <InputNumber style={{ width: '100%' }} />
        ),
    },
    {
        title: i18n.t(LocaleHelper.getAllocationRulesColStatus()),
        dataIndex: 'status',
        key: 'status',
        render: (_: any, field: any) => (
            <Select style={{ width: '100%' }}>
                <Option value="Active">Active</Option>
                <Option value="Inactive">Inactive</Option>
            </Select>
        ),
    },
    {
        title: i18n.t(LocaleHelper.getOperation()),
        key: 'action',
        width: 100,
        render: (_: any, field: any) => (
            <Popconfirm title="Sure to delete?" onConfirm={() => remove(field.name)}>
                <a style={{ color: 'red' }}>{i18n.t(LocaleHelper.getDelete())}</a>
            </Popconfirm>
        ),
    },
];

export const getOpsColumns = (remove: (index: number | number[]) => void) => [
    {
        title: i18n.t(LocaleHelper.getAllocationRulesColDeptName()),
        dataIndex: 'deptName',
        key: 'deptName',
        render: (_: any, field: any) => (
            <Input />
        ),
    },
    {
        title: i18n.t(LocaleHelper.getAllocationRulesColBaseWeight()),
        dataIndex: 'baseWeight',
        key: 'baseWeight',
        render: (_: any, field: any) => (
            <InputNumber style={{ width: '100%' }} />
        ),
    },
    {
        title: i18n.t(LocaleHelper.getAllocationRulesColAdjustCoeff()),
        dataIndex: 'adjustCoeff',
        key: 'adjustCoeff',
        render: (_: any, field: any) => (
            <InputNumber style={{ width: '100%' }} />
        ),
    },
    {
        title: i18n.t(LocaleHelper.getAllocationRulesColEffectiveWeight()),
        dataIndex: 'effectiveWeight',
        key: 'effectiveWeight',
        render: (_: any, field: any) => (
            <InputNumber style={{ width: '100%' }} disabled />
        ),
    },
    {
        title: i18n.t(LocaleHelper.getAllocationRulesColStatus()),
        dataIndex: 'status',
        key: 'status',
        render: (_: any, field: any) => (
            <Select style={{ width: '100%' }}>
                <Option value="Active">Active</Option>
                <Option value="Inactive">Inactive</Option>
            </Select>
        ),
    },
    {
        title: i18n.t(LocaleHelper.getOperation()),
        key: 'action',
        width: 100,
        render: (_: any, field: any) => (
            <Popconfirm title="Sure to delete?" onConfirm={() => remove(field.name)}>
                <a style={{ color: 'red' }}>{i18n.t(LocaleHelper.getDelete())}</a>
            </Popconfirm>
        ),
    },
];

export const getComplexityColumns = (remove: (index: number | number[]) => void) => [
    {
        title: i18n.t(LocaleHelper.getAllocationRulesColSlaRate()),
        dataIndex: 'slaRate',
        key: 'slaRate',
        render: (_: any, field: any) => (
            <Input />
        ),
    },
    {
        title: i18n.t(LocaleHelper.getAllocationRulesColAdjustCoeff()),
        dataIndex: 'adjustCoeff',
        key: 'adjustCoeff',
        render: (_: any, field: any) => (
            <InputNumber style={{ width: '100%' }} />
        ),
    },
    {
        title: i18n.t(LocaleHelper.getAllocationRulesColDescription()),
        dataIndex: 'description',
        key: 'description',
        render: (_: any, field: any) => (
            <Input />
        ),
    },
    {
        title: i18n.t(LocaleHelper.getOperation()),
        key: 'action',
        width: 100,
        render: (_: any, field: any) => (
            <Popconfirm title="Sure to delete?" onConfirm={() => remove(field.name)}>
                <a style={{ color: 'red' }}>{i18n.t(LocaleHelper.getDelete())}</a>
            </Popconfirm>
        ),
    },
];
