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

const plugins = [ChartDataLabels];
const chartData = ref({
    labels: [],
    datasets: [
        {
            label: ['Jaminan Pensiun Pegawai'],
            data: [],
            backgroundColor: [],
            hoverBackgroundColor: [],
        },
        {
            label: ['Jaminan Kesehatan Pegawai'],
            data: [],
            backgroundColor: [],
            hoverBackgroundColor: [],
        },
        {
            label: ['Jaminan Ksehatan Perusahaan'],
            data: [],
            backgroundColor: [],
            hoverBackgroundColor: [],
        },
        {
            label: ['Jaminan Pensiun Perusahaan'],
            data: [],
            backgroundColor: [],
            hoverBackgroundColor: [],
        },
        {
            label: ['JHT Perusahaan'],
            data: [],
            backgroundColor: [],
            hoverBackgroundColor: [],
        },
        {
            label: ['Jaminan Kematian'],
            data: [],
            backgroundColor: [],
            hoverBackgroundColor: [],
        },
        {
            label: ['Jaminan Kecelakaan'],
            data: [],
            backgroundColor: [],
            hoverBackgroundColor: [],
        },
    ],
});
const lightOptions = ref({
    plugins: {
        legend: {
            display: true,
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
    const goldenRatio = 0.618033988749895;
    let hue = Math.random(); // Start at a random hue
    for (let i = 0; i < count; i++) {
        hue += goldenRatio;
        hue %= 1;
        const color = `hsl(${hue * 360}, 70%, 50%)`; // Use HSL colors for more variation
        colors.push(color);
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
            `dashboardEis/findTotalBPJS?kdPeriodeAwal=${selectedPeriodeAwal.value}&kdPeriodeAkhir=${selectedPeriodeAkhir.value}`,
            {
                headers: {
                    'x-auth-token': `${token}`,
                },
            }
        );
        const data = response.data.data.data;
        updateChartData(data);
    } catch (error) {
        console.error('Error Fetching Data total BPJS', error);
    }
};

const updateChartData = (data) => {
    const labels = data.map((item) => item.namaPeriode).reverse(); // Balikkan array labels
    const seriesJPensiunPegawai = data.map((item) => item.jaminanPensiunPegawai).reverse(); // Balikkan array series data
    const seriesJKesehatanPegawai = data.map((item) => item.jaminanKesehatanPegawai).reverse();
    const seriesJKesehatanPerusahaan = data.map((item) => item.jaminanKesehatanPerusahaan).reverse();
    const seriesJPensiunPerusahaan = data.map((item) => item.jaminanPensiunPerusahaan).reverse();
    const seriesJHTPerusahaan = data.map((item) => item.jHTPerusahaan).reverse();
    const seriesJKematian = data.map((item) => item.jaminanKematian).reverse();
    const seriesJKecelakaan = data.map((item) => item.jaminanKecelakaan).reverse();
    const backgroundColors = dynamicColors(7);
    const hoverBackgroundColors = dynamicColors(7);

    chartData.value.labels = labels;
    chartData.value.datasets[0].data = seriesJPensiunPegawai;
    chartData.value.datasets[1].data = seriesJKesehatanPegawai;
    chartData.value.datasets[2].data = seriesJKesehatanPerusahaan;
    chartData.value.datasets[3].data = seriesJPensiunPerusahaan;
    chartData.value.datasets[4].data = seriesJHTPerusahaan;
    chartData.value.datasets[5].data = seriesJKematian;
    chartData.value.datasets[6].data = seriesJKecelakaan;
    chartData.value.datasets.forEach((dataset, index) => {
        dataset.backgroundColor = backgroundColors[index];
        dataset.hoverBackgroundColor = hoverBackgroundColors[index];
    });
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
            console.error('Error Fetching BPJS', error);
        }
    }
};
const filteredChartData = ref(chartData.value);

</script>
