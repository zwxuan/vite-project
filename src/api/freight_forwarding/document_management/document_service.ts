
import { DocumentItem, DocumentListParams, DocumentDetail, DocumentStatistic, DocumentTemplate } from '@/types/freight_forwarding/document_management';

const mockDocuments: DocumentItem[] = Array.from({ length: 20 }).map((_, i) => ({
  id: `DOC${20240001 + i}`,
  code: `DOC-2024-${String(i + 1).padStart(4, '0')}`,
  type: i % 3 === 0 ? '提单(B/L)' : i % 3 === 1 ? '发票(Invoice)' : '装箱单(Packing List)',
  waybill_no: `WB${20240001 + i}`,
  customer: ['Apple Inc.', 'Samsung Electronics', 'Huawei Technologies', 'Xiaomi Corp'][i % 4],
  status: ['Draft', 'PendingReview', 'Approved', 'Issued', 'Rejected'][i % 5],
  create_time: `2024-01-${String((i % 30) + 1).padStart(2, '0')} 10:00:00`,
  carrier: ['COSCO', 'MAERSK', 'MSC', 'CMA CGM'][i % 4],
  creator: 'Admin',
  version: `v1.${i % 3}`,
  pol: 'Shanghai',
  pod: 'Los Angeles',
  vessel: 'COSCO SHIPPING GEMINI',
  voyage: '045E',
}));

const mockTemplates: DocumentTemplate[] = Array.from({ length: 5 }).map((_, i) => ({
  id: `TMP${i + 1}`,
  name: `Template ${i + 1}`,
  category: i % 2 === 0 ? 'Sea Freight' : 'Air Freight',
  version: 'v1.0',
  status: 'Enabled',
  content: '',
  fields: '{}',
  create_time: '2024-01-01',
  update_time: '2024-01-01',
}));

export const DocumentService = {
  async getDocumentList(params: DocumentListParams) {
    console.log('getDocumentList params:', params);
    return new Promise<{ data: DocumentItem[]; total: number; success: boolean }>((resolve) => {
      setTimeout(() => {
        let data = [...mockDocuments];
        if (params.code) {
          data = data.filter(item => item.code.includes(params.code!));
        }
        if (params.type) {
          data = data.filter(item => item.type === params.type);
        }
        if (params.status) {
          data = data.filter(item => item.status === params.status);
        }
        resolve({
          data,
          total: data.length,
          success: true,
        });
      }, 500);
    });
  },

  async getDocumentDetail(id: string) {
    return new Promise<{ data: DocumentDetail; success: boolean }>((resolve) => {
      setTimeout(() => {
        const item = mockDocuments.find(d => d.id === id) || mockDocuments[0];
        resolve({
          data: {
            ...item,
            content: 'Document Content Mock',
            attachments: [
              { id: '1', name: 'contract.pdf', url: '#', type: 'pdf', size: 1024, upload_time: '2024-01-01' }
            ],
            logs: [
              { id: '1', operator: 'Admin', action: 'Create', time: '2024-01-01 10:00:00' }
            ],
            versions: [
              { id: '1', version: 'v1.0', create_time: '2024-01-01', creator: 'Admin', change_log: 'Initial Create' }
            ],
            cargo: [
              { id: '1', name: 'Apple iPhone 14 Pro', quantity: 1, unit_price: 9999.99, total_price: 9999.99, unit: 'piece' }
            ],
            transport: [
              { id: '1', name: 'COSCO SHIPPING GEMINI', voyage: '045E', pol: 'Shanghai', pod: 'Los Angeles', status: 'In Transit' }
            ]
          },
          success: true,
        });
      }, 500);
    });
  },

  async getDocumentStatistic() {
    return new Promise<{ data: DocumentStatistic; success: boolean }>((resolve) => {
      setTimeout(() => {
        resolve({
          data: {
            pending_generate: 12,
            pending_review: 5,
            issued: 128,
            exception: 2,
            trend: Array.from({ length: 12 }).map((_, i) => ({
              date: `2024-${i + 1}`,
              count: Math.floor(Math.random() * 100)
            }))
          },
          success: true,
        });
      }, 500);
    });
  },

  async getTemplateList() {
    return new Promise<{ data: DocumentTemplate[]; total: number; success: boolean }>((resolve) => {
      setTimeout(() => {
        resolve({
          data: mockTemplates,
          total: mockTemplates.length,
          success: true,
        });
      }, 500);
    });
  }
};
