

import { ArchiveItem } from '@/types/customs_compliance/supporting_documents_management/archive';


const mockData: ArchiveItem[] = Array.from({ length: 20 }).map((_, i) => ({
    id: `ARCHIVE_${i + 1}`,
    preEntryNo: `PE2023${String(i + 1).padStart(4, '0')}`,
    declarationNo: `22012023${String(i + 1).padStart(8, '0')}`,
    businessType: i % 2 === 0 ? '进口' : '出口',
    clientName: `Client ${String.fromCharCode(65 + (i % 5))}`,
    docType: i % 3 === 0 ? '合同' : (i % 3 === 1 ? '发票' : '装箱单'),
    archiveDate: '2023-10-25',
    declarationDate: '2023-10-01',
    archivist: 'Admin',
    archiveReason: i % 5 === 0 ? '手动归档' : '自动归档',
    status: 'archived',
}));

export const getArchiveList = async (params: any) => {
    return { success: true, data: mockData, total: 100 };
};

export const batchRestore = async (ids: React.Key[]) => {
    
    return { success: true };
};

export const batchDelete = async (ids: React.Key[]) => {
    
    return { success: true };
};
