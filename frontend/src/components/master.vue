<script setup>
import {
    // api,
    hrisServiceHr1Mod1,
    hrisServiceHr2Mod3,
    hrisServiceAuthInfo,
    dataMaster,
    token,
} from "../api/index";
import { ref, onMounted } from "vue";
import ChartDataLabels from 'chartjs-plugin-datalabels';

const plugins = [ChartDataLabels];
const chartJenisKelamin = ref(null);
const chartStatusPegawai = ref(null);

const chartOptionsJenisKelamin = ref(null);
const chartOptionsStatusPegawai = ref(null);

const responseDataStatusPegawai = ref(null);
const responseDataJenisKelamin = ref(null);


const chart = ref(null);
const chartContainer = ref(null);

//untuk klik selengkapnya
const visible2 = ref(false);

// State untuk menyimpan tglAkhir dan info yang dipilih
const selectedStartDate = ref(null);
const selectedEndDate = ref(null);
const selectedInfo = ref('');
const selectedKdRuangan = ref('');

// Tentukan tanggal minimal untuk kalendar akhir
const minDate = ref(null);

// Opsi-opsi untuk dropdown
const dropdownUnit = [
    { value: "", label: "--Pilih" },
    { value: "hrd", label: "HRD" },
    { value: "ruangan", label: "Ruangan" }
];
const dropdownRuangan = [
    { value: "", label: "--Pilih" },

    { value: "001", label: "Pusat" },
    { value: "002", label: "HRD" },
    { value: "089", label: "Project" },
];

onMounted(async () => {
    selectedStartDate.value = new Date();
    selectedEndDate.value = new Date();
    minDate.value = new Date();

    await fetchDataJenisKelamin(selectedStartDate.value, selectedEndDate.value);
    await fetchDataStatusPegawai(selectedStartDate.value, selectedEndDate.value);

    // Panggil metode filterLokasiKerja() dari employesController


});


// onBeforeUnmount(() => {
//     window.removeEventListener('resize', resizeChart);
// });

const handleDateChange = async () => {
    await fetchDataJenisKelamin(selectedStartDate.value, selectedEndDate.value);
    await fetchDataStatusPegawai(selectedStartDate.value, selectedEndDate.value);
};

const fetchDataJenisKelamin = async (tglAwal, tglAkhir) => {
    try {
        const response = await hrisServiceHr1Mod1.get(
            `registrasiPegawai/findJumlahPegawaiFilterJenisKelamin?tglAwal=${tglAwal.getTime()}&tglAkhir=${tglAkhir.getTime()}&info=${selectedInfo.value}&kdRuangan=${selectedKdRuangan.value}`,
            {
                headers: {
                    "x-auth-token": `${token}`,
                },
            }
        );
        const data = response.data.data.jumlahPegawaiFilter;
        chartJenisKelamin.value = setchartJenisKelamin(data);
        chartOptionsJenisKelamin.value = setchartOptionsJenisKelamin();
        responseDataJenisKelamin.value = data;
    } catch (error) {
        console.error("Error fetching data jenis kelamin", error);
    }
};
const setchartJenisKelamin = (data) => {
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

//TRIGER TOMBOL CARI
const searchData = async () => {
    await fetchDataJenisKelamin(selectedStartDate.value, selectedEndDate.value);
    await fetchDataStatusPegawai(selectedStartDate.value, selectedEndDate.value);
};

const setchartOptionsJenisKelamin = () => {
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
                        size: '12'
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

const fetchDataStatusPegawai = async (tglAkhir) => {
    try {
        const response = await hrisServiceHr1Mod1.get(
            `registrasiPegawai/findJumlahPegawaiFilterKategory?tglAkhir=${tglAkhir.getTime()}&info=${selectedInfo.value}&kdRuangan=${selectedKdRuangan.value}`,
            {
                headers: {
                    "x-auth-token": `${token}`,
                },
            }
        );
        const data = response.data.data.jumlahPegawaiFilter;
        console.log(data);
        // createChart();
        chartStatusPegawai.value = setchartStatusPegawai(data);
        chartOptionsStatusPegawai.value = setchartOptionsStatusPegawai();
        // untuk datatable
        responseDataStatusPegawai.value = data;
    } catch (error) {
        console.error("Error fetching data status pegawai", error);
    }
};

const setchartStatusPegawai = (data) => {
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

const setchartOptionsStatusPegawai = () => {
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
</script>