import request, { ApiRes } from '../../request';
import { JobItem, JobListParams } from '@/types/freight_forwarding/job_management';

const mockData: JobItem[] = [
    { jobId: 'JOB-001', jobType: 'BOOKING_JOB', orderNo: 'ORD-001', priority: 'HIGH', status: 'IN_PROGRESS', assignee: 'Alice', deadline: '2024-03-25', createTime: '2024-03-15' },
    { jobId: 'JOB-002', jobType: 'CUSTOMS_JOB', orderNo: 'ORD-001', priority: 'MEDIUM', status: 'PENDING', assignee: 'Bob', deadline: '2024-03-20', createTime: '2024-03-16' },
    { jobId: 'JOB-003', jobType: 'WAYBILL_JOB', orderNo: 'ORD-002', priority: 'LOW', status: 'COMPLETED', assignee: 'Charlie', deadline: '2024-03-18', createTime: '2024-03-10' },
    { jobId: 'JOB-004', jobType: 'TRUCKING_JOB', orderNo: 'ORD-003', priority: 'HIGH', status: 'CANCELLED', assignee: 'David', deadline: '2024-03-22', createTime: '2024-03-14' },
    { jobId: 'JOB-005', jobType: 'WAREHOUSE_JOB', orderNo: 'ORD-004', priority: 'MEDIUM', status: 'ASSIGNED', assignee: 'Eve', deadline: '2024-03-28', createTime: '2024-03-17' },
    { jobId: 'JOB-006', jobType: 'DOCUMENT_JOB', orderNo: 'ORD-005', priority: 'LOW', status: 'IN_PROGRESS', assignee: 'Frank', deadline: '2024-03-30', createTime: '2024-03-18' },
    { jobId: 'JOB-007', jobType: 'BOOKING_JOB', orderNo: 'ORD-006', priority: 'HIGH', status: 'PENDING', assignee: 'Grace', deadline: '2024-04-01', createTime: '2024-03-19' },
    { jobId: 'JOB-008', jobType: 'CUSTOMS_JOB', orderNo: 'ORD-007', priority: 'MEDIUM', status: 'COMPLETED', assignee: 'Heidi', deadline: '2024-03-15', createTime: '2024-03-05' },
    { jobId: 'JOB-009', jobType: 'WAYBILL_JOB', orderNo: 'ORD-008', priority: 'LOW', status: 'ASSIGNED', assignee: 'Ivan', deadline: '2024-04-05', createTime: '2024-03-20' },
    { jobId: 'JOB-010', jobType: 'TRUCKING_JOB', orderNo: 'ORD-009', priority: 'HIGH', status: 'IN_PROGRESS', assignee: 'Judy', deadline: '2024-04-10', createTime: '2024-03-21' },
    { jobId: 'JOB-011', jobType: 'WAREHOUSE_JOB', orderNo: 'ORD-010', priority: 'MEDIUM', status: 'PENDING', assignee: 'Kevin', deadline: '2024-04-15', createTime: '2024-03-22' },
];

export const getJobList = async (params: JobListParams): Promise<ApiRes<{ list: JobItem[], total: number }>> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Simple filtering
    let filtered = [...mockData];
    if (params.jobType) {
        filtered = filtered.filter(item => item.jobType === params.jobType);
    }
    if (params.status) {
        filtered = filtered.filter(item => item.status === params.status);
    }

    return {
        data: {
            list: filtered,
            total: filtered.length,
        },
        success: true,
        code: 200,
        message: 'success'
    };
};
