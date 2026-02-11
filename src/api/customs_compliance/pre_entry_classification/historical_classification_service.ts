export interface HistoryItem {
  id: string;
  invoice_no: string;
  product_name: string;
  hs_code: string;
  declared_price: number;
  currency: string;
  entry_id: string;
  entry_date: string;
}

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
    },
  ];

  return {
    success: true,
    data: data,
    total: data.length,
  };
}
