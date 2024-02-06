// import employesService from "../service/employes-service";
import { api, hrisService, token } from "../api/index";

import DataTable from "primevue/datatable";
import Column from "primevue/column";

export default {
  components: {
    DataTable,
    Column,
  },
  data() {
    return {
      visible: false, //dialog opener
      filterNama: "",
      responseData: [],
      responseDataHris: [],
      responseDataHrisJenisKelamin: [],
      responseDataJabatanDepartemenTotal: [],
      responseDataPendidikanTerakhir: [],

      items: [
        {
          label: "Home",
          icon: "pi pi-home",
        },
        {
          label: "Features",
          icon: "pi pi-star",
        },
        {
          label: "Projects",
          icon: "pi pi-search",
          items: [
            {
              label: "Core",
              icon: "pi pi-bolt",
              shortcut: "⌘+S",
            },
            {
              label: "Blocks",
              icon: "pi pi-server",
              shortcut: "⌘+B",
            },
            {
              label: "UI Kit",
              icon: "pi pi-pencil",
              shortcut: "⌘+U",
            },
            {
              separator: true,
            },
            {
              label: "Templates",
              icon: "pi pi-palette",
              items: [
                {
                  label: "Apollo",
                  icon: "pi pi-palette",
                  badge: 2,
                },
                {
                  label: "Ultima",
                  icon: "pi pi-palette",
                  badge: 3,
                },
              ],
            },
          ],
        },
        {
          label: "Contact",
          icon: "pi pi-envelope",
          badge: 3,
        },
      ],

      // RENDER CHART++++++++++++

      totalData: 0,
      customer: null,
    };
  },

  mounted() {
    this.fetchData();
    this.fetchDataHris();
    this.fetchDataHrisJenisKelamin();
    this.jabatanDepartemenTotal();
    this.pendidikanTerakhir();
    this.search();
  },
  methods: {
    // ...employesService,
    async fetchDataHris() {
      try {
        const response = await hrisService.get(
          "registrasiPegawai/findJumlahPegawaiFilterAbsensi",
          {
            headers: {
              "x-auth-token": `${token}`,
            },
          }
        );
        this.responseDataHris = response.data.data.jumlahPegawaiFilter;
        // console.log(this.responseDataHris);
      } catch (error) {
        console.error("error fetching Service", error);
      }
    },

    async fetchDataHrisJenisKelamin() {
      try {
        const response = await hrisService.get(
          "registrasiPegawai/findJumlahPegawaiFilterJenisKelamin",
          {
            headers: {
              "x-auth-token": `${token}`,
            },
          }
        );
        this.responseDataHrisJenisKelamin =
          response.data.data.jumlahPegawaiFilter;
        // console.log(this.responseDataHrisJenisKelamin);
      } catch (error) {
        console.error("error fetching Service", error);
      }
    },

    async jabatanDepartemenTotal() {
      try {
        const response = await hrisService.get(
          "registrasiPegawai/findJumlahJabatan",
          {
            headers: {
              "x-auth-token": `${token}`,
            },
          }
        );
        this.responseDataJabatanDepartemenTotal =
          response.data.data.jabatanDepartemenTotal;
        console.log(this.responseDataJabatanDepartemenTotal);
      } catch (error) {
        console.error("Error Fetching Data Jabatan Departemen", error);
      }
    },
    async pendidikanTerakhir() {
      try {
        const response = await hrisService.get(
          "registrasiPegawai/findJumlahPegawaiFilterPendidikan",
          {
            headers: {
              "x-auth-token": `${token}`,
            },
          }
        );
        this.responseDataPendidikanTerakhir =
          response.data.data.jumlahPegawaiFilter;
        // console.log(this.responseDataPendidikanTerakhir);
      } catch (error) {
        console.error("Error Fetching Data Pendidikan Terakhir", error);
      }
    },

    async fetchData() {
      try {
        const response = await api.get("api/employes");
        this.responseData = response.data;
        // console.log(this.responseData);

        //hitung total data
        this.totalData = this.responseData.length;

        //panggil metode chart untuk mengatur data chart
        // this.setChartPGender();
        // this.setChartPStatus();
        // this.setChartPLokasi();
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    },
    //========================= CHART =========================

    async search(keyword) {
      try {
        if (this.filterNama) {
          const response = await api.get(`api/employes/search?nama=${keyword}`);
          this.responseData = response.data;
        } else {
          this.fetchData();
        }
      } catch (error) {
        // handle error
        console.error("Error during search", error);
      }
    },
    buttonSearchNama() {
      this.search(this.filterNama);
    },
  },
};
