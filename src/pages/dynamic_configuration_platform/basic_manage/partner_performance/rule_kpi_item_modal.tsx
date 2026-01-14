
import React, { useState } from 'react';
import { Modal, Form, Input, InputNumber, Select, Button, Space,DatePicker } from 'antd';
import { RuleKpiItemItemProps } from "@/types/dynamic_configuration_platform/basic_manage/rule_kpi_item";
import dayjs from 'dayjs';
import { githubDarkTheme, JsonEditor } from 'json-edit-react';
import TextArea from 'antd/es/input/TextArea';
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
    
    const data = {"method":"deduction","params":{"base_score":100,"deduct_per_unit":5,"unit":1,"max_deduction":50}};
    return (
        <Modal 
            open={open} 
            title={'绩效规则'}
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
                                showCollectionCount={false}
                                onUpdate={ ({ newData }) => {
                                    console.log(newData);
                                }}
                                theme={githubDarkTheme}
                            />
                        </Form.Item>
                        <Form.Item label="评分规则描述" name="Description" rules={[{ required: true, message: '' }]}>
                            <TextArea rows={4}></TextArea>
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
