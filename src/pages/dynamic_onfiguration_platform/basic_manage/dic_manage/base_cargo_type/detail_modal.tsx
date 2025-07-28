
import React from 'react';
import { Modal, Form, Input, InputNumber, Select, Button, Space,DatePicker } from 'antd';
import { BaseCargoTypeItemProps } from "@/types/dynamic_onfiguration_platform/basic_manage/base_cargo_type";
import dayjs from 'dayjs';
interface DetailModalProps {
    open: boolean;
    modalFlag: 'add' | 'edit';
    saving: boolean;
    formData: Partial<BaseCargoTypeItemProps>;
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
            title={modalFlag === 'add' ? "新增货物类型" : "编辑货物类型"}
            onCancel={onCancel}
            destroyOnClose={true}
            maskClosable={false}
            closable={!saving}
            footer={null}
            centered={true}
        >
            <Form {...formItemLayout} style={{ maxWidth: 600 }} initialValues={formData} disabled={saving} onFinish={onOk}>
                        <Form.Item label="编码" name="Id" rules={[{ required: true, message: '' }]}>
                            <Input onChange={onChange} />
                        </Form.Item>
                        <Form.Item label="英文名称" name="EnglishName" >
                            <Input onChange={onChange} />
                        </Form.Item>
                        <Form.Item label="中文名称" name="ChineseName" >
                            <Input onChange={onChange} />
                        </Form.Item>
                        <Form.Item label="说明" name="Description" >
                            <Input onChange={onChange} />
                        </Form.Item>
                        <Form.Item label="海运使用" name="OceanUse" >
                            <Select onChange={onChange} />
                        </Form.Item>
                        <Form.Item label="空运使用" name="AirUse" >
                            <Select onChange={onChange} />
                        </Form.Item>
                        <Form.Item label="FBA海运使用" name="FbaOceanUse" >
                            <Select onChange={onChange} />
                        </Form.Item>
                        <Form.Item label="FBA空运使用" name="FbaAirUse" >
                            <Select onChange={onChange} />
                        </Form.Item>
                        <Form.Item label="FBA铁路使用" name="FbaRailUse" >
                            <Select onChange={onChange} />
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
