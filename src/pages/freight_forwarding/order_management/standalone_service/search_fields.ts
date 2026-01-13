
export const fields = [
    {
        name: 'serviceType',
        label: '服务类型',
        type: 'select',
        options: [
            { label: '全部', value: 'all' },
        ],
    },
    {
        name: 'status',
        label: '服务状态',
        type: 'select',
        options: [
            { label: '全部', value: 'all' },
        ],
    },
    {
        name: 'customer',
        label: '客户',
        type: 'input',
    },
    {
        name: 'location',
        label: '服务地点',
        type: 'input',
    },
    {
        name: 'dateRange',
        label: '日期范围',
        type: 'dateRange',
    },
];
