import { expect } from 'chai';
import chaiCfg from './chaiCfg.js';


describe('Test create new trip result with all fields', function () {	
	var response;
	var respBody;
	const tripData = {
		name: 'Mocha Trip Test',
		description: 'A fun and adventureous mocha test description.',
		status: 'Ongoing',
		image: 'https://images.unsplash.com/photo-1732468085904-03c57452bc76?q=80&w=2787&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
		location: 'Santa Monica, California',
		timestamp: '2024-12-31T10:00:00Z',
		organizerId: '5c2e8d1b4f0e3a6d9b7a5f4c3e2b1a7d',
		categoryId: 'c8a7e3f6b2d4e9c6f3b1e2a5f6c9b4d1'
	};
		 
    before(function (done) {
        chaiCfg.request.execute("https://campusmeetups.azurewebsites.net")
			.post("/app/test/trip")
			.send(tripData)
			.end(function (err, res) {
				response = res;
				respBody = res.body;
                expect(err).to.be.null;
                expect(res).to.have.status(200);
				done();
			});
        });

	it('Response should return 200 status and contain a generated tripId', function () {
		expect(response).to.have.status(200);
		expect(respBody).to.have.property('tripId').that.is.not.empty;
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
		expect(respBody).to.have.property('categoryId').that.is.a('string');
	});

	it('The body of response has correct values', function(){
		expect(respBody).to.have.property('name').that.equals("Mocha Trip Test");
		expect(respBody).to.have.property('description').that.equals("A fun and adventureous mocha test description.");
		expect(respBody).to.have.property('status').that.equals("Ongoing");
		expect(respBody).to.have.property('image').that.equals("https://images.unsplash.com/photo-1732468085904-03c57452bc76?q=80&w=2787&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D");
		expect(respBody).to.have.property('location').that.equals("Santa Monica, California");
		expect(respBody).to.have.property('timestamp').that.equals("2024-12-31T10:00:00.000Z");
		expect(respBody).to.have.property('organizerId').that.equals("5c2e8d1b4f0e3a6d9b7a5f4c3e2b1a7d");
		expect(respBody).to.have.property('categoryId').that.equals("c8a7e3f6b2d4e9c6f3b1e2a5f6c9b4d1");
	});
});
