import { expect } from 'chai';
import chaiCfg from './getTrips.test.js';

describe('Test Trip Details result with some attendees', function () {
	var response;
	var respBody;
		 
    before(function (done) {
        chaiCfg.request.execute("http://localhost:8080")
			.get("/app/trip/2d5c7b9e4a1f0e3c6b8d2a1f4e5c9b3a")
			.end(function (err, res) {
				response = res;
				respBody = res.body;
                expect(err).to.be.null;
                expect(res).to.have.status(200);
				done();
			});
        });
    
	it('The body of response has known properties', function(){
	    expect(respBody).to.have.property('tripId').that.is.a('string');
        expect(respBody).to.have.property('name').that.is.a('string');
        expect(respBody).to.have.property('description').that.is.a('string');
        expect(respBody).to.have.property('status').that.is.a('string');
        expect(respBody).to.have.property('image').that.is.a('string');
        expect(respBody).to.have.property('location').that.is.a('string');
        expect(respBody).to.have.property('timestamp').that.is.a('string');
        expect(respBody).to.have.property('organizerId').that.is.a('string');
        expect(respBody).to.have.property('organizerData').that.is.an('object').that.has.all.keys('fname','lname');
        expect(respBody).to.have.property('categoryId').that.is.a('string');
        expect(respBody).to.have.property('categoryData').that.is.an('object').that.has.all.keys('name');
		expect(respBody).to.have.property('attendees').that.is.an('array').to.have.length.above(0);
	});
});

describe('Test Trip Details result with 0 attendees', function () {
	var response;
	var respBody;
		 
    before(function (done) {
        chaiCfg.request.execute("http://localhost:8080")
			.get("/app/trip/b5a6d3e8c1f4e2b7a0f5d9c3e1b7f2a")
			.end(function (err, res) {
				response = res;
				respBody = res.body;
                expect(err).to.be.null;
                expect(res).to.have.status(200);
				done();
			});
        });
    
	it('The body of response has known properties', function(){
	    expect(respBody).to.have.property('tripId').that.is.a('string');
        expect(respBody).to.have.property('name').that.is.a('string');
        expect(respBody).to.have.property('description').that.is.a('string');
        expect(respBody).to.have.property('status').that.is.a('string');
        expect(respBody).to.have.property('image').that.is.a('string');
        expect(respBody).to.have.property('location').that.is.a('string');
        expect(respBody).to.have.property('timestamp').that.is.a('string');
        expect(respBody).to.have.property('organizerId').that.is.a('string');
        expect(respBody).to.have.property('organizerData').that.is.an('object').that.has.all.keys('fname','lname');
        expect(respBody).to.have.property('categoryId').that.is.a('string');
        expect(respBody).to.have.property('categoryData').that.is.an('object').that.has.all.keys('name');
		expect(respBody).to.have.property('attendees').that.is.an('array').to.have.lengthOf(0);
	});
});
