
import { PreEntryTask } from '@/types/customs_compliance/pre_entry_classification/pre_entry_task';


export async function searchPreEntryList(params: any) {
  // Mock data - simulating historical search results
  const data: PreEntryTask[] = [
    {
      id: '1',
      pre_entry_no: 'PRE-20230901-001',
      job_no: 'JOB-2023-088',
      entry_type: 'import',
      trade_mode: 'general',
      handler: 'Zhang San',
      create_time: '2023-09-01',
      goods_count: 10,
      classification_status: 'completed',
      status: 'submitted',
    },
    {
      id: '2',
      pre_entry_no: 'PRE-20230902-002',
      job_no: 'JOB-2023-089',
      entry_type: 'export',
      trade_mode: 'processing',
      handler: 'Li Si',
      create_time: '2023-09-02',
      goods_count: 8,
      classification_status: 'completed',
      status: 'submitted',
    },
    {
        id: '3',
        pre_entry_no: 'PRE-20230903-005',
        job_no: 'JOB-2023-092',
        entry_type: 'import',
        trade_mode: 'general',
        handler: 'Wang Wu',
        create_time: '2023-09-03',
        goods_count: 2,
        classification_status: 'completed',
        status: 'submitted',
    }
  ];

  return {
    data,
    success: true,
    total: data.length,
  };
}
