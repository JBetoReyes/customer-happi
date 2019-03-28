'use strict';

var dbm;
var type;
var seed;

/**
  * We receive the dbmigrate dependency from dbmigrate initially.
  * This enables us to not have to rely on NODE_PATH.
  */
exports.setup = function(options, seedLink) {
  dbm = options.dbmigrate;
  type = dbm.dataType;
  seed = seedLink;
};

exports.up = function(db, callback) {
  db.createTable('customers', {
    id: {
      type: 'string',
      primaryKey: true,
      length: 36
    },
    first_name: {
      type: 'string',
      length: 40
    },
    last_name: {
      type: 'string',
      length: 40
    },
    phone: {
      type: 'string',
      length: 12
    },
    email: {
      type: 'string',
      length: 50
    }
  }, function (err) {
    if (err) return callback(err);
    return callback();
  });
};

exports.down = function(db) {
  db.dropTable('customers')
};

exports._meta = {
  "version": 1
};
