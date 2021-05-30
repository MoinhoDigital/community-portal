<template>
  <div>
    <div
      v-for="participant in list"
      :key="participant.name"
      class="participant"
    >
      <v-row>
        <v-col cols="2">
          <v-icon
            :color="
              participant.received
                ? 'green'
                : participant.payed
                ? 'orange'
                : 'red'
            "
          >
            mdi-account
          </v-icon>
        </v-col>
        <v-col cols="6">
          <v-list-item-title v-text="participant.name"></v-list-item-title>
        </v-col>
        <v-col cols="4">
          <v-list-item-subtitle>
            {{ participant.dueAmount.format() }}
          </v-list-item-subtitle>
        </v-col>
      </v-row>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    list: Array
  }
};
</script>
<style>
.participant {
  border-bottom: 1px dashed lightgray;
}
</style>
