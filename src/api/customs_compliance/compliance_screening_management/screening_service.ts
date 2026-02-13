import { ScreeningTask } from '@/types/customs_compliance/compliance_screening_management/screening';


const mockTasks: ScreeningTask[] = [
  {
    id: '1',
    screeningId: 'SCR-20231001-001',
    jobId: 'JOB-001',
    type: 'COMPREHENSIVE',
    riskLevel: 'LOW',
    hits: 0,
    status: 'COMPLETED',
    processor: '张三',
    createTime: '2023-10-01 10:30:00',
  },
  {
    id: '2',
    screeningId: 'SCR-20231001-002',
    jobId: 'JOB-002',
    type: 'QUICK',
    riskLevel: 'HIGH',
    hits: 2,
    status: 'PENDING',
    processor: '李四',
    createTime: '2023-10-01 11:00:00',
  },
  {
    id: '3',
    screeningId: 'SCR-20231001-003',
    jobId: 'JOB-003',
    type: 'TARGETED',
    riskLevel: 'MEDIUM',
    hits: 1,
    status: 'PROCESSING',
    processor: '王五',
    createTime: '2023-10-02 09:15:00',
  },
];

// Generate more mock data
for (let i = 4; i <= 20; i++) {
  mockTasks.push({
    id: String(i),
    screeningId: `SCR-2023100${i}-00${i}`,
    jobId: `JOB-00${i}`,
    type: i % 3 === 0 ? 'COMPREHENSIVE' : i % 3 === 1 ? 'QUICK' : 'TARGETED',
    riskLevel: i % 3 === 0 ? 'LOW' : i % 3 === 1 ? 'HIGH' : 'MEDIUM',
    hits: i % 3 === 0 ? 0 : Math.floor(Math.random() * 5),
    status: i % 3 === 0 ? 'COMPLETED' : i % 3 === 1 ? 'PENDING' : 'PROCESSING',
    processor: ['张三', '李四', '王五'][i % 3],
    createTime: `2023-10-${String(i).padStart(2, '0')} 10:00:00`,
  });
}

export const getScreeningTaskList = async (params: any) => {
  // Simulate API call
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        data: {
          list: mockTasks,
          total: mockTasks.length,
        },
        success: true,
      });
    }, 500);
  });
};
