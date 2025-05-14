import React from 'react';
import { Modal, Form, Input, InputNumber, Select, Button, Space } from 'antd';
import { CurrencyItemProps } from "@/types/basic_manage/currency/currency";

interface DetailModalProps {
    open: boolean;
    modalFlag: 'add' | 'edit';
    saving: boolean;
    formData: Partial<CurrencyItemProps>;
    onCancel: () => void;
    onOk: (values: any) => void;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
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
    onChange
}) => {
    return (
        <Modal 
            open={open} 
            title={modalFlag === 'add' ? '新增币种' : '编辑币种'}
            onCancel={onCancel}
            width={600}
            destroyOnClose={true}
            maskClosable={false}
            closable={!saving}
            footer={null}
        >
            <Form {...formItemLayout} style={{ maxWidth: 600 }} initialValues={formData} disabled={saving} onFinish={onOk}>
                <Form.Item label="币种" name="CurrencyFullName" rules={[{ required: true, message: '' }]}>
                    <Input onChange={onChange} />
                </Form.Item>
                <Form.Item label="币种简称" name="CurrencyShortName" rules={[{ required: true, message: '' }]}>
                    <Input onChange={onChange} />
                </Form.Item>
                <Form.Item label="币种符号" name="CurrencyMark">
                    <Input />
                </Form.Item>
                <Form.Item label="单价精度" name="PricePrecision" rules={[{ required: true, message: '' }]}>
                    <InputNumber />
                </Form.Item>
                <Form.Item label="单价舍入规则" name="PriceRoundingRule" rules={[{ required: true, message: '' }]}>
                    <Select />
                </Form.Item>
                <Form.Item label="金额精度" name="AmountPrecision" rules={[{ required: true, message: '' }]}>
                    <InputNumber />
                </Form.Item>
                <div style={{ color: 'red', paddingLeft: '100px', paddingRight: '20px' }}>
                    警告:金额精度会影响财务报表。多数国家/地区财务报表金额和发票金额一般最多2位，如要超过2位，请确保财务部门认可。
                </div>
                <Form.Item label="金额舍入规则" name="AmountRoundingRule" rules={[{ required: true, message: '' }]}>
                    <Select />
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