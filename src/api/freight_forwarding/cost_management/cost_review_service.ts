/**
 * 费用审核服务
 */
import {
    CostReviewItem,
    CostStatus,
    CostUrgency,
    PageResponse,
    ReviewRequest,
    BatchReviewRequest,
} from '@/types/freight_forwarding/cost_management';

// Mock数据 - 费用审核列表
const mockCostReviewItems: CostReviewItem[] = [
    {
        id: 'CR001',
        costType: 'RECEIVABLE',
        orderNo: 'ORD-20240315-001',
        customerName: 'ABC贸易公司',
        totalAmount: 17268,
        currency: 'CNY',
        submitTime: '2024-03-15 14:30:00',
        urgency: CostUrgency.NORMAL,
        status: CostStatus.PENDING,
        submitter: '张三',
        remark: '海运费用',
    },
    {
        id: 'CR002',
        costType: 'PAYABLE',
        orderNo: 'ORD-20240316-002',
        waybillNo: 'AWB-20240316-002',
        supplierName: '顺丰物流',
        totalAmount: 1635,
        currency: 'CNY',
        submitTime: '2024-03-16 11:30:00',
        urgency: CostUrgency.URGENT,
        status: CostStatus.PENDING,
        submitter: '孙七',
        remark: '拖车费用',
    },
    {
        id: 'CR003',
        costType: 'RECEIVABLE',
        orderNo: 'ORD-20240317-003',
        customerName: 'XYZ物流有限公司',
        totalAmount: 3955,
        currency: 'USD',
        submitTime: '2024-03-17 09:15:00',
        urgency: CostUrgency.VERY_URGENT,
        status: CostStatus.PENDING,
        submitter: '李四',
        remark: '紧急订单费用',
    },
    {
        id: 'CR004',
        costType: 'PAYABLE',
        orderNo: 'ORD-20240318-004',
        waybillNo: 'AWB-20240318-004',
        supplierName: '华通报关行',
        totalAmount: 848,
        currency: 'CNY',
        submitTime: '2024-03-18 10:45:00',
        urgency: CostUrgency.NORMAL,
        status: CostStatus.PENDING,
        submitter: '周八',
        remark: '报关费用',
    },
    {
        id: 'CR005',
        costType: 'RECEIVABLE',
        orderNo: 'ORD-20240319-005',
        customerName: '123进出口集团',
        totalAmount: 25000,
        currency: 'CNY',
        submitTime: '2024-03-19 15:20:00',
        urgency: CostUrgency.URGENT,
        status: CostStatus.PENDING,
        submitter: '王五',
        remark: '大额订单费用',
    },
    {
        id: 'CR006',
        costType: 'RECEIVABLE',
        orderNo: 'ORD-20240320-006',
        customerName: '德邦物流',
        totalAmount: 12500,
        currency: 'CNY',
        submitTime: '2024-03-20 08:30:00',
        urgency: CostUrgency.NORMAL,
        status: CostStatus.APPROVED,
        submitter: '赵六',
        remark: '已审核通过',
    },
];

/**
 * 获取费用审核列表
 */
export const getCostReviewList = async (
    params: any
): Promise<PageResponse<CostReviewItem>> => {
    await new Promise((resolve) => setTimeout(resolve, 300));

    let filteredData = [...mockCostReviewItems];

    // 过滤逻辑
    if (params.costType) {
        filteredData = filteredData.filter((item) => item.costType === params.costType);
    }
    if (params.status) {
        filteredData = filteredData.filter((item) => item.status === params.status);
    }
    if (params.urgency) {
        filteredData = filteredData.filter((item) => item.urgency === params.urgency);
    }
    if (params.orderNo) {
        filteredData = filteredData.filter((item) =>
            item.orderNo.includes(params.orderNo)
        );
    }
    if (params.customerName) {
        filteredData = filteredData.filter(
            (item) => item.customerName && item.customerName.includes(params.customerName)
        );
    }
    if (params.supplierName) {
        filteredData = filteredData.filter(
            (item) => item.supplierName && item.supplierName.includes(params.supplierName)
        );
    }

    const pageNum = params.pageNum || 1;
    const pageSize = params.pageSize || 10;
    const start = (pageNum - 1) * pageSize;
    const end = start + pageSize;

    // 统计数据
    const statistics = {
        pendingTotal: filteredData.filter((item) => item.status === CostStatus.PENDING).length,
        urgentCount: filteredData.filter(
            (item) => item.urgency === CostUrgency.URGENT || item.urgency === CostUrgency.VERY_URGENT
        ).length,
        overdueCount: 1, // Mock数据
        todayReviewed: 18, // Mock数据
    };

    return {
        list: filteredData.slice(start, end),
        total: filteredData.length,
        pageNum,
        pageSize,
        statistics,
    };
};

/**
 * 审核通过
 */
export const approveCost = async (data: ReviewRequest): Promise<void> => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    const index = mockCostReviewItems.findIndex((item) => item.id === data.id);
    if (index !== -1) {
        mockCostReviewItems[index].status = CostStatus.APPROVED;
    }
};

/**
 * 审核驳回
 */
export const rejectCost = async (data: ReviewRequest): Promise<void> => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    const index = mockCostReviewItems.findIndex((item) => item.id === data.id);
    if (index !== -1) {
        mockCostReviewItems[index].status = CostStatus.REJECTED;
    }
};

/**
 * 批量审核通过
 */
export const batchApproveCosts = async (data: BatchReviewRequest): Promise<void> => {
    await new Promise((resolve) => setTimeout(resolve, 800));
    data.ids.forEach((id) => {
        const index = mockCostReviewItems.findIndex((item) => item.id === id);
        if (index !== -1) {
            mockCostReviewItems[index].status = CostStatus.APPROVED;
        }
    });
};

/**
 * 批量审核驳回
 */
export const batchRejectCosts = async (data: BatchReviewRequest): Promise<void> => {
    await new Promise((resolve) => setTimeout(resolve, 800));
    data.ids.forEach((id) => {
        const index = mockCostReviewItems.findIndex((item) => item.id === id);
        if (index !== -1) {
            mockCostReviewItems[index].status = CostStatus.REJECTED;
        }
    });
};
