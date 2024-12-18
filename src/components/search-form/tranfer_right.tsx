import React, { useState } from 'react';
import { closestCenter, DndContext, MouseSensor, useSensor, useSensors } from '@dnd-kit/core';
import type { DragEndEvent } from '@dnd-kit/core';
import {
    arrayMove,
    verticalListSortingStrategy,
    SortableContext,
} from '@dnd-kit/sortable';
import DraggableTag,{Item} from './draggable';

export type TranferRightProps = {
    drapItems: Item[];// 查询控件集合
    selectKeyItmes?: Array<string>;// 已经选中的控件key
    onRemoveItem: (itemKey: string) => void;// 查询事件
};

const TranferRight: React.FC<TranferRightProps> = ({drapItems,selectKeyItmes,onRemoveItem}) => {
        const [items, setItems] = useState<Item[]>(drapItems);
        //拖拽传感器，在移动像素5px范围内，不触发拖拽事件
        const sensors = useSensors(
            useSensor(MouseSensor, {
                activationConstraint: {
                    distance: 5, // 按住不动移动5px 时 才进行拖拽, 这样就可以触发点击事件
                },
            })
        );
    
    
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
        <DndContext sensors={sensors} onDragEnd={handleDragEnd} collisionDetection={closestCenter}>
            <SortableContext items={items} strategy={verticalListSortingStrategy}>
                {items.map<React.ReactNode>((item) => (
                    selectKeyItmes?.includes(item.key)?
                        <DraggableTag tag={item} key={item.id} onRemoveItem={onRemoveItem} />
                        :''
                ))}
            </SortableContext>
        </DndContext>
    )
}
export default TranferRight;