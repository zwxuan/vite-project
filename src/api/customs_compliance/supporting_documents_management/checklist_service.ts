

export interface ChecklistForm {
    preEntryNo: string;
    businessType: string;
    tradeMode: string;
    transportMode: string;
    originCountry: string;
    destinationCountry: string;
    goodsName: string;
    hsCode: string;
    supervisionCondition: string;
    inspectionQuarantine: string;
    specialRequirements: string[];
    requiredDocs: string[];
}

export const generateChecklist = async (data: ChecklistForm) => {
    // Mock
    return { success: true, message: '清单生成成功', checklistId: 'CL-20231001' };
};
