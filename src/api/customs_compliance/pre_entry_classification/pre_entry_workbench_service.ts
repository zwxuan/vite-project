

import { PreEntryTask } from '@/types/customs_compliance/pre_entry_classification/pre_entry_task';


export async function getPreEntryList(params: any) {
  // Mock data
  const data: PreEntryTask[] = [
    {
      id: '1',
      pre_entry_no: 'PRE-20231001-001',
      job_no: 'JOB-2023-001',
      entry_type: 'import',
      trade_mode: 'general',
      handler: 'Zhang San',
      create_time: '2023-10-01',
      goods_count: 5,
      classification_status: 'completed',
      status: 'pending_review',
    },
    {
      id: '2',
      pre_entry_no: 'PRE-20231001-002',
      job_no: 'JOB-2023-002',
      entry_type: 'export',
      trade_mode: 'processing',
      handler: 'Li Si',
      create_time: '2023-10-02',
      goods_count: 3,
      classification_status: 'pending',
      status: 'draft',
    },
    {
        id: '3',
        pre_entry_no: 'PRE-20231001-003',
        job_no: 'JOB-2023-003',
        entry_type: 'import',
        trade_mode: 'general',
        handler: 'Wang Wu',
        create_time: '2023-10-03',
        goods_count: 12,
        classification_status: 'classifying',
        status: 'processing',
    }
  ];

  return {
    data,
    success: true,
    total: data.length,
  };
}

export async function batchDeletePreEntry(ids: string[]) {
    return { success: true };
}

export async function batchSubmitPreEntry(ids: string[]) {
    return { success: true };
}
