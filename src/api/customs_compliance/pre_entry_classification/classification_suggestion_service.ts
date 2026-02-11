
export interface ClassificationSuggestion {
  id: string;
  product_name: string;
  hs_code: string;
  confidence: number;
  source: string; // AI, Rule, History
  create_time: string;
  status: string; // applied, ignored
}

export async function searchClassificationSuggestions(params: any) {
  // Mock data
  const data: ClassificationSuggestion[] = [
    {
      id: '1',
      product_name: 'Cotton Shirt',
      hs_code: '6205.20.00',
      confidence: 95,
      source: 'AI Model',
      create_time: '2023-09-01',
      status: 'applied',
    },
    {
      id: '2',
      product_name: 'Plastic Toy',
      hs_code: '9503.00.10',
      confidence: 88,
      source: 'History',
      create_time: '2023-09-02',
      status: 'ignored',
    },
    {
        id: '3',
        product_name: 'Steel Pipe',
        hs_code: '7304.11.10',
        confidence: 92,
        source: 'Rule Engine',
        create_time: '2023-09-03',
        status: 'applied',
    }
  ];

  return {
    data,
    success: true,
    total: data.length,
  };
}
