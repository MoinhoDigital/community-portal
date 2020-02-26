<template>
  <div class="map">
    <Welcome :toggle="toggleWelcome" :open="welcome" />
    <Map />
  </div>
</template>

<script>
// @ is an alias to /src
import Welcome from "@/components/Welcome.vue";
import Map from "@/components/Map.vue";

export default {
  name: "community-map",
  components: {
    Welcome,
    Map
  },
  data() {
    return {
      position: null,
      welcomed: true
    };
  },
  computed: {
    welcome: {
      get: function() {
        if (localStorage) {
          const isWelcomed = localStorage.getItem("welcome");
          if (isWelcomed === "true") return false;
        }
        return this.welcomed;
      }
    }
  },
  mounted() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        this.position = position.coords;
      });
    }
  },
  methods: {
    toggleWelcome() {
      if (localStorage) {
        localStorage.setItem("welcome", "true");
      }
      this.welcomed = !this.welcomed;
    }
  }
};
</script>
<style scoped>
.map {
  margin-top: -25px;
}
</style>
