<template>
  <Layout>
    <div class="pdf">
      <div class="d-md-flex justify-space-around pb-12 text-center">
        <v-btn :disabled="edition === 0" color="primary" @click="edition = 0"
          >Novembro 2020</v-btn
        >
        <v-btn :disabled="edition === 1" color="primary" @click="edition = 1"
          >Dezembro 2020</v-btn
        >
      </div>
      <div class="controls d-flex justify-space-around pb-4 mx-auto">
        <v-btn @click="lastPage">Voltar</v-btn>
        <v-btn @click="nextPage">Próximo</v-btn>
      </div>
      <div v-if="!pdfLoaded" class="text-center pt-16">
        <v-progress-circular
          indeterminate
          color="primary"
        ></v-progress-circular>
        <h3>Carregando arquivo de pdf</h3>
        <v-icon size="100">mdi-file</v-icon>
      </div>
      <a target="_blank" :href="`/docs/${edititions[edition]}`">
        <pdf
          :src="`/docs/${edititions[edition]}`"
          @num-pages="pageCount = $event"
          @page-loaded="currentPage = $event"
          @loaded="pdfLoaded = true"
          :page="currentPage"
        ></pdf>
      </a>
      <div class="controls d-flex justify-space-around pt-4 mx-auto">
        <v-btn @click="lastPage">Voltar</v-btn>
        <v-btn @click="nextPage">Próximo</v-btn>
      </div>
      <div v-if="pdfLoaded" class="text-center py-8">
        {{ currentPage }} / {{ pageCount }}
      </div>
      <br />
    </div>

    <!-- Author intro -->
    <!-- <Author :show-title="true" /> -->
    <!-- List posts -->
    <!-- <div class="posts" v-if="$page.posts.edges && $page.posts.edges.lenght > 0">
      <PostCard
        v-for="edge in $page.posts.edges"
        :key="edge.node.id"
        :post="edge.node"
      />
    </div>
    <div v-else>Não existem entradas no jornal ainda.</div> -->
  </Layout>
</template>

<page-query>
query {
  posts: allPost(filter: { publicado: { eq: true }}) {
    edges {
      node {
        id
        title
        date (format: "D. MMMM YYYY")
        timeToRead
        description
        cover_image
        ...on Post {
        id
        title
        path
        }
        path
        tags {
          id
          title
          path
        }
      }
    }
  }
}
</page-query>

<script>
import Author from "~/components/Author.vue";
import PostCard from "~/components/PostCard.vue";
import pdf from "vue-pdf";

export default {
  components: {
    Author,
    PostCard,
    pdf
  },
  metaInfo: {
    title: "Home"
  },
  data() {
    return {
      edition: 1,
      edititions: ["jornal_moinho_1.pdf", "jornal_moinho_2.pdf"],
      pdfLoaded: false,
      currentPage: 1,
      pageCount: 0
    };
  },
  methods: {
    nextPage() {
      if (this.currentPage < this.pageCount) {
        this.currentPage = this.currentPage + 1;
      }
    },
    lastPage() {
      if (this.currentPage > 1) {
        this.currentPage = this.currentPage - 1;
      }
    }
  }
};
</script>
<style scoped>
.pdf {
  margin: 0 auto;
  width: 80%;
}
.controls {
  width: 80%;
}
</style>
