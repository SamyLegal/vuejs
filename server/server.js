const Vue = require('vue');
const server = require('express')();
const { createBundleRenderer } = require('vue-server-renderer');

const renderer = createBundleRenderer(serverBundle, {
  runInNewContext: false, // recommandé
  template, // (optionnel) page de template
  clientManifest // (optionnel) manifeste de build client
});

// à l'intérieur du gestionnaire serveur...
server.get('*', (req, res) => {
  const context = { url: req.url };
  // Pas besoin de passer l'application ici car elle est automatiquement créée
  // à l'exécution du paquetage.
  // Maintenant notre serveur est découplé de notre application Vue !
  renderer.renderToString(context, (err, html) => {
    if (err) {
      if (err.code === 404) {
        res.status(404).end('Page non trouvée')
      } else {
        res.status(500).end('Erreur interne du serveur')
      }
    } else {
      res.end(html)
    }
  })
});

server.listen(8080);