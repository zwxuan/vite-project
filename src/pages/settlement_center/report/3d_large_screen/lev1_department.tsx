/**
 * 公司一级部门3D可视化组件
 * 
 * 功能描述：
 * - 使用Three.js渲染3D办公楼层平面图
 * - 每个楼层代表一个一级部门
 * - 支持楼层高度、颜色表示部门业绩数据
 * - 支持鼠标交互控制（缩放、旋转、平移）
 * - 支持部门点击查看详情
 * 
 * 技术栈：
 * - React + TypeScript
 * - Three.js (3D渲染引擎)
 * - OrbitControls (相机控制器)
 * 
 * @author 开发者
 * @version 1.0.0
 * @date 2024
 */

import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

/**
 * 部门数据接口
 * 定义一级部门的基本信息和业绩数据
 */
interface DepartmentData {
    id: string;                    // 部门ID
    name: string;                  // 部门名称
    totalProfit: number;           // 总利润
    totalRevenue: number;          // 总收入
    employeeCount: number;         // 员工数量
    teuCount: number;              // TEU数量
    ticketCount: number;           // 票数
    floor: number;                 // 楼层号
    position: [number, number];    // 在楼层中的位置 [x, z]
    size: [number, number];        // 部门区域大小 [width, depth]
}

/**
 * 部门3D对象接口
 * 定义部门在3D场景中的表示
 */
interface Department3D {
    mesh: THREE.Mesh;                    // 部门的3D网格对象
    originalMaterial: THREE.Material;    // 原始材质
    selectedMaterial: THREE.Material;    // 选中时的材质
    data: DepartmentData;                // 部门数据
    textMesh?: THREE.Mesh;               // 部门名称文字网格
}

/**
 * 公司一级部门3D可视化主组件
 * 
 * 组件功能：
 * 1. 初始化Three.js 3D场景
 * 2. 创建办公楼层3D模型
 * 3. 根据部门数据生成3D部门区域
 * 4. 提供交互控制功能
 * 5. 支持部门点击选中功能
 */
const Lev1Department: React.FC = () => {
    // ==================== React Hooks ====================
    
    /** 3D容器DOM引用 */
    const containerRef = useRef<HTMLDivElement>(null);
    
    /** Three.js场景引用 */
    const sceneRef = useRef<THREE.Scene | null>(null);
    
    /** Three.js渲染器引用 */
    const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
    
    /** Three.js相机引用 */
    const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
    
    /** 轨道控制器引用 */
    const controlsRef = useRef<OrbitControls | null>(null);
    
    /** 部门3D对象数组 */
    const departmentsRef = useRef<Department3D[]>([]);
    
    /** 当前选中的部门 */
    const [selectedDepartment, setSelectedDepartment] = useState<Department3D | null>(null);
    
    /** 动画帧ID */
    const animationFrameRef = useRef<number | null>(null);

    // ==================== 模拟数据 ====================
    
    /**
     * 模拟的一级部门数据
     * 基于项目中的实际部门数据结构
     */
    const departmentData: DepartmentData[] = [
        {
            id: 'dept_001',
            name: '大客户部',
            totalProfit: 82009.04,
            totalRevenue: 172792.08,
            employeeCount: 45,
            teuCount: 26,
            ticketCount: 26,
            floor: 1,
            position: [-15, -10],
            size: [12, 8]
        },
        {
            id: 'dept_002',
            name: '操作部',
            totalProfit: 40113.1,
            totalRevenue: 87754.51,
            employeeCount: 32,
            teuCount: 26,
            ticketCount: 6,
            floor: 2,
            position: [5, -10],
            size: [10, 8]
        },
        {
            id: 'dept_003',
            name: '管理部',
            totalProfit: 53247.47,
            totalRevenue: 102893.77,
            employeeCount: 28,
            teuCount: 39,
            ticketCount: 21,
            floor: 3,
            position: [-15, 5],
            size: [12, 10]
        },
        {
            id: 'dept_004',
            name: '财务部',
            totalProfit: 35000,
            totalRevenue: 75000,
            employeeCount: 15,
            teuCount: 20,
            ticketCount: 12,
            floor: 4,
            position: [5, 5],
            size: [10, 6]
        },
        {
            id: 'dept_005',
            name: '人事部',
            totalProfit: 25000,
            totalRevenue: 50000,
            employeeCount: 12,
            teuCount: 15,
            ticketCount: 8,
            floor: 5,
            position: [-5, -2],
            size: [8, 6]
        }
    ];

    // ==================== 核心功能函数 ====================

    /**
     * 根据利润值计算颜色
     * 
     * @param profit - 利润值
     * @param minProfit - 最小利润值
     * @param maxProfit - 最大利润值
     * @returns Three.js颜色对象
     */
    const getColorByProfit = (profit: number, minProfit: number, maxProfit: number): THREE.Color => {
        // 计算利润值在范围内的比例（0-1）
        const ratio = (profit - minProfit) / (maxProfit - minProfit);
        
        // 使用蓝绿色系渐变：从浅蓝色（低利润）到深绿色（高利润）
        const lightBlue = { r: 0x87, g: 0xCE, b: 0xEB }; // 天蓝色
        const darkGreen = { r: 0x00, g: 0x8B, b: 0x00 }; // 深绿色
        
        // 线性插值计算颜色
        const r = Math.round(lightBlue.r + (darkGreen.r - lightBlue.r) * ratio);
        const g = Math.round(lightBlue.g + (darkGreen.g - lightBlue.g) * ratio);
        const b = Math.round(lightBlue.b + (darkGreen.b - lightBlue.b) * ratio);
        
        // 转换为16进制颜色值
        const color = (r << 16) | (g << 8) | b;
        return new THREE.Color(color);
    };

    /**
     * 创建部门3D对象
     * 
     * @param data - 部门数据
     * @param minProfit - 最小利润值
     * @param maxProfit - 最大利润值
     * @returns 部门3D对象
     */
    const createDepartment3D = (data: DepartmentData, minProfit: number, maxProfit: number): Department3D => {
        const [width, depth] = data.size;
        
        // 根据利润计算楼层高度（最小2，最大8）
        const profitRatio = (data.totalProfit - minProfit) / (maxProfit - minProfit);
        const height = 2 + profitRatio * 6;
        
        // 创建立方体几何体
        const geometry = new THREE.BoxGeometry(width, height, depth);
        
        // 根据利润计算颜色
        const color = getColorByProfit(data.totalProfit, minProfit, maxProfit);
        
        // 创建原始材质
        const originalMaterial = new THREE.MeshLambertMaterial({
            color: color,
            transparent: true,
            opacity: 0.8
        });
        
        // 创建选中时的材质
        const selectedMaterial = new THREE.MeshLambertMaterial({
            color: 0xFFD700, // 金色
            transparent: true,
            opacity: 0.9
        });
        
        // 创建网格对象
        const mesh = new THREE.Mesh(geometry, originalMaterial);
        
        // 设置位置（楼层高度 + 部门在楼层中的位置）
        const [x, z] = data.position;
        const y = (data.floor - 1) * 10 + height / 2; // 楼层间距10，部门高度的一半作为Y偏移
        mesh.position.set(x, y, z);
        
        // 添加边框线条
        const edges = new THREE.EdgesGeometry(geometry);
        const lineMaterial = new THREE.LineBasicMaterial({ color: 0x000000, linewidth: 2 });
        const wireframe = new THREE.LineSegments(edges, lineMaterial);
        mesh.add(wireframe);
        
        return {
            mesh,
            originalMaterial,
            selectedMaterial,
            data
        };
    };

    /**
     * 创建楼层底板
     * 
     * @param floor - 楼层号
     * @param scene - Three.js场景
     */
    const createFloorBase = (floor: number, scene: THREE.Scene) => {
        // 创建楼层底板几何体
        const floorGeometry = new THREE.PlaneGeometry(40, 30);
        const floorMaterial = new THREE.MeshLambertMaterial({
            color: 0xF5F5F5, // 浅灰色
            transparent: true,
            opacity: 0.3
        });
        
        const floorMesh = new THREE.Mesh(floorGeometry, floorMaterial);
        floorMesh.rotation.x = -Math.PI / 2; // 水平放置
        floorMesh.position.set(0, (floor - 1) * 10, 0);
        
        scene.add(floorMesh);
        
        // 添加楼层标识
        const textGeometry = new THREE.PlaneGeometry(3, 1);
        const textMaterial = new THREE.MeshBasicMaterial({
            color: 0x333333,
            transparent: true,
            opacity: 0.8
        });
        
        const textMesh = new THREE.Mesh(textGeometry, textMaterial);
        textMesh.position.set(-18, (floor - 1) * 10 + 0.1, -12);
        textMesh.rotation.x = -Math.PI / 2;
        
        scene.add(textMesh);
    };

    /**
     * 处理部门点击事件
     * 
     * @param event - 鼠标点击事件
     */
    const handleDepartmentClick = (event: MouseEvent) => {
        if (!containerRef.current || !cameraRef.current || !sceneRef.current) return;

        // 计算鼠标在容器中的相对位置
        const rect = containerRef.current.getBoundingClientRect();
        const mouse = new THREE.Vector2();
        mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
        mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

        // 创建射线检测器
        const raycaster = new THREE.Raycaster();
        raycaster.setFromCamera(mouse, cameraRef.current);

        // 获取所有部门网格对象
        const departmentObjects = departmentsRef.current.map(dept => dept.mesh);
        
        // 进行射线检测
        const intersects = raycaster.intersectObjects(departmentObjects);

        if (intersects.length > 0) {
            // 找到被点击的部门
            const clickedMesh = intersects[0].object as THREE.Mesh;
            const clickedDepartment = departmentsRef.current.find(dept => dept.mesh === clickedMesh);

            if (clickedDepartment) {
                // 如果之前有选中的部门，恢复其原始颜色
                if (selectedDepartment && selectedDepartment !== clickedDepartment) {
                    selectedDepartment.mesh.material = selectedDepartment.originalMaterial;
                }

                // 如果点击的是已选中的部门，取消选中
                if (selectedDepartment === clickedDepartment) {
                    clickedDepartment.mesh.material = clickedDepartment.originalMaterial;
                    setSelectedDepartment(null);
                    console.log(`取消选中部门: ${clickedDepartment.data.name}`);
                } else {
                    // 选中新的部门
                    clickedDepartment.mesh.material = clickedDepartment.selectedMaterial;
                    setSelectedDepartment(clickedDepartment);
                    console.log(`选中部门: ${clickedDepartment.data.name}`, clickedDepartment.data);
                }
            }
        }
    };

    /**
     * 处理窗口大小变化
     */
    const handleResize = () => {
        if (!containerRef.current || !cameraRef.current || !rendererRef.current) return;

        const width = containerRef.current.clientWidth;
        const height = containerRef.current.clientHeight;

        // 更新相机宽高比
        cameraRef.current.aspect = width / height;
        cameraRef.current.updateProjectionMatrix();

        // 更新渲染器大小
        rendererRef.current.setSize(width, height);
    };

    /**
     * 动画循环函数
     */
    const animate = () => {
        if (!rendererRef.current || !sceneRef.current || !cameraRef.current || !controlsRef.current) return;

        // 更新控制器
        controlsRef.current.update();

        // 渲染场景
        rendererRef.current.render(sceneRef.current, cameraRef.current);

        // 请求下一帧
        animationFrameRef.current = requestAnimationFrame(animate);
    };

    /**
     * 初始化3D场景
     */
    const initScene = () => {
        if (!containerRef.current) return;

        const width = containerRef.current.clientWidth;
        const height = containerRef.current.clientHeight;

        // 创建场景
        const scene = new THREE.Scene();
        scene.background = new THREE.Color(0x1a1a2e); // 深蓝色背景
        sceneRef.current = scene;

        // 创建相机
        const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
        camera.position.set(30, 40, 30);
        camera.lookAt(0, 20, 0);
        cameraRef.current = camera;

        // 创建渲染器
        const renderer = new THREE.WebGLRenderer({ antialias: true });
        renderer.setSize(width, height);
        renderer.shadowMap.enabled = true;
        renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        rendererRef.current = renderer;

        // 将渲染器添加到容器
        containerRef.current.appendChild(renderer.domElement);

        // 创建轨道控制器
        const controls = new OrbitControls(camera, renderer.domElement);
        controls.enableDamping = true;
        controls.dampingFactor = 0.05;
        controls.target.set(0, 20, 0);
        controlsRef.current = controls;

        // 添加光源
        const ambientLight = new THREE.AmbientLight(0x404040, 0.6); // 环境光
        scene.add(ambientLight);

        const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
        directionalLight.position.set(50, 50, 50);
        directionalLight.castShadow = true;
        directionalLight.shadow.mapSize.width = 2048;
        directionalLight.shadow.mapSize.height = 2048;
        scene.add(directionalLight);

        // 计算利润范围
        const profits = departmentData.map(dept => dept.totalProfit);
        const minProfit = Math.min(...profits);
        const maxProfit = Math.max(...profits);

        // 创建楼层底板
        for (let floor = 1; floor <= 5; floor++) {
            createFloorBase(floor, scene);
        }

        // 创建部门3D对象
        departmentData.forEach(data => {
            const department3D = createDepartment3D(data, minProfit, maxProfit);
            department3D.mesh.castShadow = true;
            department3D.mesh.receiveShadow = true;
            scene.add(department3D.mesh);
            departmentsRef.current.push(department3D);
        });

        // 添加点击事件监听
        renderer.domElement.addEventListener('click', handleDepartmentClick);

        // 添加窗口大小变化监听
        window.addEventListener('resize', handleResize);

        // 开始动画循环
        animate();
    };

    // ==================== React 生命周期 ====================

    useEffect(() => {
        initScene();

        // 清理函数
        return () => {
            // 停止动画循环
            if (animationFrameRef.current) {
                cancelAnimationFrame(animationFrameRef.current);
            }

            // 移除事件监听
            window.removeEventListener('resize', handleResize);
            
            if (rendererRef.current) {
                rendererRef.current.domElement.removeEventListener('click', handleDepartmentClick);
            }

            // 清理Three.js资源
            if (rendererRef.current && containerRef.current) {
                containerRef.current.removeChild(rendererRef.current.domElement);
                rendererRef.current.dispose();
            }

            if (sceneRef.current) {
                sceneRef.current.clear();
            }

            // 清理部门对象
            departmentsRef.current.forEach(dept => {
                dept.mesh.geometry.dispose();
                if (Array.isArray(dept.mesh.material)) {
                    dept.mesh.material.forEach(material => material.dispose());
                } else {
                    dept.mesh.material.dispose();
                }
            });
            departmentsRef.current = [];
        };
    }, []);

    // ==================== 渲染 ====================

    return (
        <div style={{ width: '100%', height: '100vh', position: 'relative' }}>
            {/* 3D场景容器 */}
            <div 
                ref={containerRef} 
                style={{ 
                    width: '100%', 
                    height: '100%',
                    cursor: 'pointer'
                }} 
            />
            
            {/* 信息面板 */}
            <div style={{
                position: 'absolute',
                top: '20px',
                left: '20px',
                background: 'rgba(0, 0, 0, 0.7)',
                color: 'white',
                padding: '15px',
                borderRadius: '8px',
                fontSize: '14px',
                maxWidth: '300px'
            }}>
                <h3 style={{ margin: '0 0 10px 0', color: '#FFD700' }}>公司一级部门3D可视化</h3>
                <p style={{ margin: '5px 0' }}>• 楼层高度表示部门利润</p>
                <p style={{ margin: '5px 0' }}>• 颜色深浅表示业绩水平</p>
                <p style={{ margin: '5px 0' }}>• 点击部门查看详情</p>
                <p style={{ margin: '5px 0' }}>• 鼠标拖拽旋转视角</p>
                <p style={{ margin: '5px 0' }}>• 滚轮缩放场景</p>
                
                {selectedDepartment && (
                    <div style={{ 
                        marginTop: '15px', 
                        padding: '10px', 
                        background: 'rgba(255, 215, 0, 0.2)',
                        borderRadius: '5px'
                    }}>
                        <h4 style={{ margin: '0 0 8px 0', color: '#FFD700' }}>
                            {selectedDepartment.data.name}
                        </h4>
                        <p style={{ margin: '3px 0' }}>
                            总利润: ¥{selectedDepartment.data.totalProfit.toLocaleString()}
                        </p>
                        <p style={{ margin: '3px 0' }}>
                            总收入: ¥{selectedDepartment.data.totalRevenue.toLocaleString()}
                        </p>
                        <p style={{ margin: '3px 0' }}>
                            员工数: {selectedDepartment.data.employeeCount}人
                        </p>
                        <p style={{ margin: '3px 0' }}>
                            TEU数: {selectedDepartment.data.teuCount}
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Lev1Department;