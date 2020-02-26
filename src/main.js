import Vue from "vue";
import VueMapbox from "vue-mapbox";
import Mapbox from "mapbox-gl";

import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import vuetify from "./plugins/vuetify";
// import { createProvider } from './vue-apollo'
import "typeface-roboto";

Vue.config.productionTip = false;
Vue.use(VueMapbox, { mapboxgl: Mapbox });

new Vue({
  router,
  vuetify,
  // apolloProvider: createProvider(),
  render: h => h(App)
}).$mount("#app");
