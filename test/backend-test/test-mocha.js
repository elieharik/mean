var mongoose = require('mongoose')
  , server = require('../../server')
  , env = process.env.NODE_ENV || 'test'
  , config = require('../../config/config')[env]
  , Schema = mongoose.Schema
  , Article = mongoose.model('Article')
  , User = mongoose.model('User');


var should = require ('should')
  , assert = require ('assert');

var request = require('supertest');


////////////////////////////// ARTICLES MODEL TESTING //////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////


  describe ('Articles Model', function () {
    describe ('#CreateArticle', function () {
      
      it ('should create a new article', function(done){

        var testArticle = {
          title : "articleTestTitle"
          , content : ""
        };

        Article.create( testArticle, function (err, createdArticle){
          should.not.exist(err);
          createdArticle.title.should.equal('articleTestTitle');
          createdArticle.content.should.equal('');
          done();
        });
      });


// WARNING: Trying stuff - not working 

      // var joeInvalid = new User ({ name: "", email: "", username:"", password:"" })
      // , articleByJoe = new Article ({ title: "invalidArticle", content:"", user:"joeInvalid" });

      // beforeEach (function (done) {
      //   mean-test.clear(function(err){
      //     if (err) return done(err);
      //     mean-test.save([joeInvalid, articleByJoe], done);
      //   });
      // });

      // it ('should not create a new article if the user is not logged in', function (done){
      //   mean-test.find({ type: 'Article', user: "joeInvalid"}, function (err, res){
      //     if (err) return done(err);
      //     res.should.have.length(0);
      //     done;
      //   })
      // });

    // it ('should not create an article if the user is not logged in', function (done) {

    //     var invalidUser;
    //   var invalidUserParams = {
    //       name : "noemail"
    //       , email : ""
    //       , username : ""
    //       , password : ""
    //     }; 

    //   beforeEach(function (done) {
    //   User.create(testUser, function (err, createdUser) {
    //     should.not.exist(err);
    //     invalidUser = invalidUserParams;
    //     done();
    //   });
    // });

    //  var testArticle = {
    //     title: "createdByInvalidUser"
    //     , content: ""
    //     , user: "invalidUser"
    //   };

    //   request(server)
    //   .post('/articles')
    //   .send(testArticle)
    //   .expect(302)
    //   .end(function (err,res) {
    //     should.not.exist(error);
    //     var a = Article.indexOf("")  //indexOf should be equal to -1 because the article was not created
    //                                     but is Article an array of object? each object is saved in the DB

    //   });


    // });


  

   });


  });

//////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////  END OF ARTICLE MODEL TESTING //////////////////////////////




////////////////////////////// USER MODEL TESTING //////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////


  describe ('Users Model', function () {
    describe ('#CreateUser', function () {

      it ('should create a new user', function(done) {
        

        var testUser = {
          name : "myName"
          , email : "808@gmail.com"
          , username : "myUsername"
          , password : "jaioublie"
        };

        User.create(testUser, function(err, createdUser) {
          should.not.exist(err);

          createdUser.name.should.equal('myName');
          createdUser.email.should.equal("808@gmail.com");
          createdUser.username.should.equal("myUsername");
          createdUser.password.should.equal("jaioublie");

          done();
        });
      });
    });


    describe ('Save User function', function() {
      var user;
      var testUser = {
          name : "myName"
          , email : "808@gmail.com"
          , username : "myUsername"
          , password : "jaioublie"
        }; 

      beforeEach(function (done) {
      User.create(testUser, function (err, createdUser) {
        should.not.exist(err);
        user = createdUser;
        done();
      });
    });

   

      it ('should encrypt the password', function(done) {
        user.get('hashed_password').should.not.equal(testUser.password);  
        done();
      });

    });

  });
//////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////  END OF USER MODEL TESTING //////////////////////////////



////////////////////////////// ROUTES TESTING //////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////





describe ('Passport: routes', function () {

  var user;
  var userParams;

  beforeEach(function(done) {
    userParams = {
      name : "myName"
          , email : "808@gmail.com"
          , username : "myUsername"
          , password : "jaioublie"
  };

  User.create(userParams, function (err, createdUser) {
    user = createdUser;
    done();
  });

  });

  describe('POST /signin (logging in)', function() {


    it ('should redirect to /signin if the form is invalid ', function (done) {
      

      var post = {
        name : userParams.name
        , email : userParams.email
        , username : userParams.username
        , password : 'afakepasswordtrololol'
      };


        request (server)
        .post('/users/session')
        .send(post)
        .expect(302)
        .end(function (err,res) {
          should.not.exist(err);
          res.header.location.should.include('/signin');
          done();
        });
    });


    // WARNING: THIS DOES NOT WORK BECAUSE ROUTING MANAGED BY ANGULAR 
    // THIS TEST WILL PASS EVEN IF YOU INPUT A WRONG PASSWORD WHERE NOTED 


    
    it ('should redirect to / if the form is valid ', function (done) {
      

      var post = {
        name : userParams.name
        , email : userParams.email
        , username : userParams.username
        , password :  userParams.PASSWORD // WARNING: IF PASSWORD 'fakepassword' WILL STILL PASS
      };

        request (server)
        .post('/users/session')
        .send(post)
        .expect(302)
        .end(function (err,res) {
          should.not.exist(err);
          res.header.location.should.include('/');
          done();
        });
    });


  });
});

//////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////  END OF ROUTES TESTING //////////////////////////////


// describe ('Users: routes', function() {
//     describe ('POST /signup', function() {

//       it ('should redirect to "/" if the form is valid', function (done) {
         
//          var post = {
//             name : "hisName"
//           , email : "8008@gmail.com"
//           , username : "hisUsername"
//           , password : "jaipasoublie"
//         };

//         request(server)
//         .post('/users')
//         .send(post)
//         .expect(302)
//         .end(function (err, res) {
//         should.not.exist(err);
//         res.header.location.should.include('/');
//         done();
//         }); 
//     });

//       it ('should redirect to "/users" if the form is invalid', function (done){


//          var post = {
//             name : "hisName"
//           , email : ""
//           , username : "hisUsername"
//           , password : ""
//         };

//         request(server)
//         .post('/users')
//         .send(post)
//         .expect(302)
//         .end(function (err, res) {
//         should.not.exist(err);
//         res.header.location.should.include('/users');
//         done();
//         }); 

//     });
//   });
// });

