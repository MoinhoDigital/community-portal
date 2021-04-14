<template>
  <Layout>
    <!-- <div v-show="$page && $page.mercado">
      {{$page}}
    </div> -->
    <!-- <Welcome :toggle="toggleWelcome" :open="welcome" /> -->
    <!-- <CommunityMap class="map" v-show="$page.lugares" :places="$page.lugares.edges" /> -->
    <CommunityMap
      class="map"
      v-show="$page.mercado"
      :places="$page.mercado.edges"
    />
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
        order
        coords {
          lat
          lon
        }
      }
    }
  }
  lugares: allLugar(filter: { publicado: { eq: true }}) {
    edges {
      node {
        id
        path
        content
        excerpt
        nome
        data
        publicado
        categorias {
          id
          title
        }
        imagem
        coords
        descricao
      }
    }
  }
}
</page-query>

<script>
// @ is an alias to /src
import Welcome from "@/components/Welcome.vue";
import CommunityMap from "@/components/CommunityMap.vue";

export default {
  name: "map",
  components: {
    Welcome,
    CommunityMap
  },
  data() {
    return {
      // position: null,
      welcomed: true
    };
  },
  computed: {
    welcome: {
      get: function() {
        if (process.isClient) {
          const isWelcomed = localStorage.getItem("welcome");
          if (isWelcomed === "true") return false;
        }
        return this.welcomed;
      }
    }
  },
  // mounted() {
  //   if (navigator.geolocation) {
  //     navigator.geolocation.getCurrentPosition(position => {
  //       this.position = position.coords;
  //     });
  //   }
  // },
  methods: {
    toggleWelcome() {
      if (process.isClient) {
        localStorage.setItem("welcome", "true");
      }
      this.welcomed = !this.welcomed;
    }
  }
};
</script>
<style scoped>
.map {
  margin-top: -25px;
}
</style>
