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
