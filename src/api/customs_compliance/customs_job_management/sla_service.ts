import request, { ApiRes } from '@/api/request';

export const getSlaMonitorData = async (): Promise<ApiRes<any>> => {
    // Mock data for trend chart (Last 30 days)
    const trendData = [];
    const today = new Date();
    for (let i = 29; i >= 0; i--) {
        const date = new Date(today);
        date.setDate(today.getDate() - i);
        trendData.push({
            date: date.toISOString().split('T')[0],
            value: 85 + Math.floor(Math.random() * 15) // Random value between 85 and 100
        });
    }

    return {
        code: 0,
        success: true,
        data: {
            summary: {
                severe_overdue: 3,
                soon_overdue: 15,
                normal: 234,
                avg_duration: '18.5h',
                sla_rate: '94.2%',
                today_warning: 8
            },
            trend: trendData,
            warning_list: [
                { 
                    key: '1',
                    warning_level: 'severe', 
                    job_id: 'JOB-COM-001', 
                    business_type: 'Import Declaration', 
                    customer: 'ABC Company', 
                    handler: 'John Doe', 
                    remaining_time: '-2h', 
                    completion_rate: 85,
                    status: 'Processing'
                },
                { 
                    key: '2',
                    warning_level: 'warning', 
                    job_id: 'JOB-COM-002', 
                    business_type: 'Export Declaration', 
                    customer: 'XYZ Ltd', 
                    handler: 'Jane Smith', 
                    remaining_time: '1.5h', 
                    completion_rate: 60,
                    status: 'Processing'
                },
                { 
                    key: '3',
                    warning_level: 'notice', 
                    job_id: 'JOB-COM-003', 
                    business_type: 'Transit', 
                    customer: 'DEF Corp', 
                    handler: 'Mike Brown', 
                    remaining_time: '4h', 
                    completion_rate: 40,
                    status: 'Processing'
                },
                { 
                    key: '4',
                    warning_level: 'notice', 
                    job_id: 'JOB-COM-004', 
                    business_type: 'Bonded', 
                    customer: 'GHI Logistics', 
                    handler: 'Sarah Wilson', 
                    remaining_time: '5h', 
                    completion_rate: 30,
                    status: 'Pending'
                },
                { 
                    key: '5',
                    warning_level: 'warning', 
                    job_id: 'JOB-COM-005', 
                    business_type: 'Import Declaration', 
                    customer: 'JKL Trading', 
                    handler: 'Tom Lee', 
                    remaining_time: '1h', 
                    completion_rate: 70,
                    status: 'Processing'
                }
            ]
        },
        message: 'success'
    }
}

export const urgeJob = async (jobId: string): Promise<ApiRes<any>> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({
                code: 0,
                success: true,
                data: null,
                message: 'Urge notification sent successfully'
            });
        }, 500);
    });
}

export const remindJob = async (jobId: string): Promise<ApiRes<any>> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({
                code: 0,
                success: true,
                data: null,
                message: 'Reminder sent successfully'
            });
        }, 500);
    });
}
