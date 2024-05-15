import { createApp } from 'vue'; // Mengimpor createApp dari Vue

// Membuat aplikasi Vue
const app = createApp({});

// Import komponen-komponen yang akan digunakan
import jenisKelaminChart from './jenisKelaminChart.vue';
import pendidikanTerakhirChart from './pendidikanTerakhirChart.vue';
import pegawaiJabatanChart from './pegawaiJabatanChart.vue';
import pegawaiDepartemenChart from './pegawaiDepartemenChart.vue';
import pegawaiMasaKerjaChart from './pegawaiMasaKerjaChart.vue';
import totalGajiPerBulanChart from './totalGajiPerBulanChart.vue';
// Import komponen-komponen lainnya...

// Mendaftarkan komponen-komponen dalam aplikasi Vue
app.component('jenisKelaminChart', jenisKelaminChart);
app.component('pendidikanTerakhirChart', pendidikanTerakhirChart);
app.component('pegawaiJabatanChart', pegawaiJabatanChart);
app.component('pegawaiDepartemenChart', pegawaiDepartemenChart);
app.component('pegawaiMasaKerjaChart', pegawaiMasaKerjaChart);
app.component('totalGajiPerBulanChart', totalGajiPerBulanChart)
// Daftarkan komponen-komponen lainnya...

export default app; // Ekspor aplikasi Vue
