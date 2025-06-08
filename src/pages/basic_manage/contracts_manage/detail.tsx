import React, { useRef, useState } from 'react';
import { Form, Input, InputNumber, Select, Button, Space, DatePicker, Radio } from 'antd';
import { ContractsManageItemProps } from "@/types/basic_manage/contracts_manage";
import dayjs from 'dayjs';
import TextArea from 'antd/es/input/TextArea';

interface DetailProps {
    formData: Partial<ContractsManageItemProps>;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onDateChange: (name: string, value: string | Array<string>) => void;
    onNumberChange: (name: string, value: number | null) => void;
    onSave: () => void;
    onCancel: () => void;
    saving?: boolean;
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

const Detail: React.FC<DetailProps> = ({
    formData,
    onChange,
    onDateChange,
    onNumberChange,
    onSave,
    onCancel,
    saving = false,
}) => {
    const [contractAgreementType, setContractAgreementType] = useState('客户合同');
    const [dateType, setDateType] = useState('ETD');
    
    const [settlementMethod, setSettlementMethod] = useState('按月结算');
    const [extensionType, setExtensionType] = useState('票结');
    
    return (
        <div style={{ padding: '20px', backgroundColor: '#fff' }}>
            <Form {...formItemLayout} style={{ maxWidth: 800 }} initialValues={formData} disabled={saving}>
                {/* 第一行 */}
                <div style={{ display: 'flex', gap: '20px', marginBottom: '16px' }}>
                    <div style={{ flex: 1 }}>
                        <Form.Item label="合作伙伴" name="Partner" rules={[{ required: true, message: '请输入合作伙伴' }]}>
                            <Input placeholder="请输入合作伙伴" onChange={onChange} />
                        </Form.Item>
                    </div>
                    <div style={{ flex: 1 }}>
                        <Form.Item label="合同编号" name="ContractId">
                            <Input onChange={onChange} />
                        </Form.Item>
                    </div>
                </div>

                {/* 第二行 */}
                <div style={{ display: 'flex', gap: '20px', marginBottom: '16px' }}>
                    <div style={{ flex: 1 }}>
                        <Form.Item label="生效日期" name="EffectiveDate">
                            <DatePicker 
                                style={{ width: '100%' }} 
                                defaultValue={dayjs(formData.EffectiveDate)}
                                onChange={(_, dateStrings) => onDateChange("EffectiveDate", dateStrings)} 
                            />
                        </Form.Item>
                    </div>
                    <div style={{ flex: 1 }}>
                        <Form.Item label="失效日期" name="ExpirationDate">
                            <DatePicker 
                                style={{ width: '100%' }} 
                                defaultValue={dayjs(formData.ExpirationDate)}
                                onChange={(_, dateStrings) => onDateChange("ExpirationDate", dateStrings)} 
                            />
                        </Form.Item>
                    </div>
                </div>

                {/* 第三行 */}
                <div style={{ marginBottom: '16px' }}>
                    <Form.Item label="应用规则" name="ApplicationRule">
                        <Select defaultValue="全部订单" style={{ width: '100%' }}>
                            <Select.Option value="全部订单">全部订单</Select.Option>
                            <Select.Option value="指定订单">指定订单</Select.Option>
                        </Select>
                    </Form.Item>
                </div>

                {/* 第四行 - 到期后续签信息 */}
                <div style={{ marginBottom: '16px' }}>
                    <Form.Item label="到期后续签信息">
                        <Input placeholder="一个合同包含多种合同协议" />
                    </Form.Item>
                </div>

                {/* 第五行 - 合同协议 */}
                <div style={{ marginBottom: '16px' }}>
                    <Form.Item label="合同协议">
                        <Radio.Group 
                            value={contractAgreementType} 
                            onChange={(e) => setContractAgreementType(e.target.value)}
                        >
                            <Radio value="客户合同">客户合同</Radio>
                            <Radio value="供应商合同">供应商合同</Radio>
                            <Radio value="海外代理合同">海外代理合同</Radio>
                            <Radio value="其他合同">其他合同</Radio>
                        </Radio.Group>
                    </Form.Item>
                </div>

                {/* 第六行 - 备注 */}
                <div style={{ marginBottom: '16px' }}>
                    <Form.Item label="备注" name="Remarks">
                        <TextArea rows={4} />
                    </Form.Item>
                </div>

                {/* 当前信息标题 */}
                <div style={{ 
                    backgroundColor: '#1890ff', 
                    color: 'white', 
                    padding: '8px 16px', 
                    marginBottom: '16px',
                    borderRadius: '4px'
                }}>
                    当前信息
                </div>

                {/* 第七行 */}
                <div style={{ display: 'flex', gap: '20px', marginBottom: '16px' }}>
                    <div style={{ flex: 1 }}>
                        <Form.Item label="数据" name="Data">
                            <Select placeholder="请选择">
                                <Select.Option value="option1">选项1</Select.Option>
                                <Select.Option value="option2">选项2</Select.Option>
                            </Select>
                        </Form.Item>
                    </div>
                    <div style={{ flex: 1 }}>
                        <Form.Item label="账期" name="PaymentTerm">
                            <Select placeholder="请选择">
                                <Select.Option value="option1">选项1</Select.Option>
                                <Select.Option value="option2">选项2</Select.Option>
                            </Select>
                        </Form.Item>
                    </div>
                </div>

                {/* 第八行 */}
                <div style={{ display: 'flex', gap: '20px', marginBottom: '16px' }}>
                    <div style={{ flex: 1 }}>
                        <Form.Item label="合同条款">
                            <Select placeholder="请选择">
                                <Select.Option value="option1">选项1</Select.Option>
                                <Select.Option value="option2">选项2</Select.Option>
                            </Select>
                        </Form.Item>
                    </div>
                    <div style={{ flex: 1 }}>
                        <Form.Item label="日期类型">
                            <Select value={dateType} onChange={setDateType}>
                                <Select.Option value="ETD">ETD</Select.Option>
                                <Select.Option value="ETA">ETA</Select.Option>
                                <Select.Option value="ATD">ATD</Select.Option>
                                <Select.Option value="ATA">ATA</Select.Option>
                            </Select>
                        </Form.Item>
                    </div>
                </div>

                {/* 第九行 */}
                <div style={{ display: 'flex', gap: '20px', marginBottom: '16px' }}>
                    <div style={{ flex: 1 }}>
                        <Form.Item label="额度" name="CreditLimit">
                            <InputNumber 
                                style={{ width: '70%' }} 
                                placeholder="0"
                                onChange={(value) => onNumberChange("CreditLimit", value as number)} 
                            />
                            <Select defaultValue="RMB" style={{ width: '30%', marginLeft: '8px' }}>
                                <Select.Option value="RMB">RMB</Select.Option>
                                <Select.Option value="USD">USD</Select.Option>
                                <Select.Option value="EUR">EUR</Select.Option>
                            </Select>
                        </Form.Item>
                    </div>
                    <div style={{ flex: 1 }}>
                        <Form.Item label="账期" name="PaymentPeriod">
                            <InputNumber 
                                style={{ width: '70%' }} 
                                placeholder="0"
                                onChange={(value) => onNumberChange("PaymentPeriod", value as number)} 
                            />
                            <Select defaultValue="天" style={{ width: '30%', marginLeft: '8px' }}>
                                <Select.Option value="天">天</Select.Option>
                                <Select.Option value="月">月</Select.Option>
                            </Select>
                        </Form.Item>
                    </div>
                </div>

                {/* 第十行 */}
                <div style={{ marginBottom: '16px' }}>
                    <Form.Item label="结算类型">
                        <Radio.Group>
                            <Radio value="票结">票结</Radio>
                            <Radio value="非票结">非票结</Radio>
                        </Radio.Group>
                        <span style={{ marginLeft: '20px' }}>（结算方式：每月指定日期，或账期到了才）</span>
                    </Form.Item>
                </div>

                {/* 到期后续签 */}
                <div style={{ 
                    backgroundColor: '#1890ff', 
                    color: 'white', 
                    padding: '8px 16px', 
                    marginBottom: '16px',
                    borderRadius: '4px'
                }}>
                    到期后续签
                </div>

                {/* 表格区域 */}
                <div style={{ 
                    border: '1px solid #d9d9d9', 
                    borderRadius: '4px', 
                    marginBottom: '16px',
                    minHeight: '200px'
                }}>
                    <div style={{ 
                        display: 'flex', 
                        backgroundColor: '#fafafa', 
                        borderBottom: '1px solid #d9d9d9',
                        padding: '8px'
                    }}>
                        <div style={{ flex: 1, textAlign: 'center', fontWeight: 'bold' }}>生效日期</div>
                        <div style={{ flex: 1, textAlign: 'center', fontWeight: 'bold' }}>失效日期</div>
                        <div style={{ flex: 1, textAlign: 'center', fontWeight: 'bold' }}>额度</div>
                        <div style={{ flex: 1, textAlign: 'center', fontWeight: 'bold' }}>额度单位</div>
                        <div style={{ flex: 1, textAlign: 'center', fontWeight: 'bold' }}>账期</div>
                    </div>
                    <div style={{ 
                        display: 'flex', 
                        alignItems: 'center', 
                        justifyContent: 'center',
                        height: '150px',
                        color: '#999'
                    }}>
                        无查询结果
                    </div>
                </div>

                {/* 注释 */}
                <div style={{ color: '#999', fontSize: '12px', marginBottom: '20px' }}>
                    注：临时信用的额度/账期 单位同合同的单位（次日生效）
                </div>

                {/* 按钮区域 */}
                <div style={{ textAlign: 'center' }}>
                    <Space size="large">
                        <Button onClick={onCancel} disabled={saving} size="large">
                            取消
                        </Button>
                        <Button type="primary" onClick={onSave} disabled={saving} size="large">
                            确定
                        </Button>
                    </Space>
                </div>
            </Form>
        </div>
    );
};

export default Detail;