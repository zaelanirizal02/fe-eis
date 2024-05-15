<template>
    <div class="my-container">
        <Menubar :model="items" class="sticky-menubar" position="sticky" top="0">
            <!-- Konten lainnya -->
            <template #end>
                <Dropdown v-model="selectedCategory" :options="responseDataPegawaiTotalDropdown" optionLabel="nama"
                    placeholder="Unit Kerja" class="mr-2">
                    <template #option="{ option }">
                        <div class="flex align-items-center">
                            <Checkbox :inputId="option.key" :value="option.namaRuangan" v-model="selectedCategory" />
                            <label :for="option.key" class="ml-2">{{ option.namaRuangan }}</label>
                        </div>
                    </template>
                </Dropdown>

                <!-- Dropdown untuk memilih info -->

                <!-- <Dropdown v-model="selectedInfo" :options="infoOptions" optionLabel="label" placeholder="Info"
                    class="mr-2" /> -->

                <select v-model="selectedInfo">
                    <option value="hrd">HRD</option>
                    <option value="ruangan">Ruangan</option>
                </select>
                <button @click="searchData">Cari</button>


                <!-- Dropdown untuk memilih tanggal akhir -->
                <Calendar v-model="tglAkhir" :input="showCalendar" class="mr-2" placeholder="Tgl Akhir" :showIcon="true"
                    dateFormat="dd/mm/yy" style="width: 120px;" />

                <!-- Tombol untuk melakukan pencarian -->
                <!-- <Button @click="searchByDateRange" label="Cari" icon="pi pi-search" /> -->
            </template>
        </Menubar>

        <h1>TESTING</h1>
        <!-- <button @click="jumlahPegawaiTotalDropdown">Fetch Data JK</button> -->


        <!-- <div class="card flex justify-content-center">
            <div class="flex flex-column gap-3">
                <div v-for="category in categories" :key="category.key" class="flex align-items-center">
                    <RadioButton v-model="selectedCategory" :inputId="category.key" name="dynamic"
                        :value="category.name" />
                    <label :for="category.key" class="ml-2">{{ category.name }}</label>
                </div>
            </div>
        </div> -->

        <!-- <div class="card flex justify-content-center">
            <Calendar v-model="tglAkhir" :minDate="new Date('2000-01-01')" :maxDate="maxDate" :manualInput="false" />
        </div> -->

        <!-- <button @click="jumlahPegawaiTotalDropdown2">Fetch Data JK</button> -->




        <div class="grid">

            <div class="col-md-4">
                <DataTable :value="responseDataJabatanTotal" tableStyle="min-width:100%" class="custom-datatable">
                    <Column field="index" header="No" :style="{ 'width': '3em' }">

                        <template #body="props">
                            {{ props.index + 1 }}
                        </template>
                    </Column>
                    <Column field="nama" header="Departemen">
                    </Column>
                    <Column field="jumlah" header="Total"></Column>
                </DataTable>
            </div>
            <!-- <div class="col-md-4" style="padding-left: 20px;">
                <DataTable :value="responseDataPendidikanTerakhir" tableStyle="min-width:100%" class="custom-datatable">
                    <Column field="index" header="No" :style="{ 'width': '3em' }">

                        <template #body="props">
                            {{ props.index + 1 }}
                        </template>
                    </Column>
                    <Column field="nama" header="Tingkat">
                    </Column>
                    <Column field="jumlah" header="Total"></Column>
                </DataTable>
            </div> -->
            <div class="col">
                <pegawaiDepartemenChart />
                <masterChart />
            </div>

            <!-- <referensiChart /> -->
            <!-- <div class="col-md-4">
                <div class="col-md-4">
                    <pegawaiMasaKerjaChart />
                </div>
                <pendidikanTerakhirChart />
            </div>
            <div class="col-md-4">
                <statusPajakPTKPChart />
            </div>
            <div class="col-sm-4"></div> -->
        </div>
        <!-- <cobaChart />
        <pengajuanHarianChart />
        <biayaPajakPerBulanChart />
        <biayaBpjsPerBulanChart />
        <menampilkanKaryawabTeladan />
        <pengajuanPinjamanPersonalChart />
        <totalGajiPerBulanChart /> -->

        <!-- <strSip /> -->
    </div>
</template>

<script>


import menubar from './menubar.vue';
// import employesController from '../../controller/employes-controller';
// import filterController from '../../controller/filter-controller';
import pendidikanTerakhirChart from '../../components/pendidikanTerakhirChart.vue';
import pegawaiDepartemenChart from '../../components/pegawaiDepartemenChart.vue';
import pegawaiMasaKerjaChart from '../../components/pegawaiMasaKerjaChart.vue';
import statusPajakPTKPChart from '../../components/statusPajakPTKPChart.vue';
import cobaChart from '../../components/cobaChart.vue';
import strSip from '../../components/strSip.vue';
import pengajuanPinjamanPersonalChart from '../../components/pengajuanPinjamanPersonalChart.vue';
import pengajuanHarianChart from '../../components/pengajuanHarianChart.vue';
import biayaPajakPerBulanChart from '../../components/biayaPajakPerBulanChart.vue';
import biayaBpjsPerBulanChart from '../../components/biayaBpjsPerBulanChart.vue';
import menampilkanKaryawabTeladan from '../../components/menampilkanKaryawabTeladan.vue';
import totalGajiPerBulanChart from '../../components/totalGajiPerBulanChart.vue';


import masterChart from '../../components/masterChart.vue';
// import referensiChart from '../../components/referensiChart.vue';
// import componentModule from '../../components/componentModule';
// import ProductService from '../../service/ProductService'


export default {
    // mixins: [filterController],
    components: {
        // employesController,
        menubar,
        // componentModule,

        pendidikanTerakhirChart,
        pegawaiDepartemenChart,
        pegawaiMasaKerjaChart,
        statusPajakPTKPChart,
        strSip,
        cobaChart,
        pengajuanPinjamanPersonalChart,
        pengajuanHarianChart,
        biayaPajakPerBulanChart,
        biayaBpjsPerBulanChart,
        totalGajiPerBulanChart,
        menampilkanKaryawabTeladan,

        masterChart,
        // referensiChart,
        // ProductService
    },
}
</script>
