<template>
  <div justify="start">
    <h3>Aplicativos locais, que funcionam mesmo sem Internet.</h3>
    <br />
    <AppCard v-for="app in apps" :key="app.node.id" :data="app.node" />
  </div>
</template>

<script>
import AppCard from '@/components/AppCard'
export default {
    name: "AppList",
    props: {
        apps: {type: Array, default: []}
    },
    components: {
        AppCard
    }
}
</script>
<style scoped>
  h3 {
    padding: 5w;
    margin: 0 auto;
  }
</style>