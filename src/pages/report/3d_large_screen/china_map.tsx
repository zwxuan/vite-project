import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import chinaMapData from './china_100000_full.json';

// GeoJSON数据类型定义
interface GeoJSONFeature {
  type: string;
  properties: {
    name: string;
    center?: [number, number];
    centroid?: [number, number];
    adcode?: number | string;
    adchar?: string;
    childrenNum?: number;
    level?: string;
    parent?: { adcode: number };
    subFeatureIndex?: number;
    acroutes?: number[];
  };
  geometry: {
    type: string;
    coordinates: any;
  };
}

interface GeoJSONData {
  type: string;
  features: GeoJSONFeature[];
}

// 地图配置接口
interface MapConfig {
    mapData: GeoJSONData;
    mapName: string;
    earthRadius: number;
    coordinateLineStep: number;
}

const ChainMap: React.FC = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const sceneRef = useRef<THREE.Scene | null>(null);
    const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
    const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
    const controlsRef = useRef<OrbitControls | null>(null);
    
    // 地图配置 - 可以轻松切换不同的地图数据
    const mapConfig: MapConfig = {
        mapData: chinaMapData as GeoJSONData,
        mapName: '中国地图',
        earthRadius: 5,
        coordinateLineStep: 30
    };
    
    // 切换到世界地图的示例配置（需要导入世界地图数据）:
    // const mapConfig: MapConfig = {
    //     mapData: worldMapData as GeoJSONData,  // 导入世界地图GeoJSON数据
    //     mapName: '世界地图',
    //     earthRadius: 8,                        // 世界地图可以使用更大的半径
    //     coordinateLineStep: 30                 // 坐标线间隔
    // };
    
    // 将经纬度转换为3D坐标（平面坐标）
    const lngLatToVector3 = (lng: number, lat: number, height: number = 0) => {
        // 中国地图的经纬度范围大约：经度73-135，纬度18-54
        const mapWidth = 10; // 地图宽度
        const mapHeight = 8; // 地图高度
        
        // 将经纬度映射到平面坐标
        const x = ((lng - 73) / (135 - 73) - 0.5) * mapWidth;
        const z = -((lat - 18) / (54 - 18) - 0.5) * mapHeight;
        
        return new THREE.Vector3(x, height, z);
    };
    
    // 创建地图底板
    const createMapBase = () => {
        const mapWidth = 10;
        const mapHeight = 8;
        const thickness = 0.2;
        
        const geometry = new THREE.BoxGeometry(mapWidth, thickness, mapHeight);
        const material = new THREE.MeshLambertMaterial({
            color: 0x2c3e50,
            transparent: true,
            opacity: 0.3
        });
        
        const mesh = new THREE.Mesh(geometry, material);
        mesh.position.y = -thickness / 2;
        return mesh;
    };
    
    // 创建坐标辅助线
    const createCoordinateLines = () => {
        const group = new THREE.Group();
        const mapWidth = 10;
        const mapHeight = 8;
        
        const material = new THREE.LineBasicMaterial({ 
            color: 0xffffff, 
            transparent: true, 
            opacity: 0.3 
        });
        
        // 经线（垂直线）
        for (let i = 0; i <= 10; i++) {
            const x = (i / 10 - 0.5) * mapWidth;
            const points = [
                new THREE.Vector3(x, 0, -mapHeight / 2),
                new THREE.Vector3(x, 0, mapHeight / 2)
            ];
            const geometry = new THREE.BufferGeometry().setFromPoints(points);
            const line = new THREE.Line(geometry, material);
            group.add(line);
        }
        
        // 纬线（水平线）
        for (let i = 0; i <= 8; i++) {
            const z = (i / 8 - 0.5) * mapHeight;
            const points = [
                new THREE.Vector3(-mapWidth / 2, 0, z),
                new THREE.Vector3(mapWidth / 2, 0, z)
            ];
            const geometry = new THREE.BufferGeometry().setFromPoints(points);
            const line = new THREE.Line(geometry, material);
            group.add(line);
        }
        
        return group;
    };
    
    // 创建地图几何体
    const createMapGeometry = () => {
        const group = new THREE.Group();
        const { mapData } = mapConfig;
        
        mapData.features.forEach((feature) => {
            if (feature.geometry.type === 'MultiPolygon' || feature.geometry.type === 'Polygon') {
                const coordinates = feature.geometry.type === 'MultiPolygon' 
                    ? feature.geometry.coordinates 
                    : [feature.geometry.coordinates];
                
                coordinates.forEach((polygon: any) => {
                    polygon.forEach((ring: any, ringIndex: number) => {
                        const points: THREE.Vector3[] = [];
                        
                        ring.forEach((coord: [number, number]) => {
                            const [lng, lat] = coord;
                            points.push(lngLatToVector3(lng, lat, 0));
                        });
                        
                        if (points.length > 2) {
                            // 创建省份边界线
                            const geometry = new THREE.BufferGeometry().setFromPoints(points);
                            const material = new THREE.LineBasicMaterial({ 
                                color: ringIndex === 0 ? 0x00FF00 : 0x008000, // 外环绿色，内环深绿色
                                transparent: true, 
                                opacity: 0.8 
                            });
                            const line = new THREE.LineLoop(geometry, material);
                            group.add(line);
                            
                            // 创建省份填充面（带厚度）- 只对外环创建填充
                             if (ringIndex === 0) {
                                 try {
                                     // 创建顶面和底面的顶点
                                     const vertices: number[] = [];
                                     const indices: number[] = [];
                                     
                                     // 简化多边形，只取主要顶点
                                     const simplifiedRing = ring.filter((_: any, index: number) => index % 2 === 0 || index === ring.length - 1);
                                     
                                     // 添加底面顶点 (y = 0)
                                     simplifiedRing.forEach((coord: [number, number]) => {
                                         const [lng, lat] = coord;
                                         const point = lngLatToVector3(lng, lat, 0);
                                         vertices.push(point.x, 0, point.z);
                                     });
                                     
                                     // 添加顶面顶点 (y = 0.1)
                                     simplifiedRing.forEach((coord: [number, number]) => {
                                         const [lng, lat] = coord;
                                         const point = lngLatToVector3(lng, lat, 0);
                                         vertices.push(point.x, 0.1, point.z);
                                     });
                                     
                                     const vertexCount = simplifiedRing.length;
                                     
                                     // 创建底面三角形
                                     for (let i = 1; i < vertexCount - 1; i++) {
                                         indices.push(0, i, i + 1);
                                     }
                                     
                                     // 创建顶面三角形
                                     for (let i = 1; i < vertexCount - 1; i++) {
                                         indices.push(vertexCount, vertexCount + i + 1, vertexCount + i);
                                     }
                                     
                                     // 创建侧面
                                     for (let i = 0; i < vertexCount - 1; i++) {
                                         const next = (i + 1) % (vertexCount - 1);
                                         // 侧面四边形分成两个三角形
                                         indices.push(i, next, vertexCount + i);
                                         indices.push(next, vertexCount + next, vertexCount + i);
                                     }
                                     
                                     const geometry = new THREE.BufferGeometry();
                                     geometry.setIndex(indices);
                                     geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
                                     geometry.computeVertexNormals();
                                     
                                     const material = new THREE.MeshLambertMaterial({
                                         color: 0x4a90e2,
                                         transparent: true,
                                         opacity: 0.6,
                                         side: THREE.DoubleSide
                                     });
                                     
                                     const mesh = new THREE.Mesh(geometry, material);
                                     group.add(mesh);
                                 } catch (error) {
                                     console.warn('Failed to create extruded geometry for province:', feature.properties.name, error);
                                 }
                             }
                        }
                    });
                });
            }
        });
        
        return group;
    };
    
    // 创建省份标记点
    const createProvinceMarkers = () => {
        const group = new THREE.Group();
        const { mapData } = mapConfig;
        
        mapData.features.forEach((feature) => {
            const province = feature.properties;
            
            // 检查是否有center坐标，如果没有则使用centroid或跳过
            if (!province.center && !province.centroid) {
                console.warn(`省份 ${province.name} 缺少坐标信息`);
                return;
            }
            
            const [lng, lat] = province.center || province.centroid!;
            const position = lngLatToVector3(lng, lat, 0.2);
            
            // 创建标记点
            const geometry = new THREE.SphereGeometry(0.05, 16, 16);
            const material = new THREE.MeshPhongMaterial({ color: 0xFF4500 });
            const marker = new THREE.Mesh(geometry, material);
            marker.position.copy(position);
            
            // 创建文字标签
            const canvas = document.createElement('canvas');
            const context = canvas.getContext('2d')!;
            canvas.width = 256;
            canvas.height = 64;
            context.fillStyle = '#FFFFFF';
            context.font = '24px Arial';
            context.textAlign = 'center';
            context.fillText(province.name, 128, 40);
            
            const texture = new THREE.CanvasTexture(canvas);
            const spriteMaterial = new THREE.SpriteMaterial({ map: texture });
            const sprite = new THREE.Sprite(spriteMaterial);
            sprite.position.copy(position);
            sprite.position.y += 0.3;
            sprite.scale.set(0.5, 0.125, 1);
            
            group.add(marker);
            group.add(sprite);
        });
        
        return group;
    };
    
    useEffect(() => {
        if (!containerRef.current) return;
        
        // 创建场景
        const scene = new THREE.Scene();
        scene.background = new THREE.Color(0x000011);
        sceneRef.current = scene;
        
        // 创建相机
        const camera = new THREE.PerspectiveCamera(
            75,
            containerRef.current.clientWidth / containerRef.current.clientHeight,
            0.1,
            1000
        );
        camera.position.set(0, 8, 8);
        cameraRef.current = camera;
        
        // 创建渲染器
        const renderer = new THREE.WebGLRenderer({ antialias: true });
        renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
        renderer.shadowMap.enabled = true;
        renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        rendererRef.current = renderer;
        
        // 创建控制器
        const controls = new OrbitControls(camera, renderer.domElement);
        controls.enableDamping = true;
        controls.dampingFactor = 0.05;
        controls.enableZoom = true;
        controls.autoRotate = true;
        controls.autoRotateSpeed = 1.0;
        controls.minDistance = 5;
        controls.maxDistance = 20;
        controlsRef.current = controls;
        
        // 添加光源
        const ambientLight = new THREE.AmbientLight(0x404040, 0.6);
        scene.add(ambientLight);
        
        const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
        directionalLight.position.set(10, 10, 5);
        directionalLight.castShadow = true;
        scene.add(directionalLight);
        
        // 创建地图底板
        // const mapBase = createMapBase();
        // scene.add(mapBase);
        
        // 创建坐标辅助线
        // const coordinateLines = createCoordinateLines();
        // scene.add(coordinateLines);
        
        // 创建地图几何体
        const mapGeometry = createMapGeometry();
        scene.add(mapGeometry);
        
        // 创建省份标记
        const provinceMarkers = createProvinceMarkers();
        scene.add(provinceMarkers);
        
        // 添加到DOM
        containerRef.current.appendChild(renderer.domElement);
        
        // 动画循环
        const animate = () => {
            requestAnimationFrame(animate);
            controls.update();
            renderer.render(scene, camera);
        };
        animate();
        
        // 处理窗口大小变化
        const handleResize = () => {
            if (!containerRef.current || !camera || !renderer) return;
            
            camera.aspect = containerRef.current.clientWidth / containerRef.current.clientHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
        };
        
        window.addEventListener('resize', handleResize);
        
        // 清理函数
        return () => {
            window.removeEventListener('resize', handleResize);
            if (containerRef.current && renderer.domElement) {
                containerRef.current.removeChild(renderer.domElement);
            }
            controls.dispose();
            renderer.dispose();
        };
    }, []);
    
    return (
        <div className="nc-bill-search-area" style={{ paddingTop: '10px' }}>
            <div 
                ref={containerRef}
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