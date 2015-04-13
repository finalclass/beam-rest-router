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

var Entity = (function () {
  function Entity(data, model) {
    _classCallCheck(this, Entity);

    this.name = data.name;
    this._id = data._id;
    Object.defineProperty(this, 'model', { value: model, writable: true });
  }

  _createClass(Entity, [{
    key: 'update',
    value: function update(changes, callback) {
      var _this = this;

      Object.keys(changes.$set).forEach(function (property) {
        _this[property] = changes.$set[property];
      });
      callback(null, this);
    }
  }, {
    key: 'remove',
    value: function remove(callback) {
      this.model.removeById(this._id, callback);
    }
  }]);

  return Entity;
})();

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
  }, {
    key: 'removeById',
    value: function removeById(id, callback) {
      var _this2 = this;

      this.findOne(id, function (err, record) {
        _this2.data.splice(_this2.data.indexOf(record), 1);
        callback(err);
      });
    }
  }]);

  return Model;
})();

describe('restRouter', function () {
  var req = undefined;
  var data = undefined;

  beforeEach(function () {
    data = [];
    var model = new Model(data);

    data.push(new Entity({ _id: '1', name: 'Genesis' }, model)), data.push(new Entity({ _id: '2', name: 'Exodus' }, model)), data.push(new Entity({ _id: '3', name: 'Leviticus' }, model));

    var app = _express2['default']();
    app.use(_bodyParser2['default'].json());
    app.use('/', _restRouter2['default']({ model: model }));
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

  it('puts', function (done) {
    var name = '1st book of Moses';
    req.put('/1').send({ name: name }).set('Accept', 'application/json').expect('Content-Type', /json/).expect(200).end(function (err, res) {
      if (err) return done(err);
      expect(res.body).toEqual({ _id: '1', name: name });
      done();
    });
  });

  it('deletes', function (done) {
    var name = '1st book of Moses';
    req.del('/1').set('Accept', 'application/json').expect(204).end(function (err, res) {
      if (err) return done(err);
      expect(req.body).toBeUndefined();
      done();
    });
  });
});
//# sourceMappingURL=data:application/json;base64,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LElBQUksRUFBQyxDQUFDLENBQ1osR0FBRyxDQUFDLFFBQVEsRUFBRSxrQkFBa0IsQ0FBQyxDQUNqQyxNQUFNLENBQUMsY0FBYyxFQUFFLE1BQU0sQ0FBQyxDQUM5QixNQUFNLENBQUMsR0FBRyxDQUFDLENBQ1gsR0FBRyxDQUFDLFVBQUMsR0FBRyxFQUFFLEdBQUcsRUFBSztBQUNqQixVQUFJLEdBQUcsRUFBRSxPQUFPLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztBQUMxQixZQUFNLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDLE9BQU8sQ0FBQyxFQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFKLElBQUksRUFBQyxDQUFDLENBQUM7QUFDM0MsVUFBSSxFQUFFLENBQUM7S0FDUixDQUFDLENBQUM7R0FDTixDQUFDLENBQUM7O0FBRUgsSUFBRSxDQUFDLFNBQVMsRUFBRSxVQUFBLElBQUksRUFBSTtBQUNwQixRQUFJLElBQUksR0FBRyxtQkFBbUIsQ0FBQztBQUMvQixPQUFHLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUNWLEdBQUcsQ0FBQyxRQUFRLEVBQUUsa0JBQWtCLENBQUMsQ0FDakMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUNYLEdBQUcsQ0FBQyxVQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUs7QUFDakIsVUFBSSxHQUFHLEVBQUUsT0FBTyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7QUFDMUIsWUFBTSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxhQUFhLEVBQUUsQ0FBQztBQUNqQyxVQUFJLEVBQUUsQ0FBQztLQUNSLENBQUMsQ0FBQztHQUNOLENBQUMsQ0FBQztDQUVKLENBQUMsQ0FBQyIsImZpbGUiOiJyZXN0Um91dGVyLnNwZWMuanMiLCJzb3VyY2VSb290IjoiLy9ob21lL3NlbC9Eb2N1bWVudHMvc3Ryb2plL3JvYm9sL25vZGVfbW9kdWxlcy9iZWFtLXJlc3Qtcm91dGVyL3Rlc3Qvc3JjIn0=