import {
    // dataMaster,
//   hrisServiceHr1Mod1,
    // hrisServiceHr2Mod3,
    dataMaster,
//   hrisServiceAuthInfo,
  token,
} from "../api/index";

import Dropdown from "primevue/dropdown";
import Column from "primevue/column";

export default {
    components: {
    Column,
    Dropdown,
  },
  props: {
    // define any props here if needed
  },
  data() {
    return {
      representatives: [], // array to store representative data
    };
  },
  created() {
    // call the method to fetch and prepare data
    this.filterDataDashboard();
  },
    mounted() {
        this.filterDataDashboard();
    },
    methods: {
        async filterDataDashboard2() {
            try {
                // const response = await hrisServiceHr2Mod3.get(
                const response = await dataMaster.get(
                    "service/list-generic?table=Ruangan&page=1&rows=1000&criteria=kdRuanganHead&values=001&condition=and&profile=y",
                    // "pegawai-histori-kelompokkerja/findPegawaiByRuanganRev?kdRuangan=' + unitKerja.toString() + '&status=' + this.form.get('kdStatusPegawai').value + '&namaPegawai=' + ''",
                    {
                        headers: {
                            "x-auth-token": `${token}`,
                        },
                    }
                );
                this.responDataFilterDataDashboard = response.data.data.data;
                console.log(this.responDataFilterDataDashboard);
            } catch (error) {
                console.error("error fetching filter Dashboard", error);
            }
        },

       async filterDataDashboard() {
    try {
        const response = await dataMaster.get(
            "service/list-generic?table=Ruangan&page=1&rows=1000&criteria=kdRuanganHead&values=001&condition=and&profile=y",
            {
                headers: {
                    "x-auth-token": `${token}`,
                },
            }
        );
        this.responDataFilterDataDashboard = response.data.data.data;
        // Ambil data representatif dari respons API dan simpan dalam array representatives
        this.representatives = this.responDataFilterDataDashboard.map(item => ({
            name: item.namaRuangan, // Ubah sesuai dengan properti nama yang sesuai dari respons API
        }));
        console.log(this.responDataFilterDataDashboard);
    } catch (error) {
        console.error("error fetching filter Dashboard", error);
    }
},



    }
}