
import React, { useState } from 'react';
import { Modal, Form, Input, InputNumber, Select, Button, Space,DatePicker } from 'antd';
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

    

    return (
        <Modal 
            open={open} 
            title={'对比操作'}
            onCancel={onCancel}
            destroyOnClose={true}
            maskClosable={false}
            style={{ top: 20 }}
            width={'55%'}
            footer={[
                <Button type="primary" onClick={onCancel}>
                    关闭
                </Button>,
            ]}
        >
            <div className="nc-bill-search-area" style={{ height: '650px' }}>
                <div className="nc-bill-header-area">
                    <div className="header-title-search-area">
                        <div className="BillHeadInfoWrap BillHeadInfoWrap-showBackBtn">
                            <span className="bill-info-title" style={{ marginLeft: "10px",fontSize: "14px" }}>
                                2025-09-16 14:20:33  张晓小
                            </span>
                        </div>
                    </div>
                </div>
                <div className="search-area-contant" style={{ padding: '10px 10px', overflowY: 'auto', overflowX: 'hidden' }}>
                    <CompareData oldData={oldJsonData} newData={newJsonData} />
                </div>
            </div>
            
        </Modal>
    );
};

export default DataCompareModal;
