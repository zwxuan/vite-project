
import React from 'react';
import { Modal, Form, Input, InputNumber, Select, Button, Space, DatePicker, Tabs, Divider } from 'antd';
import { VoucherLogItemProps } from "@/types/finance_manage/voucher_log/voucher_log";
import BatchCreateVoucher from './tab_detail/batch/index'
import Invoice from './tab_detail/invoice';
import dayjs from 'dayjs';
interface DetailModalProps {
    open: boolean;
    modalFlag: 'add' | 'edit';
    saving: boolean;
    formData: Partial<VoucherLogItemProps>;
    onCancel: () => void;
    onOk: (values: any) => void;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onDateChange: (name: string, value: string | Array<string>) => void;
    onNumberChange: (name: string, value: number | null) => void;
}

const CreateVoucherModal: React.FC<DetailModalProps> = ({
    open,
    modalFlag,
    saving,
    formData,
    onCancel,
    onOk,
}) => {
    return (
        <Modal
            open={open}
            title={'生成凭证'}
            onCancel={onCancel}
            width={'90%'}
            height={'95%'}
            destroyOnClose={true}
            maskClosable={false}
            closable={!saving}
            footer={null}
            centered={true}
        >
            <Form initialValues={formData} disabled={saving} onFinish={onOk}>
                <div className='nc-bill-table-area'>
                    <Tabs size='middle' type="card"
                        items={[
                            {
                                label: '批量操作',
                                key: 'batch_create',
                                children: <BatchCreateVoucher />,
                            },
                            {
                                label: '应收发票',
                                key: 'invoice',
                                children: <Invoice />,
                            },
                            // {
                            //     label: '实际收付',
                            //     key: 'invoice',
                            //     children: <Invoice />,
                            // },
                        ]}
                    />
                </div>
                <Divider style={{ borderColor: '#7cb305' }}></Divider>
                <div style={{ textAlign: 'right' }}>
                    <Space>
                        <Button onClick={onCancel} disabled={saving}>取消</Button>
                        {modalFlag === 'add' && <Button disabled={saving}>保存并新增</Button>}
                        <Button type="primary" htmlType='submit' danger disabled={saving}>保存</Button>
                    </Space>
                </div>
            </Form>
            
        </Modal>
    );
};

export default CreateVoucherModal;
