import React, { useState, useEffect } from 'react';
import { Modal, Table, message } from 'antd';
import { getPendingBookings, createManifestFromBooking } from '@/api/customs_compliance/manifest_security/manifest_declaration_service';
import i18n from '@/i18n';
import LocaleHelper from '@/utils/locale';

interface GenerateManifestModalProps {
    visible: boolean;
    onCancel: () => void;
    onSuccess: () => void;
}

const GenerateManifestModal: React.FC<GenerateManifestModalProps> = ({ visible, onCancel, onSuccess }) => {
    const [loading, setLoading] = useState(false);
    const [dataSource, setDataSource] = useState<any[]>([]);
    const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

    useEffect(() => {
        if (visible) {
            fetchData();
            setSelectedRowKeys([]);
        }
    }, [visible]);

    const fetchData = async () => {
        setLoading(true);
        try {
            const res = await getPendingBookings();
            setDataSource(res.list);
        } finally {
            setLoading(false);
        }
    };

    const handleOk = async () => {
        if (selectedRowKeys.length === 0) {
            message.warning(i18n.t(LocaleHelper.getSelectOne()) || '请至少选择一项');
            return;
        }
        setLoading(true);
        try {
            await createManifestFromBooking(selectedRowKeys as string[]);
            message.success(i18n.t(LocaleHelper.getSuccess()) || '操作成功');
            onSuccess();
        } finally {
            setLoading(false);
        }
    };

    const columns = [
        {
            title: '订舱号', // TODO: Add to locale
            dataIndex: 'bookingNo',
            key: 'bookingNo',
        },
        {
            title: '船名/航次',
            dataIndex: 'vesselVoyage',
            key: 'vesselVoyage',
        },
        {
            title: '目的港',
            dataIndex: 'destinationPort',
            key: 'destinationPort',
        },
        {
            title: '箱量摘要',
            dataIndex: 'containerSummary',
            key: 'containerSummary',
        },
    ];

    return (
        <Modal
            title={i18n.t(LocaleHelper.getManifestDeclarationListModalTitle()) || '选择待申报订舱单'}
            open={visible}
            onOk={handleOk}
            onCancel={onCancel}
            confirmLoading={loading}
            width={800}
        >
            <Table
                columns={columns}
                dataSource={dataSource}
                rowKey="bookingId"
                loading={loading}
                rowSelection={{
                    selectedRowKeys,
                    onChange: setSelectedRowKeys,
                }}
                pagination={false}
                size="small"
            />
        </Modal>
    );
};

export default GenerateManifestModal;
