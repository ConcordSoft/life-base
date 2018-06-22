var config = {
  env: 'prod',
  token: {
    secret: '123&$&*!01rw#@$@$mxan!#'
  },
  logger: {
    path: './log/server.log'
  },
  mongodb: {
    host: "mongodb://localhost:27017/",
    db: "lifebase_prod",
    debug: false
  },
  file: {
    destination: "/files"
  },
  "log": {
    "level": "debug",
    "json": false,
    "logsToFile": true,
    "fileLogParams": {
      "folder": "log",
      "prefix": "LIFEBASE_",
      "datePattern": "yyyy_MM_dd",
      "extension": "log",
      "keepLogsDays": 3
    },
    "logsToDatabase": false
  },
  "server": "http://localhost:9000"
};

module.exports = config;