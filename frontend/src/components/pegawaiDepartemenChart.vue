<template>
    <div class="justify-content-center custom-chart-bar">
        <Chart :type="chartType" :data="chartData" :options="chartOptions" :plugins="chartPlugins" />
    </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { fetchDataDepartemenChart } from '../controller/filter-controller.js';
import Chart from 'primevue/chart';
import ChartDataLabels from 'chartjs-plugin-datalabels';
// import '../views/employes/style.css';

export default {
    components: {
        Chart,
    },
    setup() {
        const chartData = ref({
            labels: [],
            datasets: [
                {
                    data: [],
                    backgroundColor: [],
                    hoverBackgroundColor: [],
                },
            ],
        });

        const chartType = 'bar';

        const chartOptions = ref({
            plugins: {
                legend: {
                    display: false,
                    position: 'bottom',
                    labels: {
                        font: {
                            weight: 'bold',
                            size: 20
                        }
                    },
                },
                datalabels: {
                    color: 'white',
                    labels: {
                        title: {
                            font: {
                                weight: 'bold',
                                size: 20,
                            },
                            text: {
                                font: {
                                    size: 15,
                                },
                            },
                        },
                    },
                },
            },
        });

        const chartPlugins = [ChartDataLabels];

        onMounted(() => {
            fetchDataDepartemenChart().then(data => {
                chartData.value = data;
            }).catch(error => {
                console.error('Error fetching data:', error);
            });
        });

        return {
            chartData,
            chartType,
            chartOptions,
            chartPlugins
        };
    },
};

</script>
