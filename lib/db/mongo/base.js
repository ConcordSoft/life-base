/*
 * Copyright (C) 2016 Hyperether, All Rights Reserved.
 * This source code and any compilation or derivative thereof is the
 * proprietary information of Hyperether and is confidential in nature.
 *
 * Under no circumstances is this software to be exposed to or placed
 * under an Open Source License of any type without the expressed written
 * permission of Hyperether.
 *
 * Created by Laslo on 7.6.2017..
 */

var Q = require('q'),
  mongoose = require('mongoose'),
  _ = require('lodash'),
  error = require('../../error').error;

module.exports = function (schema, name) {

  var checkMongoId = function (id, subsetName) {
    var mongoId;
    try {
      mongoId = mongoose.Types.ObjectId(id);
    } catch (e) {
      logger.error('Bad mongo ID ' + id + ' for collection ' + name + (subsetName ? '.' + subsetName : ''), e);
    }
    return mongoId;
  };

  /**
   * Returns one row for mongo id
   * @returns {}
   */
  schema.statics.findById = function (id, options) {
    var deferred = Q.defer();
    var mongoID = checkMongoId(id);

    if (mongoID) {
      var params = _.defaults({
        _id: mongoID
      }, options);
      model.findOne(params, function (err, dbGroup) {
        if (err) {
          logger.error('Error finding ' + name + ' by id', err);
          return deferred.reject(error('DATABASE_ERROR'));
        }
        deferred.resolve(dbGroup);
      });
    } else {
      deferred.reject(error('BAD_ID_FORMAT'));
    }
    return deferred.promise;
  };

  /**
   * Returns all groups
   * @returns []
   */
  schema.statics.findAll = function (options, sort) {
    var deferred = Q.defer();
    model.find({}, options, sort, function (err, rows) {
      if (err) {
        logger.error('Error finding all ' + name + ' records', err);
        return deferred.reject(error('DATABASE_ERROR'));
      }
      deferred.resolve(rows);
    });
    return deferred.promise;
  };

  /**
   * Performs text index search on collection
   * @param searchTerm
   * @returns []
   */
  schema.statics.textSearch = function (searchTerm) {
    var deferred = Q.defer();
    model.find({
      $text: {
        $search: searchTerm
      }
    }, function (err, rows) {
      if (err) {
        logger.error('Error finding all ' + name + ' records', err);
        return deferred.reject(error('DATABASE_ERROR'));
      }
      deferred.resolve(rows);
    });
    return deferred.promise;
  };

  /**
   * Returns for field filter
   * @returns []
   * @private
   */
  schema.statics.findOneByFields = function (fields, options) {
    var deferred = Q.defer();
    model.findOne(fields, options, function (err, rows) {
      if (err) {
        logger.error('Error finding by fields ' + JSON.stringify(fields) + ', ' + name + ' records', err);
        return deferred.reject(error('DATABASE_ERROR'));
      }
      deferred.resolve(rows);
    });
    return deferred.promise;
  };

  /**
   * Returns for field filter
   * @returns []
   * @private
   */
  schema.statics.findByFields = function (query, fields, options) {
    var deferred = Q.defer();
    model.find(query, fields, options, function (err, rows) {
      if (err) {
        logger.error('Error finding by query ' + JSON.stringify(query) + ', ' + name + ' records', err);
        return deferred.reject(error('DATABASE_ERROR'));
      }
      deferred.resolve(rows);
    });
    return deferred.promise;
  };

  /**
   * Counts records for field filter
   * @returns []
   * @private
   */
  schema.statics.countByFields = function (fields) {
    var deferred = Q.defer();
    model.count(fields, function (err, count) {
      if (err) {
        logger.error('Error counting by fields ' + JSON.stringify(fields) + ', ' + name + ' records', err);
        return deferred.reject(error('DATABASE_ERROR'));
      }
      deferred.resolve(count);
    });
    return deferred.promise;
  };

  schema.statics.create = function (data) {
    var deferred = Q.defer();
    delete data._id; //removing ID because we are creating new record
    var record = new model(data);
    record.save(function (err, row) {
      if (err) {
        logger.error('Error saving ' + name + ' record', err);
        return deferred.reject(error('DATABASE_ERROR'));
      }
      deferred.resolve(row);
    });
    return deferred.promise;
  };

  /**
   * Update
   * 
   * @param id      The identifir
   * @param data    The data
   * @param options The options
   */
  schema.statics.updateOne = function (id, data, options) {
    var deferred = Q.defer();
    var mongoID = checkMongoId(id);

    if (mongoID) {
      // options = _.defaults(options, {
      //   new: true
      // });
      model.findOneAndUpdate({
        _id: mongoID
      }, data, {
        new: true
      }, function (err, row) {
        if (err) {
          logger.error('Error updating ' + name + ' record', err);
          return deferred.reject(error('DATABASE_ERROR'));
        }
        deferred.resolve(row);
      });
    } else {
      deferred.reject(error('BAD_ID_FORMAT'));
    }
    return deferred.promise;
  };

  /**
   * Custom update
   *
   * @param query    The query
   * @param data     The data
   * @param options  The options
   */
  schema.statics.customUpdate = function (query, data, options) {
    var deferred = Q.defer();
    if (query) {
      // options = _.defaults(options, {
      //   new: true
      // });
      model.findOneAndUpdate(query, data, {
        new: true
      }, function (err, row) {
        if (err) {
          logger.error('Error updating ' + name + ' record', err);
          return deferred.reject(error('DATABASE_ERROR'));
        }
        deferred.resolve(row);
      });
    } else {
      deferred.reject(error('BAD_ID_FORMAT'));
    }
    return deferred.promise;
  };

  /**
   * Updates all records that meet the query condition
   *
   * @param query    The query
   * @param data     The data
   */
  schema.statics.conditionalUpdate = function (query, data) {
    var deferred = Q.defer();
    if (query) {
      var updateArg;
      if (data['$inc']){
        updateArg = data;
      } else {
        updateArg = {$set: data};
      }
      model.update(query, updateArg, {
        multi: true
      }, function (err, row) {
        if (err) {
          logger.error('Error conditionalUpdate ' + name + ', query: '+query+', data: '+data, err);
          return deferred.reject(error('DATABASE_ERROR'));
        }
        deferred.resolve(row);
      });
    } else {
      deferred.reject(error('BAD_ID_FORMAT'));
    }
    return deferred.promise;
  };

  /**
   * increment
   * 
   * @param id      The identifir
   * @param data    The data in format {field: inc_value, field1: inc_value}
   * @param options The options
   */
  schema.statics.incrementFields = function (id, data, options) {
    var deferred = Q.defer();
    var mongoID = checkMongoId(id);

    if (mongoID) {
      // options = _.defaults(options, {
      //   new: true
      // });
      model.update({
        _id: mongoID
      }, {$inc : data}, {
        new: true
      }, function (err, row) {
        if (err) {
          logger.error('Error incrementing ' + name + ' record', err);
          return deferred.reject(error('DATABASE_ERROR'));
        }
        deferred.resolve(row);
      });
    } else {
      deferred.reject(error('BAD_ID_FORMAT'));
    }
    return deferred.promise;
  };


  /**
   * Delete
   * 
   * param id The identifier
   */
  schema.statics.delete = function (id) {
    var deferred = Q.defer();
    var mongoID = checkMongoId(id);

    if (mongoID) {
      model.remove({
        _id: mongoID
      }, function (err) {
        if (err) {
          logger.error('Error deleting ' + name + ' record', err);
          return deferred.reject(error('DATABASE_ERROR'));
        }
        deferred.resolve();
      });
    } else {
      deferred.reject(error('BAD_ID_FORMAT'));
    }

    return deferred.promise;
  };

  /**
   * Custom Delete
   *
   * @param query   The query
   */
  schema.statics.customDelete = function (query) {
    var deferred = Q.defer();

    model.remove(query, function (err) {
      if (err) {
        logger.error('Error deleting ' + name + ' record for query' + JSON.stringify(query), err);
        return deferred.reject(error('DATABASE_ERROR'));
      }
      deferred.resolve();
    });


    return deferred.promise;
  };

  /**
   * Add to Subset
   *
   * @param id         The identifier
   * @param subsetName The subset name
   * @param data       The data
   */
  schema.statics.addToSubset = function (id, subsetName, data) {

    var deferred = Q.defer();
    var mongoID = checkMongoId(id);

    if (mongoID) {
      var subSetJson = {};
      subSetJson[subsetName] = data;

      model.findOneAndUpdate({
        _id: mongoID
      }, {
        '$addToSet': subSetJson
      }, {
        new: true
      }, function (err, row) {
        if (err) {
          logger.error('Error adding to subCollection ' + subsetName + ' from ' + name + ' for ID: ' + id +
            ', data: ' + JSON.stringify(data), err);
          return deferred.reject(error('DATABASE_ERROR'));
        }
        deferred.resolve(row);
      });
    } else {
      deferred.reject(error('BAD_ID_FORMAT'));
    }
    return deferred.promise;
  };

  /**
   * Update Subset Element
   *
   * @param id          The identifier
   * @param subsetName  The subset name
   * @param subsetId    The subset identifier
   * @param data        The data
   * @param options     The options
   */
  schema.statics.updateSubsetElement = function (id, subsetName, subsetId, data, options) {
    var deferred = Q.defer();
    var mongoID = checkMongoId(id);
    var subsetMongoID = checkMongoId(subsetId, subsetName);

    if (mongoID && subsetMongoID) {
      var query = {
        _id: mongoID
      };
      query[subsetName + '._id'] = subsetMongoID;

      dataForUpdate = {};
      _.forEach(data, function (value, key) {
        dataForUpdate[subsetName + '.$.' + key] = value;
      });

      var updateQuery = {
        '$set': dataForUpdate
      };

      options = _.defaults(options, {
        new: true
      });
      model.findOneAndUpdate(query, updateQuery, options, function (err, row) {
        if (err) {
          logger.error('Error updating subCollection ' + subsetName + ' for id ' +
            subsetId + ' from ' + name + ' for ID: ' + id + ', data: ' + JSON.stringify(data), err);
          return deferred.reject(error('DATABASE_ERROR'));
        }
        deferred.resolve(row);
      });
    } else {
      deferred.reject(error('BAD_ID_FORMAT'));
    }
    return deferred.promise;
  };

  /**
   * Removes from subset.
   *
   * @param  id          The identifier
   * @param  subsetName  The subset name
   * @param  subsetKey   The subset key
   */
  schema.statics.removeFromSubset = function (id, subsetName, subsetKey) {
    var deferred = Q.defer();
    var mongoID = checkMongoId(id);
    var subsetMongoId = checkMongoId(subsetKey, subsetName);

    if (mongoID && subsetKey) {

      dataForUpdate = {};
      if (subsetMongoId)
        dataForUpdate[subsetName] = {
          _id: subsetMongoId
        };
      else
        dataForUpdate[subsetName] = subsetKey;

      var updateQuery = {
        '$pull': dataForUpdate
      };
      model.findOneAndUpdate({
        _id: mongoID
      }, updateQuery, {
        new: true
      }, function (err, row) {
        if (err) {
          logger.error('Error deleting from subCollection ' + subsetName + ' for ID: ' +
            subsetId + ' from ' + name + ' for ID: ' + id, err);
          return deferred.reject(error('DATABASE_ERROR'));
        }
        deferred.resolve(row);
      });
    } else {
      deferred.reject(error('BAD_ID_FORMAT'));
    }
    return deferred.promise;
  };

  /**
   * Update subset element array
   *
   * @param id          The identifier
   * @param subsetName  The subset name
   * @param subsetId    The subset identifier
   * @param action      The action
   * @param field       The field
   * @param value       The value
   * @param options     The options
   */
  schema.statics.updateSubsetElementArray = function (id, subsetName, subsetId, action, field, value, options) {
    var deferred = Q.defer();
    var mongoID = checkMongoId(id);
    var subsetMongoID = checkMongoId(subsetId, subsetName);

    if (mongoID && subsetMongoID) {
      var query = {
        _id: mongoID
      };
      query[subsetName + '._id'] = subsetMongoID;

      var updateQuery = {};
      updateQuery[action] = {};
      updateQuery[action][subsetName + '.$.' + field] = value;

      options = _.defaults(options, {
        new: true
      });
      model.findOneAndUpdate(query, updateQuery, options, function (err, row) {
        if (err) {
          logger.error('Error updating subCollection ' + subsetName + ' for id ' +
            subsetId + ' from ' + name + ' for ID: ' + id + ', data: ' + JSON.stringify(data), err);
          return deferred.reject(error('DATABASE_ERROR'));
        }
        deferred.resolve(row);
      });
    } else {
      deferred.reject(error('BAD_ID_FORMAT'));
    }
    return deferred.promise;
  };

  /**
   * Adds a subset array element.
   *
   * @param id          The identifier
   * @param subsetName  The subset name
   * @param subsetId    The subset identifier
   * @param field       The field
   * @param value       The value
   * @param options     The options
   */
  schema.statics.addSubsetArrayElement = function (id, subsetName, subsetId, field, value, options) {
    var data = {};
    data[field] = {
      '$push': value
    };
    return model.updateSubsetElementArray(id, subsetName, subsetId, '$push', field, value, options);

  };

  /**
   * Remove subser array element
   * 
   * @param id          The identifier
   * @param subsetName  The subset name
   * @param subsetId    The subset identifier
   * @param field       The field
   * @param value       The value
   * @param options     The options
   */
  schema.statics.removeSubsetArrayElement = function (id, subsetName, subsetId, field, value, options) {
    var data = {};
    data[field] = {
      '$push': value
    };
    return model.updateSubsetElementArray(id, subsetName, subsetId, '$pull', field, value, options);
  };


  var model = mongoose.model(name, schema);
  return model;
};