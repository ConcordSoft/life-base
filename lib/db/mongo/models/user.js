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

var schema = require('./schemas/user'),
    base   = require('../base');

    var model = base(schema, 'user');

module.exports = model;