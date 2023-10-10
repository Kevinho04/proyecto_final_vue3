<template>
    <v-data-table
      :headers="headers"
      :items="desserts"
      :sort-by="[{ key: 'numeroDocumento', order: 'asc' }]"
      class="elevation-1"
    >
      <template v-slot:top>
        <v-toolbar
          flat
        >
          <v-toolbar-title>Datos Usuarios</v-toolbar-title>
          <v-divider
            class="mx-4"
            inset
            vertical
          ></v-divider>
          <v-spacer></v-spacer>
          <v-dialog
            v-model="dialog"
            max-width="500px"
          >
            <template v-slot:activator="{ props }">
              <v-btn
                color="primary"
                dark
                class="mb-2"
                v-bind="props"
              >
                Nuevo Usuario
              </v-btn>
            </template>
            <v-card>
              <v-card-title>
                <span class="text-h5">{{ formTitle }}</span>
              </v-card-title>
  
              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col
                      cols="12"
                      sm="6"
                      md="4"
                    >
                    <v-select
                      v-model="tipoDocumento"
                      :items="tiposDocumento"
                      label="Tipo de Documento"
                      required>
                    </v-select>
                    </v-col>
                    <v-col
                      cols="12"
                      sm="6"
                      md="4"
                    >
                      <v-text-field
                        v-model="editedItem.numeroDocumento"
                        label="Numero de Documento"
                      ></v-text-field>
                    </v-col>
                    <v-col
                      cols="12"
                      sm="6"
                      md="4"
                    >
                      <v-text-field
                        v-model="editedItem.nombre"
                        label="Nombre"
                      ></v-text-field>
                    </v-col>
                    <v-col
                      cols="12"
                      sm="6"
                      md="4"
                    >
                      <v-text-field
                        v-model="editedItem.apellidos"
                        label="Apellidos"
                      ></v-text-field>
                    </v-col>
                    <v-col
                      cols="12"
                      sm="6"
                      md="4"
                    >
                      <v-text-field
                        v-model="editedItem.telefono"
                        label="Telefono"
                      ></v-text-field>
                    </v-col>
                    <v-col
                      cols="12"
                      sm="6"
                      md="4"
                    >
                      <v-text-field
                        v-model="editedItem.correo"
                        label="Correo"
                      ></v-text-field>
                    </v-col>
                    <v-col
                      cols="12"
                      sm="6"
                      md="4"
                    >
                      <v-text-field
                        v-model="editedItem.direccion"
                        label="Direccion"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>
  
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                  color="blue-darken-1"
                  variant="text"
                  @click="close"
                >
                  Cancel
                </v-btn>
                <v-btn
                  color="blue-darken-1"
                  variant="text"
                  @click="save"
                >
                  Save
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
          <v-dialog v-model="dialogDelete" max-width="500px">
            <v-card>
              <v-card-title class="text-h5">Are you sure you want to delete this item?</v-card-title>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue-darken-1" variant="text" @click="closeDelete">Cancel</v-btn>
                <v-btn color="blue-darken-1" variant="text" @click="deleteItemConfirm">OK</v-btn>
                <v-spacer></v-spacer>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-toolbar>
      </template>
      <template v-slot:actions="{ item }">
        <v-icon
          size="small"
          class="me-2"
          @click="editItem(item)"
        >
          mdi-pencil
        </v-icon>
        <v-icon
          size="small"
          @click="deleteItem(item)"
        >
          mdi-delete
        </v-icon>
      </template>
      <template v-slot:no-data>
        <v-progress-linear
        indeterminate
        color="red-lighten-5">

        </v-progress-linear>
      </template>
    </v-data-table>
  </template>
  <script>
  import db from '@/firebase/init'
  import { collection, getDocs, query, addDoc } from 'firebase/firestore'
    export default {
      data: () => ({
        dialog: false,
        tiposDocumento: ["Cédula de Ciudadanía", "Pasaporte", "Cédula de Extranjería"],
        dialogDelete: false,
        headers: [
          {
            title: 'N.Documento',
            align: 'start',
            key: 'numeroDocumento',
          },
          { title: 'Nombre', key: 'nombre' },
          { title: 'Apellidos', key: 'apellidos' },
          { title: 'Telefono', key: 'telefono' },
          { title: 'Correo', key: 'correo',sortable: false,},
          { title: 'Dirección', key: 'direccion',sortable: false,},
        ],
        desserts: [],
        editedIndex: -1,
        editedItem: {
          keyid:0,
          tipoDocumento:'',
          numeroDocumento:0,
          nombre: '',
          apellidos: '',
          telefono: 0,
          correo:'',
          direccion:'',
        },
        defaultItem: {
          keyid:0,
          tipoDocumento:'',
          numeroDocumento:0,
          nombre: '',
          apellidos: '',
          telefono: 0,
          correo:'',
          direccion:'',
        },
      }),
  
      computed: {
        formTitle () {
          return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
        },
      },
  
      watch: {
        dialog (val) {
          val || this.close()
        },
        dialogDelete (val) {
          val || this.closeDelete()
        },
      },
  
      created () {
        this.listar()
      },
  
      methods: {
        async listar(){
          const q = query(collection(db,'Usuarios'))
          const result = await getDocs(q)
          result.forEach((doc)=>{
            this.desserts.push({
            keyid:doc.id,
            numeroDocumento:doc.data().numeroDocumento,
            nombre:doc.data().nombre,
            apellidos:doc.data().apellidos,
            telefono:doc.data().telefono,
            correo:doc.data().correo,
            direccion:doc.data().direccion,
          })
          })
        },
        async agregarUsuario(){
      const ref = collection(db,'Usuarios');
      const datosRegistro = {
        nombre: this.editedItem.nombre,
        apellidos: this.editedItem.apellidos,
        tipoDocumento: this.editedItem.tipoDocumento,
        numeroDocumento: this.editedItem.numeroDocumento,
        telefono: this.editedItem.telefono,
        correo: this.editedItem.correo,
        direccion: this.editedItem.direccion,
    }
    await addDoc(ref,datosRegistro)
},
  
        editItem (item) {
          this.editedIndex = this.desserts.indexOf(item)
          this.editedItem = Object.assign({}, item)
          this.dialog = true
        },
  
        deleteItem (item) {
          this.editedIndex = this.desserts.indexOf(item)
          this.editedItem = Object.assign({}, item)
          this.dialogDelete = true
        },
  
        deleteItemConfirm () {
          this.desserts.splice(this.editedIndex, 1)
          this.closeDelete()
        },
  
        close () {
          this.dialog = false
          this.$nextTick(() => {
            this.editedItem = Object.assign({}, this.defaultItem)
            this.editedIndex = -1
          })
        },
  
        closeDelete () {
          this.dialogDelete = false
          this.$nextTick(() => {
            this.editedItem = Object.assign({}, this.defaultItem)
            this.editedIndex = -1
          })
        },
  
        save () {
          if (this.editedIndex > -1) {
            Object.assign(this.desserts[this.editedIndex], this.editedItem)
            
          } else {
            this.desserts.push(this.editedItem)
            this.agregarUsuario()
          }
          this.close()
        },
      },
    }
  </script>