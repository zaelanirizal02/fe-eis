setChartPGender() {
      const documentStyle = getComputedStyle(document.body);

      // Pastikan responseData tidak null atau undefined
      if (this.responseData) {
        //hitung jumlah jenis kelamin yang ada
        const genderCounts = this.responseData.reduce((acc, employee) => {
          if (employee.jenis_kelamin === "L") {
            acc.maleCount = (acc.maleCount || 0) + 1;
          } else if (employee.jenis_kelamin === "P") {
            acc.femaleCount = (acc.femaleCount || 0) + 1;
          }
          return acc;
        }, {});
        // Menyiapkan data untuk pie chart
        const genderData = {
          labels: ["Laki-laki", "Perempuan"],
          datasets: [
            {
              data: [
                genderCounts.maleCount || 0,
                genderCounts.femaleCount || 0,
              ],
              backgroundColor: [
                documentStyle.getPropertyValue("--blue-500"),
                documentStyle.getPropertyValue("--yellow-500"),
              ],
              hoverBackgroundColor: [
                documentStyle.getPropertyValue("--blue-400"),
                documentStyle.getPropertyValue("--yellow-400"),
              ],
            },
          ],
        };
        // Update data pada chart
        this.chartPGender = genderData;
      }
},
    
setChartPLokasi() {
      const documentStyle = getComputedStyle(document.body);
      if (this.responseData) {
        const lokasiCounts = this.responseData.reduce((acc, employee) => {
          if (employee.lokasi_kerja === "CIKUTRA") {
            acc.cikutraCount = (acc.bandungCount || 0) + 1;
          } else if (employee.lokasi_kerja === "BANTUL") {
            acc.bantulCount = (acc.bantulCount || 0) + 1;
          } else if (employee.lokasi_kerja === "CIREBON") {
            acc.cirebonCount = (acc.cirebonCount || 0) + 1;
          } else if (employee.lokasi_kerja === "JAKARTA") {
            acc.jakartaCount = (acc.jakartaCount || 0) + 1;
          }
          return acc;
        }, {});

        const lokasiData = {
          labels: ["HO CIKUTRA", "BANTUL", "CIREBON", "JAKARTA"],
          datasets: [
            {
              data: [
                lokasiCounts.cikutraCount || 0,
                lokasiCounts.bantulCount || 0,
                lokasiCounts.cirebonCount || 0,
                lokasiCounts.jakartaCount || 0,
              ],
              backgroundColor: [
                documentStyle.getPropertyValue("--blue-500"),
                documentStyle.getPropertyValue("--yellow-500"),
                documentStyle.getPropertyValue("--green-500"),
                documentStyle.getPropertyValue("--pink-500"),
              ],
              hoverBackgroundColor: [
                documentStyle.getPropertyValue("--blue-400"),
                documentStyle.getPropertyValue("--yellow-400"),
                documentStyle.getPropertyValue("--green-400"),
                documentStyle.getPropertyValue("--pink-400"),
              ],
            },
          ],
        };
        // Update data pada chart
        this.chartPLokasi = lokasiData;
      }
},
    
setChartPGender2() {
      const lakiLakiData = this.responseDataHrisJenisKelamin.find(
        (item) => item.nama === "Laki Laki"
      );
      const perempuanData = this.responseDataHrisJenisKelamin.find(
        (item) => item.nama === "Perempuan"
      );

      const lakiLakiLabel = lakiLakiData
        ? `Laki Laki (${lakiLakiData.jumlah})`
        : "Laki Laki";
      const perempuanLabel = perempuanData
        ? `Perempuan (${perempuanData.jumlah})`
        : "Perempuan";

      this.chartGender = {
        labels: [lakiLakiLabel, perempuanLabel],

        datasets: [
          {
            data: [lakiLakiData?.jumlah || 0, perempuanData?.jumlah || 0],
            backgroundColor: ["#3498db", "#e74c3c"],
            datalabels: {
              display: true,
              formatter: (value, context) => {
                // Menambahkan angka di dalam chart
                return value;
              },
              color: "#fff", // warna teks
            },
          },
        ],
      };
    },