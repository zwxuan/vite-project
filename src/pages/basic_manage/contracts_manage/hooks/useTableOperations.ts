import { useState } from 'react';
import { message } from 'antd';

interface TableItem {
    RowKey?: string;
    [key: string]: any;
}

interface UseTableOperationsProps<T extends TableItem> {
    dataList: T[];
    setDataList: (data: T[]) => void;
    createNewRow: () => T;
}

export function useTableOperations<T extends TableItem>({
    dataList,
    setDataList,
    createNewRow
}: UseTableOperationsProps<T>) {
    const [editingKey, setEditingKey] = useState('');

    const handleDelete = (record: T) => {
        const newData = dataList.filter(item => item.RowKey !== record.RowKey);
        setDataList(newData);
    };

    const handleEdit = (record: T) => {
        setEditingKey(record.RowKey?.toString() || '');
    };

    const handleSave = async (record: T) => {
        try {
            // TODO: 调用保存API
            const newData = [...dataList];
            const index = newData.findIndex(item => record.RowKey === item.RowKey);
            if (index > -1) {
                const item = newData[index];
                newData.splice(index, 1, {
                    ...item,
                    ...record,
                });
            } else {
                newData.push(record);
            }
            setDataList(newData);
            setEditingKey('');
            message.success('保存成功');
        } catch (error) {
            console.error('Save failed:', error);
            message.error('保存失败');
        }
    };

    const handleCancel = () => {
        setEditingKey('');
    };

    const handleAdd = () => {
        if (editingKey !== '') {
            message.warning('请先完成当前编辑');
            return;
        }
        const newId = Date.now().toString();
        const newRow = {
            ...createNewRow(),
            RowKey: newId
        };
        setDataList([...dataList, newRow]);
        setEditingKey(newId);
    };

    return {
        editingKey,
        handleDelete,
        handleEdit,
        handleSave,
        handleCancel,
        handleAdd
    };
}