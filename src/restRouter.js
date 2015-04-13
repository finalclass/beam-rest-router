import express from 'express';

function restRouter({model}) {
  let router = express.Router();

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

  return router;
}

export default restRouter;
