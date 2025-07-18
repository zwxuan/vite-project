import React, { useEffect, useRef, useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { AutoComplete, Button, Col, Divider, Input, message, Row, Select, Space, Table } from 'antd';
import type { InputRef } from 'antd';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
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
useEffect(() => { 
    //创建场景
    const scene = new THREE.Scene();
    //创建相机
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(0, 2, 10);
    //创建渲染器
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x222222); // 改为深灰色背景
    // 添加到id是container的容器中
    document.getElementById('container')?.appendChild(renderer.domElement);
    
    // 添加环境光
    const ambientLight = new THREE.AmbientLight(0x404040, 1.0);
    scene.add(ambientLight);
    
    // 添加方向光
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1.5);
    directionalLight.position.set(5, 5, 5);
    scene.add(directionalLight);
    
    // 添加第二个方向光从另一个角度
    const directionalLight2 = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight2.position.set(-5, 3, -5);
    scene.add(directionalLight2);
    
    // 创建GLTF加载器
    const loader = new GLTFLoader();
    let model: THREE.Group | null = null;
    
    // 加载3D模型
    loader.load(
        '/mazda_rx.glb',
        (gltf) => {
            model = gltf.scene;
            
            // 计算模型的包围盒来确定合适的缩放
            const box = new THREE.Box3().setFromObject(model);
            const size = box.getSize(new THREE.Vector3());
            const maxDim = Math.max(size.x, size.y, size.z);
            const scale = 3 / maxDim; // 让模型占据合适的大小
            
            model.scale.set(scale, scale, scale);
            
            // 将模型居中
            const center = box.getCenter(new THREE.Vector3());
            model.position.set(-center.x * scale, -center.y * scale, -center.z * scale);
            // 设置初始方向
            model.rotation.x = - (Math.PI / 2);
            model.rotation.z = Math.PI / 2;

            scene.add(model);
            console.log('模型加载成功', '模型尺寸:', size, '缩放比例:', scale);
        },
        (progress) => {
            console.log('加载进度:', (progress.loaded / progress.total * 100) + '%');
        },
        (error) => {
            console.error('模型加载失败:', error);
        }
    );
    renderer.render(scene, camera);
    // 动画函数
    // function animate() {
    //     requestAnimationFrame(animate);
        
    //     // 如果模型已加载，让它旋转
    //     if (model) {
    //         model.rotation.y += 0.01;
    //     }
        
    //     renderer.render(scene, camera);
    // }
    
    // animate();
    
    // 清理函数
    return () => {
        if (renderer.domElement && document.getElementById('container')) {
            document.getElementById('container')?.removeChild(renderer.domElement);
        }
        renderer.dispose();
    };
    
}, []);
    
    

    return (
        <div className="nc-bill-search-area" style={{ paddingTop: '10px' }}>
            {/* <div className="search-area-contant">
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
            </div> */}
            <div id="container">
                
            </div>
        </div>

    );
};

export default Demo;