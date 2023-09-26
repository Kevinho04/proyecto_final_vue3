<template>
  <v-card max-width="1820" class="mx-auto" color="blue-lighten-5">
    <v-layout>
      <v-app-bar
        color="red darken-3"
        dark
        app
      >
        <template v-slot:image>
          <v-img
            gradient="to top right, rgba(255, 152, 0, .8), rgba(255, 193, 7, .8)"
          ></v-img>
        </template>

        <template v-slot:prepend>
          <v-app-bar-nav-icon></v-app-bar-nav-icon>
        </template>
        <v-app-bar-title class="font-weight-bold yellow--text text--darken-4">Grilled Burger</v-app-bar-title>
        <v-img
            src="../assets/LogoGrilled.png"
          ></v-img>
        <v-spacer></v-spacer>
        <v-btn icon to="/login">
          <v-icon class="yellow--text text--darken-4">mdi-account-multiple</v-icon>
        </v-btn>
      </v-app-bar>

      <!-- Contenido principal -->
      <v-main>
        <!-- Agrega el contenido de las rutas aquí -->
        <router-view></router-view>
      </v-main>

      <v-navigation-drawer
        expand-on-hover
        rail
        color="orange lighten-3"
      >
        <v-list>
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title class="yellow--text text--darken-4 font-weight-bold">Kevin Ardila</v-list-item-title>
              <v-list-item-subtitle class="yellow--text text--darken-3">kevina_ardilap@soy.sena.edu.co</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-list>

        <v-divider></v-divider>

        <v-list dense nav>
          <v-list-item prepend-icon="mdi-home" to="/" class="yellow--text text--darken-4">Inicio</v-list-item>
          <v-list-item prepend-icon="mdi-food" to="/menu" class="yellow--text text--darken-4">Menú</v-list-item>
          <v-list-item prepend-icon="mdi-account-tie" to="/perfil" class="yellow--text text--darken-4">Perfil</v-list-item>
        </v-list>
      </v-navigation-drawer>
    </v-layout>
  </v-card>
</template>

<script>
export default {
  name: 'PruebaC',
};
</script>

<style scoped>
/* Agrega tus estilos personalizados aquí si es necesario */
</style>
