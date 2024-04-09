import { createApp } from "vue";
import App from "./App.vue";
import router from "./router/router";

import PrimeVue from "primevue/config";
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import Button from "primevue/button";
import Chart from "primevue/chart";
import TabPanel from "primevue/tabpanel";
import TabView from "primevue/tabview";
import Accordion from "primevue/accordion";
import AccordionTab from "primevue/accordiontab";
import Card from "primevue/card";
import Menubar from "primevue/menubar";
import Ripple from "primevue/ripple";
import InputText from "primevue/inputtext";
import Badge from "primevue/badge";
import Avatar from "primevue/avatar";
import Dialog from "primevue/dialog";
import Divider from 'primevue/divider';
import RadioButton from 'primevue/radiobutton';
import Calendar from 'primevue/calendar';
import Dropdown from 'primevue/dropdown';
import Checkbox from 'primevue/checkbox';





import ChartDataLabels from "chartjs-plugin-datalabels";

import ApexCharts from "apexcharts";
import VueApexCharts from "vue3-apexcharts";

import "primeflex/primeflex.css";
import "primeicons/primeicons.css";
import "primevue/resources/primevue.min.css";
import "primevue/resources/themes/saga-blue/theme.css";
// import "primevue/resources/themes/soho-dark/theme.css";
// import "primevue/resources/themes/lara-dark-indigo/theme.css";

const app = createApp(App);
app.component("Checkbox", Checkbox);
app.component("Dropdown", Dropdown);
app.component("Calendar", Calendar);
app.component("RadioButton", RadioButton);
app.component("ChartDataLabels", ChartDataLabels);
app.component("Dialog", Dialog);
app.component("Badge", Badge);
app.component("InputText", InputText);
app.component("Avatar", Avatar);
app.component("Menubar", Menubar);
app.component("Card", Card);
app.component("Ripple", Ripple);
app.component("Accordion", Accordion);
app.component("AccordionTab", AccordionTab);
app.component("TabView", TabView);
app.component("TabPanel", TabPanel);
app.component("DataTable", DataTable);
app.component("Column", Column);
app.component("Button", Button);
app.component("Chart", Chart);
app.component("Divider", Divider);
app.component("VueApexCharts", VueApexCharts);

app.use(router);
app.use(PrimeVue, { ripple: true });
// app.use(VueApexCharts);
app.directive("ripple", Ripple);
app.mount("#app");
