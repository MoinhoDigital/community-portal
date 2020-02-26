<template>
  <v-app id="inspire">
    <Drawer :drawer="drawer" @toggle="toggleDrawer" />
    <v-app-bar app color="indigo" dark>
      <v-app-bar-nav-icon
        v-if="$vuetify.breakpoint.xs"
        @click.stop="toggleDrawer"
      />
      <v-toolbar-title>Povoado do Moinho</v-toolbar-title>
    </v-app-bar>
    <v-content>
      <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script>
import Drawer from "@/components/Drawer.vue";
export default {
  props: {
    source: String
  },
  components: {
    Drawer
  },
  data: () => ({
    drawer: null
  }),
  methods: {
    toggleDrawer() {
      this.drawer = !this.drawer;
    }
  }
};
</script>
