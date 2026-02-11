

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

export async function getClassificationList(params: any) {
  // Mock data
  const data: ClassificationTask[] = [
    {
      id: '1',
      pre_entry_no: 'PRE-20231001-001',
      seq_no: 1,
      goods_name: 'Electronic Measuring Device',
      spec_model: 'TM-2000',
      classification_status: 'pending',
      suggested_hscode: '-',
      classifier: '-',
      create_time: '2023-10-01',
      priority: 'normal',
      mode: 'auto',
    },
    {
      id: '2',
      pre_entry_no: 'PRE-20231001-001',
      seq_no: 2,
      goods_name: 'Software Package',
      spec_model: 'V2.0',
      classification_status: 'classifying',
      suggested_hscode: '852351',
      classifier: 'Wang Wu',
      create_time: '2023-10-01',
      priority: 'high',
      mode: 'manual',
    },
    {
        id: '3',
        pre_entry_no: 'PRE-20231001-002',
        seq_no: 1,
        goods_name: 'Mechanical Parts',
        spec_model: 'MP-100',
        classification_status: 'completed',
        suggested_hscode: '848180',
        classifier: 'Zhao Liu',
        create_time: '2023-10-02',
        priority: 'normal',
        mode: 'auto',
    }
  ];

  return {
    data,
    success: true,
    total: data.length,
  };
}

export async function getClassificationStats() {
    const stats: ClassificationStats = {
        pending: 25,
        classifying: 8,
        pendingReview: 15,
        completed: 42,
        revision: 3,
    };
    return {
        data: stats,
        success: true,
    };
}

export async function batchClassify(ids: string[]) {
    return { success: true };
}
