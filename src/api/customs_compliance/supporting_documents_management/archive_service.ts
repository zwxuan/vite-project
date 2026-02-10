

export interface ArchiveItem {
    id: React.Key;
    preEntryNo: string;
    declarationNo: string; // Added: 报关单号
    businessType: string; // Added: 业务类型
    clientName: string; // Added: 客户名称
    docType: string;
    archiveDate: string;
    declarationDate: string; // Added: 申报日期
    archivist: string;
    archiveReason: string; // Added: 归档原因
    status: string;
}

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
