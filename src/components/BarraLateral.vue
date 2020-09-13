<template>
  <v-container>
    <v-app-bar app color="indigo" dark>
      <v-app-bar-nav-icon v-show="mobile" @click.stop="toggleBarraLateral" />
      <v-toolbar-title>{{this.$static.metadata.siteName}}</v-toolbar-title>
    </v-app-bar>
    <v-navigation-drawer :temporary="mobile" v-model="drawer" app :permanent="!mobile">
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
<static-query>
query {
  metadata {
    notLocal
    siteName
  }
}
</static-query>
<script>
export default {
  name: "BarraLateral",
  data: () => ({
    drawer: null
  }),
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
        {
          
          title: "Mercado Local",
          icon: "mdi-shopping",
          route: "/catalogo"
        },
        {
          title: "Jornal",
          icon: "mdi-book",
          route: "/jornal"
        },
        {
          
          title: "Sobre",
          icon: "mdi-information",
          route: "/sobre"
        },
        
      ];
      if (!this.$static.metadata.notLocal) {
        routes.push({
          title: "Internet",
          icon: "mdi-web",
          route: "http://rede.com/portal"
        });
      }
      return routes;
    },
    mobile () {
      return this.$vuetify.breakpoint.xs
    },
  },
  methods: {
    toggleBarraLateral () {
      this.drawer = !this.drawer
    },
    changeRoute(route) {
      const isExternal = route.includes("http://");
      if (this.mobile) this.toggleBarraLateral();
      if (isExternal) window.open(route);
      else this.$router.push(route);
    }
  }
};
</script>
