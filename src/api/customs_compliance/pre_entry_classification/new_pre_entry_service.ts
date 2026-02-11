
import { PreEntryTask } from './pre_entry_workbench_service';

export interface PreEntryForm {
  job_id: string;
  entry_type: string;
  trade_mode: string;
  transport_mode: string;
  consignee_name: string;
  shipper_name: string;
  goods_list: any[];
}

export async function createPreEntry(data: PreEntryForm) {
  // Mock create
  return new Promise<{ success: boolean; data: any }>((resolve) => {
    setTimeout(() => {
        resolve({
            success: true,
            data: {
              id: 'mock-id-123',
              pre_entry_no: 'PRE-MOCK-001',
            },
          });
    }, 500);
  });
}

export async function updatePreEntry(id: string, data: PreEntryForm) {
    // Mock update
    return new Promise<{ success: boolean }>((resolve) => {
      setTimeout(() => {
          resolve({
              success: true
            });
      }, 500);
    });
  }

export async function getPreEntryDetail(id: string) {
    // Mock get detail
    return new Promise<{ success: boolean; data: any }>((resolve) => {
        setTimeout(() => {
            resolve({
                success: true,
                data: {
                    id: id,
                    job_id: 'JOB-2023-001',
                    entry_type: 'import',
                    trade_mode: 'general',
                    transport_mode: 'sea',
                    consignee_name: 'Mock Consignee Ltd',
                    shipper_name: 'Mock Shipper Inc',
                    goods_list: [
                        {
                            key: 1,
                            seq: 1,
                            name: 'Mock Goods A',
                            spec: 'Spec A',
                            qty: 100,
                            unit: 'PCS'
                        }
                    ]
                }
            });
        }, 500);
    });
}

export async function getJobOptions(keyword: string) {
    // Mock job search
    return {
        success: true,
        data: [
            { label: 'JOB-2023-001', value: 'JOB-2023-001' },
            { label: 'JOB-2023-002', value: 'JOB-2023-002' },
        ]
    };
}
