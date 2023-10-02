<template>
  <div>
    <v-data-table
      :headers="headers"
      :items="desserts"
      :sort-by="[{ key: 'nombrebd', order: 'asc' }]"
      class="elevation-1"
    >
    <template v-slot:actions="{ item }">
        <v-icon size="small" class="me-2" @click="editItem(item)">
          mdi-pencil
        </v-icon>
        <v-icon size="small" @click="deleteItem(item)">mdi-delete</v-icon>
      </template>
    </v-data-table>

    <v-btn color="deep-orange-accent-3" dark class="mb-2" @click="imprimirTablaPDF">
      Exportar como PDF
    </v-btn>
  </div>
</template>

<script>
import jsPDF from 'jspdf';
import 'jspdf-autotable';

export default {
  data: () => ({
    dialog: false,
    dialogDelete: false,
    headers: [
      {
        title: 'ID',
        align: 'start',
        sortable: false,
        key: 'id',
      },
      { title: 'Nombre', key: 'nombrebd' },
      { title: 'Apellidos', key: 'apellidobd' },
      { title: 'Telefono', key: 'telefonobd' },
      { title: 'Correo Electronico', key: 'correobd' },
      { title: 'Pedido', key: 'pedidobd' },
      { title: 'Valor Total', key: 'valortotalbd' },
      { title: 'Actions', key: 'actions', sortable: false },
    ],
    desserts: [],
    editedIndex: -1,
    editedItem: {
      id: '',
      nombrebd: '',
      apellidobd: '',
      telefonobd: '',
      correobd: '',
      pedidobd: '',
      valortotalbd: '',
    },
    defaultItem: {
      id: '',
      nombrebd: '',
      apellidobd: '',
      telefonobd: '',
      correobd: '',
      pedidobd: '',
      valortotalbd: '',
    },
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? 'Nuevo Usuario' : 'Editar Usuario';
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
    this.initialize();
  },

  methods: {
    initialize() {
      this.desserts = [
      {
            id: 1,
            nombrebd: 'Kevin',
            apellidobd: 'Ardila',
            telefonobd: 3213246555,
            correobd: 'kevinard04@gmail.com',
            pedidobd:'Burger 1, Burguer 2.',
            valortotalbd:'35.000'
          },
          {
            id: 2,
            nombrebd: 'Juan',
            apellidobd: 'Bernal',
            telefonobd: 31281146555,
            correobd: 'JuanBa3r@gmail.com',
            pedidobd:'Burger 1, Burguer 2.',
            valortotalbd:'35.000'
          },
          {
            id: 3,
            nombrebd: 'Andres',
            apellidobd: 'Peralta',
            telefonobd: 3153246415,
            correobd: 'AndresP@gmail.com',
            pedidobd:'Burger 1, Burguer 2.',
            valortotalbd:'35.000'
          },
          {
            id: 4,
            nombrebd: 'Pedro',
            apellidobd: 'Sanchez',
            telefonobd: 3503246555,
            correobd: 'PedroP@gmail.com',
            pedidobd:'Burger 1, Burguer 2.',
            valortotalbd:'35.000'
          },
          {
            id: 5,
            nombrebd: 'Armando',
            apellidobd: 'Lopez',
            telefonobd: 3033246555,
            correobd: 'ArmandoLpz@gmail.com',
            pedidobd:'Burger 1, Burguer 2.',
            valortotalbd:'35.000'
          },
          {
            id: 6,
            nombrebd: 'Monica',
            apellidobd: 'Perez',
            telefonobd: 3113246555,
            correobd: 'Monicaprz@gmail.com',
            pedidobd:'Burger 1, Burguer 2.',
            valortotalbd:'35.000'
          },
          {
            id: 7,
            nombrebd: 'Marcelo',
            apellidobd: 'Tinelli',
            telefonobd: 3223246555,
            correobd: 'MarcTinell@gmail.com',
            pedidobd:'Burger 1, Burguer 2.',
            valortotalbd:'35.000'
          },
          {
            id: 8,
            nombrebd: 'Dayro',
            apellidobd: 'Moreno',
            telefonobd: 3213246555,
            correobd: 'Guarosk@gmail.com',
            pedidobd:'Burger 1, Burguer 2.',
            valortotalbd:'35.000'
          },
          {
            id: 9,
            nombrebd: 'Mario',
            apellidobd: 'Hernandez',
            telefonobd: 3243246555,
            correobd: 'MarioH@gmail.com',
            pedidobd:'Burger 1, Burguer 2.',
            valortotalbd:'35.000'
          },
          {
            id: 10,
            nombrebd: 'John',
            apellidobd: 'Perez',
            telefonobd: 3283246555,
            correobd: 'JohnPrz@gmail.com',
            pedidobd:'Burger 1, Burguer 2.',
            valortotalbd:'35.000'
          },
    ]
    },

    editItem(item) {
      this.editedIndex = this.desserts.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      this.editedIndex = this.desserts.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogDelete = true;
    },

    deleteItemConfirm() {
      this.desserts.splice(this.editedIndex, 1);
      this.closeDelete();
    },

    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    closeDelete() {
      this.dialogDelete = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    save() {
      if (this.editedIndex > -1) {
        Object.assign(this.desserts[this.editedIndex], this.editedItem);
      } else {
        this.desserts.push(this.editedItem);
      }
      this.close();
    },

    imprimirTablaPDF() {
      const columns = [
        { title: 'ID', dataKey: 'id' },
        { title: 'Nombre', dataKey: 'nombrebd' },
        { title: 'Apellidos', dataKey: 'apellidobd' },
        { title: 'Telefono', dataKey: 'telefonobd' },
        { title: 'Correo Electronico', dataKey: 'correobd' },
        { title: 'Pedido', dataKey: 'pedidobd' },
        { title: 'Valor Total', dataKey: 'valortotalbd' },
      ];

      const registros = this.desserts.map((item) => ({
        id: item.id.toString(),
        nombrebd: item.nombrebd,
        apellidobd: item.apellidobd,
        telefonobd: item.telefonobd.toString(),
        correobd: item.correobd,
        pedidobd: item.pedidobd || '',
        valortotalbd: item.valortotalbd || '',
      }));

      const doc = new jsPDF('p', 'pt');

      doc.autoTable(columns, registros, {
        margin: { top: 60 },
        addPageContent: function () {
          doc.text('PedidosUsuarios', 40, 30);
        },
      });

      doc.save('PedidosUsuarios.pdf');
    },
  },
};
</script>

<style scoped>
/* Tus estilos aquí */
</style>
