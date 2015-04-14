'use strict';

var _interopRequireWildcard = function (obj) { return obj && obj.__esModule ? obj : { 'default': obj }; };

var _restRouter = require('../../dist/restRouter');

var _restRouter2 = _interopRequireWildcard(_restRouter);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireWildcard(_bodyParser);

var _express = require('express');

var _express2 = _interopRequireWildcard(_express);

var _supertest = require('supertest');

var _supertest2 = _interopRequireWildcard(_supertest);

var _Entity$Model = require('./tools');

describe('restRouter', function () {
  var req = undefined;
  var data = undefined;
  var app = undefined;
  var model = undefined;

  beforeEach(function () {
    data = [];
    model = new _Entity$Model.Model(data);
    data.push(new _Entity$Model.Entity({ _id: '1', name: 'Genesis' }, model)), app = _express2['default']();
    app.use(_bodyParser2['default'].json());
  });

  it('can be created with existing router', function (done) {
    var router = _express2['default'].Router();

    router.get('/1', function (req, res) {
      res.json({ status: 'ok' });
    });

    app.use('/', _restRouter2['default']({ model: model, router: router }));

    _supertest2['default'](app).get('/1').end(function (err, res) {
      if (err) return done(err);
      expect(res.body.status).toBe('ok');
      done();
    });
  });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNyZWF0aW9uLnNwZWMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OzswQkFBdUIsdUJBQXVCOzs7OzBCQUN2QixhQUFhOzs7O3VCQUNoQixTQUFTOzs7O3lCQUNQLFdBQVc7Ozs7NEJBQ0wsU0FBUzs7QUFHckMsUUFBUSxDQUFDLFlBQVksRUFBRSxZQUFNO0FBQzNCLE1BQUksR0FBRyxZQUFBLENBQUM7QUFDUixNQUFJLElBQUksWUFBQSxDQUFDO0FBQ1QsTUFBSSxHQUFHLFlBQUEsQ0FBQztBQUNSLE1BQUksS0FBSyxZQUFBLENBQUM7O0FBRVYsWUFBVSxDQUFDLFlBQU07QUFDZixRQUFJLEdBQUcsRUFBRSxDQUFDO0FBQ1YsU0FBSyxHQUFHLGtCQVhJLEtBQUssQ0FXQyxJQUFJLENBQUMsQ0FBQztBQUN4QixRQUFJLENBQUMsSUFBSSxDQUFDLGtCQVpOLE1BQU0sQ0FZVyxFQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBQyxFQUFFLEtBQUssQ0FBQyxDQUFDLEVBQ3pELEdBQUcsR0FBRyxzQkFBUyxDQUFDO0FBQ2hCLE9BQUcsQ0FBQyxHQUFHLENBQUMsd0JBQVcsSUFBSSxFQUFFLENBQUMsQ0FBQztHQUM1QixDQUFDLENBQUM7O0FBRUgsSUFBRSxDQUFDLHFDQUFxQyxFQUFFLFVBQUEsSUFBSSxFQUFJO0FBQ2hELFFBQUksTUFBTSxHQUFHLHFCQUFRLE1BQU0sRUFBRSxDQUFDOztBQUU5QixVQUFNLENBQUMsR0FBRyxDQUFDLElBQUksRUFBRSxVQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUs7QUFDN0IsU0FBRyxDQUFDLElBQUksQ0FBQyxFQUFDLE1BQU0sRUFBRSxJQUFJLEVBQUMsQ0FBQyxDQUFDO0tBQzFCLENBQUMsQ0FBQzs7QUFFSCxPQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRSx3QkFBVyxFQUFDLEtBQUssRUFBTCxLQUFLLEVBQUUsTUFBTSxFQUFOLE1BQU0sRUFBQyxDQUFDLENBQUMsQ0FBQzs7QUFFMUMsMkJBQVUsR0FBRyxDQUFDLENBQ1gsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUNULEdBQUcsQ0FBQyxVQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUs7QUFDakIsVUFBSSxHQUFHLEVBQUUsT0FBTyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7QUFDMUIsWUFBTSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0FBQ25DLFVBQUksRUFBRSxDQUFDO0tBQ1IsQ0FBQyxDQUFDO0dBQ04sQ0FBQyxDQUFDO0NBRUosQ0FBQyxDQUFDIiwiZmlsZSI6ImNyZWF0aW9uLnNwZWMuanMiLCJzb3VyY2VSb290IjoiLy9ob21lL3NlbC9Eb2N1bWVudHMvc3Ryb2plL3JvYm9sL25vZGVfbW9kdWxlcy9iZWFtLXJlc3Qtcm91dGVyL3Rlc3Qvc3JjIn0=