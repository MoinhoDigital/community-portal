<template>
  <v-app id="inspire">
    <Drawer :drawer="drawer" />
    <v-app-bar app color="indigo" dark>
      <v-app-bar-nav-icon v-if="$vuetify.breakpoint.xs" @click.stop="toggleDrawer" />
      <v-toolbar-title>{{this.$static.metadata.siteName}}</v-toolbar-title>
    </v-app-bar>
    <v-main class>
      <slot />
    </v-main>
  </v-app>
</template>
<static-query>
query {
  metadata {
    siteName
  }
}
</static-query>


<script>
import Drawer from '~/components/Drawer.vue'

export default {
  components: {
    Drawer,
  },
  data: () => ({
    drawer: null
  }),
  methods: {
    toggleDrawer() {
      this.drawer = !this.drawer;
    }
  }
}
</script>

<style lang="scss">
</style>
