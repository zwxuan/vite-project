
import React from 'react';
import { Modal, Form, Input, InputNumber, Select, Button, Space, DatePicker, Col, Row, Radio } from 'antd';
import { ContractsManageItemProps } from "@/types/basic_manage/contracts_manage";
import dayjs from 'dayjs';
import DatePickerZH from '@/components/date-picker';
import TextArea from 'antd/es/input/TextArea';
import './contracts_detail.less'
import CodeBoxMeta from '@/components/code-box-meta';
interface DetailModalProps {
    open: boolean;
    modalFlag: 'add' | 'edit';
    saving: boolean;
    formData: Partial<ContractsManageItemProps>;
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
            title={modalFlag === 'add' ? "新增合同管理" : "编辑合同管理"}
            onCancel={onCancel}
            destroyOnClose={true}
            maskClosable={false}
            closable={!saving}
            width='850px'
            footer={null}
            centered={true}
        >
            <Form {...formItemLayout} initialValues={formData} style={{width:'800px'}} disabled={saving} onFinish={onOk}>
                <div className="item-charging-container-modal">
                    <Row gutter={24} style={{ paddingRight: '6px' }}>
                        <Col span={12}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                <label className='item-lable-title'>合作伙伴</label>
                                <Input style={{ flex: 1 }} />
                            </div>
                        </Col>
                        <Col span={12}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                <label className='item-lable-title'>合同编号</label>
                                <Input style={{ flex: 1 }} />
                            </div>
                        </Col>
                    </Row>
                    <Row gutter={24} style={{ paddingRight: '6px' }}>
                        <Col span={12}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                <label className='item-lable-title'>生效日期</label>
                                <DatePickerZH style={{ flex: 1 }} />
                            </div>
                        </Col>
                        <Col span={12}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                <label className='item-lable-title'>失效日期</label>
                                <DatePickerZH style={{ flex: 1 }} />
                            </div>
                        </Col>
                    </Row>
                    <Row gutter={24} style={{ paddingRight: '6px' }}>
                        <Col span={12}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                <label className='item-lable-title'>应用规则</label>
                                <Select style={{ flex: 1 }} />
                            </div>
                        </Col>
                        <Col span={12}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>

                            </div>
                        </Col>
                    </Row>
                    <Row gutter={24} style={{ paddingRight: '6px' }}>
                        <Col span={24}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                <label className='item-lable-title'>合同协议</label>
                                <Radio.Group
                                    name="radiogroup"
                                    defaultValue={1}
                                    style={{ flex: 1 }}
                                    options={[
                                        { value: 1, label: '客户合同' },
                                        { value: 2, label: '供应商合同' },
                                        { value: 3, label: '海外代理合同' },
                                        { value: 4, label: '其他合同' },
                                    ]}
                                />
                            </div>
                        </Col>
                    </Row>
                    <Row gutter={24} style={{ paddingRight: '6px' }}>
                        <Col span={24}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                <label className='item-lable-title'>备注</label>
                                <TextArea
                                    name="radiogroup"
                                    style={{ flex: 1 }}
                                />
                            </div>
                        </Col>
                    </Row>
                    <Row gutter={24} style={{ paddingRight: '6px' }}>
                        <Col span={12}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                <label className='item-lable-title'>日期类型</label>
                                <DatePickerZH style={{ flex: 1 }} />
                            </div>
                        </Col>
                        <Col span={12}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                <label className='item-lable-title'>结算方式</label>
                                <Select style={{ flex: 1 }} />
                            </div>
                        </Col>
                    </Row>
                    <Row gutter={24} style={{ paddingRight: '6px' }}>
                        <Col span={12}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                <label className='item-lable-title'>额度</label>
                                <InputNumber style={{ flex: 1 }} onChange={(value) => onNumberChange("CreditLimit", value as number)} />
                                <Select style={{ flex: 1 }} />
                            </div>
                        </Col>
                        <Col span={12}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                <label className='item-lable-title'>账期</label>
                                <InputNumber style={{ flex: 1 }} onChange={(value) => onNumberChange("CreditLimit", value as number)} />
                                <Select style={{ flex: 1 }} />
                            </div>
                        </Col>
                    </Row>
                    <Row gutter={24} style={{ paddingRight: '6px' }}>
                        <Col span={24}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                {/* 根据结算方式和账期自动选择，结算方式选择了或者账期大于0，非票结 */}
                                <label className='item-lable-title'>结算类型</label>
                                <Radio.Group
                                    name="radiogroup"
                                    defaultValue={1}
                                    style={{ flex: 1 }}
                                    options={[
                                        { value: 1, label: '票结' },
                                        { value: 2, label: '非票结（结算方式：每月指定日期或账期大于0天）' },
                                    ]}
                                />
                            </div>
                        </Col>
                    </Row>
                    <div style={{ textAlign: 'right' }}>
                        <Space>
                            <Button onClick={onCancel} disabled={saving}>取消</Button>
                            {modalFlag === 'add' && <Button disabled={saving}>保存并新增</Button>}
                            <Button type="primary" htmlType='submit' danger disabled={saving}>保存</Button>
                        </Space>
                    </div>
                </div>

            </Form>
        </Modal>
    );
};

export default DetailModal;
