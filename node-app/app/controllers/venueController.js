'use strict';

// var Users = require('../models/users.js');
var Venues = require('../models/venues.js');

function VenueController () {

  var that = this;

  this.getUsersGoingCount = function (venueId, callback) {
    Venues
			.findOne({ 'venue_id': venueId }, function (err, venueDoc) {
        if (err) {
          throw err;
        }

        if (venueDoc) {
//          console.log('getUsersGoingCount: ', venueDoc.going.length);
          callback(venueDoc.going.length);
        } else {
//          console.log('getUsersGoingCount ZERO');
          callback(0);
        }
      });
  }

  this.toggleGoing = function (userId, venueId) {

		Venues
			.findOne({ 'venue_id': venueId }, function (err, venueDoc) {
        if (venueDoc) {
          let userIndex = venueDoc.going.indexOf(userId);

          console.log('Found venue');

          // Does use exist in list? Then remove the user.
          if (userIndex > -1) {
            venueDoc.going.splice(userIndex, 1);
          } else {
            venueDoc.going.push(userId);
          }

          venueDoc.save(function (err) {
            if (err) {
              throw err;
            }
          });

        // No Venue yet. Add it.
        } else {
          console.log('Creating venue.');
          var newVenue = new Venues();

          newVenue.venue_id = venueId;
          newVenue.going = [ userId ];

          newVenue.save(function (err) {
            if (err) {
              throw err;
            }
          });
        }
      });
	};

 	this.handleGet = function (req, res) {
    console.log(req.user);
    console.log(req.isAuthenticated());
    console.log(req.params.venueid)
    that.getUsersGoingCount(req.params.venueid, function (count) {
      res.json({ users_going_count: count });
    })
  };

  this.handlePost = function (req, res) {
    console.log(req.user);
    console.log(req.isAuthenticated());
    console.log(req.params.venueid);
    that.toggleGoing(req.user.sub, req.params.venueid);
    res.send({ result: 'toggled user going.'});
  };


};

module.exports = VenueController;
