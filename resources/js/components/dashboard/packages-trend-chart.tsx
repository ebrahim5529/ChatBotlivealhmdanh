import ReactECharts from 'echarts-for-react';

const CHART_COLORS = {
    primary: '#0EA5A4',
};

export type PackagesPerMonthPoint = {
    month_label: string;
    count: number;
};

type Props = {
    data: PackagesPerMonthPoint[];
};

export function PackagesTrendChart({ data }: Props) {
    const option = {
        tooltip: {
            trigger: 'axis',
        },
        xAxis: {
            type: 'category',
            data: data.map((d) => d.month_label),
            axisLabel: { fontSize: 12 },
        },
        yAxis: {
            type: 'value',
            minInterval: 1,
            axisLabel: { fontSize: 12 },
        },
        series: [
            {
                name: 'العروض',
                type: 'bar',
                data: data.map((d) => d.count),
                itemStyle: {
                    color: {
                        type: 'linear',
                        x: 0,
                        y: 0,
                        x2: 0,
                        y2: 1,
                        colorStops: [
                            { offset: 0, color: CHART_COLORS.primary },
                            { offset: 1, color: CHART_COLORS.primary },
                        ],
                    },
                },
            },
        ],
        grid: { left: '3%', right: '4%', bottom: '3%', top: '10%', containLabel: true },
    };

    return (
        <div className="h-[300px] w-full">
            <ReactECharts option={option} style={{ height: '100%', width: '100%' }} />
        </div>
    );
}
