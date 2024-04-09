<template>
    <div class="my-container">

        <menubar />
        <div class="row">
            <div class="col-6" style=" width: 100%">
                <div class="grid">
                    <div class="col">
                        <div class="text-center border-round-lg">
                            <div class="chart-card">
                                <div class="card">
                                    <div class="navbar tinggi-nav-radius" style="background-color: rgb(88, 158, 216);">
                                        <!-- Tambahkan elemen-elemen navbar di sini -->
                                        <span class="navbar-item tPutih">Kehadiran</span>
                                    </div>

                                    <div class="grid">
                                        <div class="col">
                                            <DataTable ref="dt" :value="responseDataRekapByRuanganHarian"
                                                :scrollable="true" scrollHeight="500px" :paginator="false" :rows="5"
                                                tableStyle="min-width:100%;"
                                                class="custom-datatable responsive-datatable">

                                                <template #header>
                                                    <div class="p-grid p-nogutter p-align-left">
                                                        <div class="p-col">
                                                            <!-- Tempatkan kotak pencarian di sini -->

                                                        </div>
                                                        <div class="p-col-fixed" style="width: 100px;">
                                                            <!-- Tempatkan tombol export di sini -->
                                                            <Button icon="pi pi-external-link" label="Export"
                                                                @click="exportCSV($event)" />
                                                        </div>
                                                    </div>
                                                </template>

                                                <Column field="index" header="No" :style="{ 'width': '3em' }">
                                                    <!-- Gunakan slot "body" untuk menampilkan nomor urut -->

                                                    <template #body="props">
                                                        {{ props.index + 1 }}
                                                    </template>
                                                </Column>
                                                <Column header="Foto" :style="{ width: '100px' }">

                                                    <template #body="props">
                                                        <img :src="props.data.photoUrl" alt=""
                                                            style="max-width: 50%; max-height: 100px;"> </template>
                                                </Column>

                                                <Column field="namaLengkap" header="Nama"></Column>
                                                <Column field="tanggalString" header="Tanggal"></Column>
                                                <Column field="checkIn" header="Check In"></Column>
                                                <Column field="checkOut" header="Check Out"></Column>
                                                <Column field="jadwalMasuk" header="Jadwal Masuk"></Column>
                                                <Column field="jadwalPulang" header="Jadwal Pulang"></Column>
                                                <!-- Tambahkan kolom lain sesuai kebutuhan -->
                                            </DataTable>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    </div>

</template>

<script>
import menubar from './menubar.vue';
import employesController from '../../controller/employes-controller';
import pendidikanTerakhirChart from '../../components/pendidikanTerakhirChart.vue';
import pegawaiDepartemenChart from '../../components/pegawaiDepartemenChart.vue';
import pegawaiMasaKerjaChart from '../../components/pegawaiMasaKerjaChart.vue';


export default {
    mixins: [employesController],
    components: {
        // employesController,
        menubar,
        pendidikanTerakhirChart,
        pegawaiDepartemenChart,
        pegawaiMasaKerjaChart

    },
}
</script>