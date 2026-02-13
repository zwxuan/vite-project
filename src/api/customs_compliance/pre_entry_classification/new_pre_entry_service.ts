
import { PreEntryTask } from './pre_entry_workbench_service';

import { PreEntryGoods, PreEntryForm } from '@/types/customs_compliance/pre_entry_classification/new_pre_entry';


export async function createPreEntry(data: PreEntryForm) {
  // Mock create
  return new Promise<{ success: boolean; data: any }>((resolve) => {
    setTimeout(() => {
        resolve({
            success: true,
            data: {
              id: 'mock-id-123',
              pre_entry_no: 'PRE-MOCK-001',
            },
          });
    }, 500);
  });
}

export async function updatePreEntry(id: string, data: PreEntryForm) {
    // Mock update
    return new Promise<{ success: boolean }>((resolve) => {
      setTimeout(() => {
          resolve({
              success: true
            });
      }, 500);
    });
  }

export async function getPreEntryDetail(id: string) {
    // Mock get detail
    return new Promise<{ success: boolean; data: any }>((resolve) => {
        setTimeout(() => {
            resolve({
                success: true,
                data: {
                    id: id,
                    job_id: 'JOB-COM-20231001-001',
                    entry_type: 'import',
                    trade_mode: '一般贸易',
                    exemption_nature: '一般征税',
                    transport_mode: '海运',
                    port_of_shipment: '上海港',
                    port_of_destination: '洛杉矶港',
                    consignee_name: 'ABC COMPANY LTD',
                    consignee_address: '123 MAIN ST, NEW YORK, USA',
                    shipper_name: '上海电子有限公司',
                    shipper_address: '上海市浦东新区张江路123号',
                    carrier_name: 'MAERSK LINE',
                    vessel_name: 'MSC OSCAR',
                    voyage_no: 'V123',
                    bill_no: 'MSCU123456789',
                    container_no: 'MSCU1234567',
                    remarks: '',
                    goods_list: [
                        {
                            key: 1,
                            seq: 1,
                            name: '电子测量设备',
                            spec: 'TM-2000',
                            qty: 10,
                            unit: '台',
                            unit_price: 5000,
                            total_price: 50000,
                            hs_code: '待归类'
                        },
                        {
                            key: 2,
                            seq: 2,
                            name: '配套软件',
                            spec: 'V2.0',
                            qty: 10,
                            unit: '套',
                            unit_price: 500,
                            total_price: 5000,
                            hs_code: '待归类'
                        }
                    ]
                }
            });
        }, 500);
    });
}

export async function getJobOptions(keyword: string) {
    // Mock job search
    return {
        success: true,
        data: [
            { label: 'JOB-COM-20231001-001', value: 'JOB-COM-20231001-001' },
            { label: 'JOB-COM-20231001-002', value: 'JOB-COM-20231001-002' },
        ]
    };
}
