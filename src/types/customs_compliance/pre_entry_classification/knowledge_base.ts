export interface KnowledgeItem {
  id: string;
  title: string;
  type: string; // case, rule, guide
  category: string;
  applicable_goods: string;
  hs_code: string;
  creator: string;
  create_time: string;
  content?: string;
}
