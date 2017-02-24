'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var User = new Schema({
	_id: String
});

module.exports = mongoose.model('User', User);
