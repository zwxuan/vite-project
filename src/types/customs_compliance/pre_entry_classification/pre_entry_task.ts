export interface PreEntryTask {
  id: string;
  pre_entry_no: string;
  job_no: string;
  entry_type: string; // import/export
  trade_mode: string;
  handler: string;
  create_time: string;
  goods_count: number;
  classification_status: string; // pending, classifying, completed
  status: string; // draft, submitted, etc.
}
