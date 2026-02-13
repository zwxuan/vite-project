import request, { ApiRes } from '@/api/request';

import { CustomsJobItem, CustomsJob, JobCenterSearchParams } from '@/types/customs_compliance/customs_job_management/job_center';


export const getCustomsJobList = async (params: JobCenterSearchParams): Promise<ApiRes<{ list: CustomsJob[], total: number }>> => {
  // Mock data
  const mockData: CustomsJob[] = [
    {
      job_id: 'JOB-COM-001',
      order_id: 'ORD-20240315-001',
      upstream_order_no: 'SO-20240315-001',
      customer_id: 'CUST001',
      customer_name: 'TechWave Electronics',
      business_type: 'import_customs',
      transport_mode: 'Air',
      declaration_no: '220120240315001',
      status: 'assigned',
      sla_status: 'normal',
      priority: 'high',
      assigned_to: 'user001',
      assigned_to_name: 'Zhang San',
      port_code: 'PVG',
      created_at: '2024-03-15 10:00:00',
      sla_deadline: '2024-03-16 10:00:00',
    },
    {
      job_id: 'JOB-COM-002',
      order_id: 'ORD-20240315-002',
      upstream_order_no: 'SO-20240315-002',
      customer_id: 'CUST002',
      customer_name: 'Global Logistics Co.',
      business_type: 'export_customs',
      transport_mode: 'Sea',
      declaration_no: '220120240315002',
      status: 'processing',
      sla_status: 'warning',
      priority: 'medium',
      assigned_to: 'user002',
      assigned_to_name: 'Li Si',
      port_code: 'SHA',
      created_at: '2024-03-15 11:00:00',
      sla_deadline: '2024-03-16 14:00:00',
    },
    {
      job_id: 'JOB-COM-003',
      order_id: 'ORD-20240315-003',
      upstream_order_no: 'SO-20240315-003',
      customer_id: 'CUST003',
      customer_name: 'Fresh Foods Ltd.',
      business_type: 'transfer_customs',
      transport_mode: 'Land',
      declaration_no: '',
      status: 'pending_assign',
      sla_status: 'overdue',
      priority: 'low',
      assigned_to: '',
      assigned_to_name: '-',
      port_code: 'NGB',
      created_at: '2024-03-15 12:00:00',
      sla_deadline: '2024-03-17 10:00:00',
    },
    {
      job_id: 'JOB-COM-004',
      order_id: 'ORD-20240315-004',
      upstream_order_no: 'SO-20240315-004',
      customer_id: 'CUST004',
      customer_name: 'AutoParts Inc.',
      business_type: 'import_customs',
      transport_mode: 'Sea',
      declaration_no: '220120240315004',
      status: 'completed',
      sla_status: 'normal',
      priority: 'high',
      assigned_to: 'user001',
      assigned_to_name: 'Zhang San',
      port_code: 'TSN',
      created_at: '2024-03-14 09:30:00',
      sla_deadline: '2024-03-15 09:30:00',
    },
     {
      job_id: 'JOB-COM-005',
      order_id: 'ORD-20240315-005',
      upstream_order_no: 'SO-20240315-005',
      customer_id: 'CUST005',
      customer_name: 'Fashion Trends',
      business_type: 'export_customs',
      transport_mode: 'Air',
      declaration_no: '',
      status: 'pending_assign',
      sla_status: 'normal',
      priority: 'medium',
      assigned_to: '',
      assigned_to_name: '-',
      port_code: 'BJS',
      created_at: '2024-03-15 14:15:00',
      sla_deadline: '2024-03-16 14:15:00',
    },
  ];

  return {
    code: 0,
    success: true,
    data: {
      list: mockData,
      total: 5,
    },
    message: 'success'
  };
};

export const getJobStatistics = async (): Promise<ApiRes<any>> => {
    return {
        code: 0,
        success: true,
        data: {
            total: 1234,
            pending: 45,
            processing: 189,
            completed: 987,
            warning: 13,
            today_new: 67
        },
        message: 'success'
    }
};

export const retrySyncException = async (ids: React.Key[]): Promise<ApiRes<any>> => {
    return { code: 0, success: true, message: 'Retried successfully' };
}

export const resolveSyncException = async (ids: React.Key[]): Promise<ApiRes<any>> => {
    return { code: 0, success: true, message: 'Resolved successfully' };
}

export const batchAssignJobs = async (ids: React.Key[], assignedTo?: string): Promise<ApiRes<any>> => {
    console.log('Assigning jobs', ids, 'to user', assignedTo);
    return new Promise(resolve => setTimeout(() => resolve({ code: 0, success: true, message: 'Batch assign successful' }), 500));
}

export const batchExportJobs = async (ids: React.Key[]): Promise<ApiRes<any>> => {
    return new Promise(resolve => setTimeout(() => resolve({ code: 0, success: true, message: 'Batch export successful' }), 500));
}

export const batchArchiveJobs = async (ids: React.Key[]): Promise<ApiRes<any>> => {
    return new Promise(resolve => setTimeout(() => resolve({ code: 0, success: true, message: 'Batch archive successful' }), 500));
}

export const getCustomsJobDetail = async (id: string): Promise<ApiRes<CustomsJob>> => {
    // Mock detail data based on ID or return a default one
    const mockDetail: CustomsJob = {
        job_id: id,
        order_id: 'ORD-20240315-001',
        upstream_order_no: 'SO-20240315-001',
        contract_no: 'CTR-2024001',
        customer_id: 'CUST001',
        customer_name: 'TechWave Electronics',
        business_type: 'import_customs',
        transport_mode: 'Air',
        declaration_no: '220120240315001',
        pre_entry_no: 'PRE20240315001',
        customs_no: 'CUS20240315001',
        trade_mode: '0110', // 一般贸易
        cut_mode: '101', // 一般征税
        origin_country: 'USA',
        destination_country: 'CHN',
        pack_no: 100,
        pack_type: 'Carton',
        status: 'assigned',
        sla_status: 'normal',
        priority: 'high',
        assigned_to: 'user001',
        assigned_to_name: 'Zhang San',
        port_code: 'PVG',
        vessel_name: 'EVER GREEN',
        voyage_no: 'V.1234',
        mbl_no: 'MBL123456789',
        etd: '2024-03-10',
        eta: '2024-03-15',
        created_at: '2024-03-15 10:00:00',
        sla_deadline: '2024-03-16 10:00:00',
        gross_weight: 500.5,
        net_weight: 480.0,
        quantity: 1000,
        packaging_type: 'Carton',
        remarks: 'Urgent shipment, please handle with care.',
        
        consignor_cname: 'US Tech Inc.',
        consignee_cname: 'China Tech Ltd.',
        
        goods_items: [
            {
                item_no: 1,
                hs_code: '8542310000',
                product_name_cn: '集成电路',
                product_name_en: 'Integrated Circuits',
                spec_model: 'Processor',
                qty_1: 500,
                unit_1: 'PCS',
                unit_price: 100.00,
                total_price: 50000.00,
                currency: 'USD',
                origin_country: 'USA'
            },
            {
                item_no: 2,
                hs_code: '8542390000',
                product_name_cn: '其他集成电路',
                product_name_en: 'Other Integrated Circuits',
                spec_model: 'Memory',
                qty_1: 500,
                unit_1: 'PCS',
                unit_price: 50.00,
                total_price: 25000.00,
                currency: 'USD',
                origin_country: 'USA'
            }
        ]
    };
    return new Promise(resolve => setTimeout(() => resolve({ code: 0, success: true, data: mockDetail, message: 'success' }), 300));
};

export const getArchivedJobList = async (params: JobCenterSearchParams): Promise<ApiRes<{ list: CustomsJob[], total: number }>> => {
  // Mock archived data
  const mockData: CustomsJob[] = [
    {
      job_id: 'JOB-ARC-001',
      order_id: 'ORD-20231201-001',
      upstream_order_no: 'SO-20231201-001',
      customer_id: 'CUST001',
      customer_name: 'TechWave Electronics',
      business_type: 'import_customs',
      transport_mode: 'Air',
      declaration_no: '220120231201001',
      status: 'completed',
      sla_status: 'normal',
      priority: 'high',
      assigned_to: 'user001',
      assigned_to_name: 'Zhang San',
      port_code: 'PVG',
      created_at: '2023-12-01 10:00:00',
      sla_deadline: '2023-12-02 10:00:00',
      archive_date: '2024-01-01 10:00:00',
      archive_reason: 'Yearly Archive',
      archived_by: 'System'
    },
    {
      job_id: 'JOB-ARC-002',
      order_id: 'ORD-20231205-002',
      upstream_order_no: 'SO-20231205-002',
      customer_id: 'CUST002',
      customer_name: 'Global Logistics Co.',
      business_type: 'export_customs',
      transport_mode: 'Sea',
      declaration_no: '220120231205002',
      status: 'completed',
      sla_status: 'normal',
      priority: 'medium',
      assigned_to: 'user002',
      assigned_to_name: 'Li Si',
      port_code: 'SHA',
      created_at: '2023-12-05 11:00:00',
      sla_deadline: '2023-12-06 14:00:00',
      archive_date: '2024-01-01 10:00:00',
      archive_reason: 'Completed > 30 days',
      archived_by: 'System'
    }
  ];

  return {
    code: 0,
    success: true,
    data: {
      list: mockData,
      total: 2,
    },
    message: 'success'
  };
};

export const batchRestoreJobs = async (ids: React.Key[]): Promise<ApiRes<any>> => {
    return new Promise(resolve => setTimeout(() => resolve({ code: 0, success: true, message: 'Batch restore successful' }), 500));
}
