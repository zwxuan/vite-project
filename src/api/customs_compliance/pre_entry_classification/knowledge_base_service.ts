export interface KnowledgeItem {
  id: string;
  title: string;
  type: string; // case, rule, guide
  category: string;
  applicable_goods: string;
  hs_code: string;
  creator: string;
  create_time: string;
}

export async function getKnowledgeList(params: any) {
  // Mock data
  const data: KnowledgeItem[] = [
    {
      id: '1',
      title: 'Electronic Measuring Instrument Classification Guide',
      type: 'case',
      category: 'Chapter 90',
      applicable_goods: 'Measuring Devices',
      hs_code: '9028xx',
      creator: 'Wang Wu',
      create_time: '2023-10-01',
    },
    {
      id: '2',
      title: 'Mechanical Parts Classification Key Points',
      type: 'guide',
      category: 'Chapter 84',
      applicable_goods: 'Mechanical Parts',
      hs_code: '8481xx',
      creator: 'Zhao Liu',
      create_time: '2023-09-28',
    },
    {
        id: '3',
        title: 'New Regulation on EV Battery Classification',
        type: 'rule',
        category: 'Chapter 85',
        applicable_goods: 'Batteries',
        hs_code: '8507xx',
        creator: 'Admin',
        create_time: '2023-10-05',
    }
  ];

  return {
    data,
    success: true,
    total: data.length,
  };
}

export async function importKnowledge(file: any) {
    return { success: true };
}
