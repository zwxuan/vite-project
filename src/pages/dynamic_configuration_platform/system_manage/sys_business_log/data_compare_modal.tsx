
import React, { useState } from 'react';
import { Modal, Form, Input, InputNumber, Select, Button, Space, DatePicker, Switch } from 'antd';
import dayjs from 'dayjs';
import CompareData from '@/components/compare-data';


interface DataCompareModalProps {
    open: boolean;
    newJsonData: any;
    oldJsonData: any;
    onCancel: () => void;
}


const DataCompareModal: React.FC<DataCompareModalProps> = ({
    open,
    newJsonData,
    oldJsonData,
    onCancel,
}) => {
    const [jsonFormat, setJsonFormat] = useState(false);

    

    return (
        <Modal 
            open={open} 
            title={'对比操作'}
            onCancel={onCancel}
            destroyOnHidden = {true}
            maskClosable={false}
            style={{ top: 20 }}
            width={'55%'}
            footer={[
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
                    <div style={{ display: 'flex', alignItems: 'right', gap: '12px',paddingLeft: '32px' }}>
                        <span style={{ 
                            display: 'inline-flex', 
                            alignItems: 'center', 
                            fontSize: '12px',
                            color: '#666'
                        }}>
                            <span style={{
                                display: 'inline-block',
                                width: '32px',
                                height: '12px',
                                backgroundColor: '#ffecec',
                                marginRight: '4px',
                                borderRadius: '2px'
                            }}></span>
                            删除
                        </span>
                        <span style={{ 
                            display: 'inline-flex', 
                            alignItems: 'center', 
                            fontSize: '12px',
                            color: '#666'
                        }}>
                            <span style={{
                                display: 'inline-block',
                                width: '32px',
                                height: '12px',
                                backgroundColor: '#e6ffed',
                                marginRight: '4px',
                                borderRadius: '2px'
                            }}></span>
                            新增
                        </span>
                        <span style={{ 
                            display: 'inline-flex', 
                            alignItems: 'center', 
                            fontSize: '12px',
                            color: '#666'
                        }}>
                            <span style={{
                                display: 'inline-block',
                                width: '32px',
                                height: '12px',
                                backgroundColor: '#e6f3ff',
                                marginRight: '4px',
                                borderRadius: '2px'
                            }}></span>
                            修改
                        </span>
                    </div>
                    <Button type="primary" onClick={onCancel}>
                        关闭
                    </Button>
                </div>,
            ]}
        >
            <div className="nc-bill-search-area" style={{ height: '650px' }}>
                <div className="nc-bill-header-area">
                    <div className="header-title-search-area">
                        <div className="BillHeadInfoWrap BillHeadInfoWrap-showBackBtn" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <span className="bill-info-title" style={{ marginLeft: "10px",fontSize: "14px" }}>
                                2025-09-16 14:20:33  张晓小
                            </span>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginRight: '10px' }}>
                                <span style={{ fontSize: '12px', color: '#666' }}>标准JSON格式:</span>
                                <Switch 
                                    size="small"
                                    checked={jsonFormat}
                                    onChange={setJsonFormat}
                                    checkedChildren="开"
                                    unCheckedChildren="关"
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="search-area-contant" style={{ padding: '10px 10px', overflowY: 'auto', overflowX: 'hidden' }}>
                    <CompareData oldData={oldJsonData} newData={newJsonData} jsonFormat={jsonFormat} />
                </div>
            </div>
            
        </Modal>
    );
};

export default DataCompareModal;
