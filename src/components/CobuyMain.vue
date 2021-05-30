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
            <div
              class="my-4"
              v-for="organizer in product.organizers"
              :key="organizer.contact"
            >
              <v-btn
                v-if="product.stage !== 0"
                fab
                small
                target="_blank"
                :href="
                  `https://api.whatsapp.com/send?phone=${organizer.contact}`
                "
                class="mr-4"
                color="green"
              >
                <v-icon color="white">mdi-message</v-icon>
              </v-btn>
              <span>{{ organizer.name }}</span>
            </div>
          </div>
          <div class="my-4 subtitle-1">
            <v-icon
              class="mr-4"
              :color="
                product.stage === 0 ? 'red' : product.open ? 'green' : 'orange'
              "
              >mdi-clock</v-icon
            >
            <span v-if="product.stage > 0"
              >Iniciado a
              <TimeAgo
                locale="pt_BR"
                long
                :datetime="product.startDate"
              ></TimeAgo
            ></span>
            <span v-else>Fechado</span>
          </div>
          <v-chip>
            {{ product.pricePerLot && product.pricePerLot.format() }} por litro
          </v-chip>
        </v-card-text>
        <v-card-actions>
          <!-- <v-btn
            color="deep-purple lighten-2"
            text
            @click="console.log('Hey')"
            :disabled="!product.open"
          >
            Participar
          </v-btn> -->
          <v-btn
            color="deep-purple lighten-2"
            text
            :href="product.sheetUrl"
            target="_blank"
          >
            Ver planilha
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-col>
    <v-col cols="12" md="6">
      <v-card class="co-cards">
        <v-card-text>
          <v-timeline align-top dense>
            <v-timeline-item
              :color="product.stage === 1 ? 'orange' : 'green'"
              small
            >
              <div>
                <h4>Pedidos</h4>
                <div v-if="product.stage === 1">
                  <p>
                    <span>Encerra em </span>
                    <TimeAgo
                      long
                      :refresh="60"
                      :datetime="product.endDate"
                      locale="pt_BR"
                      tooltip
                    ></TimeAgo>
                  </p>
                  <v-btn
                    class="my-2"
                    v-for="(organizer, index) in product.organizers"
                    :key="index"
                    target="_blank"
                    :href="
                      `https://api.whatsapp.com/send?phone=${organizer.contact}`
                    "
                    :color="getColor(index)"
                  >
                    <v-icon class="mr-2" color="white">mdi-message</v-icon>
                    <span class="white--text text-capitalize"
                      >{{ $vuetify.breakpoint.xs ? "" : "Fazer pedido com" }}
                      {{ organizer.name }}</span
                    >
                  </v-btn>
                </div>
              </div>
            </v-timeline-item>
            <v-timeline-item
              :color="
                product.stage === 2
                  ? 'orange'
                  : product.stage > 2 || product.stage === 0
                  ? 'green'
                  : 'grey'
              "
              small
            >
              <div>
                <h4>Pagamentos</h4>
                <div v-if="product.stage === 2">
                  <p>
                    <span>Encerra {{ getDate(product.paymentEnd) }}</span>
                  </p>
                  <p v-for="d in product.bankDetails.split('.\s+')" :key="d">
                    {{ d }}
                  </p>
                  <v-btn
                    class="my-2 mx-2"
                    v-for="(organizer, index) in product.organizers"
                    :key="index"
                    :href="
                      `https://api.whatsapp.com/send?phone=${organizer.contact}`
                    "
                    target="_blank"
                    :color="getColor(index)"
                  >
                    <v-icon class="mr-2" color="white">mdi-message</v-icon>
                    <span class="white--text text-capitalize"
                      >{{ $vuetify.breakpoint.xs ? "" : "Enviar para" }}
                      {{ organizer.name }}</span
                    >
                  </v-btn>
                </div>
              </div>
            </v-timeline-item>
            <v-timeline-item
              :color="
                product.stage === 3
                  ? 'orange'
                  : product.stage > 3 || product.stage === 0
                  ? 'green'
                  : 'grey'
              "
              small
            >
              <h4>Aguardando entrega</h4>
              <div v-if="product.stage === 3 && product.tracking">
                <v-btn
                  class="my-2 mx-2"
                  v-for="(trackingNumber, index) in product.tracking"
                  :key="index"
                  :color="`primary darken-${index}`"
                  :href="trackingNumber"
                  target="_blank"
                  >Rastreamento {{ index + 1 }}
                  <v-icon class="ml-4">mdi-truck</v-icon></v-btn
                >
              </div>

              <p v-else-if="product.stage === 3">Fazendo pedido</p>
            </v-timeline-item>
            <v-timeline-item
              :color="
                product.stage === 4
                  ? 'orange'
                  : product.stage > 4 || product.stage === 0
                  ? 'green'
                  : 'grey'
              "
              small
            >
              <div>
                <h4>Distribuindo</h4>
                <h3 v-if="product.stage === 4 && product.distributionHub">
                  <v-icon color="green" class="ml-4">mdi-map-marker</v-icon>
                  {{ product.distributionHub }}
                </h3>
                <p>
                  {{ Math.round(product.percentReceived) }}% das pessoas
                  receberam
                </p>
              </div>
            </v-timeline-item>
          </v-timeline>
        </v-card-text>
      </v-card>
    </v-col>
    <v-col cols="12" md="12">
      <v-card>
        <v-card-title
          >Participantes:
          {{
            product.participants && product.participants.length
          }}</v-card-title
        >
        <v-divider />
        <p class="ml-4 caption" v-if="product.stage === 2">
          <v-icon color="red" small>mdi-exclamation-thick</v-icon> Atenção, não
          pagamento até a data limite ({{ getDate(product.paymentEnd) }}) irá
          acarretar em abandono do pedido.
        </p>
        <v-row>
          <v-col cols="12" md="5" class="pl-8">
            <CobuyParticipant :list="firstHalf" />
          </v-col>
          <v-divider vertical />
          <v-col cols="12" md="6" class="pl-8">
            <CobuyParticipant :list="secondHalf" />
          </v-col>
        </v-row>
        <v-card-subtitle>
          <v-row v-if="product.stage === 2">
            <v-col cols="6">
              <span
                >Total: <span class="font-weight-black">{{ total }}</span></span
              >
            </v-col>
            <v-col cols="6">
              <span
                >Faltam: <span class="font-weight-black">{{ left }}</span></span
              >
            </v-col>
          </v-row>
          <div>
            Confirmados: <span class="font-weight-black">{{ confirmed }}</span>
          </div>
        </v-card-subtitle>
      </v-card>
    </v-col>
  </v-row>
</template>
<script>
import { TimeAgo } from "vue2-timeago";
import CobuyParticipant from "@/components/CobuyParticipant.vue";
import colors from "vuetify/lib/util/colors";
import dayjs from "dayjs";

export default {
  props: {
    product: [Promise, Object]
  },
  components: {
    TimeAgo,
    CobuyParticipant
  },
  data: () => ({
    selection: 1
  }),
  computed: {
    total() {
      if (this.product && this.product.participants) {
        return this.product.participants.reduce((prev, curr) => {
          return curr.dueAmount.add(prev).format();
        }, 0);
      } else {
        return 0;
      }
    },
    confirmed() {
      if (this.product && this.product.participants) {
        return this.product.participants
          .filter(i => i.payed)
          .reduce((prev, curr) => {
            return curr.dueAmount.add(prev).format();
          }, 0);
      } else {
        return 0;
      }
    },
    left() {
      if (this.product && this.product.participants) {
        return this.product.participants
          .filter(i => !i.payed)
          .reduce((prev, curr) => {
            return curr.dueAmount.add(prev).format();
          }, 0);
      } else {
        return 0;
      }
    },
    amountPeople() {
      if (this.product && this.product.participants) {
        let participants = this.product.participants;
        if (this.product.stage === 0 || this.product.stage > 2)
          participants = this.product.participants.filter(p => p.payed);
        return Math.ceil(participants.length / 2);
      } else return 0;
    },
    firstHalf() {
      if (this.amountPeople > 0) {
        let participants = this.product.participants;
        if (this.product.stage === 0 || this.product.stage > 2)
          participants = this.product.participants.filter(p => p.payed);
        return participants.slice(0, this.amountPeople);
      }
    },
    secondHalf() {
      if (this.amountPeople > 0) {
        let participants = this.product.participants;
        if (this.product.stage === 0 || this.product.stage > 2)
          participants = this.product.participants.filter(p => p.payed);
        return participants.slice(-this.amountPeople);
      }
    }
  },
  methods: {
    getColor(i) {
      return colors.green["darken" + (i * 2 + 1)];
    },
    getDate(date) {
      const d = new Date(date);
      return dayjs(d).format("DD/MM");
    }
  }
};
</script>
<style scoped>
@media (min-width: 960px) {
  .co-cards {
    height: 900px;
  }
}

@media (min-width: 1264px) {
  .co-cards {
    height: 750px;
  }
}
</style>
