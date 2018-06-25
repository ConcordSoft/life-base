var paymentManager = require('../../lib/managers/paymentManager');
var models = require('./../../lib/db');
var userModel = models['user'];

var Q = require("q");

/**
 * Charge payment for user
 * @param req
 * @param res
 * @param next
 */
exports.charge = function (req, res, next) {
  if (req.body == '') {
    logger.error('ERROR Charge Payment - req.body can\'t be empty ');
    return next(error('LENGTH_REQUIRED'));
  }
  if (!req.body.card_nonce) {
    logger.error('ERROR Charge Payment - Card nonce can\'t be empty ');
    return next(error('BAD_REQUEST'));
  }

  if (!req.body.amount) {
    logger.error('ERROR Charge Payment - Amount can\'t be empty ');
    return next(error('BAD_REQUEST'));
  }

  paymentManager.charge(req.body.card_nonce, req.body.amount).then(function (data) {
    console.log('data is ', data);
    logger.info('SUCCESSFULLY made payment for user with id: ' + req.params.userId);
    res.json(data);
  }).fail(function (err) {
    logger.error('ERROR Charging for user with id:' + req.params.userId, err);
    next(err)
  });

  // userModel.findById(req.params.userId).then(function (found) {
  //   if(!found) return next(error('NOT_FOUND'));

  //   console.log('found user ');

  //   paymentManager.charge(req.body.card_nonce, req.body.amount).then(function (data) {
  //     console.log('data is ', data);
  //     logger.info('SUCCESSFULLY made payment for user with id: ' + req.params.userId);
  //     res.json(data);
  //   }).fail(function (err) {
  //     logger.error('ERROR Charging for user with id:' + req.params.userId, err);
  //     next(err)
  //   });
  // }).fail(function (error) {
  //   logger.error('ERROR Charge user - find user - for user with id:' + req.params.userId, error);
  //   next(error)
  // });

};