<template>
  <div justify="start">
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