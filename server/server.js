const createApp = require('../client/src/app');

server.get('*', (req, res) => {
  const context = { url: req.url };

  createApp(context).then(app => {
    renderer.renderToString(app, (err, html) => {
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
  })
});