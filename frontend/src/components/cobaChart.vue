<template>
    <div class="justify-content-center custom-chart">
        <Chart type="doughnut" :data="chartData" :options="lightOptions" :plugins="plugins" />
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import Chart from 'primevue/chart';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { hrisServiceHr1Mod1, token } from '../api/index';
import '../views/employes/style.css';

const plugins = [ChartDataLabels];
const chartData = ref({
    labels: [],
    datasets: [
        {
            // label: ['Pendidikan Terakhir'],
            data: [],
            backgroundColor: ['rgb(103, 101, 164)'],
            hoverBackgroundColor: ['rgb(64, 27, 27)'],
        },
    ],
});
const lightOptions = ref({
    plugins: {
        legend: {
            display: false,
            position: 'bottom',
            labels: {
                // cutout: "40%",
                // color: textColor,
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
                            size: 15, // Ukuran font untuk teks "SD", "SLTA", "SLTP"
                        },
                    },
                },

            },
        },
    },

});

onMounted(async () => {
    await fetchDataFromApi();
});

const fetchDataFromApi = async () => {
    try {
        const response = await hrisServiceHr1Mod1.get(
            'registrasiPegawai/findJumlahPegawaiFilterStatusPajak',
            {
                headers: {
                    'x-auth-token': `${token}`,
                },
            }
        );
        const data = response.data.data;

        // Ekstraksi data untuk chart
        const labels = data.map((item) => item.statusPTKP);
        const seriesData = data.map((item) => item.jumlah);
        const label = data.map((item) => item.statusPTKP);

        // Menghasilkan warna secara dinamis
        const dynamicColors = (count) => {
            const colors = [];
            for (let i = 0; i < count; i++) {
                colors.push(`rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)})`);
            }
            return colors;
        };
        // Perbarui data chart
        chartData.value.labels = labels;
        chartData.value.datasets[0].data = label;
        chartData.value.datasets[0].data = seriesData;
        chartData.value.datasets[0].backgroundColor = dynamicColors(labels.length);

    } catch (error) {
        console.error('Error Fetching Data Pendidikan Terakhir', error);
    }
};
</script>
