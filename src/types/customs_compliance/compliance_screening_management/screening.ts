export interface ScreeningTask {
  id: string;
  screeningId: string;
  jobId: string;
  type: 'COMPREHENSIVE' | 'QUICK' | 'TARGETED';
  riskLevel: 'HIGH' | 'MEDIUM' | 'LOW';
  hits: number;
  status: 'COMPLETED' | 'PENDING' | 'PROCESSING';
  processor: string;
  createTime: string;
}
