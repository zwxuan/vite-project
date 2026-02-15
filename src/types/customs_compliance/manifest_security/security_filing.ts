export interface SecurityFiling {
    key: string;
    filing_no: string;
    type: string; // ISF, AMS, ENS, AFR
    status: string; // Accepted, Rejected, Pending, Amendment Needed
    submission_time: string;
    
    // Transport
    vessel_name: string;
    voyage_number: string;
    
    // B/L
    mbl_no: string;
    hbl_no?: string;
    
    // Route
    pol: string;
    pod: string;
    etd?: string;
    eta?: string;
    
    // Parties (ISF 10+2 Elements)
    importer_of_record?: string;
    consignee_number?: string;
    seller?: string;
    buyer?: string;
    ship_to_party?: string;
    manufacturer?: string;
    country_of_origin?: string;
    commodity_hts_no?: string;
    
    // Container Stuffing
    container_stuffing_location?: string;
    consolidator?: string;

    // Customs Response
    response_code?: string; // 1Y, 3Z, etc.
    response_message?: string;

    // Source Document
    source_type?: string; // 'manifest' | 'booking' | 'manual'
    source_no?: string;
}

export interface SecurityFilingSearchParams {
    filing_no?: string;
    type?: string;
    status?: string;
    vessel_name?: string;
    mbl_no?: string;
    hbl_no?: string;
    source_no?: string;
    page?: number;
    pageSize?: number;
}
