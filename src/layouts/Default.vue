<template>
  <v-app id="inspire">
    <Drawer />
    <v-main class>
      <slot />
    </v-main>
  </v-app>
</template>
<script>
import Drawer from '~/components/Drawer.vue'

export default {
  components: {
    Drawer,
  }
}
</script>

<style lang="scss">
</style>
