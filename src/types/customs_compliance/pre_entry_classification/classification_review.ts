export interface ReviewTask {
  id: string;
  invoice_no: string;
  product_name: string;
  hs_code: string;
  declared_price: number;
  currency: string;
  status: string;
  reviewer: string;
  review_time: string;
}
