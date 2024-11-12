import { use, expect } from 'chai';
import chaiHttp from 'chai-http';
const chai = use(chaiHttp);

describe('Test Trip Details result with some attendees', function () {
	var response;
	var respBody;
		 
    beforeEach(function (done) {
        chai.request.execute("http://localhost:8080")
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
		 
    beforeEach(function (done) {
        chai.request.execute("http://localhost:8080")
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

describe('Test List of Trips result with default query param', function () {	
	var response;
	var respBody;
		 
    beforeEach(function (done) {
        chai.request.execute("http://localhost:8080")
			.get("/app/trip")
			.end(function (err, res) {
				response = res;
				respBody = res.body;
                expect(err).to.be.null;
                expect(res).to.have.status(200);
				done();
			});
        });

    it('Should return first page with page index 0 and perPage 20 as a default',function(){
        expect(response).to.have.status(200);
        expect(respBody).to.have.property("page").equals(0);
        expect(respBody).to.have.property("perPage").equals(20);
    });
    
    it('Should return data with an array object of 20 objects for 1st page', function (){
		expect(response).to.have.status(200);
		expect(response.body.data).to.have.length(20);
		expect(response).to.have.headers;
    });
    
	it('The body of response has known properties', function(){
	    expect(respBody).to.have.property('data').that.is.a('array');
	    expect(respBody).to.have.property('page').that.is.a('number');
		expect(respBody).to.have.property('perPage').that.is.a('number');
		expect(respBody).to.have.property('nextPage').that.is.a('string');
        expect(respBody).to.have.property('prevPage').that.is.a('null');
	});

	it('The elements in the data array have the expected properties', function(){
		expect(response.body.data).to.satisfy(
			function (data) {
				for (var i = 0; i < data.length; i++) {
					expect(data[i]).to.have.property('tripId').that.is.a('string');
					expect(data[i]).to.have.property('name').that.is.a('string');
					expect(data[i]).to.have.property('description').that.is.a('string');
					expect(data[i]).to.have.property('status').that.is.a('string');
					expect(data[i]).to.have.property('image').that.is.a('string');
                    expect(data[i]).to.have.property('location').that.is.a('string');
                    expect(data[i]).to.have.property('timestamp').that.is.a('string');
                    expect(data[i]).to.have.property('organizerId').that.is.a('string');
					expect(data[i]).to.not.have.property('organizerData');
                    expect(data[i]).to.have.property('categoryId').that.is.a('string');
					expect(data[i]).to.not.have.property('categoryData');
				}
				return true;
			});
	});	
	
});

describe('Test List of Trips result with page=2 perPage=12', function () {
	var response;
	var respBody;
		 
    beforeEach(function (done) {
        chai.request.execute("http://localhost:8080")
			.get("/app/trip?page=2&perPage=12")
			.end(function (err, res) {
				response = res;
				respBody = res.body;
                expect(err).to.be.null;
                expect(res).to.have.status(200);
				done();
			});
        });

    it('Should return third page with page index 2 and perPage 12',function(){
        expect(response).to.have.status(200);
        expect(respBody).to.have.property("page").equals(2);
        expect(respBody).to.have.property("perPage").equals(12);
    });

	it('Should return data with an array object of 1 object', function (){
		expect(response).to.have.status(200);
		expect(response.body.data).to.have.length(1);
		expect(response).to.have.headers;
    });

	it('The body of response has known properties', function(){
	    expect(respBody).to.have.property('data').that.is.a('array');
	    expect(respBody).to.have.property('page').that.is.a('number');
		expect(respBody).to.have.property('perPage').that.is.a('number');
		expect(respBody).to.have.property('nextPage').that.is.a('null');
        expect(respBody).to.have.property('prevPage').that.is.a('string');
	});

	it('The elements in the data array have the expected properties', function(){
		expect(response.body.data).to.satisfy(
			function (data) {
				for (var i = 0; i < data.length; i++) {
					expect(data[i]).to.have.property('tripId').that.is.a('string');
					expect(data[i]).to.have.property('name').that.is.a('string');
					expect(data[i]).to.have.property('description').that.is.a('string');
					expect(data[i]).to.have.property('status').that.is.a('string');
					expect(data[i]).to.have.property('image').that.is.a('string');
                    expect(data[i]).to.have.property('location').that.is.a('string');
                    expect(data[i]).to.have.property('timestamp').that.is.a('string');
                    expect(data[i]).to.have.property('organizerId').that.is.a('string');
					expect(data[i]).to.not.have.property('organizerData');
                    expect(data[i]).to.have.property('categoryId').that.is.a('string');
					expect(data[i]).to.not.have.property('categoryData');
				}
				return true;
			});
	});
});


describe('Test List of expanded Trips result with default pagination', function () {
	var response;
	var respBody;
		 
    beforeEach(function (done) {
        chai.request.execute("http://localhost:8080")
			.get("/app/trip?expand=true")
			.end(function (err, res) {
				response = res;
				respBody = res.body;
                expect(err).to.be.null;
                expect(res).to.have.status(200);
				done();
			});
        });

	it('Should return first page with page index 0 and perPage 20 as a default',function(){
		expect(response).to.have.status(200);
		expect(respBody).to.have.property("page").equals(0);
		expect(respBody).to.have.property("perPage").equals(20);
	});
	
	it('Should return data with an array object of 20 objects for 1st page', function (){
		expect(response).to.have.status(200);
		expect(response.body.data).to.have.length(20);
		expect(response).to.have.headers;
	});

	it('The body of response has known properties', function(){
	    expect(respBody).to.have.property('data').that.is.a('array');
	    expect(respBody).to.have.property('page').that.is.a('number');
		expect(respBody).to.have.property('perPage').that.is.a('number');
		expect(respBody).to.have.property('nextPage').that.is.a('string');
        expect(respBody).to.have.property('prevPage').that.is.a('null');
	});

	it('The elements in the data array have the expected properties', function(){
		expect(response.body.data).to.satisfy(
			function (data) {
				for (var i = 0; i < data.length; i++) {
					expect(data[i]).to.have.property('tripId').that.is.a('string');
					expect(data[i]).to.have.property('name').that.is.a('string');
					expect(data[i]).to.have.property('description').that.is.a('string');
					expect(data[i]).to.have.property('status').that.is.a('string');
					expect(data[i]).to.have.property('image').that.is.a('string');
                    expect(data[i]).to.have.property('location').that.is.a('string');
                    expect(data[i]).to.have.property('timestamp').that.is.a('string');
                    expect(data[i]).to.have.property('organizerId').that.is.a('string');
					expect(data[i]).to.have.property('organizerData').that.is.an('object').that.has.all.keys('fname','lname');
                    expect(data[i]).to.have.property('categoryId').that.is.a('string');
					expect(data[i]).to.have.property('categoryData').that.is.an('object').that.has.all.keys('name');
				}
				return true;
			});
	});
});
