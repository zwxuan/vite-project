
import React from 'react';
import { Modal, Form, Input, InputNumber, Select, Button, Space,DatePicker } from 'antd';
import { EmployeeCategoryItemProps } from "@/types/org_manage/employee_category";
import dayjs from 'dayjs';
const {TextArea} = Input;
interface DetailModalProps {
    open: boolean;
    modalFlag: 'add' | 'edit';
    saving: boolean;
    formData: Partial<EmployeeCategoryItemProps>;
    onCancel: () => void;
    onOk: (values: any) => void;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onDateChange: (name: string, value: string | Array<string>) => void;
    onNumberChange: (name:string,value: number | null) => void;
    onChangeTetxtArea : (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
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
    onChangeTetxtArea,
}) => {
    return (
        <Modal 
            open={open} 
            title={modalFlag === 'add' ? "新增员工类别" : "编辑员工类别"}
            onCancel={onCancel}
            destroyOnClose={true}
            maskClosable={false}
            closable={!saving}
            footer={null}
            centered={true}
        >
            <Form {...formItemLayout} style={{ maxWidth: 600 }} initialValues={formData} disabled={saving} onFinish={onOk}>
                        <Form.Item label="员工类别编码" name="CategoryCode" rules={[{ required: true, message: '' }]}>
                            <Input onChange={onChange} />
                        </Form.Item>
                        <Form.Item label="员工类别名称" name="CategoryName" rules={[{ required: true, message: '' }]}>
                            <Input onChange={onChange} />
                        </Form.Item>
                        <Form.Item label="状态" name="Status" rules={[{ required: true, message: '' }]}>
                            <Select onChange={onChange} 
                                options={[
                                    { value: '1', label: '已启用' },
                                    { value: '0', label: '已停用' },
                                ]}
                            />
                        </Form.Item>
                        <Form.Item label="备注" name="Remarks" >
                            <TextArea rows={4} onChange={onChangeTetxtArea} showCount maxLength={200}  style={{ height: 120, resize: 'none' }} />
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
