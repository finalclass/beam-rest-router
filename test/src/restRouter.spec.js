import restRouter from '../../dest/restRouter';
import bodyParser from 'body-parser';
import express from 'express';
import supertest from 'supertest';

class Entity {
  constructor(data, model) {
    this.name = data.name;
    this._id = data._id;
    Object.defineProperty(this, 'model', {value: model, writable: true});
  }

  update(changes, callback) {
    Object.keys(changes.$set).forEach(property => {
      this[property] = changes.$set[property];
    });
    callback(null, this);
  }

  remove(callback) {
    this.model.removeById(this._id, callback);
  }
}

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
  removeById(id, callback) {
    this.findOne(id, (err, record) => {
      this.data.splice(this.data.indexOf(record), 1);
      callback(err);
    });
  }
}

describe('restRouter', () => {
  let req;
  let data;

  beforeEach(() => {
    data = [];
    let model = new Model(data);

    data.push(new Entity({_id: '1', name: 'Genesis'}, model)),
    data.push(new Entity({_id: '2', name: 'Exodus'}, model)),
    data.push(new Entity({_id: '3', name: 'Leviticus'}, model));

    let app = express();
    app.use(bodyParser.json());
    app.use('/', restRouter({model}));
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

  it('puts', done => {
    let name = '1st book of Moses';
    req.put('/1')
      .send({name})
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body).toEqual({_id: '1', name});
        done();
      });
  });

  it('deletes', done => {
    let name = '1st book of Moses';
    req.del('/1')
      .set('Accept', 'application/json')
      .expect(204)
      .end((err, res) => {
        if (err) return done(err);
        expect(req.body).toBeUndefined();
        done();
      });
  });

});
