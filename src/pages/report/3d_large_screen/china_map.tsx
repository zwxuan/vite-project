import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

interface AdministrativeCenter {
    name: string;
    coordinates: [number, number];
}

interface MapData {
    type: string;
    features: any[];
    administrativeCenters: AdministrativeCenter[];
}

const ChainMap: React.FC = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const sceneRef = useRef<THREE.Scene | null>(null);
    const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
    const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
    const controlsRef = useRef<OrbitControls | null>(null);
    const [boundingBox, setBoundingBox] = useState<THREE.Box3 | null>(null);


    // 创建地图几何体
    const createMapGeometry = (coordinates: number[][][], extrudeHeight: number = 2): THREE.ExtrudeGeometry => {
        const shape = new THREE.Shape();
        
        coordinates[0].forEach((coord, index) => {
            const [lon, lat] = coord;
            // 将经纬度映射到平面坐标
            const x = (lon - 73.5) * 2; // 简化的投影
            const y = (lat - 18.2) * 2;
            
            if (index === 0) {
                shape.moveTo(x, y);
            } else {
                shape.lineTo(x, y);
            }
        });

        const extrudeSettings = {
            depth: extrudeHeight,
            bevelEnabled: true,
            bevelSegments: 2,
            steps: 2,
            bevelSize: 0.5,
            bevelThickness: 0.5
        };

        return new THREE.ExtrudeGeometry(shape, extrudeSettings);
    };

    // 创建行政中心标记
    const createAdministrativeCenter = (center: [number, number], name: string, scene: THREE.Scene) => {
        const [lon, lat] = center;
        // 使用与地图相同的坐标转换
        const x = (lon - 73.5) * 2;
        const y = (lat - 18.2) * 2;
        const z = 2.55; // 稍微高于地图表面

        // 加载贴图文件
        const textureLoader = new THREE.TextureLoader();
        const markerTexture = textureLoader.load('/src/pages/report/3d_large_screen/行政中心标记.png');
        
        // 创建平面几何体标记
        const planeGeometry = new THREE.PlaneGeometry(1, 1);
        const planeMaterial = new THREE.MeshBasicMaterial({ 
            map: markerTexture,
            transparent: true,
            alphaTest: 0.1,
            side: THREE.DoubleSide // 双面显示
        });
        const marker = new THREE.Mesh(planeGeometry, planeMaterial);
        
        // 设置标记位置
        marker.position.set(x - 60, y, z - 35);
        scene.add(marker);

        return { marker};
    };


    // 计算并输出包围盒信息
    const calculateBoundingBox = (scene: THREE.Scene): THREE.Box3 => {
        const box = new THREE.Box3().setFromObject(scene);
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

    // 初始化3D场景
    const initScene = async () => {
        if (!containerRef.current) return;

        // 创建场景
        const scene = new THREE.Scene();
        scene.background = new THREE.Color(0x1a1a2e);
        sceneRef.current = scene;

        // 创建相机
        const aspect = containerRef.current.clientWidth / containerRef.current.clientHeight;
        const frustumSize = 33; // 视锥体大小
        const camera = new THREE.OrthographicCamera(
            -frustumSize * aspect,  // left
            frustumSize * aspect,   // right
            frustumSize,            // top
            -frustumSize,           // bottom
            1,                          // near
            1000                        // far
        );
        

        // 创建渲染器
        const renderer = new THREE.WebGLRenderer({ antialias: true });
        renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
        renderer.shadowMap.enabled = true;
        renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        rendererRef.current = renderer;
        containerRef.current.appendChild(renderer.domElement);

        // 创建控制器
        const controls = new OrbitControls(camera, renderer.domElement);

        // 添加光源
        const ambientLight = new THREE.AmbientLight(0x404040, 0.6);
        scene.add(ambientLight);

        const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
        directionalLight.position.set(50, 100, 50);
        directionalLight.castShadow = true;
        directionalLight.shadow.mapSize.width = 2048;
        directionalLight.shadow.mapSize.height = 2048;
        scene.add(directionalLight);

        try {
            // 加载地图数据
            const response = await fetch('/src/pages/report/3d_large_screen/china.json');
            const mapData = await response.json();

            // 创建地图几何体
            mapData.features.forEach((feature: any, index: number) => {
                if (feature.geometry.type === 'Polygon' || feature.geometry.type === 'MultiPolygon') {
                    let coordinates = feature.geometry.coordinates;
                    
                    // 处理MultiPolygon类型
                    if (feature.geometry.type === 'MultiPolygon') {
                        coordinates = coordinates[0]; // 取第一个多边形
                    }
                    
                    const geometry = createMapGeometry(coordinates, 2);
                    
                    // 创建地图材质
                    const material = new THREE.MeshLambertMaterial({
                        color: 0x4a90e2,
                        
                    });
                    
                    const mesh = new THREE.Mesh(geometry, material);
                    
                    
                    // 居中地图
                    mesh.position.set(-60, 0, -35);
                    scene.add(mesh);

                    // 添加边框线(包括侧边垂直线)
                    // const edges = new THREE.EdgesGeometry(geometry);
                    // const lineMaterial = new THREE.LineBasicMaterial({ color: 0x2c5aa0, linewidth: 2 });
                    // const wireframe = new THREE.LineSegments(edges, lineMaterial);
                    // wireframe.position.copy(mesh.position);
                    // scene.add(wireframe);

                    // 只为顶面添加行政区域边界线条（不包括侧边垂直线）
                    // 创建顶面的形状轮廓线
                    const shape = new THREE.Shape();
                    coordinates[0].forEach((coord: [number, number], index: number) => {
                        const [lon, lat] = coord;
                        const x = (lon - 73.5) * 2;
                        const y = (lat - 18.2) * 2;
                        
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
                        color: 0x2c5aa0, 
                        linewidth: 2 
                    });
                    const topBorderLine = new THREE.Line(topLineGeometry, topLineMaterial);
                    
                    // 设置线条位置（在地图顶面）
                    topBorderLine.position.set(-60, 0, -32.5); // y稍微高于地图顶面

                    // topBorderLine.rotateX(-Math.PI / 2); // 旋转到水平面
                    scene.add(topBorderLine);

                    // 添加行政中心标记
                    if (feature.properties && feature.properties.center && feature.properties.name) {
                        const center = feature.properties.center as [number, number];
                        const name = feature.properties.name;
                        createAdministrativeCenter(center, name, scene);
                    }
                }
            });

            // 计算包围盒
            const box = calculateBoundingBox(scene);
            setBoundingBox(box);

            // 设置相机位置以查看整个地图
            const center = box.getCenter(new THREE.Vector3());
            const size = box.getSize(new THREE.Vector3());
            
            // 对于正交相机，直接设置位置
            camera.position.set(center.x, center.y-50, center.z + 100);
            camera.lookAt(center);
            controls.target.copy(center);
            controls.update();

        } catch (error) {
            console.error('加载地图数据失败:', error);
        }

        // 渲染循环
        const animate = () => {
            requestAnimationFrame(animate);
            controls.update();
            renderer.render(scene, camera);
        };
        animate();

        // 处理窗口大小变化
        const handleResize = () => {
            if (!containerRef.current || !camera || !renderer) return;
            
            const aspect = containerRef.current.clientWidth / containerRef.current.clientHeight;
            const frustumSize = 200;
            
            // 更新正交相机的视锥体
            camera.left = -frustumSize * aspect / 2;
            camera.right = frustumSize * aspect / 2;
            camera.top = frustumSize / 2;
            camera.bottom = -frustumSize / 2;
            camera.updateProjectionMatrix();
            
            renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
            if (containerRef.current && renderer.domElement) {
                containerRef.current.removeChild(renderer.domElement);
            }
            renderer.dispose();
        };
    };

    useEffect(() => {
        initScene();

        return () => {
            // 清理资源
            if (rendererRef.current) {
                rendererRef.current.dispose();
            }
        };
    }, []);
    
    return (
        <div className="nc-bill-search-area" style={{ paddingTop: '10px' }}>
            <div 
                ref={containerRef}
                style={{ 
                    width: '100%', 
                    height: '1200px', 
                    border: '1px solid #ccc',
                    borderRadius: '8px',
                    overflow: 'hidden'
                }}
            >
            </div>
        </div>
    );
};

export default ChainMap;