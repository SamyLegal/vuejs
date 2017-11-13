import {createApp} from '../client/src/app'

export default context => {
  // Etant donnée qu'il peut potentiellement avoir des composants ou des hooks
  // de routes asynchrones, on retourne une Promesse (« Promise ») de telle sorte que
  // le serveur attende jusqu'à ce que tout soit prêt pour le rendu.
  return new Promise((resolve, reject) => {

    const { app, router } = createApp();

    // Défini la location du routeur serveur
    router.push(context.url);

    // On attend que le routeur ait terminé de traiter
    // avec les composants et hooks asynchrones
    router.onReady(() => {
      // Récupération des composants liées à cette route
      const matchedComponents = router.getMatchedComponents();

      // Pas de routes correspondantes, on rejette la requête avec une 404
      if (!matchedComponents.length) {
        return reject({ code: 404 })
      }

      // La promesse doit résoudre l'instance de l'application
      // qui pourra ensuite être rendue
      resolve(app)
    }, reject)
  })
}