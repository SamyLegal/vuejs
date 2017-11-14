const fs = require('fs');
const path = require('path');
const server = require('express')();
const { createBundleRenderer } = require('vue-server-renderer');
const serverBundle = require('./dist/vue-ssr-server-bundle.json');
const template = fs.readFileSync(path.join(__dirname, './index.template.html'), 'utf8');

const renderer = createBundleRenderer(serverBundle, {
  runInNewContext: false,
  template,
});

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
        res.status(500).end('Erreur interne du serveur -' + JSON.stringify(err));
      }
    } else {
      res.end(html)
    }
  })
});

server.listen(8080);