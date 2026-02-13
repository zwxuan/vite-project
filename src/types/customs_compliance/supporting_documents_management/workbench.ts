export interface DocumentWorkbenchItem {
  id: string;
  preEntryNo: string;
  businessType: string;
  clientName: string;
  urgency: 'high' | 'medium' | 'low';
  deadline: string;
  totalDocs: number;
  collectedDocs: number;
  pendingReviewDocs: number;
  status: string;
  owner: string;
  createTime: string;
}

export interface WorkbenchStats {
    todayNew: number;
    collecting: number;
    pendingReview: number;
    completed: number;
    overdue: number;
}

export interface EmergencyAlert {
    id: string;
    content: string;
}
