/**
 * 费用管理模块类型定义
 */

// 费用状态枚举
export enum CostStatus {
    DRAFT = 'DRAFT',
    PENDING = 'PENDING',
    APPROVED = 'APPROVED',
    REJECTED = 'REJECTED',
    CONFIRMED = 'CONFIRMED',
}

// 费用类型枚举
export enum CostType {
    OCEAN_FREIGHT = 'OCEAN_FREIGHT', // 海运费
    DOC_FEE = 'DOC_FEE', // 文件费
    PORT_CHARGE = 'PORT_CHARGE', // 港杂费
    CUSTOMS_FEE = 'CUSTOMS_FEE', // 报关费
    TRUCKING_FEE = 'TRUCKING_FEE', // 拖车费
    WAREHOUSE_FEE = 'WAREHOUSE_FEE', // 仓储费
    OTHER = 'OTHER', // 其他
}

// 服务类型枚举
export enum ServiceType {
    SHIPPING = 'SHIPPING', // 运输
    BOOKING = 'BOOKING', // 订舱
    TRUCKING = 'TRUCKING', // 拖车
    CUSTOMS = 'CUSTOMS', // 报关
    WAREHOUSE = 'WAREHOUSE', // 仓储
}

// 紧急程度枚举
export enum CostUrgency {
    NORMAL = 'NORMAL', // 普通
    URGENT = 'URGENT', // 紧急
    VERY_URGENT = 'VERY_URGENT', // 非常紧急
}


// 费用明细项
export interface CostItem {
    id?: string;
    costType: CostType;
    costName: string;
    quantity: number;
    unit: string;
    unitPrice: number;
    baseAmount: number;
    taxRate: number;
    taxAmount: number;
    totalAmount: number;
    remark?: string;
}

// 应收费用
export interface ReceivableCost {
    id: string;
    orderNo: string;
    customerId: string;
    customerName: string;
    contractNo?: string;
    currency: string;
    exchangeRate: number;
    salesman: string;
    status: CostStatus;
    billingDate: string;
    createTime: string;
    remark?: string;
    items: CostItem[];
    totalAmount: number;
    taxAmount: number;
    grandTotal: number;
    estimatedProfit?: number;
}

// 应付费用
export interface PayableCost {
    id: string;
    waybillNo: string;
    serviceType: ServiceType;
    supplierId: string;
    supplierName: string;
    contractNo?: string;
    currency: string;
    exchangeRate: number;
    operator: string;
    status: CostStatus;
    serviceDate: string;
    createTime: string;
    remark?: string;
    items: CostItem[];
    totalAmount: number;
    taxAmount: number;
    grandTotal: number;
}

// 费用总览统计
export interface CostOverviewStats {
    totalReceivable: number;
    totalPayable: number;
    grossProfit: number;
    profitMargin: number;
    pendingReceivable: number;
    pendingPayable: number;
    monthlyNew: number;
    abnormalCost: number;
}

// 费用总览项
export interface CostOverviewItem {
    id: string;
    orderNo?: string;
    waybillNo?: string;
    costType: 'RECEIVABLE' | 'PAYABLE';
    costName: string;
    amount: number;
    currency: string;
    status: CostStatus;
    customer?: string;
    supplier?: string;
    createTime: string;
}

// 搜索参数
export interface CostSearchParams {
    orderNo?: string;
    waybillNo?: string;
    customer?: string;
    supplier?: string;
    costType?: CostType;
    serviceType?: ServiceType;
    status?: CostStatus;
    startDate?: string;
    endDate?: string;
    pageNum?: number;
    pageSize?: number;
}

// 分页响应
export interface PageResponse<T> {
    list: T[];
    total: number;
    pageNum: number;
    pageSize: number;
    statistics?: unknown;
}

// 费用审核项
export interface CostReviewItem {
    id: string;
    costType: 'RECEIVABLE' | 'PAYABLE';
    orderNo: string;
    waybillNo?: string;
    customerName?: string;
    supplierId?: string;
    supplierName?: string;
    totalAmount: number;
    currency: string;
    submitTime: string;
    urgency: CostUrgency;
    status: CostStatus;
    submitter?: string;
    remark?: string;
}

// 审核请求参数
export interface ReviewRequest {
    id: string;
    comment?: string;
}

// 批量审核请求参数
export interface BatchReviewRequest {
    ids: string[];
    comment?: string;
}

export enum ManualAdjustmentApprovalStatus {
    PENDING = 'PENDING',
    APPROVED = 'APPROVED',
    REJECTED = 'REJECTED',
}

export interface ManualAdjustmentApprovalItem {
    id: string;
    adjustmentNo: string;
    orderNo: string;
    customerName: string;
    adjustmentType: string;
    adjustmentAmount: number;
    currency: string;
    reason: string;
    applicant: string;
    applyTime: string;
    status: ManualAdjustmentApprovalStatus;
    reviewer?: string;
    reviewTime?: string;
}

export interface ManualAdjustmentApprovalStats {
    totalAdjustmentAmount: number;
    pendingCount: number;
    approvedCount: number;
    rejectedCount: number;
}

export enum AllocationHistoryStatus {
    SUCCESS = 'SUCCESS',
    FAILED = 'FAILED',
}

export interface AllocationHistoryItem {
    id: string;
    allocationNo: string;
    orderNo: string;
    orderId?: string;
    customerName: string;
    allocationType: string;
    allocationBasis: string;
    allocationAmount: number;
    currency: string;
    operator: string;
    allocateTime: string;
    status: AllocationHistoryStatus;
    source: string;
}

export interface AllocationHistoryStats {
    totalCount: number;
    totalAmount: number;
    successCount: number;
    failedCount: number;
}

export interface SalesDepartmentPerformanceItem {
    id: string;
    department: string;
    manager: string;
    orderCount: number;
    totalRevenue: number;
    totalCost: number;
    grossProfit: number;
    profitMargin: number;
    completionRate: number;
    period: string;
}

export interface SalesDepartmentPerformanceStats {
    totalRevenue: number;
    totalCost: number;
    grossProfit: number;
    avgProfitMargin: number;
}

export interface OperationDepartmentProfitItem {
    id: string;
    department: string;
    operatorCount: number;
    ticketCount: number;
    teuCount: number;
    totalRevenue: number;
    totalCost: number;
    grossProfit: number;
    profitMargin: number;
}

export interface OperationDepartmentProfitStats {
    totalRevenue: number;
    totalCost: number;
    grossProfit: number;
    avgProfitMargin: number;
}

export interface ProfitTrendAnalysisItem {
    id: string;
    period: string;
    revenue: number;
    cost: number;
    totalProfit: number;
    profitMargin: number;
    salesProfit: number;
    opsProfit: number;
}

export interface ProfitTrendAnalysisStats {
    totalRevenue: number;
    totalCost: number;
    grossProfit: number;
    avgProfitMargin: number;
}

export interface DepartmentPerformanceComparisonItem {
    id: string;
    rank: number;
    department: string;
    orderCount: number;
    revenue: number;
    cost: number;
    grossProfit: number;
    profitMargin: number;
    kpiScore: number;
}

export interface DepartmentPerformanceComparisonStats {
    totalRevenue: number;
    totalCost: number;
    highestProfit: number;
    avgKpiScore: number;
}

export enum SyncType {
    COST_ALLOCATION = 'COST_ALLOCATION',
    ORDER_FEE = 'ORDER_FEE',
    BILLING = 'BILLING',
    INVOICE = 'INVOICE',
}

export enum SyncStatus {
    PENDING = 'PENDING',
    RUNNING = 'RUNNING',
    SUCCESS = 'SUCCESS',
    FAILED = 'FAILED',
}

export enum SyncScheduleType {
    REAL_TIME = 'REAL_TIME',
    HOURLY = 'HOURLY',
    DAILY = 'DAILY',
    WEEKLY = 'WEEKLY',
    CRON = 'CRON',
}

export enum SyncLogLevel {
    INFO = 'INFO',
    WARN = 'WARN',
    ERROR = 'ERROR',
}

export enum SyncExceptionStatus {
    PENDING = 'PENDING',
    PROCESSING = 'PROCESSING',
    RESOLVED = 'RESOLVED',
}

export interface SyncStatusItem {
    id: string;
    syncType: SyncType;
    status: SyncStatus;
    lastSyncTime: string;
    nextSyncTime: string;
    successRate: number;
    failedCount: number;
    pendingCount: number;
}

export interface SyncStatusStats {
    todayCount: number;
    successCount: number;
    failedCount: number;
    pendingCount: number;
}

export interface SyncTaskItem {
    id: string;
    taskNo: string;
    syncType: SyncType;
    scheduleType: SyncScheduleType;
    cronExpression?: string;
    status: SyncStatus;
    lastRunTime: string;
    nextRunTime: string;
    owner: string;
    createdTime: string;
}

export interface SyncTaskStats {
    totalCount: number;
    pendingCount: number;
    successCount: number;
    failedCount: number;
    averageDuration: number;
}

export interface SyncLogItem {
    id: string;
    logNo: string;
    syncId: string;
    syncType: SyncType;
    level: SyncLogLevel;
    status: SyncStatus;
    message: string;
    startTime: string;
    endTime: string;
    duration: number;
}

export interface SyncLogStats {
    totalCount: number;
    successCount: number;
    failedCount: number;
    averageDuration: number;
}

export interface SyncExceptionItem {
    id: string;
    exceptionNo: string;
    syncId: string;
    syncType: SyncType;
    errorType: string;
    errorMessage: string;
    status: SyncExceptionStatus;
    occurredTime: string;
    handler: string;
    handleTime: string;
    retryCount: number;
}

export interface SyncExceptionStats {
    totalCount: number;
    pendingCount: number;
    processingCount: number;
    resolvedCount: number;
}

