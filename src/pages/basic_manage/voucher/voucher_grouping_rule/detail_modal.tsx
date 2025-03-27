
import React from 'react';
import { Modal, Form, Input, InputNumber, Select, Button, Space, DatePicker } from 'antd';
import { VoucherGroupingRuleItemProps } from "@/types/voucher_grouping_rule/voucher_grouping_rule";
import dayjs from 'dayjs';
interface DetailModalProps {
    open: boolean;
    modalFlag: 'add' | 'edit';
    saving: boolean;
    formData: Partial<VoucherGroupingRuleItemProps>;
    onCancel: () => void;
    onOk: (values: any) => void;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onDateChange: (name: string, value: string | Array<string>) => void;
    onNumberChange: (name: string, value: number | null) => void;
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
            title={modalFlag === 'add' ? "新增凭证分组规则" : "编辑凭证分组规则"}
            onCancel={onCancel}
            destroyOnClose={true}
            maskClosable={false}
            closable={!saving}
            footer={null}
        >
            <Form {...formItemLayout} style={{ maxWidth: 600 }} initialValues={formData} disabled={saving} onFinish={onOk}>
                <Form.Item label="分组编码" name="RuleCode" rules={[{ required: true, message: '' }]}>
                    <Input onChange={onChange} />
                </Form.Item>
                <Form.Item label="所属账套" name="BookName" rules={[{ required: true, message: '' }]}>
                    <Input onChange={onChange} />
                </Form.Item>
                <Form.Item label="分组类型" name="RuleName" rules={[{ required: true, message: '' }]}>
                    <Input onChange={onChange} />
                </Form.Item>
                <Form.Item label="分组依据" name="GroupBy" rules={[{ required: true, message: '' }]}>
                    <Select style={{ flex: 1 }}
                        showSearch
                        filterOption={(input, option) =>
                            (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                        }
                        mode="multiple"
                        maxTagCount={2}
                        onChange={onChange}
                        options={[
                            { "value": "1", "label": "发票号" },
                            { "value": "2", "label": "结算单位" },
                            { "value": "3", "label": "销账编号" },
                            { "value": "4", "label": "业务单号" },
                            { "value": "5", "label": "业务日期" },
                            { "value": "6", "label": "开票日期" }
                        ]}
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

export default DetailModal;
