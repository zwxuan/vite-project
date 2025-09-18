import React, { useState } from 'react';
import { Checkbox } from 'antd';

interface LogItemProps {
    itemId: string;
    userName: string;
    description: string;
    isChecked: boolean;
    onViewData?: () => void;
    onCompare?: (checked: boolean) => void;
}

const LogItem: React.FC<LogItemProps> = ({
    itemId,
    userName,
    description,
    isChecked,
    onViewData,
    onCompare
}) => {
    const [hoveredItem, setHoveredItem] = useState<string | null>(null);

    return (
        <div 
            style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between',paddingRight: '10px', }}
            onMouseEnter={() => setHoveredItem(itemId)}
            onMouseLeave={() => setHoveredItem(null)}
        >
            <div style={{ flex: 1 }}>
                <div style={{ marginBottom: '8px' }}>
                    <label style={{ marginRight: '8px' }}>{userName}</label>
                    {(hoveredItem === itemId || isChecked) && (
                        <a 
                            style={{ 
                                cursor: 'pointer',
                                color: '#1890ff',
                                textDecoration: 'none'
                            }}
                            title="查看数据"
                            onClick={onViewData}
                        >
                            查看数据
                        </a>
                    )}
                </div>
                <div>{description}</div>
            </div>
            {(hoveredItem === itemId || isChecked) && (
                <Checkbox 
                    style={{ marginLeft: '16px' }}
                    checked={isChecked}
                    onChange={(e) => {
                        onCompare?.(e.target.checked);
                    }}
                >对比
                </Checkbox>
            )}
        </div>
    );
};

export default LogItem;