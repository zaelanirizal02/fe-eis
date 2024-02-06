<template>
    <div class="justify-content-center custom-chart">
        <Chart type="doughnut" :data="chartData" :options="chartOptions" :plugins="plugins" />
    </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { hrisService, token } from "../api/index";
import ChartDataLabels from 'chartjs-plugin-datalabels';

const plugins = [ChartDataLabels];
const chartData = ref(null);
const chartOptions = ref(null);

onMounted(async () => {
    await fetchDataFromApi();
});

const fetchDataFromApi = async () => {
    try {
        const response = await hrisService.get(
            "registrasiPegawai/findJumlahPegawaiFilterJenisKelamin",
            {
                headers: {
                    "x-auth-token": `${token}`,
                },
            }
        );
        const data = response.data.data.jumlahPegawaiFilter;

        chartData.value = setChartData(data);
        chartOptions.value = setChartOptions();
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
                labels: {
                    cutout: "60%",
                    color: textColor,
                },
            },
            datalabels: {
                color: 'white',
                labels: {
                    title: {
                        font: {
                            weight: 'bold',
                            size: 30,
                        },
                    },
                },
            },
        },
    };
}
</script>
