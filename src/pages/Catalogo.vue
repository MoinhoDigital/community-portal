<template>
  <Layout>
    <div>
      <v-row
        v-if="$page && $page.people.edges && $page.people.edges.length > 0"
      >
        <v-col
          cols="12"
          :sm="4"
          v-for="person in $page.people.edges"
          :key="person.node.id"
        >
          <v-card class="mx-auto py-8 px-4" max-width="400" height="400">
            <v-card-title>{{ person.node.name }}</v-card-title>
            <v-card-subtitle>{{ person.node.category }}</v-card-subtitle>
            <div style="height: 200px">
              <v-chip
                class="mx-2 my-2 text-capitalize"
                v-for="product in person.node.products"
                :key="product"
                >{{ product }}</v-chip
              >
            </div>

            <div v-if="person.node.contact">
              <v-divider class="my-2"></v-divider>
              <div>
                <v-icon>mdi-phone</v-icon>
                <span class="caption">{{ person.node.contact }}</span>
              </div>
            </div>
          </v-card>
          <!-- <ProdutoCatalogo :produto="produto.node" /> -->
        </v-col>
      </v-row>
      <div v-else>Não existem produtos ainda.</div>
    </div>
  </Layout>
</template>
<page-query>
query {
  people: allPeople {
    edges {
      node {
        id
        name
        category
        products
        contact
      }
    }
  }
  produtos: allProduto(filter: { publicado: { eq: true }}) {
    edges {
      node {
        id
        path
        content
        excerpt
        nome
        data
        imagem
        publicado
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
    },
    computed: {
    }
  }
</script>