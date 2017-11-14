const webpack = require('webpack');
const merge = require('webpack-merge');
const baseConfig = require('../webpack.base.config.js');
const VueSSRClientPlugin = require('vue-server-renderer/client-plugin');

module.exports = merge(baseConfig, {
  entry: './src/entry-client.js',
  plugins: [
    // Important : cela scinde l'exécution de webpack en un fragment maître
    // et des fragments asynchrones qui peuvent être injectés juste après lui.
    // cela permet également une meilleure mise en cache pour vos codes d'applications tierces.
    new webpack.optimize.CommonsChunkPlugin({
      name: "manifest",
      minChunks: Infinity
    }),
    // Plugin qui génère le fichier `vue-ssr-client-manifest.json`
    // dans le dossier de sortie.
    new VueSSRClientPlugin()
  ]
});

