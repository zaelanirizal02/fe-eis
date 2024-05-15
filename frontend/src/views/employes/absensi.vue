<template>
    <Menubar :model="items" class="sticky-menubar" position="sticky" top="0">
        <template #start>
            <a href="/">
                <svg width="300" fill="none" xmlns="http://www.w3.org/2000/svg" class="h-4rem">
                    <image xlink:href="../../assets/logo/logo-pagawe-1.png" x="0" y="0" width="130" height="70" />
                </svg>
            </a>
        </template>

        <template #item="{ item, props, hasSubmenu, root }">
            <a v-ripple class="flex align-items-center" v-bind="props.action">
                <span :class="item.icon" />
                <span class="ml-2">{{ item.label }}</span>
                <Badge v-if="item.badge" :class="{ 'ml-auto': !root, 'ml-2': root }" :value="item.badge" />
                <span v-if="item.shortcut"
                    class="ml-auto border-1 surface-border border-round surface-100 text-xs p-1">{{
        item.shortcut
    }}</span>
                <i v-if="hasSubmenu"
                    :class="['pi pi-angle-down', { 'pi-angle-down ml-2': root, 'pi-angle-right ml-auto': !root }]"></i>
            </a>
        </template>
        <template #end>
            <div class="col-md-2 d-flex align-items-center">
                <span>
                    <RadioButton v-model="selectedInfo" inputId="departemen" name="dynamic" value="departemen"
                        @click="handleDepartemenRadioButtonClick" />
                    <label for="departemen" class="ml-2"></label>
                </span>

                <!-- Radio Button untuk Ruangan -->


                <!-- Dropdown Departemen -->
                <Dropdown v-model="selectedKdDepartemen" :options="periodeDepartemenOptions"
                    optionLabel="namaDepartemen" optionValue="id.kode" placeholder="Pilih Departemen" class="mr-2"
                    :disabled="!dropdownDepartemenEnabled" />
                <span>
                    <RadioButton v-model="selectedInfo" inputId="ruangan" name="dynamic" value="ruangan"
                        @click="handleRuanganRadioButtonClick" />
                    <label for="ruangan" class="ml-2"></label>
                </span>
                <!-- Dropdown Ruangan -->
                <Dropdown v-model="selectedKdRuangan" :options="periodeRuanganOptions" optionLabel="namaRuangan"
                    optionValue="id.kode" placeholder="Pilih Ruangan" class="mr-2"
                    :disabled="!dropdownRuanganEnabled" />
                <!-- Calendar -->
                <Calendar v-model="selectedStartDate" :input="showCalendar" class="mr-2" placeholder="Tgl Awal"
                    :showIcon="true" dateFormat="dd:MM:yy" style="width: 120px;" />
                <Calendar v-model="selectedEndDate" :input="showCalendar" class="mr-2" placeholder="Tgl Akhir"
                    :showIcon="true" dateFormat="dd:MM:yy" style="width: 120px;" :appendTo="body" />


                <!-- Button -->
                <Button class="mr-2" style="width: 40px; background-color: rgb(43, 34, 41);" @click="resetData" label=""
                    icon="pi pi-refresh" />
                <Button style="width: auto;" @click="searchData" label="Cari" icon="pi pi-search" />
            </div>
        </template>


    </Menubar>

    <div class="my-container">

        <kehadiran />


    </div>




</template>

<script setup>
import {
    // api,
    hrisServiceHr1Mod1,
    hrisServiceHr2Mod3,
    hrisServiceAuthInfo,
    dataMaster,
    token,
} from "../../api/index";

//Style
import '../../assets/css/buttonStyle.css';

//pemanggilan
import '../../views/employes/style.css';
import { ref, onMounted } from "vue";
import { useRouter } from 'vue-router'; //untuk router di navbar
import ChartDataLabels from 'chartjs-plugin-datalabels';
// import pengajuanHarianChart from "./pengajuanHarianChart.vue";
import biayaBpjsPerBulanChart from "../../components/biayaBpjsPerBulanChart.vue";
import pengajuanPinjamanPersonalChart from "../../components/pengajuanPinjamanPersonalChart.vue";
import biayaPajakPerBulanChart from "../../components/biayaPajakPerBulanChart.vue";
import totalGajiPerBulanChart from "../../components/totalGajiPerBulanChart.vue";
import strSip from "../../components/strSip.vue";
import kehadiran from "../../views/employes/kehadiran.vue";
// import statusPajakPTKPChart from "./statusPajakPTKPChart.vue";

const plugins = [ChartDataLabels];
const showCalendar = ref(false);
// Properti untuk mengontrol ketersediaan dropdown Departemen dan Ruangan
const dropdownDepartemenEnabled = ref(false);
const dropdownRuanganEnabled = ref(false);

const chartJenisKelamin = ref(null);
const chartStatusPegawai = ref(null);
const chartPendidikanTerakhir = ref(null);
const chartMasaKerja = ref(null);
const chartStatusPTKP = ref(null);
const chartLokasiKerja = ref(null);
const chartPegawaiDepartemen = ref(null);
const chartPengajuanHarian = ref(null);
const chartPegawaiUsiaDanJK = ref(null);

const chartOptionsJenisKelamin = ref([]);
const chartOptionsStatusPegawai = ref(null);
const chartOptionsPendidikanTerakhir = ref(null);
const chartOptionsMasaKerja = ref(null);
const chartOptionsStatusPTKP = ref(null);
const chartOptionsLokasiKerja = ref(null);
const chartOptionsPegawaiDepartemen = ref(null);
const chartOptionsPengajuanHarian = ref(null);
const chartOptionsPegawaiUsiaDanJK = ref(null);

//pemanggilan data value
const responseDataJenisKelamin = ref([]);
const responseDataStatusPegawai = ref(null);
const responseDataPendidikanTerakhir = ref(null);
const responseDataMasaKerja = ref(null);
const responseDataStatusPTKP = ref(null);
const responseDataLokasiKerja = ref(null);
const responseDataPegawaiDepartemen = ref(null);
const responseDataPengajuanHarian = ref(null);
const responseDataPegawaiUsiaDanJK = ref(null);
const responseDataPegawaiTotal = ref(''); // jangan diisi null


const chart = ref(null);
const chartContainer = ref(null);

//untuk klik selengkapnya dan redering
const body = ref(); //warning ngga penting tapi menghalangi debugging
const visible2 = ref(false);
const klikJenisKelamin = ref(false);
const klikStatusPegawai = ref(false);
const klikPendidikanTerakhir = ref(false);
const klikMasaKerja = ref(false);
const klikStatusPTKP = ref(false);
const klikBPJS = ref(false);
const klikPengajuan = ref(false);
const klikLokasiKerja = ref(false);
const klikPinjamanPersonal = ref(false);
const klikPegawaiDepartemen = ref(false);
const klikUsiaDanJK = ref(false);


// State untuk menyimpan tglAkhir dan info yang dipilih
const selectedStartDate = ref();
const selectedEndDate = ref();

// const selectedStartDate = new (Date);
// const selectedEndDate = new (Date);
const selectedKdDepartemen = ref(null);
const selectedKdRuangan = ref(null); //ruangan
// const selectedInfo = ref(null); //info
const searchClicked = ref(false); // Tandai apakah tombol pencarian telah diklik

// Tentukan tanggal minimal untuk kalendar akhir
const minDate = ref(null);

//opsi radio button
const selectedInfo = ref('pilihInfo');
const infos = ref([
    { name: 'Departemen', key: 'departemen' },
    { name: 'Ruangan', key: 'ruangan' }
]);

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

const router = useRouter();
const items = ref([
    {
        label: "Dashboard",
        icon: "pi pi-home",
        command: () => {
            router.push('/');
        }
    },
    {
        label: "Demografi",
        icon: "pi pi-star",
        // command: () => {
        //     router.push('/demografi');
        // }
    },
    {
        label: "Kehadiran",
        icon: "pi pi-calendar",
        command: () => {
            router.push('/kehadiran');
        }
    },
    {
        label: "Payroll",
        icon: "pi pi-dollar",
        command: () => {
            router.push('/payroll');
        }
    },
]);

const periodeRuanganOptions = ref([]);
const periodeDepartemenOptions = ref([]);

onMounted(async () => {
    await fetchDataDropdownRuangan();
    await fetchDataDropdownDepartemen();


    await fetchDataJenisKelamin();
    await fetchDataStatusPegawai();
    await fetchDataPendidikanTerakhir();
    await fetchDataMasaKerja();
    await fetchDataStatusPTKP();
    // await fetchDataPegawaiTotal();
    await fetchDataLokasiKerja();
    await fetchDataPegawaiDepartemen();
    await fetchDataPegawaiUsiaDanJk();
    await fetchDataPengajuanHarian(selectedStartDate.value, selectedEndDate.value);
    // await fetchDataPegawaiTotal(selectedStartDate.value, selectedEndDate.value);

    // Panggil metode filterLokasiKerja() dari employesController


});


// onBeforeUnmount(() => {
//     window.removeEventListener('resize', resizeChart);
// });

const handleDateChange = async () => {
    await fetchDataJenisKelamin(selectedStartDate.value, selectedEndDate.value);
    await fetchDataStatusPegawai(selectedStartDate.value, selectedEndDate.value);
    await fetchDataPendidikanTerakhir(selectedStartDate.value, selectedEndDate.value);
    await fetchDataMasaKerja(selectedStartDate.value, selectedEndDate.value);
    await fetchDataStatusPTKP(selectedStartDate.value, selectedEndDate.value);
    // await fetchDataPegawaiTotal(selectedStartDate.value, selectedEndDate.value);
    await fetchDataLokasiKerja(selectedStartDate.value, selectedEndDate.value);
    await fetchDataPegawaiDepartemen(selectedStartDate.value, selectedEndDate.value);
    await fetchDataPengajuanHarian(selectedStartDate.value, selectedEndDate.value);
    await fetchDataPegawaiUsiaDanJk(selectedStartDate.value, selectedEndDate.value);
};
//TRIGER TOMBOL CARI
const searchData = () => {
    searchClicked.value = true; // Tandai bahwa tombol pencarian telah diklik
    const tglAwal = selectedStartDate.value ? selectedStartDate.value.getTime() : null; // Ubah tanggal ke epoch jika dipilih
    const tglAkhir = selectedEndDate.value ? selectedEndDate.value.getTime() : null; // Ubah tanggal ke epoch jika dipilih

    // Ambil nilai dari dropdown ruangan dan info HRD
    const kdDepartemen = selectedKdDepartemen.value;
    const kdRuangan = selectedKdRuangan.value;
    const info = selectedInfo.value;

    // Buat parameter filter info dan kdRuangan
    const filters = [];
    if (kdDepartemen) {
        filters.push(`kdDepartemen=${kdDepartemen}`);
    }
    if (kdRuangan) {
        filters.push(`kdRuangan=${kdRuangan}`);
    }
    if (info) {
        filters.push(`info=${info}`);
    }

    // Kirim permintaan API dengan parameter filter tambahan
    fetchDataJenisKelamin(tglAwal, tglAkhir, filters);
    fetchDataStatusPegawai(tglAwal, tglAkhir, filters);
    fetchDataPendidikanTerakhir(tglAwal, tglAkhir, filters);
    fetchDataMasaKerja(tglAwal, tglAkhir, filters);
    fetchDataStatusPTKP(tglAwal, tglAkhir, filters);
    // fetchDataPegawaiTotal(tglAwal, tglAkhir, filters);
    fetchDataLokasiKerja(tglAwal, tglAkhir, filters);
    fetchDataPegawaiDepartemen(tglAwal, tglAkhir, filters);
    fetchDataPengajuanHarian(tglAwal, tglAkhir, filters);
    fetchDataPegawaiUsiaDanJk(tglAwal, tglAkhir, filters);
};

// Fungsi untuk mereset data
const resetData = () => {
    selectedInfo.value = null;
    selectedKdDepartemen.value = null;
    selectedKdRuangan.value = null;
    selectedStartDate.value = null;
    selectedEndDate.value = null;
};

// Event handler untuk radio button "Departemen"
const handleDepartemenRadioButtonClick = () => {
    dropdownDepartemenEnabled.value = true;
    dropdownRuanganEnabled.value = false; // Matikan dropdown Ruangan
};
// Event handler untuk radio button "Ruangan"
const handleRuanganRadioButtonClick = () => {
    dropdownDepartemenEnabled.value = false; // Matikan dropdown Departemen
    dropdownRuanganEnabled.value = true;
};

const fetchDataDropdownRuangan = async () => {
    try {
        const response = await hrisServiceHr1Mod1.get(
            "service/list-generic?table=Ruangan&select=*&page=1&rows=1000&condition=and&profile=y",
            {
                headers: {
                    'x-auth-token': `${token}`,
                },
            }
        );
        const data = response.data.data.data;
        periodeRuanganOptions.value = data; // Mengisi periodeOptions dengan data dari API
        console.log('data kode ruangan', data)
    } catch (error) {
        console.error('Error Fetching Data Kode RU , error');
    }
};
const fetchDataDropdownDepartemen = async () => {
    try {
        const response = await hrisServiceHr1Mod1.get(
            "service/list-generic?table=Departemen&select=*&page=1&rows=1000&condition=and&profile=y",
            {
                headers: {
                    'x-auth-token': `${token}`,
                },
            }
        );
        const data = response.data.data.data;
        periodeDepartemenOptions.value = data; // Mengisi periodeOptions dengan data dari API
        console.log('data kode Departemen', data)
    } catch (error) {
        console.error('Error Fetching Data Kode DP , error');
    }
};


const fetchDataJenisKelamin = async (tglAwal, tglAkhir) => {
    try {
        let url = '/dashboardEis/findJumlahPegawaiFilterJenisKelamin?';
        if (tglAwal && tglAkhir) {
            const tglAwalEpoch = Math.floor(tglAwal / 1000); // Mengonversi tglAwal ke epoch detik
            const tglAkhirEpoch = Math.floor(tglAkhir / 1000); // Mengonversi tglAkhir ke epoch detik
            url += `tglAwal=${tglAwalEpoch}&tglAkhir=${tglAkhirEpoch}`;
        }


        // Tambahkan parameter info dan kdRuangan dari dropdown jika dipilih
        if (selectedInfo.value && selectedKdDepartemen.value && selectedKdRuangan.value) {
            url += `&kdDepartemen=${selectedKdDepartemen.value}&kdRuangan=${selectedKdRuangan.value}`;
        }
        // Tambahkan parameter jika hanya info dipilih
        if (selectedInfo.value) {
            url += `&info=${selectedInfo.value}`;
        }

        const response = await hrisServiceHr1Mod1.get(
            url,
            {
                headers: {
                    "x-auth-token": `${token}`,
                },
            }
        );
        // console.log(response);
        const data = response.data.data.jumlahPegawaiFilter;

        responseDataJenisKelamin.value = data;
    } catch (error) {
        console.error("Error fetching data jenis kelamin", error);
    }
};

const fetchDataPendidikanTerakhir = async (tglAwal, tglAkhir) => {
    try {
        let url = '/dashboardEis/findJumlahPegawaiFilterPendidikan?';
        if (tglAwal && tglAkhir) {
            const tglAwalEpoch = Math.floor(tglAwal / 1000); // Mengonversi tglAwal ke epoch detik
            const tglAkhirEpoch = Math.floor(tglAkhir / 1000); // Mengonversi tglAkhir ke epoch detik
            url += `tglAwal=${tglAwalEpoch}&tglAkhir=${tglAkhirEpoch}`;
        }

        // Tambahkan parameter info dan kdRuangan dari dropdown jika dipilih
        if (selectedKdDepartemen.value && selectedKdRuangan.value) {
            url += `&kdDepartemen=${selectedKdDepartemen.value}&kdRuangan=${selectedKdRuangan.value}`;
        }
        // Tambahkan parameter jika hanya info dipilih
        if (selectedInfo.value) {
            url += `&info=${selectedInfo.value}`;
        }

        const response = await hrisServiceHr1Mod1.get(
            url,
            {
                headers: {
                    "x-auth-token": `${token}`,
                },
            }
        );
        const data = response.data.data.jumlahPegawaiFilter;
        chartPendidikanTerakhir.value = setChartPendidikanTerakhir(data);
        chartOptionsPendidikanTerakhir.value = setChartOptionsPendidikanTerakhir();
        // untuk datatable
        responseDataPendidikanTerakhir.value = data;
    } catch (error) {
        console.error("Error fetching pendidikan terakhir", error);
    }
};

const setChartPendidikanTerakhir = (data) => {

    // Ekstraksi data untuk chart
    const labels = data.map((item) => item.nama);
    const seriesData = data.map((item) => item.jumlah);
    const label = data.map((item) => item.nama);

    // Menghasilkan warna secara dinamis berdasarkan jumlah data
    const dynamicColors = (count) => {
        const colors = [];
        for (let i = 0; i < count; i++) {
            colors.push(`rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)})`);
        }
        return colors;
    };

    const backgroundColors = dynamicColors(data.length);
    const hoverBackgroundColors = dynamicColors(data.length);

    return {
        labels: labels,
        datasets: [
            {
                data: seriesData,
                backgroundColor: backgroundColors,
                hoverBackgroundColor: hoverBackgroundColors
            },
        ],
    };
};
const setChartOptionsPendidikanTerakhir = () => {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue("--text-color");

    return {
        plugins: {
            legend: {
                display: false,
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

const fetchDataStatusPegawai = async (tglAwal, tglAkhir) => {
    try {
        let url = '/dashboardEis/findJumlahPegawaiFilterKategory?';
        if (tglAwal && tglAkhir) {
            const tglAwalEpoch = Math.floor(tglAwal / 1000); // Mengonversi tglAwal ke epoch detik
            const tglAkhirEpoch = Math.floor(tglAkhir / 1000); // Mengonversi tglAkhir ke epoch detik
            url += `tglAwal=${tglAwalEpoch}&tglAkhir=${tglAkhirEpoch}`;
        }

        // Tambahkan parameter info dan kdRuangan dari dropdown jika dipilih
        if (selectedKdDepartemen.value && selectedKdRuangan.value) {
            url += `&kdDepartemen=${selectedKdDepartemen.value}&kdRuangan=${selectedKdRuangan.value}`;
        }
        // Tambahkan parameter jika hanya info dipilih
        if (selectedInfo.value) {
            url += `&info=${selectedInfo.value}`;
        }

        const response = await hrisServiceHr1Mod1.get(
            url,
            {
                headers: {
                    "x-auth-token": `${token}`,
                },
            }
        );
        const data = response.data.data.jumlahPegawaiFilter;
        // console.log(data);
        // createChart();
        chartStatusPegawai.value = setChartStatusPegawai(data);
        chartOptionsStatusPegawai.value = setChartOptionsStatusPegawai();
        // untuk datatable
        responseDataStatusPegawai.value = data;
    } catch (error) {
        console.error("Error fetching data status pegawai", error);
    }
};

const setChartStatusPegawai = (data) => {
    const labels = data.map((item) => `${item.nama} - ${item.jumlah}`);
    const seriesData = data.map((item) => item.jumlah);

    // Menghasilkan warna secara dinamis berdasarkan jumlah data
    const dynamicColors = (count) => {
        const colors = [];
        for (let i = 0; i < count; i++) {
            colors.push(`rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)})`);
        }
        return colors;
    };

    const backgroundColors = dynamicColors(data.length);
    const hoverBackgroundColors = dynamicColors(data.length);

    return {
        labels: labels,
        datasets: [
            {
                data: seriesData,
                backgroundColor: backgroundColors,
                hoverBackgroundColor: hoverBackgroundColors
            },
        ],
    };
};

const setChartOptionsStatusPegawai = () => {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue("--text-color");

    return {
        plugins: {
            legend: {
                display: true,
                position: 'bottom',
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
                            size: 14,
                        },
                    },
                },
            },
        },
    };
};

const fetchDataMasaKerja = async (tglAwal, tglAkhir) => {
    try {
        let url = '/dashboardEis/findJumlahPegawaiFilterMasaKerja?';
        if (tglAwal && tglAkhir) {
            const tglAwalEpoch = Math.floor(tglAwal / 1000); // Mengonversi tglAwal ke epoch detik
            const tglAkhirEpoch = Math.floor(tglAkhir / 1000); // Mengonversi tglAkhir ke epoch detik
            url += `tglAwal=${tglAwalEpoch}&tglAkhir=${tglAkhirEpoch}`;
        }

        // Tambahkan parameter info dan kdRuangan dari dropdown jika dipilih
        if (selectedKdDepartemen.value && selectedKdRuangan.value) {
            url += `&kdDepartemen=${selectedKdDepartemen.value}&kdRuangan=${selectedKdRuangan.value}`;
        }
        // Tambahkan parameter jika hanya info dipilih
        if (selectedInfo.value) {
            url += `&info=${selectedInfo.value}`;
        }

        const response = await hrisServiceHr1Mod1.get(
            url,
            {
                headers: {
                    "x-auth-token": `${token}`,
                },
            }
        );
        // console.log(response);
        const data = response.data.data.data;
        // console.log(data);
        chartMasaKerja.value = setChartMasaKerja(data);
        chartOptionsMasaKerja.value = setChartOptionsMasaKerja();
        // untuk datatable
        responseDataMasaKerja.value = data;
    } catch (error) {
        console.error("Error fetching Masa Kerja", error);
    }
};

const setChartMasaKerja = (data) => {
    // Ekstraksi data untuk chart
    const labels = data.map((item) => item.nama);
    const seriesData = data.map((item) => item.jumlah);
    // const label = data.map((item) => item.nama);

    // Menghasilkan warna secara dinamis berdasarkan jumlah data
    const dynamicColors = (count) => {
        const colors = [];
        for (let i = 0; i < count; i++) {
            colors.push(`rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)})`);
        }
        return colors;
    };

    const backgroundColors = dynamicColors(data.length);
    const hoverBackgroundColors = dynamicColors(data.length);

    return {
        labels: labels,
        datasets: [
            {
                data: seriesData,
                backgroundColor: backgroundColors,
                hoverBackgroundColor: hoverBackgroundColors
            },
        ],
    };
};

const setChartOptionsMasaKerja = () => {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue("--text-color");

    return {
        plugins: {
            legend: {
                display: false,
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

const fetchDataStatusPTKP = async (tglAwal, tglAkhir) => {
    try {
        let url = '/dashboardEis/findJumlahPegawaiFilterStatusPajak?';
        if (tglAwal && tglAkhir) {
            const tglAwalEpoch = Math.floor(tglAwal / 1000); // Mengonversi tglAwal ke epoch detik
            const tglAkhirEpoch = Math.floor(tglAkhir / 1000); // Mengonversi tglAkhir ke epoch detik
            url += `tglAwal=${tglAwalEpoch}&tglAkhir=${tglAkhirEpoch}`;
        }

        // Tambahkan parameter info dan kdRuangan dari dropdown jika dipilih
        if (selectedKdDepartemen.value && selectedKdRuangan.value) {
            url += `&kdDepartemen=${selectedKdDepartemen.value}&kdRuangan=${selectedKdRuangan.value}`;
        }
        // Tambahkan parameter jika hanya info dipilih
        if (selectedInfo.value) {
            url += `&info=${selectedInfo.value}`;
        }

        const response = await hrisServiceHr1Mod1.get(
            url,
            {
                headers: {
                    "x-auth-token": `${token}`,
                },
            }
        );
        const data = response.data.data;
        // console.log(data);
        chartStatusPTKP.value = setChartStatusPTKP(data);
        chartOptionsStatusPTKP.value = setChartOptionsStatusPTKP();
        // untuk datatable
        responseDataStatusPTKP.value = data;
    } catch (error) {
        console.error("Error fetching Status PTKP", error);
    }
};

const setChartStatusPTKP = (data) => {
    // Ekstraksi data untuk chart
    const labels = data.map((item) => item.statusPTKP);
    const seriesData = data.map((item) => item.jumlah);
    // const label = data.map((item) => item.nama);

    // Menghasilkan warna secara dinamis berdasarkan jumlah data
    const dynamicColors = (count) => {
        const colors = [];
        for (let i = 0; i < count; i++) {
            colors.push(`rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)})`);
        }
        return colors;
    };

    const backgroundColors = dynamicColors(data.length);
    const hoverBackgroundColors = dynamicColors(data.length);

    return {
        labels: labels,
        datasets: [
            {
                data: seriesData,
                backgroundColor: backgroundColors,
                hoverBackgroundColor: hoverBackgroundColors
            },
        ],
    };
};

const setChartOptionsStatusPTKP = () => {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue("--text-color");

    return {
        plugins: {
            legend: {
                display: false,
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
const fetchDataLokasiKerja = async (tglAwal, tglAkhir) => {
    try {
        let url = '/dashboardEis/findJumlahPegawaiFilterLokasiKerja?';
        if (tglAwal && tglAkhir) {
            const tglAwalEpoch = Math.floor(tglAwal / 1000); // Mengonversi tglAwal ke epoch detik
            const tglAkhirEpoch = Math.floor(tglAkhir / 1000); // Mengonversi tglAkhir ke epoch detik
            url += `tglAwal=${tglAwalEpoch}&tglAkhir=${tglAkhirEpoch}`;
        }

        // Tambahkan parameter info dan kdRuangan dari dropdown jika dipilih
        if (selectedKdDepartemen.value && selectedKdRuangan.value) {
            url += `&kdDepartemen=${selectedKdDepartemen.value}&kdRuangan=${selectedKdRuangan.value}`;
        }
        // Tambahkan parameter jika hanya info dipilih
        if (selectedInfo.value) {
            url += `&info=${selectedInfo.value}`;
        }

        const response = await hrisServiceHr1Mod1.get(
            url,
            {
                headers: {
                    "x-auth-token": `${token}`,
                },
            }
        );
        const data = response.data.data.jumlahPegawaiFilter;
        // console.log(data);
        chartLokasiKerja.value = setChartLokasiKerja(data);
        chartOptionsLokasiKerja.value = setChartOptionsLokasiKerja();
        // untuk datatable
        responseDataLokasiKerja.value = data;
    } catch (error) {
        console.error("Error fetching Status PTKP", error);
    }
};

const setChartLokasiKerja = (data) => {
    // Ekstraksi data untuk chart
    const labels = data.map((item) => item.nama);
    const seriesData = data.map((item) => item.jumlah);
    // const label = data.map((item) => item.nama);

    // Menghasilkan warna secara dinamis berdasarkan jumlah data
    const dynamicColors = (count) => {
        const colors = [];
        for (let i = 0; i < count; i++) {
            colors.push(`rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)})`);
        }
        return colors;
    };

    const backgroundColors = dynamicColors(data.length);
    const hoverBackgroundColors = dynamicColors(data.length);

    return {
        labels: labels,
        datasets: [
            {
                data: seriesData,
                backgroundColor: backgroundColors,
                hoverBackgroundColor: hoverBackgroundColors
            },
        ],
    };
};

const setChartOptionsLokasiKerja = () => {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue("--text-color");

    return {
        plugins: {
            legend: {
                display: false,
                position: 'left',
                labels: {
                    cutout: "60%",
                    color: textColor,
                    font: {
                        weight: 'bold',
                        size: '16'
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

const fetchDataPegawaiDepartemen = async (tglAwal, tglAkhir) => {
    try {
        let url = '/dashboardEis/findJumlahPegawaiFilterDepartemen?';
        if (tglAwal && tglAkhir) {
            const tglAwalEpoch = Math.floor(tglAwal / 1000); // Mengonversi tglAwal ke epoch detik
            const tglAkhirEpoch = Math.floor(tglAkhir / 1000); // Mengonversi tglAkhir ke epoch detik
            url += `tglAwal=${tglAwalEpoch}&tglAkhir=${tglAkhirEpoch}`;
        }

        // Tambahkan parameter info dan kdRuangan dari dropdown jika dipilih
        if (selectedKdDepartemen.value && selectedKdRuangan.value) {
            url += `&kdDepartemen=${selectedKdDepartemen.value}&kdRuangan=${selectedKdRuangan.value}`;
        }
        // Tambahkan parameter jika hanya info dipilih
        if (selectedInfo.value) {
            url += `&info=${selectedInfo.value}`;
        }

        const response = await hrisServiceHr1Mod1.get(
            url,
            {
                headers: {
                    "x-auth-token": `${token}`,
                },
            }
        );
        const data = response.data.data.listPegawai;
        // console.log(data);
        chartPegawaiDepartemen.value = setChartPegawaiDepartemen(data);
        chartOptionsPegawaiDepartemen.value = setChartOptionsPegawaiDepartemen();
        // untuk datatable
        responseDataPegawaiDepartemen.value = data;
    } catch (error) {
        console.error("Error fetching Status PTKP", error);
    }
};

const setChartPegawaiDepartemen = (data) => {
    // Ekstraksi data untuk chart
    const labels = data.map((item) => item.namaDepartemen);
    const seriesData = data.map((item) => item.jumlah);
    // const label = data.map((item) => item.nama);

    // Menghasilkan warna secara dinamis berdasarkan jumlah data
    const dynamicColors = (count) => {
        const colors = [];
        for (let i = 0; i < count; i++) {
            colors.push(`rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)})`);
        }
        return colors;
    };

    const backgroundColors = dynamicColors(data.length);
    const hoverBackgroundColors = dynamicColors(data.length);

    return {
        labels: labels,
        datasets: [
            {
                data: seriesData,
                backgroundColor: backgroundColors,
                hoverBackgroundColor: hoverBackgroundColors
            },
        ],
    };
};

const setChartOptionsPegawaiDepartemen = () => {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue("--text-color");

    return {
        plugins: {
            legend: {
                display: false,
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
const fetchDataPegawaiUsiaDanJk = async (tglAwal, tglAkhir) => {
    try {
        let url = '/dashboardEis/findJumlahPegawaiFilterUsiadanJK?';
        if (tglAwal && tglAkhir) {
            const tglAwalEpoch = Math.floor(tglAwal / 1000); // Mengonversi tglAwal ke epoch detik
            const tglAkhirEpoch = Math.floor(tglAkhir / 1000); // Mengonversi tglAkhir ke epoch detik
            url += `tglAwal=${tglAwalEpoch}&tglAkhir=${tglAkhirEpoch}`;
        }

        // Tambahkan parameter info dan kdRuangan dari dropdown jika dipilih
        if (selectedKdDepartemen.value && selectedKdRuangan.value) {
            url += `&kdDepartemen=${selectedKdDepartemen.value}&kdRuangan=${selectedKdRuangan.value}`;
        }
        // Tambahkan parameter jika hanya info dipilih
        if (selectedInfo.value) {
            url += `&info=${selectedInfo.value}`;
        }

        const response = await hrisServiceHr1Mod1.get(
            url,
            {
                headers: {
                    "x-auth-token": `${token}`,
                },
            }
        );
        const data = response.data.data.data;
        // console.log(data);
        chartPegawaiUsiaDanJK.value = setChartPegawaiUsiaDanJK(data);
        chartOptionsPegawaiUsiaDanJK.value = setChartOptionsPegawaiUsiaDanJK();
        // untuk datatable
        responseDataPegawaiUsiaDanJK.value = data;
        // console.log(responseDataPegawaiUsiaDanJk);
    } catch (error) {
        console.error("Error fetching Usia dan JK", error);
    }
};

const setChartPegawaiUsiaDanJK = (data) => {
    // Ekstraksi data untuk chart
    const documentStyle = getComputedStyle(document.documentElement);

    const labels = data.map((item) => item.nama);
    const reversedData = data.slice().reverse(); // dibalik datanya
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

const setChartOptionsPegawaiUsiaDanJK = () => {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue("--text-color");

    return {
        indexAxis: 'y',
        plugins: {
            legend: {
                display: top,
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

//initial untuk Pengajuan Harian
let namaCount = {};
let namaJenisKeputusanCount = {
    'Disetujui': 0,
    'Tidak Disetujui': 0
};

const fetchDataPengajuanHarian = async (tglAwal, tglAkhir) => {
    try {
        let url = '/pegawaiStatusController/findSemuaStatus?';
        if (tglAwal && tglAkhir) {
            const tglAwalEpoch = Math.floor(tglAwal / 1000); // Mengonversi tglAwal ke epoch detik
            const tglAkhirEpoch = Math.floor(tglAkhir / 1000); // Mengonversi tglAkhir ke epoch detik
            url += `tglAwal=${tglAwalEpoch}&tglAkhir=${tglAkhirEpoch}`;
        }

        // Tambahkan parameter info dan kdRuangan dari dropdown jika dipilih
        if (selectedKdDepartemen.value && selectedKdRuangan.value) {
            url += `&kdDepartemen=${selectedKdDepartemen.value}&kdRuangan=${selectedKdRuangan.value}`;
        }
        // Tambahkan parameter jika hanya info dipilih
        if (selectedInfo.value) {
            url += `&info=${selectedInfo.value}`;
        }

        const response = await hrisServiceHr1Mod1.get(
            url,
            {
                headers: {
                    "x-auth-token": `${token}`,
                },
            }
        );
        const data = response.data.data;
        data.forEach((item) => {
            namaCount[item.nama] = (namaCount[item.nama] || 0) + 1;
            if (item.namaJenisKeputusan === 'Disetujui') {
                namaJenisKeputusanCount['Disetujui'] += 1;
            } else if (item.namaJenisKeputusan === 'Tidak Disetujui') {
                namaJenisKeputusanCount['Tidak Disetujui'] += 1;
            }
        });

        chartPengajuanHarian.value = setChartPengajuanHarian(namaCount, namaJenisKeputusanCount);
        chartOptionsPengajuanHarian.value = setChartOptionsPengajuanHarian();

        // Setel data untuk datatable
        responseDataPengajuanHarian.value = Object.keys(namaCount).map((nama) => ({
            nama: nama,
            jumlahPengajuan: namaCount[nama] || 0,
            status: namaJenisKeputusanCount,
        }));

    } catch (error) {
        console.error("Error fetching Pengajuan Harian", error);
    }
};

const setChartPengajuanHarian = (namaCount, namaJenisKeputusanCount) => {
    const labels = Object.keys(namaCount); // Mengambil nama unik sebagai label
    const seriesDataPengajuan = Object.values(namaCount); // Mengambil jumlah kemunculan sebagai seriesData
    const seriesDataDisetujui = [namaJenisKeputusanCount['Disetujui']];
    const seriesDataTidakDisetujui = [namaJenisKeputusanCount['Tidak Disetujui']];

    // Menghasilkan warna secara dinamis berdasarkan jumlah dataset
    const dynamicColors = (count) => {
        const colors = [];
        for (let i = 0; i < count; i++) {
            colors.push(`rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)})`);
        }
        return colors;
    };

    // Mendapatkan jumlah warna yang diperlukan untuk setiap dataset
    const numColorsPengajuan = labels.length;
    const numColorsDisetujui = 1; // Satu warna untuk dataset disetujui
    const numColorsTidakDisetujui = 1; // Satu warna untuk dataset tidak disetujui

    // Mendapatkan array warna untuk setiap dataset
    const backgroundColorsPengajuan = dynamicColors(numColorsPengajuan);
    const backgroundColorsDisetujui = dynamicColors(numColorsDisetujui);
    const backgroundColorsTidakDisetujui = dynamicColors(numColorsTidakDisetujui);

    const hoverBackgroundColors = dynamicColors(labels.length);

    return {
        labels: labels,
        datasets: [
            {
                label: 'Jumlah Pengajuan',
                data: seriesDataPengajuan,
                backgroundColor: backgroundColorsPengajuan,
                hoverBackgroundColor: hoverBackgroundColors
            },
            {
                label: 'Jumlah Yang Disetujui',
                data: seriesDataDisetujui,
                backgroundColor: backgroundColorsDisetujui,
                hoverBackgroundColor: hoverBackgroundColors
            },
            {
                label: 'Jumlah Yang Tidak Disetujui',
                data: seriesDataTidakDisetujui,
                backgroundColor: backgroundColorsTidakDisetujui,
                hoverBackgroundColor: hoverBackgroundColors
            },
        ],
    };
};



const setChartOptionsPengajuanHarian = () => {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue("--text-color");

    return {
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
    };
};
</script>