
import React from 'react';
import { Modal, Form, Input, InputNumber, Select, Button, Space,DatePicker } from 'antd';
import { VoucherLogItemProps } from "@/types/finance_manage/voucher_log/voucher_log";
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
    onNumberChange: (name:string,value: number | null) => void;
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
    return (
        <Modal 
            open={open} 
            title={modalFlag === 'add' ? "新增凭证生成日志" : "编辑凭证生成日志"}
            onCancel={onCancel}
            width={'95%'}
            height={'95%'}
            destroyOnClose={true}
            maskClosable={false}
            closable={!saving}
            footer={null}
            centered={true}
        >
            <Form {...formItemLayout} style={{ maxWidth: 600 }} initialValues={formData} disabled={saving} onFinish={onOk}>
                        <Form.Item label="凭证流水号" name="VoucherSerialNo" rules={[{ required: true, message: '' }]}>
                            <Select onChange={onChange} />
                        </Form.Item>
                        <Form.Item label="凭证号" name="VoucherNo" >
                            <Input onChange={onChange} />
                        </Form.Item>
                        <Form.Item label="凭证类型" name="VoucherType" >
                            <Input onChange={onChange} />
                        </Form.Item>
                        <Form.Item label="凭证借贷合计" name="VoucherDebitCreditTotal" >
                            <InputNumber onChange={(value)=>onNumberChange("VoucherDebitCreditTotal", value as number)} />
                        </Form.Item>
                        <Form.Item label="凭证状态" name="VoucherStatus" >
                            <Input onChange={onChange} />
                        </Form.Item>
                        <Form.Item label="凭证日期"  >
                            <DatePicker name="VoucherDate" style={{ display: 'block' }} defaultValue={dayjs(formData.VoucherDate)}  onChange={(_, dateStrings) => {onDateChange("VoucherDate", dateStrings) }} />
                        </Form.Item>
                        <Form.Item label="凭证状态（第二个状态字段）" name="VoucherStatus2" >
                            <Input onChange={onChange} />
                        </Form.Item>
                        <Form.Item label="对方凭证号" name="CounterpartyVoucherNo" >
                            <Input onChange={onChange} />
                        </Form.Item>
                        <Form.Item label="借方金额" name="DebitAmount" >
                            <InputNumber onChange={(value)=>onNumberChange("DebitAmount", value as number)} />
                        </Form.Item>
                        <Form.Item label="贷方金额" name="CreditAmount" >
                            <InputNumber onChange={(value)=>onNumberChange("CreditAmount", value as number)} />
                        </Form.Item>
                        <Form.Item label="发送状态" name="SendStatus" >
                            <Input onChange={onChange} />
                        </Form.Item>
                        <Form.Item label="删除状态" name="DeleteStatus" >
                            <Input onChange={onChange} />
                        </Form.Item>
                        <Form.Item label="创建人" name="Creator" >
                            <Input onChange={onChange} />
                        </Form.Item>
                        <Form.Item label="创建日期"  >
                            <DatePicker name="CreateDate" style={{ display: 'block' }} defaultValue={dayjs(formData.CreateDate)}  onChange={(_, dateStrings) => {onDateChange("CreateDate", dateStrings) }} />
                        </Form.Item>
                        <Form.Item label="发送人" name="Sender" >
                            <Input onChange={onChange} />
                        </Form.Item>
                        <Form.Item label="发送日期"  >
                            <DatePicker name="SendDate" style={{ display: 'block' }} defaultValue={dayjs(formData.SendDate)}  onChange={(_, dateStrings) => {onDateChange("SendDate", dateStrings) }} />
                        </Form.Item>
                <Form.Item wrapperCol={{ offset: 14 }}></Form.Item>
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

export default DetailModal;
