import express from 'express';

function restRouter({model, router = express.Router()}) {

  router.param('id', (req, res, next) => {
    model.findOne(req.params.id, (err, record) => {
      if (err) return next(err);
      if (!record) return next(new Error('notFound'));
      req.record = record;
      next();
    });
  });

  router.get('/:id', (req, res) => {
    res.json(req.record);
  });

  router.get('/', (req, res, next) => {
    model.find({}, (err, records) => {
      if (err) return next(err);
      res.json(records);
    });
  });

  router.post('/', (req, res, next) => {
    model.create(req.body, (err, record) => {
      if (err) return next(err);
      res.status(201).json(record);
    });
  });

  router.put('/:id', (req, res, next) => {
    delete req.body._id;
    req.record.update({$set: req.body}, (err, record) => {
      if (err) return next(err);
      model.findOne(req.params.id, (err, record) => {
        if (err) return next(err);
        res.json(record);
      });
    });
  });

  router.delete('/:id', (req, res, next) => {
    req.record.remove((...args) => {
      res.status(204).end();
    });
  });

  return router;
}

export default restRouter;
