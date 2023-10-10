<template>
  <v-form>
    <v-container>
      <v-row>
        <v-col cols="12" md="6">
          <v-text-field v-model="nombre" label="Nombre"></v-text-field>
        </v-col>
        <v-col cols="12" md="6">
          <v-text-field v-model="apellidos" label="Apellidos"></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" md="6">
          <v-text-field v-model="usuario" label="Usuario"></v-text-field>
        </v-col>
        <v-col cols="12" md="6">
          <v-text-field v-model="password" label="Contraseña" type="password"></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" md="6">
          <v-select
            v-model="tipoDocumento"
            :items="tiposDocumento"
            label="Tipo de Documento"
            required
          ></v-select>
        </v-col>
        <v-col cols="12" md="6">
          <v-text-field v-model="numeroDocumento" label="Número de Documento"></v-text-field>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="12" md="6">
          <v-text-field v-model="telefono" label="Teléfono"></v-text-field>
        </v-col>
        <v-col cols="12" md="6">
          <v-text-field v-model="correo" label="Correo"></v-text-field>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="12">
          <v-text-field v-model="direccion" label="Dirección"></v-text-field>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="12">
          <v-btn @click="agregarUsuario()" color="primary">Registrar</v-btn>
        </v-col>
      </v-row>
    </v-container>
  </v-form>
</template>

<script>
import db from '@/firebase/init';
import { addDoc,collection } from 'firebase/firestore';

export default {
  data() {
    return {
      nombre: "",
      apellidos: "",
      tipoDocumento: null,
      tiposDocumento: ["Cédula de Ciudadanía", "Pasaporte", "Cédula de Extranjería"],
      numeroDocumento: "",
      telefono: "",
      correo: "",
      direccion: "",
      usuario:'',
      password:'',
    };
  },
  methods: {
    enviarFormulario() {
      if (this.nombre === "" || this.apellidos === "" || this.tipoDocumento === null || this.numeroDocumento === "" || this.telefono === "" || this.correo === "" || this.direccion === "") {
        alert("Por favor, complete todos los campos.");
        return;
      }
      },
      async agregarUsuario(){
      const ref = collection(db,'Usuarios');
      const datosRegistro = {
        nombre: this.nombre,
        apellidos: this.apellidos,
        tipoDocumento: this.tipoDocumento,
        numeroDocumento: this.numeroDocumento,
        telefono: this.telefono,
        correo: this.correo,
        direccion: this.direccion,
        usuario:this.usuario,
        password:this.password,
    }
    await addDoc(ref,datosRegistro)
},
  },
}
</script>
