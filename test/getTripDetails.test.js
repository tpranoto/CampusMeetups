import { expect } from 'chai';
import chaiCfg from './getListOfTrips.test.js';

describe('Test available trip details result with some attendees', function () {
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

    it('the trip status are correct', function () {
        expect(response).to.have.status(200);
        expect(respBody).to.have.property('status').to.be.oneOf(["Ongoing", "Completed", "Cancelled"]);
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
        expect(respBody).to.have.property('organizerData').that.is.an('object').that.has.all.keys('fname','lname','image');
        expect(respBody.organizerData).to.have.property('fname').that.is.a('string');
        expect(respBody.organizerData).to.have.property('lname').that.is.a('string');
        expect(respBody.organizerData).to.have.property('image').that.is.a('string');
        expect(respBody).to.have.property('categoryId').that.is.a('string');
        expect(respBody).to.have.property('categoryData').that.is.an('object').that.has.all.keys('name');
        expect(respBody.categoryData).to.have.property('name').that.is.a('string');
		expect(respBody).to.have.property('attendees').that.is.an('array');
	});


    it('The attendees array should be more than 2', function () {
        expect(response).to.have.status(200);
        expect(respBody).to.have.property('attendees').to.have.length.above(2);
    });

    it('The elements in the attendees array have known properties', function(){
        expect(respBody.attendees).to.satisfy(
            function (data) {
                for (var i = 0; i < data.length; i++) {
                    expect(data[i]).to.have.property('studentId').that.is.a('string');
                    expect(data[i]).to.have.property('fname').that.is.a('string');
                    expect(data[i]).to.have.property('lname').that.is.a('string');
                    expect(data[i]).to.have.property('image').that.is.a('string');
                }
                return true;
            }
        )
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

    it('the trip status are correct', function () {
        expect(response).to.have.status(200);
        expect(respBody).to.have.property('status').to.be.oneOf(["Ongoing", "Completed", "Cancelled"]);
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
        expect(respBody).to.have.property('organizerData').that.is.an('object').that.has.all.keys('fname','lname','image');
        expect(respBody.organizerData).to.have.property('fname').that.is.a('string');
        expect(respBody.organizerData).to.have.property('lname').that.is.a('string');
        expect(respBody.organizerData).to.have.property('image').that.is.a('string');
        expect(respBody).to.have.property('categoryId').that.is.a('string');
        expect(respBody).to.have.property('categoryData').that.is.an('object').that.has.all.keys('name');
        expect(respBody.categoryData).to.have.property('name').that.is.a('string');
		expect(respBody).to.have.property('attendees').that.is.an('array').to.have.lengthOf(0);
	});

    it('The attendees array should be 0', function () {
        expect(response).to.have.status(200);
        expect(respBody).to.have.property('attendees').to.have.lengthOf(0);
    });
});
