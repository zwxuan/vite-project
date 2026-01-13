
export const fields = [
    {
        name: 'submitDate',
        label: '提交日期',
        type: 'dateRange',
    },
    {
        name: 'customerLevel',
        label: '客户等级',
        type: 'select',
        options: [
            { label: 'VIP客户', value: 'vip' },
            { label: '普通客户', value: 'normal' },
        ],
    },
    {
        name: 'amount',
        label: '订单金额',
        type: 'input',
    },
    {
        name: 'sales',
        label: '业务员',
        type: 'select',
        options: [
            { label: '全部', value: 'all' },
        ],
    },
    {
        name: 'urgency',
        label: '紧急程度',
        type: 'select',
        options: [
            { label: '普通', value: 'normal' },
            { label: '紧急', value: 'urgent' },
        ],
    },
];
