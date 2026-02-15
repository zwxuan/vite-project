import { SecurityFiling, SecurityFilingSearchParams } from '@/types/customs_compliance/manifest_security/security_filing';

const mockData: SecurityFiling[] = [
    {
        key: '1',
        filing_no: 'ENS-20240315-001',
        type: 'ENS',
        status: '已接受',
        submission_time: '2024-03-15 10:00',
    },
];

export const getSecurityFilingList = async (params: SecurityFilingSearchParams) => {
    // Mock API call
    return new Promise<{ list: SecurityFiling[], total: number }>((resolve) => {
        setTimeout(() => {
            resolve({
                list: mockData,
                total: mockData.length,
            });
        }, 500);
    });
};
