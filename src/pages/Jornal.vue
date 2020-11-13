<template>
  <Layout>
    <div class="pdf">
      <div class="controls d-flex justify-space-around pb-4 mx-auto">
        <v-btn @click="lastPage">Voltar</v-btn>
        <v-btn @click="nextPage">Próximo</v-btn>
      </div>
      <pdf
        src="/docs/jornal_moinho_1.pdf"
        @num-pages="pageCount = $event"
        @page-loaded="currentPage = $event"
        :page="currentPage"
      ></pdf>
      <div class="controls d-flex justify-space-around pt-4 mx-auto">
        <v-btn @click="lastPage">Voltar</v-btn>
        <v-btn @click="nextPage">Próximo</v-btn>
      </div>
      <div class="center">{{ currentPage }} / {{ pageCount }}</div>
      <br />
      <!-- <button @click="$refs.pdf.print()">Imprimir</button> -->
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
import Author from '~/components/Author.vue'
import PostCard from '~/components/PostCard.vue'
import pdf from 'vue-pdf'

export default {
  components: {
    Author,
    PostCard,
    pdf
  },
  metaInfo: {
    title: 'Home'
  },
	data() {
		return {
      // '~/assets/docs/Jornal do Moinho_1ª edição_finaldivulgação.pdf'
			currentPage: 1,
			pageCount: 0,
		}
  },
  methods: {
    nextPage () {
      if (this.currentPage < this.pageCount) {
        this.currentPage = this.currentPage + 1
      }
    },
    lastPage () {
      if (this.currentPage > 1) {
        this.currentPage = this.currentPage - 1
      }
    }
  }
}
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