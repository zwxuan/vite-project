export const searchFields = [
    {
        label: '运输方式',
        name: 'transportMode',
        type: 'select',
        options: [
            { label: '海运', value: '海运' },
            { label: '空运', value: '空运' },
            { label: '陆运', value: '陆运' },
        ],
    },
    {
        label: '路线类型',
        name: 'routeType',
        type: 'select',
        options: [
            { label: '全部', value: '全部' },
            { label: '直达', value: '直达' },
            { label: '中转', value: '中转' },
        ],
    },
];
