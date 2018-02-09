let test = require('tape');
let request = require('supertest');
let app = require('./app');

test('Correct games returned', function (t) {
  request(app)
    .get('/api/games')
    .expect('Content-Type', /json/)
    .expect(200)
    .end(function (err, res) {
      t.error(err, 'No error');
      t.end();
      process.exit(0);
    });
});
