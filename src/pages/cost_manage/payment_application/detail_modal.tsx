
import React, { useState } from 'react';
import { Modal, Form, Input, InputNumber, Select, Button, Space, DatePicker, message, Steps } from 'antd';
import { PaymentApplicationItemProps } from "@/types/cost_manage/payment_application/payment_application";
import dayjs from 'dayjs';
// import PaymentApplicationStep1 from './payment_application_step1';
const PaymentApplicationStep1 = React.lazy(() => import('./payment_application_step1'));
const PaymentApplicationStep2 = React.lazy(() => import('./payment_application_step2'));
// import PaymentApplicationStep2 from './payment_application_step2';
interface DetailModalProps {
    open: boolean;
    modalFlag: 'add' | 'edit';
    saving: boolean;
    formData: Partial<PaymentApplicationItemProps>;
    onCancel: () => void;
    onOk: (values: any) => void;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onDateChange: (name: string, value: string | Array<string>) => void;
    onNumberChange: (name: string, value: number | null) => void;
}

const formItemLayout = {
    labelCol: {
        xs: { span: 24 },
        sm: { span: 6 },
    },
    wrapperCol: {
        xs: { span: 24 },
        sm: { span: 14 },
    },
};
const steps = [
    {
        title: '',
        content: <PaymentApplicationStep1 />,
    },
    {
        title: '',
        content: <PaymentApplicationStep2 />,
    },
];
const DetailModal: React.FC<DetailModalProps> = ({
    open,
    modalFlag,
    saving,
    formData,
    onCancel,
    onOk,
    onChange,
    onDateChange,
    onNumberChange,
}) => {
    const [current, setCurrent] = useState(0);

    const next = () => {
        setCurrent(current + 1);
    };

    const prev = () => {
        setCurrent(current - 1);
    };
    const items = steps.map((item) => ({ key: item.title, title: item.title }));
    return (
        <Modal
            open={open}
            title={modalFlag === 'add' ? "新增付款申请" : "编辑付款申请"}
            onCancel={onCancel}
            width={'95%'}
            height={'95%'}
            destroyOnClose={true}
            maskClosable={false}
            closable={!saving}
            footer={null}
            centered={true}
        >
            <div className='invoice-container'>
                <Steps current={current} size='small' items={items} progressDot />
            </div>
            <div className='nc-bill-table-area'>
                {steps[current].content}
            </div>
            <div style={{ textAlign: 'right', paddingTop: '10px' }}>
                <Space>
                    {current < steps.length - 1 && (
                        <Button type="primary" onClick={() => next()}>
                            下一步
                        </Button>
                    )}
                    {current > 0 && (
                        <Button type="primary"  onClick={() => prev()}>
                            上一步
                        </Button>
                    )}
                    {current > 0 && (
                        <Button type="primary" danger disabled={saving} onClick={onOk} >保存</Button>
                    )}
                    <Button onClick={onCancel} disabled={saving}>取消</Button>
                    
                </Space>
            </div>
        </Modal>
    );
};

export default DetailModal;
