import { ManifestDeclaration, ManifestDeclarationSearchParams } from '@/types/customs_compliance/manifest_security/manifest_declaration';

const mockData: ManifestDeclaration[] = [
    {
        key: '1',
        declaration_no: 'MF001',
        bl_number: 'COSU1234567890',
        vessel_name: 'COSCO001E',
        voyage_number: '2024001E',
        declaration_type: '进口舱单',
        destination_port: '上海港',
        container_count: 10,
        gross_weight: 15000,
        status: '已接受',
        declaration_time: '2024-01-15 10:30',
        source_type: 'manual',
    },
    {
        key: '2',
        declaration_no: 'ENS002',
        bl_number: 'MSCU0987654321',
        vessel_name: 'MSC002W',
        voyage_number: '2024002W',
        declaration_type: 'ENS申报',
        destination_port: '鹿特丹港',
        container_count: 5,
        gross_weight: 8000,
        status: '处理中',
        declaration_time: '2024-01-15 11:00',
        source_type: 'booking',
        source_no: 'BKG-002',
    },
    {
        key: '3',
        declaration_no: 'MF003',
        bl_number: 'CMAC12345678',
        vessel_name: 'CMA CGM',
        voyage_number: '2024003E',
        declaration_type: '出口舱单',
        destination_port: '洛杉矶港',
        container_count: 20,
        gross_weight: 25000,
        status: '待申报',
        declaration_time: '2024-01-16 09:00',
        source_type: 'booking',
        source_no: 'BKG-003',
    },
];

export const getManifestDeclarationList = async (params: ManifestDeclarationSearchParams) => {
    // Mock API call
    return new Promise<{ list: ManifestDeclaration[], total: number }>((resolve) => {
        setTimeout(() => {
            resolve({
                list: mockData,
                total: mockData.length,
            });
        }, 500);
    });
};

export const getPendingBookings = async () => {
    return new Promise<{ list: any[], total: number }>((resolve) => {
        setTimeout(() => {
            resolve({
                list: [
                    { bookingId: 'BKG-004', bookingNo: 'BKG-004', carrier: 'MSC', vesselVoyage: 'MSC/240325E', route: 'NGB-HAM', containerSummary: '40GP*1', destinationPort: 'HAMBURG' },
                    { bookingId: 'BKG-005', bookingNo: 'BKG-005', carrier: 'CMA', vesselVoyage: 'CMA/240328E', route: 'XMN-DXB', containerSummary: '40HQ*2', destinationPort: 'DUBAI' },
                    { bookingId: 'BKG-006', bookingNo: 'BKG-006', carrier: 'OOCL', vesselVoyage: 'OOCL/240330E', route: 'SZX-NYC', containerSummary: '20GP*2', destinationPort: 'NEW YORK' },
                ],
                total: 3,
            });
        }, 500);
    });
};

export const createManifestFromBooking = async (bookingIds: string[]) => {
    return new Promise<void>((resolve) => {
        setTimeout(() => {
            resolve();
        }, 800);
    });
};

export const getManifestDeclarationDetail = async (id: string) => {
    return new Promise<Partial<ManifestDeclaration>>((resolve) => {
        setTimeout(() => {
            resolve({
                key: id,
                declaration_no: id,
                vessel_name: 'EVER GIVEN',
                voyage_number: '1234E',
                imo_number: '9811000',
                call_sign: 'H3RC',
                flag_country: 'PANAMA',
                port_of_loading: 'SHANGHAI',
                port_of_discharge: 'LOS ANGELES',
                destination_port: 'USLAX',
                eta: '2025-07-15',
                declaration_type: 'export',
                status: 'declared',
                declaration_time: '2025-07-01 10:00:00',
                bl_number: 'COSU63123456',
                bl_type: 'master',
                payment_method: 'collect',
                shipper: 'SHANGHAI TRADING CO., LTD',
                shipper_address: 'NO.123 ROAD, SHANGHAI, CHINA',
                consignee: 'US IMPORTS INC.',
                consignee_address: '456 STREET, LA, USA',
                notify_party: 'US LOGISTICS LLC',
                notify_party_address: '789 AVE, LA, USA',
                source_type: 'booking',
                source_no: 'BKG-001',
                containers: [
                    { container_no: 'TEMU1234567', container_type: '40HQ', seal_no: 'SL123456', gross_weight: 15000, package_count: 500 }
                ],
                goods: [
                    { hs_code: '9503001000', description: 'TOYS', marks: 'N/M', gross_weight: 15000, volume: 30 }
                ]
            });
        }, 500);
    });
};

export const saveManifestDeclaration = async (data: any) => {
    // Mock API call
    return new Promise<void>((resolve) => {
        setTimeout(() => {
            resolve();
        }, 1000);
    });
};
