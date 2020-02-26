<template>
  <v-dialog
    v-model="open"
    width="100%"
    transition="dialog-top-transition"
    scrollable
    :fullscreen="mobile"
  >
    <v-card tile class="py-12">
      <v-card-text>
        <v-layout text-center wrap>
          <!-- <v-flex xs12>
            <v-img :src="require('../assets/logo.svg')" class="my-3" contain height="200"></v-img>
          </v-flex>-->

          <v-flex mb-4>
            <h1
              class="mb-3 font-weight-bold"
              :class="{
                headline: mobile,
                'display-2': !mobile
              }"
            >
              Povoado do Moinho
            </h1>
            <p class="subheading font-weight-regular">
              Bem vindos ao Povoado do Moinho, seja um morador ou visitante
            </p>
          </v-flex>

          <v-flex mb-5 xs12>
            <h2
              class="font-weight-bold mb-3"
              :class="{
                'subtitle-1': mobile,
                headline: !mobile
              }"
            >
              Mapa
            </h2>
            <p class="subheading font-weight-regular">
              <a @click="toggle">Feche essa janela</a> para explorar o mapa do
              Moinho. <br />Adicione um novo ponto
              <a to="/places">clicando aqui</a>
            </p>
          </v-flex>

          <v-flex xs12 mb-5>
            <h2
              class="font-weight-bold mb-3"
              :class="{
                'subtitle-1': mobile,
                headline: !mobile
              }"
            >
              Internet
            </h2>

            <!-- <v-layout justify-center>
          <a
            v-for="(link, i) in importantLinks"
            :key="i"
            :href="link.href"
            class="subheading mx-3"
            target="_blank"
          >
            {{ link.text }}
          </a>
            </v-layout>-->
          </v-flex>

          <v-flex xs12 mb-5>
            <h2
              class="font-weight-bold mb-3"
              :class="{
                'subtitle-1': mobile,
                headline: !mobile
              }"
            >
              Aplicativos
            </h2>

            <!-- <v-layout justify-center>
          <a
            v-for="(eco, i) in ecosystem"
            :key="i"
            :href="eco.href"
            class="subheading mx-3"
            target="_blank"
          >
            {{ eco.text }}
          </a>
            </v-layout>-->
          </v-flex>
        </v-layout>
      </v-card-text>

      <div style="flex: 1 1 auto;"></div>
      <v-card-actions class="mx-auto">
        <v-btn @click="toggle">Continuar</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: "Welcome",

  props: {
    open: Boolean,
    toggle: Function
  },
  computed: {
    mobile() {
      return this.$vuetify.breakpoint.xs;
    }
  }
};
</script>
