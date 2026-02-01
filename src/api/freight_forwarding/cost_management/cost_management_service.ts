/**
 * 费用管理服务
 */
import {
    ReceivableCost,
    PayableCost,
    CostOverviewItem,
    CostOverviewStats,
    CostSearchParams,
    PageResponse,
    CostStatus,
    CostType,
    ServiceType,
    CostReviewItem,
    CostUrgency,
    ReviewRequest,
    BatchReviewRequest,
} from '@/types/freight_forwarding/cost_management';

// Mock数据 - 应收费用
const mockReceivableCosts: ReceivableCost[] = [
    {
        id: 'RC001',
        orderNo: 'ORD-20240315-001',
        customerId: 'CUST001',
        customerName: 'ABC贸易公司',
        contractNo: 'CONTRACT-001',
        currency: 'CNY',
        exchangeRate: 1.0,
        salesman: '张三',
        status: CostStatus.CONFIRMED,
        billingDate: '2024-03-15',
        createTime: '2024-03-15 14:30:00',
        remark: '海运费用',
        items: [
            {
                id: 'RCI001',
                costType: CostType.OCEAN_FREIGHT,
                costName: '海运费',
                quantity: 2,
                unit: '柜',
                unitPrice: 7500,
                baseAmount: 15000,
                taxRate: 0.13,
                taxAmount: 1950,
                totalAmount: 16950,
            },
            {
                id: 'RCI002',
                costType: CostType.DOC_FEE,
                costName: '文件费',
                quantity: 1,
                unit: '票',
                unitPrice: 300,
                baseAmount: 300,
                taxRate: 0.06,
                taxAmount: 18,
                totalAmount: 318,
            },
        ],
        totalAmount: 15300,
        taxAmount: 1968,
        grandTotal: 17268,
        estimatedProfit: 6093,
    },
    {
        id: 'RC002',
        orderNo: 'ORD-20240316-002',
        customerId: 'CUST002',
        customerName: 'XYZ物流有限公司',
        contractNo: 'CONTRACT-002',
        currency: 'USD',
        exchangeRate: 7.2456,
        salesman: '李四',
        status: CostStatus.PENDING,
        billingDate: '2024-03-16',
        createTime: '2024-03-16 10:20:00',
        items: [
            {
                id: 'RCI003',
                costType: CostType.OCEAN_FREIGHT,
                costName: '海运费',
                quantity: 1,
                unit: '柜',
                unitPrice: 3500,
                baseAmount: 3500,
                taxRate: 0.13,
                taxAmount: 455,
                totalAmount: 3955,
            },
        ],
        totalAmount: 3500,
        taxAmount: 455,
        grandTotal: 3955,
    },
    {
        id: 'RC003',
        orderNo: 'ORD-20240317-003',
        customerId: 'CUST003',
        customerName: '123进出口集团',
        currency: 'CNY',
        exchangeRate: 1.0,
        salesman: '王五',
        status: CostStatus.DRAFT,
        billingDate: '2024-03-17',
        createTime: '2024-03-17 09:15:00',
        items: [
            {
                id: 'RCI004',
                costType: CostType.PORT_CHARGE,
                costName: '港杂费',
                quantity: 1,
                unit: '票',
                unitPrice: 2500,
                baseAmount: 2500,
                taxRate: 0.13,
                taxAmount: 325,
                totalAmount: 2825,
            },
        ],
        totalAmount: 2500,
        taxAmount: 325,
        grandTotal: 2825,
    },
];

// Mock数据 - 应付费用
const mockPayableCosts: PayableCost[] = [
    {
        id: 'PC001',
        waybillNo: 'AWB-20240315-001',
        serviceType: ServiceType.SHIPPING,
        supplierId: 'SUP001',
        supplierName: '中远海运',
        contractNo: 'SUP-CONTRACT-001',
        currency: 'CNY',
        exchangeRate: 1.0,
        operator: '赵六',
        status: CostStatus.CONFIRMED,
        serviceDate: '2024-03-15',
        createTime: '2024-03-15 15:00:00',
        items: [
            {
                id: 'PCI001',
                costType: CostType.OCEAN_FREIGHT,
                costName: '海运费',
                quantity: 2,
                unit: '柜',
                unitPrice: 6000,
                baseAmount: 12000,
                taxRate: 0.13,
                taxAmount: 1560,
                totalAmount: 13560,
            },
        ],
        totalAmount: 12000,
        taxAmount: 1560,
        grandTotal: 13560,
    },
    {
        id: 'PC002',
        waybillNo: 'AWB-20240316-002',
        serviceType: ServiceType.TRUCKING,
        supplierId: 'SUP002',
        supplierName: '顺丰物流',
        currency: 'CNY',
        exchangeRate: 1.0,
        operator: '孙七',
        status: CostStatus.PENDING,
        serviceDate: '2024-03-16',
        createTime: '2024-03-16 11:30:00',
        items: [
            {
                id: 'PCI002',
                costType: CostType.TRUCKING_FEE,
                costName: '拖车费',
                quantity: 1,
                unit: '趟',
                unitPrice: 1500,
                baseAmount: 1500,
                taxRate: 0.09,
                taxAmount: 135,
                totalAmount: 1635,
            },
        ],
        totalAmount: 1500,
        taxAmount: 135,
        grandTotal: 1635,
    },
    {
        id: 'PC003',
        waybillNo: 'AWB-20240317-003',
        serviceType: ServiceType.CUSTOMS,
        supplierId: 'SUP003',
        supplierName: '华通报关行',
        currency: 'CNY',
        exchangeRate: 1.0,
        operator: '周八',
        status: CostStatus.DRAFT,
        serviceDate: '2024-03-17',
        createTime: '2024-03-17 10:45:00',
        items: [
            {
                id: 'PCI003',
                costType: CostType.CUSTOMS_FEE,
                costName: '报关费',
                quantity: 1,
                unit: '票',
                unitPrice: 800,
                baseAmount: 800,
                taxRate: 0.06,
                taxAmount: 48,
                totalAmount: 848,
            },
        ],
        totalAmount: 800,
        taxAmount: 48,
        grandTotal: 848,
    },
];

// Mock数据 - 费用总览统计
const mockCostOverviewStats: CostOverviewStats = {
    totalReceivable: 1234567,
    totalPayable: 987654,
    grossProfit: 246913,
    profitMargin: 20.0,
    pendingReceivable: 156789,
    pendingPayable: 89456,
    monthlyNew: 345678,
    abnormalCost: 12,
};

/**
 * 获取应收费用列表
 */
export const getReceivableCostList = async (
    params: CostSearchParams
): Promise<PageResponse<ReceivableCost>> => {
    // 模拟API延迟
    await new Promise((resolve) => setTimeout(resolve, 300));

    let filteredData = [...mockReceivableCosts];

    // 过滤逻辑
    if (params.orderNo) {
        filteredData = filteredData.filter((item) =>
            item.orderNo.includes(params.orderNo!)
        );
    }
    if (params.customer) {
        filteredData = filteredData.filter((item) =>
            item.customerName.includes(params.customer!)
        );
    }
    if (params.status) {
        filteredData = filteredData.filter((item) => item.status === params.status);
    }

    const pageNum = params.pageNum || 1;
    const pageSize = params.pageSize || 10;
    const start = (pageNum - 1) * pageSize;
    const end = start + pageSize;

    return {
        list: filteredData.slice(start, end),
        total: filteredData.length,
        pageNum,
        pageSize,
    };
};

/**
 * 获取应收费用详情
 */
export const getReceivableCostDetail = async (
    id: string
): Promise<ReceivableCost> => {
    await new Promise((resolve) => setTimeout(resolve, 200));
    const cost = mockReceivableCosts.find((item) => item.id === id);
    if (!cost) {
        throw new Error('应收费用不存在');
    }
    return cost;
};

/**
 * 创建应收费用
 */
export const createReceivableCost = async (
    data: Partial<ReceivableCost>
): Promise<ReceivableCost> => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    const newCost: ReceivableCost = {
        id: `RC${Date.now()}`,
        ...data,
    } as ReceivableCost;
    mockReceivableCosts.push(newCost);
    return newCost;
};

/**
 * 更新应收费用
 */
export const updateReceivableCost = async (
    id: string,
    data: Partial<ReceivableCost>
): Promise<ReceivableCost> => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    const index = mockReceivableCosts.findIndex((item) => item.id === id);
    if (index === -1) {
        throw new Error('应收费用不存在');
    }
    mockReceivableCosts[index] = { ...mockReceivableCosts[index], ...data };
    return mockReceivableCosts[index];
};

/**
 * 删除应收费用
 */
export const deleteReceivableCost = async (id: string): Promise<void> => {
    await new Promise((resolve) => setTimeout(resolve, 300));
    const index = mockReceivableCosts.findIndex((item) => item.id === id);
    if (index !== -1) {
        mockReceivableCosts.splice(index, 1);
    }
};

/**
 * 获取应付费用列表
 */
export const getPayableCostList = async (
    params: CostSearchParams
): Promise<PageResponse<PayableCost>> => {
    await new Promise((resolve) => setTimeout(resolve, 300));

    let filteredData = [...mockPayableCosts];

    if (params.waybillNo) {
        filteredData = filteredData.filter((item) =>
            item.waybillNo.includes(params.waybillNo!)
        );
    }
    if (params.supplier) {
        filteredData = filteredData.filter((item) =>
            item.supplierName.includes(params.supplier!)
        );
    }
    if (params.status) {
        filteredData = filteredData.filter((item) => item.status === params.status);
    }
    if (params.serviceType) {
        filteredData = filteredData.filter(
            (item) => item.serviceType === params.serviceType
        );
    }

    const pageNum = params.pageNum || 1;
    const pageSize = params.pageSize || 10;
    const start = (pageNum - 1) * pageSize;
    const end = start + pageSize;

    return {
        list: filteredData.slice(start, end),
        total: filteredData.length,
        pageNum,
        pageSize,
    };
};

/**
 * 获取应付费用详情
 */
export const getPayableCostDetail = async (id: string): Promise<PayableCost> => {
    await new Promise((resolve) => setTimeout(resolve, 200));
    const cost = mockPayableCosts.find((item) => item.id === id);
    if (!cost) {
        throw new Error('应付费用不存在');
    }
    return cost;
};

/**
 * 创建应付费用
 */
export const createPayableCost = async (
    data: Partial<PayableCost>
): Promise<PayableCost> => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    const newCost: PayableCost = {
        id: `PC${Date.now()}`,
        ...data,
    } as PayableCost;
    mockPayableCosts.push(newCost);
    return newCost;
};

/**
 * 更新应付费用
 */
export const updatePayableCost = async (
    id: string,
    data: Partial<PayableCost>
): Promise<PayableCost> => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    const index = mockPayableCosts.findIndex((item) => item.id === id);
    if (index === -1) {
        throw new Error('应付费用不存在');
    }
    mockPayableCosts[index] = { ...mockPayableCosts[index], ...data };
    return mockPayableCosts[index];
};

/**
 * 删除应付费用
 */
export const deletePayableCost = async (id: string): Promise<void> => {
    await new Promise((resolve) => setTimeout(resolve, 300));
    const index = mockPayableCosts.findIndex((item) => item.id === id);
    if (index !== -1) {
        mockPayableCosts.splice(index, 1);
    }
};

/**
 * 获取费用总览统计
 */
export const getCostOverviewStats = async (): Promise<CostOverviewStats> => {
    await new Promise((resolve) => setTimeout(resolve, 200));
    return mockCostOverviewStats;
};

/**
 * 获取费用总览列表
 */
export const getCostOverviewList = async (
    params: CostSearchParams
): Promise<PageResponse<CostOverviewItem>> => {
    await new Promise((resolve) => setTimeout(resolve, 300));

    // 合并应收应付数据
    const receivableItems: CostOverviewItem[] = mockReceivableCosts.map((item) => ({
        id: item.id,
        orderNo: item.orderNo,
        costType: 'RECEIVABLE' as const,
        costName: item.items.map((i) => i.costName).join(', '),
        amount: item.grandTotal,
        currency: item.currency,
        status: item.status,
        customer: item.customerName,
        createTime: item.createTime,
    }));

    const payableItems: CostOverviewItem[] = mockPayableCosts.map((item) => ({
        id: item.id,
        waybillNo: item.waybillNo,
        costType: 'PAYABLE' as const,
        costName: item.items.map((i) => i.costName).join(', '),
        amount: item.grandTotal,
        currency: item.currency,
        status: item.status,
        supplier: item.supplierName,
        createTime: item.createTime,
    }));

    let allItems = [...receivableItems, ...payableItems];

    // 过滤逻辑
    if (params.orderNo) {
        allItems = allItems.filter(
            (item) => item.orderNo && item.orderNo.includes(params.orderNo!)
        );
    }
    if (params.waybillNo) {
        allItems = allItems.filter(
            (item) => item.waybillNo && item.waybillNo.includes(params.waybillNo!)
        );
    }
    if (params.customer) {
        allItems = allItems.filter(
            (item) => item.customer && item.customer.includes(params.customer!)
        );
    }

    const pageNum = params.pageNum || 1;
    const pageSize = params.pageSize || 10;
    const start = (pageNum - 1) * pageSize;
    const end = start + pageSize;

    return {
        list: allItems.slice(start, end),
        total: allItems.length,
        pageNum,
        pageSize,
    };
};

// 导出费用审核相关服务
export {
    getCostReviewList,
    approveCost,
    rejectCost,
    batchApproveCosts,
    batchRejectCosts,
} from './cost_review_service';

