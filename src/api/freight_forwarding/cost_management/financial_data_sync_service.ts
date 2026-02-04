import {
    PageResponse,
    SyncExceptionItem,
    SyncExceptionStats,
    SyncExceptionStatus,
    SyncLogItem,
    SyncLogLevel,
    SyncLogStats,
    SyncScheduleType,
    SyncStatus,
    SyncStatusItem,
    SyncStatusStats,
    SyncTaskItem,
    SyncTaskStats,
    SyncType,
} from '@/types/freight_forwarding/cost_management';

const mockSyncStatusList: SyncStatusItem[] = [
    {
        id: 'SS-001',
        syncType: SyncType.COST_ALLOCATION,
        status: SyncStatus.SUCCESS,
        lastSyncTime: '2024-01-21 09:15:00',
        nextSyncTime: '2024-01-21 10:15:00',
        successRate: 98.6,
        failedCount: 2,
        pendingCount: 0,
    },
    {
        id: 'SS-002',
        syncType: SyncType.ORDER_FEE,
        status: SyncStatus.RUNNING,
        lastSyncTime: '2024-01-21 09:30:00',
        nextSyncTime: '2024-01-21 10:30:00',
        successRate: 96.2,
        failedCount: 5,
        pendingCount: 12,
    },
    {
        id: 'SS-003',
        syncType: SyncType.BILLING,
        status: SyncStatus.FAILED,
        lastSyncTime: '2024-01-21 08:50:00',
        nextSyncTime: '2024-01-21 09:50:00',
        successRate: 88.1,
        failedCount: 14,
        pendingCount: 6,
    },
    {
        id: 'SS-004',
        syncType: SyncType.INVOICE,
        status: SyncStatus.PENDING,
        lastSyncTime: '2024-01-20 17:30:00',
        nextSyncTime: '2024-01-21 09:00:00',
        successRate: 92.4,
        failedCount: 4,
        pendingCount: 18,
    },
    {
        id: 'SS-005',
        syncType: SyncType.COST_ALLOCATION,
        status: SyncStatus.SUCCESS,
        lastSyncTime: '2024-01-20 16:05:00',
        nextSyncTime: '2024-01-20 17:05:00',
        successRate: 97.3,
        failedCount: 3,
        pendingCount: 1,
    },
    {
        id: 'SS-006',
        syncType: SyncType.ORDER_FEE,
        status: SyncStatus.SUCCESS,
        lastSyncTime: '2024-01-20 15:40:00',
        nextSyncTime: '2024-01-20 16:40:00',
        successRate: 99.1,
        failedCount: 1,
        pendingCount: 0,
    },
    {
        id: 'SS-007',
        syncType: SyncType.BILLING,
        status: SyncStatus.RUNNING,
        lastSyncTime: '2024-01-21 09:10:00',
        nextSyncTime: '2024-01-21 10:10:00',
        successRate: 95.7,
        failedCount: 6,
        pendingCount: 9,
    },
    {
        id: 'SS-008',
        syncType: SyncType.INVOICE,
        status: SyncStatus.SUCCESS,
        lastSyncTime: '2024-01-20 14:20:00',
        nextSyncTime: '2024-01-20 15:20:00',
        successRate: 97.9,
        failedCount: 2,
        pendingCount: 0,
    },
    {
        id: 'SS-009',
        syncType: SyncType.COST_ALLOCATION,
        status: SyncStatus.RUNNING,
        lastSyncTime: '2024-01-21 08:40:00',
        nextSyncTime: '2024-01-21 09:40:00',
        successRate: 94.5,
        failedCount: 7,
        pendingCount: 4,
    },
    {
        id: 'SS-010',
        syncType: SyncType.INVOICE,
        status: SyncStatus.FAILED,
        lastSyncTime: '2024-01-20 13:10:00',
        nextSyncTime: '2024-01-20 14:10:00',
        successRate: 89.9,
        failedCount: 11,
        pendingCount: 3,
    },
];

const mockSyncTaskList: SyncTaskItem[] = [
    {
        id: 'ST-001',
        taskNo: 'TASK-202401-001',
        syncType: SyncType.COST_ALLOCATION,
        scheduleType: SyncScheduleType.HOURLY,
        status: SyncStatus.SUCCESS,
        lastRunTime: '2024-01-21 09:00:00',
        nextRunTime: '2024-01-21 10:00:00',
        owner: '李明',
        createdTime: '2023-12-01 08:30:00',
    },
    {
        id: 'ST-002',
        taskNo: 'TASK-202401-002',
        syncType: SyncType.ORDER_FEE,
        scheduleType: SyncScheduleType.REAL_TIME,
        status: SyncStatus.RUNNING,
        lastRunTime: '2024-01-21 09:35:00',
        nextRunTime: '2024-01-21 09:40:00',
        owner: '王珊',
        createdTime: '2023-12-15 10:10:00',
    },
    {
        id: 'ST-003',
        taskNo: 'TASK-202401-003',
        syncType: SyncType.BILLING,
        scheduleType: SyncScheduleType.DAILY,
        status: SyncStatus.FAILED,
        lastRunTime: '2024-01-21 02:00:00',
        nextRunTime: '2024-01-22 02:00:00',
        owner: '赵强',
        createdTime: '2023-11-20 09:45:00',
    },
    {
        id: 'ST-004',
        taskNo: 'TASK-202401-004',
        syncType: SyncType.INVOICE,
        scheduleType: SyncScheduleType.WEEKLY,
        status: SyncStatus.PENDING,
        lastRunTime: '2024-01-15 03:30:00',
        nextRunTime: '2024-01-22 03:30:00',
        owner: '周林',
        createdTime: '2023-10-05 11:20:00',
    },
    {
        id: 'ST-005',
        taskNo: 'TASK-202401-005',
        syncType: SyncType.ORDER_FEE,
        scheduleType: SyncScheduleType.HOURLY,
        status: SyncStatus.SUCCESS,
        lastRunTime: '2024-01-21 08:00:00',
        nextRunTime: '2024-01-21 09:00:00',
        owner: '刘洋',
        createdTime: '2023-12-08 14:05:00',
    },
    {
        id: 'ST-006',
        taskNo: 'TASK-202401-006',
        syncType: SyncType.COST_ALLOCATION,
        scheduleType: SyncScheduleType.DAILY,
        status: SyncStatus.SUCCESS,
        lastRunTime: '2024-01-21 01:00:00',
        nextRunTime: '2024-01-22 01:00:00',
        owner: '陈旭',
        createdTime: '2023-11-12 16:40:00',
    },
    {
        id: 'ST-007',
        taskNo: 'TASK-202401-007',
        syncType: SyncType.BILLING,
        scheduleType: SyncScheduleType.HOURLY,
        status: SyncStatus.RUNNING,
        lastRunTime: '2024-01-21 09:20:00',
        nextRunTime: '2024-01-21 10:20:00',
        owner: '胡洁',
        createdTime: '2023-12-22 13:25:00',
    },
    {
        id: 'ST-008',
        taskNo: 'TASK-202401-008',
        syncType: SyncType.INVOICE,
        scheduleType: SyncScheduleType.DAILY,
        status: SyncStatus.SUCCESS,
        lastRunTime: '2024-01-21 04:30:00',
        nextRunTime: '2024-01-22 04:30:00',
        owner: '吴迪',
        createdTime: '2023-11-02 10:50:00',
    },
    {
        id: 'ST-009',
        taskNo: 'TASK-202401-009',
        syncType: SyncType.COST_ALLOCATION,
        scheduleType: SyncScheduleType.WEEKLY,
        status: SyncStatus.PENDING,
        lastRunTime: '2024-01-14 02:10:00',
        nextRunTime: '2024-01-21 02:10:00',
        owner: '张艺',
        createdTime: '2023-10-18 09:35:00',
    },
    {
        id: 'ST-010',
        taskNo: 'TASK-202401-010',
        syncType: SyncType.BILLING,
        scheduleType: SyncScheduleType.DAILY,
        status: SyncStatus.SUCCESS,
        lastRunTime: '2024-01-21 05:00:00',
        nextRunTime: '2024-01-22 05:00:00',
        owner: '周锐',
        createdTime: '2023-11-28 15:55:00',
    },
    {
        id: 'ST-011',
        taskNo: 'TASK-202401-011',
        syncType: SyncType.COST_ALLOCATION,
        scheduleType: SyncScheduleType.CRON,
        cronExpression: '0 0 12 * * ?',
        status: SyncStatus.PENDING,
        lastRunTime: '2024-01-21 12:00:00',
        nextRunTime: '2024-01-22 12:00:00',
        owner: '测试员',
        createdTime: '2024-01-22 10:00:00',
    },
];

const mockSyncLogList: SyncLogItem[] = [
    {
        id: 'SL-001',
        logNo: 'LOG-20240121-001',
        syncId: 'SYNC-20240121-001',
        syncType: SyncType.COST_ALLOCATION,
        level: SyncLogLevel.INFO,
        status: SyncStatus.SUCCESS,
        message: '费用分配数据同步完成',
        startTime: '2024-01-21 08:55:00',
        endTime: '2024-01-21 08:58:20',
        duration: 200,
    },
    {
        id: 'SL-002',
        logNo: 'LOG-20240121-002',
        syncId: 'SYNC-20240121-002',
        syncType: SyncType.ORDER_FEE,
        level: SyncLogLevel.WARN,
        status: SyncStatus.RUNNING,
        message: '部分费用项等待确认',
        startTime: '2024-01-21 09:20:00',
        endTime: '2024-01-21 09:25:00',
        duration: 300,
    },
    {
        id: 'SL-003',
        logNo: 'LOG-20240121-003',
        syncId: 'SYNC-20240121-003',
        syncType: SyncType.BILLING,
        level: SyncLogLevel.ERROR,
        status: SyncStatus.FAILED,
        message: '账单数据接口响应超时',
        startTime: '2024-01-21 08:10:00',
        endTime: '2024-01-21 08:12:30',
        duration: 150,
    },
    {
        id: 'SL-004',
        logNo: 'LOG-20240120-004',
        syncId: 'SYNC-20240120-004',
        syncType: SyncType.INVOICE,
        level: SyncLogLevel.INFO,
        status: SyncStatus.SUCCESS,
        message: '发票同步完成',
        startTime: '2024-01-20 16:45:00',
        endTime: '2024-01-20 16:48:10',
        duration: 190,
    },
    {
        id: 'SL-005',
        logNo: 'LOG-20240120-005',
        syncId: 'SYNC-20240120-005',
        syncType: SyncType.ORDER_FEE,
        level: SyncLogLevel.INFO,
        status: SyncStatus.SUCCESS,
        message: '费用同步成功',
        startTime: '2024-01-20 15:30:00',
        endTime: '2024-01-20 15:33:45',
        duration: 225,
    },
    {
        id: 'SL-006',
        logNo: 'LOG-20240120-006',
        syncId: 'SYNC-20240120-006',
        syncType: SyncType.COST_ALLOCATION,
        level: SyncLogLevel.WARN,
        status: SyncStatus.SUCCESS,
        message: '同步完成，存在异常项需复核',
        startTime: '2024-01-20 14:05:00',
        endTime: '2024-01-20 14:09:30',
        duration: 270,
    },
    {
        id: 'SL-007',
        logNo: 'LOG-20240121-007',
        syncId: 'SYNC-20240121-007',
        syncType: SyncType.BILLING,
        level: SyncLogLevel.INFO,
        status: SyncStatus.RUNNING,
        message: '账单同步进行中',
        startTime: '2024-01-21 09:05:00',
        endTime: '2024-01-21 09:09:40',
        duration: 280,
    },
    {
        id: 'SL-008',
        logNo: 'LOG-20240119-008',
        syncId: 'SYNC-20240119-008',
        syncType: SyncType.INVOICE,
        level: SyncLogLevel.ERROR,
        status: SyncStatus.FAILED,
        message: '发票编号重复',
        startTime: '2024-01-19 11:00:00',
        endTime: '2024-01-19 11:02:05',
        duration: 125,
    },
    {
        id: 'SL-009',
        logNo: 'LOG-20240119-009',
        syncId: 'SYNC-20240119-009',
        syncType: SyncType.COST_ALLOCATION,
        level: SyncLogLevel.INFO,
        status: SyncStatus.SUCCESS,
        message: '成本分配同步完成',
        startTime: '2024-01-19 09:20:00',
        endTime: '2024-01-19 09:23:10',
        duration: 190,
    },
    {
        id: 'SL-010',
        logNo: 'LOG-20240118-010',
        syncId: 'SYNC-20240118-010',
        syncType: SyncType.ORDER_FEE,
        level: SyncLogLevel.WARN,
        status: SyncStatus.FAILED,
        message: '同步中断，等待重试',
        startTime: '2024-01-18 13:40:00',
        endTime: '2024-01-18 13:43:30',
        duration: 210,
    },
];

const mockSyncExceptionList: SyncExceptionItem[] = [
    {
        id: 'SE-001',
        exceptionNo: 'EX-20240121-001',
        syncId: 'SYNC-20240121-003',
        syncType: SyncType.BILLING,
        errorType: '接口超时',
        errorMessage: '账单同步超时，未获取返回结果',
        status: SyncExceptionStatus.PENDING,
        occurredTime: '2024-01-21 08:12:40',
        handler: '待分配',
        handleTime: '-',
        retryCount: 1,
    },
    {
        id: 'SE-002',
        exceptionNo: 'EX-20240121-002',
        syncId: 'SYNC-20240121-004',
        syncType: SyncType.ORDER_FEE,
        errorType: '数据校验失败',
        errorMessage: '费用科目缺失导致同步失败',
        status: SyncExceptionStatus.PROCESSING,
        occurredTime: '2024-01-21 09:05:10',
        handler: '王珊',
        handleTime: '2024-01-21 09:20:00',
        retryCount: 2,
    },
    {
        id: 'SE-003',
        exceptionNo: 'EX-20240120-003',
        syncId: 'SYNC-20240120-006',
        syncType: SyncType.COST_ALLOCATION,
        errorType: '映射关系缺失',
        errorMessage: '分配规则未映射至财务科目',
        status: SyncExceptionStatus.RESOLVED,
        occurredTime: '2024-01-20 14:10:20',
        handler: '刘洋',
        handleTime: '2024-01-20 15:00:00',
        retryCount: 1,
    },
    {
        id: 'SE-004',
        exceptionNo: 'EX-20240119-004',
        syncId: 'SYNC-20240119-008',
        syncType: SyncType.INVOICE,
        errorType: '发票编号冲突',
        errorMessage: '同步发票编号重复',
        status: SyncExceptionStatus.PENDING,
        occurredTime: '2024-01-19 11:03:00',
        handler: '待分配',
        handleTime: '-',
        retryCount: 0,
    },
    {
        id: 'SE-005',
        exceptionNo: 'EX-20240119-005',
        syncId: 'SYNC-20240119-010',
        syncType: SyncType.ORDER_FEE,
        errorType: '金额不匹配',
        errorMessage: '同步金额与来源金额不一致',
        status: SyncExceptionStatus.PROCESSING,
        occurredTime: '2024-01-19 15:20:00',
        handler: '赵强',
        handleTime: '2024-01-19 15:45:00',
        retryCount: 3,
    },
    {
        id: 'SE-006',
        exceptionNo: 'EX-20240118-006',
        syncId: 'SYNC-20240118-006',
        syncType: SyncType.BILLING,
        errorType: '接口返回异常',
        errorMessage: '财务系统返回未知错误码',
        status: SyncExceptionStatus.RESOLVED,
        occurredTime: '2024-01-18 10:35:00',
        handler: '胡洁',
        handleTime: '2024-01-18 12:10:00',
        retryCount: 1,
    },
    {
        id: 'SE-007',
        exceptionNo: 'EX-20240117-007',
        syncId: 'SYNC-20240117-007',
        syncType: SyncType.COST_ALLOCATION,
        errorType: '校验失败',
        errorMessage: '分配明细金额为负数',
        status: SyncExceptionStatus.PENDING,
        occurredTime: '2024-01-17 16:20:00',
        handler: '待分配',
        handleTime: '-',
        retryCount: 0,
    },
    {
        id: 'SE-008',
        exceptionNo: 'EX-20240117-008',
        syncId: 'SYNC-20240117-008',
        syncType: SyncType.ORDER_FEE,
        errorType: '目标系统不可用',
        errorMessage: '财务系统维护中',
        status: SyncExceptionStatus.PROCESSING,
        occurredTime: '2024-01-17 11:05:00',
        handler: '李明',
        handleTime: '2024-01-17 11:30:00',
        retryCount: 2,
    },
    {
        id: 'SE-009',
        exceptionNo: 'EX-20240116-009',
        syncId: 'SYNC-20240116-009',
        syncType: SyncType.INVOICE,
        errorType: '发票抬头缺失',
        errorMessage: '发票抬头信息为空',
        status: SyncExceptionStatus.RESOLVED,
        occurredTime: '2024-01-16 09:50:00',
        handler: '赵强',
        handleTime: '2024-01-16 10:20:00',
        retryCount: 1,
    },
    {
        id: 'SE-010',
        exceptionNo: 'EX-20240115-010',
        syncId: 'SYNC-20240115-010',
        syncType: SyncType.BILLING,
        errorType: '汇率缺失',
        errorMessage: '账单同步缺少汇率配置',
        status: SyncExceptionStatus.PENDING,
        occurredTime: '2024-01-15 14:10:00',
        handler: '待分配',
        handleTime: '-',
        retryCount: 0,
    },
];

const parseTime = (value?: string) => {
    if (!value) {
        return null;
    }
    const normalized = value.replace(' ', 'T');
    const time = new Date(normalized).getTime();
    return Number.isNaN(time) ? null : time;
};

const filterByDateRange = <T extends Record<string, any>>(
    list: T[],
    range: string[] | undefined,
    field: keyof T
) => {
    if (!range || range.length < 2) {
        return list;
    }
    const start = parseTime(range[0]);
    const end = parseTime(range[1]);
    if (!start || !end) {
        return list;
    }
    return list.filter((item) => {
        const time = parseTime(String(item[field]));
        if (!time) {
            return false;
        }
        return time >= start && time <= end;
    });
};

const filterSyncStatus = (params: any) => {
    let list = [...mockSyncStatusList];
    if (params?.syncType) {
        list = list.filter((item) => item.syncType === params.syncType);
    }
    if (params?.status) {
        list = list.filter((item) => item.status === params.status);
    }
    list = filterByDateRange(list, params?.dateRange, 'lastSyncTime');
    return list;
};

const filterSyncTasks = (params: any) => {
    let list = [...mockSyncTaskList];
    if (params?.taskNo) {
        list = list.filter((item) => item.taskNo.includes(params.taskNo));
    }
    if (params?.syncType) {
        list = list.filter((item) => item.syncType === params.syncType);
    }
    if (params?.status) {
        list = list.filter((item) => item.status === params.status);
    }
    if (params?.scheduleType) {
        list = list.filter((item) => item.scheduleType === params.scheduleType);
    }
    list = filterByDateRange(list, params?.dateRange, 'lastRunTime');
    return list;
};

const filterSyncLogs = (params: any) => {
    let list = [...mockSyncLogList];
    if (params?.syncType) {
        list = list.filter((item) => item.syncType === params.syncType);
    }
    if (params?.status) {
        list = list.filter((item) => item.status === params.status);
    }
    if (params?.level) {
        list = list.filter((item) => item.level === params.level);
    }
    if (params?.keyword) {
        list = list.filter((item) => item.message.includes(params.keyword));
    }
    list = filterByDateRange(list, params?.dateRange, 'startTime');
    return list;
};

const filterSyncExceptions = (params: any) => {
    let list = [...mockSyncExceptionList];
    if (params?.syncType) {
        list = list.filter((item) => item.syncType === params.syncType);
    }
    if (params?.status) {
        list = list.filter((item) => item.status === params.status);
    }
    if (params?.exceptionNo) {
        list = list.filter((item) => item.exceptionNo.includes(params.exceptionNo));
    }
    list = filterByDateRange(list, params?.dateRange, 'occurredTime');
    return list;
};

const paginate = <T extends Record<string, any>>(list: T[], params: any) => {
    const pageNum = params?.pageNum || 1;
    const pageSize = params?.pageSize || 10;
    const start = (pageNum - 1) * pageSize;
    const end = start + pageSize;
    return { list: list.slice(start, end), total: list.length, pageNum, pageSize };
};

export const querySyncStatusList = async (params: any): Promise<PageResponse<SyncStatusItem>> => {
    await new Promise((resolve) => setTimeout(resolve, 300));
    const list = filterSyncStatus(params);
    const { list: pageList, total, pageNum, pageSize } = paginate(list, params);
    return { list: pageList, total, pageNum, pageSize };
};

export const querySyncStatusStats = async (params: any): Promise<SyncStatusStats> => {
    await new Promise((resolve) => setTimeout(resolve, 200));
    const list = filterSyncStatus(params);
    return list.reduce(
        (acc, item) => {
            acc.todayCount += 1;
            if (item.status === SyncStatus.SUCCESS) {
                acc.successCount += 1;
            }
            if (item.status === SyncStatus.FAILED) {
                acc.failedCount += 1;
            }
            if (item.status === SyncStatus.PENDING) {
                acc.pendingCount += 1;
            }
            return acc;
        },
        {
            todayCount: 0,
            successCount: 0,
            failedCount: 0,
            pendingCount: 0,
        }
    );
};

export const querySyncTaskList = async (params: any): Promise<PageResponse<SyncTaskItem>> => {
    await new Promise((resolve) => setTimeout(resolve, 300));
    const list = filterSyncTasks(params);
    const { list: pageList, total, pageNum, pageSize } = paginate(list, params);
    return { list: pageList, total, pageNum, pageSize };
};

export const querySyncTaskStats = async (params: any): Promise<SyncTaskStats> => {
    await new Promise((resolve) => setTimeout(resolve, 200));
    const list = filterSyncTasks(params);
    return list.reduce(
        (acc, item) => {
            acc.totalCount += 1;
            if (item.status === SyncStatus.PENDING) {
                acc.pendingCount += 1;
            }
            if (item.status === SyncStatus.SUCCESS) {
                acc.successCount += 1;
            }
            if (item.status === SyncStatus.FAILED) {
                acc.failedCount += 1;
            }
            return acc;
        },
        {
            totalCount: 0,
            pendingCount: 0,
            successCount: 0,
            failedCount: 0,
            averageDuration: 42.5,
        }
    );
};

export const querySyncLogList = async (params: any): Promise<PageResponse<SyncLogItem>> => {
    await new Promise((resolve) => setTimeout(resolve, 300));
    const list = filterSyncLogs(params);
    const { list: pageList, total, pageNum, pageSize } = paginate(list, params);
    return { list: pageList, total, pageNum, pageSize };
};

export const querySyncLogStats = async (params: any): Promise<SyncLogStats> => {
    await new Promise((resolve) => setTimeout(resolve, 200));
    const list = filterSyncLogs(params);
    return list.reduce(
        (acc, item) => {
            acc.totalCount += 1;
            if (item.status === SyncStatus.SUCCESS) {
                acc.successCount += 1;
            }
            if (item.status === SyncStatus.FAILED) {
                acc.failedCount += 1;
            }
            return acc;
        },
        {
            totalCount: 0,
            successCount: 0,
            failedCount: 0,
            averageDuration: 210,
        }
    );
};

export const querySyncExceptionList = async (params: any): Promise<PageResponse<SyncExceptionItem>> => {
    await new Promise((resolve) => setTimeout(resolve, 300));
    const list = filterSyncExceptions(params);
    const { list: pageList, total, pageNum, pageSize } = paginate(list, params);
    return { list: pageList, total, pageNum, pageSize };
};

export const querySyncExceptionStats = async (params: any): Promise<SyncExceptionStats> => {
    await new Promise((resolve) => setTimeout(resolve, 200));
    const list = filterSyncExceptions(params);
    return list.reduce(
        (acc, item) => {
            acc.totalCount += 1;
            if (item.status === SyncExceptionStatus.PENDING) {
                acc.pendingCount += 1;
            }
            if (item.status === SyncExceptionStatus.PROCESSING) {
                acc.processingCount += 1;
            }
            if (item.status === SyncExceptionStatus.RESOLVED) {
                acc.resolvedCount += 1;
            }
            return acc;
        },
        {
            totalCount: 0,
            pendingCount: 0,
            processingCount: 0,
            resolvedCount: 0,
        }
    );
};

export const retrySyncException = async (ids: string[]): Promise<boolean> => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    return true;
};

export const resolveSyncException = async (ids: string[]): Promise<boolean> => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    return true;
};
