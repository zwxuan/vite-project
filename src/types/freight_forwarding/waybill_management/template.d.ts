import { WaybillItem } from './index';

export interface WaybillTemplateItem {
    templateId: string;
    templateName: string;
    transportMode: 'SEA' | 'AIR' | 'RAIL' | 'TRUCK';
    templateType: 'BOOKING' | 'LOADING' | 'ARRIVAL';
    createdBy: string;
    createdAt: string;
    status: 'ENABLED' | 'DISABLED';
    content: Partial<WaybillItem>; // JSON content
}

export interface WaybillTemplateListParams {
    current?: number;
    pageSize?: number;
    transportMode?: string;
    templateType?: string;
    status?: string;
}
