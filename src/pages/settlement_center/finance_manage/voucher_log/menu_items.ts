
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

export const sendVoucherItems: MenuProps['items'] = [
    {
        label: '发送用友',
        key: '1',
    },
    {
        label: '发送金蝶',
        key: '2',
    },
    {
        label: '发送SAP',
        key: '3',
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
