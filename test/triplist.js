import { use, expect } from 'chai';
import chaiHttp from 'chai-http';
const chai = use(chaiHttp);

describe('Test List of Trips result with default query param', function () {
	var requestResult;
	var response;
		 
    before(function (done) {
        chai.request.execute("http://localhost:8080")
			.get("/app/trip")
			.end(function (err, res) {
				requestResult = res.body;
				response = res;
                expect(err).to.be.null;
                expect(res).to.have.status(200);
				done();
			});
        });

    it('Should return first page with index 0 and perPage 20 as a default',function(){
        expect(response).to.have.status(200);
        expect(requestResult).to.have.property("page").equals(0);
        expect(requestResult).to.have.property("perPage").equals(20);
    });
    
    it('Should return data with an array object of 20 objects for 1st page', function (){
		expect(response).to.have.status(200);
		expect(response.body.data).to.have.length(20);
		expect(response).to.have.headers;
    });
    
	it('The body of response has known properties', function(){
	    expect(requestResult).to.have.property('data').that.is.a('array');
	    expect(requestResult).to.have.property('page').that.is.a('number');
		expect(requestResult).to.have.property('perPage').that.is.a('number');
		expect(requestResult).to.have.property('nextPage').that.satisfies(value => typeof value === 'string' || value === null);;
        expect(requestResult).to.have.property('prevPage').that.satisfies(value => typeof value === 'string' || value === null);;
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
                    expect(data[i]).to.have.property('categoryId').that.is.a('string');
				}
				return true;
			});
	});	
	
});
