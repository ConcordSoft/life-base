/*
 * Copyright (C) 2016 Hyperether LLC, All Rights Reserved.
 * This source code and any compilation or derivative thereof is the
 * proprietary information of Hyperether LLC and is confidential in nature.
 *
 * Under no circumstances is this software to be exposed to or placed
 * under an Open Source License of any type without the expressed written
 * permission of Hyperether LLC.
 *
 * Created by Laslo on 10.1.2018..
 */

var jwt = require('jsonwebtoken'),
  Q = require('q'),
  crypto = require('crypto'),
  bcrypt = require('bcryptjs');

var models = require('../db');
var userModel = models['user'];
var courseConstants = require('./../constants');

var _cryptPassword = function (password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

var _validatePassword = function (password, hash) {
  return bcrypt.compareSync(password, hash);
};

module.exports.register = function (data) {
  var deferred = Q.defer();
  data.gh = crypto.randomBytes(64).toString('hex');
  data.pw = _cryptPassword(data.pw);
  userModel.findOneByFields({
      em: data.em
    })
    .then(function (found) {
      if (found) return deferred.reject(error("ALREADY_REGISTERED"));
      userModel.create(data)
        .then(function (user) {

          var token = jwt.sign({
            email: user.em,
            userId: user._id
          }, config.token.secret, {
            expiresIn: 86400 // expires in 24 hours
          });

          deferred.resolve({
            token: token,
            client: user
          });
        })
        .fail(function (err) {
          deferred.reject(err);
        });
    })
    .fail(function (err) {
      deferred.reject(err);
    });
  return deferred.promise;
};

/**
 * Try to login user with email and password
 * @param email
 * @param password
 */
module.exports.login = function (email, password) {
  var deferred = Q.defer();
  userModel.findOneByFields({
      em: email
    })
    .then(function (found) {
      if (!found) return deferred.reject(error("NOT_FOUND"));
      found = found.toJSON();
      if (!_validatePassword(password, found.pw))
        return deferred.reject(error("INVALID_USERNAME_PASSWORD"));

      var token = jwt.sign({
        email: found.em,
        userId: found._id
      }, config.token.secret, {
        expiresIn: 86400 // expires in 24 hours/
      });

      found.pw = undefined;
      deferred.resolve({
        token: token,
        client: found
      });
    })
    .fail(function (err) {
      return deferred.reject(err);
    });
  return deferred.promise;
};

/**
 * Add course to user
 * @param userId
 * @param courseName
 */
module.exports.addCourse = function (userId, courseName) {
  var deferred = Q.defer();
  userModel.findById(userId).then(function (found) {
      if (!found) return deferred.reject(error("NOT_FOUND"));
      
      const foundCourse = found.c.find(i => i == courseName);
      if(foundCourse) {
        logger.error('Error - Add course ' + courseName + ' to user - not allowed because user already bought it');
        return deferred.error('NOT_ALLOWED')
      }

      found.c.push(courseName);

      userModel.updateOne(found._id, {c: found.c}).then(function (user) {
        logger.info('Successfully added course to user');
        deferred.resolve({status: 200});
      }).fail(function (error) {
        logger.error('Error - Add course ' + courseName + ' to user with id ' + userId +  ' because of error ', error);
        deferred.reject(error);
      });

    })
    .fail(function (err) {
      logger.error('Error - Add course ' + courseName + ' to user with id ' + userId +  ' because of error ', error);
      return deferred.reject(err);
    });
  return deferred.promise;
};

/**
 * Check course for user
 * @param userId
 * @param courseName
 */
module.exports.checkCourse = function (userId, courseName) {
  var deferred = Q.defer();
  userModel.findById(userId).then(function (found) {
      if (!found) return deferred.reject(error("NOT_FOUND"));
      
      const foundCourse = found.c.find(i => i == courseName);
      if(foundCourse) {
        logger.info('Success - Check course ' + courseName + ' - found for user with id ' + userId);
        deferred.resolve({found: true});
      } else {
        logger.info('Error - Check course ' + courseName + ' - not found for user with id ' + userId);
        deferred.resolve({found: false});
      }

    })
    .fail(function (err) {
      logger.error('Error - Check course ' + courseName + ' for user with id ' + userId +  ' because of error ', error);
      return deferred.reject(err);
    });
  return deferred.promise;
};