
export interface DocumentItem {
  id: string;
  code: string;
  type: string;
  waybill_no: string;
  customer: string;
  status: string; // 'Draft' | 'PendingReview' | 'Approved' | 'Rejected' | 'Issued'
  create_time: string;
  carrier: string;
  creator: string;
  reviewer?: string;
  review_time?: string;
  version: string;
  template_id?: string;
  pol?: string;
  pod?: string;
  vessel?: string;
  voyage?: string;
}

export interface DocumentListParams {
  current?: number;
  pageSize?: number;
  code?: string;
  type?: string;
  waybill_no?: string;
  customer?: string;
  status?: string;
  start_time?: string;
  end_time?: string;
}

export interface DocumentDetail extends DocumentItem {
  content: string; // JSON or HTML content
  attachments: Attachment[];
  logs: OperationLog[];
  versions: DocumentVersion[];
  cargo: Cargo[];
  transport: Transport[];
}

export interface Attachment {
  id: string;
  name: string;
  url: string;
  type: string;
  size: number;
  upload_time: string;
}

export interface OperationLog {
  id: string;
  operator: string;
  action: string;
  time: string;
  comment?: string;
}

export interface DocumentVersion {
  id: string;
  version: string;
  create_time: string;
  creator: string;
  change_log: string;
}

export interface DocumentTemplate {
  id: string;
  name: string;
  category: string;
  version: string;
  status: string;
  content: string;
  fields: string; // JSON config for fields
  create_time: string;
  update_time: string;
}

export interface DocumentStatistic {
  pending_generate: number;
  pending_review: number;
  issued: number;
  exception: number;
  trend: { date: string; count: number }[];
}
