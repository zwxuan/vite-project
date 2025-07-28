
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

export const reviewItems: MenuProps['items'] = [
    {
        label: '异常检查',
        key: '1',
    },
    {
        label: '提交在线审批',
        key: '2',
    },
    {
        label: '取消在线审批',
        key: '3',
    },
    {
        label: '查看审批日志',
        key: '4',
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
