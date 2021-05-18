<template>
  <v-card :loading="true" class="mx-auto my-12" max-width="450">
    <template slot="progress">
      <v-progress-linear
        color="green"
        height="10"
        :value="product.stage * 25"
      ></v-progress-linear>
    </template>

    <v-img contain height="350" :src="product.image"></v-img>

    <v-card-title
      >{{ product.name }}
      <a class="ml-4" target="_blank" :href="product.link"
        ><v-icon>mdi-open-in-new</v-icon></a
      ></v-card-title
    >

    <v-card-text>
      <div class="my-4 subtitle-1">
        <v-icon class="mr-4">mdi-account-clock</v-icon>
        {{ product.organizers }}
      </div>
      <v-divider class="mx-4"></v-divider>
      <div class="my-4 subtitle-1">
        <v-icon class="mr-4">mdi-clock</v-icon>
        <span><TimeAgo :since="product.endDate"></TimeAgo></span>
      </div>
    </v-card-text>
  </v-card>
</template>
<script>
import { TimeAgo } from "vue2-timeago";

export default {
  props: {
    product: Object
  },
  components: {
    TimeAgo
  },
  data: () => ({
    selection: 1
  }),

  methods: {}
};
</script>
