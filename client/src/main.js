import Vue from 'vue'
import App from './app.vue'

// Kendo UI
import '@progress/kendo-ui/js/kendo.core';
import '@progress/kendo-ui/js/kendo.popup';
import '@progress/kendo-ui/js/kendo.datepicker';
import '@progress/kendo-ui/js/kendo.grid';
import '@progress/kendo-ui/js/cultures/kendo.culture.fr-FR';
import {KendoDatePicker, KendoDateinputsInstaller} from '@progress/kendo-dateinputs-vue-wrapper'
Vue.use(KendoDateinputsInstaller);
import {KendoGrid, KendoGridInstaller} from '@progress/kendo-grid-vue-wrapper';
Vue.use(KendoGridInstaller);

// Css
import '@progress/kendo-theme-default/dist/all.css'

new Vue({
  el: '#app',
  render: h => h(App),
  created: function () {
    kendo.culture('fr-FR');
  },
  components: {
    App,
    KendoDatePicker,
    KendoGrid
  }
});
