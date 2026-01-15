import React, { useState } from 'react';
import { Table, Button, Space, message, Modal, Tag } from 'antd';
import { WaybillItem } from '@/types/freight_forwarding/waybill_management';
import i18n from '@/i18n';
import LocaleHelper from '@/utils/locale';
import AdvancedSearchForm from "@/components/search-form";

const PendingList: React.FC = () => {
    // Mock Data
    const mockData: WaybillItem[] = [
        { waybillId: 'WB-005', waybillNo: 'WB20240315005', orderNo: 'ORD-005', jobNo: 'JOB-005', mblNo: 'MBL-005', transportMode: 'TRUCK', carrier: 'SF', origin: 'Shenzhen', destination: 'HK', status: 'ISSUED', createTime: '2024-03-17' } as any,
    ];

    const [data, setData] = useState<WaybillItem[]>(mockData);

    const handleArchive = (record: WaybillItem) => {
        Modal.confirm({
            title: i18n.t(LocaleHelper.getWaybillArchiveDoArchive()),
            content: `Archive waybill ${record.waybillNo}?`,
            onOk: () => {
                message.success('Archived successfully');
                setData(data.filter(item => item.waybillId !== record.waybillId));
            }
        });
    };

    const columns = [
        { title: i18n.t(LocaleHelper.getWaybillListWaybillNo()), dataIndex: 'waybillNo', key: 'waybillNo' },
        { title: i18n.t(LocaleHelper.getWaybillListMblNo()), dataIndex: 'mblNo', key: 'mblNo' },
        { title: i18n.t(LocaleHelper.getWaybillListTransportMode()), dataIndex: 'transportMode', key: 'transportMode' },
        { title: i18n.t(LocaleHelper.getWaybillArchiveCompletionTime()), dataIndex: 'createTime', key: 'completionTime' }, // Mocking completion time as createTime
        { 
            title: i18n.t(LocaleHelper.getWaybillListStatus()), 
            dataIndex: 'status', 
            key: 'status',
            render: (text: string) => <Tag color="blue">{text}</Tag>
        },
        {
            title: i18n.t(LocaleHelper.getWaybillListActions()),
            key: 'action',
            render: (_: any, record: WaybillItem) => (
                <Space size="middle">
                    <a onClick={() => handleArchive(record)}>{i18n.t(LocaleHelper.getWaybillArchiveDoArchive())}</a>
                </Space>
            ),
        },
    ];

    const fields = [
        { name: 'waybillNo', label: i18n.t(LocaleHelper.getWaybillListWaybillNo()), type: 'input' },
        { name: 'transportMode', label: i18n.t(LocaleHelper.getWaybillListTransportMode()), type: 'select', options: [{ label: 'SEA', value: 'SEA' }] },
    ];

    return (
        <div>
            <AdvancedSearchForm fields={fields as any} onSearch={() => {}} />
            <div className='nc-bill-table-area'>
                <Table dataSource={data} columns={columns} rowKey="waybillId" size="small" />
            </div>
        </div>
    );
};

export default PendingList;
