'use strict';

var _interopRequireWildcard = function (obj) { return obj && obj.__esModule ? obj : { 'default': obj }; };

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireWildcard(_express);

function restRouter(_ref) {
  var model = _ref.model;
  var _ref$router = _ref.router;
  var router = _ref$router === undefined ? _express2['default'].Router() : _ref$router;

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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInJlc3RSb3V0ZXIuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7dUJBQW9CLFNBQVM7Ozs7QUFFN0IsU0FBUyxVQUFVLE9BQXFDO01BQW5DLEtBQUssUUFBTCxLQUFLO3lCQUFFLE1BQU07TUFBTixNQUFNLCtCQUFHLHFCQUFRLE1BQU0sRUFBRTs7QUFFbkQsUUFBTSxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUUsVUFBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBSztBQUNyQyxTQUFLLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsRUFBRSxFQUFFLFVBQUMsR0FBRyxFQUFFLE1BQU0sRUFBSztBQUM1QyxVQUFJLEdBQUcsRUFBRSxPQUFPLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztBQUMxQixVQUFJLENBQUMsTUFBTSxFQUFFLE9BQU8sSUFBSSxDQUFDLElBQUksS0FBSyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUM7QUFDaEQsU0FBRyxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUM7QUFDcEIsVUFBSSxFQUFFLENBQUM7S0FDUixDQUFDLENBQUM7R0FDSixDQUFDLENBQUM7O0FBRUgsUUFBTSxDQUFDLEdBQUcsQ0FBQyxNQUFNLEVBQUUsVUFBQyxHQUFHLEVBQUUsR0FBRyxFQUFLO0FBQy9CLE9BQUcsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0dBQ3RCLENBQUMsQ0FBQzs7QUFFSCxRQUFNLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRSxVQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFLO0FBQ2xDLFNBQUssQ0FBQyxJQUFJLENBQUMsRUFBRSxFQUFFLFVBQUMsR0FBRyxFQUFFLE9BQU8sRUFBSztBQUMvQixVQUFJLEdBQUcsRUFBRSxPQUFPLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztBQUMxQixTQUFHLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0tBQ25CLENBQUMsQ0FBQztHQUNKLENBQUMsQ0FBQzs7QUFFSCxRQUFNLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxVQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFLO0FBQ25DLFNBQUssQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLElBQUksRUFBRSxVQUFDLEdBQUcsRUFBRSxNQUFNLEVBQUs7QUFDdEMsVUFBSSxHQUFHLEVBQUUsT0FBTyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7QUFDMUIsU0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7S0FDOUIsQ0FBQyxDQUFDO0dBQ0osQ0FBQyxDQUFDOztBQUVILFFBQU0sQ0FBQyxHQUFHLENBQUMsTUFBTSxFQUFFLFVBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUs7QUFDckMsV0FBTyxHQUFHLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQztBQUNwQixPQUFHLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxFQUFDLElBQUksRUFBRSxHQUFHLENBQUMsSUFBSSxFQUFDLEVBQUUsVUFBQyxHQUFHLEVBQUUsTUFBTSxFQUFLO0FBQ25ELFVBQUksR0FBRyxFQUFFLE9BQU8sSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0FBQzFCLFdBQUssQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxFQUFFLEVBQUUsVUFBQyxHQUFHLEVBQUUsTUFBTSxFQUFLO0FBQzVDLFlBQUksR0FBRyxFQUFFLE9BQU8sSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0FBQzFCLFdBQUcsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7T0FDbEIsQ0FBQyxDQUFDO0tBQ0osQ0FBQyxDQUFDO0dBQ0osQ0FBQyxDQUFDOztBQUVILFFBQU0sVUFBTyxDQUFDLE1BQU0sRUFBRSxVQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFLO0FBQ3hDLE9BQUcsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLFlBQWE7d0NBQVQsSUFBSTtBQUFKLFlBQUk7OztBQUN4QixTQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDO0tBQ3ZCLENBQUMsQ0FBQztHQUNKLENBQUMsQ0FBQzs7QUFFSCxTQUFPLE1BQU0sQ0FBQztDQUNmOztxQkFFYyxVQUFVIiwiZmlsZSI6InJlc3RSb3V0ZXIuanMiLCJzb3VyY2VSb290IjoiLy9ob21lL3NlbC9Eb2N1bWVudHMvc3Ryb2plL3JvYm9sL25vZGVfbW9kdWxlcy9iZWFtLXJlc3Qtcm91dGVyL3NyYyJ9