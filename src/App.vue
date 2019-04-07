 <template>
  <v-app id="inspire">
    <v-toolbar color="indigo" dark fixed app class="toolbar-top">
      <v-toolbar-side-icon>
        <v-icon>fas fa-cat</v-icon>
      </v-toolbar-side-icon>
      <v-toolbar-title>MIAU - Modelo Integral de Aguas Urbanas</v-toolbar-title>
      <v-spacer></v-spacer>
    <v-toolbar-items class="hidden-sm-and-down">
      <v-btn router-link to="/" flat>
        <v-icon>fas fa-home</v-icon> &nbsp; <span>Inicio</span>
      </v-btn>
      <v-btn router-link to="/dashboard" flat>
        <v-icon>fas fa-globe-americas</v-icon> &nbsp; <span>Dashboard</span>
      </v-btn>
    </v-toolbar-items>
    </v-toolbar>
    <v-content class="box-background">
      <v-container fluid fill-height>
        <router-view></router-view>
      </v-container>
    </v-content>
    <v-footer height="auto" dark class="indigo">
      <v-layout justify-center row wrap>
        <v-flex py-3 text-xs-center white--text xs12>
          Copyright &copy; 2019 — <strong>5Gatos</strong>
        </v-flex>
      </v-layout>
  </v-footer>
  </v-app>
</template>

<script>
  export default {
    data: () => ({

    }),
    props: {

    }
  }
</script>

<style>
.box-background {
  background: url('http://www.minambiente.gov.co/images/GestionIntegraldelRecursoHidrico/imagenes/vertimientos-de-aguas-residuales.jpg');
  background-repeat: no-repeat;
  background-size: cover;
}

.v-toolbar.toolbar-top {
  z-index: 1000 !important;
}
</style>
