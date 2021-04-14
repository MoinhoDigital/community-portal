import Vuetify from "vuetify/lib/framework";
// import VueMapbox from 'vue-mapbox'
// import Mapbox from 'mapbox-gl'

import "vuetify/dist/vuetify.min.css";
import "@mdi/font/css/materialdesignicons.css";

// Import main css
import "~/assets/style/index.scss";
import "~/assets/style/mapbox-gl.css";

// Import default layout so we don't need to import it to every page
import DefaultLayout from "~/layouts/Default.vue";

// The Client API can be used here. Learn more: gridsome.org/docs/client-api
export default function(Vue, { router, appOptions, head, isClient }) {
  // Set default layout as a global component
  head.meta.push({
    name: "viewport",
    content: "width=device-width,initial-scale=1.0"
  });

  const opts = {
    icons: {
      iconfont: "mdi"
    }
  }; // opts includes, vuetify themes, icons, etc.
  // Vue.use(VueMapbox, { mapboxgl: Mapbox })
  Vue.use(Vuetify);
  appOptions.vuetify = new Vuetify(opts);
  Vue.component("Layout", DefaultLayout);
}
