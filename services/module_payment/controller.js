var paymentManager = require('../../lib/managers/paymentManager');

var Q = require("q");

/**
 * Register new Trader
 * @param req
 * @param res
 * @param next
 */
exports.register = function (req, res, next) {
  if (!req.body.em) {
    logger.error("ERROR Register - Person Email can't be empty ");
    return next(error('BAD_REQUEST', "Person Email can't be empty"));
  }
  
  // email validation
  var validEmail = isEmail(req.body.em);
  if (!validEmail) {
    logger.error('ERROR Register - Wrong Email format ');
    return next(error('BAD_REQUEST'));
  }
  
  if (!req.body.fn) {
    logger.error("ERROR Register - Person First Name can't be empty ");
    return next(error('BAD_REQUEST', "Person First Name can't be empty"));
  }

  if (!req.body.ln) {
    logger.error("ERROR Register - Person Last Name can't be empty ");
    return next(error('BAD_REQUEST', "Person Last Name can't be empty"));
  }

  if (!req.body.pw) {
    logger.error("ERROR Register - Person First Name can't be empty ");
    return next(error('BAD_REQUEST', "Person First Name can't be empty"));
  }

  req.body.em = req.body.em.toLowerCase();

  accountManager.register(req.body).then(function (data) {
    logger.info('SUCCESSFULLY registered user', req.body);
    res.json(data);
  }).fail(function (err) {
    logger.error('ERROR Registering user' + req.body, err);
    next(err)
  })

};

/**
 * Login existing user
 * @param req
 * @param res
 * @param next
 */
exports.login = function (req, res, next) {
  if (req.body == '') {
    logger.error('ERROR Register - req.body can\'t be empty ');
    return next(error('LENGTH_REQUIRED'));
  }
  if (!req.body.em) {
    logger.error('ERROR Register - Email can\'t be empty ');
    return next(error('BAD_REQUEST'));
  }

  // email validation
  var validEmail = isEmail(req.body.em);
  if (validEmail == false) {
    logger.error('ERROR Register - Wrong Email format ');
    return next(error('BAD_REQUEST'));
  }

  if (!req.body.pw) {
    logger.error('ERROR Register - Password can\'t be empty ');
    return next(error('BAD_REQUEST'));
  }

  req.body.em = req.body.em.toLowerCase();

  accountManager.login(req.body.em, req.body.pw).then(function (data) {
    logger.info('SUCCESSFULLY user logged in:' + req.body.em);
    res.json(data);
  }).fail(function (err) {
    logger.error('ERROR Loggin in user:' + req.body.em, err);
    next(err)
  })
};

/**
 * Add course for user
 * @param req
 * @param res
 * @param next
 */
exports.addCourse = function (req, res, next) {
  if (req.body == '') {
    logger.error('ERROR Add Course - req.body can\'t be empty ');
    return next(error('LENGTH_REQUIRED'));
  }
  if (!req.body.courseName) {
    logger.error('ERROR Add Course - Course name can\'t be empty ');
    return next(error('BAD_REQUEST'));
  }

  accountManager.addCourse(req.params.userId, req.body.courseName).then(function (data) {
    logger.info('SUCCESSFULLY added course ' + req.body.courseName + ' to user with id:' + req.params.userId);
    res.json(data);
  }).fail(function (err) {
    logger.error('ERROR adding course ' + req.body.courseName + ' to user with id:' + req.params.userId, err);
    next(err)
  })
};

/**
 * Check course for user
 * @param req
 * @param res
 * @param next
 */
exports.checkCourse = function (req, res, next) {
  if (req.body == '') {
    logger.error('ERROR Check Course - req.body can\'t be empty ');
    return next(error('LENGTH_REQUIRED'));
  }
  if (!req.body.courseName) {
    logger.error('ERROR Check Course - Course name can\'t be empty ');
    return next(error('BAD_REQUEST'));
  }

  accountManager.checkCourse(req.params.userId, req.body.courseName).then(function (data) {
    logger.info('SUCCESSFULLY check course ' + req.body.courseName + ' for user with id:' + req.params.userId);
    res.json(data);
  }).fail(function (err) {
    logger.error('ERROR check course ' + req.body.courseName + ' for user with id:' + req.params.userId, err);
    next(err)
  })
};