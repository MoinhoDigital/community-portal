<template>
  <v-container>
    <v-card>
      <v-app-bar app color="indigo" dark>
        <v-app-bar-nav-icon v-show="mobile" @click.stop="toggleBarraLateral" />
        <v-app-bar-nav-icon
          class="ml-2"
          v-if="isBack"
          @click="$router.push('/catalogo')"
        >
          <v-icon>mdi-keyboard-backspace</v-icon>
        </v-app-bar-nav-icon>
        <v-toolbar-title v-else>{{
          this.$static.metadata.siteName
        }}</v-toolbar-title>
      </v-app-bar>
      <v-navigation-drawer
        :temporary="mobile"
        v-model="drawer"
        app
        :permanent="!mobile"
      >
        <!-- <v-img
          height="250"
          src="https://melhorespousadas.tur.br/uploads/pousadas-fotos/011/hostel-moinho-120131.jpg"
        ></v-img> -->
        <div :class="isMobile ? 'pt-0 pb-2' : 'pt-12'">
          <v-list v-for="route in routes" :key="route.title" dense>
            <v-list-item
              :inactive="$route.fullPath === route.route"
              :disabled="route.disabled"
              link
              @click="changeRoute(route.route)"
            >
              <v-list-item-action>
                <v-icon
                  :color="
                    $route.fullPath === route.route || route.disabled
                      ? 'grey'
                      : 'primary'
                  "
                  >{{ route.icon }}</v-icon
                >
              </v-list-item-action>
              <v-list-item-content>
                <v-list-item-title>{{ route.title }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </div>
      </v-navigation-drawer>
    </v-card>
  </v-container>
</template>
<static-query>
query {
  metadata {
    intranet {
      isIntranet
      music
      movies
      courses
      network
      internet
      apps
    }
    siteName
  }
}
</static-query>
<script>
export default {
  name: "BarraLateral",
  data: () => ({
    drawer: null,
    isBack: false
  }),
  computed: {
    isMobile() {
      return this.$vuetify.breakpoint.xs;
    },
    routes: function() {
      const {
        isIntranet,
        apps,
        music,
        movies,
        courses,
        internet,
        network
      } = this.$static.metadata.intranet;
      let routes = [
        {
          title: "Mapa",
          icon: "mdi-map",
          route: "/"
        },
        {
          title: "Jornal",
          icon: "mdi-book",
          route: "/jornal"
        },
        {
          title: "Mercado Local",
          icon: "mdi-shopping",
          route: "/catalogo"
        },
        {
          title: "Compra Coletiva",
          icon: "mdi-account-group",
          route: "/compra"
        },
        {
          title: "Rede Social",
          icon: "mdi-human-greeting",
          route: network,
          disabled: !network
        },
        {
          title: "Sobre",
          icon: "mdi-information",
          route: "/sobre"
        }
      ];
      apps &&
        routes.splice(4, 0, {
          title: "Aplicativos locais",
          icon: "mdi-apps",
          route: apps,
          disabled: !isIntranet
        });
      music &&
        routes.splice(5, 0, {
          title: "MoinhoTube",
          icon: "mdi-music",
          route: music,
          disabled: !isIntranet
        });
      movies &&
        routes.splice(6, 0, {
          title: "MoinhoFlix",
          icon: "mdi-movie",
          route: movies,
          disabled: !isIntranet
        });
      courses &&
        routes.splice(7, 0, {
          title: "Cursos",
          icon: "mdi-school",
          route: courses,
          disabled: !isIntranet
        });
      internet &&
        routes.splice(9, 0, {
          title: "Internet",
          icon: "mdi-web",
          route: internet,
          disabled: !isIntranet
        });
      // routes.splice(7 ,0, {
      //   title: "Internet",
      //   icon: "mdi-web",
      //   route: "http://rede.com/portal"
      // });
      return routes;
    },
    mobile() {
      return this.$vuetify.breakpoint.xs;
    }
  },
  mounted() {
    if (this.$route.params.id) {
      this.isBack = true;
    }
  },
  methods: {
    toggleBarraLateral() {
      this.drawer = !this.drawer;
    },
    changeRoute(route) {
      const isExternal = route.includes("http");
      if (this.mobile) this.toggleBarraLateral();
      if (isExternal) window.open(route);
      else this.$router.push(route);
    }
  }
};
</script>
