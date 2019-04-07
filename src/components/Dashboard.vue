<template>
  <v-container grid-list-md>
    <v-layout align-center fill-height justify-center row>
      <v-flex>
        <v-card light color="white">
          <v-layout align-start fill-height justify-start row>
            <v-flex sm6>
              <v-card light color="white">
                <miau-map :points="points" :images="images" ref="map"></miau-map>
              </v-card>
            </v-flex>
            <v-flex sm6>
              <v-card light color="white">
                <v-card-title primary class="title justify-center">INFORMACIÓN DE ENTRADA</v-card-title>
                <miau-user-form :points="points" :state="state" :bauData="bauData" @stateCompleted="processState" @clearForm="clearData"></miau-user-form>
              </v-card>
            </v-flex>
          </v-layout>
        </v-card>
      </v-flex>
    </v-layout>
    <!--<v-layout align-start fill-height justify-start>
      <v-flex sm12>
        <v-card light color="white">
          <v-card-title primary class="title justify-center">Resultados</v-card-title>
          <miau-results></miau-results>
        </v-card>
      </v-flex>
    </v-layout>-->
  </v-container>
</template>

<script>
import MapComponent from './Map.vue'
import UserFormComponent from './UserForm.vue'

export default {
  components: {
    'miau-map': MapComponent,
    'miau-user-form': UserFormComponent
  },
  data: function() {
    return {
      state: 0,
      bauData: null,
      clearMap: false,
      points: [
        { id: 1, lat: null, lng: null, selected: false },
        { id: 2, lat: null, lng: null, selected: false },
        { id: 3, lat: null, lng: null, selected: false },
        { id: 4, lat: null, lng: null, selected: false }
      ],
      images: []
    }
  },
  methods: {
    processState: function() {
      this.state += 1

      if (this.state === 1) {
          this.bauData = {
            price: '100.000.000'
          }

          this.images.push({
            id: 5,
            url: 'http://joorge.com/HackTheRisk/image.png',
            bounds: [window.L.latLng(4.6100525, -74.0756183), window.L.latLng(4.5861576, -74.0586516)]
          })
      } else if(this.state === 3) {
        this.$toastr.info('Generando resultados...', {
          timeout: 5000
        })

        let time = Math.round((3000 + (Math.random() * 2000)))
        setTimeout(() => {
          this.$toastr.clear()
          this.$toastr.success('La información ha sido generada correctamente', 'Información generada', {
            timeout: 8000
          })
        }, time)
      }
    },
    clearData: function() {
      this.state = 0
      this.points.map((point) => {
        point.lat = null
        point.lng = null
        point.selected = false
        point.marker = null

        return point
      })
      this.images = []

      this.$refs.map.clearMap()
    }
  }
}

</script>

<style>
#toast-container > div {
  opacity: 1 !important;
}
</style>
