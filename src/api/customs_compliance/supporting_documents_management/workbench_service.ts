

export interface DocumentWorkbenchItem {
  id: string;
  preEntryNo: string;
  businessType: string;
  totalDocs: number;
  collectedDocs: number;
  pendingReviewDocs: number;
  status: string;
  owner: string;
  createTime: string;
}

export const getDocumentWorkbenchList = async (params: any) => {
  // Mock data
  const data: DocumentWorkbenchItem[] = [
    {
      id: '1',
      preEntryNo: 'PRE-001',
      businessType: 'import',
      totalDocs: 8,
      collectedDocs: 6,
      pendingReviewDocs: 2,
      status: 'collecting',
      owner: 'Zhang San',
      createTime: '2023-10-01',
    },
    {
      id: '2',
      preEntryNo: 'PRE-002',
      businessType: 'export',
      totalDocs: 5,
      collectedDocs: 5,
      pendingReviewDocs: 0,
      status: 'pending_review',
      owner: 'Li Si',
      createTime: '2023-10-02',
    },
    // Add more mock data as needed
    {
        id: '3',
        preEntryNo: 'PRE-003',
        businessType: 'import',
        totalDocs: 10,
        collectedDocs: 3,
        pendingReviewDocs: 0,
        status: 'collecting',
        owner: 'Wang Wu',
        createTime: '2023-10-03',
    }
  ];

  return {
    data,
    total: data.length,
    success: true,
  };
};
