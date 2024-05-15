<template>
    <div class="justify-content-center custom-chart">
        <Chart type="pie" :data="chartData" :options="lightOptions" :plugins="plugins" />
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import Chart from 'primevue/chart';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { hrisServiceHr1Mod1, token } from '../api/index';
// import '../views/employes/style.css';

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
            display: true,
            position: 'bottom',
            labels: {

                // cutout: "40%",
                // color: textColor,
                font: {
                    weight: '',
                    size: 11
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
                            size: 12, // Ukuran font untuk teks "SD", "SLTA", "SLTP"
                        },
                    },
                },
                // value: {
                //     color: 'green',
                //     font: {
                //         weight: 'bold',
                //         size: 48,
                //     },
                // },
            },
        },
    },
    scales: {
        y: {
            beginAtZero: true,
            ticks: {
                stepSize: 1, // Langkah sumbu y
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
            'pegawaiStatusController/findSemuaStatusPerTanggal?tglAkhir=%201707066000',
            // 'pegawaiStatusController/findSemuaStatusPerRuangan',
            // 'pegawaiStatusController/findSemuaStatus',

            {
                headers: {
                    'x-auth-token': `${token}`,
                },
            }
        );
        const data = response.data.data;
        // console.log(data)

        // Menghitung frekuensi kemunculan setiap nilai dalam item.nama
        const namaCount = {};
        data.forEach((item) => {
            namaCount[item.nama] = (namaCount[item.nama] || 0) + 1;
        });

        // Ekstraksi data untuk chart
        const labels = Object.keys(namaCount); // Mengambil nama unik sebagai label
        const seriesData = Object.values(namaCount); // Mengambil jumlah kemunculan sebagai seriesData

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
        chartData.value.datasets[0].data = seriesData;
        chartData.value.datasets[0].backgroundColor = dynamicColors(labels.length);

    } catch (error) {
        console.error('Error Fetching Pengajuan Harian', error);
    }
};

</script>
