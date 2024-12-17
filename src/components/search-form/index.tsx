import React, { useState } from 'react';
import { Col, Form, Input, Row, Select, DatePicker, Modal, Button } from 'antd';
import { closestCenter, DndContext, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import type { DragEndEvent } from '@dnd-kit/core';
import {
    arrayMove,
    horizontalListSortingStrategy,
    verticalListSortingStrategy,
    SortableContext,
    useSortable,
  } from '@dnd-kit/sortable';
  import { Flex, Card } from 'antd';
import zhCN from 'antd/es/date-picker/locale/zh_CN';
import type { TransferProps,GetProp } from 'antd';
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

interface Item {
    id: number;
    text: string;
  }
  
  interface DraggableTagProps {
    tag: Item;
  }
  
  const commonStyle: React.CSSProperties = {
    cursor: 'move',
    transition: 'unset', // Prevent element from shaking after drag
  };
  
  const DraggableTag: React.FC<DraggableTagProps> = (props) => {
    const { tag } = props;
    const { listeners, transform, transition, isDragging, setNodeRef } = useSortable({ id: tag.id });
  
    const style = transform
      ? {
          transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
          transition: isDragging ? 'unset' : transition,
        }
      : commonStyle;
  
    return (
      <Card style={style} ref={setNodeRef} {...listeners}>
        <Row gutter={[2,2]}>
            <Col>
                <Input value={tag.text} />
            </Col>
            <Col>
                <Button>{tag.text}</Button>
            </Col>
            <Col>
                <Button>{tag.text}</Button>
            </Col>
        </Row>
      </Card>
    );
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
                        >
                            <Input name={config.key} placeholder={config.label} prefix={config.prefix} suffix={config.suffix} onChange={handleInputChange} />
                        </Form.Item>
                    ) : config.type === 'select' ? (
                        <Form.Item
                            name={config.key}
                            label={config.label}
                        >
                            <Select labelInValue style={{ textAlign: 'left' }} placeholder={config.label} prefix={config.prefix} onChange={(value) => { handleSelectChange(config.key, value) }}  >
                                {config.selectOptions?.map((option, index) => (
                                    <Option key={index} value={option.value}>
                                        {option.label}
                                    </Option>
                                ))}
                            </Select>
                        </Form.Item>
                    ) : config.type === 'date' ? (
                        <Form.Item
                            name={config.key}
                            label={config.label}
                        >
                            <DatePicker style={{ display: 'block' }} placeholder={config.label} onChange={(_, dateStrings) => { handleDateChange(config.key, dateStrings) }} />
                        </Form.Item>
                    ) :
                        (

                            <Form.Item
                                name={config.key}
                                label={config.label}
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
    interface RecordType {
        key: string;
        title: string;
        description: string;
    }

    const mockData = Array.from({ length: 20 }).map<RecordType>((_, i) => ({
        key: i.toString(),
        title: `字段${i + 1}`,
        description: `内容描述${i + 1}`,
    }));

    const initialTargetKeys = mockData.filter((item) => Number(item.key) > 10).map((item) => item.key);


    const [targetKeys, setTargetKeys] = useState<TransferProps['targetKeys']>(initialTargetKeys);
    const [selectedKeys, setSelectedKeys] = useState<TransferProps['targetKeys']>([]);

    const onChange: TransferProps['onChange'] = (nextTargetKeys, direction, moveKeys) => {
        console.log('targetKeys:', nextTargetKeys);
        console.log('direction:', direction);
        console.log('moveKeys:', moveKeys);
        setTargetKeys(nextTargetKeys);
    };

    const onSelectChange: TransferProps['onSelectChange'] = (
        sourceSelectedKeys,
        targetSelectedKeys,
    ) => {
        console.log('sourceSelectedKeys:', sourceSelectedKeys);
        console.log('targetSelectedKeys:', targetSelectedKeys);
        setSelectedKeys([...sourceSelectedKeys, ...targetSelectedKeys]);
    };

    const onScroll: TransferProps['onScroll'] = (direction, e) => {
        console.log('direction:', direction);
        console.log('target:', e.target);
    };

    const onItemChange = (checkedValues:React.Key[]) => {
        console.log('checkedValues:', checkedValues);
        setSelectedKeys([...checkedValues]);
    };


    const [items, setItems] = useState<Item[]>([
        { id: 1, text: 'Tag 1' },
        { id: 2, text: 'Tag 2' },
        { id: 3, text: 'Tag 3' },
      ]);
    
      const sensors = useSensors(useSensor(PointerSensor));
    
      const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;
        if (!over) {
          return;
        }
        if (active.id !== over.id) {
          setItems((data) => {
            const oldIndex = data.findIndex((item) => item.id === active.id);
            const newIndex = data.findIndex((item) => item.id === over.id);
            return arrayMove(data, oldIndex, newIndex);
          });
        }
    };
    return (
        <div>
            <Form form={form} name="advanced_search" labelCol={{ span: 7 }}>
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
                    <div style={{paddingBottom:"10px"}}>
                        <Button>测试</Button>
                    </div>
                )}
            >
                <Row className='ant-tranfer-row' wrap={false}>
                    <Col span={6} className='ant-tranfer-col-left'>
                        <ul>
                        {mockData.map((item) => {             
                            return targetKeys?.includes(item.key) ? 
                                (
                                    <li>
                                        <div className='tranfer-col-left-item'>
                                            {item.title}
                                            <i className="iconfont icon-xinzengfenzu"></i>
                                        </div>
                                        
                                    </li>
                                )
                                :
                                (
                                    <li>
                                        <div className='tranfer-col-left-item-disabled'>
                                            {item.title}
                                        </div>
                                    </li>
                                )
                        })
                        }
                        </ul>   
                    </Col>
                    <Col span={18} className='ant-tranfer-col-right'>
                        222
                        <DndContext sensors={sensors} onDragEnd={handleDragEnd} collisionDetection={closestCenter}>
                            <SortableContext items={items} strategy={verticalListSortingStrategy}>
                                
                                {items.map<React.ReactNode>((item) => (
                                    <DraggableTag tag={item} key={item.id} />
                                ))}
                                
                            </SortableContext>
                            </DndContext>
                    </Col>
                </Row> 
            </Modal>
        </div>
    );
};

export default AdvancedSearchForm;