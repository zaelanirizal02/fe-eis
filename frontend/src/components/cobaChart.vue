<template>
    <!-- <Calendar v-model="selectedStartDate" :minDate="minDate" :maxDate="selectedEndDate" /> -->
    <Calendar v-model="selectedStartDate" :input="showCalendar" class="mr-2" placeholder="Tgl Awal" :showIcon="true"
        dateFormat="dd/mm/yy" style="width: 120px;" />
    <!-- <Calendar v-model="selectedEndDate" :minDate="minDate" /> -->
    <Calendar v-model="selectedEndDate" :input="showCalendar" class="mr-2" placeholder="Tgl Akhir" :showIcon="true"
        dateFormat="dd/mm/yy" style="width: 120px;" />
    <!-- <select v-model="selectedInfo">
        <option value="hrd">HRD</option>
        <option value="ruangan">Ruangan</option>
    </select> -->
    <select v-model="selectedInfo">
        <option v-for="(option, index) in dropdownUnit" :key="index" :value="option.value">{{ option.label }}
        </option>
    </select>
    <select v-model="selectedKdRuangan">
        <option v-for="(option, index) in dropdownRuangan" :key="index" :value="option.value">{{ option.label }}
        </option>
    </select>
    <!-- <Dropdown v-model="selectedInfo" :options="dropdownOptions" optionLabel="label" placeholder="Info" class="mr-2" /> -->

    <button @click="searchData">Cari</button>

</template>

<script>

</script>