/**
 * 3D中国地图组件
 * 
 * 功能描述：
 * - 使用Three.js渲染3D立体中国地图
 * - 支持行政中心标记显示
 * - 支持鼠标交互控制（缩放、旋转、平移）
 * - 自适应窗口大小变化
 * 
 * 技术栈：
 * - React + TypeScript
 * - Three.js (3D渲染引擎)
 * - OrbitControls (相机控制器)
 * 
 * 数据来源：
 * - china.json (GeoJSON格式的中国地图数据)
 * - 行政中心标记.png (行政中心标记贴图)
 * 
 * @author 开发者
 * @version 1.0.0
 * @date 2024
 */

import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

/**
 * 行政中心数据接口
 * 定义行政中心的名称和坐标信息
 */
interface AdministrativeCenter {
    name: string;                    // 行政中心名称
    coordinates: [number, number];   // 坐标 [经度, 纬度]
}

/**
 * 地图数据接口
 * 定义GeoJSON格式的地图数据结构
 */
interface MapData {
    type: string;                           // GeoJSON类型，通常为"FeatureCollection"
    features: any[];                        // 地图要素数组，包含各省份的几何数据
    administrativeCenters: AdministrativeCenter[];  // 行政中心数据数组
}

/**
 * GDP数据接口
 * 定义GDP数据的结构
 */
interface GDPData {
    sort: number;        // 排序
    name: string;        // 省份名称
    gdpvalue: number;    // GDP值
}

/**
 * 省份网格对象接口
 * 定义省份网格的数据结构
 */
interface ProvinceData {
    mesh: THREE.Mesh;                    // 省份的3D网格对象
    originalMaterial: THREE.Material;    // 原始材质
    selectedMaterial: THREE.Material;    // 选中时的材质
    name: string;                        // 省份名称
    gdpValue?: number;                   // GDP值（可选）
}

/**
 * 3D中国地图主组件
 * 
 * 组件功能：
 * 1. 初始化Three.js 3D场景
 * 2. 加载并渲染中国地图数据
 * 3. 添加行政中心标记
 * 4. 提供交互控制功能
 * 5. 支持省份点击选中功能
 */
const ChainMap: React.FC = () => {
    // ==================== React Hooks ====================
    
    /** 3D容器DOM引用 */
    const containerRef = useRef<HTMLDivElement>(null);
    
    /** Three.js场景引用 */
    const sceneRef = useRef<THREE.Scene | null>(null);
    
    /** Three.js渲染器引用 */
    const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
    
    /** Three.js相机引用 */
    const cameraRef = useRef<THREE.OrthographicCamera | null>(null);
    
    /** 地图包围盒状态，用于相机定位 */
    const [boundingBox, setBoundingBox] = useState<THREE.Box3 | null>(null);
    
    /** 省份数据数组，用于点击检测和状态管理 */
    const provincesRef = useRef<ProvinceData[]>([]);
    
    /** 当前选中的省份 */
    const selectedProvinceRef = useRef<ProvinceData | null>(null);

    // ==================== 核心功能函数 ====================

    /**
     * 根据GDP值计算颜色
     * 
     * 功能说明：
     * - 根据GDP值在最小值和最大值之间的比例计算颜色
     * - 使用红色系渐变：从浅红色（低GDP）到深红色（高GDP）
     * - 无GDP数据的省份使用默认灰色
     * 
     * @param gdpValue - GDP值
     * @param minGDP - 最小GDP值
     * @param maxGDP - 最大GDP值
     * @returns Three.js颜色对象
     */
    const getColorByGDP = (gdpValue: number | undefined, minGDP: number, maxGDP: number): THREE.Color => {
        if (gdpValue === undefined) {
            // 无GDP数据的省份使用灰色
            return new THREE.Color(0x888888);
        }

        // 计算GDP值在范围内的比例（0-1）
        const ratio = (gdpValue - minGDP) / (maxGDP - minGDP);
        
        // 使用红色系渐变
        // 浅粉红色 (0xFFCCDD) 到 亮红色 (0xFF3333)
        const lightRed = { r: 0xFF, g: 0xCC, b: 0xDD }; // 浅粉红色
        const darkRed = { r: 0xFF, g: 0x33, b: 0x33 };  // 亮红色
        
        // 线性插值计算颜色
        const r = Math.round(lightRed.r + (darkRed.r - lightRed.r) * ratio);
        const g = Math.round(lightRed.g + (darkRed.g - lightRed.g) * ratio);
        const b = Math.round(lightRed.b + (darkRed.b - lightRed.b) * ratio);
        
        // 转换为16进制颜色值
        const color = (r << 16) | (g << 8) | b;
        return new THREE.Color(color);
    };

    /**
     * 处理省份点击事件
     * 
     * 功能说明：
     * - 使用射线检测识别点击的省份
     * - 管理省份选中状态
     * - 更新省份材质颜色
     * 
     * @param event - 鼠标点击事件
     */
    const handleProvinceClick = (event: MouseEvent) => {
        if (!containerRef.current || !cameraRef.current || !sceneRef.current) return;

        // 计算鼠标在容器中的相对位置（标准化坐标 -1 到 1）
        const rect = containerRef.current.getBoundingClientRect();
        const mouse = new THREE.Vector2();
        mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
        mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

        // 创建射线检测器
        const raycaster = new THREE.Raycaster();
        raycaster.setFromCamera(mouse, cameraRef.current);

        // 获取所有省份网格对象
        const provinceObjects = provincesRef.current.map(province => province.mesh);
        
        // 进行射线检测
        const intersects = raycaster.intersectObjects(provinceObjects);

        if (intersects.length > 0) {
            // 找到被点击的省份
            const clickedMesh = intersects[0].object as THREE.Mesh;
            const clickedProvince = provincesRef.current.find(province => province.mesh === clickedMesh);

            if (clickedProvince) {
                // 如果之前有选中的省份，恢复其原始颜色
                if (selectedProvinceRef.current && selectedProvinceRef.current !== clickedProvince) {
                    selectedProvinceRef.current.mesh.material = selectedProvinceRef.current.originalMaterial;
                }

                // 如果点击的是已选中的省份，取消选中
                if (selectedProvinceRef.current === clickedProvince) {
                    clickedProvince.mesh.material = clickedProvince.originalMaterial;
                    selectedProvinceRef.current = null;
                    console.log(`取消选中省份: ${clickedProvince.name}`);
                } else {
                    // 选中新的省份
                    clickedProvince.mesh.material = clickedProvince.selectedMaterial;
                    selectedProvinceRef.current = clickedProvince;
                    console.log(`选中省份: ${clickedProvince.name}`);
                }
            }
        }
    };

    /**
     * 创建地图几何体
     * 
     * 功能说明：
     * - 将GeoJSON坐标数据转换为Three.js几何体
     * - 使用ExtrudeGeometry创建立体效果
     * - 应用简化的地理投影算法
     * 
     * @param coordinates - GeoJSON坐标数组 [[[经度,纬度]...]]
     * @param extrudeHeight - 挤出高度，控制地图厚度
     * @returns Three.js ExtrudeGeometry对象
     */
    const createMapGeometry = (coordinates: number[][][], extrudeHeight: number = 2): THREE.ExtrudeGeometry => {
        // 创建2D形状对象
        const shape = new THREE.Shape();
        
        // 遍历坐标点，构建形状路径
        coordinates[0].forEach((coord, index) => {
            const [lon, lat] = coord;
            
            // 地理坐标转换为平面坐标
            // 使用简化的墨卡托投影算法
            const x = (lon - 73.5) * 2; // 经度转换，73.5为中国西部边界近似值
            const y = (lat - 18.2) * 2;  // 纬度转换，18.2为中国南部边界近似值
            
            // 构建形状路径
            if (index === 0) {
                shape.moveTo(x, y);  // 移动到起始点
            } else {
                shape.lineTo(x, y);  // 连线到当前点
            }
        });

        // 挤出设置，控制3D效果
        const extrudeSettings = {
            depth: extrudeHeight,        // 挤出深度（地图厚度）
            bevelEnabled: true,          // 启用倒角
            bevelSegments: 2,            // 倒角分段数
            steps: 2,                    // 挤出步数
            bevelSize: 0.5,              // 倒角大小
            bevelThickness: 0.5          // 倒角厚度
        };

        // 返回挤出几何体
        return new THREE.ExtrudeGeometry(shape, extrudeSettings);
    };

    /**
     * 创建波动光圈效果
     * 
     * 功能说明：
     * - 使用PNG图片纹理创建光圈效果
     * - 实现随机波动动画效果
     * - 支持透明度和缩放动画
     * 
     * @param position - 光圈中心位置
     * @param scene - Three.js场景对象
     * @returns 包含光圈对象和动画函数的对象
     */
    const createRippleEffect = (position: THREE.Vector3, scene: THREE.Scene) => {
        const ripples: THREE.Mesh[] = [];
        const rippleCount = 3; // 光圈数量
        
        // 定义颜色组合
        const colorCombinations = [
            new THREE.Color(0xffff00), // 黄
        ];
        
        // 加载光圈纹理
        const textureLoader = new THREE.TextureLoader();
        const rippleTexture = textureLoader.load('/光圈.png');
        
        // 创建多个光圈
        for (let i = 0; i < rippleCount; i++) {
            // 创建平面几何体
            const geometry = new THREE.PlaneGeometry(1, 1);
            
            // 为每个光圈选择不同的颜色
            const color = colorCombinations[0];
            
            // 创建光圈材质，使用PNG纹理和颜色
            const material = new THREE.MeshBasicMaterial({
                map: rippleTexture,
                color: color, // 添加颜色
                transparent: true,
                opacity: 0.6,
                alphaTest: 0.1,
                // side: THREE.DoubleSide,
            });
            
            // 创建光圈网格
            const ripple = new THREE.Mesh(geometry, material);
            ripple.position.copy(position);
            // ripple.rotation.x = -Math.PI / 2; // 水平放置
            
            // 设置初始缩放和延迟
            ripple.scale.setScalar(0.1 + i * 0.3);
            ripple.userData = {
                initialScale: 0.1 + i * 0.3,
                maxScale: 2 + i * 0.5,
                speed: 0.005 + Math.random() * 0.005, // 随机速度（降低速度，使波动更缓慢）
                delay: i * 0.5, // 延迟启动
                phase: 0,
                colorIndex: i, // 颜色索引
                baseColor: color.clone() // 保存基础颜色
            };
            
            scene.add(ripple);
            ripples.push(ripple);
        }
        
        // 动画更新函数
        const updateRipples = () => {
            ripples.forEach((ripple) => {
                const userData = ripple.userData;
                userData.phase += userData.speed;
                
                // 计算波动缩放
                const wave = Math.sin(userData.phase + userData.delay) * 0.5 + 0.5;
                const scale = userData.initialScale + wave * (userData.maxScale - userData.initialScale);
                ripple.scale.setScalar(scale);
                
                // 计算透明度变化
                const opacity = 0.8 - (scale / userData.maxScale) * 0.6;
                (ripple.material as THREE.MeshBasicMaterial).opacity = Math.max(0.1, opacity);
                
                // 动态更新颜色
                const colorPhase = userData.phase * 0.1; // 降低颜色变化速度
                const baseColor = userData.baseColor;
                
                // 创建颜色变化效果
                const colorIntensity = 0.5 + Math.sin(colorPhase) * 0.5; // 0到1之间变化
                const newColor = baseColor.clone().multiplyScalar(colorIntensity + 0.5);
                
                // 更新材质颜色
                (ripple.material as THREE.MeshBasicMaterial).color = newColor;
            });
        };
        
        return { ripples, updateRipples };
    };

    /**
     * 创建行政中心标记
     * 
     * 功能说明：
     * - 在指定坐标位置创建贴图标记
     * - 使用PlaneGeometry + 贴图材质
     * - 支持透明背景和双面显示
     * 
     * @param center - 行政中心坐标 [经度, 纬度]
     * @param name - 行政中心名称
     * @param scene - Three.js场景对象
     * @returns 包含标记对象的对象
     */
    const createAdministrativeCenter = (center: [number, number], name: string, scene: THREE.Scene) => {
        const [lon, lat] = center;
        
        // 使用与地图相同的坐标转换算法
        const x = (lon - 73.5) * 2;
        const y = (lat - 18.2) * 2;
        const z = 2.55; // 标记高度，稍微高于地图表面避免重叠

        // 加载行政中心标记贴图
        const textureLoader = new THREE.TextureLoader();
        const markerTexture = textureLoader.load('/行政中心标记.png');
        
        // 创建平面几何体作为标记载体
        const planeGeometry = new THREE.PlaneGeometry(1, 1);
        
        // 创建贴图材质
        const planeMaterial = new THREE.MeshBasicMaterial({ 
            map: markerTexture,          // 应用贴图
            transparent: true,           // 启用透明度
            alphaTest: 0.1,             // 透明度测试阈值，去除完全透明像素
            side: THREE.DoubleSide       // 双面显示，确保从任何角度都能看到
        });
        
        // 创建标记网格对象
        const marker = new THREE.Mesh(planeGeometry, planeMaterial);
        
        // 设置标记在3D空间中的位置
        // -60和-35是地图居中偏移量
        marker.position.set(x - 60, y, z - 35);
        
        // 将标记添加到场景中
        scene.add(marker);

        // 返回标记对象和位置信息，便于后续操作
        return { 
            marker,
            position: new THREE.Vector3(x - 60, y, z - 35),
            name
        };
    };

    /**
     * 计算并输出包围盒信息
     * 
     * 功能说明：
     * - 计算整个场景的3D包围盒
     * - 输出详细的尺寸和位置信息到控制台
     * - 用于调试和相机定位
     * 
     * @param scene - Three.js场景对象
     * @returns Three.js Box3包围盒对象
     */
    const calculateBoundingBox = (scene: THREE.Scene): THREE.Box3 => {
        // 计算场景中所有对象的包围盒
        const box = new THREE.Box3().setFromObject(scene);
        
        // 输出详细的包围盒信息到控制台
        console.log('=== 地图包围盒信息 ===');
        console.log('最小坐标 (min):', {
            x: box.min.x.toFixed(2),
            y: box.min.y.toFixed(2),
            z: box.min.z.toFixed(2)
        });
        console.log('最大坐标 (max):', {
            x: box.max.x.toFixed(2),
            y: box.max.y.toFixed(2),
            z: box.max.z.toFixed(2)
        });
        console.log('中心点 (center):', {
            x: box.getCenter(new THREE.Vector3()).x.toFixed(2),
            y: box.getCenter(new THREE.Vector3()).y.toFixed(2),
            z: box.getCenter(new THREE.Vector3()).z.toFixed(2)
        });
        console.log('尺寸 (size):', {
            width: box.getSize(new THREE.Vector3()).x.toFixed(2),
            height: box.getSize(new THREE.Vector3()).y.toFixed(2),
            depth: box.getSize(new THREE.Vector3()).z.toFixed(2)
        });
        console.log('==================');
        
        return box;
    };

    /**
     * 初始化3D场景
     * 
     * 功能说明：
     * - 创建Three.js场景、相机、渲染器
     * - 设置光照系统
     * - 加载地图数据并渲染
     * - 添加交互控制
     * - 启动渲染循环
     * 
     * 这是整个组件的核心初始化函数
     */
    const initScene = async () => {
        // 检查容器是否存在
        if (!containerRef.current) return;

        // ==================== 场景初始化 ====================
        
        // 创建3D场景
        const scene = new THREE.Scene();
        scene.background = new THREE.Color(0x1a1a2e); // 设置深蓝色背景
        sceneRef.current = scene;

        // ==================== 相机设置 ====================
        
        // 计算容器宽高比
        const aspect = containerRef.current.clientWidth / containerRef.current.clientHeight;
        const frustumSize = 31.5; // 视锥体大小，控制可视范围，控制地图缩放
        
        // 创建正交相机（无透视变形，适合地图显示）
        const camera = new THREE.OrthographicCamera(
            -frustumSize * aspect,  // 左边界
            frustumSize * aspect,   // 右边界
            frustumSize,            // 上边界
            -frustumSize,           // 下边界
            1,                      // 近裁剪面
            1000                    // 远裁剪面
        );
        
        // 保存相机引用，用于射线检测
        cameraRef.current = camera;

        // ==================== 渲染器设置 ====================
        
        // 创建WebGL渲染器
        const renderer = new THREE.WebGLRenderer({ antialias: true }); // 启用抗锯齿
        renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
        
        // 启用阴影系统
        renderer.shadowMap.enabled = true;
        renderer.shadowMap.type = THREE.PCFSoftShadowMap; // 软阴影类型
        
        rendererRef.current = renderer;
        containerRef.current.appendChild(renderer.domElement);

        // ==================== 鼠标事件监听 ====================
        
        // 添加鼠标点击事件监听器
        renderer.domElement.addEventListener('click', handleProvinceClick);

        // ==================== 交互控制器 ====================
        
        // 创建轨道控制器，支持鼠标交互
        const controls = new OrbitControls(camera, renderer.domElement);

        // ==================== 光照系统 ====================
        
        // 环境光：提供整体基础照明
        const ambientLight = new THREE.AmbientLight(0x404040, 0.6); // 灰色，强度0.6
        scene.add(ambientLight);

        // 方向光：模拟太阳光，产生阴影
        const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8); // 白色，强度0.8
        directionalLight.position.set(50, 100, 50); // 光源位置
        directionalLight.castShadow = true;         // 启用阴影投射
        
        // 阴影贴图设置
        directionalLight.shadow.mapSize.width = 2048;  // 阴影贴图宽度
        directionalLight.shadow.mapSize.height = 2048; // 阴影贴图高度
        scene.add(directionalLight);

        // ==================== 动画更新函数数组 ====================
        
        // 存储所有需要动画更新的函数
        const animationUpdaters: (() => void)[] = [];

        // ==================== 地图数据加载与渲染 ====================
        
        try {
            // 异步加载中国地图GeoJSON数据和GDP数据
            const [mapResponse, gdpResponse] = await Promise.all([
                fetch('/data/china.json'),
                fetch('/data/gdp.json')
            ]);
            
            const mapData = await mapResponse.json();
            const gdpData: GDPData[] = await gdpResponse.json();

            // 创建GDP数据映射表，便于快速查找
            const gdpMap = new Map<string, number>();
            gdpData.forEach(item => {
                gdpMap.set(item.name, item.gdpvalue);
            });

            // 计算GDP的最小值和最大值，用于颜色渐变
            const gdpValues = gdpData.map(item => item.gdpvalue);
            const minGDP = Math.min(...gdpValues);
            const maxGDP = Math.max(...gdpValues);
            
            console.log(`GDP范围: ${minGDP.toFixed(2)} - ${maxGDP.toFixed(2)}`);

            // 存储所有行政中心信息
            const administrativeCenters: Array<{position: THREE.Vector3, name: string}> = [];

            // 遍历地图要素，创建3D地图
            mapData.features.forEach((feature: any, index: number) => {
                // 只处理多边形类型的几何数据
                if (feature.geometry.type === 'Polygon' || feature.geometry.type === 'MultiPolygon') {
                    let coordinates = feature.geometry.coordinates;
                    
                    // 处理MultiPolygon类型（一个省份可能包含多个不连续区域）
                    if (feature.geometry.type === 'MultiPolygon') {
                        coordinates = coordinates[0]; // 取第一个多边形（主要区域）
                    }
                    
                    // 创建省份的3D几何体
                    const geometry = createMapGeometry(coordinates, 2);
                    
                    // 获取省份名称
                    const provinceName = feature.properties?.name || `省份_${index}`;
                    
                    // 获取该省份的GDP值
                    const gdpValue = gdpMap.get(provinceName);
                    
                    // 根据GDP值计算颜色
                    const provinceColor = getColorByGDP(gdpValue, minGDP, maxGDP);
                    
                    // 创建原始材质（根据GDP值设置颜色）
                    const originalMaterial = new THREE.MeshLambertMaterial({
                        color: provinceColor,
                    });
                    
                    // 创建选中时的材质（橙色，表示选中状态）
                    const selectedMaterial = new THREE.MeshLambertMaterial({
                        color: 0xff6b35, // 橙色
                    });
                    
                    // 创建省份网格对象
                    const mesh = new THREE.Mesh(geometry, originalMaterial);
                    
                    // 设置地图位置（居中显示）
                    mesh.position.set(-60, 0, -35);
                    scene.add(mesh);

                    // 保存省份数据到数组中，用于点击检测
                    provincesRef.current.push({
                        mesh: mesh,
                        originalMaterial: originalMaterial,
                        selectedMaterial: selectedMaterial,
                        name: provinceName,
                        gdpValue: gdpValue
                    });

                    // 输出省份GDP信息到控制台
                    if (gdpValue !== undefined) {
                        console.log(`${provinceName}: GDP ${gdpValue.toFixed(2)}亿元`);
                    } else {
                        console.log(`${provinceName}: 无GDP数据`);
                    }

                    // ==================== 省份边界线绘制 ====================
                    
                    // 注释掉的代码：完整边框线（包括侧边垂直线）
                    // const edges = new THREE.EdgesGeometry(geometry);
                    // const lineMaterial = new THREE.LineBasicMaterial({ color: 0x2c5aa0, linewidth: 2 });
                    // const wireframe = new THREE.LineSegments(edges, lineMaterial);
                    // wireframe.position.copy(mesh.position);
                    // scene.add(wireframe);

                    // 只为顶面添加行政区域边界线条（不包括侧边垂直线）
                    const shape = new THREE.Shape();
                    coordinates[0].forEach((coord: [number, number], index: number) => {
                        const [lon, lat] = coord;
                        // 使用相同的坐标转换算法
                        const x = (lon - 73.5) * 2;
                        const y = (lat - 18.2) * 2;
                        
                        // 构建形状路径
                        if (index === 0) {
                            shape.moveTo(x, y);
                        } else {
                            shape.lineTo(x, y);
                        }
                    });
                    
                    // 创建顶面边界线几何体
                    const points = shape.getPoints();
                    const topLineGeometry = new THREE.BufferGeometry().setFromPoints(points);
                    const topLineMaterial = new THREE.LineBasicMaterial({ 
                        color: 0x2c5aa0,  // 深蓝色边界线
                        linewidth: 2      // 线条宽度
                    });
                    const topBorderLine = new THREE.Line(topLineGeometry, topLineMaterial);
                    
                    // 设置边界线位置（在地图顶面稍微上方）
                    topBorderLine.position.set(-60, 0, -32.5);
                    scene.add(topBorderLine);

                    // ==================== 行政中心标记 ====================
                    
                    // 检查是否有行政中心数据
                    if (feature.properties && feature.properties.center && feature.properties.name) {
                        const center = feature.properties.center as [number, number];
                        const name = feature.properties.name;
                        
                        // 创建行政中心标记
                        const centerResult = createAdministrativeCenter(center, name, scene);
                        
                        // 收集行政中心信息，用于后续随机选择
                        administrativeCenters.push({
                            position: centerResult.position,
                            name: centerResult.name
                        });
                    }
                }
            });

            // ==================== 随机选择3个行政中心添加波动光圈 ====================
            
            if (administrativeCenters.length > 0) {
                // 随机打乱数组
                const shuffled = [...administrativeCenters].sort(() => Math.random() - 0.5);
                
                // 选择前3个（或全部，如果少于3个）
                const selectedCenters = shuffled.slice(0, Math.min(3, shuffled.length));
                
                // 为选中的行政中心添加波动光圈
                selectedCenters.forEach((centerInfo, index) => {
                    // 光圈位置稍微高于标记，形成覆盖效果
                    const ripplePosition = new THREE.Vector3(
                        centerInfo.position.x,
                        centerInfo.position.y,
                        centerInfo.position.z + 0.1  // 稍微高于标记
                    );
                    
                    const rippleEffect = createRippleEffect(ripplePosition, scene);
                    animationUpdaters.push(rippleEffect.updateRipples);
                    
                    console.log(`为 ${centerInfo.name} 添加波动光圈效果 (${index + 1}/3)`);
                });
            }

            // ==================== 相机定位 ====================
            
            // 计算场景包围盒，用于自动定位相机
            const box = calculateBoundingBox(scene);
            setBoundingBox(box);

            // 获取场景中心点和尺寸
            const center = box.getCenter(new THREE.Vector3());
            const size = box.getSize(new THREE.Vector3());
            
            // 设置相机位置以查看整个地图
            camera.position.set(center.x, center.y - 90, center.z + 100);
            camera.lookAt(center);           // 相机朝向场景中心
            controls.target.copy(center);    // 控制器目标点设为场景中心
            controls.update();               // 更新控制器

        } catch (error) {
            // 错误处理：地图数据加载失败
            console.error('加载地图数据失败:', error);
        }

        // ==================== 渲染循环 ====================
        
        /**
         * 动画渲染循环
         * 持续更新控制器状态、波动光圈动画并重新渲染场景
         */
        const animate = () => {
            requestAnimationFrame(animate); // 请求下一帧动画
            
            // 更新所有波动光圈动画
            animationUpdaters.forEach(updater => updater());
            
            controls.update();              // 更新控制器状态
            renderer.render(scene, camera); // 渲染场景
        };
        animate(); // 启动渲染循环

        // ==================== 窗口大小变化处理 ====================
        
        /**
         * 处理窗口大小变化
         * 当浏览器窗口大小改变时，自动调整相机和渲染器
         */
        const handleResize = () => {
            if (!containerRef.current || !camera || !renderer) return;
            
            // 重新计算宽高比
            const aspect = containerRef.current.clientWidth / containerRef.current.clientHeight;
            const frustumSize = 200;
            
            // 更新正交相机的视锥体参数
            camera.left = -frustumSize * aspect / 2;
            camera.right = frustumSize * aspect / 2;
            camera.top = frustumSize / 2;
            camera.bottom = -frustumSize / 2;
            camera.updateProjectionMatrix(); // 应用相机参数更新
            
            // 更新渲染器尺寸
            renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
        };

        // 监听窗口大小变化事件
        window.addEventListener('resize', handleResize);

        // ==================== 清理函数 ====================
        
        /**
         * 组件卸载时的清理函数
         * 移除事件监听器和DOM元素，释放资源
         */
        return () => {
            window.removeEventListener('resize', handleResize);
            
            // 移除鼠标点击事件监听器
            if (renderer.domElement) {
                renderer.domElement.removeEventListener('click', handleProvinceClick);
            }
            
            if (containerRef.current && renderer.domElement) {
                containerRef.current.removeChild(renderer.domElement);
            }
            
            // 清空省份数据和选中状态
            provincesRef.current = [];
            selectedProvinceRef.current = null;
            
            renderer.dispose(); // 释放渲染器资源
        };
    };

    // ==================== React生命周期 ====================
    
    /**
     * 组件挂载时执行场景初始化
     * 组件卸载时执行资源清理
     */
    useEffect(() => {
        initScene();

        // 组件卸载时的清理函数
        return () => {
            if (rendererRef.current) {
                rendererRef.current.dispose(); // 释放渲染器资源
            }
        };
    }, []); // 空依赖数组，只在组件挂载时执行一次
    
    // ==================== 组件渲染 ====================
    
    /**
     * 组件JSX渲染
     * 返回一个容器div，Three.js会在其中创建canvas元素
     */
    return (
        
            <div 
                ref={containerRef}
                style={{ 
                    width: '100%',           // 容器宽度100%
                    height: 'calc(100vh - 50px)',        // 固定高度1200px
                    border: '1px solid #ccc', // 边框样式
                    borderRadius: '8px',     // 圆角边框
                    overflow: 'hidden'       // 隐藏溢出内容
                }}
            >
                {/* Three.js canvas将在此容器中动态创建 */}
            </div>
        
    );
};

// 导出组件
export default ChainMap;