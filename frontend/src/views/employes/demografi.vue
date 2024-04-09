<template>
    <div class="my-container">

        <menubar />
        <h1>TESTING</h1>


        <div class="card flex justify-content-center">
            <div class="flex flex-column gap-3">
                <div v-for="category in categories" :key="category.key" class="flex align-items-center">
                    <RadioButton v-model="selectedCategory" :inputId="category.key" name="dynamic"
                        :value="category.name" />
                    <label :for="category.key" class="ml-2">{{ category.name }}</label>
                </div>
            </div>
        </div>



        <template>
            <div class="card flex justify-content-center">
                <Calendar v-model="date" :minDate="minDate" :maxDate="maxDate" :manualInput="false" />
            </div>
        </template>

        <button @click="filterDataDashboard">Fetch Data JK</button>




        <!-- <pendidikanTerakhirChart />
        <pegawaiDepartemenChart />
        <pegawaiMasaKerjaChart />
        <statusPajakPTKPChart /> -->
        <cobaChart />
        <strSip />

    </div>

</template>

<script>
import menubar from './menubar.vue';
import employesController from '../../controller/employes-controller';
import filterController from '../../controller/filter-controller';
import pendidikanTerakhirChart from '../../components/pendidikanTerakhirChart.vue';
import pegawaiDepartemenChart from '../../components/pegawaiDepartemenChart.vue';
import pegawaiMasaKerjaChart from '../../components/pegawaiMasaKerjaChart.vue';
import statusPajakPTKPChart from '../../components/statusPajakPTKPChart.vue';
import cobaChart from '../../components/cobaChart.vue';
import strSip from '../../components/strSip.vue';
// import ProductService from '../../service/ProductService'


export default {
    mixins: [employesController, filterController],
    components: {
        // employesController,
        menubar,
        pendidikanTerakhirChart,
        pegawaiDepartemenChart,
        pegawaiMasaKerjaChart,
        statusPajakPTKPChart,
        strSip,
        cobaChart
        // ProductService
    },
}
</script>