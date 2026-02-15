export interface SecurityFiling {
    key: string;
    filing_no: string;
    type: string;
    status: string;
    submission_time: string;
}

export interface SecurityFilingSearchParams {
    filing_no?: string;
    type?: string;
    status?: string;
    page?: number;
    pageSize?: number;
}
