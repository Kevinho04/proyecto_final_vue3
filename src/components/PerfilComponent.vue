<template>
  <v-container>
    <v-card>
      <v-card-title class="headline">Perfil de Usuario</v-card-title>
      <v-card-text>
        <v-list>
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title>Nombre:Juan David</v-list-item-title>
              <v-list-item-subtitle>{{ user ? user.name : '' }}</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title>Apellidos:Bernal Santoyo</v-list-item-title>
              <v-list-item-subtitle>{{ user ? user.lastName : '' }}</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title>Tipo de Documento:Cedula de Ciudadania</v-list-item-title>
              <v-list-item-subtitle>{{ user ? user.documentType : '' }}</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title>Número del Documento:1097588749</v-list-item-title>
              <v-list-item-subtitle>{{ user ? user.documentNumber : '' }}</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title>Celular:3216598746</v-list-item-title>
              <v-list-item-subtitle>{{ user ? user.phone : '' }}</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title>Dirección:Conjunto Ruitoque Alto</v-list-item-title>
              <v-list-item-subtitle>{{ user ? user.address : '' }}</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
export default {
  name: 'PerfilComponent',
  props: {
    user: {
      type: Object,
      default: null
    }
  }
};
</script>
