<template>
  <Layout>
    <v-carousel cycle height="400" hide-delimiter-background show-arrows-on-hover>
      <v-carousel-item
        src="https://portal-amb-imgs.clubedaana.com.br/2018/11/pao-caseiro.jpg"
        v-for="(slide, i) in slides"
        :key="i"
      ></v-carousel-item>
    </v-carousel>
    <h1>pao</h1>
    <p>nihihl</p>
  </Layout>
</template>
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
  }
</script>