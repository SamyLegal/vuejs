import {createApp} from './app'

// Logique de démarrage spécifique à l'application cliente
const { app, router } = createApp();

// Initialisation de l'application lorsque
// le routeur est opérationnel
router.onReady(() => {
  // Montage de l'application vue au niveau
  // de l'élément "html" ayant l'id "app"
  app.$mount('#app');
});

