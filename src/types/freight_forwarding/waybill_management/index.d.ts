export interface WaybillItem {
    waybillId: string;
    waybillNo: string;
    orderNo: string;
    jobNo: string;
    mblNo: string;
    hblNo?: string;
    transportMode: 'SEA' | 'AIR' | 'RAIL' | 'TRUCK';
    carrier: string;
    origin: string;
    destination: string;
    status: 'DRAFT' | 'CONFIRMED' | 'ISSUED' | 'CANCELLED';
    createTime: string;
    etd?: string;
    eta?: string;
    vessel?: string;
    voyage?: string;
}

export interface WaybillListParams {
    current?: number;
    pageSize?: number;
    waybillNo?: string;
    orderNo?: string;
    jobNo?: string;
    mblNo?: string;
    transportMode?: string;
    carrier?: string;
    status?: string;
    createTime?: string[];
}
