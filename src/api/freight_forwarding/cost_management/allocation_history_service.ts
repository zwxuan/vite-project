import {
    AllocationHistoryItem,
    AllocationHistoryStats,
    AllocationHistoryStatus,
} from '@/types/freight_forwarding/cost_management';

const mockAllocationHistoryList: AllocationHistoryItem[] = [
    {
        id: 'AH-001',
        allocationNo: 'ALC-20240101-001',
        orderNo: 'ORD-20240101-001',
        customerName: '上海远洋物流',
        allocationType: '规则分配',
        allocationBasis: '按重量',
        allocationAmount: 18600,
        currency: 'CNY',
        operator: '王珊',
        allocateTime: '2024-01-01 09:15:00',
        status: AllocationHistoryStatus.SUCCESS,
        source: '系统自动',
    },
    {
        id: 'AH-002',
        allocationNo: 'ALC-20240103-002',
        orderNo: 'ORD-20240103-004',
        customerName: '宁波海运',
        allocationType: '手动分配',
        allocationBasis: '按金额',
        allocationAmount: 9200,
        currency: 'CNY',
        operator: '李明',
        allocateTime: '2024-01-03 14:30:00',
        status: AllocationHistoryStatus.SUCCESS,
        source: '人工调整',
    },
    {
        id: 'AH-003',
        allocationNo: 'ALC-20240105-001',
        orderNo: 'ORD-20240105-002',
        customerName: '华南供应链',
        allocationType: '规则分配',
        allocationBasis: '按体积',
        allocationAmount: 5400,
        currency: 'USD',
        operator: '赵强',
        allocateTime: '2024-01-05 11:20:00',
        status: AllocationHistoryStatus.FAILED,
        source: '系统自动',
    },
    {
        id: 'AH-004',
        allocationNo: 'ALC-20240107-003',
        orderNo: 'ORD-20240107-009',
        customerName: '海昌国际',
        allocationType: '规则分配',
        allocationBasis: '按重量',
        allocationAmount: 12600,
        currency: 'CNY',
        operator: '周林',
        allocateTime: '2024-01-07 16:00:00',
        status: AllocationHistoryStatus.SUCCESS,
        source: '系统自动',
    },
    {
        id: 'AH-005',
        allocationNo: 'ALC-20240109-004',
        orderNo: 'ORD-20240109-006',
        customerName: '深圳迅捷',
        allocationType: '手动分配',
        allocationBasis: '按金额',
        allocationAmount: 3100,
        currency: 'CNY',
        operator: '刘洋',
        allocateTime: '2024-01-09 10:25:00',
        status: AllocationHistoryStatus.SUCCESS,
        source: '人工调整',
    },
    {
        id: 'AH-006',
        allocationNo: 'ALC-20240111-002',
        orderNo: 'ORD-20240111-001',
        customerName: '天津鸿达',
        allocationType: '规则分配',
        allocationBasis: '按重量',
        allocationAmount: 8800,
        currency: 'CNY',
        operator: '陈旭',
        allocateTime: '2024-01-11 13:40:00',
        status: AllocationHistoryStatus.SUCCESS,
        source: '系统自动',
    },
    {
        id: 'AH-007',
        allocationNo: 'ALC-20240113-001',
        orderNo: 'ORD-20240113-008',
        customerName: '青岛远航',
        allocationType: '规则分配',
        allocationBasis: '按体积',
        allocationAmount: 7600,
        currency: 'USD',
        operator: '吴迪',
        allocateTime: '2024-01-13 15:18:00',
        status: AllocationHistoryStatus.FAILED,
        source: '系统自动',
    },
    {
        id: 'AH-008',
        allocationNo: 'ALC-20240115-005',
        orderNo: 'ORD-20240115-010',
        customerName: '广州鑫源',
        allocationType: '手动分配',
        allocationBasis: '按金额',
        allocationAmount: 4600,
        currency: 'CNY',
        operator: '胡洁',
        allocateTime: '2024-01-15 09:05:00',
        status: AllocationHistoryStatus.SUCCESS,
        source: '人工调整',
    },
    {
        id: 'AH-009',
        allocationNo: 'ALC-20240118-002',
        orderNo: 'ORD-20240118-003',
        customerName: '厦门航通',
        allocationType: '规则分配',
        allocationBasis: '按重量',
        allocationAmount: 11200,
        currency: 'CNY',
        operator: '周锐',
        allocateTime: '2024-01-18 10:32:00',
        status: AllocationHistoryStatus.SUCCESS,
        source: '系统自动',
    },
    {
        id: 'AH-010',
        allocationNo: 'ALC-20240120-003',
        orderNo: 'ORD-20240120-004',
        customerName: '福州远达',
        allocationType: '手动分配',
        allocationBasis: '按金额',
        allocationAmount: 5200,
        currency: 'CNY',
        operator: '张艺',
        allocateTime: '2024-01-20 17:10:00',
        status: AllocationHistoryStatus.SUCCESS,
        source: '人工调整',
    },
];

const filterAllocationHistory = (params: any) => {
    let list = [...mockAllocationHistoryList];
    if (params?.status) {
        list = list.filter((item) => item.status === params.status);
    }
    if (params?.orderNo) {
        list = list.filter((item) => item.orderNo.includes(params.orderNo));
    }
    if (params?.allocationNo) {
        list = list.filter((item) => item.allocationNo.includes(params.allocationNo));
    }
    if (params?.customerName) {
        list = list.filter((item) => item.customerName.includes(params.customerName));
    }
    if (params?.operator) {
        list = list.filter((item) => item.operator.includes(params.operator));
    }
    if (params?.allocationType) {
        list = list.filter((item) => item.allocationType === params.allocationType);
    }
    return list;
};

export const queryAllocationHistoryList = async (
    params: any
): Promise<{ data: AllocationHistoryItem[]; total: number }> => {
    await new Promise((resolve) => setTimeout(resolve, 300));
    const list = filterAllocationHistory(params);
    const pageNum = params?.pageNum || 1;
    const pageSize = params?.pageSize || 10;
    const start = (pageNum - 1) * pageSize;
    const end = start + pageSize;
    return {
        data: list.slice(start, end),
        total: list.length,
    };
};

export const queryAllocationHistoryStats = async (
    params: any
): Promise<AllocationHistoryStats> => {
    await new Promise((resolve) => setTimeout(resolve, 200));
    const list = filterAllocationHistory(params);
    return list.reduce(
        (acc, item) => {
            acc.totalCount += 1;
            acc.totalAmount += item.allocationAmount;
            if (item.status === AllocationHistoryStatus.SUCCESS) {
                acc.successCount += 1;
            }
            if (item.status === AllocationHistoryStatus.FAILED) {
                acc.failedCount += 1;
            }
            return acc;
        },
        {
            totalCount: 0,
            totalAmount: 0,
            successCount: 0,
            failedCount: 0,
        }
    );
};
