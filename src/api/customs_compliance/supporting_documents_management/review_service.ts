

export interface ReviewItem {
    id: string;
    preEntryNo: string;
    businessType: string;
    docCount: number;
    submitTime: string;
    reviewer: string;
    status: string;
}

export const getReviewList = async (params: any) => {
    // Mock
    const data: ReviewItem[] = [
        { id: '1', preEntryNo: 'PRE-001', businessType: 'import', docCount: 9, submitTime: '2023-10-03', reviewer: 'Wang Wu', status: 'reviewing' },
        { id: '2', preEntryNo: 'PRE-002', businessType: 'export', docCount: 5, submitTime: '2023-10-03', reviewer: 'Zhao Liu', status: 'pending_review' },
    ];
    return { success: true, data, total: data.length };
};
