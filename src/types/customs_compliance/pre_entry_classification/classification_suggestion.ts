export interface ClassificationSuggestion {
  id: string;
  product_name: string;
  hs_code: string;
  confidence: number;
  source: string; // AI, Rule, History
  create_time: string;
  status: string; // applied, ignored
  // Professional fields
  description?: string;
  elements?: string;
  duty_rate?: string;
  vat_rate?: string;
}
