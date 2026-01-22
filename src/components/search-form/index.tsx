import React, { useState, useEffect } from 'react';
import { Col, Form, Input, Row, Select, DatePicker, Modal, Button, Space, message, Tag } from 'antd';
import { Item } from './draggable';
import TranferRight from './tranfer_right';
import zhCN from 'antd/es/date-picker/locale/zh_CN';
import type { TransferProps } from 'antd';
import DatePickerZH, { RangePickerZH } from '../date-picker';
import dayjs from 'dayjs';
import { left } from '@antv/g2/lib/data/utils/d3-sankey/align';
const { Option } = Select;
const { RangePicker } = DatePickerZH;
type Field = {
    key: string;
    name?: string; // Add name as optional alias
    label: string;
    required?: boolean;
    initialValue?: string;
    type: string;
    prefix?: string;
    suffix?: string;
    selectOptions?: Array<{ label: string; value: string }>;
};

export type AdvancedSearchFormProps = {
    fields: Field[];// 查询控件集合
    span?: number;// 每行显示控件数量
    onSearch: (values: any) => void;// 查询事件
};

type FormData = {
    [key: string]: any;
  }
  
  type FormOperatorData = {
    [key: string]: string; // 或其他操作符类型
  }
  
  type SearchItem = {
    field: string;
    operator: string;
    value: any;
  }

export enum FilterOperator {
    EQ = "eq",      // 等于
    LIKE = "like",  // 模糊匹配
    GT = "gt",      // 大于
    LT = "lt",      // 小于
    IN = "in",       // 包含
    NOTIN = "not_in"       // 不包含
  }

const operatorItems = [
    { value: FilterOperator.EQ, label: '等于' },
    { value: FilterOperator.LIKE, label: '包含' },
    { value: FilterOperator.GT, label: '大于' },
    { value: FilterOperator.LT, label: '小于' },
    { value: FilterOperator.IN, label: '在列表中' },
    { value: FilterOperator.NOTIN, label: '不在列表中' }
  ];

const AdvancedSearchForm: React.FC<AdvancedSearchFormProps> = ({ fields, span = 4, onSearch }) => {

    const [form] = Form.useForm();
    const [expand, setExpand] = useState(false);
    const [open, setOpen] = useState(false);

    const showModal = () => {
        setOpen(true);
    };
    const handleCancel = () => {
        setOpen(false);
    };
    const getFields = (fieldConfigs: Field[]) => {
        const children = [];
        const spanCount = 24 / span; // 一行可以显示的控件数量
        // 展开时显示所有控件，收起时只显示一行控件
        let count = expand ? fieldConfigs.length : Math.min(spanCount, fieldConfigs.length);
        for (let i = 0; i < count; i++) {
            const config = fieldConfigs[i];
            const fieldKey = config.key || config.name || `field-${i}`; // Fallback to name or index
            children.push(
                <Col span={span} key={fieldKey} style={{padding: '0 6px'}}>
                    {config.type === 'input' ? (
                        <Form.Item
                            name={fieldKey}
                            label={config.label}
                            labelCol={{ span: 7 }}
                        >
                            <div style={{ width: '100%', display: 'flex' }}>
                                <div style={{ width: '30%' }}>
                                    <Select labelInValue style={{ textAlign: 'left' }}
                                        value={formOperatorData[fieldKey] ? { label: operatorItems.find(op => op.value === formOperatorData[fieldKey])?.label, value: formOperatorData[fieldKey] } : { label: '等于', value: FilterOperator.EQ }}
                                        dropdownStyle={{width: 'auto'}}
                                        options={operatorItems} 
                                        onChange={(value) => { handleSelectChange(fieldKey,value,'operator') }}
                                        >
                                    </Select>
                                </div>
                                <div style={{ width: '70%' }}>
                                    <Input name={fieldKey} value={formData[fieldKey] || ''} prefix={config.prefix} suffix={config.suffix} onChange={handleInputChange} />
                                </div>


                            </div>
                        </Form.Item>
                    ) : config.type === 'select' ? (
                        <Form.Item
                            name={fieldKey}
                            label={config.label}
                            labelCol={{ span: 7 }}
                        >

                            <div style={{ width: '100%', display: 'flex' }}>
                                <div style={{ width: '30%' }}>
                                    <Select labelInValue style={{ textAlign: 'left', width: '140' }}
                                        value={formOperatorData[fieldKey] ? { label: '等于', value: formOperatorData[fieldKey] } : { label: '等于', value: FilterOperator.EQ }}
                                        options={[
                                            { label: '等于', value: FilterOperator.EQ },
                                        ]} 
                                        onSelect={(value) => { handleSelectChange(fieldKey, value,'operator') }}
                                        >
                                    </Select>
                                </div>
                                <div style={{ width: '70%' }}>
                                    <Select labelInValue value={formData[fieldKey] ? { label: config.selectOptions?.find(opt => opt.value === formData[fieldKey])?.label, value: formData[fieldKey] } : undefined} style={{ textAlign: 'left' }} prefix={config.prefix} onSelect={(value) => { handleSelectChange(fieldKey, value) }}  >
                                        {config.selectOptions?.map((option, index) => (
                                            <Option key={index} value={option.value}>
                                                {option.label}
                                            </Option>
                                        ))}
                                    </Select>
                                </div>
                            </div>
                        </Form.Item>
                    ) : config.type === 'date' ? (
                        <Form.Item
                            name={fieldKey}
                            label={config.label}
                            labelCol={{ span: 7 }}
                        >
                            <div style={{ width: '100%', display: 'flex' }}>
                                <div style={{ width: '30%' }}>
                                    <Select labelInValue style={{ textAlign: 'left', width: '140' }}
                                        value={formOperatorData[fieldKey] ? { label: operatorItems.find(op => op.value === formOperatorData[fieldKey])?.label, value: formOperatorData[fieldKey] } : { label: '等于', value: FilterOperator.EQ }}
                                        options={[
                                            { label: '等于', value: FilterOperator.EQ },
                                            { label: '大于', value: FilterOperator.GT },
                                            { label: '小于', value: FilterOperator.LT },
                                        ]} 
                                        onSelect={(value) => { handleSelectChange(fieldKey, value,'operator') }}
                                        >
                                    </Select>
                                </div>
                                <div style={{ width: '70%' }}>
                                    <DatePickerZH 
                                        value={formData[fieldKey] ? dayjs(formData[fieldKey]) : undefined} 
                                        style={{ display: 'block' }} 
                                        placeholder='' 
                                        onChange={(_, dateStrings) => { 
                                            handleDateChange(fieldKey, dateStrings || ''); 
                                        }} 
                                    />
                                </div>
                            </div>

                        </Form.Item>
                    ) :
                        (
                            <Form.Item
                                name={fieldKey}
                                label={config.label}
                                labelCol={{ span: 7 }}
                            >
                                <RangePickerZH value={formData[fieldKey] ? [formData[fieldKey][0] ? dayjs(formData[fieldKey][0]) : null, formData[fieldKey][1] ? dayjs(formData[fieldKey][1]) : null] : [null, null]} allowEmpty={[true, true]} style={{ display: 'flex' }} onChange={(_, dateStrings) => { handleDateChange(fieldKey, dateStrings || '') }} />
                            </Form.Item>
                        )
                    }
                </Col>,
            );
        }
        return children;
    };
    const [formData, setFormData] = useState<FormData>({});
    const [formOperatorData, setFormOperatorData] = useState<FormOperatorData>({});
    const [selectedConditions, setSelectedConditions] = useState<SearchItem[]>([]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    // 更新已选条件
    const updateSelectedConditions = () => {
        const conditions: SearchItem[] = [];
        Object.keys(formData).forEach((key) => {
            if(formData[key] !== '' && formData[key] !== undefined && formData[key] !== null){
                const field = fields.find(f => (f.key || f.name) === key);
                const operator = formOperatorData[key] ?? FilterOperator.EQ;
                const operatorLabel = operatorItems.find(op => op.value === operator)?.label || '等于';
                
                conditions.push({
                    field: key,
                    operator: operator,
                    value: formData[key],
                    fieldLabel: field?.label || key,
                    operatorLabel: operatorLabel
                } as SearchItem & { fieldLabel: string; operatorLabel: string });
            }
        });
        setSelectedConditions(conditions);
    };

    // 删除已选条件
    const removeCondition = (fieldKey: string) => {
        const newFormData = { ...formData };
        const newFormOperatorData = { ...formOperatorData };
        delete newFormData[fieldKey];
        delete newFormOperatorData[fieldKey];
        setFormData(newFormData);
        setFormOperatorData(newFormOperatorData);
        
        // 同时清空表单对应字段
        form.setFieldValue(fieldKey, undefined);
    };
    const handleSelectChange = (name: string, value: { value: string; label: React.ReactNode }, type: string = '') => {
        if(type === 'operator'){
            setFormOperatorData({ ...formOperatorData, [name]: value.value});
        }else{
            setFormData({...formData, [name]: value.value });
        }
    };

    const handleDateChange = (name: string, value: string | Array<string>) => {
        setFormData({ ...formData, [name]: value });
    };

    // 监听formData和formOperatorData变化，实时更新已选条件
    useEffect(() => {
        updateSelectedConditions();
    }, [formData, formOperatorData]);

    const handOnFinish = () => {
        const searchData: SearchItem[] = [];
        // 这里可以添加缓存
        Object.keys(formData).forEach((key) => {
            if(formData[key] !== '' && formData[key] !== undefined){
                searchData.push({
                    field: key,
                    operator: formOperatorData[key]?? FilterOperator.EQ,
                    value: formData[key]
                });
            }
        });
        onSearch(searchData);
    };
    const handleResetFields = () => {
        setFormData({});
        setFormOperatorData({});
        setSelectedConditions([]);
        form.resetFields();
    };

    //高级方案 - 使用传入的fields数据而不是随机生成
    const mockData = fields.map<Item>((field, i) => ({
        id: i,
        key: field.key,
        type: field.type,
        text: field.label,
    }));

    // 默认不选择任何字段，让用户自行选择
    const initialTargetKeys: string[] = [];


    const [targetKeys, setTargetKeys] = useState<TransferProps['targetKeys']>(initialTargetKeys);

    const leftItemOnClick = (itemKey: string) => {
        setTargetKeys([...targetKeys || [], itemKey]);
    };

    const rightRemoveItemKey = (itemKey: string) => {
        setTargetKeys(targetKeys?.filter((item) => item !== itemKey));
    };

    return (
        <div>
            <Form form={form} name="advanced_search" labelCol={{ span: 7 }} layout='horizontal'>
                <div className="nc-bill-search-area">
                    <div className="search-area-contant">
                        <div className="search-top">
                            <div className="search-edit">
                                <div className="search-name-wrapper">
                                    <span className="search-plan-name">快速查询</span>
                                    <i className="iconfont icon-bottom"></i>
                                </div>
                                <span className="search-super" onClick={showModal}>高级</span>
                            </div>
                            <div className="search-open" onClick={() => { setExpand(!expand); }}>
                                <span className="search-open-icon">
                                    <i className="label">{expand ? '收起' : '展开'}</i>
                                    {expand ? (<i className="down iconfont icon-chaxunmoren"></i>) : (<i className="up iconfont icon-chaxunmoren"></i>)}
                                </span>
                            </div>
                        </div>
                        <div className="item-contant" style={{display: "block",}}>
                            <Row gutter={[2, 0]}>{getFields(fields)}</Row>
                            
                            {/* 已选条件显示区域 */}
                             {selectedConditions.length > 0 && (
                                 <div style={{ marginTop: '2px', padding: '2px',  borderRadius: '2px' }}>
                                     <div style={{textAlign:'left'}}>
                                         <span style={{ fontSize: '12px', fontWeight: 'bold', color: '#666', marginRight: '2px' }}>
                                             已选条件:
                                         </span>
                                         {selectedConditions.map((condition, index) => {
                                             const displayValue = Array.isArray(condition.value) 
                                                 ? condition.value.join(' ~ ') 
                                                 : condition.value;
                                             return (
                                                 <Tag
                                                     key={`${condition.field}-${index}`}
                                                     closable
                                                     onClose={() => removeCondition(condition.field)}
                                                     style={{ 
                                                         fontSize: '12px',
                                                     }}
                                                 >
                                                     {(condition as any).fieldLabel}:{displayValue}
                                                 </Tag>
                                             );
                                         })}
                                     </div>
                                 </div>
                             )}
                            
                            <div className="search-button">
                                <div className="search-component-rowArea">
                                    <span className="search-component-searchBtn">
                                        <i className="iconfont icon-sousuo" onClick={handOnFinish}></i>
                                    </span>
                                    <span className="clearBtn">
                                        <i className="iconfont icon-qingkong1" onClick={handleResetFields}></i>
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Form>
            <Modal open={open} title="编辑方案"
                onCancel={handleCancel}
                width={800}
                className='transferModal'
                destroyOnClose={true}
                maskClosable={false}
                footer={(_) => (
                    <div style={{ textAlign: 'right' }}>
                        <Space>
                            <Button onClick={handleCancel}>取消</Button>
                            <Button type="primary">保存</Button>
                        </Space>
                    </div>
                )}
            >
                <Row className='ant-tranfer-row' wrap={false}>
                    <Col span={6} className='ant-tranfer-col-left'>
                        <span className="modal-body-left-commons-title-text">候选条件</span>
                        <ul style={{ height: '400px', overflowY: 'auto',overflowX: 'hidden' }}>
                            {mockData.map((item) => {
                                return targetKeys?.includes(item.key) ?
                                    (
                                        <li key={item.key}>
                                            <div className='tranfer-col-left-item-disabled'>
                                                {item.text}
                                            </div>
                                        </li>
                                    )
                                    :
                                    (
                                        <li key={item.key}>
                                            <div className='tranfer-col-left-item'>
                                                {item.text}
                                                <i className="iconfont icon-xinzengzijiedian" onClick={() => leftItemOnClick(item.key)}></i>
                                            </div>
                                        </li>
                                    )
                            })
                            }
                        </ul>
                    </Col>
                    <Col span={18} className='ant-tranfer-col-right'>
                        <span className="modal-body-left-commons-title-text">目标结果</span>
                        <div className='ant-tranfer-col-right-draggable' style={{ height: '400px' }}>
                            <TranferRight drapItems={mockData} selectKeyItmes={targetKeys?.map((key) => key.toString())} onRemoveItem={rightRemoveItemKey} />
                        </div>
                    </Col>
                </Row>
            </Modal>
        </div>
    );
};

export default AdvancedSearchForm;