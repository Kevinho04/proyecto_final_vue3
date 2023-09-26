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
          <v-btn @click="enviarFormulario" color="primary">Registrar</v-btn>
        </v-col>
      </v-row>
    </v-container>
  </v-form>
</template>

<script>
import firebase from 'firebase/app';
import 'firebase/firestore';

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
    };
  },
  methods: {
    enviarFormulario() {
      // Valida que los campos de entrada no estén vacíos
      if (this.nombre === "" || this.apellidos === "" || this.tipoDocumento === null || this.numeroDocumento === "" || this.telefono === "" || this.correo === "" || this.direccion === "") {
        alert("Por favor, complete todos los campos.");
        return;
      }

      // Accede a la colección de Firestore donde deseas almacenar los datos
      const db = firebase.firestore();
      const datosRegistro = {
        nombre: this.nombre,
        apellidos: this.apellidos,
        tipoDocumento: this.tipoDocumento,
        numeroDocumento: this.numeroDocumento,
        telefono: this.telefono,
        correo: this.correo,
        direccion: this.direccion,
      };

      // Agrega los datos a Firestore
      db.collection('registros').add(datosRegistro)
        .then(() => {
          console.log('Datos registrados correctamente');
          // Puedes redirigir al usuario a otra página aquí si es necesario
        })
        .catch(error => {
          console.error('Error al registrar los datos:', error);
        });
    },
  },
};
</script>
