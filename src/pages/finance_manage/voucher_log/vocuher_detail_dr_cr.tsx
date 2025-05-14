
import React from 'react';
import { Modal, Form, Input, InputNumber, Select, Button, Space, DatePicker } from 'antd';
import { VoucherLogItemProps } from "@/types/finance_manage/voucher_log/voucher_log";
import dayjs from 'dayjs';
interface DetailModalProps {
    open: boolean;
    onCancel: () => void;
    formData: Partial<VoucherLogItemProps>;
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

const VoucherDrCrModal: React.FC<DetailModalProps> = ({
    open,
    onCancel,
    formData,
}) => {
    return (
        <Modal
            open={open}
            title={'凭证明细'}
            onCancel={onCancel}
            width={'95%'}
            height={'95%'}
            destroyOnClose={true}
            maskClosable={false}
            footer={null}
            centered={true}
        >
            <div style={{ textAlign: 'right' }}>
                <Space>
                    <Button onClick={onCancel}>取消</Button>
                </Space>
            </div>
        </Modal>
    );
};

export default VoucherDrCrModal;
