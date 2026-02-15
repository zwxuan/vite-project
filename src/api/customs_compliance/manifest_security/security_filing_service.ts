import { SecurityFiling, SecurityFilingSearchParams } from '@/types/customs_compliance/manifest_security/security_filing';

const mockData: SecurityFiling[] = [
    {
        key: '1',
        filing_no: 'SF20231027001',
        type: 'AMS',
        status: 'Accepted',
        submission_time: '2023-10-27 10:30:00',
        vessel_name: 'COSCO SHIPPING VIRGO',
        voyage_number: '068E',
        mbl_no: 'COSU6308569870',
        hbl_no: 'COSU6308569870A',
        pol: 'CNSHA',
        pod: 'USLGB',
        etd: '2023-10-30',
        eta: '2023-11-14',
        response_code: '1Y',
        response_message: 'AC: ACCEPTED',
        source_type: 'manifest',
        source_no: 'MF20231025001',
        importer_of_record: 'US IMPORTER LLC',
        consignee_number: '123456789',
        country_of_origin: 'CN',
        commodity_hts_no: '8517.12.00',
    },
    {
        key: '2',
        filing_no: 'SF20231027002',
        type: 'ISF',
        status: 'Processing',
        submission_time: '2023-10-27 11:15:00',
        vessel_name: 'EVER GOLDEN',
        voyage_number: '124W',
        mbl_no: 'EGLV1425364758',
        pol: 'CNNBG',
        pod: 'USNYC',
        etd: '2023-10-31',
        eta: '2023-11-20',
        source_type: 'booking',
        source_no: 'BK20231026005',
        importer_of_record: 'WALMART INC.',
        consignee_number: '987654321',
        seller: 'NINGBO TRADING CO.',
        buyer: 'WALMART INC.',
        ship_to_party: 'WALMART DC #123',
        manufacturer: 'NINGBO FACTORY LTD.',
        country_of_origin: 'CN',
        commodity_hts_no: '9503.00.00',
        container_stuffing_location: 'NINGBO PORT ZONE',
        consolidator: 'NINGBO LOGISTICS',
    },
    {
        key: '3',
        filing_no: 'SF20231027003',
        type: 'ENS',
        status: 'Rejected',
        submission_time: '2023-10-27 09:00:00',
        vessel_name: 'CMA CGM ANTOINE DE SAINT EXUPERY',
        voyage_number: '0FL9QE1MA',
        mbl_no: 'CMDU7859604125',
        pol: 'CNYTN',
        pod: 'DEHAM',
        etd: '2023-11-01',
        eta: '2023-11-25',
        response_code: 'REJ',
        response_message: 'Invalid Consignee Address',
        source_type: 'manual',
        source_no: '-',
    },
    {
        key: '4',
        filing_no: 'SF20231027004',
        type: 'AFR',
        status: 'Pending',
        submission_time: '-',
        vessel_name: 'WAN HAI 313',
        voyage_number: 'N234',
        mbl_no: 'WHLC03948576',
        pol: 'CNSHA',
        pod: 'JPTYO',
        etd: '2023-10-29',
        eta: '2023-11-02',
    },
];

export const getSecurityStatusHistory = async (id: string) => {
    return new Promise<{ time: string; status: string; code?: string; description: string }[]>((resolve) => {
        setTimeout(() => {
            resolve([
                { time: '2023-10-27 10:30', status: 'Accepted', code: '1Y', description: 'Customs accepted the filing' },
                { time: '2023-10-27 10:00', status: 'Submitted', description: 'Filing submitted to customs' },
            ]);
        }, 500);
    });
};

export const getSecurityFilingList = async (params: SecurityFilingSearchParams): Promise<{ list: SecurityFiling[], total: number }> => {
    console.log('Fetching security filing list with params:', params);
    return new Promise((resolve) => {
        setTimeout(() => {
            let filteredData = [...mockData];
            
            if (params.filing_no) {
                filteredData = filteredData.filter(item => item.filing_no.includes(params.filing_no!));
            }
            if (params.type) {
                filteredData = filteredData.filter(item => item.type === params.type);
            }
            if (params.status) {
                filteredData = filteredData.filter(item => item.status === params.status);
            }
            if (params.vessel_name) {
                filteredData = filteredData.filter(item => item.vessel_name.includes(params.vessel_name!));
            }
            if (params.mbl_no) {
                filteredData = filteredData.filter(item => item.mbl_no.includes(params.mbl_no!));
            }
             if (params.hbl_no) {
                filteredData = filteredData.filter(item => item.hbl_no && item.hbl_no.includes(params.hbl_no!));
            }
            if (params.source_no) {
                filteredData = filteredData.filter(item => item.source_no && item.source_no.includes(params.source_no!));
            }

            resolve({
                list: filteredData,
                total: filteredData.length,
            });
        }, 500);
    });
};

export const updateSecurityStatus = async (id: string, status: string) => {
    return new Promise<void>((resolve) => {
        setTimeout(() => {
            const item = mockData.find(item => item.key === id);
            if (item) {
                item.status = status;
            }
            resolve();
        }, 500);
    });
};

export const getSecurityFilingDetail = async (id: string): Promise<SecurityFiling> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            const item = mockData.find(item => item.key === id);
            resolve(item || {} as SecurityFiling);
        }, 500);
    });
};

export const saveSecurityFiling = async (data: SecurityFiling) => {
    return new Promise<void>((resolve) => {
        setTimeout(() => {
            if (data.key) {
                const index = mockData.findIndex(item => item.key === data.key);
                if (index > -1) {
                    mockData[index] = { ...mockData[index], ...data };
                }
            } else {
                mockData.push({
                    ...data
                });
            }
            resolve();
        }, 1000);
    });
};
