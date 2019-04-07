<template>
  <v-layout align-start justify-center row>
    <v-flex sm12 class="map-box">
      <l-map :zoom="map.zoom" :center="map.center" ref="map" @click="setPoint" min-zoom="10" max-zoom="15">
        <l-control-layers position="topleft"></l-control-layers>
        <l-tile-layer :url="map.url" :attribution="map.attribution"></l-tile-layer>
        <l-marker v-for="marker of map.markers" :key="marker.id" :lat-lng="marker.latlng"></l-marker>
        <l-polygon v-for="polygon of map.polygons" :key="polygon.id" :lat-lngs="polygon.coords"></l-polygon>
        <l-image-overlay v-for="image of images" :key="image.id" :url="image.url" :bounds="image.bounds"></l-image-overlay>
      </l-map>
    </v-flex>
  </v-layout>
</template>

<script>
import { LMap, LTileLayer, LMarker, LPolygon, LImageOverlay, LControlLayers } from 'vue2-leaflet';

export default {
  components: {
    LMap,
    LTileLayer,
    LMarker,
    LPolygon,
    LImageOverlay,
    LControlLayers
  },
  props: ['points', 'images'],
  data: () => {
    return {
      map: {
        zoom: 14,
        center: window.L.latLng(4.600620, -74.070083),
        url:'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
        attribution:'&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
        markers: [],
        polygons: [],
        images: []
      }
    }
  },
  methods: {
    clearMap: function() {
      this.map.markers = []
      this.map.polygons = []
    },
    setPoint: function(event) {
      let selectedPoint = this.points.find((point) => point.selected)

      if (selectedPoint) {
        if (selectedPoint.marker) {
          let idx = this.map.markers.indexOf(selectedPoint.marker)
          this.map.markers.splice(idx, 1)

          let markerPoint = {
            latlng: event.latlng
          }

          this.map.markers.push(markerPoint)
          selectedPoint.marker = markerPoint
        } else {
          let markerPoint = {
            id: selectedPoint.id,
            latlng: event.latlng
          }

          this.map.markers.push(markerPoint)
          this.$set(selectedPoint, 'marker', markerPoint)
        }

        selectedPoint.lat = event.latlng.lat
        selectedPoint.lng = event.latlng.lng
        selectedPoint.selected = false

        if (this.points.filter((point) => point.lat).length === 4) {
          // eslint-disable-next-line
          this.$refs.map.setBounds(this.points.map((point) => window.L.latLng(point.lat, point.lng)))

          this.map.polygons.splice(0, 1)
          this.map.polygons.push({
            id: 0,
            name: 'Zona de estudio',
            type: 'polygon',
            coords: this.points.map((point) => [point.lat, point.lng])
          })
        }
      }
    }
  }
}
</script>

<style scoped>
.map-box {
  padding: 20px !important;
}

.map-box div {
  height: 500px;
  width: 100%;
  box-shadow: 0 0 5px gray;
}

</style>
