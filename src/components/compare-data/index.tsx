import React, { useMemo } from 'react';
import { diffLines } from 'diff';

interface CompareDataProps {
    oldData: any;
    newData: any;
    height?: string;
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

    // 生成diff数据
    const diffData = useMemo(() => {
        const oldText = formatJsonString(oldData);
        const newText = formatJsonString(newData);

        return diffLines(oldText, newText);
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
                            if (part.removed) {
                                return part.value.split('\n').map((line, lineIndex) => {
                                    if (line.trim() === '') return null;
                                    return (
                                        <div key={`old-${index}-${lineIndex}`} style={{
                                            backgroundColor: '#ffecec',
                                            padding: '2px 8px',
                                            fontFamily: 'monospace',
                                            fontSize: '12px',
                                            borderLeft: '3px solid #dc3545',
                                            marginBottom: '1px',
                                            whiteSpace: 'pre-wrap'
                                        }}>
                                            <span style={{ color: '#dc3545', marginRight: '8px' }}>-</span>
                                            {line}
                                        </div>
                                    );
                                });
                            } else if (!part.added) {
                                return part.value.split('\n').map((line, lineIndex) => {
                                    if (line.trim() === '') return null;
                                    return (
                                        <div key={`same-${index}-${lineIndex}`} style={{
                                            padding: '2px 8px',
                                            fontFamily: 'monospace',
                                            fontSize: '12px',
                                            marginBottom: '1px',
                                            whiteSpace: 'pre-wrap',
                                            color: '#666'
                                        }}>
                                            <span style={{ marginRight: '8px' }}> </span>
                                            {line}
                                        </div>
                                    );
                                });
                            }
                            return null;
                        })}
                    </div>
                </div>

                {/* 右侧：新数据 */}
                <div style={{ flex: 1 }}>
                    <div style={{ padding: '8px 12px',height: 'calc(100% - 20px)', overflow: 'auto' }}>
                        {diffData.map((part, index) => {
                            if (part.added) {
                                return part.value.split('\n').map((line, lineIndex) => {
                                    if (line.trim() === '') return null;
                                    return (
                                        <div key={`new-${index}-${lineIndex}`} style={{
                                            backgroundColor: '#e6ffed',
                                            padding: '2px 8px',
                                            fontFamily: 'monospace',
                                            fontSize: '12px',
                                            borderLeft: '3px solid #28a745',
                                            marginBottom: '1px',
                                            whiteSpace: 'pre-wrap'
                                        }}>
                                            <span style={{ color: '#28a745', marginRight: '8px' }}>+</span>
                                            {line}
                                        </div>
                                    );
                                });
                            } else if (!part.removed) {
                                return part.value.split('\n').map((line, lineIndex) => {
                                    if (line.trim() === '') return null;
                                    return (
                                        <div key={`same-${index}-${lineIndex}`} style={{
                                            padding: '2px 8px',
                                            fontFamily: 'monospace',
                                            fontSize: '12px',
                                            marginBottom: '1px',
                                            whiteSpace: 'pre-wrap',
                                            color: '#666'
                                        }}>
                                            <span style={{ marginRight: '8px' }}> </span>
                                            {line}
                                        </div>
                                    );
                                });
                            }
                            return null;
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