import React, { useState, useEffect } from 'react';
import { Modal, Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';

interface OperationLogModalProps {
    visible: boolean;
    onCancel: () => void;
}

interface LogItem {
    key: string;
    operateTime: string;
    operator: string;
    action: string;
    result: string;
    details: string;
}

const OperationLogModal: React.FC<OperationLogModalProps> = ({ visible, onCancel }) => {
    const [loading, setLoading] = useState(false);
    const [dataSource, setDataSource] = useState<LogItem[]>([]);

    useEffect(() => {
        if (visible) {
            setLoading(true);
            // Mock data
            setTimeout(() => {
                const data: LogItem[] = [
                    {
                        key: '1',
                        operateTime: '2023-10-27 10:00:00',
                        operator: 'System Admin',
                        action: '批量申报',
                        result: '成功',
                        details: '申报了 3 条记录',
                    },
                    {
                        key: '2',
                        operateTime: '2023-10-26 15:30:00',
                        operator: 'User A',
                        action: '导入',
                        result: '成功',
                        details: '导入文件 manifest_data.xlsx',
                    },
                    {
                        key: '3',
                        operateTime: '2023-10-26 09:15:00',
                        operator: 'User B',
                        action: '新建',
                        result: '成功',
                        details: '新建申报单 MD20231026001',
                    },
                ];
                setDataSource(data);
                setLoading(false);
            }, 500);
        }
    }, [visible]);

    const columns: ColumnsType<LogItem> = [
        {
            title: '操作时间',
            dataIndex: 'operateTime',
            key: 'operateTime',
            width: 180,
        },
        {
            title: '操作人',
            dataIndex: 'operator',
            key: 'operator',
            width: 120,
        },
        {
            title: '操作类型',
            dataIndex: 'action',
            key: 'action',
            width: 150,
        },
        {
            title: '操作结果',
            dataIndex: 'result',
            key: 'result',
            width: 100,
        },
        {
            title: '详情',
            dataIndex: 'details',
            key: 'details',
        },
    ];

    return (
        <Modal
            title="操作日志"
            open={visible}
            onCancel={onCancel}
            footer={null}
            width={800}
        >
            <Table
                columns={columns}
                dataSource={dataSource}
                loading={loading}
                pagination={false}
                size="small"
                scroll={{ y: 400 }}
            />
        </Modal>
    );
};

export default OperationLogModal;
