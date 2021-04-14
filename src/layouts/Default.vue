<template>
  <v-app id="inspire">
    <BarraLateral />
    <v-main class>
      <slot />
    </v-main>
  </v-app>
</template>
<script>
import BarraLateral from "~/components/BarraLateral.vue";

export default {
  components: {
    BarraLateral
  }
};
</script>

<style lang="scss"></style>
