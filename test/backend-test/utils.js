'use strict';
var express = require('express');
var app = exports.app = express();
var mongoose = require('mongoose'); // mongoose is a node library for integrating with MongoDB
// ensure the NODE_ENV is set to 'test'
// this is helpful when you would like to change behavior when testing
process.env.NODE_ENV = 'test';

var config = require('../../config/config')[process.env.NODE_ENV];

beforeEach(function (done) {
	function clearDB() {
		for (var i in mongoose.connection.collections) {
			mongoose.connection.collections[i].remove(function() {});
		}
		return done();
	}

	if (mongoose.connection.readyState === 0) {
		mongoose.connect(config.db, function (err) {
			if (err) {
				throw err;
			}
			return clearDB();
		});
	} else {
		return clearDB();
	}
});

afterEach(function (done) {
	mongoose.disconnect();
	return done();
});