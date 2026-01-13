
export const fields = [
    {
        name: 'orderNo',
        label: '订单号',
        type: 'input',
    },
    {
        name: 'customerName',
        label: '客户名称',
        type: 'input',
    },
    {
        name: 'sales',
        label: '业务员',
        type: 'input',
    },
    {
        name: 'orderType',
        label: '订单类型',
        type: 'select',
        options: [
            { label: '海运出口', value: 'sea_export' },
            { label: '海运进口', value: 'sea_import' },
        ],
    },
    {
        name: 'status',
        label: '订单状态',
        type: 'select',
        options: [
            { label: '已确认', value: 'confirmed' },
            { label: '待审核', value: 'pending' },
        ],
    },
    {
        name: 'createDate',
        label: '创建日期',
        type: 'dateRange',
    },
    {
        name: 'origin',
        label: '起运地',
        type: 'input',
    },
    {
        name: 'destination',
        label: '目的地',
        type: 'input',
    },
    {
        name: 'goodsName',
        label: '货物品名',
        type: 'input',
    },
    {
        name: 'hsCode',
        label: 'HS编码',
        type: 'input',
    },
];
