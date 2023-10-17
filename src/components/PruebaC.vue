<template>
  <v-card max-width="1820" class="mx-auto" color="red-lighten-5">
    <v-layout>
      <v-app-bar
        color="red-darken-3"
        dark
        app
      >
        <template v-slot:image>
          <v-img
            gradient="to top right, rgba(255, 87, 51, .8), rgba(255, 0, 0, .8)"
          ></v-img>
        </template>

        <template v-slot:prepend>
          <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
        </template>
        
        <v-app-bar-title class="font-weight-bold yellow--text text--darken-4">Grilled Burger</v-app-bar-title>
        
        <v-img
          src="../assets/LogoGrilled.png"
        ></v-img>
        
        <v-spacer></v-spacer>
        <v-btn icon to="/menu">
          <v-icon class="yellow--text text--darken-4">mdi-cart</v-icon>
        </v-btn> 
        <v-btn @click="showPop=true">
          <v-icon class="yellow--text text--darken-4">mdi-account-multiple</v-icon>
        </v-btn>
      </v-app-bar>
      <v-dialog v-model="showPop">
        <v-card class="logincard">
          <v-card-title class="headline text-center mb-4">Inicio de Sesión</v-card-title>
  
        <v-form fast-fail @submit.prevent>
          <v-text-field
            v-model="username"
            label="Usuario"
            :rules="usernameRules"
          ></v-text-field>
  
          <v-text-field
            v-model="password"
            :type="showPassword ? 'text' : 'password'"
            label="Contraseña"
            :rules="passwordRules"
            append-icon="mdi-eye"
            @click:append="togglePasswordVisibility"
          ></v-text-field>
          <v-text>¿Aún no tienes cuenta?</v-text>
          <router-link @click="showPop=false" to="/registro">Regístrate</router-link>
  
          <v-btn @click="LogIn()" type="submit" block class="mt-4" color="gradient">
            Ingresar
          </v-btn>
        </v-form>
        </v-card>
      </v-dialog>
      <!-- Contenido principal -->
      <v-main>
        <!-- Agrega el contenido de las rutas aquí -->
        <router-view></router-view>
      </v-main>

      <v-navigation-drawer
        v-model="drawer"
        expand-on-hover
        rail
        color="red-lighten-4"
      >
        <v-list dense nav>
          <v-list-item prepend-icon="mdi-home" to="/" class="yellow--text text--darken-4">Inicio</v-list-item>
          <v-list-item prepend-icon="mdi-food" to="/menu" class="yellow--text text--darken-4">Menú</v-list-item>
          <v-list-item prepend-icon="mdi-account-tie" to="/perfil" class="yellow--text text--darken-4">Perfil</v-list-item>
          <v-list-item prepend-icon="mdi-equalizer" to="/ventas" class="yellow--text text--darken-4">Pedidos</v-list-item>
          <v-list-item prepend-icon="mdi-account" to="/registrousuarios" class="yellow--text text--darken-4">Usuarios</v-list-item>
        </v-list>
      </v-navigation-drawer>
    </v-layout>
  </v-card>
</template>

<script>
import db from '@/firebase/init';
import { collection,getDocs,query } from 'firebase/firestore';
export default {
    name: 'PruebaC',
    data() {
        return {
            drawer: false, // Inicialmente, el cajón estará oculto
            showPop:false,
            usuarios:[],
      username: '',
      usernameRules: [
        value => !!value || 'Ingrese un nombre de usuario',
      ],
      password: '',
      passwordRules: [
        value => {
          if (value?.length >= 6) return true;
  
          return 'La contraseña debe tener al menos 6 caracteres.';
        },
      ],
      showPassword: false,
        };
    },
    methods: {
      togglePasswordVisibility() {
        this.showPassword = !this.showPassword;
      },
      async LogIn(){
        const q = query(collection(db,'Usuarios'))
          const result = await getDocs(q)
          result.forEach((doc)=>{
            this.usuarios.push({
            keyid:doc.id,
            usuario:doc.data().usuario,
            pass:doc.data().password,
          })
          })
          const vUsuario = this.usuarios.find((usuario)=>usuario.usuario === this.username && usuario.pass === this.password)
          if (vUsuario){
            alert("Ha ingresado")
            this.showPop = false
          }
      }
    },
};
</script>

<style scoped>
/* Estilos personalizados */
body {
  font-family: 'Arial', sans-serif;
  background-color: #fff;
}
.logincard{
  width: 30%;
  margin: 0 auto;
}

.v-app-bar {
  box-shadow: none;
  border-bottom: 2px solid #f0f0f0;
}

.v-app-bar-title {
  font-size: 24px;
}

.v-btn {
  font-weight: bold;
}

.v-navigation-drawer {
  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.1);
}

.v-list-item {
  padding: 12px 16px;
}

.v-list-item-title {
  font-weight: bold;
}

</style>
