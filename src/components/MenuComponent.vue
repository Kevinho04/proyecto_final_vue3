<template>
  <v-container class="text-center">
    <v-card elevation="5">
      <v-card-title class="headline">Menú de Comidas Rápidas</v-card-title>
    </v-card>
    <v-card elevation="0" class="mt-4">
      <!-- Categorías -->
      <v-row justify="center">
        <v-col
          cols="12"
          sm="6"
          md="4"
          lg="3"
          v-for="(category, index) in menuItems"
          :key="index"
        >
          <v-card class="ma-2">
            <v-card-title class="headline">{{ category.name }}</v-card-title>
            <v-row>
              <v-col
                cols="12"
                v-for="(menuItem, itemIndex) in category.items"
                :key="itemIndex"
              >
                <v-card class="menu-item-card zoom-image">
                  <v-img
                    :src="menuItem.image"
                    :alt="menuItem.name"
                    max-width="300"
                    max-height="300"
                  ></v-img>
                  <v-card-title class="headline">{{ menuItem.name }}</v-card-title>
                  <v-card-subtitle>{{ menuItem.description }}</v-card-subtitle>
                  <div class="menu-item-price">Precio: ${{ menuItem.price }}</div> <!-- Agregado para mostrar el precio -->
                  <v-card-actions>
                    <v-btn icon @click="addItemToCart(menuItem)">
                      <v-icon>mdi-plus</v-icon>
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-col>
            </v-row>
          </v-card>
        </v-col>
      </v-row>
    </v-card>
    <v-card elevation="5" class="mt-4">
      <v-card-title class="headline">Carrito de Compras</v-card-title>
      <v-divider></v-divider>
      <v-list>
        <v-list-item-group>
          <v-list-item
            v-for="(cartItem, index) in cart"
            :key="index"
            class="cart-item"
          >
            <v-list-item-content class="cart-item-content">
              <v-list-item-title>
                {{ cartItem.name }}
              </v-list-item-title>
              <v-list-item-subtitle>
                {{ cartItem.description }}
              </v-list-item-subtitle>
            </v-list-item-content>
            <v-list-item-action>
              <div>
                {{ cartItem.quantity }} x ${{ cartItem.price }}
                <v-btn icon @click="removeItemFromCart(cartItem)">
                  <v-icon>mdi-delete</v-icon>
                </v-btn>
              </div>
            </v-list-item-action>
          </v-list-item>
        </v-list-item-group>
      </v-list>
      <v-divider></v-divider>
      <v-card-actions>
        <div class="cart-total">
          Total: ${{ calculateTotal() }}
        </div>
      </v-card-actions>
    </v-card>
  </v-container>
  <v-btn color="blue-lighten-1" to="/login">Realizar Pedido</v-btn>
</template>

<script>
export default {
  name: 'MenuComponent',
  data() {
    return {
      menuItems: [
        {
          name: 'HAMBURGUESAS',
          items: [
            {
              name: 'Baby Grilled',
              description: 'Pan parmessano, carne 130gr, mix de quesos, papita crunch, doble tocineta, vegetales frescos, acompañado de papas a la francesa.',
              image: require('@/assets/Burger1.jpeg'),
              price: 15000,
            },
            {
              name: 'Classic',
              description: 'Pan parmessano, carne 130gr, mix de quesos, papita crunch, filete de pechuga 100gr, vegetales frescos, acompañado de papas a la francesa.',
              image: require('@/assets/Burger2.jpeg'),
              price: 17000,
            },
            {
              name: 'Fusion',
              description: 'Pan parmessano, carne 130gr, mix de quesos, papita crunch, filete de pechuga 100gr, tocineta, chorizo ahumado, vegetales frescos, acompañado de papas a la francesa.',
              image: require('@/assets/Burger3.jpeg'),
              price: 20000,
            },
            {
              name: 'Monster',
              description: 'Pan parmessano, doble carne 260gr, mix de quesos, papita crunch, doble tocineta, vegetales frescos, acompañado de papas a la francesa.',
              image: require('@/assets/Burger4.jpeg'),
              price: 24000,
            },
            // Agrega más hamburguesas aquí
          ],
        },
        {
          name: 'PERROS CALIENTES',
          items: [
            {
              name: 'Dog Grilled',
              description: 'Pan parmessano, papita crunch, cebolla grilled, salchicha premium, doble queso mozzarella y tocineta, acompañado de papas a la francesa.',
              image: require('@/assets/Perro1.jpeg'),
              price: 13000,
            },
            {
              name: 'Dog Crazy',
              description: 'Pan parmessano, papita crunch, cebolla grilled, salchicha premium, mix de quesos, cortes de chorizo, maicitos, acompañado de papas a la francesa.',
              image: require('@/assets/Perro2.jpeg'),
              price: 15000,
            },
            {
              name: 'Dog Rancher',
              description: 'Pan parmessano, papita crunch, cebolla grilled, salchicha premium, doble queso mozzarella, cortes de lomo fino, cortes de pechuga, acompañado de papas a la francesa.',
              image: require('@/assets/Perro3.jpeg'),
              price: 17000,
            },
            {
              name: 'Dog American',
              description: 'Pan parmessano, papita crunch, cebolla grilled, salchicha premium, doble queso mozzarella, pollo desmechado en salsa tartara, tocineta caramelizada, acompañado de papas a la francesa.',
              image: require('@/assets/Perro4.jpeg'),
              price: 19000,
            },
            // Agrega más perros calientes aquí
          ],
        },
        {
          name: 'PINCHOS',
          items: [
            {
              name: 'Mixto',
              description: 'Cortes de lomo fino y pechuga 300gr asados al carbón, acompañados con papa al vapor o papa criolla junto a nuestras salsas de la casa.',
              image: require('@/assets/pincho1.jpg'),
              price: 15000,
            },
            {
              name: 'Solo Carne',
              description: 'Cortes de lomo fino 300gr asados al carbón, acompañados con papa al vapor o papa criolla junto a nuestras salsas de la casa.',
              image: require('@/assets/PinchoCarne.png'),
              price: 14000,
            },
            {
              name: 'Solo Pechuga',
              description: 'Cortes de pechuga 300gr asados al carbón, acompañados con papa al vapor o papa criolla junto a nuestras salsas de la casa.',
              image: require('@/assets/PinchosPollo.png'),
              price: 16000,
            },
            {
              name: 'Chori Pincho',
              description: 'Chorizos premium asados al carbón, acompañados con papa al vapor o papa criolla junto a nuestras salsas de la casa.',
              image: require('@/assets/ChoriPincho.png'),
              price: 13000,
            },
            // Agrega más pinchos aquí
          ],
        },
        // Agrega más categorías y platos según sea necesario
      ],
      cart: [], // Arreglo para mantener los elementos del carrito
    };
  },
  methods: {
    addItemToCart(menuItem) {
      // Buscar si el plato ya está en el carrito
      const cartItem = this.cart.find(item => item.name === menuItem.name);
      if (cartItem) {
        cartItem.quantity++;
      } else {
        // Si no existe, agregarlo al carrito
        this.cart.push({
          name: menuItem.name,
          description: menuItem.description,
          quantity: 1,
          price: menuItem.price,
        });
      }
    },
    removeItemFromCart(cartItem) {
      // Encontrar el índice del elemento en el carrito
      const index = this.cart.indexOf(cartItem);
      if (index !== -1) {
        // Si se encuentra, eliminarlo del carrito
        this.cart.splice(index, 1);
      }
    },
    calculateTotal() {
      // Calcular el total sumando los precios de los elementos en el carrito
      return this.cart.reduce((total, cartItem) => total + cartItem.price * cartItem.quantity, 0);
    },
  },
};
</script>

<style scoped>
.menu-item-card {
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
  transition: transform 0.2s;
  cursor: pointer;
}

.menu-item-card:hover {
  transform: translateY(-5px);
}

.cart-item {
  background-color: #f5f5f5;
  border-radius: 8px;
  margin: 8px 0;
}

.cart-item-content {
  flex-grow: 1;
}

.cart-total {
  font-size: 1.2rem;
  font-weight: bold;
}

.menu-item-price {
  font-size: 1.1rem;
  font-weight: bold;
  margin-top: 5px;
}

/* Ajusta los estilos según tus preferencias */
</style>
