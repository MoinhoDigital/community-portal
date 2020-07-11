<template>
  <Layout>
    <div class="about">
      <h1>Sobre</h1>
      <div v-if="$page.about.content" v-html="$page.about.content" />
      <v-footer>
        <span>
          Criado com ❤ por
          <a href="//www.github.com/moinhodigital">Moinho Digital</a>.
        </span>
      </v-footer>
    </div>
  </Layout>
</template>

<page-query>
query {
  about(path: "/content/sobre/") {
    content
  }
}
</page-query>

<style scoped>
h1 {
  padding-bottom: 5vh;
}
.about {
  max-width: 968px;
  margin: 0 auto;
  padding: 5vh 5vw;
}
</style>
