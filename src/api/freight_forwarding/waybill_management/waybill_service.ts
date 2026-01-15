import { ApiRes }  from '../../request';
import { WaybillItem, WaybillListParams } from '@/types/freight_forwarding/waybill_management';

// Mock Data
const mockData: WaybillItem[] = [
    { waybillId: 'WB-001', waybillNo: 'WB20240315001', orderNo: 'ORD-001', jobNo: 'JOB-001', mblNo: 'MBL-001', transportMode: 'SEA', carrier: 'COSCO', origin: 'Shanghai', destination: 'Los Angeles', status: 'CONFIRMED', createTime: '2024-03-15', etd: '2024-03-20', eta: '2024-04-05', vessel: 'COSCO SHIPPING', voyage: '001W' },
    { waybillId: 'WB-002', waybillNo: 'WB20240315002', orderNo: 'ORD-002', jobNo: 'JOB-002', mblNo: 'MBL-002', transportMode: 'AIR', carrier: 'CA', origin: 'Beijing', destination: 'New York', status: 'DRAFT', createTime: '2024-03-16', etd: '2024-03-18', eta: '2024-03-19' },
    { waybillId: 'WB-003', waybillNo: 'WB20240315003', orderNo: 'ORD-003', jobNo: 'JOB-003', mblNo: 'MBL-003', transportMode: 'RAIL', carrier: 'CR', origin: 'Chengdu', destination: 'Hamburg', status: 'ISSUED', createTime: '2024-03-10', etd: '2024-03-12', eta: '2024-03-25' },
    { waybillId: 'WB-004', waybillNo: 'WB20240315004', orderNo: 'ORD-004', jobNo: 'JOB-004', mblNo: 'MBL-004', transportMode: 'SEA', carrier: 'MAERSK', origin: 'Ningbo', destination: 'Rotterdam', status: 'CONFIRMED', createTime: '2024-03-14', etd: '2024-03-22', eta: '2024-04-10', vessel: 'MAERSK SEALAND', voyage: '102E' },
    { waybillId: 'WB-005', waybillNo: 'WB20240315005', orderNo: 'ORD-005', jobNo: 'JOB-005', mblNo: 'MBL-005', transportMode: 'TRUCK', carrier: 'SF', origin: 'Shenzhen', destination: 'Hong Kong', status: 'COMPLETED', createTime: '2024-03-17', etd: '2024-03-17', eta: '2024-03-17' } as any,
    { waybillId: 'WB-006', waybillNo: 'WB20240315006', orderNo: 'ORD-006', jobNo: 'JOB-006', mblNo: 'MBL-006', transportMode: 'SEA', carrier: 'MSC', origin: 'Qingdao', destination: 'Singapore', status: 'CANCELLED', createTime: '2024-03-18' },
    { waybillId: 'WB-007', waybillNo: 'WB20240315007', orderNo: 'ORD-007', jobNo: 'JOB-007', mblNo: 'MBL-007', transportMode: 'AIR', carrier: 'LH', origin: 'Shanghai', destination: 'Frankfurt', status: 'CONFIRMED', createTime: '2024-03-19', etd: '2024-03-21', eta: '2024-03-21' },
    { waybillId: 'WB-008', waybillNo: 'WB20240315008', orderNo: 'ORD-008', jobNo: 'JOB-008', mblNo: 'MBL-008', transportMode: 'SEA', carrier: 'CMA', origin: 'Xiamen', destination: 'Dubai', status: 'DRAFT', createTime: '2024-03-20' },
    { waybillId: 'WB-009', waybillNo: 'WB20240315009', orderNo: 'ORD-009', jobNo: 'JOB-009', mblNo: 'MBL-009', transportMode: 'SEA', carrier: 'ONE', origin: 'Tianjin', destination: 'Tokyo', status: 'ISSUED', createTime: '2024-03-21', etd: '2024-03-25', eta: '2024-03-28' },
    { waybillId: 'WB-010', waybillNo: 'WB20240315010', orderNo: 'ORD-010', jobNo: 'JOB-010', mblNo: 'MBL-010', transportMode: 'AIR', carrier: 'CX', origin: 'Hong Kong', destination: 'London', status: 'CONFIRMED', createTime: '2024-03-22', etd: '2024-03-24', eta: '2024-03-25' },
    { waybillId: 'WB-011', waybillNo: 'WB20240315011', orderNo: 'ORD-011', jobNo: 'JOB-011', mblNo: 'MBL-011', transportMode: 'SEA', carrier: 'EMC', origin: 'Kaohsiung', destination: 'Seattle', status: 'DRAFT', createTime: '2024-03-23' }
];

export const getWaybillList = async (params: WaybillListParams): Promise<ApiRes<{ list: WaybillItem[], total: number }>> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Simple filtering
    let filtered = [...mockData];
    if (params.waybillNo) {
        filtered = filtered.filter(item => item.waybillNo.includes(params.waybillNo!));
    }
    if (params.orderNo) {
        filtered = filtered.filter(item => item.orderNo.includes(params.orderNo!));
    }
    if (params.mblNo) {
        filtered = filtered.filter(item => item.mblNo.includes(params.mblNo!));
    }
    if (params.transportMode) {
        filtered = filtered.filter(item => item.transportMode === params.transportMode);
    }
    if (params.status) {
        filtered = filtered.filter(item => item.status === params.status);
    }

    return {
        data: {
            list: filtered,
            total: filtered.length,
        },
        success: true,
        code: 200,
        message: 'success'
    };
};

export const getWaybillDetail = async (id: string): Promise<ApiRes<WaybillItem>> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    const item = mockData.find(d => d.waybillId === id);
    return {
        data: item || {} as WaybillItem,
        success: !!item,
        code: item ? 200 : 404,
        message: item ? 'success' : 'not found'
    };
};

export const saveWaybill = async (data: Partial<WaybillItem>): Promise<ApiRes<string>> => {
    await new Promise(resolve => setTimeout(resolve, 800));
    return {
        data: 'WB-' + Date.now(),
        success: true,
        code: 200,
        message: 'success'
    };
};
