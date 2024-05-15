
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


export function fungsiFilter() {
    // Logika untuk fungsi pertama
    const searchData = async () => {
    await fetchDataJenisKelamin(selectedStartDate.value, selectedEndDate.value);
    await fetchDataStatusPegawai(selectedStartDate.value, selectedEndDate.value);
};
}