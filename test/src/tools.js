export class Entity {
  constructor(data, model) {
    this.name = data.name;
    this._id = data._id;
    Object.defineProperty(this, 'model', {value: model, writable: true});
  }

  update(changes, callback) {
    Object.keys(changes.$set).forEach(property => {
      this[property] = changes.$set[property];
    });
    callback(null, this);
  }

  remove(callback) {
    this.model.removeById(this._id, callback);
  }
}

export class Model {
  constructor(data) {
    this.data = data;
  }
  findOne(id, callback) {
    callback(null, this.data.filter(record => record._id === id)[0]);
  }

  find(where, callback) {
    callback(null, this.data);
  }

  create(record, callback) {
    this.data.push(record)
    callback(null, record);
  }
  removeById(id, callback) {
    this.findOne(id, (err, record) => {
      this.data.splice(this.data.indexOf(record), 1);
      callback(err);
    });
  }
}
