import React from 'react';
import { Col, Input, Row, Select, Card } from 'antd';
import {
    useSortable,
} from '@dnd-kit/sortable';

export interface Item {
    id: number;
    key: string;
    type: string;
    text: string;
}

export interface DraggableTagProps {
    tag: Item;
    onRemoveItem: (itemKey: string) => void;// 查询事件
}

const commonStyle: React.CSSProperties = {
    cursor: 'move',
    transition: 'unset', // Prevent element from shaking after drag
};

const DraggableTag: React.FC<DraggableTagProps> = (props) => {
    const { tag, onRemoveItem} = props;
    const { listeners, transform, transition, isDragging, setNodeRef } = useSortable({ id: tag.id });

    const style = transform
        ? {
            transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
            transition: isDragging ? 'unset' : transition,
        }
        : commonStyle;
    const handleRemoveItemKey = (itemKey:string) => {
        onRemoveItem(itemKey);
    };
    return (
        <Card style={style} ref={setNodeRef} {...listeners}>
            <Row>
                <Col flex="140px" style={{ textAlign: "right" }}>
                    <span className='spanDraggable' style={{whiteSpace: 'nowrap'}}>{tag.text}</span>
                </Col>
                <Col flex="120px" style={{ textAlign: "center" }}>
                    <Select labelInValue style={{ textAlign: 'left', width: '90%' }}
                        defaultValue = '包含'
                        options={[
                            { label: '包含', value: 'like' },
                            { label: '在列表中', value: 'in' },
                            { label: '不在列表', value: 'not_in' },
                            { label: '等于', value: 'equal' },
                            { label: '大于', value: 'than' },
                            { label: '小于', value: 'less' },
                        ]} >
                    </Select>
                </Col>
                <Col flex="240px" style={{ textAlign: "center" }}>
                    <Input placeholder={'请输入'} onFocus={(event) => { event?.target.select() }} />
                </Col>
                <Col flex='auto'></Col>
                <Col flex="20px" style={{ textAlign: "right" }}>
                    <i className="iconfont icon-shezhi1"></i>
                </Col>
                <Col flex="20px" style={{ textAlign: "right" }}>
                    <i className="iconfont icon-shanchu" style={{ color: "#ff1648" }} onClick={() => { handleRemoveItemKey(tag.key) }}></i>
                </Col>
            </Row>
        </Card>
    );
};
export default DraggableTag;