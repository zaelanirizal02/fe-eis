<template>
    <div class="justify-content-center custom-chart-jabatan" ref="chartContainer">
        <Chart type="bar" :data="chartData" :options="chartOptions" :plugins="plugins" />
    </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { hrisServiceHr1Mod1, token } from "../api/index";
import ChartDataLabels from 'chartjs-plugin-datalabels';
// import Chart from 'primevue/chart';

const plugins = [ChartDataLabels];
const chartData = ref(null);
const chartOptions = ref(null);
const chart = (null);

onMounted(async () => {
    await fetchDataFromApi();
});


const fetchDataFromApi = async () => {
    try {
        const response = await hrisServiceHr1Mod1.get(
            "registrasiPegawai/findJumlahPegawaiFilterJabatan",
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

        // Menghasilkan warna secara dinamis
        const dynamicColors = (count) => {
            const colors = [];
            for (let i = 0; i < count; i++) {
                colors.push(`rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)})`);
            }
            return colors;
        };

        // Perbarui data chart

        chartData.value.datasets[0].backgroundColor = dynamicColors(data.length);

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
                backgroundColor: ['rgb(103, 101, 164)'],
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
                display: false,
                position: 'left',
                labels: {
                    font: {
                        weight: 'bold',
                        size: '14'
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
                    },
                },
            },
        },

        // height: 300
    };
};


const createChart = () => {
    chart.value = new Chart($refs.chartContainer, {
        type: "bar",
        data: chartData.value,
        options: chartOptions.value,
        plugins: plugins,
    });
};


</script>
