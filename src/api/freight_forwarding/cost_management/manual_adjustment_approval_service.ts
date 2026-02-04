import {
    ManualAdjustmentApprovalItem,
    ManualAdjustmentApprovalStats,
    ManualAdjustmentApprovalStatus,
} from '@/types/freight_forwarding/cost_management';

const mockManualAdjustmentApprovalList: ManualAdjustmentApprovalItem[] = [
    {
        id: 'MAA-001',
        adjustmentNo: 'ADJ-20240201-001',
        orderNo: 'ORD-20240201-001',
        customerName: '上海远洋物流',
        adjustmentType: '成本调整',
        adjustmentAmount: 3200,
        currency: 'CNY',
        reason: '港杂费用补录',
        applicant: '李明',
        applyTime: '2024-02-01 10:12:00',
        status: ManualAdjustmentApprovalStatus.PENDING,
        reviewer: '',
        reviewTime: '',
    },
    {
        id: 'MAA-002',
        adjustmentNo: 'ADJ-20240202-002',
        orderNo: 'ORD-20240202-004',
        customerName: '宁波海运',
        adjustmentType: '收入调整',
        adjustmentAmount: 1850,
        currency: 'CNY',
        reason: '补充服务费',
        applicant: '王珊',
        applyTime: '2024-02-02 14:05:00',
        status: ManualAdjustmentApprovalStatus.APPROVED,
        reviewer: '赵强',
        reviewTime: '2024-02-02 16:20:00',
    },
    {
        id: 'MAA-003',
        adjustmentNo: 'ADJ-20240203-003',
        orderNo: 'ORD-20240203-003',
        customerName: '华南供应链',
        adjustmentType: '成本调整',
        adjustmentAmount: 980,
        currency: 'CNY',
        reason: '拖车补差',
        applicant: '孙杰',
        applyTime: '2024-02-03 09:45:00',
        status: ManualAdjustmentApprovalStatus.REJECTED,
        reviewer: '周林',
        reviewTime: '2024-02-03 11:10:00',
    },
    {
        id: 'MAA-004',
        adjustmentNo: 'ADJ-20240204-001',
        orderNo: 'ORD-20240204-002',
        customerName: '海昌国际',
        adjustmentType: '收入调整',
        adjustmentAmount: 4200,
        currency: 'USD',
        reason: '航线附加费',
        applicant: '赵雪',
        applyTime: '2024-02-04 13:30:00',
        status: ManualAdjustmentApprovalStatus.PENDING,
        reviewer: '',
        reviewTime: '',
    },
    {
        id: 'MAA-005',
        adjustmentNo: 'ADJ-20240205-002',
        orderNo: 'ORD-20240205-006',
        customerName: '深圳迅捷',
        adjustmentType: '成本调整',
        adjustmentAmount: 560,
        currency: 'CNY',
        reason: '仓储费用更正',
        applicant: '刘洋',
        applyTime: '2024-02-05 08:20:00',
        status: ManualAdjustmentApprovalStatus.APPROVED,
        reviewer: '许彬',
        reviewTime: '2024-02-05 09:05:00',
    },
    {
        id: 'MAA-006',
        adjustmentNo: 'ADJ-20240206-003',
        orderNo: 'ORD-20240206-001',
        customerName: '天津鸿达',
        adjustmentType: '收入调整',
        adjustmentAmount: 1500,
        currency: 'CNY',
        reason: '加急服务费',
        applicant: '陈旭',
        applyTime: '2024-02-06 15:18:00',
        status: ManualAdjustmentApprovalStatus.PENDING,
        reviewer: '',
        reviewTime: '',
    },
    {
        id: 'MAA-007',
        adjustmentNo: 'ADJ-20240207-001',
        orderNo: 'ORD-20240207-008',
        customerName: '青岛远航',
        adjustmentType: '成本调整',
        adjustmentAmount: 2750,
        currency: 'USD',
        reason: '堆存费补录',
        applicant: '马航',
        applyTime: '2024-02-07 11:42:00',
        status: ManualAdjustmentApprovalStatus.APPROVED,
        reviewer: '吴迪',
        reviewTime: '2024-02-07 12:30:00',
    },
    {
        id: 'MAA-008',
        adjustmentNo: 'ADJ-20240208-002',
        orderNo: 'ORD-20240208-009',
        customerName: '广州鑫源',
        adjustmentType: '收入调整',
        adjustmentAmount: 690,
        currency: 'CNY',
        reason: '文件费调整',
        applicant: '胡洁',
        applyTime: '2024-02-08 16:05:00',
        status: ManualAdjustmentApprovalStatus.REJECTED,
        reviewer: '谢峰',
        reviewTime: '2024-02-08 17:22:00',
    },
    {
        id: 'MAA-009',
        adjustmentNo: 'ADJ-20240209-001',
        orderNo: 'ORD-20240209-002',
        customerName: '厦门航通',
        adjustmentType: '成本调整',
        adjustmentAmount: 1320,
        currency: 'CNY',
        reason: '报关服务费',
        applicant: '周锐',
        applyTime: '2024-02-09 10:55:00',
        status: ManualAdjustmentApprovalStatus.PENDING,
        reviewer: '',
        reviewTime: '',
    },
    {
        id: 'MAA-010',
        adjustmentNo: 'ADJ-20240210-003',
        orderNo: 'ORD-20240210-010',
        customerName: '福州远达',
        adjustmentType: '收入调整',
        adjustmentAmount: 2400,
        currency: 'CNY',
        reason: '临时加收',
        applicant: '张艺',
        applyTime: '2024-02-10 09:15:00',
        status: ManualAdjustmentApprovalStatus.APPROVED,
        reviewer: '彭磊',
        reviewTime: '2024-02-10 10:40:00',
    },
];

const filterManualAdjustments = (params: any) => {
    let list = [...mockManualAdjustmentApprovalList];
    if (params?.status) {
        list = list.filter((item) => item.status === params.status);
    }
    if (params?.orderNo) {
        list = list.filter((item) => item.orderNo.includes(params.orderNo));
    }
    if (params?.adjustmentNo) {
        list = list.filter((item) => item.adjustmentNo.includes(params.adjustmentNo));
    }
    if (params?.customerName) {
        list = list.filter((item) => item.customerName.includes(params.customerName));
    }
    if (params?.applicant) {
        list = list.filter((item) => item.applicant.includes(params.applicant));
    }
    return list;
};

export const queryManualAdjustmentApprovalList = async (
    params: any
): Promise<{ data: ManualAdjustmentApprovalItem[]; total: number }> => {
    await new Promise((resolve) => setTimeout(resolve, 300));
    const list = filterManualAdjustments(params);
    const pageNum = params?.pageNum || 1;
    const pageSize = params?.pageSize || 10;
    const start = (pageNum - 1) * pageSize;
    const end = start + pageSize;
    return {
        data: list.slice(start, end),
        total: list.length,
    };
};

export const queryManualAdjustmentApprovalStats = async (
    params: any
): Promise<ManualAdjustmentApprovalStats> => {
    await new Promise((resolve) => setTimeout(resolve, 200));
    const list = filterManualAdjustments(params);
    return list.reduce(
        (acc, item) => {
            acc.totalAdjustmentAmount += item.adjustmentAmount;
            if (item.status === ManualAdjustmentApprovalStatus.PENDING) {
                acc.pendingCount += 1;
            }
            if (item.status === ManualAdjustmentApprovalStatus.APPROVED) {
                acc.approvedCount += 1;
            }
            if (item.status === ManualAdjustmentApprovalStatus.REJECTED) {
                acc.rejectedCount += 1;
            }
            return acc;
        },
        {
            totalAdjustmentAmount: 0,
            pendingCount: 0,
            approvedCount: 0,
            rejectedCount: 0,
        }
    );
};

export const approveManualAdjustment = async (id: string): Promise<void> => {
    await new Promise((resolve) => setTimeout(resolve, 300));
    const index = mockManualAdjustmentApprovalList.findIndex((item) => item.id === id);
    if (index !== -1) {
        mockManualAdjustmentApprovalList[index].status = ManualAdjustmentApprovalStatus.APPROVED;
        mockManualAdjustmentApprovalList[index].reviewTime = new Date().toLocaleString();
        mockManualAdjustmentApprovalList[index].reviewer = 'Current User';
    }
};

export const rejectManualAdjustment = async (id: string): Promise<void> => {
    await new Promise((resolve) => setTimeout(resolve, 300));
    const index = mockManualAdjustmentApprovalList.findIndex((item) => item.id === id);
    if (index !== -1) {
        mockManualAdjustmentApprovalList[index].status = ManualAdjustmentApprovalStatus.REJECTED;
        mockManualAdjustmentApprovalList[index].reviewTime = new Date().toLocaleString();
        mockManualAdjustmentApprovalList[index].reviewer = 'Current User';
    }
};

export const batchApproveManualAdjustments = async (ids: string[]): Promise<void> => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    ids.forEach((id) => {
        const index = mockManualAdjustmentApprovalList.findIndex((item) => item.id === id);
        if (index !== -1) {
            mockManualAdjustmentApprovalList[index].status = ManualAdjustmentApprovalStatus.APPROVED;
            mockManualAdjustmentApprovalList[index].reviewTime = new Date().toLocaleString();
            mockManualAdjustmentApprovalList[index].reviewer = 'Current User';
        }
    });
};

export const batchRejectManualAdjustments = async (ids: string[]): Promise<void> => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    ids.forEach((id) => {
        const index = mockManualAdjustmentApprovalList.findIndex((item) => item.id === id);
        if (index !== -1) {
            mockManualAdjustmentApprovalList[index].status = ManualAdjustmentApprovalStatus.REJECTED;
            mockManualAdjustmentApprovalList[index].reviewTime = new Date().toLocaleString();
            mockManualAdjustmentApprovalList[index].reviewer = 'Current User';
        }
    });
};
