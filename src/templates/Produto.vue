<template>
  <Layout>
    <div v-if="$page.produto">
      <v-carousel
        class="mt-n8"
        cycle
        height="400"
        hide-delimiter-background
        show-arrows-on-hover
      >
        <v-carousel-item
          :src="$page.produto.imagem"
          v-for="(slide, i) in slides"
          :key="i"
        ></v-carousel-item>
      </v-carousel>
      <v-container class="container">
        <h1>{{ $page.produto.nome }}</h1>
        <div v-html="$page.produto.content" />
        <div v-if="$page.produto.categorias">
          <v-chip
            v-for="categoria in $page.produto.categorias"
            :key="categoria"
            class="ma-2"
            >{{ categoria }}</v-chip
          >
        </div>
        <h3>{{ $page.produto.produtor }}</h3>
        <h3>{{ $page.produto.sasonal }}</h3>
        <h3>{{ $page.produto.valor }}</h3>
        <h3>{{ $page.produto.contato }}</h3>
      </v-container>
    </div>
  </Layout>
</template>
<page-query>
query Produto ($id: ID!) {
  produto (id: $id) {
    nome
    imagem
    content
    categorias
    produtor
    sasonal
    valor
    contato

  }
}
</page-query>
<script>
export default {
  data() {
    return {
      colors: [
        "indigo",
        "warning",
        "pink darken-2",
        "red lighten-1",
        "deep-purple accent-4"
      ],
      slides: ["First", "Second", "Third", "Fourth", "Fifth"]
    };
  },
  metaInfo: {
    title: "Tags"
  }
};
</script>
<style scoped>
.container {
  padding: 30px 50px;
  max-width: 968px;
}
</style>
