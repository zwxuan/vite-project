import React from 'react';
import { Card, Tag, Avatar, Tooltip, Empty } from 'antd';
import { UserOutlined, ClockCircleOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

interface KanbanColumnProps {
    title: string;
    count: number;
    items: any[];
    color: string;
}

const KanbanColumn: React.FC<KanbanColumnProps> = ({ title, count, items, color }) => {
    const navigate = useNavigate();
    
    return (
        <div style={{ 
            flex: '0 0 300px', 
            backgroundColor: '#f5f5f5', 
            borderRadius: '8px', 
            display: 'flex', 
            flexDirection: 'column',
            height: '100%',
            maxHeight: '100%'
        }}>
            <div style={{ 
                padding: '12px 16px', 
                borderBottom: '1px solid #e8e8e8',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                backgroundColor: '#fff',
                borderTopLeftRadius: '8px',
                borderTopRightRadius: '8px',
                borderTop: `3px solid ${color}`
            }}>
                <span style={{ fontWeight: 600, fontSize: '15px' }}>{title}</span>
                <Tag color={count > 0 ? color : 'default'} style={{ marginRight: 0, borderRadius: '10px' }}>{count}</Tag>
            </div>
            
            <div style={{ 
                flex: 1, 
                overflowY: 'auto', 
                padding: '12px',
                display: 'flex',
                flexDirection: 'column',
                gap: '12px'
            }}>
                {items && items.length > 0 ? (
                    items.map((item: any) => (
                        <Card 
                            key={item.job_id} 
                            size="small" 
                            hoverable
                            style={{ borderRadius: '6px', border: 'none', boxShadow: '0 1px 2px rgba(0,0,0,0.05)' }}
                            onClick={() => navigate(`/customs_job_management/detail/${item.job_id}`)}
                        >
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                                <span style={{ fontWeight: 500, color: '#1890ff' }}>{item.job_id}</span>
                                {item.priority === 'high' && <Tag color="red" style={{ marginRight: 0, transform: 'scale(0.8)' }}>High</Tag>}
                            </div>
                            <div style={{ color: '#666', fontSize: '13px', marginBottom: '4px' }}>
                                {item.customer_name}
                            </div>
                            <div style={{ color: '#999', fontSize: '12px', marginBottom: '12px' }}>
                                {item.business_type}
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid #f0f0f0', paddingTop: '8px' }}>
                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                    <Avatar size={20} icon={<UserOutlined />} style={{ marginRight: '6px', backgroundColor: '#e6f7ff', color: '#1890ff' }} />
                                    <span style={{ fontSize: '12px', color: '#666' }}>{item.assigned_to_name || 'Unassigned'}</span>
                                </div>
                                <Tooltip title={item.created_at}>
                                    <ClockCircleOutlined style={{ fontSize: '12px', color: '#ccc' }} />
                                </Tooltip>
                            </div>
                        </Card>
                    ))
                ) : (
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100px', color: '#999' }}>
                        <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description={false} />
                    </div>
                )}
            </div>
        </div>
    );
};

export default KanbanColumn;
