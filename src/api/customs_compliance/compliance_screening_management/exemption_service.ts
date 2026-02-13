import { message } from 'antd';
import { ExemptionRequest } from '@/types/customs_compliance/compliance_screening_management/exemption';


// Mock Data
let dataSource: ExemptionRequest[] = [
  { id: 'EXM-001', screeningId: 'SCR-001', entity: 'Shanghai Electronics', risk: 'High', applicant: 'Zhang San', status: 'Pending', createTime: '2023-10-27 10:00:00', reason: 'Strategic partner', comments: '' },
  { id: 'EXM-002', screeningId: 'SCR-002', entity: 'ABC Corp', risk: 'Medium', applicant: 'Li Si', status: 'Approved', createTime: '2023-10-26 14:30:00', reason: 'False positive confirmed', comments: 'Approved by Manager' },
  { id: 'EXM-003', screeningId: 'SCR-003', entity: 'XYZ Logistics', risk: 'High', applicant: 'Wang Wu', status: 'Rejected', createTime: '2023-10-25 09:15:00', reason: 'High risk verified', comments: 'Risk too high' },
];

export const getExemptionList = async (params: any) => {
  return new Promise<{ list: ExemptionRequest[], total: number }>((resolve) => {
    setTimeout(() => {
      let filtered = [...dataSource];
      if (params.requestId) {
        filtered = filtered.filter(item => item.id.includes(params.requestId));
      }
      if (params.screeningId) {
        filtered = filtered.filter(item => item.screeningId.includes(params.screeningId));
      }
      if (params.status) {
        filtered = filtered.filter(item => item.status === params.status);
      }
      resolve({
        list: filtered,
        total: filtered.length,
      });
    }, 500);
  });
};

export const createExemption = async (data: Partial<ExemptionRequest>) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const newRequest: ExemptionRequest = {
        id: `EXM-${Date.now().toString().slice(-4)}`,
        screeningId: data.screeningId || 'SCR-NEW',
        entity: data.entity || 'Unknown Entity',
        risk: data.risk || 'Medium',
        applicant: 'CurrentUser',
        status: 'Pending',
        createTime: new Date().toLocaleString(),
        reason: data.reason,
        comments: '',
      };
      dataSource.unshift(newRequest);
      resolve(newRequest);
    }, 500);
  });
};

export const approveExemption = async (id: string) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      dataSource = dataSource.map(item => 
        item.id === id ? { ...item, status: 'Approved' } : item
      );
      resolve(true);
    }, 500);
  });
};

export const rejectExemption = async (id: string) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      dataSource = dataSource.map(item => 
        item.id === id ? { ...item, status: 'Rejected' } : item
      );
      resolve(true);
    }, 500);
  });
};

export const batchApproveExemptions = async (ids: string[]) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      dataSource = dataSource.map(item => 
        ids.includes(item.id) ? { ...item, status: 'Approved' } : item
      );
      resolve(true);
    }, 500);
  });
};

export const batchRejectExemptions = async (ids: string[]) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      dataSource = dataSource.map(item => 
        ids.includes(item.id) ? { ...item, status: 'Rejected' } : item
      );
      resolve(true);
    }, 500);
  });
};

export const getExemptionDetail = async (id: string) => {
    return new Promise<ExemptionRequest | undefined>((resolve) => {
        setTimeout(() => {
            const item = dataSource.find(d => d.id === id);
            resolve(item);
        }, 300);
    });
}
