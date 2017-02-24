'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Venue = new Schema({
	  venue_id: String,
    going: [{ type: String }],
});

module.exports = mongoose.model('Venue', Venue);
