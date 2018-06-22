//include logger globally
config = require('./config/');
logger = require('./lib/logger');
error  = require('./lib/error').error;

logger.info('loaded enviroment:', config.env);

var express                  = require('express'),
    cors                     = require('cors'),
    app                      = express(),
    mongoose                 = require('mongoose'),
    router                   = require('./router.js'),
    bodyParser               = require('body-parser'),
    logRequest               = require("./middleware/loggerMiddleware").logRequest,
    logErrors                = require("./middleware/loggerMiddleware").logErrors,
    errorHandlerMiddleware   = require("./middleware/errorHandlerMiddleware").errorHandlerMiddleware,
    routeValidatorMiddleware = require('./middleware/routeValidatorMiddleware'),
    path                     = require('path'),
    directory                = require('serve-index');


app
  .use(cors())
  .use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'X-Requested-With');
    next();
  });

app.use(bodyParser.json({
  limit: '20mb'
}));
app.use(bodyParser.urlencoded({
  limit: '20mb',
  extended: true
}));
//log incoming requests
app.use(bodyParser.urlencoded({
  extended: true
}));


app.use(logRequest);
app.use(routeValidatorMiddleware);
//load routes recursively from services folders
router.load(app);

//log errors
app.use(logErrors);

//handle errors and send error responses
app.use(errorHandlerMiddleware);

//load statics
app.use('/doc', express.static(path.join(__dirname, 'doc')));
app.use('/log', directory(__dirname + '/log'));
app.use('/log', express.static(__dirname + '/log'));
app.use('/', express.static(__dirname + '/public/dist'));

//web portal is in root folder
//app.use('/', express.static(__dirname + '/build'));

//set port

app.set('port', process.env.port || 9000);

//connect to mongo db
mongoose.connect(config.mongodb.host + config.mongodb.db, {
  db: {
    safe: true
  },
  useMongoClient: true
}, function (err) {
  if (err) {
    logger.error("Mongoose - connection error: " + err);
    throw err;
  }
  
  //init server
  app.listen(app.get("port"), function () {
    logger.info("listening on port " + (app.get("port")));
    require('./postLoader.js').load(app);
  });
  logger.info("Mongoose - connection OK to: " + config.mongodb.host + config.mongodb.db);
});

module.exports = app;

