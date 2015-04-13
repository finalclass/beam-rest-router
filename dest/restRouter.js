'use strict';

var _interopRequireWildcard = function (obj) { return obj && obj.__esModule ? obj : { 'default': obj }; };

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireWildcard(_express);

function restRouter(_ref) {
  var model = _ref.model;

  var router = _express2['default'].Router();

  router.param('id', function (req, res, next) {
    model.findOne(req.params.id, function (err, record) {
      if (err) return next(err);
      if (!record) return next(new Error('notFound'));
      req.record = record;
      next();
    });
  });

  router.get('/:id', function (req, res) {
    res.json(req.record);
  });

  router.get('/', function (req, res, next) {
    model.find({}, function (err, records) {
      if (err) return next(err);
      res.json(records);
    });
  });

  router.post('/', function (req, res, next) {
    model.create(req.body, function (err, record) {
      if (err) return next(err);
      res.status(201).json(record);
    });
  });

  router.put('/:id', function (req, res, next) {
    delete req.body._id;
    req.record.update({ $set: req.body }, function (err, record) {
      if (err) return next(err);
      model.findOne(req.params.id, function (err, record) {
        if (err) return next(err);
        res.json(record);
      });
    });
  });

  router['delete']('/:id', function (req, res, next) {
    req.record.remove(function () {
      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      res.status(204).end();
    });
  });

  return router;
}

exports['default'] = restRouter;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInJlc3RSb3V0ZXIuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7dUJBQW9CLFNBQVM7Ozs7QUFFN0IsU0FBUyxVQUFVLE9BQVU7TUFBUixLQUFLLFFBQUwsS0FBSzs7QUFDeEIsTUFBSSxNQUFNLEdBQUcscUJBQVEsTUFBTSxFQUFFLENBQUM7O0FBRTlCLFFBQU0sQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFLFVBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUs7QUFDckMsU0FBSyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLEVBQUUsRUFBRSxVQUFDLEdBQUcsRUFBRSxNQUFNLEVBQUs7QUFDNUMsVUFBSSxHQUFHLEVBQUUsT0FBTyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7QUFDMUIsVUFBSSxDQUFDLE1BQU0sRUFBRSxPQUFPLElBQUksQ0FBQyxJQUFJLEtBQUssQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDO0FBQ2hELFNBQUcsQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDO0FBQ3BCLFVBQUksRUFBRSxDQUFDO0tBQ1IsQ0FBQyxDQUFDO0dBQ0osQ0FBQyxDQUFDOztBQUVILFFBQU0sQ0FBQyxHQUFHLENBQUMsTUFBTSxFQUFFLFVBQUMsR0FBRyxFQUFFLEdBQUcsRUFBSztBQUMvQixPQUFHLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQztHQUN0QixDQUFDLENBQUM7O0FBRUgsUUFBTSxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUUsVUFBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBSztBQUNsQyxTQUFLLENBQUMsSUFBSSxDQUFDLEVBQUUsRUFBRSxVQUFDLEdBQUcsRUFBRSxPQUFPLEVBQUs7QUFDL0IsVUFBSSxHQUFHLEVBQUUsT0FBTyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7QUFDMUIsU0FBRyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztLQUNuQixDQUFDLENBQUM7R0FDSixDQUFDLENBQUM7O0FBRUgsUUFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsVUFBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBSztBQUNuQyxTQUFLLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxJQUFJLEVBQUUsVUFBQyxHQUFHLEVBQUUsTUFBTSxFQUFLO0FBQ3RDLFVBQUksR0FBRyxFQUFFLE9BQU8sSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0FBQzFCLFNBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0tBQzlCLENBQUMsQ0FBQztHQUNKLENBQUMsQ0FBQzs7QUFFSCxRQUFNLENBQUMsR0FBRyxDQUFDLE1BQU0sRUFBRSxVQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFLO0FBQ3JDLFdBQU8sR0FBRyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUM7QUFDcEIsT0FBRyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsRUFBQyxJQUFJLEVBQUUsR0FBRyxDQUFDLElBQUksRUFBQyxFQUFFLFVBQUMsR0FBRyxFQUFFLE1BQU0sRUFBSztBQUNuRCxVQUFJLEdBQUcsRUFBRSxPQUFPLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztBQUMxQixXQUFLLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsRUFBRSxFQUFFLFVBQUMsR0FBRyxFQUFFLE1BQU0sRUFBSztBQUM1QyxZQUFJLEdBQUcsRUFBRSxPQUFPLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztBQUMxQixXQUFHLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO09BQ2xCLENBQUMsQ0FBQztLQUNKLENBQUMsQ0FBQztHQUNKLENBQUMsQ0FBQzs7QUFFSCxRQUFNLFVBQU8sQ0FBQyxNQUFNLEVBQUUsVUFBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBSztBQUN4QyxPQUFHLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxZQUFhO3dDQUFULElBQUk7QUFBSixZQUFJOzs7QUFDeEIsU0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQztLQUN2QixDQUFDLENBQUM7R0FDSixDQUFDLENBQUM7O0FBRUgsU0FBTyxNQUFNLENBQUM7Q0FDZjs7cUJBRWMsVUFBVSIsImZpbGUiOiJyZXN0Um91dGVyLmpzIiwic291cmNlUm9vdCI6Ii8vaG9tZS9zZWwvRG9jdW1lbnRzL3N0cm9qZS9yb2JvbC9ub2RlX21vZHVsZXMvYmVhbS1yZXN0LXJvdXRlci9zcmMifQ==