import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import chinaMapData from './china_100000_full.json';


const ChainMap: React.FC = () => {
    
    useEffect(() => {
        const container = document.getElementById('container');
        if (!container) return;
        
        // 创建场景
        const scene = new THREE.Scene();
        // 创建相机
        const camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
        // 调整相机位置，使其能够看到所有三个轴
        camera.position.set(15, 15, 15);
        camera.lookAt(0, 0, 0);
        
        // 创建辅助线
        const axesHelper = new THREE.AxesHelper(10);
        scene.add(axesHelper);
        
        // 创建渲染器
        const renderer = new THREE.WebGLRenderer({ antialias: true });
        renderer.setSize(container.clientWidth, container.clientHeight);
        container.appendChild(renderer.domElement);
        
        // 添加轨道控制器
        const controls = new OrbitControls(camera, renderer.domElement);
        
        // 动画循环
        const animate = () => {
            requestAnimationFrame(animate);
            controls.update();
            renderer.render(scene, camera);
        };
        animate();
        
        // 清理函数
        return () => {
            container.removeChild(renderer.domElement);
            renderer.dispose();
        };
    }, []);
    
    return (
        <div className="nc-bill-search-area" style={{ paddingTop: '10px' }}>
            <div 
                id="container"
                style={{ 
                    width: '100%', 
                    height: '600px', 
                    border: '1px solid #ccc',
                    borderRadius: '8px'
                }}
            >
            </div>
        </div>
    );
};

export default ChainMap;