// --- Types ---
export interface AllocationStats {
  totalIncome: number;
  salesIncome: number;
  opsIncome: number;
  completionRate: number;
  pendingCount: number;
  exceptionCount: number;
  manualCount: number;
  newCount: number;
}

export interface AllocationItem {
  orderNo: string;
  allocationNo?: string;
  customerName: string;
  totalIncome: number;
  salesIncome: number;
  opsIncome: number;
  status: string;
  salesman: string;
  id: string;
  ruleName?: string;
}

export interface RuleStats {
  activeCount: number;
  pendingCount: number;
  draftCount: number;
  disabledCount: number;
}

export interface RuleItem {
  id: string;
  ruleId: string;
  ruleName: string;
  ruleType: string;
  status: 'active' | 'pending' | 'draft' | 'disabled';
  creator: string;
  createTime: string;
}

export interface RuleDetail extends RuleItem {
  description: string;
  // Complex rule config fields would go here
  customerConfig: Array<{
    type: string;
    rate: number;
    min: number;
    max: number;
    status: string;
  }>;
  deptConfig: Array<{
    deptName: string;
    baseWeight: number;
    adjustCoeff: number;
    effectiveWeight: number;
    status: string;
  }>;
  complexityConfig: Array<{
    slaRate: string;
    adjustCoeff: number;
    description: string;
  }>;
}

// --- Mock Data ---

const MOCK_ALLOCATION_STATS: AllocationStats = {
  totalIncome: 1234567,
  salesIncome: 246913,
  opsIncome: 987654,
  completionRate: 95.2,
  pendingCount: 8,
  exceptionCount: 3,
  manualCount: 12,
  newCount: 156,
};

const MOCK_ALLOCATION_LIST: AllocationItem[] = [
  { id: '1', orderNo: 'ORD001', allocationNo: 'ALC-20240101-001', customerName: 'Customer A', totalIncome: 50000, salesIncome: 10000, opsIncome: 40000, status: 'allocated', salesman: 'John Doe', ruleName: 'Seafreight Allocation' },
  { id: '2', orderNo: 'ORD002', allocationNo: 'ALC-20240103-002', customerName: 'Customer B', totalIncome: 75000, salesIncome: 15000, opsIncome: 60000, status: 'allocated', salesman: 'Jane Smith', ruleName: 'Sales Commission' },
  { id: '4', orderNo: 'ORD004', allocationNo: 'ALC-20240107-003', customerName: 'Customer D', totalIncome: 100000, salesIncome: 20000, opsIncome: 80000, status: 'exception', salesman: 'Alice Williams', ruleName: 'Port Misc' },
  { id: '5', orderNo: 'ORD005', allocationNo: 'ALC-20240109-004', customerName: 'Customer E', totalIncome: 45000, salesIncome: 9000, opsIncome: 36000, status: 'allocated', salesman: 'Charlie Brown', ruleName: 'Seafreight Allocation' },
];

const MOCK_RULE_STATS: RuleStats = {
  activeCount: 15,
  pendingCount: 3,
  draftCount: 7,
  disabledCount: 12,
};

const MOCK_RULE_LIST: RuleItem[] = [
  { id: '1', ruleId: 'R001', ruleName: 'Seafreight Allocation', ruleType: 'Weight', status: 'active', creator: 'John Doe', createTime: '2023-01-15' },
  { id: '2', ruleId: 'R002', ruleName: 'Sales Commission', ruleType: 'Ratio', status: 'pending', creator: 'Jane Smith', createTime: '2023-01-16' },
  { id: '3', ruleId: 'R003', ruleName: 'Ops Fee', ruleType: 'Fixed', status: 'draft', creator: 'Bob Johnson', createTime: '2023-01-17' },
  { id: '4', ruleId: 'R004', ruleName: 'Port Misc', ruleType: 'Weight', status: 'disabled', creator: 'Alice Williams', createTime: '2023-01-10' },
];

const MOCK_RULE_DETAIL: RuleDetail = {
  ...MOCK_RULE_LIST[0],
  description: 'Standard seafreight cost allocation rule based on department weight.',
  customerConfig: [
    { type: 'New Customer', rate: 25, min: 1000, max: 50000, status: 'Active' },
    { type: 'Existing Customer', rate: 20, min: 800, max: 40000, status: 'Active' },
    { type: 'VIP Customer', rate: 15, min: 1500, max: 60000, status: 'Active' },
  ],
  deptConfig: [
    { deptName: 'Booking Dept', baseWeight: 0.25, adjustCoeff: 1.0, effectiveWeight: 0.25, status: 'Active' },
    { deptName: 'Ops Dept', baseWeight: 0.30, adjustCoeff: 1.1, effectiveWeight: 0.33, status: 'Active' },
    { deptName: 'Doc Dept', baseWeight: 0.20, adjustCoeff: 1.0, effectiveWeight: 0.20, status: 'Active' },
    { deptName: 'Customs Dept', baseWeight: 0.25, adjustCoeff: 0.9, effectiveWeight: 0.225, status: 'Active' },
  ],
  complexityConfig: [
    { slaRate: '> 95%', adjustCoeff: 1.2, description: 'Excellent performance, +20%' },
    { slaRate: '90-94%', adjustCoeff: 1.0, description: 'Standard performance' },
    { slaRate: '85-89%', adjustCoeff: 0.9, description: 'Average performance, -10%' },
    { slaRate: '< 85%', adjustCoeff: 0.8, description: 'Poor performance, -20%' },
  ],
};

// --- Service Methods ---

export async function queryAllocationStats(): Promise<AllocationStats> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(MOCK_ALLOCATION_STATS);
    }, 500);
  });
}

export async function queryAllocationList(params: any): Promise<{ data: AllocationItem[], total: number }> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        data: MOCK_ALLOCATION_LIST,
        total: MOCK_ALLOCATION_LIST.length,
      });
    }, 500);
  });
}

export async function queryRuleStats(): Promise<RuleStats> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(MOCK_RULE_STATS);
    }, 500);
  });
}

export async function queryRuleList(params: any): Promise<{ data: RuleItem[], total: number }> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        data: MOCK_RULE_LIST,
        total: MOCK_RULE_LIST.length,
      });
    }, 500);
  });
}

export async function queryRuleDetail(id: string): Promise<RuleDetail> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(MOCK_RULE_DETAIL);
    }, 500);
  });
}
