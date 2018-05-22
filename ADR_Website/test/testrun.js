var expect  = require('chai').expect;
var request = require('request');

describe('Status and content', function() {
    describe ('Main page', function() {
        it('status', function(done){
            request('http://localhost:8080/', function(error, response, body) {
                expect(response.statusCode).to.equal(200);
                done();
            });
        });

        it('content', function(done) {
            request('http://localhost:8080/' , function(error, response, body) {
                expect(body).to.equal('Hello World 1');
                done();
            });
        });
    });

    describe ('About page', function() {
        it('status', function(done){
            request('http://localhost:8080/about', function(error, response, body) {
                expect(response.statusCode).to.equal(200);
                done();
            });
        });

    });
}); 

/* var expect  = require('chai').expect;
var request = require('request');

describe ('Page Check', function() {
it('Status', function(done) {
    request('http://localhost:3' , function(error, response, body) {
        console.log('Renu_');
        if (!error && response.statusCode == 200) {
            console.log('Renu');
            expect(response.statusCode).to.equal(200);
        
        }
        done();
        });
        
});
});
 *//*  describe ('Main page', function() {
     it('status', function(done){
         request.get('http://localho', function(error, response) {
            
            if (!error && response.statusCode == 200) {
                console.log(response.statusCode);
            expect(response.statusCode).to.equal(200);
            
            }
            
         });
         done();
     });
 });
 */
/* request = require("request");
should = require("should");

describe('Applications API', function() {
  it('Checks existence of test application', function(done) {
    request('http://localhost:3000', function(err, response, body) {
      response.statusCode.should.equal(200);
      body.should.include("I'm Feeling Lucky");
      
      done();
    })
  });
}); */