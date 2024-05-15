<template>
    <div class="justify-content-center custom-chart-jabatan">
        <Chart type="bar" :data="chartData" :options="chartOptions" class="h-30rem" :plugins="plugins" />
    </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import ChartDataLabels from 'chartjs-plugin-datalabels';

import { hrisServiceHr1Mod1, token } from '../api/index';

onMounted(() => {
    usiaDanJenisKelamin();
});

const plugins = [ChartDataLabels];
const chartData = ref();
const chartOptions = ref();


async function usiaDanJenisKelamin() {
    try {
        const response = await hrisServiceHr1Mod1.get(
            "dashboardEis/findJumlahPegawaiFilterUsiadanJK",
            {
                headers: {
                    "x-auth-token": `${token}`,
                },
            }
        );
        const data = response.data.data.data;
        // console.log(data)
        chartData.value = setChartData(data);
        chartOptions.value = setChartOptions();


    } catch (error) {
        console.error("error fetching Usia dan JK", error);
    }
}

const setChartData = (data) => {
    const documentStyle = getComputedStyle(document.documentElement);
    const labels = data.map(item => `${item.nama}`);
    const reversedData = data.slice().reverse(); // Reverse the order of the data
    const datasets = [
        {
            label: 'Laki-laki',
            backgroundColor: documentStyle.getPropertyValue('--blue-500'),
            data: data.map(item => item['laki-laki']) // Use reversed data
        },
        {
            label: 'Perempuan',
            backgroundColor: documentStyle.getPropertyValue('--red-500'),
            data: data.map(item => item.perempuan) // Use reversed data
        }
    ];
    return {
        labels: labels.reverse(),
        datasets: datasets
    };
};


const setChartOptions = () => {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');
    const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
    const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

    return {
        indexAxis: 'y',
        maintainAspectRatio: false,
        aspectRatio: 0.8,
        plugins: {
            // tooltip: {
            //     mode: 'index',
            //     intersect: false
            // },
            legend: {
                position: 'top',
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
                            size: 15,
                        },
                    },
                },
            },
        },
        scales: {
            x: {
                ticks: {
                    color: textColorSecondary,
                    font: {
                        weight: 500
                    }
                },
                grid: {
                    display: false,
                    drawBorder: false
                }
            },
            y: {
                ticks: {
                    color: textColorSecondary
                },
                grid: {
                    color: surfaceBorder,
                    drawBorder: false
                }
            }
        }
    };
}

</script>
