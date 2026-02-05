
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

        chart
            .line()
            .data(data)
            .encode('x', 'date')
            .encode('y', 'count')
            .encode('color', 'type')
            .axis('y', { title: 'Jobs' });

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

export const DistributionChart: React.FC<ChartProps> = ({ data, height = 300 }) => {
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
            .encode('y', 'count')
            .encode('color', 'type')
            .coordinate({ type: 'theta', outerRadius: 0.8 })
            .transform({ type: 'stackY' })
            .legend('color', { position: 'bottom', layout: { justifyContent: 'center' } });

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

export const RankingChart: React.FC<ChartProps> = ({ data, height = 300 }) => {
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
            .encode('x', 'customer')
            .encode('y', 'count')
            .encode('color', 'customer')
            .axis('x', { title: false })
            .axis('y', { title: 'Jobs' });

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
