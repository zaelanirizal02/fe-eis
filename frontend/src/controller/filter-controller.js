import { hrisServiceHr1Mod1, dataMaster, token } from "../api/index";



//METHOD UNTUK CHART
export async function fetchDataDepartemenChart(tglAkhirEpoch, info, filterParam) {
  try {
    // Modifikasi URL sesuai dengan parameter filter
    let url = `registrasiPegawai/findJumlahPegawaiFilterJabatan?tglAkhir=${tglAkhirEpoch || ""}&info=${info || ""}`;
    if (filterParam) {
      url += `&filterParam=${filterParam}`;
    }

    const response = await hrisServiceHr1Mod1.get(url, {
      headers: {
        'x-auth-token': `${token}`,
      },
    });

    const data = response.data.data.jumlahPegawaiFilter;

    const labels = data.map((item) => item.nama);
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
  props: {},
  data() {
    return {
      responseDataJabatanTotal: [],
      responseDataPendidikanTerakhir: [],
      responseDataPegawaiTotalDropdown: [],
      tglAkhir: null,
      maxDate: new Date(),
      selectedInfo: null,
      infoOptions: [ // Menyimpan opsi dropdown info
        { label: "HRD", value: "hrd" },
        { label: "Ruangan", value: "ruangan" }
      ],
      showCalendar: false // Menentukan apakah kalender harus ditampilkan atau tidak
    };
  },
  mounted() {
    this.filterDataDashboard2();
    this.pendidikanTerakhir();
    this.jumlahPegawaiTotalDropdown();

      fetchDataDepartemenChart(new Date().getTime() / 1000, null).then(data => {
        // Lakukan apa pun yang perlu Anda lakukan dengan data di sini
    }).catch(error => {
        console.error('Error fetching chart data:', error);
    });
  },
  watch: {
    tglAkhir: {
      handler: function(newVal, oldVal) {
        if (newVal !== oldVal) {
          this.filterJabatanTotal(newVal ? newVal.getTime() / 1000 : null, this.selectedInfo);
          this.filterJabatanTotal(newVal ? newVal.getTime() / 1000 : null, this.selectedInfo);
          this.pendidikanTerakhir(newVal ? newVal.getTime() / 1000 : null);
        }
      },
      immediate: true,
    },
  },
  methods: {

        async updateChartData() {
      try {
        const data = await fetchDataDepartemenChart(this.tglAkhir ? this.tglAkhir.getTime() / 1000 : null, this.selectedInfo);
        // Memperbarui data chart
        this.chartData = data;
      } catch (error) {
        console.error('Error fetching chart data:', error);
      }
    },
    async filterJabatanTotal(tglAkhirEpoch, info) {
      try {
        const response = await hrisServiceHr1Mod1.get(
          `registrasiPegawai/findJumlahPegawaiFilterJabatan?tglAkhir=${tglAkhirEpoch || ""}&info=${info || ""}`,
          {
            headers: {
              "x-auth-token": `${token}`,
            },
          }
        );
        this.responseDataJabatanTotal = response.data.data.jumlahPegawaiFilter;
      } catch (error) {
        console.error("Error Fetching Data Jabatan Total", error);
      }
      
      // Panggil method filter dengan parameter yang diperlukan
      this.filter();
    },

     searchByDateRange() {
      // Mendapatkan nilai selectedInfo dari opsi dropdown yang dipilih
      const selectedInfoValue = this.selectedInfo ? this.selectedInfo.value : null;
      
      // Memanggil method filterJabatanTotal dengan parameter tglAkhir dan selectedInfoValue
      this.filterJabatanTotal(this.tglAkhir ? this.tglAkhir.getTime() / 1000 : null, selectedInfoValue);

      // Set showCalendar menjadi true saat tombol Cari diklik
      this.showCalendar = true;
    },
    filter() {
      // Lakukan filter data berdasarkan parameter yang diperlukan
      // Di sini Anda dapat memanggil method filter data Anda
    },





    async filterDataDashboard2() {
      try {
        const response = await dataMaster.get(
          "service/list-generic?table=Ruangan&page=1&rows=1000&criteria=kdRuanganHead&values=001&condition=and&profile=y",
          {
            headers: {
              "x-auth-token": `${token}`,
            },
          }
        );
        this.responseDataPegawaiTotalDropdown = response.data.data.data;
      } catch (error) {
        console.error("Error Fetching Data Ruangan", error);
      }
    },
    async pendidikanTerakhir(tglAkhirEpoch) {
      try {
        const response = await hrisServiceHr1Mod1.get(
          `registrasiPegawai/findJumlahPegawaiFilterPendidikan?tglAkhir=${tglAkhirEpoch || ""}`,
          {
            headers: {
              "x-auth-token": `${token}`,
            },
          }
        );
        this.responseDataPendidikanTerakhir = response.data.data.jumlahPegawaiFilter;
      } catch (error) {
        console.error("Error Fetching Data Pendidikan Terakhir", error);
      }
    },
   
    async jumlahPegawaiTotalDropdown() {
      try {
        const response = await dataMaster.get(
          "service/list-generic?table=Ruangan&select=namaRuangan&page=1&rows=1000&criteria=kdRuanganHead&values=001&condition=and&profile=y",
          {
            headers: {
              "x-auth-token": `${token}`,
            },
          }
        );
        this.responseDataPegawaiTotalDropdown = response.data.data.data.map((ruangan, index) => ({
          key: `ruangan_${index}`,
          namaRuangan: ruangan.namaRuangan,
        }));
      } catch (error) {
        console.error("Error Fetching Data Ruangan", error);
      }
    },
  },
};
