import { createApp } from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import { loadFonts } from './plugins/webfontloader'
import router from './router' // Importa tu archivo de configuración de Vue Router


loadFonts()

createApp(App)
  .use(vuetify)
  .use(router) // Agrega el enrutador a la aplicación
  .mount('#app')
