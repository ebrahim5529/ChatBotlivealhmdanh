import ReactECharts from 'echarts-for-react';

const CHART_COLORS = {
    primary: '#0EA5A4',
};

const growthData = [
    { month: 'أغسطس', count: 5 },
    { month: 'سبتمبر', count: 13 },
    { month: 'أكتوبر', count: 25 },
    { month: 'نوفمبر', count: 40 },
    { month: 'ديسمبر', count: 60 },
    { month: 'يناير', count: 85 },
];

const option = {
    tooltip: {
        trigger: 'axis',
    },
    xAxis: {
        type: 'category',
        data: growthData.map((d) => d.month),
        axisLabel: { fontSize: 12 },
    },
    yAxis: {
        type: 'value',
        axisLabel: { fontSize: 12 },
    },
    series: [
        {
            name: 'تراكمي',
            type: 'line',
            data: growthData.map((d) => d.count),
            smooth: true,
            itemStyle: { color: CHART_COLORS.primary },
            areaStyle: {
                color: {
                    type: 'linear',
                    x: 0,
                    y: 0,
                    x2: 0,
                    y2: 1,
                    colorStops: [
                        { offset: 0, color: 'rgba(14, 165, 164, 0.4)' },
                        { offset: 1, color: 'rgba(14, 165, 164, 0.05)' },
                    ],
                },
            },
        },
    ],
    grid: { left: '3%', right: '4%', bottom: '3%', top: '10%', containLabel: true },
};

export function TicketGrowthChart() {
    return (
        <div className="h-[300px] w-full">
            <ReactECharts option={option} style={{ height: '100%', width: '100%' }} />
        </div>
    );
}
