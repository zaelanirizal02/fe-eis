<template>
    <div style="padding: 25px 50px 20px 100px;" class="col">
        <div v-if="filteredData.length > 0" class="scrollable-container">
            <div class="row" v-for="item in filteredData" :key="item.kdPegawai">
                <img :src="item.photoUrl" alt="Foto Profil"
                    style="width:100px; height:100px; border-radius:50%; margin-right: 20px;" />
                <div class="cell">
                    <div class="information">
                        <h3><strong>{{ item.namaLengkap }}</strong></h3>
                        <ul>
                            <li>Jabatan: {{ item.jabatan }}</li>
                            <li>Departemen: {{ item.namaDepartemen }}</li>
                            <li>No STR: {{ item.str?.noDokumen || '-' }}</li>
                            <li>Tgl Berlaku Akhir STR: {{ item.str ? new
            Date(item.str.tglAkhirBerlaku).toLocaleDateString('id-ID') : '-' }}</li>
                            <li>No SIP: {{ item.sip?.noDokumen || '-' }}</li>
                            <li>Tgl Berlaku Akhir SIP: {{ item.sip ? new
            Date(item.sip.tglAkhirBerlaku).toLocaleDateString('id-ID') : '-' }}</li>
                        </ul>
                        <hr>
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
    overflow-y: auto;
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
    padding-left: 80px
}
</style>

<script>
import { hrisServiceHr1Mod1, token } from '../api/index';

export default {
    data() {
        return {
            responseDataRekapByRuanganHarian: [],
        };
    },
    computed: {
        filteredData() {
            // Filter data untuk hanya menyertakan objek dengan field 'str' atau 'sip' yang tidak kosong
            return this.responseDataRekapByRuanganHarian.filter(item => (item.str && Object.keys(item.str).length > 0) || (item.sip && Object.keys(item.sip).length > 0));
        }
    },
    mounted() {
        this.rekapByRuanganHarian();
    },
    methods: {
        async rekapByRuanganHarian() {
            try {
                const response = await hrisServiceHr1Mod1.get(
                    "riwayat-dokumen/findStrSip?page=1&rows=60&sort=desc&dir=id.kode",
                    {
                        headers: {
                            "x-auth-token": token,
                        },
                    }
                );

                // Memperbarui responseDataRekapByRuanganHarian dengan menambahkan URL foto
                this.responseDataRekapByRuanganHarian = response.data.data.data.map((item) => {
                    // Membuat URL foto berdasarkan data pada item
                    const photoUrl = item.photoDiri ? `http://bdg2.jasamedika.com:2304/authInfo/image/showPhotos/${item.photoDiri}` : '';
                    // Mengembalikan objek baru yang sudah diperbarui dengan URL foto
                    return {
                        ...item,
                        photoUrl: photoUrl,
                    };
                });

                console.log(this.responseDataRekapByRuanganHarian);
            } catch (error) {
                console.error("Error fetching data STR SIP ", error);
            }
        },
    },
};
</script>
