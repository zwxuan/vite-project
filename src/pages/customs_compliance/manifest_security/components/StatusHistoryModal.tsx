import React, { useState, useEffect } from 'react';
import { Modal, Steps, Spin, Tag } from 'antd';
import { ClockCircleOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';

interface StatusHistoryItem {
    time: string;
    status: string;
    operator?: string;
    description?: string;
    code?: string;
}

interface StatusHistoryModalProps {
    visible: boolean;
    onCancel: () => void;
    title?: string;
    loading?: boolean;
    data: StatusHistoryItem[];
}

const StatusHistoryModal: React.FC<StatusHistoryModalProps> = ({
    visible,
    onCancel,
    title = '状态历史',
    loading = false,
    data,
}) => {
    return (
        <Modal
            title={title}
            open={visible}
            onCancel={onCancel}
            footer={null}
            width={600}
        >
            <Spin spinning={loading}>
                <div style={{ padding: '20px 0' }}>
                    <Steps
                        direction="vertical"
                        size="small"
                        current={0}
                        items={data.map((item, index) => ({
                            title: (
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
                                    <span style={{ fontWeight: 500 }}>{item.status}</span>
                                    <span style={{ fontSize: '12px', color: '#999' }}>{item.time}</span>
                                </div>
                            ),
                            description: (
                                <div style={{ marginTop: '4px' }}>
                                    {item.code && <Tag color="blue">{item.code}</Tag>}
                                    {item.description && <div style={{ color: '#666' }}>{item.description}</div>}
                                    {item.operator && <div style={{ fontSize: '12px', color: '#999', marginTop: '2px' }}>操作人: {item.operator}</div>}
                                </div>
                            ),
                            icon: index === 0 ? <ClockCircleOutlined style={{ color: '#1890ff' }} /> : undefined,
                            status: index === 0 ? 'process' : 'wait',
                        }))}
                    />
                </div>
            </Spin>
        </Modal>
    );
};

export default StatusHistoryModal;
