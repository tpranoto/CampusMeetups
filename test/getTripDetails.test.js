import { expect } from 'chai';
import chaiCfg from './chaiCfg.js';

describe('Test available trip details result with some attendees', function () {
	var response;
	var respBody;
		 
    before(function (done) {
        chaiCfg.request.execute("https://campusmeetups.azurewebsites.net")
			.get("/app/test/trip/d3b0c8f2e69a4b8eac84f7f7a6e1b4b2")
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
        expect(respBody).to.have.property('organizerData').that.is.an('object').that.has.all.keys('fname','lname','image');
        expect(respBody.organizerData).to.have.property('fname').that.is.a('string');
        expect(respBody.organizerData).to.have.property('lname').that.is.a('string');
        expect(respBody.organizerData).to.have.property('image').that.is.a('string');
        expect(respBody).to.have.property('categoryId').that.is.a('string');
        expect(respBody).to.have.property('categoryData').that.is.an('object').that.has.all.keys('name');
        expect(respBody.categoryData).to.have.property('name').that.is.a('string');
		expect(respBody).to.have.property('attendees').that.is.an('array');
	});


    it('The attendees array should be more than 0', function () {
        expect(response).to.have.status(200);
        expect(respBody).to.have.property('attendees').to.have.length.above(0);
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

    var attendeeList = [
        {
            "studentId": "2b8f3c2a1d6e9c4f3b5a0e8c1d7b3a9e",
            "fname": "Liam",
            "lname": "Smith",
            "image": "https://img.freepik.com/free-vector/smiling-young-man-illustration_1308-174669.jpg?t=st=1731994506~exp=1731998106~hmac=69711054c08fac7405157edce987fd879c8269acdef5523b7507189d1ebbd650&w=1060"
        }
    ];

    it('the data of the trip is correct', function () {
        expect(respBody).to.have.property('tripId').that.equals("d3b0c8f2e69a4b8eac84f7f7a6e1b4b2");
        expect(respBody).to.have.property('name').that.equals("Mountain Mornings");
        expect(respBody).to.have.property('description').that.equals("Discover the rugged beauty of the desert landscapes with a visit to Joshua Tree National Park in California. This unique park, known for its otherworldly rock formations and iconic Joshua trees, offers a peaceful retreat into nature. Hike along scenic trails that wind through rocky outcrops, or simply sit and admire the spectacular desert sunset. Whether you're a nature photographer looking to capture the stunning scenery, a rock climber, or someone who just enjoys the beauty of the desert, Joshua Tree provides a perfect escape to connect with the natural world.");
        expect(respBody).to.have.property('status').that.equals("Ongoing");
        expect(respBody).to.have.property('image').that.equals("https://cdn.stocksnap.io/img-thumbs/960w/mountains-peaks_MFDY4VHVS4.jpg");
        expect(respBody).to.have.property('location').that.equals("Joshua Tree National Park, California");
        expect(respBody).to.have.property('timestamp').that.equals("2024-12-13T04:59:15.742Z");
        expect(respBody).to.have.property('organizerId').that.equals("5c2e8d1b4f0e3a6d9b7a5f4c3e2b1a7d");
        expect(respBody).to.have.property('categoryId').that.equals("c8a7e3f6b2d4e9c6f3b1e2a5f6c9b4d1");
        expect(respBody.organizerData).to.have.property('fname').that.equals("James");
        expect(respBody.organizerData).to.have.property('lname').that.equals("Martinez");
        expect(respBody.organizerData).to.have.property('image').that.equals("https://img.freepik.com/free-vector/cute-fox-wearing-glasses-cartoon-vector-icon-illustration-animal-nature-icon-concept-isolated-flat_138676-8568.jpg?t=st=1732008671~exp=1732012271~hmac=53e4c38dcba42936314fbef3a0d5b208688e90e54e51dfa708b42353e2f359be&w=1060");
        expect(respBody.categoryData).to.have.property('name').that.equals("Art");
        expect(respBody.attendees).to.satisfy(
            function (data) {
                for (var i = 0; i < data.length; i++) {
                    expect(data[i]).to.have.property('studentId').that.equals(attendeeList[i].studentId);
                    expect(data[i]).to.have.property('fname').that.equals(attendeeList[i].fname);
                    expect(data[i]).to.have.property('lname').that.equals(attendeeList[i].lname);
                    expect(data[i]).to.have.property('image').that.equals(attendeeList[i].image);
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
        chaiCfg.request.execute("https://campusmeetups.azurewebsites.net")
			.get("/app/test/trip/b5a6d3e8c1f4e2b7a0f5d9c3e1b7f2a")
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

    it('the data of the trip is correct', function () {
        expect(respBody).to.have.property('tripId').that.equals("b5a6d3e8c1f4e2b7a0f5d9c3e1b7f2a");
        expect(respBody).to.have.property('name').that.equals("Hidden Gems Tour");
        expect(respBody).to.have.property('description').that.equals("Escape to the serene beauty of Lake Arrowhead, California, where you'll enjoy a cozy cabin weekend retreat surrounded by towering pines and the tranquil sounds of nature. This trip offers the perfect opportunity to unwind and connect with friends or family while staying in a beautiful lakeside cabin. Whether you're enjoying a peaceful morning walk around the lake, fishing, or simply soaking in the view from your cabin porch, this retreat promises relaxation and rejuvenation. It's a perfect getaway for anyone seeking a peaceful, nature-filled escape from the hustle and bustle of everyday life.");
        expect(respBody).to.have.property('status').that.equals("Ongoing");
        expect(respBody).to.have.property('image').that.equals("https://cdn.stocksnap.io/img-thumbs/960w/guy-man_9RZJVHG39A.jpg");
        expect(respBody).to.have.property('location').that.equals("Lake Arrowhead, California");
        expect(respBody).to.have.property('timestamp').that.equals("2024-12-06T04:59:15.742Z");
        expect(respBody).to.have.property('organizerId').that.equals("4b8c3f1e6d0a5b2c9e7d4f0e1c8b3d7a");
        expect(respBody).to.have.property('categoryId').that.equals("a3f9b8c5e90b5d6f8e4a0f8f4e2c5f8a");
        expect(respBody.organizerData).to.have.property('fname').that.equals("Emma");
        expect(respBody.organizerData).to.have.property('lname').that.equals("Davis");
        expect(respBody.organizerData).to.have.property('image').that.equals("https://img.freepik.com/free-vector/cute-koala-eating-ramen-noodle-cartoon-vector-icon-illustration-animal-food-icon-concept-isolated_138676-9816.jpg?t=st=1732008650~exp=1732012250~hmac=ed62c0414377cba85397ce203c304856f3d56ee5a0a8e409c2c232d757900feb&w=1060");
        expect(respBody.categoryData).to.have.property('name').that.equals("Nature");
    });
});
