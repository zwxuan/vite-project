
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
        label: '取消对账',
        key: '6',
    },
];

export const importItems: MenuProps['items'] = [
    {
        label: '新增导入',
        key: '1',
    },
    {
        label: '下载新增模板',
        key: '2',
    },
    {
        label: '更新导入',
        key: '3',
    },
    {
        label: '下载更新模板',
        key: '4',
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
