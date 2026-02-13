import React from 'react';

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
