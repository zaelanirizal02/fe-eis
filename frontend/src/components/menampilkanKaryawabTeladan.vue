<template>
    <div class="card">
        <DataTable :value="displayedData" tableStyle="min-width: 50rem">
            <Column field="index" header="Peringkat" :style="{ 'width': '3em' }">
                <template #body="rowData">
                    {{ rowData.index + 1 }}
                </template>
            </Column>
            <Column field="namaLengkap" header="Nama"></Column>
            <Column field="namaDepartemen" header="Departemen"></Column>
            <Column field="namaRuangKerja" header="Ruang Kerja"></Column>
        </DataTable>
    </div>
</template>

<script>
import { hrisServiceHr1Mod1, token } from "../api/index";
import DataTable from "primevue/datatable";
import Column from "primevue/column";

export default {
    components: {
        DataTable,
        Column,
    },
    data() {
        return {
            responseDataMenampilkanKaryawanTeladan: [],
            displayedData: [],
        };
    },
    mounted() {
        this.menampilkanKaryawanTeladan();
    },
    methods: {
        async menampilkanKaryawanTeladan() {
            try {
                const response = await hrisServiceHr1Mod1.get(
                    "registrasiPegawai/findPegawaiTeladan",
                    {
                        headers: {
                            "x-auth-token": `${token}`,
                        },
                    }
                );
                const data = response.data.data;
                const peringkatArray = Object.values(data).map((item, index) => ({
                    index: index + 1,
                    namaLengkap: item.namaLengkap,
                    namaDepartemen: item.namaDepartemen,
                    namaRuangKerja: item.namaRuangKerja,
                }));

                // Mengatur jumlah data yang akan ditampilkan (misalnya 3)
                this.displayedData = peringkatArray.slice(0, 3);
            } catch (error) {
                console.error("error fetching service", error);
            }
        },
    },
};
</script>
