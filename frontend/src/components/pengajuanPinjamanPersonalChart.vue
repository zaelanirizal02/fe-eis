<template>
    <div class="justify-content-center custom-chart-bar">
        <div style="text-align: center;">
            <!-- <label for="pegawai">Pilih Pegawai:</label> -->
            <select class="buttonChart" v-model="selectedPegawai" @change="filterData" id="pegawai">
                <option class="center" value="">--Pilih Pegawai</option>
                <option v-for="pegawai in pegawaiOptions" :value="pegawai">{{ pegawai }}</option>
            </select>
        </div>
        <Chart type="bar" :data="filteredChartData" :options="lightOptions" :plugins="plugins" />
    </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import Chart from 'primevue/chart';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { hrisServiceHr1Mod1, token } from '../api/index';
// import '../assets/css/buttonStyle.css';

const plugins = [ChartDataLabels];
const pegawaiOptions = ref([]);
const selectedPegawai = ref('');

const chartData = ref({
    labels: [],
    datasets: [
        {
            label: 'Jumlah Pinjaman',
            data: [],
            backgroundColor: ['rgb(103, 101, 164)'],
            hoverBackgroundColor: ['rgb(150, 150, 150)'],
        },
        {
            label: 'Sisa Pinjaman',
            data: [],
            backgroundColor: ['rgb(41, 35, 198)'],
            hoverBackgroundColor: ['rgb(150, 150, 150)'],
        },
    ],
});
const lightOptions = ref({
    plugins: {
        legend: {
            display: true,
        },
        // Your existing options here

        datalabels: {
            color: 'white',

            labels: {
                title: {
                    display: false,

                    font: {
                        weight: 'bold',
                        size: 10,
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


onMounted(async () => {
    await fetchDataFromApi();
});

const fetchDataFromApi = async () => {
    try {
        const response = await hrisServiceHr1Mod1.get(
            "pengajuanPinjaman/findAllPengajuanPinjamanPersonal?page=1&rows=10&sort=desc",
            {
                headers: {
                    'x-auth-token': `${token}`,
                },
            }
        );
        const data = response.data.data.result;

        // Extract unique names of employees
        pegawaiOptions.value = Array.from(new Set(data.map(item => item.namaPegawai)));

        // Update chart data
        updateChartData(data);
    } catch (error) {
        console.error('Error Fetching Data Pengajuan Pinajamn', error);
    }
};

const updateChartData = (data) => {
    const labels = data.map((item) => item.namaPegawai);
    const seriesDataJumlah = data.map((item) => item.jumlahPinjaman);
    const seriesDataSisa = data.map((item) => item.sisaPinjaman);

    // Update chart data
    chartData.value.labels = labels;
    chartData.value.datasets[0].data = seriesDataJumlah;
    chartData.value.datasets[1].data = seriesDataSisa;
};

const filterData = () => {
    let filteredData = [];

    if (selectedPegawai.value === '') {
        // Tampilkan semua label pegawai
        filteredData = chartData.value;
    } else {
        // Filter data dan label berdasarkan pegawai yang dipilih
        const filteredLabels = chartData.value.labels.filter(label => label === selectedPegawai.value);
        const filteredSeriesData = chartData.value.datasets[0].data.filter((value, index) => chartData.value.labels[index] === selectedPegawai.value);

        filteredData = {
            labels: filteredLabels,
            datasets: [{
                ...chartData.value.datasets[0],
                data: filteredSeriesData
            }]
        };
    }

    filteredChartData.value = filteredData;
};

const filteredChartData = ref(chartData.value);
</script>
