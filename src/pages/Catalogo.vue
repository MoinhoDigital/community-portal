<template>
  <Layout>
    <div>
      <div>
        <h1 class="title text-center">Mercado local</h1>
        <v-img src="/images/uploads/mercado.jpg" max-height="45vh" contain />
      </div>
      <v-expansion-panels v-if="this.$page && this.$page.mercado">
        <v-expansion-panel
          v-for="category in Object.keys(perCategory).reverse()"
          :key="category"
        >
          <v-expansion-panel-header>
            <template v-slot:default="{ open }">
              <v-row no-gutters>
                <v-col class="text-capitalize" cols="12">{{ category }}</v-col>
              </v-row>
            </template>
          </v-expansion-panel-header>
          <v-expansion-panel-content>
            <v-row>
              <v-col
                cols="12"
                :sm="4"
                v-for="item in $page.mercado.edges.filter(
                  a => a.node.category === category
                )"
                :key="item.node.id"
              >
                <v-card class="mx-auto py-8 px-4" max-width="400" height="400">
                  <v-card-title>{{
                    item.node.name.split(" ")[0]
                  }}</v-card-title>
                  <!-- <v-card-subtitle>{{ item.node.category }}</v-card-subtitle> -->
                  <div style="height: 200px">
                    <v-chip
                      class="mx-2 my-2 text-capitalize"
                      v-for="product in item.node.products"
                      :key="product"
                      >{{ product }}</v-chip
                    >
                  </div>

                  <div v-if="item.node.contact">
                    <v-divider class="my-2"></v-divider>
                    <div>
                      <v-icon>mdi-phone</v-icon>
                      <span class="caption pl-4">{{ item.node.contact }}</span>
                    </div>
                  </div>
                </v-card>
              </v-col>
            </v-row>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
      <!-- <ProdutoCatalogo :produto="produto.node" /> -->
    </div>
  </Layout>
</template>
<page-query>
query {
  mercado: allMercadoLocal {
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
import ProdutoCatalogo from "@/components/ProdutoCatalogo.vue";
export default {
  components: {
    ProdutoCatalogo
  },
  computed: {
    perCategory() {
      return this.$page.mercado.edges.reduce((prev, curr) => {
        let currArray = prev[curr.node.category];
        if (currArray) {
          currArray.push(curr.node);
          const newData = Object.assign(prev, {
            [curr.node.category]: currArray
          });
          return newData;
        } else {
          return Object.assign(prev, {
            [curr.node.category]: [curr.node]
          });
        }
      }, {});
    }
  }
};
</script>
