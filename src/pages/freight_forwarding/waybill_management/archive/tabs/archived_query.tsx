import React, { useState } from 'react';
import { Table, Space, message, Modal, Tag } from 'antd';
import { WaybillItem } from '@/types/freight_forwarding/waybill_management';
import i18n from '@/i18n';
import LocaleHelper from '@/utils/locale';
import AdvancedSearchForm from "@/components/search-form";

const ArchivedQuery: React.FC = () => {
    // Mock Data
    const mockData: any[] = [
        { waybillId: 'WB-001', waybillNo: 'WB20240101001', mblNo: 'MBL-OLD-001', transportMode: 'SEA', archiveTime: '2024-02-01', archivedBy: 'Admin' },
    ];

    const [data, setData] = useState<any[]>(mockData);

    const handleRestore = (record: any) => {
        Modal.confirm({
            title: i18n.t(LocaleHelper.getWaybillArchiveRestore()),
            content: `Restore waybill ${record.waybillNo}?`,
            onOk: () => {
                message.success('Restored successfully');
                setData(data.filter(item => item.waybillId !== record.waybillId));
            }
        });
    };

    const columns = [
        { title: i18n.t(LocaleHelper.getWaybillListWaybillNo()), dataIndex: 'waybillNo', key: 'waybillNo' },
        { title: i18n.t(LocaleHelper.getWaybillListMblNo()), dataIndex: 'mblNo', key: 'mblNo' },
        { title: i18n.t(LocaleHelper.getWaybillListTransportMode()), dataIndex: 'transportMode', key: 'transportMode' },
        { title: i18n.t(LocaleHelper.getWaybillArchiveArchiveTime()), dataIndex: 'archiveTime', key: 'archiveTime' },
        { title: i18n.t(LocaleHelper.getWaybillArchiveArchivedBy()), dataIndex: 'archivedBy', key: 'archivedBy' },
        {
            title: i18n.t(LocaleHelper.getWaybillListActions()),
            key: 'action',
            render: (_: any, record: any) => (
                <Space size="middle">
                    <a onClick={() => handleRestore(record)}>{i18n.t(LocaleHelper.getWaybillArchiveRestore())}</a>
                </Space>
            ),
        },
    ];

    const fields = [
        { name: 'waybillNo', label: i18n.t(LocaleHelper.getWaybillListWaybillNo()), type: 'input' },
        { name: 'archiveTime', label: i18n.t(LocaleHelper.getWaybillArchiveArchiveTime()), type: 'dateRange' },
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

export default ArchivedQuery;
