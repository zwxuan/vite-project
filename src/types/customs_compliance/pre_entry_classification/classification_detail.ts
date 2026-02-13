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
