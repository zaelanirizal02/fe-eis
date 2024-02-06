<template>
    <div>
        <apexchart type="line" :options="chartOptions" :series="chartSeries" />
    </div>
</template>

<script>
export default {
    data() {
        return {
            chartOptions: {
                chart: {
                    id: 'basic-line'
                },
                xaxis: {
                    categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
                }
            },
            chartSeries: [{
                name: 'Series A',
                data: [30, 40, 35, 50, 49, 60, 70, 91, 125]
            }]
        };
    }
};
</script>
