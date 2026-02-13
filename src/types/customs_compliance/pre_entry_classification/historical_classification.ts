export interface HistoryItem {
  id: string;
  invoice_no: string;
  product_name: string;
  hs_code: string;
  declared_price: number;
  currency: string;
  entry_id: string;
  entry_date: string;
  // Professional fields
  trade_mode?: string;
  origin_country?: string;
  destination_country?: string;
  gross_weight?: string;
  net_weight?: string;
}
