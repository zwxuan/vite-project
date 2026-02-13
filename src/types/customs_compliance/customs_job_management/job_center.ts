export interface CustomsJobItem {
  item_no: number;
  hs_code: string;
  product_name_cn: string;
  product_name_en?: string;
  spec_model?: string; // 规格型号
  qty_1: number;
  unit_1: string;
  qty_2?: number;
  unit_2?: string;
  unit_price: number;
  total_price: number;
  currency: string;
  origin_country?: string; // 原产国
  duty_mode?: string; // 征免方式
}

export interface CustomsJob {
  job_id: string;
  order_id: string;
  upstream_order_no: string;
  contract_no?: string;
  customer_id: string;
  customer_name: string;
  business_type: string;
  transport_mode: string;
  declaration_no: string;
  
  // New Header Fields
  pre_entry_no?: string; // 预录入号
  customs_no?: string; // 海关编号
  trade_mode?: string; // 监管方式
  cut_mode?: string; // 征免性质
  origin_country?: string; // 启运国
  destination_country?: string; // 运抵国
  pack_no?: number; // 件数
  pack_type?: string; // 包装种类
  gross_weight_unit?: string; // 毛重单位
  net_weight_unit?: string; // 净重单位

  // Stakeholders
  consignor_cname?: string; // 发货人中文
  consignor_ename?: string; // 发货人英文
  consignee_cname?: string; // 收货人中文
  consignee_ename?: string; // 收货人英文
  notify_party?: string; // 通知人

  status: string;
  sla_status: string;
  priority: string;
  assigned_to: string;
  assigned_to_name: string;
  port_code: string;
  vessel_name?: string;
  voyage_no?: string;
  mbl_no?: string;
  etd?: string;
  eta?: string;
  created_at: string;
  sla_deadline: string;
  
  gross_weight?: number;
  net_weight?: number;
  quantity?: number; // Total quantity
  packaging_type?: string;
  remarks?: string;

  // Item List
  goods_items?: CustomsJobItem[];

  // Archive Info
  archive_date?: string;
  archive_reason?: string;
  archived_by?: string;
}

export interface JobCenterSearchParams {
  page?: number;
  pageSize?: number;
  status?: string;
  business_type?: string;
  customer_name?: string;
  assigned_to?: string;
  date_range?: [string, string];
  keyword?: string;
  archive_reason?: string;
  archive_date_range?: [string, string];
}
