const path = require('path');
const merge = require('webpack-merge');
const nodeExternals = require('webpack-node-externals');
const baseConfig = require('../client/webpack.config.js');
const VueSSRServerPlugin = require('vue-server-renderer/server-plugin');

// Configuration destinée à générer le bundle serveur
// qui va être passé à createBundleRenderer.
module.exports = merge(baseConfig, {
  // Fichier d'entrée serveur de l'application
  entry: './entry-server.js',

  // Cela permet à webpack de gérer les imports dynamiques d'une manière
  // approprié pour Node.js, et dit également à `vue-loader` d'émettre un code approprié pour le serveur
  // lors de la compilation du composant Vue.
  target: 'node',

  // Génération des sources maps des paquetages
  devtool: 'false',

  // Indique à webpack d'utiliser les exports "CommonJs" utilisé par Node.js
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'server-bundle.js',
    libraryTarget: 'commonjs2'
  },

  // https://webpack.js.org/configuration/externals/#function
  // https://github.com/liady/webpack-node-externals
  // Externalise les dépendances de l'application. Cela rend le build serveur plus rapide
  // et génère un fichier de paquetage plus petit.
  externals: nodeExternals({
    // ne pas externaliser les dépendances qui ont besoin d'être traitées par webpack.
    // vous pouvez ajouter plus de types de fichier ici, comme par ex. avec les fichiers `*.vue`
    // vous devriez aussi lister des exceptions qui modifient `global` (par ex. les polyfills)
    whitelist: /\.css$/
  }),

  plugins: [
    // Plugin qui va créer entièrement la sortie pour le build serveur
    // dans un seul fichier JSON.
    // Le fichier généré par défaut va être `vue-ssr-server-bundle.json`
    new VueSSRServerPlugin()
  ]
});
