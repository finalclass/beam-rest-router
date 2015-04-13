'use strict';

var _interopRequireWildcard = function (obj) { return obj && obj.__esModule ? obj : { 'default': obj }; };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _restRouter = require('../../dest/restRouter');

var _restRouter2 = _interopRequireWildcard(_restRouter);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireWildcard(_bodyParser);

var _express = require('express');

var _express2 = _interopRequireWildcard(_express);

var _supertest = require('supertest');

var _supertest2 = _interopRequireWildcard(_supertest);

var Model = (function () {
  function Model(data) {
    _classCallCheck(this, Model);

    this.data = data;
  }

  _createClass(Model, [{
    key: 'findOne',
    value: function findOne(id, callback) {
      callback(null, this.data.filter(function (record) {
        return record._id === id;
      })[0]);
    }
  }, {
    key: 'find',
    value: function find(where, callback) {
      callback(null, this.data);
    }
  }, {
    key: 'create',
    value: function create(record, callback) {
      this.data.push(record);
      callback(null, record);
    }
  }]);

  return Model;
})();

describe('restRouter', function () {
  var req = undefined;
  var data = undefined;

  beforeEach(function () {
    data = [{ _id: '1', name: 'Genesis' }, { _id: '2', name: 'Exodus' }, { _id: '3', name: 'Leviticus' }];

    var app = _express2['default']();
    app.use(_bodyParser2['default'].json());
    app.use('/', _restRouter2['default']({
      model: new Model(data)
    }));
    req = _supertest2['default'](app);
  });

  it('gets one', function (done) {
    req.get('/1').set('Accept', 'application/json').expect('Content-Type', /json/).expect(200).end(function (err, res) {
      if (err) return done(err);
      expect(res.body.name).toBe('Genesis');
      done();
    });
  });

  it('gets all', function (done) {
    req.get('/').set('Accept', 'application/json').expect('Content-Type', /json/).expect(200).end(function (err, res) {
      if (err) return done(err);
      expect(res.body).toEqual(data);
      done();
    });
  });

  it('posts', function (done) {
    var record = { name: 'Numeri' };
    req.post('/').send(record).set('Accept', 'application/json').expect('Content-Type', /json/).expect(201).end(function (err, res) {
      if (err) return done(err);
      expect(res.body).toEqual(record);
      done();
    });
  });
});
//# sourceMappingURL=data:application/json;base64,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QU8sSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0FBQzFCLFlBQU0sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO0FBQy9CLFVBQUksRUFBRSxDQUFDO0tBQ1IsQ0FBQyxDQUFDO0dBQ04sQ0FBQyxDQUFDOztBQUVILElBQUUsQ0FBQyxPQUFPLEVBQUUsVUFBQSxJQUFJLEVBQUk7QUFDbEIsUUFBSSxNQUFNLEdBQUcsRUFBQyxJQUFJLEVBQUUsUUFBUSxFQUFDLENBQUM7QUFDOUIsT0FBRyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FDVixJQUFJLENBQUMsTUFBTSxDQUFDLENBQ1osR0FBRyxDQUFDLFFBQVEsRUFBRSxrQkFBa0IsQ0FBQyxDQUNqQyxNQUFNLENBQUMsY0FBYyxFQUFFLE1BQU0sQ0FBQyxDQUM5QixNQUFNLENBQUMsR0FBRyxDQUFDLENBQ1gsR0FBRyxDQUFDLFVBQUMsR0FBRyxFQUFFLEdBQUcsRUFBSztBQUNqQixVQUFJLEdBQUcsRUFBRSxPQUFPLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztBQUMxQixZQUFNLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQztBQUNqQyxVQUFJLEVBQUUsQ0FBQztLQUNSLENBQUMsQ0FBQztHQUNOLENBQUMsQ0FBQztDQUVKLENBQUMsQ0FBQyIsImZpbGUiOiJyZXN0Um91dGVyLnNwZWMuanMiLCJzb3VyY2VSb290IjoiLy9ob21lL3NlbC9Eb2N1bWVudHMvc3Ryb2plL3JvYm9sL25vZGVfbW9kdWxlcy9iZWFtLXJlc3Qtcm91dGVyL3Rlc3Qvc3JjIn0=