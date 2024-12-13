import React, { useState } from 'react';
import { Col, Form, Input, Row, Select, DatePicker } from 'antd';
import zhCN from 'antd/es/date-picker/locale/zh_CN';
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
    fields: Field[];
};
const AdvancedSearchForm: React.FC<AdvancedSearchFormProps> = ({ fields }) => {

    const [form] = Form.useForm();
    const [expand, setExpand] = useState(false);

    const getFields = (fieldConfigs: Field[]) => {
        const children = [];
        let count = expand ? fieldConfigs.length : 3;
        if (count > fieldConfigs.length) {
            count = fieldConfigs.length;
        }
        for (let i = 0; i < count; i++) {
            const config = fieldConfigs[i];
            children.push(
                <Col span={7} key={i}>
                    {config.type === 'input' ? (
                        <Form.Item
                            name={config.key}
                            label={config.label}
                        >
                            <Input name={config.key} placeholder={config.label} prefix={config.prefix} suffix={config.suffix} onChange={handleInputChange}  />
                        </Form.Item>
                    ) : config.type === 'select' ? (
                        <Form.Item
                            name={config.key}
                            label={config.label}
                        >
                            <Select style={{textAlign:'left'}} placeholder={config.label} prefix={config.prefix} onChange={(value)=>{handleSelectChange(config.key,value)}}  >
                                {config.selectOptions?.map((option, index) => (
                                    <Option key={index} value={option.value}>
                                        {option.label}
                                    </Option>
                                ))}
                            </Select>
                        </Form.Item>
                    ) : config.type==='date'? (
                        <Form.Item
                            name={config.key}
                            label={config.label}
                        >
                            <DatePicker style={{display:'block'}} placeholder={config.label} onChange={(_,dateStrings)=>{handleDateChange(config.key,dateStrings)}}  />
                        </Form.Item>
                    ):
                    (
                        
                        <Form.Item
                            name={config.key}
                            label={config.label}
                        >
                            <RangePicker locale={zhCN} allowEmpty={[true,true]} style={{display:'flex'}} onChange={(_,dateStrings)=>{handleDateChange(config.key,dateStrings)}}  />
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
    const handleSelectChange = (name:string,value:string) => {
        setFormData({ ...formData, [name]: value });
    };

    const handleDateChange = (name:string,value:string | Array<string>) => {
        setFormData({ ...formData, [name]: value });
    };
    const handOnFinish = () => {
        console.log(formData);
    };
    const handleCancel = () => {
        setFormData({});
        form.resetFields();
    };

    return (
        <Form form={form} name="advanced_search" labelCol={{span:5}}>
            <div className="nc-bill-search-area">
                <div className="search-area-contant">
                    <div className="search-top">
                        <div className="search-edit">
                            <div className="search-name-wrapper">
                                <span className="search-plan-name">快速查询</span>
                                <i className="iconfont icon-bottom"></i>
                            </div>
                            <span className="search-super">高级</span>
                        </div>
                        <div className="search-open" onClick={() => { setExpand(!expand); }}>
                            <span className="search-open-icon">
                                <i className="label">{expand ? '收起' : '展开'}</i>
                                {expand ? (<i className="down iconfont icon-chaxunmoren"></i>) : (<i className="up iconfont icon-chaxunmoren"></i>)}
                            </span>
                        </div>
                    </div>
                    <div className="item-contant" style={{ display: "block" }}>
                        <Row gutter={[2,0]}>{getFields(fields)}</Row>
                        <div className="search-button">
                            <div className="search-component-rowArea">
                                <span className="search-component-searchBtn">
                                    <i className="iconfont icon-sousuo" onClick={handOnFinish}></i>
                                </span>
                                <span className="clearBtn">
                                    <i className="iconfont icon-qingkong1" onClick={handleCancel}></i>
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


            {/* <div style={{ textAlign: 'right' }}>
        <Space size="small">
          <Button type="primary" htmlType="submit">
            Search
          </Button>
          <Button
            onClick={() => {
              form.resetFields();
            }}
          >
            Clear
          </Button>
          <a
            style={{ fontSize: 12 }}
            onClick={() => {
              setExpand(!expand);
            }}
          >
            <DownOutlined rotate={expand ? 180 : 0} /> Collapse
          </a>
        </Space>
      </div> */}
        </Form>
    );
};

export default AdvancedSearchForm;