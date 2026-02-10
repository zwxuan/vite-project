import { Random } from 'mockjs';

export interface StatisticsKPI {
    totalJobs: number;
    docsCollected: number;
    missingDocs: number;
    complianceRate: number;
}

export interface TrendItem {
    date: string;
    complianceRate: number;
    missingCount: number;
}

export interface ReasonItem {
    type: string;
    value: number;
}

export interface DetailItem {
    id: string;
    jobNo: string;
    customer: string;
    docType: string;
    status: 'completed' | 'missing' | 'overdue';
    dueDate: string;
    collectedDate: string;
}

const mockKPI: StatisticsKPI = {
    totalJobs: 1250,
    docsCollected: 3500,
    missingDocs: 120,
    complianceRate: 96.5,
};

const mockTrend: TrendItem[] = [
    { date: '2023-01', complianceRate: 92, missingCount: 45 },
    { date: '2023-02', complianceRate: 94, missingCount: 30 },
    { date: '2023-03', complianceRate: 95, missingCount: 25 },
    { date: '2023-04', complianceRate: 93, missingCount: 35 },
    { date: '2023-05', complianceRate: 97, missingCount: 15 },
    { date: '2023-06', complianceRate: 98, missingCount: 10 },
];

const mockReason: ReasonItem[] = [
    { type: 'Client Delay', value: 45 },
    { type: 'System Error', value: 15 },
    { type: 'Lost in Transit', value: 10 },
    { type: 'Pending Approval', value: 30 },
];

const generateMockList = (count: number): DetailItem[] => {
    const list: DetailItem[] = [];
    for (let i = 0; i < count; i++) {
        list.push({
            id: Random.guid(),
            jobNo: `JOB-${Random.integer(10000, 99999)}`,
            customer: Random.title(2, 4),
            docType: Random.pick(['Invoice', 'Packing List', 'Bill of Lading', 'Contract']),
            status: Random.pick(['completed', 'missing', 'overdue']),
            dueDate: Random.date('yyyy-MM-dd'),
            collectedDate: Random.date('yyyy-MM-dd'),
        });
    }
    return list;
};

export const getStatisticsData = async (params: any) => {
    return new Promise<{
        success: boolean;
        kpi: StatisticsKPI;
        trend: TrendItem[];
        reason: ReasonItem[];
        list: DetailItem[];
    }>((resolve) => {
        setTimeout(() => {
            resolve({
                success: true,
                kpi: mockKPI,
                trend: mockTrend,
                reason: mockReason,
                list: generateMockList(20),
            });
        }, 800);
    });
};
