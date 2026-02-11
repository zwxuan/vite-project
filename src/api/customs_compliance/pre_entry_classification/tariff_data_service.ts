export interface TariffData {
  id: string;
  hs_code: string;
  name: string;
  name_en: string;
  mfn_rate: string;
  general_rate: string;
  vat_rate: string;
  consumption_tax_rate: string;
  export_rebate_rate: string;
  regulatory_conditions: string;
  inspection_quarantine: string;
}

export async function searchTariffData(params: any) {
  // Mock data
  const data: TariffData[] = [
    {
      id: '1',
      hs_code: '8517620000',
      name: '接收、转换并发送或再生语音、图像或其他数据用的设备',
      name_en: 'Machines for the reception, conversion and transmission or regeneration of voice, images or other data',
      mfn_rate: '0%',
      general_rate: '0%',
      vat_rate: '13%',
      consumption_tax_rate: '0%',
      export_rebate_rate: '13%',
      regulatory_conditions: 'A',
      inspection_quarantine: 'M',
    },
    {
      id: '2',
      hs_code: '8471301000',
      name: '平板电脑',
      name_en: 'Tablet computers',
      mfn_rate: '0%',
      general_rate: '0%',
      vat_rate: '13%',
      consumption_tax_rate: '0%',
      export_rebate_rate: '13%',
      regulatory_conditions: 'A',
      inspection_quarantine: 'L',
    },
    {
      id: '3',
      hs_code: '3926909090',
      name: '其他塑料制品',
      name_en: 'Other articles of plastics',
      mfn_rate: '6.5%',
      general_rate: '80%',
      vat_rate: '13%',
      consumption_tax_rate: '0%',
      export_rebate_rate: '13%',
      regulatory_conditions: '',
      inspection_quarantine: '',
    },
  ];

  return {
    success: true,
    data: data,
    total: data.length,
  };
}

export async function getTariffDetail(id: string) {
    const data: TariffData[] = [
        {
          id: '1',
          hs_code: '8517620000',
          name: '接收、转换并发送或再生语音、图像或其他数据用的设备',
          name_en: 'Machines for the reception, conversion and transmission or regeneration of voice, images or other data',
          mfn_rate: '0%',
          general_rate: '0%',
          vat_rate: '13%',
          consumption_tax_rate: '0%',
          export_rebate_rate: '13%',
          regulatory_conditions: 'A',
          inspection_quarantine: 'M',
        },
        {
          id: '2',
          hs_code: '8471301000',
          name: '平板电脑',
          name_en: 'Tablet computers',
          mfn_rate: '0%',
          general_rate: '0%',
          vat_rate: '13%',
          consumption_tax_rate: '0%',
          export_rebate_rate: '13%',
          regulatory_conditions: 'A',
          inspection_quarantine: 'L',
        },
        {
          id: '3',
          hs_code: '3926909090',
          name: '其他塑料制品',
          name_en: 'Other articles of plastics',
          mfn_rate: '6.5%',
          general_rate: '80%',
          vat_rate: '13%',
          consumption_tax_rate: '0%',
          export_rebate_rate: '13%',
          regulatory_conditions: '',
          inspection_quarantine: '',
        },
    ];
    const item = data.find(d => d.id === id);
    return {
        success: true,
        data: item,
    }
}
