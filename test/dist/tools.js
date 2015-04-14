'use strict';

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, '__esModule', {
  value: true
});

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

exports.Entity = Entity;

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

exports.Model = Model;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInRvb2xzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7SUFBYSxNQUFNO0FBQ04sV0FEQSxNQUFNLENBQ0wsSUFBSSxFQUFFLEtBQUssRUFBRTswQkFEZCxNQUFNOztBQUVmLFFBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQztBQUN0QixRQUFJLENBQUMsR0FBRyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUM7QUFDcEIsVUFBTSxDQUFDLGNBQWMsQ0FBQyxJQUFJLEVBQUUsT0FBTyxFQUFFLEVBQUMsS0FBSyxFQUFFLEtBQUssRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFDLENBQUMsQ0FBQztHQUN0RTs7ZUFMVSxNQUFNOztXQU9YLGdCQUFDLE9BQU8sRUFBRSxRQUFRLEVBQUU7OztBQUN4QixZQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxPQUFPLENBQUMsVUFBQSxRQUFRLEVBQUk7QUFDNUMsY0FBSyxRQUFRLENBQUMsR0FBRyxPQUFPLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO09BQ3pDLENBQUMsQ0FBQztBQUNILGNBQVEsQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7S0FDdEI7OztXQUVLLGdCQUFDLFFBQVEsRUFBRTtBQUNmLFVBQUksQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsUUFBUSxDQUFDLENBQUM7S0FDM0M7OztTQWhCVSxNQUFNOzs7UUFBTixNQUFNLEdBQU4sTUFBTTs7SUFtQk4sS0FBSztBQUNMLFdBREEsS0FBSyxDQUNKLElBQUksRUFBRTswQkFEUCxLQUFLOztBQUVkLFFBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO0dBQ2xCOztlQUhVLEtBQUs7O1dBSVQsaUJBQUMsRUFBRSxFQUFFLFFBQVEsRUFBRTtBQUNwQixjQUFRLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLFVBQUEsTUFBTTtlQUFJLE1BQU0sQ0FBQyxHQUFHLEtBQUssRUFBRTtPQUFBLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0tBQ2xFOzs7V0FFRyxjQUFDLEtBQUssRUFBRSxRQUFRLEVBQUU7QUFDcEIsY0FBUSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7S0FDM0I7OztXQUVLLGdCQUFDLE1BQU0sRUFBRSxRQUFRLEVBQUU7QUFDdkIsVUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUE7QUFDdEIsY0FBUSxDQUFDLElBQUksRUFBRSxNQUFNLENBQUMsQ0FBQztLQUN4Qjs7O1dBQ1Msb0JBQUMsRUFBRSxFQUFFLFFBQVEsRUFBRTs7O0FBQ3ZCLFVBQUksQ0FBQyxPQUFPLENBQUMsRUFBRSxFQUFFLFVBQUMsR0FBRyxFQUFFLE1BQU0sRUFBSztBQUNoQyxlQUFLLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBSyxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO0FBQy9DLGdCQUFRLENBQUMsR0FBRyxDQUFDLENBQUM7T0FDZixDQUFDLENBQUM7S0FDSjs7O1NBckJVLEtBQUs7OztRQUFMLEtBQUssR0FBTCxLQUFLIiwiZmlsZSI6InRvb2xzLmpzIiwic291cmNlUm9vdCI6Ii8vaG9tZS9zZWwvRG9jdW1lbnRzL3N0cm9qZS9yb2JvbC9ub2RlX21vZHVsZXMvYmVhbS1yZXN0LXJvdXRlci90ZXN0L3NyYyJ9