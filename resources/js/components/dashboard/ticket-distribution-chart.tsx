import ReactECharts from 'echarts-for-react';

const CHART_COLORS = ['#0EA5A4', '#3B82F6', '#F59E0B', '#10B981', '#6B7280'];

const distributionData = [
    { value: 12, name: 'المفتوحة' },
    { value: 8, name: 'قيد المعالجة' },
    { value: 20, name: 'المحلولة' },
    { value: 5, name: 'المغلقة' },
];

const option = {
    tooltip: {
        trigger: 'item',
    },
    legend: {
        orient: 'vertical',
        right: 10,
        top: 'center',
    },
    series: [
        {
            name: 'التذاكر',
            type: 'pie',
            radius: ['40%', '70%'],
            center: ['40%', '50%'],
            data: distributionData.map((d, i) => ({
                ...d,
                itemStyle: { color: CHART_COLORS[i] },
            })),
            label: { fontSize: 12 },
        },
    ],
};

export function TicketDistributionChart() {
    return (
        <div className="h-[300px] w-full">
            <ReactECharts option={option} style={{ height: '100%', width: '100%' }} />
        </div>
    );
}
