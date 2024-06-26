<template>
    <div class="justify-content-center custom-chart " ref="chartContainer">
        <Chart type="pie" :data="chartData" :options="chartOptions" :plugins="plugins" />
    </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue";
import { hrisServiceHr1Mod1, token } from "../api/index";
import ChartDataLabels from 'chartjs-plugin-datalabels';
// import Chart from 'primevue/chart';

const plugins = [ChartDataLabels];
const chartData = ref(null);
const chartOptions = ref(null);
const chart = ref(null);
const chartContainer = ref(null);

onMounted(async () => {
    await fetchDataFromApi();
    window.addEventListener('resize', resizeChart);
});

onBeforeUnmount(() => {
    window.removeEventListener('resize', resizeChart);
});

const fetchDataFromApi = async () => {
    try {
        const response = await hrisServiceHr1Mod1.get(
            "registrasiPegawai/findJumlahPegawaiFilterKategory",
            {
                headers: {
                    "x-auth-token": `${token}`,
                },
            }
        );
        const data = response.data.data.jumlahPegawaiFilter;

        chartData.value = setChartData(data);
        chartOptions.value = setChartOptions();
        // createChart();
    } catch (error) {
        console.error("Error fetching data", error);
    }
};

const setChartData = (data) => {
    const labels = data.map((item) => `${item.nama} - ${item.jumlah}`);
    const seriesData = data.map((item) => item.jumlah);
    const documentStyle = getComputedStyle(document.body);

    return {
        labels: labels,
        datasets: [
            {
                data: seriesData,
                backgroundColor: [documentStyle.getPropertyValue('--cyan-500'), documentStyle.getPropertyValue('--orange-500'), documentStyle.getPropertyValue('--gray-500')],
                hoverBackgroundColor: [documentStyle.getPropertyValue('--cyan-400'), documentStyle.getPropertyValue('--orange-400'), documentStyle.getPropertyValue('--gray-400')]
            },
        ],
    };
};

const setChartOptions = () => {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue("--text-color");

    return {
        plugins: {
            legend: {
                display: true,
                position: 'left',
                labels: {
                    cutout: "60%",
                    color: textColor,
                    font: {
                        weight: 'bold',
                        size: '10'
                    }
                },
            },
            datalabels: {
                color: 'white',
                labels: {
                    title: {
                        font: {
                            weight: 'bold',
                            size: 12,
                        },
                    },
                },
            },
        },
    };
};

const createChart = () => {
    chart.value = new Chart(chartContainer.value, {
        type: "doughnut",
        data: chartData.value,
        options: chartOptions.value,
        plugins: plugins,
    });
};

const resizeChart = () => {
    if (chart.value) {
        chart.value.destroy();
        createChart();
    }
};
</script>
