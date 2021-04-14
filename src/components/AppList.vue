<template>
  <div justify="start">
    <h3 class="text-center pb-8">
      Aplicativos locais, que funcionam mesmo sem Internet.
    </h3>
    <br />
    <v-row>
      <v-col v-for="app in apps" :key="app.node.id" cols="12" sm="3" md="4">
        <AppCard :data="app.node" />
      </v-col>
    </v-row>
  </div>
</template>

<script>
import AppCard from "@/components/AppCard";
export default {
  name: "AppList",
  props: {
    apps: { type: Array, default: [] }
  },
  components: {
    AppCard
  }
};
</script>
<style scoped>
h3 {
  padding: 5w;
  margin: 0 auto;
}
</style>
