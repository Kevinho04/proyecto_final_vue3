<template>
  <v-data-table
    :headers="headers"
    :items="desserts"
    :sort-by="[{ key: 'nombre', order: 'asc' }]"
    class="elevation-1"
  >
    <template v-slot:top>
      <v-toolbar flat>
        <v-toolbar-title>Pedidos</v-toolbar-title>
        <v-divider class="mx-4" inset vertical></v-divider>
        <v-spacer></v-spacer>
        <v-dialog v-model="dialog" max-width="500px">
          <template v-slot:activator="{ props }">
            <v-btn color="primary" dark class="mb-2" v-bind="props">
              Nuevo Pedido
            </v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="text-h5">{{ formTitle }}</span>
            </v-card-title>

            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedItem.nombre" label="Nombre"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedItem.apellidos" label="Apellidos"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedItem.telefono" label="Telefono"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedItem.direccion" label="Direccion"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-file-input v-model="editedItem.comprobantePago" label="Comprobante de Pago" accept="image/*"></v-file-input>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedItem.pedido" label="Pedido"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedItem.valorTotal" label="Valor Total"></v-text-field>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue-darken-1" variant="text" @click="close">Cancelar</v-btn>
              <v-btn color="blue-darken-1" variant="text" @click="save">Guardar</v-btn>
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
      <v-icon size="small" class="me-2" @click="editItem(item)">
        mdi-pencil
      </v-icon>
      <v-icon size="small" @click="deleteItem(item)">
        mdi-delete
      </v-icon>
    </template>
    <template v-slot:no-data>
      <v-progress-linear indeterminate color="red-lighten-5"></v-progress-linear>
    </template>
  </v-data-table>
</template>

<script>
import db from '@/firebase/init';
import { collection, getDocs, addDoc } from 'firebase/firestore';

export default {
  data: () => ({
    dialog: false,
    headers: [
      { title: 'Nombre', key: 'nombre' },
      { title: 'Apellidos', key: 'apellidos' },
      { title: 'Teléfono', key: 'telefono' },
      { title: 'Dirección', key: 'direccion' },
      { title: 'Comprobante de Pago', key: 'comprobantePago' },
      { title: 'Pedido', key: 'pedido' },
      { title: 'Valor Total', key: 'valorTotal' },
    ],
    desserts: [],
    editedIndex: -1,
    editedItem: {
      nombre: '',
      apellidos: '',
      telefono: 0,
      direccion: '',
      comprobantePago: null,
      pedido: '',
      valorTotal: 0,
    },
    defaultItem: {
      nombre: '',
      apellidos: '',
      telefono: 0,
      direccion: '',
      comprobantePago: null,
      pedido: '',
      valorTotal: 0,
    },
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? 'New Item' : 'Edit Item';
    },
  },

  watch: {
    dialog(val) {
      val || this.close();
    },
    dialogDelete(val) {
      val || this.closeDelete();
    },
  },

  created() {
    this.listar();
  },

  methods: {
    async listar() {
      const q = collection(db, 'Pedidos');
      const result = await getDocs(q);
      result.forEach((doc) => {
        this.desserts.push({
          nombre: doc.data().nombre,
          apellidos: doc.data().apellidos,
          telefono: doc.data().telefono,
          direccion: doc.data().direccion,
          comprobantePago: doc.data().comprobantePago,
          pedido: doc.data().pedido,
          valorTotal: doc.data().valorTotal,
        });
      });
    },

    async agregarUsuario() {
      const ref = collection(db, 'Pedidos');
      const datosRegistro = {
        nombre: this.editedItem.nombre,
        apellidos: this.editedItem.apellidos,
        telefono: this.editedItem.telefono,
        direccion: this.editedItem.direccion,
        comprobantePago: this.editedItem.comprobantePago,
        pedido: this.editedItem.pedido,
        valorTotal: this.editedItem.valorTotal,
      };
      await addDoc(ref, datosRegistro);
    },

    editItem(item) {
      this.editedIndex = this.desserts.indexOf(item);
      this.editedItem = { ...item };
      this.dialog = true;
      this.$refs.comprobantePago.reset();
    },

    deleteItem(item) {
      this.editedIndex = this.desserts.indexOf(item);
      this.editedItem = { ...item };
      this.dialogDelete = true;
    },

    deleteItemConfirm() {
      this.desserts.splice(this.editedIndex, 1);
      this.closeDelete();
    },

    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = { ...this.defaultItem };
        this.editedIndex = -1;
      });
    },

    closeDelete() {
      this.dialogDelete = false;
      this.$nextTick(() => {
        this.editedItem = { ...this.defaultItem };
        this.editedIndex = -1;
      });
    },

    save() {
      if (this.editedIndex > -1) {
        Object.assign(this.desserts[this.editedIndex], this.editedItem);
      } else {
        this.desserts.push(this.editedItem);
        this.agregarUsuario();
      }
      this.close();
    },
  },
};
</script>
