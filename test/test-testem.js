
// just type "testem" in command line to run BOTH  angular and mocha backend unit tests 


var should = chai.should();

describe ('test', function() {
	it ('should return 2', function (done) {
		var a = 2+2;
		console.log(a); //can console.log with testem - useful for debugging
		a.should.be.equal(4);
		done(); 
	});
});



// if using assert library (like backend tests)



// var assert = chai.assert;

// describe ('test', function() {
// 	it ('should return 2', function (done) {
// 		var a = 2+2;
// 		console.log(a); //can console.log with testem - useful for debugging
// 		assert.equal(a,4);
// 		done(); 
// 	});
// });


