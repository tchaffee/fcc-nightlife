'use strict';

const path = process.cwd();

const Yelp = require('yelp');
const pick = require('lodash/pick');
const VenueController = require(path + '/app/controllers/venueController.js');
const venueController = new VenueController();
const asyncMap = require('async/map');

function SearchController () {

  var that = this;

  this.usersGoingCount = function usersGoingCount(venue, done) {

//    console.log('usersGoingCount: ', venue.id);
    venueController.getUsersGoingCount(venue.id, function(count) {
      venue.users_going_count = count;
      done(null, venue);
    });
  }

 	this.search = function (req, res) {

		const yelpConfig = {
			consumer_key: process.env.YELP_CONSUMER_KEY,
			consumer_secret: process.env.YELP_CONSUMER_SECRET,
			token: process.env.YELP_TOKEN,
			token_secret: process.env.YELP_TOKEN_SECRET,
		};

		var yelp = new Yelp(yelpConfig);

		const search = req.params.search;

		yelp.search({ term: 'bars', location: req.params.search })
		.then(data => {

      asyncMap(data.businesses, that.usersGoingCount, function (err, results) {

        console.log('asyncMap results: ');
        console.log(results);
        console.log('asyncMap err: ');
        console.log(err);

        let venues = results.map(el => {
          return pick(el, ['id', 'name', 'image_url', 'snippet_text', 'users_going_count']);
        });

        res.json({ businesses: venues})
      });
		})
		.catch(function (err) {
		  console.error(err);
		});
  }
}

module.exports = SearchController;
