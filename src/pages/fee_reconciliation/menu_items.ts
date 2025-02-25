
import type { MenuProps } from 'antd';

export const statusItems: MenuProps['items'] = [
    {
        label: '拆分',
        key: '1',
    },
    {
        label: '开票',
        key: '2',
    },
    {
        label: '核销',
        key: '3',
    },
    {
        label: '付款申请',
        key: '4',
    },
    {
        label: '处理差额',
        key: '7',
    },
    {
        label: '红冲',
        key: '8',
    },
];

export const statusCheckItems: MenuProps['items'] = [
    {
        label: '手工对账',
        key: '5',
    },
    {
        label: '自动对账',
        key: '6',
    },
    {
        label: '对账历史',
        key: '9',
    },
];

export const importItems: MenuProps['items'] = [
    {
        label: '对账导入',
        key: '1',
    },
    {
        label: '下载对账模板',
        key: '2',
    },
    {
        label: '查看导入日志',
        key: '5',
    },
];

export const exportItems: MenuProps['items'] = [
    {
        label: 'Excel导出',
        key: '1',
    },
    {
        label: '查看导出日志',
        key: '2',
    },
]; 
