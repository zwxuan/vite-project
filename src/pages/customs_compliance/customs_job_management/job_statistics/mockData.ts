
export const mockKpiData = {
    total: 1248,
    completed: 950,
    processing: 280,
    exception: 18,
};

export const mockTrendData = Array.from({ length: 30 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - (29 - i));
    return [
        { date: date.toISOString().split('T')[0], type: 'Import', count: Math.floor(Math.random() * 50) + 10 },
        { date: date.toISOString().split('T')[0], type: 'Export', count: Math.floor(Math.random() * 40) + 5 },
    ];
}).flat();

export const mockDistributionData = [
    { type: 'Import Declaration', count: 450 },
    { type: 'Export Declaration', count: 380 },
    { type: 'Transit', count: 120 },
    { type: 'Bonded', count: 200 },
    { type: 'Return', count: 98 },
];

export const mockRankingData = [
    { customer: 'Apple Inc.', count: 320 },
    { customer: 'Tesla Motors', count: 280 },
    { customer: 'Huawei Tech', count: 210 },
    { customer: 'Samsung', count: 150 },
    { customer: 'Sony', count: 120 },
    { customer: 'Xiaomi', count: 90 },
    { customer: 'Dell', count: 78 },
];

export const mockTableData = Array.from({ length: 50 }, (_, i) => ({
    key: i,
    date: new Date(Date.now() - i * 86400000).toISOString().split('T')[0],
    type: ['Import Declaration', 'Export Declaration', 'Transit'][i % 3],
    count: Math.floor(Math.random() * 100),
    amount: (Math.random() * 100000).toFixed(2),
}));
