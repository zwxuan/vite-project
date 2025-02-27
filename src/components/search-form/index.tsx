import React, { useState } from 'react';
import { Col, Form, Input, Row, Select, DatePicker, Modal, Button, Space } from 'antd';
import { Item } from './draggable';
import TranferRight from './tranfer_right';
import zhCN from 'antd/es/date-picker/locale/zh_CN';
import type { TransferProps } from 'antd';
const { Option } = Select;
const { RangePicker } = DatePicker;
type Field = {
    key: string;
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
        const spanCount = 24 / span;
        let count = expand ? fieldConfigs.length : spanCount;
        if (count > fieldConfigs.length) {
            count = fieldConfigs.length;
        }
        for (let i = 0; i < count; i++) {
            const config = fieldConfigs[i];
            children.push(
                <Col span={span} key={i}>
                    {config.type === 'input' ? (
                        <Form.Item
                            name={config.key}
                            label={config.label}
                            labelCol={{ span: 7 }}
                        >
                            <div style={{ width: '100%', display: 'flex' }}>
                                <div style={{ width: '30%' }}>
                                    <Select labelInValue style={{ textAlign: 'left' }}
                                        defaultValue='等于'
                                        options={[
                                            { label: '包含', value: 'like' },
                                            { label: '在列表中', value: 'in' },
                                            { label: '不在列表', value: 'not_in' },
                                            { label: '等于', value: 'equal' },
                                            { label: '大于', value: 'than' },
                                            { label: '小于', value: 'less' },
                                        ]} >
                                    </Select>
                                </div>
                                <div style={{ width: '70%' }}>
                                    <Input name={config.key} prefix={config.prefix} suffix={config.suffix} onChange={handleInputChange} />
                                </div>


                            </div>
                        </Form.Item>
                    ) : config.type === 'select' ? (
                        <Form.Item
                            name={config.key}
                            label={config.label}
                            labelCol={{ span: 7 }}
                        >

                            <div style={{ width: '100%', display: 'flex' }}>
                                <div style={{ width: '30%' }}>
                                    <Select labelInValue style={{ textAlign: 'left', width: '140' }}
                                        defaultValue='等于'
                                        options={[
                                            { label: '等于', value: 'equal' },
                                        ]} >
                                    </Select>
                                </div>
                                <div style={{ width: '70%' }}>
                                    <Select labelInValue style={{ textAlign: 'left' }} prefix={config.prefix} onChange={(value) => { handleSelectChange(config.key, value) }}  >
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
                            name={config.key}
                            label={config.label}
                            labelCol={{ span: 7 }}
                        >
                            <div style={{ width: '100%', display: 'flex' }}>
                                <div style={{ width: '30%' }}>
                                    <Select labelInValue style={{ textAlign: 'left', width: '140' }}
                                        defaultValue='等于'
                                        options={[
                                            { label: '等于', value: 'equal' },
                                            { label: '大于', value: 'than' },
                                            { label: '小于', value: 'less' },
                                        ]} >
                                    </Select>
                                </div>
                                <div style={{ width: '70%' }}>
                                    <DatePicker style={{ display: 'block' }} placeholder='' onChange={(_, dateStrings) => { handleDateChange(config.key, dateStrings) }} />
                                </div>
                            </div>

                        </Form.Item>
                    ) :
                        (

                            <Form.Item
                                name={config.key}
                                label={config.label}
                                labelCol={{ span: 7 }}
                            >
                                <RangePicker locale={zhCN} allowEmpty={[true, true]} style={{ display: 'flex' }} onChange={(_, dateStrings) => { handleDateChange(config.key, dateStrings) }} />
                            </Form.Item>
                        )
                    }
                </Col>,
            );
        }
        return children;
    };
    const [formData, setFormData] = useState({});

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };
    const handleSelectChange = (name: string, value: { value: string; label: React.ReactNode }) => {
        setFormData({ ...formData, [name]: value.label });
    };

    const handleDateChange = (name: string, value: string | Array<string>) => {
        setFormData({ ...formData, [name]: value });
    };
    const handOnFinish = () => {
        console.log(formData);
        onSearch(formData);
    };
    const handleResetFields = () => {
        setFormData({});
        form.resetFields();
    };

    //高级方案
    const mockData = Array.from({ length: 20 }).map<Item>((_, i) => ({
        id: i,
        key: i.toString(),
        type: 'input',
        text: `字段 ${i + 1}`,
    }));

    const initialTargetKeys = mockData.filter((item) => Number(item.key) > 10).map((item) => item.key);


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
                        <div className="item-contant" style={{ display: "block" }}>
                            <Row gutter={[2, 0]}>{getFields(fields)}</Row>
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
                        <ul style={{ height: '400px', overflowY: 'auto' }}>
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