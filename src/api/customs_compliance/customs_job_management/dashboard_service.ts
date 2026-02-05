import request, { ApiRes } from '@/api/request';

export const getDashboardData = async (): Promise<ApiRes<any>> => {
  const mockItem = (id: string, status: string, customer: string) => ({
    job_id: id,
    customer_name: customer,
    business_type: '进口报关',
    status: status,
    priority: Math.random() > 0.7 ? 'high' : 'normal',
    sla_status: 'normal',
    created_at: '2024-03-20',
    assigned_to_name: '张三'
  });

  const generateItems = (startId: number, count: number, status: string, baseName: string) => {
      return Array.from({length: count}).map((_, i) => mockItem(`JOB-${String(startId + i).padStart(3, '0')}`, status, `${baseName} ${(i+1)}`));
  };

  return {
    code: 0,
    success: true,
    data: {
        total: 1000,
        today: 10,
        columns: {
            pending: { 
                title: '待分派', 
                count: 45, 
                items: [
                    mockItem('JOB-001', 'pending', 'TechWave'),
                    mockItem('JOB-002', 'pending', 'Global Logistics'),
                    mockItem('JOB-003', 'pending', 'Fresh Foods'),
                    ...generateItems(100, 15, 'pending', 'Pending Client')
                ] 
            },
            assigned: { 
                title: '已分派', 
                count: 67, 
                items: [
                     mockItem('JOB-004', 'assigned', 'AutoParts'),
                     mockItem('JOB-005', 'assigned', 'Fashion Trends'),
                     ...generateItems(200, 10, 'assigned', 'Assigned Client')
                ] 
            },
            processing: { 
                title: '进行中', 
                count: 89, 
                items: [
                    mockItem('JOB-006', 'processing', 'MegaCorp'),
                    mockItem('JOB-007', 'processing', 'TinyTools'),
                    mockItem('JOB-008', 'processing', 'SoftSys'),
                    mockItem('JOB-009', 'processing', 'HardWarez'),
                    ...generateItems(300, 20, 'processing', 'Processing Corp')
                ] 
            },
            auditing: { 
                title: '待审核', 
                count: 23, 
                items: [
                    mockItem('JOB-010', 'auditing', 'AuditMe'),
                    ...generateItems(400, 8, 'auditing', 'Audit Firm')
                ] 
            },
            completed: { 
                title: '已完成', 
                count: 156, 
                items: [
                    mockItem('JOB-011', 'completed', 'DoneDeal'),
                    mockItem('JOB-012', 'completed', 'FinishedGoods'),
                    ...generateItems(500, 5, 'completed', 'Completed Co')
                ] 
            },
            archived: { 
                title: '已归档', 
                count: 89, 
                items: [] 
            },
        }
    },
    message: 'success'
  };
};
