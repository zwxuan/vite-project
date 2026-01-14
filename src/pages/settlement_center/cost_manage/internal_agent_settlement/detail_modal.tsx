
import React from 'react';
import { Modal, Form, Input, InputNumber, Select, Button, Space,DatePicker } from 'antd';
import { InternalAgentSettlementItemProps } from "@/types/settlement_center/cost_manage/internal_agent_settlement";
import dayjs from 'dayjs';
interface DetailModalProps {
    open: boolean;
    modalFlag: 'add' | 'edit';
    saving: boolean;
    formData: Partial<InternalAgentSettlementItemProps>;
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
            title={modalFlag === 'add' ? "新增内部代理结算" : "编辑内部代理结算"}
            onCancel={onCancel}
            destroyOnClose={true}
            maskClosable={false}
            closable={!saving}
            footer={null}
        >
            <Form {...formItemLayout} style={{ maxWidth: 600 }} initialValues={formData} disabled={saving} onFinish={onOk}>
                        <Form.Item label="主键" name="Id" rules={[{ required: true, message: '' }]}>
                            <Input onChange={onChange} />
                        </Form.Item>
                        <Form.Item label="结算单号" name="SettlementNumber" >
                            <Input onChange={onChange} />
                        </Form.Item>
                        <Form.Item label="订单号" name="OrderNumber" >
                            <Input onChange={onChange} />
                        </Form.Item>
                        <Form.Item label="服务单号" name="ServiceNumber" >
                            <Input onChange={onChange} />
                        </Form.Item>
                        <Form.Item label="费用编号" name="CostId" >
                            <Input onChange={onChange} />
                        </Form.Item>
                        <Form.Item label="费用名称" name="CostName" >
                            <Input onChange={onChange} />
                        </Form.Item>
                        <Form.Item label="币制" name="Currency" >
                            <Input onChange={onChange} />
                        </Form.Item>
                        <Form.Item label="国内付香港" name="DomesticToHk" >
                            <Select onChange={onChange} />
                        </Form.Item>
                        <Form.Item label="香港收国内" name="HkReceiveDomestic" >
                            <Select onChange={onChange} />
                        </Form.Item>
                        <Form.Item label="香港代理支付" name="HkAgentPayment" >
                            <Select onChange={onChange} />
                        </Form.Item>
                        <Form.Item label="状态" name="Status" >
                            <Input onChange={onChange} />
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
