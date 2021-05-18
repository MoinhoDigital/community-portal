<template>
  <v-row>
    <v-col cols="12" md="6">
      <v-card class="co-cards">
        <v-img :src="product.image" contain height="350" />
        <v-card-title
          >{{ product.name }}
          <a class="ml-4" target="_blank" :href="product.link"
            ><v-icon>mdi-open-in-new</v-icon></a
          ></v-card-title
        >
        <v-card-text>
          <div class="my-4 subtitle-1">
            <v-icon class="mr-4" color="green">mdi-account-clock</v-icon>
            <span>{{ product.organizers }}</span>
          </div>
          <div class="my-4 subtitle-1">
            <v-icon class="mr-4" :color="product.open ? 'green' : 'orange'"
              >mdi-clock</v-icon
            >
            <TimeAgo locale="pt_BR" long :datetime="product.endDate"></TimeAgo>
          </div>
          <v-chip> {{ product.pricePerLot.format() }} por litro </v-chip>
        </v-card-text>
        <v-card-actions>
          <v-btn
            color="deep-purple lighten-2"
            text
            @click="console.log('Hey')"
            :disabled="!product.open"
          >
            Participar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-col>
    <v-col cols="12" md="6">
      <v-card class="co-cards">
        <v-card-text>
          <v-timeline align-top dense>
            <v-timeline-item color="green" small>
              <div>
                <h4>Pedidos</h4>
                <time-ago
                  v-if="product.stage === 1"
                  long
                  :refresh="60"
                  :datetime="product.endDate"
                  locale="pt_BR"
                  tooltip
                ></time-ago>
              </div>
            </v-timeline-item>
            <v-timeline-item color="orange" small>
              <div>
                <h4>Pagamentos</h4>
                <p v-if="product.stage === 2">{{ product.bankDetails }}</p>
              </div>
            </v-timeline-item>
            <v-timeline-item color="grey" small>
              <h4>Aguardando entrega</h4>
              <a
                v-if="product.stage === 3 && product.tracking"
                :href="product.tracking"
                >Rastreamento <v-icon class="ml-4">mdi-truck</v-icon></a
              >
            </v-timeline-item>
            <v-timeline-item color="grey" small>
              <div>
                <h4>Distribuindo</h4>
                <a
                  v-if="product.stage === 4 && product.distribution"
                  :href="product.tracking"
                  >{{ product.distribution }}
                  <v-icon class="ml-4">mdi-hubspot</v-icon></a
                >
              </div>
            </v-timeline-item>
          </v-timeline>
        </v-card-text>
      </v-card>
    </v-col>
    <v-col cols="12" md="12">
      <v-card>
        <v-card-title>Participantes</v-card-title>
        <v-divider />
        <v-row>
          <v-col cols="12" md="5" class="pl-8">
            <CobuyParticipant :list="firstHalf" />
          </v-col>
          <v-divider vertical />
          <v-col cols="12" md="6" class="pl-8">
            <CobuyParticipant :list="secondHalf" />
          </v-col>
        </v-row>
      </v-card>
    </v-col>
  </v-row>
</template>
<script>
import { TimeAgo } from "vue2-timeago";
import CobuyParticipant from "@/components/CobuyParticipant.vue";

export default {
  props: {
    product: Object
  },
  components: {
    TimeAgo,
    CobuyParticipant
  },
  data: () => ({
    selection: 1
  }),
  computed: {
    amountPople() {
      if (this.product && this.product.participants) {
        return Math.ceil(this.product.participants.length / 2);
      } else return 0;
    },
    firstHalf() {
      if (this.amountPople > 0)
        return this.product.participants.slice(0, this.amountPople);
    },
    secondHalf() {
      if (this.amountPople > 0) {
        return this.product.participants.slice(-this.amountPople);
      }
    }
  },
  methods: {}
};
</script>
<style scoped>
@media (min-width: 720px) {
  .co-cards {
    height: 600px;
  }
}

@media (min-width: 1264px) {
  .co-cards {
    height: 650px;
  }
}
</style>
