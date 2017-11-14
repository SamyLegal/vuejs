import Vue from 'vue';
import App from './components/App.vue';
import {createRouter} from './router';
import {createStore} from './store';
import {sync} from 'vuex-router-sync';

// Création d'une fonction factory "createApp"
// pour créer de nouvelles instances de l'application,
// du routeur et du store.
// Cette factory sera utilisé par le client et le serveur
export function createApp() {

  // Initialisation du routeur et du store
  const router = createRouter();
  const store = createStore();

  // Synchronisation pour que l'état de la route soit disponible en tant que donnée du store
  sync(store, router);

  const app = new Vue({
    // Injection du routeur dans l'instance de Vue
    router,
    // Injection du store dans l'instance de Vue
    store,
    // L'instance racine rend
    // simplement le composant App.
    render: h => h(App),
    components: {
      App
    }
  });

  return { app, store, router }
}
