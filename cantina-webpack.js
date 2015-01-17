var webpack = require('webpack')
  , path = require('path');

module.exports = function (app) {
  var staticDir = path.join(app.root, app.conf.get('web:static:dir'));

  // Plugin namespace.
  app.webpack = {};

  // Default conf.
  app.conf.add({
    webpack: {
      context: staticDir,
      entry: 'boot',
      output: {
        path: path.join(staticDir, 'build'),
        filename: 'bundle.js'
      },
      resolve: {
        root: path.join(staticDir, 'js'),
        alias: {
          vendor: './vendor'
        }
      },
      watch: false,
      watchDelay: 200
    }
  });

  // Get webpack configuration (so plugins can modify it).
  app.webpack.configuration = app.conf.get('webpack');

  // Silencable log function.
  function log () {
    if (!app.conf.get('webpack:silent')) {
      app.log.apply(app, arguments);
    }
  }

  // In app start, create the webpack compiler.
  app.hook('start').add(function (next) {
    // Create and run the compiler.
    log('Webpack: Bundling ...');
    app.webpack.compiler = webpack(app.webpack.configuration, function (err, stats) {
      if (err) return next(err);
      log('Webpack: Bundled');
      app.emit('webpack:stats', stats);
      next();
    });
  });
};
