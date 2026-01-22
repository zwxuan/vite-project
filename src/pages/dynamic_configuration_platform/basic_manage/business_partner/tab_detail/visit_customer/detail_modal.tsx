
import React from 'react';
import { Modal, Form, Input, InputNumber, Select, Button, Space,DatePicker } from 'antd';
import { VisitCustomerItemProps } from "@/types/dynamic_configuration_platform/basic_manage/visit_customer";
import dayjs from 'dayjs';
interface DetailModalProps {
    open: boolean;
    modalFlag: 'add' | 'edit';
    saving: boolean;
    formData: Partial<VisitCustomerItemProps>;
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
            title={modalFlag === 'add' ? "新增拜访客户" : "编辑拜访客户"}
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
                        <Form.Item label="主题" name="Theme" >
                            <Input onChange={onChange} />
                        </Form.Item>
                        <Form.Item label="拜访时间"  >
                            <DatePicker name="VisitTime" style={{ display: 'block' }} defaultValue={dayjs(formData.VisitTime)}  onChange={(_, dateStrings) => {onDateChange("VisitTime", dateStrings || '') }} />
                        </Form.Item>
                        <Form.Item label="记录入" name="Recorder" >
                            <Input onChange={onChange} />
                        </Form.Item>
                        <Form.Item label="记录时间"  >
                            <DatePicker name="RecordTime" style={{ display: 'block' }} defaultValue={dayjs(formData.RecordTime)}  onChange={(_, dateStrings) => {onDateChange("RecordTime", dateStrings || '') }} />
                        </Form.Item>
                        <Form.Item label="拜访状态" name="Status" >
                            <Input onChange={onChange} />
                        </Form.Item>
                        <Form.Item label="地点" name="Location" >
                            <Input onChange={onChange} />
                        </Form.Item>
                        <Form.Item label="参与人" name="Participants" >
                            <Input onChange={onChange} />
                        </Form.Item>
                        <Form.Item label="拜访内容" name="Content" >
                            <Input onChange={onChange} />
                        </Form.Item>
                        <Form.Item label="拜访结果" name="Result" >
                            <Input onChange={onChange} />
                        </Form.Item>
                        <Form.Item label="下一步任务" name="NextTask" >
                            <Input onChange={onChange} />
                        </Form.Item>
                        <Form.Item label="汇报对象" name="ReportTo" >
                            <Input onChange={onChange} />
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
