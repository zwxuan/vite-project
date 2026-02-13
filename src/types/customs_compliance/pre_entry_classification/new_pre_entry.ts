export interface PreEntryGoods {
    key: string | number;
    seq: number;
    name: string;
    spec: string;
    qty: number;
    unit: string;
    unit_price: number;
    total_price: number;
    hs_code: string;
}

export interface PreEntryForm {
  job_id: string;
  entry_type: string;
  trade_mode: string;
  exemption_nature: string;
  transport_mode: string;
  port_of_shipment: string;
  port_of_destination: string;
  consignee_name: string;
  consignee_address: string;
  shipper_name: string;
  shipper_address: string;
  carrier_name: string;
  vessel_name: string;
  voyage_no: string;
  bill_no: string;
  container_no: string;
  goods_list: PreEntryGoods[];
  remarks?: string;
}
