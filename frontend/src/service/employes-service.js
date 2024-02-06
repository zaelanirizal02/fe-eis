// import api from "../api/index";
// export default {
//   async fetchData() {
//     try {
//       const response = await api.get("api/employes");
//       this.responseData = response.data;

//       //hitung total data
//       this.totalData = this.responseData.length;

//       //panggil metode chart untuk mengatur data chart
//       this.setChartPGender();
//       this.setChartPStatus();
//       this.setChartPLokasi();
//     } catch (error) {
//       console.error("Error fetching data:", error);
//     }
//   },

//   async search(keyword){
//     try{
//       const response = await api.get("api/employes/search?nama=${keyword}");
//       // handle response data
//     } catch (error){
//       // handle error
//       console.error('Error during search', error);
//     }
//   },
//   buttonSearch(){
//     this.searchEmployeeByName(this.searchKeyword);
//   },

//   setChartPGender() {
//     // logika untuk chart
//   },

//   setChartOptions() {},
// }
