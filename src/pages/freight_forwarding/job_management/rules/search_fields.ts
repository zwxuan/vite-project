export const fields = [
    {
        name: 'ruleName',
        label: '规则名称',
        type: 'input',
    },
    {
        name: 'jobType',
        label: '适用作业',
        type: 'select',
        options: [
            { label: '订舱作业', value: 'BOOKING_JOB' },
            { label: '关务作业', value: 'CUSTOMS_JOB' },
        ]
    },
    {
        name: 'status',
        label: '状态',
        type: 'select',
        options: [
            { label: '启用', value: 'ACTIVE' },
            { label: '停用', value: 'INACTIVE' },
        ]
    }
];
