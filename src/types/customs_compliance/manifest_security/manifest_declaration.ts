export interface ContainerItem {
    container_no: string;
    container_type: string; // e.g., 20GP, 40HQ
    seal_no: string;
    gross_weight: number;
    package_count: number;
}

export interface GoodsItem {
    hs_code: string;
    description: string;
    marks: string;
    gross_weight: number;
    volume: number;
}

export interface ManifestDeclaration {
    key: string;
    declaration_no: string;
    
    // Transport Info
    vessel_name: string;
    voyage_number: string;
    imo_number?: string;
    call_sign?: string;
    flag_country?: string;
    port_of_loading?: string;
    port_of_discharge?: string;
    destination_port: string;
    eta?: string;
    
    declaration_type: string;
    status: string;
    declaration_time: string;
    
    // Bill of Lading Info
    bl_number?: string;
    bl_type?: string; // Master / House
    payment_method?: string; // Prepaid / Collect
    
    // Parties
    shipper?: string;
    shipper_address?: string;
    consignee?: string;
    consignee_address?: string;
    notify_party?: string;
    notify_party_address?: string;
    
    // Statistics
    container_count?: number;
    gross_weight?: number;
    
    // Source
    source_type?: 'booking' | 'bill_of_lading' | 'manual';
    source_no?: string;

    // Lists
    containers?: ContainerItem[];
    goods?: GoodsItem[];
}

export interface ManifestDeclarationSearchParams {
    declaration_no?: string;
    vessel_name?: string;
    status?: string;
    declaration_type?: string;
    destination_port?: string;
    bl_number?: string;
    page?: number;
    pageSize?: number;
}
