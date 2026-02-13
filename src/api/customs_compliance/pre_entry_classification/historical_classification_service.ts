

import { HistoryItem } from '@/types/customs_compliance/pre_entry_classification/historical_classification';


export async function searchHistory(params: any) {
  // Mock data
  const data: HistoryItem[] = [
    {
      id: '1',
      invoice_no: 'INV-2022001',
      product_name: 'Old Router',
      hs_code: '8517620000',
      declared_price: 45.00,
      currency: 'USD',
      entry_id: 'ENTRY-2022-001',
      entry_date: '2022-01-15',
      trade_mode: 'General Trade',
      origin_country: 'China',
      destination_country: 'USA',
      gross_weight: '1.2 kg',
      net_weight: '1.0 kg'
    },
    {
      id: '2',
      invoice_no: 'INV-2022002',
      product_name: 'Old Laptop',
      hs_code: '8471301000',
      declared_price: 750.00,
      currency: 'USD',
      entry_id: 'ENTRY-2022-002',
      entry_date: '2022-02-20',
      trade_mode: 'Processing Trade',
      origin_country: 'China',
      destination_country: 'Germany',
      gross_weight: '2.5 kg',
      net_weight: '2.2 kg'
    },
  ];

  return {
    success: true,
    data: data,
    total: data.length,
  };
}

export async function getHistoryDetail(id: string) {
    const data: HistoryItem[] = [
        {
          id: '1',
          invoice_no: 'INV-2022001',
          product_name: 'Old Router',
          hs_code: '8517620000',
          declared_price: 45.00,
          currency: 'USD',
          entry_id: 'ENTRY-2022-001',
          entry_date: '2022-01-15',
          trade_mode: 'General Trade',
          origin_country: 'China',
          destination_country: 'USA',
          gross_weight: '1.2 kg',
          net_weight: '1.0 kg'
        },
        {
          id: '2',
          invoice_no: 'INV-2022002',
          product_name: 'Old Laptop',
          hs_code: '8471301000',
          declared_price: 750.00,
          currency: 'USD',
          entry_id: 'ENTRY-2022-002',
          entry_date: '2022-02-20',
          trade_mode: 'Processing Trade',
          origin_country: 'China',
          destination_country: 'Germany',
          gross_weight: '2.5 kg',
          net_weight: '2.2 kg'
        },
    ];
    const item = data.find(d => d.id === id);
    return {
        success: true,
        data: item,
    }
}
