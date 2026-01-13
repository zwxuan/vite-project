
export const fields = [
    {
        name: 'ruleName',
        label: '规则名称',
        type: 'input',
    },
    {
        name: 'applicableType',
        label: '适用类型',
        type: 'select',
        options: [
            { label: '海运出口', value: 'sea_export' },
            { label: '空运进口', value: 'air_import' },
            { label: '全部', value: 'all' },
        ],
    },
    {
        name: 'status',
        label: '状态',
        type: 'select',
        options: [
            { label: '启用', value: 'active' },
            { label: '停用', value: 'inactive' },
        ],
    },
];
