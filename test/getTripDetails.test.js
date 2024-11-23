import { expect } from 'chai';
import chaiCfg from './chaiCfg.js';

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

    var attendeeList = [
        {
            "studentId": "e3a7d1f9c2b5e6d4f8a1b3c0e7c2d9e5",
            "fname": "Noah",
            "lname": "Brown",
            "image": "https://img.freepik.com/free-vector/hand-drawn-pickle-cartoon-illustration_52683-130462.jpg?t=st=1732008534~exp=1732012134~hmac=653573515e8d22d006b78daeebd007a301ed31455097d4bbd0a50a4f55187847&w=1060"
        },
        {
            "studentId": "4b8c3f1e6d0a5b2c9e7d4f0e1c8b3d7a",
            "fname": "Emma",
            "lname": "Davis",
            "image": "https://img.freepik.com/free-vector/cute-koala-eating-ramen-noodle-cartoon-vector-icon-illustration-animal-food-icon-concept-isolated_138676-9816.jpg?t=st=1732008650~exp=1732012250~hmac=ed62c0414377cba85397ce203c304856f3d56ee5a0a8e409c2c232d757900feb&w=1060"
        },
        {
            "studentId": "e6b4c2f8d1e3a5b9f0c7d1a4e6c8b2d7",
            "fname": "Lucas",
            "lname": "Anderson",
            "image": ""
        },
        {
            "studentId": "b4d9e5c1f7a2b3e8c0a6d4f2e1c5b7a8",
            "fname": "Isabella",
            "lname": "Wilson",
            "image": "https://img.freepik.com/free-vector/cute-chicken-fever-cartoon-vector-icon-illustration-animal-medical-icon-isolated-flat-vector_138676-11504.jpg?t=st=1732008713~exp=1732012313~hmac=1b19ac0548368f6437b36ce2d8cd99f1f1d4305bedd32e9b72aa26a83d6d4cf9&w=1060"
        },
        {
            "studentId": "c1e4f7b8d0c9a5e1b2f6a8e3d4c5b0f7",
            "fname": "Olivia",
            "lname": "Johnson",
            "image": ""
        }
    ];

    it('the data of the trip is correct', function () {
        expect(respBody).to.have.property('tripId').that.equals("2d5c7b9e4a1f0e3c6b8d2a1f4e5c9b3a");
        expect(respBody).to.have.property('name').that.equals("Wonderful Adventures");
        expect(respBody).to.have.property('description').that.equals("Enjoy a relaxing day at Long Beach, California, where you can soak up the sun, feel the ocean breeze, and unwind by the calming waves. This serene beach experience invites you to relax on the soft sand, take leisurely walks along the shoreline, and enjoy the peaceful atmosphere of this coastal paradise. Whether you want to read a book under a beach umbrella or simply enjoy the natural beauty, this beach day is perfect for those seeking tranquility and a chance to escape the everyday hustle.");
        expect(respBody).to.have.property('status').that.equals("Ongoing");
        expect(respBody).to.have.property('image').that.equals("https://cdn.stocksnap.io/img-thumbs/960w/mountain-nature_GKXSAHXHOS.jpg");
        expect(respBody).to.have.property('location').that.equals("Long Beach, California");
        expect(respBody).to.have.property('timestamp').that.equals("2024-11-20T09:47:40.371Z");
        expect(respBody).to.have.property('organizerId').that.equals("2b8f3c2a1d6e9c4f3b5a0e8c1d7b3a9e");
        expect(respBody).to.have.property('categoryId').that.equals("9d4c2f3a4e1e2f3d0a4c5b6e8e0b1d7c");
        expect(respBody.organizerData).to.have.property('fname').that.equals("Liam");
        expect(respBody.organizerData).to.have.property('lname').that.equals("Smith");
        expect(respBody.organizerData).to.have.property('image').that.equals("https://img.freepik.com/free-vector/smiling-young-man-illustration_1308-174669.jpg?t=st=1731994506~exp=1731998106~hmac=69711054c08fac7405157edce987fd879c8269acdef5523b7507189d1ebbd650&w=1060");
        expect(respBody.categoryData).to.have.property('name').that.equals("Museum");
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
        expect(respBody).to.have.property('timestamp').that.equals("2024-11-22T09:47:40.374Z");
        expect(respBody).to.have.property('organizerId').that.equals("4b8c3f1e6d0a5b2c9e7d4f0e1c8b3d7a");
        expect(respBody).to.have.property('categoryId').that.equals("c8a7e3f6b2d4e9c6f3b1e2a5f6c9b4d1");
        expect(respBody.organizerData).to.have.property('fname').that.equals("Emma");
        expect(respBody.organizerData).to.have.property('lname').that.equals("Davis");
        expect(respBody.organizerData).to.have.property('image').that.equals("https://img.freepik.com/free-vector/cute-koala-eating-ramen-noodle-cartoon-vector-icon-illustration-animal-food-icon-concept-isolated_138676-9816.jpg?t=st=1732008650~exp=1732012250~hmac=ed62c0414377cba85397ce203c304856f3d56ee5a0a8e409c2c232d757900feb&w=1060");
        expect(respBody.categoryData).to.have.property('name').that.equals("Art");
    });
});
