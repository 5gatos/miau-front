<template>
  <v-layout align-center justify-center row fill-height>
    <v-responsive>
      <v-container fill-height>
        <v-layout align-center>
          <v-flex justify-center class="white-box">
            <h3 light class="display-3 text-xs-center">MIAU: Modelo Integral de Aguas Urbanas</h3>
            <p class="mb-3"></p>
            <p light class="subheading text-xs-center">Bienvenido a MIAU, el modelo integral de aguas urbanas. Nuestro modelo busca entregar a las empresas de acueducto una herramienta para mínimizar los problemas de sobrecarga en la red de alcantarillado durante precipitaciones, además de permitir a los tomadores de decisiones la posibilidad de cuantificar la adaptación al cambio climático por excesos de lluvia.</p>
            <v-divider class="my-5"></v-divider>
            <div light class="title mb-4 text-xs-center">Te aconsejamos que pases por nuestro dashboard!</div>
            <div class="text-xs-center">
              <v-btn class="mx-0" color="secondary" large @click="goToDashboard">
                <span>Ir al Dashboard</span> &nbsp; <v-icon>fas fa-globe-americas</v-icon>
              </v-btn>
            </div>
          </v-flex>
        </v-layout>
      </v-container>
    </v-responsive>
  </v-layout>
</template>

<script>
export default {
  data: () => ({

  }),
  methods: {
    goToDashboard: function() {
      this.$router.push('/dashboard')
    }
  }
}
</script>

<style>
.white-box {
  background-color: rgba(255, 255, 255, 0.8);
  padding: 30px;
  border-radius: 5px;
}
</style>
