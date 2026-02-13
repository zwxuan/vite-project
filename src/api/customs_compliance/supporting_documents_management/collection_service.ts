

import { DocumentItem, CollectionDetail } from '@/types/customs_compliance/supporting_documents_management/collection';


export const getCollectionDetail = async (id: string) => {
    // Mock
    const data: CollectionDetail = {
        id,
        preEntryNo: 'PRE-20231001-001',
        businessType: 'Import',
        consignee: 'Shanghai Import Co.',
        consignor: 'ABC Electronics',
        goodsName: 'Electronic Equipment',
        totalValue: 'USD 50,000',
        progress: 67,
        documents: [
            { id: '1', type: 'invoice', status: 'collected', fileName: 'invoice.pdf', uploadTime: '2023-10-01', required: true },
            { id: '2', type: 'packing', status: 'collected', fileName: 'packing.pdf', uploadTime: '2023-10-01', required: true },
            { id: '3', type: 'contract', status: 'collected', fileName: 'contract.pdf', uploadTime: '2023-10-01', required: true },
            { id: '4', type: 'bl', status: 'collected', fileName: 'bl.pdf', uploadTime: '2023-10-02', required: true },
            { id: '5', type: 'license', status: 'collected', fileName: 'license.pdf', uploadTime: '2023-10-02', required: true },
            { id: '6', type: 'ciq', status: 'pending', required: true },
            { id: '7', type: 'inspection', status: 'pending', required: true },
            { id: '8', type: '3c', status: 'pending', required: true },
        ]
    };
    return { success: true, data };
};
