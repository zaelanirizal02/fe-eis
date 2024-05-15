// Import Vue Composition API
import { ref, onMounted } from "vue";
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { hrisServiceHr1Mod1, token, dataMaster } from "../api/index";

// Deklarasi variabel ref untuk state
const chartJenisKelamin = ref(null);
const chartStatusPegawai = ref(null);
const chartOptionsJenisKelamin = ref(null);
const chartOptionsStatusPegawai = ref(null);
const responseDataStatusPegawai = ref(null);
const responseDataJenisKelamin = ref(null);
const visible2 = ref(false);
const selectedStartDate = ref(null);
const selectedEndDate = ref(null);
const selectedInfo = ref('');
const selectedKdRuangan = ref('');
const minDate = ref(null);
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

// Setup mounted hook
onMounted(async () => {
    selectedStartDate.value = new Date();
    selectedEndDate.value = new Date();
    minDate.value = new Date();

    await fetchDataJenisKelamin(selectedStartDate.value, selectedEndDate.value);
    await fetchDataStatusPegawai(selectedStartDate.value, selectedEndDate.value);
});

// Function untuk menangani perubahan tanggal
const handleDateChange = async () => {
    await fetchDataJenisKelamin(selectedStartDate.value, selectedEndDate.value);
    await fetchDataStatusPegawai(selectedStartDate.value, selectedEndDate.value);
};

// Function untuk fetch data jenis kelamin
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

// Function untuk fetch data status pegawai
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
        chartStatusPegawai.value = setchartStatusPegawai(data);
        chartOptionsStatusPegawai.value = setchartOptionsStatusPegawai();
        responseDataStatusPegawai.value = data;
    } catch (error) {
        console.error("Error fetching data status pegawai", error);
    }
};

// Function untuk mengatur data chart jenis kelamin
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

// Function untuk mengatur opsi chart jenis kelamin
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

// Function untuk mengatur data chart status pegawai
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

// Function untuk mengatur opsi chart status pegawai
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

// Ekspor variabel dan fungsi yang dibutuhkan
export {
    chartJenisKelamin,
    chartStatusPegawai,
    chartOptionsJenisKelamin,
    chartOptionsStatusPegawai,
    responseDataStatusPegawai,
    responseDataJenisKelamin,
    visible2,
    selectedStartDate,
    selectedEndDate,
    selectedInfo,
    selectedKdRuangan,
    minDate,
    dropdownUnit,
    dropdownRuangan,
    handleDateChange,
    fetchDataJenisKelamin,
    fetchDataStatusPegawai,
    setchartOptionsJenisKelamin,
    setchartOptionsStatusPegawai
};
