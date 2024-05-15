<template>
    <Menubar class="menubar">
        <template #start>
            <div class="p-d-flex">
                <Calendar v-model="selectedStartDate" :input="showCalendar" class="mr-2" placeholder="Tgl Awal"
                    :showIcon="true" dateFormat="dd/mm/yy" style="width: 120px;" />
                <Calendar v-model="selectedEndDate" :input="showCalendar" class="mr-2" placeholder="Tgl Akhir"
                    :showIcon="true" dateFormat="dd/mm/yy" style="width: 120px;" :appendTo="body" />
                <Dropdown v-model="selectedInfo" :options="dropdownUnit" optionLabel="label" optionValue="value"
                    placeholder="Pilih Departemen" class="mr-2" />

                <Dropdown v-model="selectedKdRuangan" :options="dropdownRuangan" optionLabel="label" optionValue="value"
                    placeholder="Pilih Unit Kerja" class="mr-2" />
                <Button @click="searchData" label="Cari" icon="pi pi-search" class="mr-2" />
            </div>
        </template>


    </Menubar>

    <DataTable :value="responseDataJenisKelamin" tableStyle="min-width: 50rem">
        <Column field="nama" header="jenis"></Column>
        <Column field="jumlah" header="jumlah"></Column>
    </DataTable>

    <strSip />


</template>

<script setup>
import { ref, onMounted } from "vue";
import { hrisServiceHr1Mod1, token } from "../api/index";
import strSip from "./strSip.vue";

const searchClicked = ref(false); // Tandai apakah tombol pencarian telah diklik

// Dropdown untuk ruangan dan info HRD
const selectedInfo = ref(null);
const selectedKdRuangan = ref(null); // Nilai kdRuangan yang sesuai dengan dropdown ruangan

// Data dropdown ruangan dan info HRD
const dropdownUnit = [{ value: "", label: "--Pilih" },
{ value: "hrd", label: "HRD" },
{ value: "ruangan", label: "Ruangan" }/* Isi dengan opsi dropdown ruangan */];
const dropdownRuangan = [{ value: "", label: "--Pilih" },

{ value: "001", label: "Pusat" },
{ value: "002", label: "HRD" },
{ value: "089", label: "Project" },/* Isi dengan opsi dropdown info HRD */];

const selectedStartDate = ref(); // Tanggal awal default
const selectedEndDate = ref(); // Tanggal akhir default
const showCalendar = ref(false);
const responseDataJenisKelamin = ref([]);

const searchData = () => {
    searchClicked.value = true; // Tandai bahwa tombol pencarian telah diklik
    const tglAwal = selectedStartDate.value ? selectedStartDate.value.getTime() : null; // Ubah tanggal ke epoch jika dipilih
    const tglAkhir = selectedEndDate.value ? selectedEndDate.value.getTime() : null; // Ubah tanggal ke epoch jika dipilih

    // Ambil nilai dari dropdown ruangan dan info HRD
    const info = selectedInfo.value ? selectedInfo.value : null;
    const kdRuangan = selectedKdRuangan.value;

    // Buat parameter filter info dan kdRuangan
    const filters = [];
    if (info) {
        filters.push(`info=${info}`);
    }
    if (kdRuangan) {
        filters.push(`kdRuangan=${kdRuangan}`);
    }

    // Kirim permintaan API dengan parameter filter tambahan
    fetchDataJenisKelamin(tglAwal, tglAkhir, filters);
};



// Fungsi untuk mengambil data jenis kelamin
const fetchDataJenisKelamin = async (tglAwal, tglAkhir) => {
    try {
        let url = '/dashboardEis/findJumlahPegawaiFilterJenisKelamin?';
        if (tglAwal && tglAkhir) {
            const tglAwalEpoch = Math.floor(tglAwal / 1000); // Mengonversi tglAwal ke epoch detik
            const tglAkhirEpoch = Math.floor(tglAkhir / 1000); // Mengonversi tglAkhir ke epoch detik
            url += `tglAwal=${tglAwalEpoch}&tglAkhir=${tglAkhirEpoch}`;
        }

        // Tambahkan parameter info dan kdRuangan dari dropdown jika dipilih
        if (selectedInfo.value && selectedKdRuangan.value) {
            url += `&info=${selectedInfo.value}&kdRuangan=${selectedKdRuangan.value}`;
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

// Memanggil fetchDataJenisKelamin ketika komponen telah diinisialisasi
onMounted(async () => {
    await fetchDataJenisKelamin(); // Tanpa argumen, sehingga akan menampilkan semua data
});
</script>
