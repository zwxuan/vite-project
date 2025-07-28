
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

export const statusDelItems: MenuProps['items'] = [
    {
        label: '作废',
        key: '1',
    },
    {
        label: '删除',
        key: '2',
    },
    {
        label: '强制删除',
        key: '3',
    },
];

export const importItems: MenuProps['items'] = [
    {
        label: '导入发票号',
        key: '11',
    },
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
        label: '发票导出',
        key: '3',
    },
    {
        label: '金税导出',
        key: '4',
    },
    {
        label: '导出Accpac发票',
        key: '5',
    },
    {
        label: 'Excel导出',
        key: '1',
    },
    {
        label: '查看导出日志',
        key: '2',
    },
]; 
