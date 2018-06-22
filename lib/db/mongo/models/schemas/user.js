/*
 * Copyright (C) 2016 Hyperether LLC, All Rights Reserved.
 * This source code and any compilation or derivative thereof is the
 * proprietary information of Hyperether LLC and is confidential in nature.
 *
 * Under no circumstances is this software to be exposed to or placed
 * under an Open Source License of any type without the expressed written
 * permission of Hyperether LLC.
 *
 * Created by Laslo on 30.1.2018..
 */

var mongoose = require('mongoose');
module.exports = (function () {
  var userSchema = new mongoose.Schema({
    /**
     * User first name
     */
    fn: {
      type: String,
      trim: true
    },
    /**
     * User last name
     */
    ln: {
      type: String,
      trim: true
    },
    /**
     * User email address
     */
    em: {
      type: String,
      unique: true,
      index: true,
      sparse: true,
      trim: true,
      required: true
    },
    /**
     * User password
     */
    pw: {
      type: String,
      required: true
    },
    /**
     * User courses
     */
    c: {
      type: Array,
      default: []
    }
  });
  userSchema.index({
    fn: "text",
    ln:"text"
  });
  return userSchema;
})();