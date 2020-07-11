<template>
  <v-container>
    <v-navigation-drawer v-model="open" app :permanent="!$vuetify.breakpoint.xs">
      <v-list v-for="route in routes" :key="route.title" dense>
        <v-list-item link @click="changeRoute(route.route)">
          <v-list-item-action>
            <v-icon>{{ route.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>{{ route.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </v-container>
</template>

<script>
export default {
  name: "Drawer",
  props: {
    drawer: Boolean,
    toggle: Function
  },
  computed: {
    routes: function() {
      let routes = [
        {
          title: "Mapa",
          icon: "mdi-map",
          route: "/"
        },
        {
          title: "Aplicativos locais",
          icon: "mdi-apps",
          route: "/apps"
        },
        // {
        //   title: "Jornal",
        //   icon: "mdi-book",
        //   route: "/posts"
        // },
        {
          
          title: "Sobre",
          icon: "mdi-information",
          route: "/about"
        }
      ];
      if (!process.env.VUE_APP_WEB) {
        routes.push({
          title: "Internet",
          icon: "mdi-web",
          route: "http://rede.com/portal"
        });
      }
      return routes;
    },
    open: {
      get() {
        return this.drawer;
      },
      set(n) {
        return n;
      }
    }
  },
  methods: {
    changeRoute(route) {
      const isExternal = route.includes("http://");
      if (this.$vuetify.breakpoint.xs) this.$emit("toggle");
      if (isExternal) window.open(route);
      else this.$router.push(route);
    }
  }
};
</script>
