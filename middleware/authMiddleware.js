var config = require('../config/'),
    jwt    = require('jsonwebtoken');

var Auth = {
  checkUserToken: function (req, res, next) {
    // check header or url parameters or post parameters for token
 
    var token = req.headers['x-access-token'];
    if (!token) return next(error('FORBIDDEN'));
    // verifies secret and checks exp
    jwt.verify(token, config.token.secret, function (err, decoded) {
      console.log('ERRROR',err)
      if (err) {
        if (err.message == 'jwt expired'){
          return next(error('EXPIRED'));
        } else {
          return next(error('FORBIDDEN'));
        }
      }
      if (!decoded && decoded.userId != req.params.userId) {
        return next(error('FORBIDDEN'));
      }
      // if everything is good, save to request for use in other routes
      // req.decoded = decoded;
      next();
    });
  },
  checkAdminToken: function (req, res, next) {
    // check header or url parameters or post parameters for token
    var token = req.headers['x-access-token'];
    console.log("ADMIN TOKEN",token)
    if (!token) {
      return next(error('FORBIDDEN'));
    }
    // verifies secret and checks exp
    jwt.verify(token, config.token.secret, function (err, decoded) {
      if (err) {
        if (err.message == 'jwt expired'){
          return next(error('EXPIRED'));
        } else {
          return next(error('FORBIDDEN'));
        }
      }
      if (!decoded) {
        return next(error('FORBIDDEN'));
      }
      if (decoded.adminId != req.params.adminId){
        return next(error('FORBIDDEN'));
      }
      // if everything is good, save to request for use in other routes
      // req.decoded = decoded;
      next();
    });
  }

};

module.exports = Auth;

