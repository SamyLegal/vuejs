import {createApp} from '../client/src/app';

export default context => {
  return new Promise((resolve, reject) => {
    const { app, router, store } = createApp();

    router.push(context.url);

    router.onReady(() => {
      // Récupération de la liste des composants correspondant à notre route
      const matchedComponents = router.getMatchedComponents();
      if (!matchedComponents.length) {
        return reject({ code: 404 })
      }

      // Appel de la fonction `asyncData()` sur tous
      // les composants correspondant de notre route
      Promise
        .all(matchedComponents.map(Component => {
          if (Component.asyncData) {
            return Component.asyncData({
              store,
              route: router.currentRoute
            })
          }
        }))
        .then(() => {
          // Après que chaque hook de pré-chargement soit résolu, notre store est maintenant
          // rempli avec l'état nécessaire au rendu de l'application.
          // Quand nous attachons l'état au contexte, et que l'option `template`
          // est utilisée pour faire le rendu, l'état va automatiquement être
          // sérialisé et injecté dans le HTML en tant que `window.__INITIAL_STATE__`.
          context.state = store.state;

          resolve(app)
        })
        .catch(reject)
    }, reject)
  })
}