import ReactECharts from 'echarts-for-react';

const CHART_COLORS = {
    primary: '#0EA5A4',
};

const ticketReportData = [
    { month: 'أغسطس', count: 5 },
    { month: 'سبتمبر', count: 8 },
    { month: 'أكتوبر', count: 12 },
    { month: 'نوفمبر', count: 15 },
    { month: 'ديسمبر', count: 20 },
    { month: 'يناير', count: 25 },
];

const option = {
    tooltip: {
        trigger: 'axis',
    },
    xAxis: {
        type: 'category',
        data: ticketReportData.map((d) => d.month),
        axisLabel: { fontSize: 12 },
    },
    yAxis: {
        type: 'value',
        axisLabel: { fontSize: 12 },
    },
    series: [
        {
            name: 'التذاكر',
            type: 'bar',
            data: ticketReportData.map((d) => d.count),
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

export function TicketReportChart() {
    return (
        <div className="h-[300px] w-full">
            <ReactECharts option={option} style={{ height: '100%', width: '100%' }} />
        </div>
    );
}
