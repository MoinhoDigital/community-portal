<template>
  <Layout>
    <div v-if="$page.produtos.edges && $page.produtos.edges.length > 0">
      <ProdutoCatalogo
        v-for="produto in $page.produtos.edges"
        :key="produto.node.id"
        :produto="produto.node"
      />
    </div>
    <div v-else>Não existem produtos</div>
  </Layout>
</template>
<page-query>
query {
  produtos: allProduto {
    edges {
      node {
        id
        path
        content
        excerpt
        nome
        data
        imagem
      }
    }
  }
}
</page-query>
<script>
import ProdutoCatalogo from '@/components/ProdutoCatalogo.vue'
  export default {
    components: {
      ProdutoCatalogo
    }
  }
</script>