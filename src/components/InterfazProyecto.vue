<template>
  <v-card max-width="1820" class="mx-auto" color="orange-lighten-4">
    <v-layout>
      <v-app-bar
        color="orange darken-4"
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

        <v-app-bar-title>Aplicativo Proyecto</v-app-bar-title>

        <v-spacer></v-spacer>

        <v-btn icon>
          <v-icon>mdi-food</v-icon>
        </v-btn>

        <v-btn icon>
          <v-icon>mdi-account-multiple</v-icon>
        </v-btn>

        <v-btn icon>
          <v-icon>mdi-dots-vertical</v-icon>
        </v-btn>
      </v-app-bar>

      <!-- Contenido principal -->
      <v-main>
      <v-container fluid>
        <router-view></router-view> <!-- Aquí se mostrará el contenido de la ruta actual -->
      </v-container>
    </v-main>
      <v-main>
        <v-container fluid>
          <v-row dense>
            <v-col
              v-for="n in 0"
              :key="n"
              cols="12"
            >
              <v-card
                :title="`Content ${n}`"
                :subtitle="`Subtitle for Content ${n}`"
                text="Lorem ipsum dolor sit amet consectetur, adipisicing elit.?"
              ></v-card>
            </v-col>
          </v-row>
        </v-container>
      </v-main>
    </v-layout>

    <!-- Cajón de navegación -->
    <v-navigation-drawer
      expand-on-hover
      rail
    >
      <v-list>
        <v-list-item
          prepend-avatar="src/assets/persona1.jpg"
          title="Kevin Ardila"
          subtitle="kevin666@gmail.com"
        ></v-list-item>
      </v-list>

      <v-divider></v-divider>

      <v-list density="compact" nav>
        <v-list-item prepend-icon="mdi-home" title="Inicio" value="Inicio"></v-list-item>
        <v-list-item prepend-icon="mdi-food" title="Menu" value="Menu"></v-list-item>
        <v-list-item prepend-icon="mdi-account-tie" title="Perfil" value="Perfil"></v-list-item>
      </v-list>
    </v-navigation-drawer>
  </v-card>
</template>