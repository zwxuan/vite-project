export interface JobItem {
    jobId: string;
    jobType: string;
    orderNo: string;
    priority: string;
    status: string;
    assignee: string;
    deadline: string;
    createTime: string;
}

export interface JobListParams {
    current?: number;
    pageSize?: number;
    jobType?: string;
    status?: string;
    assignee?: string;
    priority?: string;
    createTime?: string[];
}
