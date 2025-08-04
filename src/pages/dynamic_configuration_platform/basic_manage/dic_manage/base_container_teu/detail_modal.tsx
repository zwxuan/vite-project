
import React from 'react';
import { Modal, Form, Input, InputNumber, Select, Button, Space,DatePicker } from 'antd';
import { BaseContainerTeuItemProps } from "@/types/dynamic_configuration_platform/basic_manage/base_container_teu";
import dayjs from 'dayjs';
interface DetailModalProps {
    open: boolean;
    modalFlag: 'add' | 'edit';
    saving: boolean;
    formData: Partial<BaseContainerTeuItemProps>;
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
            title={modalFlag === 'add' ? "新增箱型 TEU" : "编辑箱型 TEU"}
            onCancel={onCancel}
            destroyOnClose={true}
            maskClosable={false}
            closable={!saving}
            footer={null}
            centered={true}
        >
            <Form {...formItemLayout} style={{ maxWidth: 600 }} initialValues={formData} disabled={saving} onFinish={onOk}>
                        <Form.Item label="编码" name="ContainerCode" rules={[{ required: true, message: '' }]}>
                            <Input onChange={onChange} />
                        </Form.Item>
                        <Form.Item label="尺寸" name="ContainerSize" >
                            <Input onChange={onChange} />
                        </Form.Item>
                        <Form.Item label="箱种" name="ContainerType" >
                            <Input onChange={onChange} />
                        </Form.Item>
                        <Form.Item label="交换码" name="ExchangeCode" >
                            <Input onChange={onChange} />
                        </Form.Item>
                        <Form.Item label="ISO编码" name="IsoCode" >
                            <Input onChange={onChange} />
                        </Form.Item>
                        <Form.Item label="TEU" name="TeuValue" >
                            <InputNumber onChange={(value)=>onNumberChange("TeuValue", value as number)} />
                        </Form.Item>
                        <Form.Item label="更新人" name="UpdatedBy" >
                            <Input onChange={onChange} />
                        </Form.Item>
                        <Form.Item label="更新时间"  >
                            <DatePicker name="UpdatedTime" style={{ display: 'block' }} defaultValue={dayjs(formData.UpdatedTime)}  onChange={(_, dateStrings) => {onDateChange("UpdatedTime", dateStrings) }} />
                        </Form.Item>
                        <Form.Item label="创建人" name="CreatedBy" >
                            <Input onChange={onChange} />
                        </Form.Item>
                        <Form.Item label="创建时间"  >
                            <DatePicker name="CreatedTime" style={{ display: 'block' }} defaultValue={dayjs(formData.CreatedTime)}  onChange={(_, dateStrings) => {onDateChange("CreatedTime", dateStrings) }} />
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
