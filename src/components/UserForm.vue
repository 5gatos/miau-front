<template>
  <v-container fluid grid-list>
    <v-layout row>
      <v-flex xs12>
        <v-card-text>
          <em><b>Aclaración:</b> El siguiente ejercicio ha sido recreado usando el periodo de tiempo 2011-2040.</em>
        </v-card-text>
        <v-expansion-panel>
          <v-expansion-panel-content :disabled="state !== 0" :value="state === 0">
            <template v-slot:header>
              <div>Puntos de Referencia</div>
            </template>
            <v-card>
              <table class="v-table v-table-hover">
                <thead>
                  <tr>
                    <th class="justify-center">#</th>
                    <th class="justify-center">Latitud</th>
                    <th class="justify-center">Longitud</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="point of points" @click="selectPoint(point)" :key="point.id" :class="point.selected ? 'grey lighten-3' : null">
                    <td class="justify-center">{{ point.id }}</td>
                    <td class="justify-center">{{ point.lat | round(6) }}</td>
                    <td class="justify-center">{{ point.lng | round(6) }}</td>
                  </tr>
                </tbody>
              </table>
            </v-card>
          </v-expansion-panel-content>
          <v-expansion-panel-content :disabled="state === 0" :value="state === 1">
            <template v-slot:header>
              <div>Escenario de Inundación - BAU</div>
            </template>
            <v-card>
              <v-container fluid grid-list-md>
                <v-layout row>
                  <v-flex xs12>
                    <h3><b>Costo de Inundación:</b> {{ bauData ? '$' + price : null }}</h3>
                  </v-flex>
                </v-layout>
                <v-layout row>
                  <v-flex xs12 md5 offset-md3>
                    <chart-radar :data="bauData"></chart-radar>
                  </v-flex>
                </v-layout>
              </v-container>
            </v-card>
          </v-expansion-panel-content>
          <v-expansion-panel-content :disabled="state < 1" :value="state === 2">
            <template v-slot:header>
              <div>Ponderación de Componentes</div>
            </template>
            <v-card>
              <v-container fluid grid-list-md>
                <v-layout row>
                  <v-flex xs12 md4>
                    <v-select :items="options" v-model="components.economic" label="Componente Económico" outline></v-select>
                  </v-flex>
                  <v-flex xs12 md4>
                    <v-select :items="options" v-model="components.environmental" label="Componente Ambiental" outline></v-select>
                  </v-flex>
                  <v-flex xs12 md4>
                    <v-select :items="options" v-model="components.social" label="Componente Social" outline></v-select>
                  </v-flex>
                </v-layout>
              </v-container>
            </v-card>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-flex>
    </v-layout>
    <v-layout row justify-space-between>
      <v-form ref="form" lazy-validation>
        <v-layout row>
          <v-btn color="indigo" class="white--text" :disabled="!validForm()" @click="updateData" v-if="state < 3">
            <template v-if="state === 0">
              CARGAR PUNTOS DE REFERENCIA
            </template>
            <template v-if="state === 1">
              INGRESAR DATOS AL MODELO
            </template>
            <template v-if="state === 2">
              CARGAR DATOS INICIALES
            </template>
          </v-btn>
          <v-spacer></v-spacer>
          <v-btn color="secondary" @click="resetForm">Limpiar</v-btn>
        </v-layout>
      </v-form>
    </v-layout>
  </v-container>
</template>

<script>
import RadarComponent from './Charts/Radar.vue'

export default {
  props: ['points', 'state', 'bauData'],
  components: {
    'chart-radar': RadarComponent
  },
  data: function() {
    return {
      components: {
        economic: null,
        environmental: null,
        social: null
      },
      options: ['Bajo', 'Medio', 'Alto'],
      price: Math.round((Math.random() * 50000000) + 50000000)
    }
  },
  methods: {
    selectPoint: function(point) {
      this.resetSelectedPoints()
      point.selected = true
    },
    resetForm: function() {
      this.$emit('clearForm')
    },
    resetSelectedPoints: function() {
      this.points[0].selected = false
      this.points[1].selected = false
      this.points[2].selected = false
      this.points[3].selected = false
    },
    validForm: function() {
      let valid = true

      if (this.state === 0) {
        valid = this.points[0].lat && this.points[1].lat && this.points[2].lat && this.points[3].lat
      } else if (this.state === 2) {
        valid = this.components.economic && this.components.environmental && this.components.social
      }

      return valid
    },
    updateData: function() {
      if (this.state === 0) {
        this.$emit('stateCompleted', { state: 0 })
      } else if (this.state === 1) {
        this.$emit('stateCompleted', { state: 1 })
      } else {
        this.$emit('stateCompleted', { state: 2 })
      }
    }
  },
  filters: {
    round: function(value, decimals) {
      decimals = decimals > 0 ? decimals : 3

      if (!value) {
        return '-'
      }

      let multi = 1
      for(let i = 0; i < decimals; i++) {
        multi *= 10
      }

      return Math.round(value * multi) / multi
    }
  }
}
</script>

<style scoped>
table.v-table tbody tr td, table.v-table thead tr th {
  border: 1px solid #dee2e6;
  text-align: center;
  padding: 0;
}

table.v-table.v-table-hover tbody tr:hover {
  background-color: #dddddd;
  cursor: pointer
}

.fas.fa-sm {
  font-size: 1em;
}
</style>
