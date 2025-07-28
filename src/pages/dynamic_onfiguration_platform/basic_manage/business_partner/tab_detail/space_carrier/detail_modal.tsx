
import React from 'react';
import { Modal, Form, Input, InputNumber, Select, Button, Space,DatePicker } from 'antd';
import { SpaceCarrierItemProps } from "@/types/dynamic_onfiguration_platform/basic_manage/space_carrier";
import dayjs from 'dayjs';
interface DetailModalProps {
    open: boolean;
    modalFlag: 'add' | 'edit';
    saving: boolean;
    formData: Partial<SpaceCarrierItemProps>;
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
            title={modalFlag === 'add' ? "新增舱位承运人" : "编辑舱位承运人"}
            onCancel={onCancel}
            destroyOnClose={true}
            maskClosable={false}
            closable={!saving}
            footer={null}
            centered={true}
        >
            <Form {...formItemLayout} style={{ maxWidth: 600 }} initialValues={formData} disabled={saving} onFinish={onOk}>
                        <Form.Item label="编号" name="Id" rules={[{ required: true, message: '' }]}>
                            <Input onChange={onChange} />
                        </Form.Item>
                        <Form.Item label="承运人" name="CarrierName" >
                            <Input onChange={onChange} />
                        </Form.Item>
                        <Form.Item label="承运人类型" name="CarrierType" >
                            <Input onChange={onChange} />
                        </Form.Item>
                        <Form.Item label="订舱方式" name="BookingMethod" >
                            <Input onChange={onChange} />
                        </Form.Item>
                        <Form.Item label="起运港" name="DeparturePort" >
                            <Input onChange={onChange} />
                        </Form.Item>
                        <Form.Item label="航线" name="Route" >
                            <Input onChange={onChange} />
                        </Form.Item>
                        <Form.Item label="目的港" name="DestinationPort" >
                            <Input onChange={onChange} />
                        </Form.Item>
                        <Form.Item label="国家" name="Country" >
                            <Input onChange={onChange} />
                        </Form.Item>
                        <Form.Item label="联系人" name="ContactPerson" >
                            <Input onChange={onChange} />
                        </Form.Item>
                        <Form.Item label="联系电话" name="ContactNumber" >
                            <Input onChange={onChange} />
                        </Form.Item>
                        <Form.Item label="邮箱" name="Email" >
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
