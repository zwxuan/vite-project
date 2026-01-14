
import React, { useState } from 'react';
import { Modal, Form, Input, InputNumber, Select, Button, Space,DatePicker } from 'antd';
import dayjs from 'dayjs';
import { githubDarkTheme, JsonEditor } from 'json-edit-react';
import TextArea from 'antd/es/input/TextArea';
interface DetailModalProps {
    open: boolean;
    jsonData: any;
    onCancel: () => void;
}

const formItemLayout = {
    labelCol: {
        xs: { span: 4 },
    },
    wrapperCol: {
        xs: { span: 20 },
    },
};

const DetailDataModal: React.FC<DetailModalProps> = ({
    open,
    jsonData,
    onCancel,
}) => {
    
    return (
        <Modal 
            open={open} 
            title={'详细数据'}
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
                    <JsonEditor minWidth={'100%'}
                        data={jsonData}
                        showCollectionCount={false}
                        onUpdate={ ({ newData }) => {
                            console.log(newData);
                    }}
                theme={githubDarkTheme}
            />
                </div>
            </div>
            
        </Modal>
    );
};

export default DetailDataModal;
