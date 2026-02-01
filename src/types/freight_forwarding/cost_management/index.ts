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
    statistics?: any;
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

