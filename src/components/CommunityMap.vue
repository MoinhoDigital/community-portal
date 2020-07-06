<template>
  <div class="map">
    <MglMap
      :mapStyle="mapStyle"
      :center="center"
      :zoom="zoom"
      :minZoom="15"
      :maxZoom="19"
      :maxBounds="maxBounds"
      :attributionControl="false"
    >
      <MglNavigationControl position="top-right" />
      <MglGeolocateControl position="top-right" :trackUserLocation="true" />
      <MglMarker
        v-for="marker in markers"
        :key="marker.id"
        :coordinates="marker.coords"
        @mouseenter="handleEnter"
      >
        <div slot="marker" class="marker">
          <span>
            <v-icon :color="marker.color" size="22">{{marker.icon}}</v-icon>
          </span>
        </div>
        <MglPopup :offset="35" anchor="bottom">
          <div class="caption">
            <h3>{{ marker.nome }}</h3>
            <g-image :alt="marker.nome" v-if="marker.imagem" :src="marker.imagem" />
            <p>{{marker.descricao}}</p>
            <v-icon
              v-for="category in marker.allCat"
              :color="category.color"
              :key="category.id"
              size="22"
              class="pl-2"
            >{{category.icon}}</v-icon>
          </div>
        </MglPopup>
      </MglMarker>
    </MglMap>
  </div>
</template>

<script>
import Mapbox from "mapbox-gl";
import {
  MglMap,
  MglMarker,
  MglPopup,
  MglNavigationControl,
  MglGeolocateControl
} from "vue-mapbox";
import placeHelper from '~/lib/place-category-helper'
export default {
  components: {
    MglMap,
    MglMarker,
    MglPopup,
    MglNavigationControl,
    MglGeolocateControl
  },
  props: {
    places: { type: Array, default: [] }
  },
  data() {
    return {
      mapStyle: {
        version: 8,
        sources: {
          "simple-tiles": {
            type: "raster",
            tiles: [
              `${process.env.TILE_SERVER ||
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
            minzoom: 15,
            maxzoom: 19
          }
        ]
      },
      center: [-47.465106, -14.065287],
      zoom: 15,
      maxBounds: [
        [-47.48, -14.07],
        [-47.43, -14.04]
      ]
    };
  },
  computed: {
    markers () {
      const markers = this.places.map(i =>{
        const mainCategory = i.node.categorias[0].title
        const style = placeHelper(mainCategory)
        const allCat = i.node.categorias.map(c => {
          return {
            ...placeHelper(c.title),
            title: c.id
          }
        })
        return {
          ...i.node,
          icon: style.icon,
          allCat,
          color: style.color,
          coords: i.node.coords.map(c => {
            return parseFloat(c)
          })
        }
      })
      return markers
    }
  },
  created() {
    // We need to set mapbox-gl library here in order to use it in template
    this.mapbox = Mapbox;
  },
  methods: {
    handleEnter({ map, marker }) {
      map.easeTo({ center: marker._lngLat, zoom: 18, offset: [0, 300] });
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
</style>