var assert = require('assert')
  , path = require('path');

describe('', function () {
  var app;

  before(function (done) {
    app = require('cantina').createApp();
    app.boot(path.resolve(__dirname, '../example'), function (err) {
      assert.ifError(err);

      app.silence();
      app.require('../');

      app.start(done);
    });
  });

  after(function (done) {
    app.destroy(done);
  });

  it('something', function (done) {

  });
});