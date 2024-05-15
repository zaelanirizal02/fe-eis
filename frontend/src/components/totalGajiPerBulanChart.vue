<template>
    <div class="justify-content-center custom-chart-bar">
        <div class=" center">
            <select class="buttonChart" v-model="selectedPeriodeAwal" @change="filterData" id="periodeAwal">
                <option class="center" value="">--Pilih Periode Awal</option>
                <option v-for="periode in periodeOptions" :value="periode.kode">{{ periode.namaPeriode }}</option>
            </select>
            <select class="buttonChart" v-model="selectedPeriodeAkhir" @change="filterData" id="periodeAkhir">
                <option class="center" value="">--Pilih Periode Akhir</option>
                <option v-for="periode in periodeOptions" :value="periode.kode">{{ periode.namaPeriode }}</option>
            </select>
        </div>
        <Chart type="bar" :data="filteredChartData" :options="lightOptions" :plugins="plugins" />
    </div>
    <div v-if="invalidDate">
        <h4><i class="pi pi-comments"></i>
            Pastikan Periode Yang Dipilih Benar
        </h4>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import Chart from 'primevue/chart';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { hrisServiceHr1Mod1, token } from '../api/index';
// import '../views/employes/style.css';
// import '../assets/css/buttonStyle.css';

const plugins = [ChartDataLabels];
const chartData = ref({
    labels: [],
    datasets: [
        {
            data: [],
            backgroundColor: ['rgb(84, 166, 100)'],
            hoverBackgroundColor: ['rgb(64, 27, 27)'],
        },
    ],
});
const lightOptions = ref({
    plugins: {
        legend: {
            display: false,
        },
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

const periodeOptions = ref([]);
const selectedPeriodeAwal = ref('');
const selectedPeriodeAkhir = ref('');
const invalidDate = ref(false)

onMounted(async () => {
    await fetchDataFromApi();
    await fetchDataDropdownList();
});

const dynamicColors = (count) => {
    const colors = [];
    for (let i = 0; i < count; i++) {
        colors.push(`rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)})`);
    }
    return colors;
};

const fetchDataDropdownList = async () => {
    try {
        const response = await hrisServiceHr1Mod1.get(
            "dashboardEis/findAllPeriodeGaji",
            {
                headers: {
                    'x-auth-token': `${token}`,
                },
            }
        );
        const data = response.data.data;
        periodeOptions.value = data; // Mengisi periodeOptions dengan data dari API
    } catch (error) {
        console.error('Error Fetching Data Kode , error');
    }
};

const fetchDataFromApi = async () => {
    try {
        const response = await hrisServiceHr1Mod1.get(
            `dashboardEis/findTotalGaji?kdPeriodeAwal=${selectedPeriodeAwal.value}&kdPeriodeAkhir=${selectedPeriodeAkhir.value}`,
            {
                headers: {
                    'x-auth-token': `${token}`,
                },
            }
        );
        const data = response.data.data.data;
        updateChartData(data);
    } catch (error) {
        console.error('Error Fetching Data total gaji', error);
    }
};

const updateChartData = (data) => {
    const labels = data.map((item) => item.namaPeriode).reverse();;
    const seriesData = data.map((item) => item.totalGaji).reverse();;
    const backgroundColors = dynamicColors(data.length);
    const hoverBackgroundColors = dynamicColors(data.length);

    chartData.value.labels = labels;
    chartData.value.datasets[0].data = seriesData;
    chartData.value.datasets[0].backgroundColor = backgroundColors;
    chartData.value.datasets[0].hoverBackgroundColor = hoverBackgroundColors;
};

const filterData = () => {
    if (!selectedPeriodeAwal.value || !selectedPeriodeAkhir.value) {
        invalidDate.value = false;
        fetchDataFromApi();
    }
    if (selectedPeriodeAwal.value == selectedPeriodeAkhir.value) {
        invalidDate.value = false;
        fetchDataFromApi();
    }
    if (selectedPeriodeAwal.value >= selectedPeriodeAkhir.value) {
        invalidDate.value = true;
        fetchDataFromApi();

    } else {
        invalidDate.value = false;
        try {
            fetchDataFromApi(); // Panggil ulang fetchDataFromApi dengan nilai yang dipilih
        } catch (error) {
            console.error('Error Fetching Data', error);
        }
    }
};

const filteredChartData = ref(chartData.value);
</script>
