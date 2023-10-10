<template>
    <v-sheet width="300" class="mx-auto">
      <v-card elevation="5" class="pa-6">
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
          <router-link to="/registro">Regístrate</router-link>
  
          <v-btn @click="LogIn()" type="submit" block class="mt-4" color="gradient">
            Iniciar
          </v-btn>
        </v-form>
      </v-card>
    </v-sheet>
  </template>
  
  <script>
  import db from '@/firebase/init';
  import { collection,getDocs,query } from 'firebase/firestore';
  export default {
    data: () => ({
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
    }),
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
            this.$router.push({path:'/menu'})
          }
      }
    },
  };
  </script>
  
  <style>
  .gradient {
    background: linear-gradient(to right, #ff5722, #ffeb3b, #f44336);
    color: #fff;
  }
  
  .gradient:hover {
    background: linear-gradient(to right, #f44336, #ffeb3b, #ff5722);
  }
  </style>
  