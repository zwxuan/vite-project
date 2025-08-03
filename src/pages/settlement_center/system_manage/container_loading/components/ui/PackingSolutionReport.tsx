import React from 'react';
import { Modal, Descriptions, Table, Tag, Divider, Typography, Card, Row, Col, Statistic, Space, Badge, Progress, Button } from 'antd';
import { 
  ContainerOutlined, 
  BoxPlotOutlined, 
  DollarOutlined, 
  PercentageOutlined,
  ClockCircleOutlined,
  CheckCircleOutlined,
  ExclamationCircleOutlined,
  FileTextOutlined,
  BarChartOutlined,
  PrinterOutlined
} from '@ant-design/icons';
import { FinalPackingSolution, PackingStep } from '../../utils/PackingSolutionCache';
import { Cargo } from '../../types';
import { PositionVisualization } from './PositionVisualization';

const { Title, Text } = Typography;

interface PackingSolutionReportProps {
  visible: boolean;
  onCancel: () => void;
  solution: FinalPackingSolution | null;
}

/**
 * 装箱方案报告组件
 */
export const PackingSolutionReport: React.FC<PackingSolutionReportProps> = ({
  visible,
  onCancel,
  solution
}) => {
  // 打印功能处理函数
  const handlePrint = () => {
    if (!solution) return;

    // 生成打印内容的HTML
    const generatePrintHTML = () => {
      return `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <title>最终装箱方案报告</title>
          <style>
            body {
              font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
              margin: 0;
              padding: 20px;
              line-height: 1.6;
              color: #333;
            }
            .print-header {
              text-align: center;
              margin-bottom: 30px;
              border-bottom: 3px solid #1890ff;
              padding-bottom: 20px;
            }
            .print-title {
              font-size: 28px;
              font-weight: bold;
              color: #1890ff;
              margin-bottom: 8px;
            }
            .print-subtitle {
              font-size: 16px;
              color: #666;
              margin-bottom: 10px;
            }
            .print-info {
              font-size: 14px;
              color: #999;
            }
            .section {
              margin-bottom: 30px;
              page-break-inside: avoid;
            }
            .section-title {
              font-size: 20px;
              font-weight: bold;
              color: #2c3e50;
              margin-bottom: 20px;
              padding: 15px 20px;
              background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
              border-radius: 8px;
              border-left: 4px solid #1890ff;
              display: flex;
              align-items: center;
              gap: 10px;
              box-shadow: 0 2px 8px rgba(0,0,0,0.05);
            }
            .stats-grid {
              display: grid;
              grid-template-columns: repeat(4, 1fr);
              gap: 20px;
              margin-bottom: 30px;
            }
            .stat-item {
              text-align: center;
              padding: 20px 15px;
              border: none;
              border-radius: 12px;
              background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
              box-shadow: 0 8px 25px rgba(102, 126, 234, 0.15);
              transition: all 0.3s ease;
              position: relative;
              overflow: hidden;
            }
            .stat-item::before {
              content: '';
              position: absolute;
              top: 0;
              left: 0;
              right: 0;
              bottom: 0;
              background: linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%);
              pointer-events: none;
            }
            .stat-item:nth-child(1) {
              background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            }
            .stat-item:nth-child(2) {
              background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
            }
            .stat-item:nth-child(3) {
              background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
            }
            .stat-item:nth-child(4) {
              background: linear-gradient(135deg, #43e97b 0%, #38f9d7 100%);
            }
            .stat-icon {
              font-size: 28px;
              color: rgba(255, 255, 255, 0.9);
              margin-bottom: 8px;
              display: block;
            }
            .stat-value {
              font-size: 28px;
              font-weight: bold;
              color: #ffffff;
              display: block;
              text-shadow: 0 2px 4px rgba(0,0,0,0.1);
              margin-bottom: 5px;
            }
            .stat-label {
              font-size: 13px;
              color: rgba(255, 255, 255, 0.9);
              margin-top: 5px;
              font-weight: 500;
              letter-spacing: 0.5px;
            }
            .overview-header {
              text-align: center;
              margin-bottom: 25px;
              padding: 20px;
              background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
              border-radius: 12px;
              border: 1px solid #e1e8ed;
            }
            .overview-title {
              font-size: 24px;
              font-weight: bold;
              color: #2c3e50;
              margin-bottom: 8px;
              display: flex;
              align-items: center;
              justify-content: center;
              gap: 10px;
            }
            .overview-subtitle {
              font-size: 14px;
              color: #7f8c8d;
              font-style: italic;
            }
            .info-table {
              width: 100%;
              border-collapse: collapse;
              margin-bottom: 25px;
              border-radius: 8px;
              overflow: hidden;
              box-shadow: 0 4px 12px rgba(0,0,0,0.08);
            }
            .info-table th,
            .info-table td {
              border: none;
              border-bottom: 1px solid #e8e8e8;
              padding: 14px 12px;
              text-align: left;
              font-size: 13px;
            }
            .info-table th {
              background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
              font-weight: 600;
              color: #ffffff;
              text-shadow: 0 1px 2px rgba(0,0,0,0.1);
              letter-spacing: 0.5px;
            }
            .info-table tr:nth-child(even) {
              background-color: #f8f9fa;
            }
            .info-table tr:hover {
              background-color: #e3f2fd;
              transition: background-color 0.2s ease;
            }
            .info-table td {
              color: #495057;
            }
            .cargo-item, .container-item, .step-item {
              margin-bottom: 15px;
              padding: 15px;
              border: 1px solid #e8e8e8;
              border-radius: 6px;
              background: #fafafa;
            }
            .item-header {
              font-weight: bold;
              color: #1890ff;
              margin-bottom: 8px;
              font-size: 14px;
            }
            .item-details {
              font-size: 12px;
              color: #666;
              line-height: 1.4;
            }
            @page {
              margin: 1.5cm;
              size: A4;
            }
            @media print {
              body { print-color-adjust: exact; }
              .section { page-break-inside: avoid; }
            }
          </style>
        </head>
        <body>
          <div class="print-header">
            <div class="print-title">最终装箱方案报告</div>
            <div class="print-subtitle">Container Loading Solution Report</div>
            <div class="print-info">
              生成时间：${new Date().toLocaleString()} | 方案ID：${solution.id}
            </div>
          </div>

          <div class="section">
            <div class="overview-header">
              <div class="overview-title">
                📊 方案执行概览
              </div>
              <div class="overview-subtitle">Solution Execution Overview</div>
            </div>
            <div class="stats-grid">
              <div class="stat-item">
                <span class="stat-icon">📦</span>
                <span class="stat-value">${summary.totalContainers}</span>
                <div class="stat-label">使用集装箱（个）</div>
              </div>
              <div class="stat-item">
                <span class="stat-icon">📈</span>
                <span class="stat-value">${summary.utilizationRate.toFixed(1)}%</span>
                <div class="stat-label">空间利用率</div>
              </div>
              <div class="stat-item">
                <span class="stat-icon">💰</span>
                <span class="stat-value">¥${summary.totalCost.toLocaleString()}</span>
                <div class="stat-label">总运输成本</div>
              </div>
              <div class="stat-item">
                <span class="stat-icon">📋</span>
                <span class="stat-value">${summary.packedCargos}/${summary.totalCargos}</span>
                <div class="stat-label">货物装载（件）</div>
              </div>
            </div>
          </div>

          <div class="section">
            <div class="section-title">ℹ️ 方案基本信息</div>
            <table class="info-table">
              <tr><th>方案ID</th><td>${solution.id}</td><th>生成时间</th><td>${new Date(solution.timestamp).toLocaleString()}</td></tr>
              <tr><th>装箱算法</th><td>${packingResult.algorithm}</td><th>装箱模式</th><td>${packingResult.mode}</td></tr>
              <tr><th>执行时间</th><td>${packingResult.executionTime ? `${packingResult.executionTime}ms` : '未记录'}</td><th>迭代次数</th><td>${packingResult.iterations || 0}</td></tr>
            </table>
          </div>

          <div class="section">
            <div class="section-title">📦 货物清单明细</div>
            <table class="info-table">
              <thead>
                <tr>
                  <th>序号</th>
                  <th>货物名称</th>
                  <th>尺寸规格</th>
                  <th>重量(kg)</th>
                  <th>数量</th>
                  <th>总体积(m³)</th>
                  <th>装载状态</th>
                </tr>
              </thead>
              <tbody>
                ${originalCargos.map((cargo, index) => {
                  const volume = cargo.length * cargo.width * cargo.height * cargo.quantity;
                  const isLoaded = packingResult.packedItems.some(item => item.cargo.id === cargo.id);
                  return `
                    <tr>
                      <td>${index + 1}</td>
                      <td>${cargo.name}</td>
                      <td>${cargo.length}×${cargo.width}×${cargo.height}m</td>
                      <td>${cargo.weight.toLocaleString()}</td>
                      <td>${cargo.quantity}</td>
                      <td>${volume.toFixed(3)}</td>
                      <td>${isLoaded ? '已装载' : '未装载'}</td>
                    </tr>
                  `;
                }).join('')}
              </tbody>
            </table>
          </div>

          <div class="section">
            <div class="section-title">🚛 集装箱配置明细</div>
            <table class="info-table">
              <thead>
                <tr>
                  <th>集装箱编号</th>
                  <th>容器类型</th>
                  <th>容器规格</th>
                  <th>最大载重(kg)</th>
                  <th>使用成本(¥)</th>
                  <th>装载数量</th>
                </tr>
              </thead>
              <tbody>
                ${packingResult.containers.map((container, index) => {
                  const count = packingResult.packedItems.filter(item => item.containerIndex === index).length;
                  return `
                    <tr>
                      <td>集装箱 ${index + 1}</td>
                      <td>${container.name}</td>
                      <td>${container.length}×${container.width}×${container.height}m</td>
                      <td>${container.maxWeight.toLocaleString()}</td>
                      <td>${container.cost.toLocaleString()}</td>
                      <td>${count} 件</td>
                    </tr>
                  `;
                }).join('')}
              </tbody>
            </table>
          </div>

          <div class="section">
            <div class="section-title">⚙️ 装箱操作步骤</div>
            ${packingSteps.map((step, index) => {
              const container = packingResult.containers[step.containerIndex];
              const cargo = originalCargos.find(c => c.name === step.cargoName);
              // 先尝试精确匹配
              let processedCargo = packingResult.packedItems.find(item => 
                item.cargo.name === step.cargoName && 
                item.x === step.position.x &&
                item.y === step.position.y &&
                item.z === step.position.z
              );
              
              // 如果精确匹配失败，尝试只匹配货物名称
              if (!processedCargo) {
                processedCargo = packingResult.packedItems.find(item => 
                  item.cargo.name === step.cargoName
                );
              }
              
              // 如果还是找不到，尝试匹配货物ID
              if (!processedCargo && cargo) {
                processedCargo = packingResult.packedItems.find(item => 
                  item.cargo.id === cargo.id
                );
              }
              
              // 生成位置示意图 SVG
              const generatePositionSVG = () => {
                if (!cargo || !processedCargo) return '';
                
                // 缩放比例
                const maxDimension = Math.max(container.length, container.width);
                const scale = 150 / maxDimension;
                
                // 等轴投影参数
                const cos30 = Math.cos(Math.PI / 6);
                const sin30 = Math.sin(Math.PI / 6);
                
                // 3D到2D投影函数
                const project3D = (x: number, y: number, z: number) => ({
                  x: (x - y) * cos30,
                  y: (x + y) * sin30 - z
                });
                
                // 缩放后的尺寸
                const scaledContainer = {
                  length: container.length * scale,
                  width: container.width * scale,
                  height: (container.isFrameContainer ? 2000 : container.height) * scale
                };
                
                const scaledCargo = {
                  length: processedCargo.cargo.length * scale,
                  width: processedCargo.cargo.width * scale,
                  height: processedCargo.cargo.height * scale
                };
                
                const scaledPosition = {
                  x: step.position.x * scale,
                  y: step.position.y * scale,
                  z: step.position.z * scale
                };
                
                // 计算顶点
                const containerVertices = [
                  project3D(0, 0, 0),
                  project3D(scaledContainer.length, 0, 0),
                  project3D(scaledContainer.length, scaledContainer.width, 0),
                  project3D(0, scaledContainer.width, 0),
                  project3D(0, 0, scaledContainer.height),
                  project3D(scaledContainer.length, 0, scaledContainer.height),
                  project3D(scaledContainer.length, scaledContainer.width, scaledContainer.height),
                  project3D(0, scaledContainer.width, scaledContainer.height)
                ];
                
                const cargoVertices = [
                  project3D(scaledPosition.x, scaledPosition.z, scaledPosition.y),
                  project3D(scaledPosition.x + scaledCargo.length, scaledPosition.z, scaledPosition.y),
                  project3D(scaledPosition.x + scaledCargo.length, scaledPosition.z + scaledCargo.width, scaledPosition.y),
                  project3D(scaledPosition.x, scaledPosition.z + scaledCargo.width, scaledPosition.y),
                  project3D(scaledPosition.x, scaledPosition.z, scaledPosition.y + scaledCargo.height),
                  project3D(scaledPosition.x + scaledCargo.length, scaledPosition.z, scaledPosition.y + scaledCargo.height),
                  project3D(scaledPosition.x + scaledCargo.length, scaledPosition.z + scaledCargo.width, scaledPosition.y + scaledCargo.height),
                  project3D(scaledPosition.x, scaledPosition.z + scaledCargo.width, scaledPosition.y + scaledCargo.height)
                ];
                
                // 居中显示
                const centerX = 150;
                const centerY = 100;
                
                const adjustedContainerVertices = containerVertices.map(v => ({
                  x: v.x + centerX,
                  y: v.y + centerY
                }));
                
                const adjustedCargoVertices = cargoVertices.map(v => ({
                  x: v.x + centerX,
                  y: v.y + centerY
                }));
                
                const cargoColor = cargo.color || '#1890ff';
                // 将颜色转换为rgba格式的函数
                const colorToRgba = (color: string, alpha: number) => {
                  // 如果已经是rgba格式，直接返回
                  if (color.startsWith('rgba(')) {
                    return color.replace(/[\d\.]+\)$/g, `${alpha})`);
                  }
                  
                  // 如果是rgb格式，转换为rgba
                  if (color.startsWith('rgb(')) {
                    return color.replace('rgb(', 'rgba(').replace(')', `, ${alpha})`);
                  }
                  
                  // 如果是十六进制格式
                  if (color.startsWith('#')) {
                    const hex = color.length === 4 ? 
                      color.replace(/^#(.)(.)(.)$/, '#$1$1$2$2$3$3') : color;
                    const r = parseInt(hex.slice(1, 3), 16);
                    const g = parseInt(hex.slice(3, 5), 16);
                    const b = parseInt(hex.slice(5, 7), 16);
                    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
                  }
                  
                  // 如果是命名颜色或其他格式，回退到默认蓝色
                  const r = 24, g = 144, b = 255;
                  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
                };

                // 获取不同透明度的颜色
                const cargoColorRgba = {
                  light: colorToRgba(cargoColor, 0.5),
                  medium: colorToRgba(cargoColor, 0.6),
                  normal: colorToRgba(cargoColor, 0.7),
                  dark: colorToRgba(cargoColor, 0.9)
                };
                return `
                  <svg width="300" height="200" viewBox="0 0 300 200" style="border: 1px solid #d9d9d9; border-radius: 4px; background: white; margin: 10px 0;">
                    <!-- 集装箱线框 -->
                    <g stroke="#ff4d4f" stroke-width="2" fill="none">
                      <polygon points="${adjustedContainerVertices[0].x},${adjustedContainerVertices[0].y} ${adjustedContainerVertices[1].x},${adjustedContainerVertices[1].y} ${adjustedContainerVertices[2].x},${adjustedContainerVertices[2].y} ${adjustedContainerVertices[3].x},${adjustedContainerVertices[3].y}" 
                               stroke-dasharray="${container.isFrameContainer ? '8,4' : 'none'}" 
                               fill="${container.isFrameContainer ? 'rgba(255, 77, 79, 0.3)' : 'none'}" />
                      <polygon points="${adjustedContainerVertices[4].x},${adjustedContainerVertices[4].y} ${adjustedContainerVertices[5].x},${adjustedContainerVertices[5].y} ${adjustedContainerVertices[6].x},${adjustedContainerVertices[6].y} ${adjustedContainerVertices[7].x},${adjustedContainerVertices[7].y}" 
                               stroke-dasharray="${container.isFrameContainer ? '8,4' : 'none'}" 
                               fill="${container.isFrameContainer ? 'rgba(255, 77, 79, 0.2)' : 'none'}" />
                      <line x1="${adjustedContainerVertices[0].x}" y1="${adjustedContainerVertices[0].y}" x2="${adjustedContainerVertices[4].x}" y2="${adjustedContainerVertices[4].y}" stroke-dasharray="${container.isFrameContainer ? '8,4' : 'none'}" />
                      <line x1="${adjustedContainerVertices[1].x}" y1="${adjustedContainerVertices[1].y}" x2="${adjustedContainerVertices[5].x}" y2="${adjustedContainerVertices[5].y}" stroke-dasharray="${container.isFrameContainer ? '8,4' : 'none'}" />
                      <line x1="${adjustedContainerVertices[2].x}" y1="${adjustedContainerVertices[2].y}" x2="${adjustedContainerVertices[6].x}" y2="${adjustedContainerVertices[6].y}" stroke-dasharray="${container.isFrameContainer ? '8,4' : 'none'}" />
                      <line x1="${adjustedContainerVertices[3].x}" y1="${adjustedContainerVertices[3].y}" x2="${adjustedContainerVertices[7].x}" y2="${adjustedContainerVertices[7].y}" stroke-dasharray="${container.isFrameContainer ? '8,4' : 'none'}" />
                    </g>
                    
                    <!-- 货物立体块 -->
                    <g>
                      <polygon points="${adjustedCargoVertices[0].x},${adjustedCargoVertices[0].y} ${adjustedCargoVertices[1].x},${adjustedCargoVertices[1].y} ${adjustedCargoVertices[2].x},${adjustedCargoVertices[2].y} ${adjustedCargoVertices[3].x},${adjustedCargoVertices[3].y}" 
                               fill="${cargoColorRgba.medium}" stroke="${cargoColor}" stroke-width="1" />
                      <polygon points="${adjustedCargoVertices[4].x},${adjustedCargoVertices[4].y} ${adjustedCargoVertices[5].x},${adjustedCargoVertices[5].y} ${adjustedCargoVertices[6].x},${adjustedCargoVertices[6].y} ${adjustedCargoVertices[7].x},${adjustedCargoVertices[7].y}" 
                               fill="${cargoColorRgba.dark}" stroke="${cargoColor}" stroke-width="2" />
                      <polygon points="${adjustedCargoVertices[1].x},${adjustedCargoVertices[1].y} ${adjustedCargoVertices[2].x},${adjustedCargoVertices[2].y} ${adjustedCargoVertices[6].x},${adjustedCargoVertices[6].y} ${adjustedCargoVertices[5].x},${adjustedCargoVertices[5].y}" 
                               fill="${cargoColorRgba.normal}" stroke="${cargoColor}" stroke-width="2" />
                      <polygon points="${adjustedCargoVertices[2].x},${adjustedCargoVertices[2].y} ${adjustedCargoVertices[3].x},${adjustedCargoVertices[3].y} ${adjustedCargoVertices[7].x},${adjustedCargoVertices[7].y} ${adjustedCargoVertices[6].x},${adjustedCargoVertices[6].y}" 
                               fill="${cargoColorRgba.light}" stroke="${cargoColor}" stroke-width="2" />
                    </g>
                    
                    <!-- 坐标轴 -->
                    <g stroke="#666" stroke-width="1" fill="#666" font-size="8">
                      <line x1="${adjustedContainerVertices[0].x - 10}" y1="${adjustedContainerVertices[0].y}" x2="${adjustedContainerVertices[1].x - 10}" y2="${adjustedContainerVertices[1].y}" marker-end="url(#arrowhead)" />
                      <text x="${adjustedContainerVertices[1].x - 5}" y="${adjustedContainerVertices[1].y - 3}" font-size="8" fill="#cf1322">X(${container.length})</text>
                      <line x1="${adjustedContainerVertices[0].x - 10}" y1="${adjustedContainerVertices[0].y}" x2="${adjustedContainerVertices[4].x - 10}" y2="${adjustedContainerVertices[4].y}" marker-end="url(#arrowhead)" />
                      <text x="${adjustedContainerVertices[4].x - 20}" y="${adjustedContainerVertices[4].y - 3}" font-size="8" fill="#1d39c4">Y(${container.isFrameContainer ? '2000' : container.height})</text>
                      <line x1="${adjustedContainerVertices[0].x}" y1="${adjustedContainerVertices[0].y + 10}" x2="${adjustedContainerVertices[3].x}" y2="${adjustedContainerVertices[3].y + 10}" marker-end="url(#arrowhead)" />
                      <text x="${adjustedContainerVertices[3].x + 3}" y="${adjustedContainerVertices[3].y + 15}" font-size="8" fill="#389e0d">Z(${container.width})</text>
                    </g>
                    
                    <defs>
                      <marker id="arrowhead" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto">
                        <polygon points="0 0, 8 3, 0 6" fill="#666" />
                      </marker>
                    </defs>
                  </svg>
                `;
              };
              
              return `
                <div class="step-item">
                  <div class="item-header">步骤 ${step.stepNumber}</div>
                  <div style="display: flex; gap: 20px; align-items: flex-start;">
                    <div style="flex: 1;">
                      <div class="item-details">
                        <strong>目标集装箱：</strong>集装箱 ${step.containerIndex + 1} (${container.name})<br>
                        <strong>货物尺寸：</strong>长${processedCargo?.cargo.length}, 宽${processedCargo?.cargo.width}, 高${processedCargo?.cargo.height}<br>
                        <strong>放置坐标：</strong>X: ${step.position.x}, Y: ${step.position.y}, Z: ${step.position.z}<br>
                        <strong>操作说明：</strong>${step.description}
                      </div>
                    </div>
                    <div style="flex: 0 0 300px;">
                      ${generatePositionSVG()}
                    </div>
                  </div>
                </div>
              `;
            }).join('')}
          </div>
        </body>
        </html>
      `;
    };

    // 创建新窗口进行打印
    const printWindow = window.open('', '_blank', 'width=800,height=600');
    if (!printWindow) {
      alert('无法打开打印窗口，请检查浏览器弹窗设置');
      return;
    }

    // 写入HTML内容
    printWindow.document.write(generatePrintHTML());
    printWindow.document.close();

    // 等待内容加载完成后打印
    printWindow.onload = () => {
      setTimeout(() => {
        printWindow.focus();
        printWindow.print();
      }, 500);
    };
  };

  if (!solution) {
    return (
      <Modal
        title={
          <div style={{ 
            display: 'flex', 
            alignItems: 'center',
            fontSize: '18px',
            fontWeight: 'bold',
            color: '#1890ff'
          }}>
            <FileTextOutlined style={{ marginRight: 8 }} />
            装箱方案报告
          </div>
        }
        open={visible}
        onCancel={onCancel}
        footer={[
          <Button key="print" type="primary" icon={<PrinterOutlined />} onClick={handlePrint}>
            打印报告
          </Button>,
          <Button key="close" onClick={onCancel}>
            关闭
          </Button>
        ]}
        width="95vw"
        style={{ top: 20 }}
        bodyStyle={{ 
          height: '85vh', 
          overflowY: 'auto',
          padding: '24px',
          backgroundColor: '#fafafa'
        }}
      >
        <div style={{ 
          textAlign: 'center', 
          padding: '60px 0',
          backgroundColor: '#fff',
          borderRadius: '8px',
          border: '1px solid #f0f0f0'
        }}>
          <ExclamationCircleOutlined style={{ fontSize: '48px', color: '#faad14', marginBottom: '16px' }} />
          <div>
            <Text type="secondary" style={{ fontSize: '16px' }}>暂无装箱方案数据</Text>
          </div>
        </div>
      </Modal>
    );
  }

  const { packingResult, originalCargos, packingSteps, summary } = solution;

  // 货物明细表格列定义
  const cargoColumns = [
    {
      title: '序号',
      key: 'index',
      width: 60,
      align: 'center' as const,
      render: (_: any, __: any, index: number) => (
        <Badge count={index + 1} style={{ backgroundColor: '#1890ff' }} />
      )
    },
    {
      title: '货物名称',
      dataIndex: 'name',
      key: 'name',
      align: 'center' as const,
      width: 120,
      render: (text: string, record: Cargo) => (
        <Space>
          <Tag color={record.color || 'blue'} style={{ fontWeight: 'bold' }}>{text}</Tag>
        </Space>
      )
    },
    {
      title: '尺寸规格',
      key: 'dimensions',
      width: 140,
      align: 'center' as const,
      render: (record: Cargo) => (
        <div style={{ textAlign: 'center' }}>
          <Text code style={{ fontSize: '12px', backgroundColor: '#f6f8fa' }}>
            {record.length}×{record.width}×{record.height}m
          </Text>
        </div>
      )
    },
    {
      title: '重量',
      dataIndex: 'weight',
      key: 'weight',
      width: 100,
      align: 'center' as const,
      render: (weight: number) => (
        <Text strong style={{ color: '#1890ff' }}>
          {weight.toLocaleString()} kg
        </Text>
      )
    },
    {
      title: '数量',
      dataIndex: 'quantity',
      key: 'quantity',
      width: 80,
      align: 'center' as const,
      render: (quantity: number) => (
        <Badge count={quantity} style={{ backgroundColor: '#52c41a' }} />
      )
    },
    {
      title: '总体积',
      key: 'volume',
      width: 100,
      align: 'center' as const,
      render: (record: Cargo) => {
        const volume = record.length * record.width * record.height * record.quantity;
        return (
          <Text strong style={{ color: '#722ed1' }}>
            {volume.toFixed(3)} m³
          </Text>
        );
      }
    },
    {
      title: '装载状态',
      key: 'status',
      width: 100,
      align: 'center' as const,
      render: (record: Cargo) => {
        const isLoaded = packingResult.packedItems.some(item => item.cargo.id === record.id);
        return (
          <Tag 
            icon={isLoaded ? <CheckCircleOutlined /> : <ExclamationCircleOutlined />}
            color={isLoaded ? 'success' : 'error'}
            style={{ fontWeight: 'bold' }}
          >
            {isLoaded ? '已装载' : '未装载'}
          </Tag>
        );
      }
    }
  ];

  // 集装箱明细表格列定义
  const containerColumns = [
    {
      title: '集装箱编号',
      key: 'index',
      width: 120,
      align: 'center' as const,
      render: (_: any, __: any, index: number) => (
        <Tag color="blue" icon={<ContainerOutlined />} style={{ fontWeight: 'bold' }}>
          集装箱 {index + 1}
        </Tag>
      )
    },
    {
      title: '容器类型',
      dataIndex: 'name',
      key: 'name',
      align: 'center' as const,
      width: 120,
      render: (name: string) => (
        <Text strong style={{ color: '#1890ff' }}>{name}</Text>
      )
    },
    {
      title: '容器规格',
      key: 'dimensions',
      align: 'center' as const,
      width: 140,
      render: (record: any) => (
        <div style={{ textAlign: 'center' }}>
          <Text code style={{ fontSize: '12px', backgroundColor: '#f6f8fa' }}>
            {record.length}×{record.width}×{record.height}m
          </Text>
        </div>
      )
    },
    {
      title: '最大载重',
      dataIndex: 'maxWeight',
      key: 'maxWeight',
      width: 120,
      align: 'center' as const,
      render: (weight: number) => (
        <div style={{ textAlign: 'right' }}>
          <Text strong style={{ color: '#fa8c16' }}>
            {weight.toLocaleString()} kg
          </Text>
        </div>
      )
    },
    {
      title: '使用成本',
      dataIndex: 'cost',
      key: 'cost',
      width: 120,
      align: 'center' as const,
      render: (cost: number) => (
        <div style={{ textAlign: 'right' }}>
          <Text strong style={{ color: '#fa8c16' }}>
            ¥ {cost.toLocaleString()}
          </Text>
        </div>
      )
    },
    {
      title: '装载情况',
      key: 'loadedCount',
      width: 120,
      align: 'center' as const,
      render: (_: any, record: any, index: number) => {
        const count = packingResult.packedItems.filter(item => item.containerIndex === index).length;
        const maxCapacity = Math.floor((record.length * record.width * record.height) / 0.5); // 假设平均每件货物0.5m³
        
        return (
            <div style={{ marginTop: '4px' }}>
              <Badge count={count} style={{ backgroundColor: '#52c41a' }} />
            </div>
        );
      }
    }
  ];

  return (
    <Modal
      title={
        <div style={{ 
          display: 'flex', 
          alignItems: 'center',
          fontSize: '20px',
          fontWeight: 'bold',
          color: '#1890ff',
          padding: '8px 0'
        }}>
          <FileTextOutlined style={{ marginRight: 12, fontSize: '24px' }} />
          <div>
            <div>最终装箱方案报告</div>
            <div style={{ fontSize: '12px', color: '#666', fontWeight: 'normal', marginTop: '2px' }}>
              Container Loading Solution Report
            </div>
          </div>
        </div>
      }
      open={visible}
      onCancel={onCancel}
      footer={[
        <Button key="print" type="primary" icon={<PrinterOutlined />} onClick={handlePrint}>
          打印报告
        </Button>,
        <Button key="close" onClick={onCancel}>
          关闭
        </Button>
      ]}
      width="95vw"
      style={{ top: 20 }}
      bodyStyle={{ 
        height: '85vh', 
        overflowY: 'auto',
        padding: '24px',
        backgroundColor: '#fafafa'
      }}
    >
        {/* 报告头部信息 */}
      <div style={{ 
        backgroundColor: '#fff', 
        padding: '24px', 
        borderRadius: '8px', 
        marginBottom: '24px',
        border: '1px solid #e8e8e8',
        boxShadow: '0 2px 8px rgba(0,0,0,0.06)'
      }}>
        <div style={{ 
          textAlign: 'center', 
          marginBottom: '24px',
          borderBottom: '2px solid #f0f0f0',
          paddingBottom: '16px'
        }}>
          <Title level={2} style={{ margin: 0, color: '#1890ff' }}>
            <BarChartOutlined style={{ marginRight: '8px' }} />
            方案执行概览
          </Title>
          <Text type="secondary" style={{ fontSize: '14px' }}>
            Solution Performance Overview
          </Text>
        </div>
        
        <Row gutter={[24, 16]}>
          <Col span={6}>
            <Card 
              size="small" 
              style={{ 
                textAlign: 'center',
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                border: 'none',
                color: 'white'
              }}
              bodyStyle={{ padding: '16px' }}
            >
              <Statistic
                title={<span style={{ color: 'white', fontSize: '12px' }}>使用集装箱</span>}
                value={summary.totalContainers}
                prefix={<ContainerOutlined style={{ color: 'white' }} />}
                suffix={<span style={{ color: 'white' }}>个</span>}
                valueStyle={{ color: 'white', fontSize: '24px', fontWeight: 'bold' }}
              />
            </Card>
          </Col>
          <Col span={6}>
            <Card 
              size="small" 
              style={{ 
                textAlign: 'center',
                background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
                border: 'none',
                color: 'white'
              }}
              bodyStyle={{ padding: '16px' }}
            >
              <Statistic
                title={<span style={{ color: 'white', fontSize: '12px' }}>空间利用率</span>}
                value={summary.utilizationRate}
                precision={1}
                prefix={<PercentageOutlined style={{ color: 'white' }} />}
                suffix={<span style={{ color: 'white' }}>%</span>}
                valueStyle={{ color: 'white', fontSize: '24px', fontWeight: 'bold' }}
              />
            </Card>
          </Col>
          <Col span={6}>
            <Card 
              size="small" 
              style={{ 
                textAlign: 'center',
                background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
                border: 'none',
                color: 'white'
              }}
              bodyStyle={{ padding: '16px' }}
            >
              <Statistic
                title={<span style={{ color: 'white', fontSize: '12px' }}>总运输成本</span>}
                value={summary.totalCost}
                prefix={<DollarOutlined style={{ color: 'white' }} />}
                suffix={<span style={{ color: 'white' }}>¥</span>}
                valueStyle={{ color: 'white', fontSize: '24px', fontWeight: 'bold' }}
              />
            </Card>
          </Col>
          <Col span={6}>
            <Card 
              size="small" 
              style={{ 
                textAlign: 'center',
                background: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
                border: 'none',
                color: 'white'
              }}
              bodyStyle={{ padding: '16px' }}
            >
              <Statistic
                title={<span style={{ color: 'white', fontSize: '12px' }}>货物装载</span>}
                value={`${summary.packedCargos}/${summary.totalCargos}`}
                prefix={<BoxPlotOutlined style={{ color: 'white' }} />}
                suffix={<span style={{ color: 'white' }}>件</span>}
                valueStyle={{ color: 'white', fontSize: '20px', fontWeight: 'bold' }}
              />
            </Card>
          </Col>
        </Row>
      </div>

      {/* 基本信息 */}
      <Card 
        style={{ 
          marginBottom: '24px',
          backgroundColor: '#fff',
          border: '1px solid #e8e8e8',
          boxShadow: '0 2px 8px rgba(0,0,0,0.06)'
        }}
        title={
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <ClockCircleOutlined style={{ marginRight: '8px', color: '#1890ff' }} />
            <span style={{ fontSize: '16px', fontWeight: 'bold' }}>方案基本信息</span>
            <span style={{ fontSize: '12px', color: '#666', marginLeft: '8px' }}>Basic Information</span>
          </div>
        }
      >
        <Descriptions
          bordered
          size="middle"
          column={3}
          labelStyle={{ backgroundColor: '#fafafa', fontWeight: 'bold', width: '120px' }}
          contentStyle={{ backgroundColor: '#fff' }}
        >
          <Descriptions.Item label="方案ID">
            <Text code style={{ color: '#1890ff' }}>{solution.id}</Text>
          </Descriptions.Item>
          <Descriptions.Item label="生成时间">
            <Text strong>{new Date(solution.timestamp).toLocaleString()}</Text>
          </Descriptions.Item>
          <Descriptions.Item label="装箱算法">
            <Tag color="processing">{packingResult.algorithm}</Tag>
          </Descriptions.Item>
          <Descriptions.Item label="装箱模式">
            <Tag color="success">{packingResult.mode}</Tag>
          </Descriptions.Item>
          <Descriptions.Item label="执行时间">
            <Text strong style={{ color: '#52c41a' }}>
              {packingResult.executionTime ? `${packingResult.executionTime}ms` : '未记录'}
            </Text>
          </Descriptions.Item>
          <Descriptions.Item label="迭代次数">
            <Badge count={packingResult.iterations || 0} style={{ backgroundColor: '#722ed1' }} />
          </Descriptions.Item>
          {summary.spaceOccupancyRate && (
            <Descriptions.Item label="空间占用率" span={3}>
              <Progress 
                percent={summary.spaceOccupancyRate} 
                strokeColor={{
                  '0%': '#108ee9',
                  '100%': '#87d068',
                }}
                format={(percent) => `${percent?.toFixed(1)}%`}
              />
            </Descriptions.Item>
          )}
        </Descriptions>
      </Card>

      {/* 货物明细 */}
      <Card 
        style={{ 
          marginBottom: '24px',
          backgroundColor: '#fff',
          border: '1px solid #e8e8e8',
          boxShadow: '0 2px 8px rgba(0,0,0,0.06)'
        }}
        title={
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <BoxPlotOutlined style={{ marginRight: '8px', color: '#1890ff' }} />
            <span style={{ fontSize: '16px', fontWeight: 'bold' }}>货物清单明细</span>
            <span style={{ fontSize: '12px', color: '#666', marginLeft: '8px' }}>Cargo Details</span>
          </div>
        }
      >
        <Table
          columns={cargoColumns}
          dataSource={originalCargos}
          rowKey="id"
          size="middle"
          pagination={false}
          scroll={{ y: 300 }}
          bordered
          style={{ 
            backgroundColor: '#fff',
            borderRadius: '6px'
          }}
        />
      </Card>

      {/* 集装箱明细 */}
      <Card 
        style={{ 
          marginBottom: '24px',
          backgroundColor: '#fff',
          border: '1px solid #e8e8e8',
          boxShadow: '0 2px 8px rgba(0,0,0,0.06)'
        }}
        title={
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <ContainerOutlined style={{ marginRight: '8px', color: '#1890ff' }} />
            <span style={{ fontSize: '16px', fontWeight: 'bold' }}>集装箱配置明细</span>
            <span style={{ fontSize: '12px', color: '#666', marginLeft: '8px' }}>Container Configuration</span>
          </div>
        }
      >
        <Table
          columns={containerColumns}
          dataSource={packingResult.containers}
          rowKey={(record, index) => `container-${index}`}
          size="middle"
          pagination={false}
          bordered
          style={{ 
            backgroundColor: '#fff',
            borderRadius: '6px'
          }}
        />
      </Card>

      {/* 装箱步骤明细 - 卡片形式 */}
      <Card 
        style={{ 
          marginBottom: '24px',
          backgroundColor: '#fff',
          border: '1px solid #e8e8e8',
          boxShadow: '0 2px 8px rgba(0,0,0,0.06)'
        }}
        title={
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <CheckCircleOutlined style={{ marginRight: '8px', color: '#1890ff' }} />
              <span style={{ fontSize: '16px', fontWeight: 'bold' }}>装箱操作步骤</span>
              <span style={{ fontSize: '12px', color: '#666', marginLeft: '8px' }}>Packing Process Steps</span>
            </div>
            <Text strong style={{ color: '#1890ff' }}>
              共 {packingSteps.length} 个装箱步骤
            </Text>
          </div>
        }
      >
        <div style={{ 
          padding: '8px 0'
        }}>
          <Row gutter={[16, 16]}>
            {packingSteps.map((step, index) => {
              const container = packingResult.containers[step.containerIndex];
              // 根据 cargoId 查找货物信息
              const cargo = solution.originalCargos.find(c => c.id === step.cargoId);
              // 查找处理后的货物信息（包含放倒状态）
              const processedCargo = packingResult.packedItems?.find(c => c.cargo.id === step.cargoId);
              // 根据集装箱索引决定颜色，确保相同集装箱的步骤颜色一致
              const containerColorIndex = step.containerIndex % 2;
              return (
                <Col span={24} key={step.stepNumber}>
                  <Card
                    size="small"
                    style={{
                      background: `linear-gradient(135deg, ${containerColorIndex === 0 ? '#f8fafc' : '#fefbf3'} 0%, ${containerColorIndex === 0 ? '#f1f5f9' : '#fef3e2'} 100%)`,
                      border: `1px solid ${containerColorIndex === 0 ? '#e2e8f0' : '#fed7aa'}`,
                      borderRadius: '12px',
                      transition: 'all 0.3s ease',
                      cursor: 'pointer',
                      boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
                      marginBottom: '16px'
                    }}
                    hoverable
                    bodyStyle={{ padding: '20px' }}
                  >
                    {/* 主要内容区域 - 左右布局 */}
                    <Row gutter={[24, 16]}>
                      {/* 左侧：文字信息 */}
                      <Col span={14}>
                        {/* 步骤头部 */}
                        <div style={{ 
                          display: 'flex', 
                          alignItems: 'center', 
                          justifyContent: 'space-between',
                          marginBottom: '16px',
                          paddingBottom: '12px',
                          borderBottom: `2px solid ${containerColorIndex === 0 ? '#e2e8f0' : '#fed7aa'}`
                        }}>
                          <div style={{ display: 'flex', alignItems: 'center' }}>
                            <Badge 
                              count={step.stepNumber} 
                              style={{ 
                                backgroundColor: containerColorIndex === 0 ? '#3b82f6' : '#f59e0b',
                                fontSize: '14px',
                                fontWeight: 'bold',
                                minWidth: '28px',
                                height: '28px',
                                lineHeight: '28px'
                              }} 
                            />
                            <Text strong style={{ 
                              marginLeft: '12px', 
                              color: containerColorIndex === 0 ? '#1e40af' : '#92400e',
                              fontSize: '16px'
                            }}>
                              步骤 {step.stepNumber}
                            </Text>
                          </div>
                          <Tag 
                            color={containerColorIndex === 0 ? 'blue' : 'orange'} 
                            icon={<ContainerOutlined />}
                            style={{ fontWeight: 'bold', fontSize: '12px', padding: '4px 8px' }}
                          >
                            集装箱 {step.containerIndex + 1}
                          </Tag>
                        </div>

                        {/* 货物信息 */}
                        <div style={{ marginBottom: '16px' }}>
                          <div style={{ 
                            display: 'flex', 
                            alignItems: 'center', 
                            marginBottom: '8px',
                            padding: '12px',
                            backgroundColor: 'rgba(255,255,255,0.8)',
                            borderRadius: '8px',
                            border: '1px solid rgba(0,0,0,0.06)'
                          }}>
                            <BoxPlotOutlined style={{ 
                              color: containerColorIndex === 0 ? '#3b82f6' : '#f59e0b', 
                              marginRight: '8px',
                              fontSize: '16px'
                            }} />
                            <Text strong style={{ fontSize: '14px', marginRight: '8px' }}>货物名称：</Text>
                            <Tag color="geekblue" style={{ 
                              fontWeight: 'bold',
                              fontSize: '13px',
                              padding: '4px 12px'
                            }}>
                              {step.cargoName}
                            </Tag>
                            {processedCargo?.cargo.isRotated && (
                              <Tag color="orange" style={{ 
                                fontWeight: 'bold',
                                fontSize: '11px',
                                padding: '2px 8px',
                                marginLeft: '8px'
                              }}>
                                已放倒
                              </Tag>
                            )}
                          </div>
                        </div>

                        {/* 集装箱信息 */}
                        <div style={{ 
                          backgroundColor: 'rgba(255,255,255,0.8)', 
                          padding: '12px', 
                          borderRadius: '8px',
                          marginBottom: '16px',
                          border: '1px solid rgba(0,0,0,0.06)'
                        }}>
                          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
                            <ContainerOutlined style={{ 
                              color: containerColorIndex === 0 ? '#3b82f6' : '#f59e0b', 
                              marginRight: '8px',
                              fontSize: '16px'
                            }} />
                            <Text strong style={{ fontSize: '14px', marginRight: '8px' }}>集装箱类型：</Text>
                            <Text style={{ fontSize: '14px', fontWeight: 'bold', color: '#374151' }}>
                              {container.name}
                            </Text>
                          </div>
                          <div style={{ display: 'flex', alignItems: 'center' }}>
                            <Text style={{ fontSize: '12px', color: '#6b7280', marginRight: '8px' }}>尺寸：</Text>
                            <div style={{ display: 'flex', gap: '6px' }}>
                              <Text code style={{ 
                                fontSize: '11px', 
                                backgroundColor: '#fef2f2', 
                                padding: '4px 8px',
                                color: '#dc2626',
                                border: '1px solid #fecaca',
                                borderRadius: '4px'
                              }}>
                                L: {container.length}m
                              </Text>
                              <Text code style={{ 
                                fontSize: '11px', 
                                backgroundColor: '#f0fdf4', 
                                padding: '4px 8px',
                                color: '#16a34a',
                                border: '1px solid #bbf7d0',
                                borderRadius: '4px'
                              }}>
                                W: {container.width}m
                              </Text>
                              <Text code style={{ 
                                fontSize: '11px', 
                                backgroundColor: '#eff6ff', 
                                padding: '4px 8px',
                                color: '#2563eb',
                                border: '1px solid #bfdbfe',
                                borderRadius: '4px'
                              }}>
                                H: {container.isFrameContainer ? '∞' : container.height + 'm'}
                              </Text>
                            </div>
                          </div>
                        </div>

                        {/* 放置坐标 */}
                        <div style={{ 
                          backgroundColor: 'rgba(255,255,255,0.8)', 
                          padding: '12px', 
                          borderRadius: '8px',
                          border: '1px solid rgba(0,0,0,0.06)'
                        }}>
                          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
                            <Text strong style={{ fontSize: '14px' }}>放置坐标：</Text>
                          </div>
                          <div style={{ display: 'flex', gap: '8px' }}>
                            <Text code style={{ 
                              fontSize: '12px', 
                              backgroundColor: '#fef2f2', 
                              padding: '6px 12px',
                              border: '1px solid #fecaca',
                              borderRadius: '6px',
                              color: '#dc2626',
                              fontWeight: 'bold'
                            }}>
                              X: {step.position.x}
                            </Text>
                            <Text code style={{ 
                              fontSize: '12px', 
                              backgroundColor: '#f0fdf4', 
                              padding: '6px 12px',
                              border: '1px solid #bbf7d0',
                              borderRadius: '6px',
                              color: '#16a34a',
                              fontWeight: 'bold'
                            }}>
                              Y: {step.position.y}
                            </Text>
                            <Text code style={{ 
                              fontSize: '12px', 
                              backgroundColor: '#eff6ff', 
                              padding: '6px 12px',
                              border: '1px solid #bfdbfe',
                              borderRadius: '6px',
                              color: '#2563eb',
                              fontWeight: 'bold'
                            }}>
                              Z: {step.position.z}
                            </Text>
                          </div>
                        </div>
                      </Col>

                      {/* 右侧：位置示意图 */}
                      <Col span={10}>
                        <div style={{ 
                          height: '100%',
                          display: 'flex',
                          flexDirection: 'column',
                          justifyContent: 'center'
                        }}>
                          <div style={{ 
                            marginBottom: '12px',
                            textAlign: 'center'
                          }}>
                            <Text strong style={{ 
                              fontSize: '14px', 
                              color: '#374151',
                              display: 'block',
                              marginBottom: '8px'
                            }}>
                              位置示意图
                            </Text>
                          </div>
                          {cargo && processedCargo && (
                            <div style={{ 
                              backgroundColor: 'rgba(255,255,255,0.9)',
                              borderRadius: '8px',
                              padding: '8px',
                              border: '1px solid rgba(0,0,0,0.06)'
                            }}>
                              <PositionVisualization
                                containerLength={container.length}
                                containerWidth={container.width}
                                containerHeight={container.height}
                                cargoPosition={step.position}
                                cargoSize={{
                                  length: processedCargo.cargo.length,
                                  width: processedCargo.cargo.width,
                                  height: processedCargo.cargo.height
                                }}
                                isFrameContainer={container.isFrameContainer}
                                cargoColor={cargo.color || '#1890ff'}
                              />
                            </div>
                          )}
                        </div>
                      </Col>
                    </Row>

                    {/* 底部：操作说明 */}
                    <div style={{ 
                      marginTop: '16px',
                      padding: '12px',
                      backgroundColor: 'rgba(255,255,255,0.6)',
                      borderRadius: '8px',
                      border: '1px solid rgba(0,0,0,0.06)',
                      borderTop: `2px solid ${containerColorIndex === 0 ? '#e2e8f0' : '#fed7aa'}`
                    }}>
                      <Text style={{ 
                        fontSize: '12px', 
                        color: '#6b7280',
                        lineHeight: '1.5',
                        display: 'block',
                        fontStyle: 'italic'
                      }}>
                        💡 {step.description}
                      </Text>
                    </div>
                  </Card>
                </Col>
              );
            })}
          </Row>
        </div>
      </Card>
    </Modal>
  );
};