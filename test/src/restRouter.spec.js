import restRouter from '../../dist/restRouter';
import bodyParser from 'body-parser';
import express from 'express';
import supertest from 'supertest';
import {Entity, Model} from './tools';


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
        expect(res.body[0].name).toBe('Genesis');
        expect(res.body[1].name).toBe('Exodus');
        expect(res.body[2].name).toBe('Leviticus');
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
