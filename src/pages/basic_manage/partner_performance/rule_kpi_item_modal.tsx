
import React, { useState } from 'react';
import { Modal, Form, Input, InputNumber, Select, Button, Space,DatePicker } from 'antd';
import { RuleKpiItemItemProps } from "@/types/basic_manage/rule_kpi_item";
import dayjs from 'dayjs';
import { githubDarkTheme, JsonEditor } from 'json-edit-react';
interface DetailModalProps {
    open: boolean;
    modalFlag: 'add' | 'edit';
    saving: boolean;
    formData: Partial<RuleKpiItemItemProps>;
    onCancel: () => void;
    onOk: (values: any) => void;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onDateChange: (name: string, value: string | Array<string>) => void;
    onNumberChange: (name:string,value: number | null) => void;
}

const formItemLayout = {
    labelCol: {
        xs: { span: 4 },
    },
    wrapperCol: {
        xs: { span: 20 },
    },
};

const RuleKpiItemModal: React.FC<DetailModalProps> = ({
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
    
    const data = {
name: 'John',
age: 30,
address: {
street: '123 Main St',
city: 'Anytown',
state: 'CA',
zip: '12345'
}
};
    return (
        <Modal 
            open={open} 
            title={modalFlag === 'add' ? "新增规则与KPI关联关系表" : "编辑规则与KPI关联关系表"}
            onCancel={onCancel}
            destroyOnClose={true}
            maskClosable={false}
            closable={!saving}
            width={'80%'}
            footer={null}
            centered={true}
        >
            <Form {...formItemLayout} initialValues={formData} disabled={saving} onFinish={onOk}>
                        <Form.Item label="关联项ID" name="ItemId" rules={[{ required: true, message: '' }]}>
                            <Input onChange={onChange} />
                        </Form.Item>
                        <Form.Item label="规则ID" name="RuleId" rules={[{ required: true, message: '' }]}>
                            <Input onChange={onChange} />
                        </Form.Item>
                        <Form.Item label="KPI" name="KpiId" rules={[{ required: true, message: '' }]}>
                            <Input onChange={onChange} />
                        </Form.Item>
                        <Form.Item label="权重（0-100%）" name="Weight" rules={[{ required: true, message: '' }]}>
                            <InputNumber onChange={(value)=>onNumberChange("Weight", value as number)} />
                        </Form.Item>
                        <Form.Item label="评分规则配置" name="ScoringConfig" rules={[{ required: true, message: '' }]}>
                            <JsonEditor minWidth={'80%'}
                                data={data}
                                onUpdate={ ({ newData }) => {
                                    console.log(newData);
                                }}
                                theme={githubDarkTheme}
                            />
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

export default RuleKpiItemModal;
