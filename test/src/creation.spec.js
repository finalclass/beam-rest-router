import restRouter from '../../dist/restRouter';
import bodyParser from 'body-parser';
import express from 'express';
import supertest from 'supertest';
import {Entity, Model} from './tools';


describe('restRouter', () => {
  let req;
  let data;
  let app;
  let model;

  beforeEach(() => {
    data = [];
    model = new Model(data);
    data.push(new Entity({_id: '1', name: 'Genesis'}, model)),
    app = express();
    app.use(bodyParser.json());
  });

  it('can be created with existing router', done => {
    let router = express.Router();

    router.get('/1', (req, res) => {
      res.json({status: 'ok'});
    });

    app.use('/', restRouter({model, router}));

    supertest(app)
      .get('/1')
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body.status).toBe('ok');
        done();
      });
  });

});
