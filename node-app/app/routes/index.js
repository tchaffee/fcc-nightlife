'use strict';

var path = process.cwd();
// var ClickHandler = require(path + '/app/controllers/clickHandler.server.js');
var SearchController = require(path + '/app/controllers/searchController.js');
var VenueController = require(path + '/app/controllers/venueController.js');
require('dotenv').load();

var jwt = require('express-jwt');
var authenticate = jwt({
  secret: process.env.AUTH0_SECRET,
  audience: process.env.AUTH0_CLIENT_ID
});

module.exports = function (app, passport) {

	function isLoggedIn (req, res, next) {
		if (req.isAuthenticated()) {
			return next();
		} else {
			res.redirect('/login');
		}
	}

//	var clickHandler = new ClickHandler();
	var searchController = new SearchController();
	var venueController = new VenueController();

	app.route('/')
		.get(function (req, res) {
			res.sendFile(path + '/public/index.html');
		});

	app.route('/login')
		.get(function (req, res) {
			res.sendFile(path + '/public/login.html');
		});

	app.route('/logout')
		.get(function (req, res) {
			req.logout();
			res.redirect('/login');
		});

	app.route('/profile')
		.get(isLoggedIn, function (req, res) {
			res.sendFile(path + '/public/profile.html');
		});

	app.route('/api/:id')
		.get(isLoggedIn, function (req, res) {
			res.json(req.user.github);
		});

	app.route('/api/searchbars/:search')
		.get(searchController.search);

	app.route('/auth/twitter')
		.get(function (req, res, next) {
		  console.log('server inside auth/twitter');
			return next();
		}, passport.authenticate('twitter'),

		function(req, res) {
			console.log('Authenticated!!');
		    // If this function gets called, authentication was successful.
		    // `req.user` contains the authenticated user.
		}
	);

	app.route('/auth/twitter/callback')
		.get(function (req, res, next) {
		  console.log('server inside auth/twitter/callback');
			return next();
		}, passport.authenticate('twitter', {
			successRedirect: '/',
			failureRedirect: '/login'
		}));

		app.route('/api/:venueid/going')
			.get(venueController.handleGet)
			.post(authenticate, venueController.handlePost)

/*
	app.route('/api/:id/clicks')
		.get(isLoggedIn, clickHandler.getClicks)
		.post(isLoggedIn, clickHandler.addClick)
		.delete(isLoggedIn, clickHandler.resetClicks);
*/
};
