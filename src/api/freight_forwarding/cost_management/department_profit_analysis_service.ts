import {
    SalesDepartmentPerformanceItem,
    SalesDepartmentPerformanceStats,
    OperationDepartmentProfitItem,
    OperationDepartmentProfitStats,
    ProfitTrendAnalysisItem,
    ProfitTrendAnalysisStats,
    DepartmentPerformanceComparisonItem,
    DepartmentPerformanceComparisonStats,
} from '@/types/freight_forwarding/cost_management';

const mockSalesDepartmentPerformanceList: SalesDepartmentPerformanceItem[] = [
    {
        id: 'SDP-001',
        department: '华东销售部',
        manager: '李明',
        orderCount: 126,
        totalRevenue: 1280000,
        totalCost: 980000,
        grossProfit: 300000,
        profitMargin: 23.4,
        completionRate: 96.8,
        period: '2024-01',
    },
    {
        id: 'SDP-002',
        department: '华南销售部',
        manager: '王珊',
        orderCount: 98,
        totalRevenue: 1035000,
        totalCost: 820000,
        grossProfit: 215000,
        profitMargin: 20.8,
        completionRate: 92.5,
        period: '2024-01',
    },
    {
        id: 'SDP-003',
        department: '华北销售部',
        manager: '赵强',
        orderCount: 88,
        totalRevenue: 880000,
        totalCost: 705000,
        grossProfit: 175000,
        profitMargin: 19.9,
        completionRate: 90.2,
        period: '2024-01',
    },
    {
        id: 'SDP-004',
        department: '西南销售部',
        manager: '周林',
        orderCount: 74,
        totalRevenue: 720000,
        totalCost: 600000,
        grossProfit: 120000,
        profitMargin: 16.7,
        completionRate: 88.4,
        period: '2024-01',
    },
    {
        id: 'SDP-005',
        department: '华中销售部',
        manager: '孙杰',
        orderCount: 69,
        totalRevenue: 690000,
        totalCost: 560000,
        grossProfit: 130000,
        profitMargin: 18.8,
        completionRate: 91.3,
        period: '2024-01',
    },
    {
        id: 'SDP-006',
        department: '东北销售部',
        manager: '刘洋',
        orderCount: 57,
        totalRevenue: 520000,
        totalCost: 430000,
        grossProfit: 90000,
        profitMargin: 17.3,
        completionRate: 86.5,
        period: '2024-01',
    },
    {
        id: 'SDP-007',
        department: '华东销售部',
        manager: '李明',
        orderCount: 132,
        totalRevenue: 1360000,
        totalCost: 1030000,
        grossProfit: 330000,
        profitMargin: 24.3,
        completionRate: 98.1,
        period: '2024-02',
    },
    {
        id: 'SDP-008',
        department: '华南销售部',
        manager: '王珊',
        orderCount: 105,
        totalRevenue: 1120000,
        totalCost: 880000,
        grossProfit: 240000,
        profitMargin: 21.4,
        completionRate: 93.7,
        period: '2024-02',
    },
    {
        id: 'SDP-009',
        department: '华北销售部',
        manager: '赵强',
        orderCount: 95,
        totalRevenue: 930000,
        totalCost: 735000,
        grossProfit: 195000,
        profitMargin: 21.0,
        completionRate: 92.9,
        period: '2024-02',
    },
    {
        id: 'SDP-010',
        department: '西南销售部',
        manager: '周林',
        orderCount: 81,
        totalRevenue: 760000,
        totalCost: 620000,
        grossProfit: 140000,
        profitMargin: 18.4,
        completionRate: 89.6,
        period: '2024-02',
    },
];

const mockOperationDepartmentProfitList: OperationDepartmentProfitItem[] = [
    {
        id: 'ODP-001',
        department: '订舱作业部',
        operatorCount: 18,
        ticketCount: 420,
        teuCount: 860,
        totalRevenue: 980000,
        totalCost: 730000,
        grossProfit: 250000,
        profitMargin: 25.5,
    },
    {
        id: 'ODP-002',
        department: '拖车作业部',
        operatorCount: 12,
        ticketCount: 310,
        teuCount: 540,
        totalRevenue: 620000,
        totalCost: 470000,
        grossProfit: 150000,
        profitMargin: 24.2,
    },
    {
        id: 'ODP-003',
        department: '报关作业部',
        operatorCount: 15,
        ticketCount: 360,
        teuCount: 620,
        totalRevenue: 700000,
        totalCost: 520000,
        grossProfit: 180000,
        profitMargin: 25.7,
    },
    {
        id: 'ODP-004',
        department: '仓储作业部',
        operatorCount: 10,
        ticketCount: 240,
        teuCount: 380,
        totalRevenue: 480000,
        totalCost: 370000,
        grossProfit: 110000,
        profitMargin: 22.9,
    },
    {
        id: 'ODP-005',
        department: '空运作业部',
        operatorCount: 14,
        ticketCount: 280,
        teuCount: 420,
        totalRevenue: 560000,
        totalCost: 430000,
        grossProfit: 130000,
        profitMargin: 23.2,
    },
    {
        id: 'ODP-006',
        department: '铁路作业部',
        operatorCount: 11,
        ticketCount: 210,
        teuCount: 300,
        totalRevenue: 420000,
        totalCost: 330000,
        grossProfit: 90000,
        profitMargin: 21.4,
    },
    {
        id: 'ODP-007',
        department: '综合物流作业部',
        operatorCount: 16,
        ticketCount: 390,
        teuCount: 650,
        totalRevenue: 820000,
        totalCost: 610000,
        grossProfit: 210000,
        profitMargin: 25.6,
    },
    {
        id: 'ODP-008',
        department: '跨境电商作业部',
        operatorCount: 9,
        ticketCount: 190,
        teuCount: 280,
        totalRevenue: 360000,
        totalCost: 280000,
        grossProfit: 80000,
        profitMargin: 22.2,
    },
    {
        id: 'ODP-009',
        department: '项目物流作业部',
        operatorCount: 8,
        ticketCount: 150,
        teuCount: 210,
        totalRevenue: 310000,
        totalCost: 250000,
        grossProfit: 60000,
        profitMargin: 19.4,
    },
    {
        id: 'ODP-010',
        department: '散货作业部',
        operatorCount: 13,
        ticketCount: 260,
        teuCount: 410,
        totalRevenue: 540000,
        totalCost: 410000,
        grossProfit: 130000,
        profitMargin: 24.1,
    },
];

const mockProfitTrendAnalysisList: ProfitTrendAnalysisItem[] = [
    { id: 'PTA-001', period: '2023-10', revenue: 980000, cost: 780000, totalProfit: 200000, profitMargin: 20.4, salesProfit: 120000, opsProfit: 80000 },
    { id: 'PTA-002', period: '2023-11', revenue: 1020000, cost: 810000, totalProfit: 210000, profitMargin: 20.6, salesProfit: 130000, opsProfit: 80000 },
    { id: 'PTA-003', period: '2023-12', revenue: 1100000, cost: 860000, totalProfit: 240000, profitMargin: 21.8, salesProfit: 150000, opsProfit: 90000 },
    { id: 'PTA-004', period: '2024-01', revenue: 1180000, cost: 910000, totalProfit: 270000, profitMargin: 22.9, salesProfit: 170000, opsProfit: 100000 },
    { id: 'PTA-005', period: '2024-02', revenue: 1230000, cost: 930000, totalProfit: 300000, profitMargin: 24.4, salesProfit: 185000, opsProfit: 115000 },
    { id: 'PTA-006', period: '2024-03', revenue: 1290000, cost: 970000, totalProfit: 320000, profitMargin: 24.8, salesProfit: 200000, opsProfit: 120000 },
    { id: 'PTA-007', period: '2024-04', revenue: 1340000, cost: 1000000, totalProfit: 340000, profitMargin: 25.4, salesProfit: 210000, opsProfit: 130000 },
    { id: 'PTA-008', period: '2024-05', revenue: 1380000, cost: 1030000, totalProfit: 350000, profitMargin: 25.4, salesProfit: 215000, opsProfit: 135000 },
    { id: 'PTA-009', period: '2024-06', revenue: 1420000, cost: 1060000, totalProfit: 360000, profitMargin: 25.4, salesProfit: 220000, opsProfit: 140000 },
    { id: 'PTA-010', period: '2024-07', revenue: 1460000, cost: 1080000, totalProfit: 380000, profitMargin: 26.0, salesProfit: 230000, opsProfit: 150000 },
];

const mockDepartmentPerformanceComparisonList: DepartmentPerformanceComparisonItem[] = [
    { id: 'DPC-001', rank: 1, department: '华东销售部', orderCount: 132, revenue: 1360000, cost: 1030000, grossProfit: 330000, profitMargin: 24.3, kpiScore: 92.5 },
    { id: 'DPC-002', rank: 2, department: '华南销售部', orderCount: 105, revenue: 1120000, cost: 880000, grossProfit: 240000, profitMargin: 21.4, kpiScore: 88.4 },
    { id: 'DPC-003', rank: 3, department: '订舱作业部', orderCount: 420, revenue: 980000, cost: 730000, grossProfit: 250000, profitMargin: 25.5, kpiScore: 87.6 },
    { id: 'DPC-004', rank: 4, department: '报关作业部', orderCount: 360, revenue: 700000, cost: 520000, grossProfit: 180000, profitMargin: 25.7, kpiScore: 85.2 },
    { id: 'DPC-005', rank: 5, department: '综合物流作业部', orderCount: 390, revenue: 820000, cost: 610000, grossProfit: 210000, profitMargin: 25.6, kpiScore: 84.3 },
    { id: 'DPC-006', rank: 6, department: '华北销售部', orderCount: 95, revenue: 930000, cost: 735000, grossProfit: 195000, profitMargin: 21.0, kpiScore: 83.1 },
    { id: 'DPC-007', rank: 7, department: '拖车作业部', orderCount: 310, revenue: 620000, cost: 470000, grossProfit: 150000, profitMargin: 24.2, kpiScore: 82.4 },
    { id: 'DPC-008', rank: 8, department: '仓储作业部', orderCount: 240, revenue: 480000, cost: 370000, grossProfit: 110000, profitMargin: 22.9, kpiScore: 80.6 },
    { id: 'DPC-009', rank: 9, department: '空运作业部', orderCount: 280, revenue: 560000, cost: 430000, grossProfit: 130000, profitMargin: 23.2, kpiScore: 79.8 },
    { id: 'DPC-010', rank: 10, department: '铁路作业部', orderCount: 210, revenue: 420000, cost: 330000, grossProfit: 90000, profitMargin: 21.4, kpiScore: 77.2 },
];

const filterByText = <T extends { department?: string; manager?: string }>(list: T[], params: any) => {
    let result = [...list];
    if (params?.department) {
        result = result.filter((item) => item.department?.includes(params.department));
    }
    if (params?.manager) {
        result = result.filter((item) => item.manager?.includes(params.manager));
    }
    return result;
};

const paginate = <T>(list: T[], params: any) => {
    const pageNum = params?.pageNum || 1;
    const pageSize = params?.pageSize || 10;
    const start = (pageNum - 1) * pageSize;
    const end = start + pageSize;
    return {
        data: list.slice(start, end),
        total: list.length,
    };
};

const calcSalesStats = (list: SalesDepartmentPerformanceItem[]): SalesDepartmentPerformanceStats => {
    const totalRevenue = list.reduce((sum, item) => sum + item.totalRevenue, 0);
    const totalCost = list.reduce((sum, item) => sum + item.totalCost, 0);
    const grossProfit = list.reduce((sum, item) => sum + item.grossProfit, 0);
    const avgProfitMargin = list.length
        ? list.reduce((sum, item) => sum + item.profitMargin, 0) / list.length
        : 0;
    return { totalRevenue, totalCost, grossProfit, avgProfitMargin };
};

const calcOperationStats = (list: OperationDepartmentProfitItem[]): OperationDepartmentProfitStats => {
    const totalRevenue = list.reduce((sum, item) => sum + item.totalRevenue, 0);
    const totalCost = list.reduce((sum, item) => sum + item.totalCost, 0);
    const grossProfit = list.reduce((sum, item) => sum + item.grossProfit, 0);
    const avgProfitMargin = list.length
        ? list.reduce((sum, item) => sum + item.profitMargin, 0) / list.length
        : 0;
    return { totalRevenue, totalCost, grossProfit, avgProfitMargin };
};

const calcTrendStats = (list: ProfitTrendAnalysisItem[]): ProfitTrendAnalysisStats => {
    const totalRevenue = list.reduce((sum, item) => sum + item.revenue, 0);
    const totalCost = list.reduce((sum, item) => sum + item.cost, 0);
    const grossProfit = list.reduce((sum, item) => sum + item.totalProfit, 0);
    const avgProfitMargin = list.length
        ? list.reduce((sum, item) => sum + item.profitMargin, 0) / list.length
        : 0;
    return { totalRevenue, totalCost, grossProfit, avgProfitMargin };
};

const calcComparisonStats = (list: DepartmentPerformanceComparisonItem[]): DepartmentPerformanceComparisonStats => {
    const totalRevenue = list.reduce((sum, item) => sum + item.revenue, 0);
    const totalCost = list.reduce((sum, item) => sum + item.cost, 0);
    const highestProfit = list.reduce((max, item) => Math.max(max, item.grossProfit), 0);
    const avgKpiScore = list.length
        ? list.reduce((sum, item) => sum + item.kpiScore, 0) / list.length
        : 0;
    return { totalRevenue, totalCost, highestProfit, avgKpiScore };
};

export const querySalesDepartmentPerformanceList = async (
    params: any
): Promise<{ data: SalesDepartmentPerformanceItem[]; total: number }> => {
    await new Promise((resolve) => setTimeout(resolve, 300));
    const list = filterByText(mockSalesDepartmentPerformanceList, params);
    return paginate(list, params);
};

export const querySalesDepartmentPerformanceStats = async (
    params: any
): Promise<SalesDepartmentPerformanceStats> => {
    await new Promise((resolve) => setTimeout(resolve, 200));
    const list = filterByText(mockSalesDepartmentPerformanceList, params);
    return calcSalesStats(list);
};

export const queryOperationDepartmentProfitList = async (
    params: any
): Promise<{ data: OperationDepartmentProfitItem[]; total: number }> => {
    await new Promise((resolve) => setTimeout(resolve, 300));
    const list = filterByText(mockOperationDepartmentProfitList, params);
    return paginate(list, params);
};

export const queryOperationDepartmentProfitStats = async (
    params: any
): Promise<OperationDepartmentProfitStats> => {
    await new Promise((resolve) => setTimeout(resolve, 200));
    const list = filterByText(mockOperationDepartmentProfitList, params);
    return calcOperationStats(list);
};

export const queryProfitTrendAnalysisList = async (
    params: any
): Promise<{ data: ProfitTrendAnalysisItem[]; total: number }> => {
    await new Promise((resolve) => setTimeout(resolve, 300));
    const list = [...mockProfitTrendAnalysisList];
    return paginate(list, params);
};

export const queryProfitTrendAnalysisStats = async (
    params: any
): Promise<ProfitTrendAnalysisStats> => {
    await new Promise((resolve) => setTimeout(resolve, 200));
    const list = [...mockProfitTrendAnalysisList];
    return calcTrendStats(list);
};

export const queryDepartmentPerformanceComparisonList = async (
    params: any
): Promise<{ data: DepartmentPerformanceComparisonItem[]; total: number }> => {
    await new Promise((resolve) => setTimeout(resolve, 300));
    let list = [...mockDepartmentPerformanceComparisonList];
    if (params?.department) {
        list = list.filter((item) => item.department.includes(params.department));
    }
    if (params?.kpiLevel) {
        const level = params.kpiLevel;
        list = list.filter((item) => {
            if (level === 'high') return item.kpiScore >= 90;
            if (level === 'medium') return item.kpiScore >= 80 && item.kpiScore < 90;
            if (level === 'low') return item.kpiScore < 80;
            return true;
        });
    }
    return paginate(list, params);
};

export const queryDepartmentPerformanceComparisonStats = async (
    params: any
): Promise<DepartmentPerformanceComparisonStats> => {
    await new Promise((resolve) => setTimeout(resolve, 200));
    let list = [...mockDepartmentPerformanceComparisonList];
    if (params?.department) {
        list = list.filter((item) => item.department.includes(params.department));
    }
    if (params?.kpiLevel) {
        const level = params.kpiLevel;
        list = list.filter((item) => {
            if (level === 'high') return item.kpiScore >= 90;
            if (level === 'medium') return item.kpiScore >= 80 && item.kpiScore < 90;
            if (level === 'low') return item.kpiScore < 80;
            return true;
        });
    }
    return calcComparisonStats(list);
};
