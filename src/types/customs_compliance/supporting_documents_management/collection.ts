export interface DocumentItem {
    id: string;
    type: string;
    status: string;
    fileName?: string;
    uploadTime?: string;
    required: boolean;
}

export interface CollectionDetail {
    id: string;
    preEntryNo: string;
    businessType: string;
    consignee: string;
    consignor: string;
    goodsName: string;
    totalValue: string;
    progress: number;
    documents: DocumentItem[];
}
