<template>
  <Layout>
    <v-progress-linear indeterminate v-if="fetchLoading" />
    <v-row>
      <v-col cols="12">
        <CobuyMain v-if="data" :product="data" />
      </v-col>
      <!-- <v-col cols="12" sm="3" md="4">
        <CobuyCard class="mx-2" v-if="data" :product="data" />
      </v-col> -->
    </v-row>
    <div v-if="fetchError">
      <h3 class="error">Fora do ar</h3>
    </div>
  </Layout>
</template>
<static-query>
query {
  metadata {
    cobuySheet
  }
}
</static-query>
<script>
import fetchStoreSheet, { getStore } from "@/lib/fetchStoreSheet.js";
import CobuyCard from "@/components/CobuyCard.vue";
import CobuyMain from "@/components/CobuyMain.vue";

export default {
  name: "Compra",
  components: {
    CobuyCard,
    CobuyMain
  },
  data() {
    return {
      fetchLoading: true,
      fetchError: false,
      data: null
    };
  },
  computed: {},
  async mounted() {
    try {
      this.data = getStore();
      const id = this.$static.metadata.cobuySheet;
      const data = await this.fetchData(id);
      this.fetchLoading = false;
      if (this.data !== data) this.data = data;
    } catch (err) {
      console.log("GOT ERROR");
      this.fetchError = true;
      this.fetchLoading = false;
    }
  },
  methods: {
    fetchData(id) {
      return fetchStoreSheet(id);
    }
  }
};
</script>
<style scoped>
.error {
  color: white;
  padding: 10px;
}
</style>
