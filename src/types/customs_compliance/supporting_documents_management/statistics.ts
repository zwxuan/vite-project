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
