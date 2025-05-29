
import React from 'react';
import { Modal, Form, Input, InputNumber, Select, Button, Space,DatePicker } from 'antd';
import { BlReleaseItemProps } from "@/types/cost_manage/bl_release";
import dayjs from 'dayjs';
interface DetailModalProps {
    open: boolean;
    modalFlag: 'add' | 'edit';
    saving: boolean;
    formData: Partial<BlReleaseItemProps>;
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
            title={modalFlag === 'add' ? "新增提单放单" : "编辑提单放单"}
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
                        <Form.Item label="业务编号" name="BusinessId" rules={[{ required: true, message: '' }]}>
                            <Select onChange={onChange} />
                        </Form.Item>
                        <Form.Item label="委托单位" name="Consignor" >
                            <Input onChange={onChange} />
                        </Form.Item>
                        <Form.Item label="订舱代理" name="BookingAgent" >
                            <Input onChange={onChange} />
                        </Form.Item>
                        <Form.Item label="船公司" name="ShippingCompany" >
                            <Input onChange={onChange} />
                        </Form.Item>
                        <Form.Item label="目的港" name="PostOfDestination" >
                            <Input onChange={onChange} />
                        </Form.Item>
                        <Form.Item label="开航日期"  >
                            <DatePicker name="SailingDate" style={{ display: 'block' }} defaultValue={dayjs(formData.SailingDate)}  onChange={(_, dateStrings) => {onDateChange("SailingDate", dateStrings) }} />
                        </Form.Item>
                        <Form.Item label="船名/航次" name="VesselVoyage" >
                            <Input onChange={onChange} />
                        </Form.Item>
                        <Form.Item label="MB/L" name="MblNumber" >
                            <Input onChange={onChange} />
                        </Form.Item>
                        <Form.Item label="放单审核状态" name="ReleaseAuditStatus" >
                            <Input onChange={onChange} />
                        </Form.Item>
                        <Form.Item label="提单状态" name="BlStatus" >
                            <Input onChange={onChange} />
                        </Form.Item>
                        <Form.Item label="审核时间"  >
                            <DatePicker name="AuditTime" style={{ display: 'block' }} defaultValue={dayjs(formData.AuditTime)}  onChange={(_, dateStrings) => {onDateChange("AuditTime", dateStrings) }} />
                        </Form.Item>
                        <Form.Item label="销售" name="SalesPerson" >
                            <Input onChange={onChange} />
                        </Form.Item>
                        <Form.Item label="放单号" name="ReleaseNumber" >
                            <Input onChange={onChange} />
                        </Form.Item>
                        <Form.Item label="合约是否有效" name="ContractValid" >
                            <Select onChange={onChange} />
                        </Form.Item>
                        <Form.Item label="是否开票" name="Invoiced" >
                            <Select onChange={onChange} />
                        </Form.Item>
                        <Form.Item label="是否全部核销" name="FullyWrittenOff" >
                            <Select onChange={onChange} />
                        </Form.Item>
                        <Form.Item label="是否超期" name="Overdue" >
                            <Select onChange={onChange} />
                        </Form.Item>
                        <Form.Item label="是否超额" name="OverLimit" >
                            <Select onChange={onChange} />
                        </Form.Item>
                        <Form.Item label="备注" name="Remarks" >
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

