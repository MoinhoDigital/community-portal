<template>
  <div class="map">
    <ClientOnly>
      <MglMap
        :mapStyle="mapStyle"
        :center="center"
        :zoom="$static.metadata.minZoom"
        :minZoom="$static.metadata.minZoom"
        :maxZoom="15.7"
        :maxBounds="maxBounds"
        :attributionControl="false"
        :accessToken="accessToken.length > 0 ? accessToken : null"
      >
        <!-- <MglNavigationControl position="top-right" />
        <MglGeolocateControl position="top-right" :trackUserLocation="true" />-->
        <MglMarker
          v-for="marker in markers"
          :key="marker.id"
          :coordinates="marker.coords"
          @click="handleEnter"
        >
          <div slot="marker" class="marker">
            <span>
              <v-icon :color="marker.color" size="22">{{ marker.icon }}</v-icon>
            </span>
          </div>
          <MglPopup :offset="35" anchor="bottom">
            <v-card>
              <v-card-title>
                {{ marker.name }}
                <div v-if="marker.order">
                  <v-tooltip top>
                    <template v-slot:activator="{ on, attrs }">
                      <v-icon
                        class="ml-2"
                        v-bind="attrs"
                        v-on="on"
                        color="orange"
                        >mdi-android-messages</v-icon
                      >
                    </template>
                    <span>Sob encomenda</span>
                  </v-tooltip>
                </div>
              </v-card-title>
              <v-card-text>
                <v-chip
                  class="mx-2 my-2 text-capitalize"
                  v-for="product in marker.products"
                  :key="product"
                  >{{ product }}
                </v-chip>
                <v-icon :color="marker.category.color" size="22" class="pl-2">{{
                  marker.category.icon
                }}</v-icon>
              </v-card-text>
              <v-card-actions v-if="marker.contact">
                <v-btn
                  :href="
                    `https://api.whatsapp.com/send?phone=${marker.contact}`
                  "
                  color="green"
                >
                  <v-icon class="mr-2" color="white">mdi-message</v-icon>
                  <span class="white--text"> {{ marker.contact }} </span>
                </v-btn>
              </v-card-actions>
            </v-card>
            <div class="caption">
              <h3></h3>
              <!-- <g-image :alt="marker.name" v-show="marker.imagem" :src="marker.imagem" /> -->
              <!-- <p>{{marker.descricao}}</p> -->
            </div>
          </MglPopup>
        </MglMarker>
      </MglMap>
    </ClientOnly>
  </div>
</template>

<static-query>
  query {
    metadata {
      mapboxAccessToken
      tileServer
      maxZoom
      minZoom
      maxCoords
      minCoords
      mapCenter
    }
  }
</static-query>

<script>
import placeHelper from "~/lib/place-category-helper";
export default {
  components: {
    MglMap: () => {
      if (process.isClient) {
        return import("vue-mapbox")
          .then(m => m.MglMap)
          .catch();
      }
    },
    MglMarker: () => {
      if (process.isClient) {
        return import("vue-mapbox")
          .then(m => m.MglMarker)
          .catch();
      }
    },
    MglPopup: () => {
      if (process.isClient) {
        return import("vue-mapbox")
          .then(m => m.MglPopup)
          .catch();
      }
    }
  },
  props: {
    places: { type: Array, default: [] }
  },
  data() {
    return {
      map: null,
      defaultCoord: [-47.46, -14.06]
    };
  },
  computed: {
    center() {
      return this.$static.metadata.mapCenter || defaultCoord;
    },
    maxBounds() {
      const maxBound = [
        this.$static.metadata.minCoords || defaultCoord,
        this.$static.metadata.maxCoords || defaultCoord
      ];
      return maxBound;
    },
    accessToken() {
      return this.$static.metadata.mapboxAccessToken || "";
    },
    mapStyle() {
      if (this.$static.metadata.mapboxAccessToken)
        return this.$static.metadata.tileServer;
      return {
        version: 8,
        sources: {
          "simple-tiles": {
            type: "raster",
            tiles: [
              `${this.$static.metadata.tileServer ||
                "http://127.0.0.1:3000"}/{z}/{x}/{y}.jpeg`
            ],
            tileSize: 256
          }
        },
        layers: [
          {
            id: "simple-tiles",
            type: "raster",
            source: "simple-tiles",
            minzoom: this.$static.metadata.minZoom,
            maxzoom: this.$static.metadata.maxZoom
          }
        ]
      };
    },
    markers() {
      const markers = this.places
        .map(i => {
          let { lat, lon } = i.node.coords;
          if (!lat || !lon) return;
          const style = placeHelper(i.node.category);
          return {
            ...i.node,
            icon: style.icon,
            category: i.node.category,
            color: style.color,
            coords: [parseFloat(lon), parseFloat(lat)]
          };
        })
        .filter(i => i);
      return markers;
    }
  },
  mounted() {
    console.log("MOUNTED HERE");
    window.mapboxgl = require("mapbox-gl");
    var nav = new window.mapboxgl.NavigationControl();
    // navigator.geolocation.getCurrentPosition(function(location) {
    //   console.log(location.coords.latitude);
    //   console.log(location.coords.longitude);
    //   console.log(location.coords.accuracy);
    // });
    this.map = new window.mapboxgl.Map(this.mapStyle);
    console.log("GONNA TRY");

    map.addControl(nav, "top-right");

    console.log("MOUNTED");
  },
  methods: {
    handleEnter({ map, marker }) {
      map.easeTo({
        center: marker._lngLat,
        zoom: this.$static.metadata.maxZoom - 0.1,
        offset: [0, 300]
      });
    }
  }
};
</script>
<style>
.map,
map {
  background: grey;
  width: 100%;
  height: calc(100vh - 64px);
}
.marker {
  width: 0;
  height: 0;
}
.mapboxgl-popup {
  z-index: 9999;
  max-width: 90vw !important;
}

.marker span {
  display: flex;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  width: 30px;
  height: 30px;
  color: #000;
  background: #fff;
  border: solid 2px;
  border-radius: 0 70% 70%;
  box-shadow: 0 0 2px #000;
  cursor: pointer;
  transform-origin: 0 0;
  transform: rotateZ(-135deg);
}
.marker span * {
  transform: rotateZ(135deg);
}

@media (min-width: 500px) {
  .mapboxgl-popup {
    max-width: 500px !important;
  }
}
</style>
