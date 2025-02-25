
import type { MenuProps } from 'antd';

export const statusItems: MenuProps['items'] = [
    {
        label: '启用',
        key: '1',
    },
    {
        label: '停用',
        key: '2',
    },
];

export const printItems: MenuProps['items'] = [
    {
        label: '按账单号打印',
        key: '1',
    },
    {
        label: '按业务单号打印',
        key: '2',
    },
];
export const billStatusItems: MenuProps['items'] = [
    {
        label: '确认',
        key: '1',
    },
    {
        label: '取消确认',
        key: '2',
    },
    {
        label: '复核',
        key: '3',
    },
    {
        label: '取消复核',
        key: '4',
    },
    {
        label: '标记',
        key: '5',
    },
    {
        label: '取消标记',
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
