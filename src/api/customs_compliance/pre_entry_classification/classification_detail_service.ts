export interface ClassificationDetail {
  id: string;
  pre_entry_no: string;
  seq_no: number;
  product_name: string;
  spec_model: string;
  brand: string;
  usage: string;
  material: string;
  weight: string;
  dimensions: string;
  description: string;
  images: string[];
  ai_suggestion: {
    hs_code: string;
    confidence: string;
    reason: string;
    tax_rates: string;
    regulatory_conditions: string;
  };
  expert_classification: {
    hs_code: string;
    rationale: string;
    classifier: string;
    time: string;
    review_opinion: string;
  };
}

export interface HistoryReference {
  id: string;
  similar_product: string;
  hs_code: string;
  classification_time: string;
  classifier: string;
  match_rate: string;
}

export const getClassificationDetail = async (id: string) => {
  // Mock data
  return new Promise<{ success: boolean; data: ClassificationDetail }>((resolve) => {
    setTimeout(() => {
      resolve({
        success: true,
        data: {
          id: id,
          pre_entry_no: 'PRE-20231001-001',
          seq_no: 1,
          product_name: '电子测量设备',
          spec_model: 'TM-2000',
          brand: 'TECH MEASURE',
          usage: '工业测量',
          material: '金属+塑料',
          weight: '5.2KG',
          dimensions: '30×20×15CM',
          description: '数字万用表，用于电压、电流、电阻测量，带数据记录功能。工作电压：AC/DC 1000V，测量精度：±0.1%。',
          images: [],
          ai_suggestion: {
            hs_code: '902830',
            confidence: '92%',
            reason: '电子测量仪器',
            tax_rates: '进口税率 8%，增值税 13%，消费税 0%',
            regulatory_conditions: 'A（入境货物通关单）',
          },
          expert_classification: {
            hs_code: '',
            rationale: '',
            classifier: '',
            time: '',
            review_opinion: '',
          },
        },
      });
    }, 500);
  });
};

export const getHistoryReference = async (params: any) => {
  // Mock data
  return new Promise<{ success: boolean; data: HistoryReference[] }>((resolve) => {
    setTimeout(() => {
      resolve({
        success: true,
        data: [
          {
            id: '1',
            similar_product: '数字万用表',
            hs_code: '902830',
            classification_time: '2023-09-15',
            classifier: '王五',
            match_rate: '95%',
          },
          {
            id: '2',
            similar_product: '电子测试仪',
            hs_code: '902830',
            classification_time: '2023-08-20',
            classifier: '赵六',
            match_rate: '88%',
          },
        ],
      });
    }, 500);
  });
};

export const saveClassification = async (data: any) => {
  return new Promise<{ success: boolean }>((resolve) => {
    setTimeout(() => {
      resolve({ success: true });
    }, 500);
  });
};

export const submitReview = async (id: string) => {
  return new Promise<{ success: boolean }>((resolve) => {
    setTimeout(() => {
      resolve({ success: true });
    }, 500);
  });
};
