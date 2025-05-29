
import React from 'react';
import { Modal, Form, Input, InputNumber, Select, Button, Space, DatePicker } from 'antd';
import { EntryGroupingRuleItemProps } from "@/types/basic_manage/entry_grouping_rule";
import dayjs from 'dayjs';
interface DetailModalProps {
    open: boolean;
    modalFlag: 'add' | 'edit';
    saving: boolean;
    formData: Partial<EntryGroupingRuleItemProps>;
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
            title={modalFlag === 'add' ? "新增凭证分录规则" : "编辑凭证分录规则"}
            onCancel={onCancel}
            height={'95%'}
            destroyOnClose={true}
            maskClosable={false}
            closable={!saving}
            footer={null}
        >
            <Form {...formItemLayout} style={{ maxWidth: 600 }} initialValues={formData} disabled={saving} onFinish={onOk}>
                <Form.Item label="分录类型编码" name="EntryId" rules={[{ required: true, message: '' }]}>
                    <Input onChange={onChange} />
                </Form.Item>
                <Form.Item label="所属账套" name="BookName" rules={[{ required: true, message: '' }]}>
                    <Input onChange={onChange} />
                </Form.Item>
                <Form.Item label="分组类型名称" name="RuleName" rules={[{ required: true, message: '' }]}>
                    <Select style={{ flex: 1 }}
                        options={[
                            { "value": "1", "label": "应收发票" },
                            { "value": "2", "label": "应付发票" },
                            { "value": "3", "label": "实收实付" }
                        ]}
                    />
                </Form.Item>
                <Form.Item label="分录类型名称" name="EntryName" rules={[{ required: true, message: '' }]}>
                    <Input onChange={onChange} />
                </Form.Item>
                <Form.Item label="科目分级" name="AccountLevel" rules={[{ required: true, message: '' }]}>
                    <Select onChange={onChange} />
                </Form.Item>
                <Form.Item label="科目分组条件1" name="AccountGroup1By" rules={[{ required: true, message: '' }]}>
                    <Input onChange={onChange} />
                </Form.Item>
                <Form.Item label="科目分组条件2" name="AccountGroup2By" rules={[{ required: true, message: '' }]}>
                    <Input onChange={onChange} />
                </Form.Item>
                <Form.Item label="科目分组条件3" name="AccountGroup3By" rules={[{ required: true, message: '' }]}>
                    <Input onChange={onChange} />
                </Form.Item>
                <Form.Item label="科目分组条件4" name="AccountGroup4By" rules={[{ required: true, message: '' }]}>
                    <Input onChange={onChange} />
                </Form.Item>
                <Form.Item label="科目分组条件5" name="AccountGroup5By" rules={[{ required: true, message: '' }]}>
                    <Input onChange={onChange} />
                </Form.Item>
                <Form.Item label="科目分组条件6" name="AccountGroup6By" rules={[{ required: true, message: '' }]}>
                    <Input onChange={onChange} />
                </Form.Item>
                <Form.Item label="辅助核算分组条件1" name="AuxiliaryGroup1By" rules={[{ required: true, message: '' }]}>
                    <Input onChange={onChange} />
                </Form.Item>
                <Form.Item label="辅助核算分组条件2" name="AuxiliaryGroup2By" rules={[{ required: true, message: '' }]}>
                    <Input onChange={onChange} />
                </Form.Item>
                <Form.Item label="辅助核算分组条件3" name="AuxiliaryGroup3By" rules={[{ required: true, message: '' }]}>
                    <Input onChange={onChange} />
                </Form.Item>
                <Form.Item label="辅助核算分组条件4" name="AuxiliaryGroup4By" rules={[{ required: true, message: '' }]}>
                    <Input onChange={onChange} />
                </Form.Item>
                <Form.Item label="辅助核算分组条件5" name="AuxiliaryGroup5By" rules={[{ required: true, message: '' }]}>
                    <Input onChange={onChange} />
                </Form.Item>
                <Form.Item label="辅助核算分组条件6" name="AuxiliaryGroup6By" rules={[{ required: true, message: '' }]}>
                    <Input onChange={onChange} />
                </Form.Item>
                <Form.Item label="分录创建时间"  >
                    <DatePicker name="CreatedAt" style={{ display: 'block' }} defaultValue={dayjs(formData.CreatedAt)} onChange={(_, dateStrings) => { onDateChange("CreatedAt", dateStrings) }} />
                </Form.Item>
                <Form.Item label="分录最后更新时间"  >
                    <DatePicker name="UpdatedAt" style={{ display: 'block' }} defaultValue={dayjs(formData.UpdatedAt)} onChange={(_, dateStrings) => { onDateChange("UpdatedAt", dateStrings) }} />
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

