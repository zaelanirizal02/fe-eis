// import employesService from "../service/employes-service";
import {
  // api,
  hrisServiceHr1Mod1,
  hrisServiceHr2Mod3,
  hrisServiceAuthInfo,
  dataMaster,
  token,
} from "../api/index";

import DataTable from "primevue/datatable";
import Column from "primevue/column";
import ColorPicker from "primevue/colorpicker";


//KEPERLUAN CHART
import { ref, onMounted } from 'vue';
import Chart from 'primevue/chart';
import ChartDataLabels from 'chartjs-plugin-datalabels';
// import '../assets/css/buttonStyle.css';
// import '../views/employes/style.css';

//METHOD UNTUK CHART
export async function fetchDataDepartemenChart() {
  try {
    const response = await hrisServiceHr1Mod1.get(
      'registrasiPegawai/findJumlahPegawaiFilterDepartemen',
      {
        headers: {
          'x-auth-token': `${token}`,
        },
      }
    );
    const data = response.data.data.listPegawai;

    const labels = data.map((item) => item.namaDepartemen);
    const seriesData = data.map((item) => item.jumlah);

    const dynamicColors = (count) => {
      const colors = [];
      for (let i = 0; i < count; i++) {
        colors.push(`rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)})`);
      }
      return colors;
    };

    return {
      labels: labels,
      datasets: [{
        data: seriesData,
        backgroundColor: dynamicColors(labels.length),
        hoverBackgroundColor: dynamicColors(labels.length),
      }]
    };
  } catch (error) {
    console.error('Error Fetching chart Departemen', error);
    return null; // Mengembalikan null jika terjadi kesalahan
  }
}

export default {
  components: {
    DataTable,
    Column,
    ColorPicker,
  },
  data() {
    return {
      date: null,
      minDate: null,
      maxDate: null,
      currentDate: '',
       buttondisplay: null,
            icondisplay: null,
            templatedisplay: null,
      
      //dialog opener
      visible1: false, //dialog opener
      visible2: false,
      clickJenisKelamin: false,
      clickStatus: false,
      clickDepartemen: false,
      clickJabatan: false,
      clickUsiaDanJenisKelamin: false,
      clickMasaKerja: false,

      filterNama: "",
      responseData: [],
      responseDataHris: [],
      responseDataJenisKelamin: [],
      responseDataJabatanTotal: [],
      responseDataDepartemenTotal: [],
      responseDataPendidikanTerakhir: [],
      responseDataRekapByRuanganHarian: [],
      responseDataFilterLokasiKerja: [],
      responseDataFilterStatusPegawai: [],
      responseDataFotoDiri: [],
      responseDataUsiaDanJenisKelamin: [],
      responseDataPegawaiMasaKerja: [],
      responseDataPegawaiTotal: [],
      responseDataPegawaiTotalDropdown: [],

      // responDataPegawaiStrSip: [],
      items: [
        {
          label: "Dashboard",
          icon: "pi pi-home",
          command: () => {
            this.$router.push('/');
          }
        },
        {
          label: "Demografi",
          icon: "pi pi-star",
          command: () => {
            this.$router.push('/demografi');
          }
        },
        {
          label: "Kehadiran",
          icon: "pi pi-calendar",
          command: () => {
            this.$router.push('/kehadiran');
          }
        },
        {
          label: "Payroll",
          icon: "pi pi-dollar",
             command: () => {
            this.$router.push('/payroll');
          }
        },
      ],

      selectedCategory: [],
      categories: [
        { name: 'All', key: 'A' },
        { name: 'Departemen 1', key: 'M' },
        { name: 'Departemen 2', key: 'P' },
        { name: 'Production', key: 'R' }
      ],

      // selectedOption: null,
      // selectedRadio: null,
      // options: [
      //   { label: 'Pilihan 1', value: 'option1', options: ['Radio 1', 'Radio 2', 'Radio 3'] },
      //   { label: 'Pilihan 2', value: 'option2', options: ['Radio A', 'Radio B', 'Radio C'] },
      //   { label: 'Pilihan 3', value: 'option3', options: ['Radio X', 'Radio Y', 'Radio Z'] },
      // ],

      // selectedCity: null,
      // cities: [
      //   { name: 'New York', code: 'NY' },
      //   { name: 'Rome', code: 'RM' },
      //   { name: 'London', code: 'LDN' },
      //   { name: 'Istanbul', code: 'IST' },
      //   { name: 'Paris', code: 'PRS' }
      // ],

      // RENDER CHART++++++++++++

      customer: null,
    };
  },

  created() {
    let today = new Date();
    let month = today.getMonth();
    let year = today.getFullYear();
    let prevMonth = month === 0 ? 11 : month - 1;
    let prevYear = prevMonth === 11 ? year - 1 : year;
    let nextMonth = month === 11 ? 0 : month + 1;
    let nextYear = nextMonth === 0 ? year + 1 : year;

    this.minDate = new Date();
    this.minDate.setMonth(prevMonth);
    this.minDate.setFullYear(prevYear);
    this.maxDate = new Date();
    this.maxDate.setMonth(nextMonth);
    this.maxDate.setFullYear(nextYear);
  },


  mounted() {
    // this.fetchData();
    // this.search();
    // this.hitungTotalPegawai;
    this.fetchDataHris();
    this.filterJenisKelamin();
    this.rekapByRuanganHarian();
    this.filterJabatanTotal();
    this.filterDepartemenTotal();
    this.pendidikanTerakhir();
    this.filterLokasiKerja();
    this.filterStatusPegawai();
    // this.tampilFotoDiri();
    this.usiaDanJenisKelamin();

    // this.pegawaiStrSip();
    this.getCurrentDate();
    this.pegawaiMasaKerja();
    this.jumlahPegawaiTotal();
    this.jumlahPegawaiTotalDropdown();

    //CHART
  },
  methods: {

    //CHART Function

async fetchDataDepartemenChart() {
      try {
        const response = await hrisServiceHr1Mod1.get(
          'registrasiPegawai/findJumlahPegawaiFilterDepartemen',
          {
            headers: {
              'x-auth-token': `${token}`,
            },
          }
        );
        const data = response.data.data.listPegawai;

        const labels = data.map((item) => item.namaDepartemen);
        const seriesData = data.map((item) => item.jumlah);

        const dynamicColors = (count) => {
          const colors = [];
          for (let i = 0; i < count; i++) {
            colors.push(`rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)})`);
          }
          return colors;
        };

        this.chartData.labels = labels;
        this.chartData.datasets[0].data = seriesData;
        this.chartData.datasets[0].backgroundColor = dynamicColors(labels.length);

      } catch (error) {
        console.error('Error Fetching chart Departemen', error);
      }
    },


    getCurrentDate() {
      const today = new Date();
      const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
      this.currentDate = today.toLocaleDateString('id-ID', options);
    },
  
    // ...employesService,
    //keterangan kehadiran pegawai total
    async fetchDataHris() {
      try {
        const response = await hrisServiceHr1Mod1.get(
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

    //Absensi Harian
    async rekapByRuanganHarian() {
      try {
        const response = await hrisServiceHr2Mod3.get(
          "rekapitulasiAbsensiV2/findRekapByRuanganHarian",
          {
            headers: {
              "x-auth-token": `${token}`,
            },
          }
        );

        // Memperbarui responseDataRekapByRuanganHarian dengan menambahkan URL foto
        this.responseDataRekapByRuanganHarian =
          response.data.data.rekapAbsen.map((item) => {
            // Membuat URL foto berdasarkan data pada item
            const photoUrl = item.imagePegawaiIn
              ? `http://bdg2.jasamedika.com:2304/authInfo/image/showPhotos/${item.imagePegawaiIn}`
              : `http://bdg2.jasamedika.com:2304/authInfo/image/show/${item.photoDiri}`;
            // Mengembalikan objek baru yang sudah diperbarui dengan URL foto
            return {
              ...item,
              photoUrl: photoUrl,
            };
          });

        console.log(this.responseDataRekapByRuanganHarian);
      } catch (error) {
        console.error("error fetching service", error);
      }
    },

    //menampilkan foto absensi
    // async tampilFotoDiri() {
    //   try {
    //     const response = await hrisServiceAuthInfo.get("image/showPhotos", {
    //       headers: {
    //         "x-auth-token": `${token}`,
    //       },
    //     });
    //     this.responseDataFotoDiri = response;
    //     // console.log(this.responseDataFotoDiri);
    //   } catch (error) {
    //     console.error("error fetching service", error);
    //   }
    // },

    async filterJenisKelamin() {
      try {
        const response = await hrisServiceHr1Mod1.get(
          "registrasiPegawai/findJumlahPegawaiFilterJenisKelamin",
          {
            headers: {
              "x-auth-token": `${token}`,
            },
          }
        );
        this.responseDataJenisKelamin = response.data.data.jumlahPegawaiFilter;
        // console.log(this.responseDataJenisKelamin);
      } catch (error) {
        console.error("error fetching Service", error);
      }
    },

    async usiaDanJenisKelamin() {
      try {
        const response = await hrisServiceHr1Mod1.get(
          "registrasiPegawai/findJumlahPegawaiFilterUsiadanJK",
          {
            headers: {
              "x-auth-token": `${token}`,
            },
          }
        );
        this.responseDataUsiaDanJenisKelamin = response.data.data.data;
        // console.log(this.responseDataUsiaDanJenisKelamin);
      } catch (error) {
        console.error("error fetching Service", error);
      }
    },

    async filterJabatanTotal() {
      try {
        const response = await hrisServiceHr1Mod1.get(
          "registrasiPegawai/findJumlahJabatan",
          {
            headers: {
              "x-auth-token": `${token}`,
            },
          }
        );
        this.responseDataJabatanTotal = response.data.data.jabatanTotal;
        // console.log(this.responseDataJabatanTotal);
      } catch (error) {
        console.error("Error Fetching Data Jabatan Departemen", error);
      }
    },

    async filterDepartemenTotal() {
      try {
        const response = await hrisServiceHr1Mod1.get(
          "registrasiPegawai/findJumlahPegawaiFilterDepartemen",
          {
            headers: {
              "x-auth-token": `${token}`,
            },
          }
        );
        this.responseDataDepartemenTotal = response.data.data.listPegawai;
        // console.log(this.responseDataDepartemenTotal);
      } catch (error) {
        console.error("Error Fetching Data Jabatan Departemen", error);
      }
    },
    async jumlahPegawaiTotal() {
      try {
        const response = await hrisServiceHr1Mod1.get(
          "registrasiPegawai/findJumlahPegawai",
          {
            headers: {
              "x-auth-token": `${token}`,
            },
          }
        );
        this.responseDataPegawaiTotal = response.data.data;
        // console.log(this.responseDataPegawaiTotal);
      } catch (error) {
        console.error("Error Fetching Data Jabatan Departemen", error);
      }
    },
    
    async jumlahPegawaiTotalDropdown() {
  try {
    const response = await dataMaster.get(
      "service/list-generic?table=Ruangan&select=namaRuangan&page=1&rows=1000&criteria=kdRuanganHead&values=001&condition=and&profile=y ",
      {
        headers: {
          "x-auth-token": token, // Menggunakan token langsung tanpa mengonversinya ke string
        },
      }
    );

    // Mengambil array dari data ruangan
    const responseData = response.data.data.data;

    // Mengonversi array ruangan menjadi array baru yang sesuai untuk digunakan dalam Dropdown
    this.responseDataPegawaiTotalDropdown = responseData.map((ruangan, index) => ({
      key: `ruangan_${index}`,
      namaRuangan: ruangan.namaRuangan, // Menetapkan properti namaRuangan untuk Dropdown
    }));

    // console.log(this.responseDataPegawaiTotalDropdown);
  } catch (error) {
    console.error("Error Fetching Data Ruangan", error);
  }
},


    async pendidikanTerakhir() {
      try {
        const response = await hrisServiceHr1Mod1.get(
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

    async filterLokasiKerja() {
      try {
        const response = await hrisServiceHr1Mod1.get(
          "registrasiPegawai/findJumlahPegawaiFilterLokasiKerja",
          {
            headers: {
              "x-auth-token": `${token}`,
            },
          }
        );
        this.responseDataFilterLokasiKerja =
          response.data.data.jumlahPegawaiFilter;
        // console.log(this.responseDataFilterLokasiKerja);
      } catch (error) {
        console.error("Error Fething Data Lokasi Kerja", error);
      }
    },

    async filterStatusPegawai() {
      try {
        const response = await hrisServiceHr1Mod1.get(
          "registrasiPegawai/findJumlahPegawaiFilterKategory",
          {
            headers: {
              "x-auth-token": `${token}`,
            },
          }
        );
        this.responseDataFilterStatusPegawai =
          response.data.data.jumlahPegawaiFilter;
        // console.log(this.responseDataFilterStatusPegawai);
      } catch (error) {
        console.error("Error Fetching Data Status Pegawai", error);
      }
    },

    // async pegawaiStrStip() {
    //   try {
    //     const response = await hrisServiceHr1Mod1.get(
    //       "dokumen/findAll?page=1&rows=10&dir=namaJudulDokumen&sort=desc&namaDokumen=STR",
    //       {
    //         headers: {
    //           "x-auth-token": `${token}`,
    //         },
    //       }
    //     );
    //     this.responseDataPegawaiStrSip = response.data.Dokumen;
    //     // console.log(this.responseDataPegawaiStrSip);
    //   } catch (error) {
    //     console.error("Error Fetching STR SIP", error);
    //   }
    // },

    async pegawaiMasaKerja() {
      try {
        const response = await hrisServiceHr1Mod1.get(
          "registrasiPegawai/findJumlahPegawaiFilterMasaKerja",
          {
            headers: {
              "x-auth-token": `${token}`,
            },
          }
    );
    this.responseDataPegawaiMasaKerja = response.data.data.data;
    // console.log(this.responseDataPegawaiMasaKerja);
        
      } catch (error) {
        console.error("Error fething Masa Kerja", error);
      }
    },

    // async fetchData() {
    //   try {
    //     const response = await api.get("api/employes");
    //     this.responseData = response.data;
    //     // console.log(this.responseData);

    //     //hitung total data
    //     this.totalData = this.responseData.length;

    //     //panggil metode chart untuk mengatur data chart
    //     // this.setChartPGender();
    //     // this.setChartPStatus();
    //     // this.setChartPLokasi();
    //   } catch (error) {
    //     console.error("Error fetching data:", error);
    //   }
    // },
    //========================= CHART =========================

    // async search(keyword) {
    //   try {
    //     if (this.filterNama) {
    //       const response = await api.get(`api/employes/search?nama=${keyword}`);
    //       this.responseData = response.data;
    //     } else {
    //       this.fetchData();
    //     }
    //   } catch (error) {
    //     // handle error
    //     console.error("Error during search", error);
    //   }
    // },
    buttonSearchNama() {
      this.search(this.filterNama);
    },

    exportCSV() {
      this.$refs.dt.exportCSV();
    },
  },
};
