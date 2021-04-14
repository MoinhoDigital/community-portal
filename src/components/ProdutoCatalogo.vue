<template>
  <v-card class="mx-auto" max-width="400">
    <v-img
      class="white--text align-end"
      height="200px"
      :src="produto.imagem"
    ></v-img>

    <v-card-subtitle class="pb-0">{{ produto.nome }}</v-card-subtitle>

    <v-card-text class="text--primary">
      <div v-html="produto.content" />
    </v-card-text>

    <v-card-actions>
      <v-btn color="red" text :to="produto.path">Ver</v-btn>
    </v-card-actions>
  </v-card>
</template>
<script>
export default {
  props: {
    produto: Object
  }
};
</script>
