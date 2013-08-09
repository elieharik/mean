// WHAT THE CODE WOULD LOOK LIKE - UNFORTUNATELY FRONTEND DONE WITH JADE / NOT ANGULAR


// IF protractor installed globally (npm install protractor -g) RUN 'protractor  <protractor config file >' in this case 'protractor protractor-conf.js'
// otherwise run: 'node_modules/.bin/protractor <protractor config file>', in this case 'node_modules/.bin/protractor protractor-conf.js'

// var util = require('util');
// var should = chai.should();
//var webdriver = require ('selenium-webdriver');
var protractor = require ('protractor');
require('protractor/jasminewd');
//var protractor = require ('../../node_modules/protractor/lib/protractor.js');

describe('my angular app', function () {
	var ptor;

	describe('visiting the login page', function () {
		ptor = protractor.getInstance();  //get instance of Selenium Webdriver / Protractor wrapper

		beforeEach(function () {
			ptor.get('/#!/');  // goes to root of the application  
		});


		describe('when a user logs in', function() {
			it('should redirect me to homepage and see articles on header', function() {


        			ptor.findElement(protractor.By.input('yourName')).sendKeys('TESTTESTTESTTEST');  //findElement 

				var message = ptor.findElement(protractor.By.binding('{{yourName}}')).getText().then(function(text) {
          		expect(text).toEqual('TESTTESTTESTTEST');

				// ptor.findElement(protractor.By.input('Email')).sendKeys('a');
				// ptor.findElement(protractor.By.input('Password')).sendKeys('a');

				// ptor.findElement(protractor.By.id('sign-in')).click();
			});
		});
	});
});
});


// ....
// ....
// ...

// ...