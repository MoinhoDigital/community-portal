<template>
  <v-card class="mx-auto" max-width="400" height="550">
    <v-list-item-title class="headline py-4 pl-2">{{
      data.nome
    }}</v-list-item-title>
    <v-img
      class="white--text align-end"
      height="200px"
      :src="data.imagem"
    ></v-img>

    <v-card-subtitle
      v-for="category in data.categorias"
      :key="category.id"
      class="pb-0 text-capitalize"
      >{{ category.title }}</v-card-subtitle
    >

    <v-card-text class="text--primary">
      <div v-html="data.content" />
    </v-card-text>

    <v-card-actions>
      <v-btn :href="data.link" link target="_blank" color="orange" text
        >Ver</v-btn
      >
      <!-- <v-btn color="orange" text>Compartilhar</v-btn> -->
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: "AppCard",
  props: {
    data: {
      type: Object
    }
  }
};
</script>
