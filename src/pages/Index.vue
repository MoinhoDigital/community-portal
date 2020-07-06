<template>
  <Layout>
    <Welcome :toggle="toggleWelcome" :open="welcome" />
    <CommunityMap class="map" v-if="$page.places" :places="$page.places.edges" />
  </Layout>
</template>

<page-query>
query {
  places: allPlace(filter: { publicado: { eq: true }}) {
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
      position: null,
      welcomed: true
    };
  },
  computed: {
    welcome: {
      get: function() {
        if (localStorage) {
          const isWelcomed = localStorage.getItem("welcome");
          if (isWelcomed === "true") return false;
        }
        return this.welcomed;
      }
    }
  },
  mounted() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        this.position = position.coords;
      });
    }
  },
  methods: {
    toggleWelcome() {
      if (localStorage) {
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
