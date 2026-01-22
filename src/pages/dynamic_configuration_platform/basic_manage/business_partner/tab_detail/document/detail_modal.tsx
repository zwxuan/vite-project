
import React from 'react';
import { Modal, Form, Input, InputNumber, Select, Button, Space,DatePicker } from 'antd';
import { OrderDocumentItemProps } from "@/types/settlement_center/business_manage/order_document";
import dayjs from 'dayjs';
interface DetailModalProps {
    open: boolean;
    modalFlag: 'add' | 'edit';
    saving: boolean;
    formData: Partial<OrderDocumentItemProps>;
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
            title={modalFlag === 'add' ? "新增订单文档" : "编辑订单文档"}
            onCancel={onCancel}
            width={600}
            destroyOnClose={true}
            maskClosable={false}
            closable={!saving}
            footer={null}
        >
            <Form {...formItemLayout} style={{ maxWidth: 600 }} initialValues={formData} disabled={saving} onFinish={onOk}>
                        <Form.Item label="文件名" name="FileName" rules={[{ required: true, message: '' }]}>
                            <Input onChange={onChange} />
                        </Form.Item>
                        <Form.Item label="版本" name="Version" >
                            <Input onChange={onChange} />
                        </Form.Item>
                        <Form.Item label="文件类型" name="FileType" >
                            <Input onChange={onChange} />
                        </Form.Item>
                        <Form.Item label="文件格式" name="FileFormat" >
                            <Input onChange={onChange} />
                        </Form.Item>
                        <Form.Item label="文件大小" name="FileSize" >
                            <Select onChange={onChange} />
                        </Form.Item>
                        <Form.Item label="创建人" name="CreatedBy" >
                            <Input onChange={onChange} />
                        </Form.Item>
                        <Form.Item label="创建日期"  >
                            <DatePicker name="CreatedDate" style={{ display: 'block' }} defaultValue={dayjs(formData.CreatedDate)}  onChange={(_, dateStrings) => {onDateChange("CreatedDate", dateStrings || '') }} />
                        </Form.Item>
                        <Form.Item label="文件来源" name="FileSource" >
                            <Input onChange={onChange} />
                        </Form.Item>
                        <Form.Item label="属性详情" name="AttributeDetails" >
                            <Input onChange={onChange} />
                        </Form.Item>
                        <Form.Item label="同步状态" name="SyncStatus" >
                            <Input onChange={onChange} />
                        </Form.Item>
                        <Form.Item label="外部文件类型" name="ExternalFileType" >
                            <Input onChange={onChange} />
                        </Form.Item>
                        <Form.Item label="最后同步时间"  >
                            <DatePicker name="LastSyncTime" style={{ display: 'block' }} defaultValue={dayjs(formData.LastSyncTime)}  onChange={(_, dateStrings) => {onDateChange("LastSyncTime", dateStrings || '') }} />
                        </Form.Item>
                        <Form.Item label="操作" name="Operation" >
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

