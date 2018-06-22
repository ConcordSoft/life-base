/*
 * Copyright (C) 2016 HyperEther, All Rights Reserved.
 * This source code and any compilation or derivative thereof is the
 * proprietary information of HyperEther and is confidential in nature.
 *
 * Under no circumstances is this software to be exposed to or placed
 * under an Open Source License of any type without the expressed written
 * permission of HyperEther.
 *
 * Created by Laslo on 16.3.16.
 */
process.env.NODE_ENV = "test";

config = require("../config/");
logger = require('../lib/logger');

var should = require('should'),
    exec   = require('child_process').exec;

describe('main', function () {
  before(function (done) {
    return exec('mongo lifebase_test --eval "db.dropDatabase()"', function (err, data) {
      if (err) {
        console.log('Error droping exitisting test database');
        throw err;
      } else {
        console.log('Existing test database successfully droped');
        return done();
      }
    });
  });

  it('should successfully drop test database', function (done) {
    require('../services/module_user/test/index');
    return done();
  });
});