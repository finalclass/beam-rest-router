import restRouter from '../../dest/restRouter';
import bodyParser from 'body-parser';
import express from 'express';
import supertest from 'supertest';

class Model {
  constructor(data) {
    this.data = data;
  }
  findOne(id, callback) {
    callback(null, this.data.filter(record => record._id === id)[0]);
  }

  find(where, callback) {
    callback(null, this.data);
  }

  create(record, callback) {
    this.data.push(record)
    callback(null, record);
  }
}

describe('restRouter', () => {
  let req;
  let data;

  beforeEach(() => {
    data = [
      {_id: '1', name: 'Genesis'},
      {_id: '2', name: 'Exodus'},
      {_id: '3', name: 'Leviticus'}
    ];

    let app = express();
    app.use(bodyParser.json());
    app.use('/', restRouter({
      model: new Model(data)
    }));
    req = supertest(app);
  });

  it('gets one', done => {
    req.get('/1')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body.name).toBe('Genesis');
        done();
      });
  });

  it('gets all', done => {
    req.get('/')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body).toEqual(data);
        done();
      });
  });

  it('posts', done => {
    let record = {name: 'Numeri'};
    req.post('/')
      .send(record)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(201)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body).toEqual(record);
        done();
      });
  });

});
