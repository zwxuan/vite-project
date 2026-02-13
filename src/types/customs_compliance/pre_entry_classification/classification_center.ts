export interface ClassificationTask {
  id: string;
  pre_entry_no: string;
  seq_no: number;
  goods_name: string;
  spec_model: string;
  classification_status: string; // pending, classifying, pending_review, completed, revision
  suggested_hscode: string;
  classifier: string;
  create_time: string;
  priority: string;
  mode: string; // auto, manual
}

export interface ClassificationStats {
    pending: number;
    classifying: number;
    pendingReview: number;
    completed: number;
    revision: number;
}
