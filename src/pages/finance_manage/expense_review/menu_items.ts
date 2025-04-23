
import type { MenuProps } from 'antd';

export const statusItems: MenuProps['items'] = [
    {
        label: '批量审批',
        key: '1',
    },
    {
        label: '批量取消审批',
        key: '2',
    },
];

export const appropriateItems: MenuProps['items'] = [
    {
        label: '计提',
        key: '1',
    },
    {
        label: '取消计提',
        key: '2',
    },
];

export const printItems: MenuProps['items'] = [
    {
        label: '按业务编号打印',
        key: '2',
    },
];

export const archiveItems: MenuProps['items'] = [
    {
        label: '归档',
        key: '1',
    },
    {
        label: '取消归档',
        key: '2',
    },
];

export const editBusinessItems: MenuProps['items'] = [
    {
        label: '修改业务日期',
        key: '1',
    },
    {
        label: '修改汇率',
        key: '2',
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
