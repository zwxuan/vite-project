import React, { useRef, useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { AutoComplete, Button, Col, Divider, Input, message, Row, Select, Space, Table } from 'antd';
import type { InputRef } from 'antd';

let index = 0;

const Demo: React.FC = () => {
    const [items, setItems] = useState(['jack', 'lucy', 'tom', 'yiminghe', 'ripple', 'alice', 'bob', 'jake', 'jack', 'lucy', 'tom', 'yiminghe', 'ripple', 'alice', 'bob', 'jake']);
    const [name, setName] = useState('');
    const inputRef = useRef<InputRef>(null);

    const onNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setName(event.target.value);
    };

    const addItem = (e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => {
        message.info('This is a normal message');
    };
    const options = [
        {
            label: 'China',
            value: 'china',
            emoji: '🇨🇳',
            desc: 'China (中国)',
        },
        {
            label: 'USA',
            value: 'usa',
            emoji: '🇺🇸',
            desc: 'USA (美国)',
        },
        {
            label: 'Japan',
            value: 'japan',
            emoji: '🇯🇵',
            desc: 'Japan (日本)',
        },
        {
            label: 'Korea',
            value: 'korea',
            emoji: '🇰🇷',
            desc: 'Korea (韩国)',
        },
    ];

    const columns = [
        {
            title: '国旗',
            dataIndex: 'emoji',
            key: 'emoji',
            render: (emoji: string, record: any) => (
                <span role="img" aria-label={record.label}>
                    {emoji}
                </span>
            ),
        },
        {
            title: '国家',
            dataIndex: 'desc',
            key: 'desc',
        },
    ];

    return (
        <div className="nc-bill-search-area" style={{ paddingTop: '10px' }}>
            <div className="search-area-contant">
                <div className="item-charging-container">
                    <Row gutter={24} style={{ paddingRight: '6px' }}>
                        <Col span={6}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                <AutoComplete
                                    style={{ width: 300 }}
                                    placeholder="custom dropdown render"
                                    dropdownRender={(menu) => (
                                        <>
                                            <div className='nc-bill-table-area'>
                                                <Table
                                                    showHeader={true}
                                                    pagination={false}
                                                    columns={columns}
                                                    dataSource={options}
                                                    bordered
                                                    style={{ marginBottom: 0 }}
                                                />
                                            </div>

                                        </>
                                    )}
                                    options={items.map((item) => ({ label: item, value: item }))}
                                    suffixIcon={<PlusOutlined onClick={addItem} />}
                                />
                            </div>
                        </Col>
                    </Row>

                </div>
            </div>
        </div>

    );
};

export default Demo;