<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <!-- Sección de imágenes que cambian automáticamente -->
        <v-carousel>
          <!-- Agrega más imágenes si es necesario -->
          <v-carousel-item
            v-for="(image, index) in images"
            :key="index"
            :src="image"
          ></v-carousel-item>
        </v-carousel>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="0" md="0">
        <!-- Sección de información sobre la empresa de comidas rápidas -->
        <v-card>
          <v-card-title class="headline">Bienvenidos a Nuestra Empresa</v-card-title>
          <v-card-text>
   <!-- Agrega información adicional sobre tu restaurante -->
        <p>Somos una empresa de comidas rápidas con una presencia arraigada en la apasionante ciudad de Bucaramanga. Desde nuestros inicios, hemos sido el lugar de encuentro preferido de la comunidad local y de aquellos que visitan nuestra encantadora ciudad. Nuestra misión es clara: ofrecer una experiencia gastronómica excepcional y llena de sabor.</p>
        <p>En cada plato que servimos, puedes sentir la pasión que ponemos en cada detalle. Desde nuestras jugosas hamburguesas hasta nuestros irresistibles perros calientes y crujientes papas fritas artesanales, estamos comprometidos con la excelencia culinaria. Nuestra dedicación a utilizar ingredientes frescos y de alta calidad es evidente en cada bocado que disfrutas en Grilled Burger.</p>
        <p>A lo largo de los años, hemos mantenido firmes nuestros valores fundamentales: calidad, frescura y servicio excepcional. Cada plato en nuestro menú es una expresión de nuestra dedicación y amor por la comida. Nos enorgullece servir a la comunidad y ser una parte integral de la vida cotidiana de nuestros clientes.</p>
            <!-- Agrega una sección destacada del menú -->
            <h2>Platos Destacados</h2>
            <v-list>
              <!-- Agrega platos destacados con imágenes, nombres, descripciones y precios -->
              <v-list-item>
                <v-list-item-avatar>
                  <v-img src="@/assets/Burger3.png" max-width="200" max-height="200"></v-img>
                </v-list-item-avatar>
                <v-list-item-content>
                  <v-list-item-title>Burger Fusion</v-list-item-title>
                  <v-list-item-subtitle>Pan parmesano, carne 130gr, mix de quesos, papita crunch, filete de pechuga 100gr, tocineta, chorizo ahumado, vegetales frescos, acompañado de papas a la francesa.</v-list-item-subtitle>
                </v-list-item-content>
                <v-list-item-action>
                  <span class="font-weight-bold">$13000</span>
                </v-list-item-action>
              </v-list-item>
              <v-list-item>
                <v-list-item-avatar>
                  <v-img src="@/assets/Burger3.png" max-width="200" max-height="200"></v-img>
                </v-list-item-avatar>
                <v-list-item-content>
                  <v-list-item-title>Burger Monster</v-list-item-title>
                  <v-list-item-subtitle>Pan parmesano, doble carne 260gr, mix de quesos, papita crunch, doble tocineta, vegetales frescos, acompañado de papas a la francesa.</v-list-item-subtitle>
                </v-list-item-content>
                <v-list-item-action>
                  <span class="font-weight-bold">$24000</span>
                </v-list-item-action>
              </v-list-item>
              <!-- Agrega más platos destacados aquí -->
            </v-list>
            <!-- Agrega un botón que lleve a la página completa de menú -->
            <v-btn color="blue-lighten-1" to="/menu">Ver Menú Completo</v-btn>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'InicioComponent',
  data() {
    return {
      images: [
        require('@/assets/burger1.jpg'),
        require('@/assets/perro1.jpg'),
        require('@/assets/burger1.jpg'),
      ],
    };
  },
};
</script>
