
import type { MenuProps } from 'antd';
// 操作从客户手中取回提单
export const blRetrieveItems: MenuProps['items'] = [
    {
        label: '提单取回',
        key: '1',
    },
    {
        label: '撤销取回',
        key: '2',
    },
];
// 财务接收操作取回的提单
export const blReviceItems: MenuProps['items'] = [
    {
        label: '提单接收',
        key: '1',
    },
    {
        label: '撤销接收',
        key: '2',
    },
];
// 财务审核通过后，操作认领提单
export const blClaimItems: MenuProps['items'] = [
    {
        label: '提单认领',
        key: '1',
    },
    {
        label: '撤销认领',
        key: '2',
    },
];
// 操作认领提单后，操作或者销售放单
export const blReleaseItems: MenuProps['items'] = [
    {
        label: '提单放单',
        key: '1',
    },
    {
        label: '撤销放单',
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
