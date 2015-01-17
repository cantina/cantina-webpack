var app = require('cantina').createApp();

app.boot(function (err) {
  if (err) throw err;

  // Require plugins.
  app.require('cantina-web');
  app.require('../');

  // Run loaders.
  app.load('web');

  // Start the app.
  app.start();
});