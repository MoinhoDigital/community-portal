<template>
  <Layout>
    <div v-if="$page.produto">
      <v-carousel class="mt-n8" cycle height="400" hide-delimiter-background show-arrows-on-hover>
        <v-carousel-item :src="$page.produto.imagem" v-for="(slide, i) in slides" :key="i"></v-carousel-item>
      </v-carousel>
      <v-container>
        <h1>{{$page.produto.nome}}</h1>
        <div v-html="$page.produto.content" />
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
  }
}
</page-query>
<script>
  export default {
    data () {
      return {
        colors: [
          'indigo',
          'warning',
          'pink darken-2',
          'red lighten-1',
          'deep-purple accent-4',
        ],
        slides: [
          'First',
          'Second',
          'Third',
          'Fourth',
          'Fifth',
        ],
      }
    },
    metaInfo: {
    title: 'Tags'
  }
  }
</script>