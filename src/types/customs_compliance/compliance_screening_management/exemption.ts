export interface ExemptionRequest {
  id: string;
  screeningId: string;
  entity: string;
  risk: string;
  applicant: string;
  status: 'Pending' | 'Approved' | 'Rejected';
  createTime: string;
  reason?: string;
  comments?: string;
}
