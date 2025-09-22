import React, { useMemo } from 'react';
import { Change } from 'diff';
import './compare_data.css';

interface CompareDataProps {
    oldData: any;
    newData: any;
    height?: string;
    jsonFormat?: boolean; // 是否使用标准JSON格式展示
}

// 扩展diff库的Change类型，添加modified属性
interface ExtendedChange extends Change {
    modified?: boolean;
    modifiedOld?: boolean;  // 标记为修改的旧值
    modifiedNew?: boolean;  // 标记为修改的新值
    newNestedKeys?: string[]; // 新增的嵌套字段
}

const CompareData: React.FC<CompareDataProps> = ({ oldData, newData, height = '580px', jsonFormat = false }) => {
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

    // 标准JSON格式展示（带差异标记）
    if (jsonFormat) {
        const oldJsonStr = formatJsonString(oldData);
        const newJsonStr = formatJsonString(newData);
        
        // 解析JSON对象用于差异分析
        let oldObj: any = {};
        let newObj: any = {};
        
        try {
            oldObj = typeof oldData === 'string' ? JSON.parse(oldData) : oldData || {};
            newObj = typeof newData === 'string' ? JSON.parse(newData) : newData || {};
        } catch (e) {
            console.error('JSON解析错误:', e);
        }
        
        // 渲染带差异标记的JSON
        const renderJsonWithDiff = (jsonStr: string, obj: any, isOld: boolean) => {
            const lines = jsonStr.split('\n');
            return lines.map((line, index) => {
                const trimmed = line.trim();
                const match = trimmed.match(/^"([^"]+)"\s*:/);
                
                let lineClass = 'compare-data-json-line compare-data-json-line-unchanged';
                let symbolClass = 'compare-data-json-symbol compare-data-symbol-transparent';
                let symbol = '';
                
                if (match) {
                    const key = match[1];
                    const hasOldValue = oldObj.hasOwnProperty(key);
                    const hasNewValue = newObj.hasOwnProperty(key);
                    
                    if (isOld) {
                        // 左侧（旧数据）
                        if (hasOldValue && !hasNewValue) {
                            // 被删除的字段
                            lineClass = 'compare-data-json-line compare-data-json-line-removed';
                            symbolClass = 'compare-data-json-symbol compare-data-symbol-removed';
                            symbol = '-';
                        } else if (hasOldValue && hasNewValue) {
                            const oldValue = JSON.stringify(oldObj[key]);
                            const newValue = JSON.stringify(newObj[key]);
                            if (oldValue !== newValue) {
                                // 修改的字段（旧值）
                                lineClass = 'compare-data-json-line compare-data-json-line-modified';
                                symbolClass = 'compare-data-json-symbol compare-data-symbol-modified';
                                symbol = '~';
                            }
                        }
                    } else {
                        // 右侧（新数据）
                        if (!hasOldValue && hasNewValue) {
                            // 新增的字段
                            lineClass = 'compare-data-json-line compare-data-json-line-added';
                            symbolClass = 'compare-data-json-symbol compare-data-symbol-added';
                            symbol = '+';
                        } else if (hasOldValue && hasNewValue) {
                            const oldValue = JSON.stringify(oldObj[key]);
                            const newValue = JSON.stringify(newObj[key]);
                            if (oldValue !== newValue) {
                                // 修改的字段（新值）
                                lineClass = 'compare-data-json-line compare-data-json-line-modified';
                                symbolClass = 'compare-data-json-symbol compare-data-symbol-modified';
                                symbol = '~';
                            }
                        }
                    }
                }
                
                return (
                    <div key={index} className={lineClass}>
                        <span className={symbolClass}>
                            {symbol}
                        </span>
                        <span>{line}</span>
                    </div>
                );
            });
        };
        
        return (
            <div className="compare-data-container" style={{ height }}>
                {/* 固定表头 */}
                <div className="compare-data-header">
                    <div className="compare-data-header-left">
                        <div className="compare-data-header-title">
                            旧数据 (JSON格式)
                        </div>
                    </div>
                    <div className="compare-data-header-right">
                        <div className="compare-data-header-title">
                            新数据 (JSON格式)
                        </div>
                    </div>
                </div>
                
                {/* JSON内容区域 */}
                <div className="compare-data-content">
                    {/* 左侧：旧数据JSON */}
                    <div className="compare-data-content-left">
                        <div className="compare-data-json-scroll-area">
                            {renderJsonWithDiff(oldJsonStr, oldObj, true)}
                        </div>
                    </div>
                    
                    {/* 右侧：新数据JSON */}
                    <div className="compare-data-content-right">
                        <div className="compare-data-json-scroll-area">
                            {renderJsonWithDiff(newJsonStr, newObj, false)}
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="compare-data-container" style={{ height }}>
            {/* 固定表头 */}
            <div className="compare-data-header">
                <div className="compare-data-header-left">
                    <div className="compare-data-header-title">
                        旧数据 2025-07-29 09:50:06
                    </div>
                </div>
                <div className="compare-data-header-right">
                    <div className="compare-data-header-title">
                        新数据 2025-07-29 09:50:25
                    </div>
                </div>
            </div>
            
            {/* 可滚动内容区域 */}
            <div className="compare-data-content">
                {/* 左侧：旧数据 */}
                <div className="compare-data-content-left">
                    <div className="compare-data-scroll-area">
                        {diffData.map((part, index) => {
                            // 左侧只显示删除的内容和修改的旧值
                            if (part.added || part.modifiedNew) return null;
                            
                            const lines = part.value.split('\n').filter(line => line.trim());
                            return lines.map((line, lineIndex) => {
                                const isModified = part.modifiedOld;
                                const keyPrefix = part.removed ? 'old' : isModified ? 'modified-old' : 'same';
                                
                                let lineClass = 'compare-data-line';
                                let symbolClass = 'compare-data-symbol';
                                let symbol = ' ';
                                
                                if (part.removed) {
                                    lineClass += ' compare-data-line-removed';
                                    symbolClass += ' compare-data-symbol-removed';
                                    symbol = '-';
                                } else if (isModified) {
                                    lineClass += ' compare-data-line-modified-old';
                                    symbolClass += ' compare-data-symbol-modified';
                                    symbol = '~';
                                } else {
                                    lineClass += ' compare-data-line-unchanged';
                                    symbolClass += ' compare-data-symbol-transparent';
                                }
                                
                                return (
                                    <div key={`${keyPrefix}-${index}-${lineIndex}`} className={lineClass}>
                                        <span className={symbolClass}>
                                            {symbol}
                                        </span>
                                        {line}
                                    </div>
                                );
                            });
                        })}
                    </div>
                </div>

                {/* 右侧：新数据 */}
                <div className="compare-data-content-right">
                    <div className="compare-data-scroll-area">
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
                                
                                // 确定样式类
                                let lineClass = 'compare-data-line';
                                let symbolClass = 'compare-data-symbol';
                                let symbol = ' ';
                                
                                if (part.added) {
                                    lineClass += ' compare-data-line-added';
                                    symbolClass += ' compare-data-symbol-added';
                                    symbol = '+';
                                } else if (isNewNestedField) {
                                    lineClass += ' compare-data-line-new-nested';
                                    symbolClass += ' compare-data-symbol-new-nested';
                                    symbol = '+';
                                } else if (isModified) {
                                    lineClass += ' compare-data-line-modified-new';
                                    symbolClass += ' compare-data-symbol-modified';
                                    symbol = '~';
                                } else {
                                    lineClass += ' compare-data-line-unchanged';
                                    symbolClass += ' compare-data-symbol-transparent';
                                }
                                
                                return (
                                    <div key={`${keyPrefix}-${index}-${lineIndex}`} className={lineClass}>
                                        <span className={symbolClass}>
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
                <div className="compare-data-no-diff">
                    数据无差异
                </div>
            )}
        </div>
    );
};

export default CompareData;