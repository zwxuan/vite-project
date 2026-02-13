import { ClassificationSuggestion } from '@/types/customs_compliance/pre_entry_classification/classification_suggestion';


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
      description: 'Men\'s cotton shirt, long sleeve',
      elements: '1:Cotton;2:Men\'s;3:Shirt',
      duty_rate: '10%',
      vat_rate: '13%'
    },
    {
      id: '2',
      product_name: 'Plastic Toy',
      hs_code: '9503.00.10',
      confidence: 88,
      source: 'History',
      create_time: '2023-09-02',
      status: 'ignored',
      description: 'Plastic toy car, battery operated',
      elements: '1:Plastic;2:Toy;3:Battery',
      duty_rate: '0%',
      vat_rate: '13%'
    },
    {
        id: '3',
        product_name: 'Steel Pipe',
        hs_code: '7304.11.10',
        confidence: 92,
        source: 'Rule Engine',
        create_time: '2023-09-03',
        status: 'applied',
        description: 'Seamless steel pipe, for oil pipeline',
        elements: '1:Steel;2:Pipe;3:Seamless',
        duty_rate: '5%',
        vat_rate: '13%'
    }
  ];

  return {
    data,
    success: true,
    total: data.length,
  };
}

export async function getSuggestionDetail(id: string) {
    const data: ClassificationSuggestion[] = [
        {
          id: '1',
          product_name: 'Cotton Shirt',
          hs_code: '6205.20.00',
          confidence: 95,
          source: 'AI Model',
          create_time: '2023-09-01',
          status: 'applied',
          description: 'Men\'s cotton shirt, long sleeve',
          elements: '1:Cotton;2:Men\'s;3:Shirt',
          duty_rate: '10%',
          vat_rate: '13%'
        },
        {
          id: '2',
          product_name: 'Plastic Toy',
          hs_code: '9503.00.10',
          confidence: 88,
          source: 'History',
          create_time: '2023-09-02',
          status: 'ignored',
          description: 'Plastic toy car, battery operated',
          elements: '1:Plastic;2:Toy;3:Battery',
          duty_rate: '0%',
          vat_rate: '13%'
        },
        {
            id: '3',
            product_name: 'Steel Pipe',
            hs_code: '7304.11.10',
            confidence: 92,
            source: 'Rule Engine',
            create_time: '2023-09-03',
            status: 'applied',
            description: 'Seamless steel pipe, for oil pipeline',
            elements: '1:Steel;2:Pipe;3:Seamless',
            duty_rate: '5%',
            vat_rate: '13%'
        }
    ];
    const item = data.find(d => d.id === id);
    return {
        success: true,
        data: item,
    }
}
