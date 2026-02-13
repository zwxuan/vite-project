

import React from 'react';
import { DocumentWorkbenchItem, WorkbenchStats, EmergencyAlert } from '@/types/customs_compliance/supporting_documents_management/workbench';

export const getDocumentWorkbenchList = async (params: any) => {
  // Mock data
  const data: DocumentWorkbenchItem[] = [
    {
      id: '1',
      preEntryNo: 'PRE-001',
      businessType: 'import',
      clientName: 'Shanghai Trading Co.',
      urgency: 'high',
      deadline: '2023-10-10',
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
      clientName: 'Beijing Tech Ltd.',
      urgency: 'medium',
      deadline: '2023-10-15',
      totalDocs: 5,
      collectedDocs: 5,
      pendingReviewDocs: 0,
      status: 'pending_review',
      owner: 'Li Si',
      createTime: '2023-10-02',
    },
    {
        id: '3',
        preEntryNo: 'PRE-003',
        businessType: 'import',
        clientName: 'Guangzhou Logistics',
        urgency: 'low',
        deadline: '2023-10-20',
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

export const getWorkbenchStats = async () => {
    return {
        success: true,
        data: {
            stats: {
                todayNew: 12,
                collecting: 25,
                pendingReview: 18,
                completed: 45,
                overdue: 3
            },
            alerts: [
                { id: '1', content: 'PRE-003 原产地证即将过期，请及时更新' },
                { id: '2', content: 'PRE-005 3C证书缺失，影响通关进度' },
                { id: '3', content: 'PRE-007 发票金额与合同不符，需要确认' }
            ]
        }
    };
};

export const batchCollect = async (ids: React.Key[]) => {
    return { success: true };
};

export const batchReview = async (ids: React.Key[]) => {
    return { success: true };
};

export const batchUrge = async (ids: React.Key[]) => {
    return { success: true };
};
