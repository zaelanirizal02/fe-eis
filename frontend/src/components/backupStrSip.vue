<template>
    <div style="padding: 25px 50px 0px 100px;" class="col">
        <div v-if="filteredData.length > 0" class="scrollable-container">
            <div class="row" v-for="item in filteredData" :key="item.id">
                <img :src="item.photoDiri" alt="Foto Profil"
                    style="width:100px; height:100px; border-radius:50%; margin-right: 200px;" />
                <div class="cell">
                    <div class="information">
                        <h3><strong> {{ item.namaLengkap }}</strong></h3>
                        <ul>
                            <li>Jabatan: {{ item.jabatan }}</li>
                            <li>Departemen: {{ item.namaDepartemen }}</li>
                            <li>No STR: {{ item.str?.noDokumen }}</li>
                            <li>Tgl Berlaku Akhir STR: {{ new
            Date(item.str?.tglAkhirBerlaku).toLocaleDateString('id-ID') }}</li>
                            <li>No SIP: {{ item.sip?.noDokumen }}</li>
                            <li>Tgl Berlaku Akhir SIP: {{ new
            Date(item.sip?.tglAkhirBerlaku).toLocaleDateString('id-ID') }}</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
        <div v-else>
            Data belum tersedia.
        </div>
    </div>
</template>

<style scoped>
.col {
    display: flex;
    flex-direction: column;
}

.scrollable-container {
    max-height: 400px;
    /* Atur tinggi maksimum kontainer */
    overflow-y: auto;
    /* Atur konten menjadi scrolable secara vertikal */
}

.row {
    display: flex;
    align-items: center;
    margin-bottom: 20px;
}

.cell {
    flex: 1;
}

.information {
    text-align: left;
}
</style>

<script setup>
import { ref } from "vue";
import { hrisServiceHr1Mod1, hrisServiceAuthInfo, token } from '../api/index';

const filteredData = ref([]);

async function fetchDataStrSip() {
    try {
        const response = await hrisServiceHr1Mod1.get(
            "riwayat-dokumen/findStrSip?page=1&rows=60&sort=desc&dir=id.kode",
            {
                headers: {
                    "x-auth-token": `${token}`,
                },
            }
        );
        const data = response.data.data.data;

        // Tambahkan properti photoDiri ke setiap objek dalam array data
        const updatedData = data.map(item => {
            // Membuat URL foto berdasarkan data pada item
            const photoDiri = item.photoDiri
                ? `http://bdg2.jasamedika.com:2304/authInfo/image/showPhotos/${encodeURIComponent(item.photoDiri)}`
                : `http://bdg2.jasamedika.com:2304/authInfo/image/show/${encodeURIComponent(item.photoDiri)}`

            // console.log(photoDiri)
            // Mengembalikan objek baru yang sudah diperbarui dengan URL foto
            return {
                ...item,
                photoDiri: photoDiri,
            };
        });

        // Filter data untuk hanya menyertakan objek dengan field 'str' atau 'sip' yang tidak kosong
        const filteredDataWithStrOrSip = updatedData.filter(item => (item.str && Object.keys(item.str).length > 0) || (item.sip && Object.keys(item.sip).length > 0));

        // Menetapkan nilai filteredData dengan filteredDataWithStrOrSip yang telah diperbarui
        filteredData.value = filteredDataWithStrOrSip;
        // console.log(filteredDataWithStrOrSip);
    } catch (error) {
        console.error("Error fetching data STR SIP ", error);
    }
}

// Panggil fungsi fetchDataStrSip saat komponen dimuat
fetchDataStrSip();
</script>
