<template>
  <Layout>
    <AppList v-show="$page.apps" :apps="$page.apps.edges" />
  </Layout>
</template>

<page-query>
query {
  apps: allApp(filter: { publicado: { eq: true }}) {
    edges {
      node {
        id
        path
        content
        excerpt
        nome
        data
        link
        publicado
        categorias {
            id
            title
        }
        imagem
        descricao
      }
    }
  }
}
</page-query>

<script>
// @ is an alias to /src
import AppList from "@/components/AppList.vue";

export default {
  name: "map",
  components: {
    AppList
  }
};
</script>
<style scoped></style>
