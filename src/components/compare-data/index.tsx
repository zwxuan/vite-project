import React, { useMemo } from 'react';
import { Change } from 'diff';

interface CompareDataProps {
    oldData: any;
    newData: any;
    height?: string;
}

// 扩展diff库的Change类型，添加modified属性
interface ExtendedChange extends Change {
    modified?: boolean;
    modifiedOld?: boolean;  // 标记为修改的旧值
    modifiedNew?: boolean;  // 标记为修改的新值
    newNestedKeys?: string[]; // 新增的嵌套字段
}

const CompareData: React.FC<CompareDataProps> = ({ oldData, newData, height = '580px' }) => {
    // 格式化JSON数据为字符串
    const formatJsonString = (data: any): string => {
        if (typeof data === 'string') {
            try {
                return JSON.stringify(JSON.parse(data), null, 2);
            } catch {
                return data;
            }
        }
        return JSON.stringify(data, null, 2);
    };

    // 提取JSON块中的所有键名
    const extractJsonKeys = (value: string): string[] => {
        const keys: string[] = [];
        const lines = value.split('\n');
        for (const line of lines) {
            const trimmed = line.trim();
            if (trimmed) {
                // 匹配JSON键名格式："key": 或 "key":
                const match = trimmed.match(/^"([^"]+)"\s*:/);
                if (match) {
                    keys.push(match[1]);
                }
            }
        }
        return keys;
    };

    // 提取JSON块中第一行的键名（保持向后兼容）
    const extractJsonKey = (value: string): string | null => {
        const keys = extractJsonKeys(value);
        return keys.length > 0 ? keys[0] : null;
    };

    // 生成diff数据 - 按原始字段顺序
    const diffData = useMemo(() => {
        console.log('=== 开始处理diff（保持原始顺序）===');
        console.log('旧数据:', oldData);
        console.log('新数据:', newData);
        
        const processedDiff: ExtendedChange[] = [];
        
        // 解析JSON对象
        let oldObj: any = {};
        let newObj: any = {};
        
        try {
            oldObj = typeof oldData === 'string' ? JSON.parse(oldData) : oldData || {};
            newObj = typeof newData === 'string' ? JSON.parse(newData) : newData || {};
        } catch (e) {
            console.error('JSON解析错误:', e);
            return [];
        }
        
        // 从原始JSON字符串中提取字段顺序
        const extractKeysFromJsonString = (jsonStr: string): string[] => {
            const keys: string[] = [];
            const lines = jsonStr.split('\n');
            console.log('JSON字符串行数:', lines.length);
            console.log('前10行内容:', lines.slice(0, 10));
            
            for (let i = 0; i < lines.length; i++) {
                const line = lines[i];
                const trimmed = line.trim();
                const match = trimmed.match(/^"([^"]+)"\s*:/);
                if (match && !keys.includes(match[1])) {
                    console.log(`第${i+1}行找到字段: ${match[1]}`);
                    keys.push(match[1]);
                }
            }
            return keys;
        };
        
        // 获取原始JSON字符串的字段顺序
        const oldJsonStr = formatJsonString(oldData);
        const newJsonStr = formatJsonString(newData);
        
        const oldKeys = extractKeysFromJsonString(oldJsonStr);
        const newKeys = extractKeysFromJsonString(newJsonStr);
        
        // 智能合并字段顺序：以旧数据为基础，在适当位置插入新字段
        const orderedKeys: string[] = [];
        const processedKeys = new Set<string>();
        const newOnlyKeys = newKeys.filter(key => !oldKeys.includes(key));
        
        // 创建新字段位置映射
        const newKeyPositions = new Map<string, number>();
        newKeys.forEach((key, index) => {
            newKeyPositions.set(key, index);
        });
        
        // 按旧数据顺序处理字段，同时插入新字段
        for (let i = 0; i < oldKeys.length; i++) {
            const oldKey = oldKeys[i];
            
            // 检查是否有新字段需要在当前位置之前插入
            for (const newKey of newOnlyKeys) {
                if (!processedKeys.has(newKey)) {
                    const newKeyPos = newKeyPositions.get(newKey) || 0;
                    const currentOldKeyPosInNew = newKeyPositions.get(oldKey);
                    
                    // 如果新字段在新数据中的位置在当前旧字段之前，则插入
                    if (currentOldKeyPosInNew !== undefined && newKeyPos < currentOldKeyPosInNew) {
                        orderedKeys.push(newKey);
                        processedKeys.add(newKey);
                    }
                }
            }
            
            // 添加当前旧字段（无论是否在新数据中存在，都保持原位置）
            orderedKeys.push(oldKey);
            processedKeys.add(oldKey);
        }
        
        // 添加剩余的新字段（在最后）
        for (const newKey of newOnlyKeys) {
            if (!processedKeys.has(newKey)) {
                orderedKeys.push(newKey);
                processedKeys.add(newKey);
            }
        }
        // console.log('原始JSON字段顺序:');
        // console.log('旧数据字段顺序:', oldKeys);
        // console.log('新数据字段顺序:', newKeys);
        // console.log('最终处理顺序:', orderedKeys);
        
        // 按字段顺序逐个处理
        orderedKeys.forEach((key, index) => {
            const oldValue = oldObj[key];
            const newValue = newObj[key];
            const hasOldValue = oldObj.hasOwnProperty(key);
            const hasNewValue = newObj.hasOwnProperty(key);
            
            // console.log(`处理字段 [${key}]:`, { hasOldValue, hasNewValue, oldValue, newValue });
            
            if (hasOldValue && hasNewValue) {
                // 字段存在于两边，检查是否有变化
                const oldStr = JSON.stringify(oldValue, null, 2);
                const newStr = JSON.stringify(newValue, null, 2);
                
                if (oldStr !== newStr) {
                    // 字段值发生变化
                    // console.log(`字段 [${key}] 发生变化`);
                    
                    // 检查是否有新增的嵌套字段
                    let newNestedKeys: string[] = [];
                    if (typeof oldValue === 'object' && typeof newValue === 'object' && oldValue && newValue) {
                        const oldKeys = Object.keys(oldValue);
                        const newKeys = Object.keys(newValue);
                        newNestedKeys = newKeys.filter(k => !oldKeys.includes(k));
                        if (newNestedKeys.length > 0) {
                            console.log(`字段 [${key}] 中发现新增嵌套字段:`, newNestedKeys);
                        }
                    }
                    
                    // 添加修改的旧值
                    processedDiff.push({
                        value: `"${key}": ${oldStr}`,
                        removed: false,
                        added: false,
                        modifiedOld: true
                    } as ExtendedChange);
                    
                    // 添加修改的新值
                    processedDiff.push({
                        value: `"${key}": ${newStr}`,
                        removed: false,
                        added: false,
                        modifiedNew: true,
                        newNestedKeys: newNestedKeys.length > 0 ? newNestedKeys : undefined
                    } as ExtendedChange);
                } else {
                    // 字段值未变化
                    processedDiff.push({
                        value: `"${key}": ${oldStr}`,
                        removed: false,
                        added: false
                    } as ExtendedChange);
                }
            } else if (hasOldValue && !hasNewValue) {
                // 字段被删除
                console.log(`字段 [${key}] 被删除`);
                const oldStr = JSON.stringify(oldValue, null, 2);
                processedDiff.push({
                    value: `"${key}": ${oldStr}`,
                    removed: true,
                    added: false
                } as ExtendedChange);
            } else if (!hasOldValue && hasNewValue) {
                // 字段是新增的
                console.log(`字段 [${key}] 是新增的`);
                const newStr = JSON.stringify(newValue, null, 2);
                processedDiff.push({
                    value: `"${key}": ${newStr}`,
                    removed: false,
                    added: true
                } as ExtendedChange);
            }
        });
        
        console.log('=== 最终处理结果（保持原始顺序）===');
        console.log('processedDiff:', processedDiff.map((item, index) => ({
            index,
            key: extractJsonKey(item.value),
            added: item.added,
            removed: item.removed,
            modifiedOld: item.modifiedOld,
            modifiedNew: item.modifiedNew,
            newNestedKeys: item.newNestedKeys,
            value: item.value.trim()
        })));
        
        return processedDiff;
    }, [oldData, newData]);

    return (
        <div style={{ height, border: '1px solid #d9d9d9', borderRadius: '6px', backgroundColor: '#fafafa', position: 'relative' }}>
            {/* 固定表头 */}
            <div style={{ display: 'flex', position: 'sticky', top: 0, zIndex: 10, backgroundColor: '#fafafa' }}>
                <div style={{ flex: 1, borderRight: '1px solid #e8e8e8' }}>
                    <div style={{ padding: '8px 12px', backgroundColor: '#f5f5f5', borderBottom: '1px solid #e8e8e8', fontWeight: 'bold', fontSize: '12px' }}>
                        旧数据 2025-07-29 09:50:06
                    </div>
                </div>
                <div style={{ flex: 1 }}>
                    <div style={{ padding: '8px 12px', backgroundColor: '#f5f5f5', borderBottom: '1px solid #e8e8e8', fontWeight: 'bold', fontSize: '12px' }}>
                        新数据 2025-07-29 09:50:25
                    </div>
                </div>
            </div>
            
            {/* 可滚动内容区域 */}
            <div style={{ display: 'flex', height: 'calc(100% - 40px)', overflow: 'hidden' }}>
                {/* 左侧：旧数据 */}
                <div style={{ flex: 1, borderRight: '1px solid #e8e8e8' }}>
                    <div style={{ padding: '8px 12px',height: 'calc(100% - 20px)', overflow: 'auto'  }}>
                        {diffData.map((part, index) => {
                            // 左侧只显示删除的内容和修改的旧值
                            if (part.added || part.modifiedNew) return null;
                            
                            const lines = part.value.split('\n').filter(line => line.trim());
                            return lines.map((line, lineIndex) => {
                                const isModified = part.modifiedOld;
                                const keyPrefix = part.removed ? 'old' : isModified ? 'modified-old' : 'same';
                                
                                return (
                                    <div key={`${keyPrefix}-${index}-${lineIndex}`} style={{
                                        backgroundColor: part.removed ? '#ffecec' : isModified ? '#e6f3ff' : 'transparent',
                                        padding: '2px 8px',
                                        fontFamily: 'monospace',
                                        fontSize: '12px',
                                        borderLeft: part.removed ? '3px solid #dc3545' : isModified ? '3px solid #1890ff' : 'none',
                                        marginBottom: '1px',
                                        whiteSpace: 'pre-wrap',
                                        color: part.removed ? 'inherit' : isModified ? 'inherit' : '#666'
                                    }}>
                                        <span style={{ 
                                            color: part.removed ? '#dc3545' : isModified ? '#1890ff' : 'transparent', 
                                            marginRight: '8px' 
                                        }}>
                                            {part.removed ? '-' : isModified ? '~' : ' '}
                                        </span>
                                        {line}
                                    </div>
                                );
                            });
                        })}
                    </div>
                </div>

                {/* 右侧：新数据 */}
                <div style={{ flex: 1 }}>
                    <div style={{ padding: '8px 12px',height: 'calc(100% - 20px)', overflow: 'auto' }}>
                        {diffData.map((part, index) => {
                            // 右侧只显示添加的内容和修改的新值
                            if (part.removed || part.modifiedOld) return null;
                            
                            const lines = part.value.split('\n').filter(line => line.trim());
                            return lines.map((line, lineIndex) => {
                                const isModified = part.modifiedNew;
                                const keyPrefix = part.added ? 'new' : isModified ? 'modified-new' : 'same';
                                
                                // 检查当前行是否包含新增的嵌套字段
                                const isNewNestedField = part.newNestedKeys && part.newNestedKeys.some(key => {
                                    const match = line.trim().match(/^"([^"]+)"\s*:/);
                                    return match && match[1] === key;
                                });
                                
                                // 确定样式
                                let backgroundColor, borderColor, textColor, symbol;
                                if (part.added) {
                                    backgroundColor = '#e6ffed';
                                    borderColor = '#28a745';
                                    textColor = 'inherit';
                                    symbol = '+';
                                } else if (isNewNestedField) {
                                    backgroundColor = '#fff2e6'; // 橙色背景表示新增嵌套字段
                                    borderColor = '#fa8c16';
                                    textColor = 'inherit';
                                    symbol = '+';
                                } else if (isModified) {
                                    backgroundColor = '#e6f3ff';
                                    borderColor = '#1890ff';
                                    textColor = 'inherit';
                                    symbol = '~';
                                } else {
                                    backgroundColor = 'transparent';
                                    borderColor = 'none';
                                    textColor = '#666';
                                    symbol = ' ';
                                }
                                
                                return (
                                    <div key={`${keyPrefix}-${index}-${lineIndex}`} style={{
                                        backgroundColor,
                                        padding: '2px 8px',
                                        fontFamily: 'monospace',
                                        fontSize: '12px',
                                        borderLeft: borderColor !== 'none' ? `3px solid ${borderColor}` : 'none',
                                        marginBottom: '1px',
                                        whiteSpace: 'pre-wrap',
                                        color: textColor
                                    }}>
                                        <span style={{ 
                                            color: borderColor !== 'none' ? borderColor : 'transparent', 
                                            marginRight: '8px' 
                                        }}>
                                            {symbol}
                                        </span>
                                        {line}
                                    </div>
                                );
                            });
                        })}
                    </div>
                </div>
            </div>

            {diffData.every(part => !part.added && !part.removed) && (
                <div style={{ padding: '20px', textAlign: 'center', color: '#999' }}>
                    数据无差异
                </div>
            )}
        </div>
    );
};

export default CompareData;