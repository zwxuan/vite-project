
import React, { useEffect, useRef } from 'react';
import { Chart } from '@antv/g2';

interface ChartProps {
    data: any[];
    height?: number;
}

export const TrendChart: React.FC<ChartProps> = ({ data, height = 300 }) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const chartRef = useRef<Chart | null>(null);

    useEffect(() => {
        if (!containerRef.current) return;

        const chart = new Chart({
            container: containerRef.current,
            autoFit: true,
            height: height,
        });

        chartRef.current = chart;

        // Dual axis chart: Compliance Rate (Line) and Missing Count (Interval)
        chart.data(data);

        chart
            .interval()
            .encode('x', 'date')
            .encode('y', 'missingCount')
            .encode('color', '#FF6B3B')
            .axis('y', { title: 'Missing Count', titleFill: '#FF6B3B' });

        chart
            .line()
            .encode('x', 'date')
            .encode('y', 'complianceRate')
            .encode('color', '#33D1C1')
            .scale('y', { domain: [0, 100] })
            .style('lineWidth', 2)
            .axis('y', { position: 'right', title: 'Compliance Rate (%)', titleFill: '#33D1C1', grid: null });

        chart
            .point()
            .encode('x', 'date')
            .encode('y', 'complianceRate')
            .encode('color', '#33D1C1')
            .tooltip(false);

        chart.render();

        return () => {
            chart.destroy();
        };
    }, []);

    useEffect(() => {
        if (chartRef.current) {
            chartRef.current.changeData(data);
        }
    }, [data]);

    return <div ref={containerRef} />;
};

export const ReasonChart: React.FC<ChartProps> = ({ data, height = 300 }) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const chartRef = useRef<Chart | null>(null);

    useEffect(() => {
        if (!containerRef.current) return;

        const chart = new Chart({
            container: containerRef.current,
            autoFit: true,
            height: height,
        });

        chartRef.current = chart;

        chart
            .interval()
            .data(data)
            .encode('x', 'type')
            .encode('y', 'value')
            .encode('color', 'type')
            .coordinate({ type: 'theta', outerRadius: 0.8 })
            .transform({ type: 'stackY' })
            .legend('color', { position: 'right', layout: { justifyContent: 'center' } })
            .label({
                text: 'value',
                position: 'outside',
                fontWeight: 'bold',
            });

        chart.render();

        return () => {
            chart.destroy();
        };
    }, []);

    useEffect(() => {
        if (chartRef.current) {
            chartRef.current.changeData(data);
        }
    }, [data]);

    return <div ref={containerRef} />;
};
