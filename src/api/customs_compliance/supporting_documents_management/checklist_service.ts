
export interface ChecklistForm {
    preEntryNo: string;
    businessType: string;
    tradeMode: string;
    levyNature: string;
    transportMode: string;
    originCountry: string;
    destinationCountry: string;
    goodsName: string;
    hsCode: string;
    supervisionCondition: string;
    inspection: string;
    specialRequirements: string[];
    requiredDocs: string[];
    licenseDocs: string[];
    inspectionDocs: string[];
    originDocs: string[];
    specialDocs: string[];
}

export interface PreEntryItem {
    id: string;
    preEntryNo: string;
    businessType: string;
    tradeMode: string;
    levyNature: string;
    transportMode: string;
    originCountry: string;
    destinationCountry: string;
    goodsName: string;
    hsCode: string;
    supervisionCondition: string;
    inspection: string;
    createTime: string;
}

export const getPreEntryList = async (keyword?: string) => {
    return new Promise<{ success: boolean; data: PreEntryItem[] }>((resolve) => {
        setTimeout(() => {
            const mockData: PreEntryItem[] = [
                {
                    id: '1',
                    preEntryNo: 'PE20231001001',
                    businessType: 'import',
                    tradeMode: 'general',
                    levyNature: 'general_tax',
                    transportMode: 'sea',
                    originCountry: 'US',
                    destinationCountry: 'CN',
                    goodsName: '精密电子测量仪',
                    hsCode: '9028301000',
                    supervisionCondition: 'A',
                    inspection: 'M',
                    createTime: '2023-10-01'
                },
                {
                    id: '2',
                    preEntryNo: 'PE20231001002',
                    businessType: 'export',
                    tradeMode: 'processing',
                    levyNature: 'exemption',
                    transportMode: 'air',
                    originCountry: 'CN',
                    destinationCountry: 'DE',
                    goodsName: '高强度合金钢板',
                    hsCode: '7225400000',
                    supervisionCondition: '',
                    inspection: '',
                    createTime: '2023-10-02'
                },
                {
                    id: '3',
                    preEntryNo: 'PE20231001003',
                    businessType: 'import',
                    tradeMode: 'general',
                    levyNature: 'general_tax',
                    transportMode: 'sea',
                    originCountry: 'JP',
                    destinationCountry: 'CN',
                    goodsName: '汽车零部件',
                    hsCode: '8708999990',
                    supervisionCondition: 'A',
                    inspection: 'M',
                    createTime: '2023-10-03'
                }
            ];
            
            if (keyword) {
                const filtered = mockData.filter(item => item.preEntryNo.includes(keyword) || item.goodsName.includes(keyword));
                resolve({ success: true, data: filtered });
            } else {
                resolve({ success: true, data: mockData });
            }
        }, 500);
    });
};

export const generateChecklist = async (data: ChecklistForm) => {
    // Mock
    return new Promise<{ success: boolean; message: string; checklistId: string }>((resolve) => {
        setTimeout(() => {
            resolve({ success: true, message: '清单生成成功', checklistId: 'CL-20231001' });
        }, 1000);
    });
};
