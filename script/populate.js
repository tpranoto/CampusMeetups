db = db.getSiblingDB('campusMeetups')
// Check if the collection exists
if (!db.getCollectionNames().includes('Trip')) {
    db.createCollection('Trip');
}
TripsCollection = db.getCollection("Trip")
TripsCollection.deleteMany({})
TripsCollection.insertMany([
    {
        "tripId": "T001",
        "name": "Trip1-a",
        "description": "A relaxing beach day.",
        "image": "C:\\Users\\chand\\Source\\Repos\\CampusMeetups\\pages\\images\\seattle.jpeg",
        "location": "Long Beach, California",
        "date": {
            "$date": "2024-10-15T10:00:00.000Z"
        },
        "organizerId": "S10001",
        "categoryId": "Beach"
    },
    {
        "tripId": "T002",
        "name": "Trip1-b",
        "description": "A day of hiking in the hills.",
        "image": "C:\\Users\\chand\\Source\\Repos\\CampusMeetups\\pages\\images\\seattle.jpeg",
        "location": "Mount Tamalpais, California",
        "date": {
            "$date": "2024-10-20T09:00:00.000Z"
        },
        "organizerId": "S10002",
        "categoryId": "Hike"
    },
    {
        "tripId": "T003",
        "name": "Trip1-c",
        "description": "Exploring the vibrant city life.",
        "image": "C:\\Users\\chand\\Source\\Repos\\CampusMeetups\\pages\\images\\seattle.jpeg",
        "location": "San Francisco, California",
        "date": {
            "$date": "2024-10-25T11:00:00.000Z"
        },
        "organizerId": "S10003",
        "categoryId": "City"
    },
    {
        "tripId": "T004",
        "name": "Trip1-d",
        "description": "Camping under the stars.",
        "image": "C:\\Users\\chand\\Source\\Repos\\CampusMeetups\\pages\\images\\seattle.jpeg",
        "location": "Yosemite National Park, California",
        "date": {
            "$date": "2024-10-30T17:00:00.000Z"
        },
        "organizerId": "S10004",
        "categoryId": "Camping"
    },
    {
        "tripId": "T005",
        "name": "Trip1-e",
        "description": "A scenic drive along the coast.",
        "image": "C:\\Users\\chand\\Source\\Repos\\CampusMeetups\\pages\\images\\seattle.jpeg",
        "location": "Big Sur, California",
        "date": {
            "$date": "2024-11-05T08:00:00.000Z"
        },
        "organizerId": "S10005",
        "categoryId": "Road Trip"
    },
    {
        "tripId": "T006",
        "name": "Trip1-f",
        "description": "Wine tasting in the valley.",
        "image": "C:\\Users\\chand\\Source\\Repos\\CampusMeetups\\pages\\images\\seattle.jpeg",
        "location": "Napa Valley, California",
        "date": {
            "$date": "2024-11-10T14:00:00.000Z"
        },
        "organizerId": "S10006",
        "categoryId": "Food & Drink"
    },
    {
        "tripId": "T007",
        "name": "Trip1-g",
        "description": "A historical tour of the city.",
        "image": "C:\\Users\\chand\\Source\\Repos\\CampusMeetups\\pages\\images\\seattle.jpeg",
        "location": "Washington, D.C.",
        "date": {
            "$date": "2024-11-15T09:30:00.000Z"
        },
        "organizerId": "S10007",
        "categoryId": "History"
    },
    {
        "tripId": "T008",
        "name": "Trip1-h",
        "description": "A thrilling adventure at the theme park.",
        "image": "C:\\Users\\chand\\Source\\Repos\\CampusMeetups\\pages\\images\\seattle.jpeg",
        "location": "Orlando, Florida",
        "date": {
            "$date": "2024-11-20T10:00:00.000Z"
        },
        "organizerId": "S10008",
        "categoryId": "Fun"
    },
    {
        "tripId": "T009",
        "name": "Trip1-i",
        "description": "A peaceful retreat in the mountains.",
        "image": "C:\\Users\\chand\\Source\\Repos\\CampusMeetups\\pages\\images\\seattle.jpeg",
        "location": "Aspen, Colorado",
        "date": {
            "$date": "2024-11-25T16:00:00.000Z"
        },
        "organizerId": "S10009",
        "categoryId": "Relaxation"
    },
    {
        "tripId": "T010",
        "name": "Trip1-j",
        "description": "An exhilarating ski trip.",
        "image": "C:\\Users\\chand\\Source\\Repos\\CampusMeetups\\pages\\images\\seattle.jpeg",
        "location": "Park City, Utah",
        "date": {
            "$date": "2024-12-01T09:00:00.000Z"
        },
        "organizerId": "S10010",
        "categoryId": "Skiing"
    },
    {
        "tripId": "T011",
        "name": "Trip1-k",
        "description": "Exploring the desert landscapes.",
        "image": "C:\\Users\\chand\\Source\\Repos\\CampusMeetups\\pages\\images\\seattle.jpeg",
        "location": "Joshua Tree National Park, California",
        "date": {
            "$date": "2024-12-05T12:00:00.000Z"
        },
        "organizerId": "S10011",
        "categoryId": "Adventure"
    },
    {
        "tripId": "T012",
        "name": "Trip1-l",
        "description": "A cultural festival experience.",
        "image": "C:\\Users\\chand\\Source\\Repos\\CampusMeetups\\pages\\images\\seattle.jpeg",
        "location": "New Orleans, Louisiana",
        "date": {
            "$date": "2024-12-10T11:00:00.000Z"
        },
        "organizerId": "S10012",
        "categoryId": "Culture"
    },
    {
        "tripId": "T013",
        "name": "Trip1-m",
        "description": "A guided tour of the national park.",
        "image": "C:\\Users\\chand\\Source\\Repos\\CampusMeetups\\pages\\images\\seattle.jpeg",
        "location": "Yellowstone National Park, Wyoming",
        "date": {
            "$date": "2024-12-15T09:00:00.000Z"
        },
        "organizerId": "S10013",
        "categoryId": "Nature"
    },
    {
        "tripId": "T014",
        "name": "Trip1-n",
        "description": "A day of fishing and relaxation.",
        "image": "C:\\Users\\chand\\Source\\Repos\\CampusMeetups\\pages\\images\\seattle.jpeg",
        "location": "Lake Tahoe, California",
        "date": {
            "$date": "2024-12-20T10:00:00.000Z"
        },
        "organizerId": "S10014",
        "categoryId": "Fishing"
    },
    {
        "tripId": "T015",
        "name": "Trip1-o",
        "description": "A bike tour through the countryside.",
        "image": "C:\\Users\\chand\\Source\\Repos\\CampusMeetups\\pages\\images\\seattle.jpeg",
        "location": "Sonoma County, California",
        "date": {
            "$date": "2024-12-25T11:30:00.000Z"
        },
        "organizerId": "S10015",
        "categoryId": "Cycling"
    },
    {
        "tripId": "T016",
        "name": "Trip1-p",
        "description": "A magical winter wonderland experience.",
        "image": "C:\\Users\\chand\\Source\\Repos\\CampusMeetups\\pages\\images\\seattle.jpeg",
        "location": "Lake Placid, New York",
        "date": {
            "$date": "2024-12-30T15:00:00.000Z"
        },
        "organizerId": "S10016",
        "categoryId": "Winter"
    },
    {
        "tripId": "T017",
        "name": "Trip1-q",
        "description": "A weekend at the spa.",
        "image": "C:\\Users\\chand\\Source\\Repos\\CampusMeetups\\pages\\images\\seattle.jpeg",
        "location": "Sedona, Arizona",
        "date": {
            "$date": "2025-01-05T13:00:00.000Z"
        },
        "organizerId": "S10017",
        "categoryId": "Wellness"
    },
    {
        "tripId": "T018",
        "name": "Trip1-r",
        "description": "A photography workshop in nature.",
        "image": "C:\\Users\\chand\\Source\\Repos\\CampusMeetups\\pages\\images\\seattle.jpeg",
        "location": "Banff National Park, Canada",
        "date": {
            "$date": "2025-01-10T10:00:00.000Z"
        },
        "organizerId": "S10018",
        "categoryId": "Photography"
    },
    {
        "tripId": "T019",
        "name": "Trip1-s",
        "description": "A wellness retreat in the mountains.",
        "image": "C:\\Users\\chand\\Source\\Repos\\CampusMeetups\\pages\\images\\seattle.jpeg",
        "location": "Boulder, Colorado",
        "date": {
            "$date": "2025-01-15T12:00:00.000Z"
        },
        "organizerId": "S10019",
        "categoryId": "Wellness"
    },
    {
        "tripId": "T020",
        "name": "Trip1-t",
        "description": "A surf and sun getaway.",
        "image": "C:\\Users\\chand\\Source\\Repos\\CampusMeetups\\pages\\images\\seattle.jpeg",
        "location": "Malibu, California",
        "date": {
            "$date": "2025-01-20T10:00:00.000Z"
        },
        "organizerId": "S10020",
        "categoryId": "Surfing"
    },
    {
        "tripId": "T021",
        "name": "Trip1-u",
        "description": "A historical landmark tour.",
        "image": "C:\\Users\\chand\\Source\\Repos\\CampusMeetups\\pages\\images\\seattle.jpeg",
        "location": "Philadelphia, Pennsylvania",
        "date": {
            "$date": "2025-01-25T14:00:00.000Z"
        },
        "organizerId": "S10021",
        "categoryId": "History"
    },
    {
        "tripId": "T022",
        "name": "Trip1-v",
        "description": "An art and culture exploration.",
        "image": "C:\\Users\\chand\\Source\\Repos\\CampusMeetups\\pages\\images\\seattle.jpeg",
        "location": "Santa Fe, New Mexico",
        "date": {
            "$date": "2025-01-30T11:00:00.000Z"
        },
        "organizerId": "S10022",
        "categoryId": "Culture"
    },
    {
        "tripId": "T023",
        "name": "Trip1-w",
        "description": "An exciting weekend music festival.",
        "image": "C:\\Users\\chand\\Source\\Repos\\CampusMeetups\\pages\\images\\seattle.jpeg",
        "location": "Austin, Texas",
        "date": {
            "$date": "2025-02-05T18:00:00.000Z"
        },
        "organizerId": "S10023",
        "categoryId": "Music"
    },
    {
        "tripId": "T024",
        "name": "Trip1-x",
        "description": "An exhilarating rock climbing experience.",
        "image": "C:\\Users\\chand\\Source\\Repos\\CampusMeetups\\pages\\images\\seattle.jpeg",
        "location": "Red Rocks, Colorado",
        "date": {
            "$date": "2025-02-10T09:00:00.000Z"
        },
        "organizerId": "S10024",
        "categoryId": "Adventure"
    },
    {
        "tripId": "T025",
        "name": "Trip1-y",
        "description": "A cozy cabin weekend retreat.",
        "image": "C:\\Users\\chand\\Source\\Repos\\CampusMeetups\\pages\\images\\seattle.jpeg",
        "location": "Lake Arrowhead, California",
        "date": {
            "$date": "2025-02-15T15:00:00.000Z"
        },
        "organizerId": "S10025",
        "categoryId": "Relaxation"
    }
])
if (!db.getCollectionNames().includes('Report')) {
    db.createCollection('Report');
}
const ReportsCollection = db.getCollection("Report");
ReportsCollection.deleteMany({});
ReportsCollection.insertMany([

    {
        "reportId": "R002",
        "reason": "Spam messages",
        "detail": "This user has been sending promotional links repeatedly.",
        "status": "On-Going",
        "reporterId": "S11122",
        "reportedId": "S19234"
    },
    {
        "reportId": "R003",
        "reason": "Fraud user",
        "detail": "User has been impersonating a legitimate business.",
        "status": "Resolved",
        "reporterId": "S13579",
        "reportedId": "S19567"
    },
    {
        "reportId": "R004",
        "reason": "Harassment",
        "detail": "Reported for repeated abusive language in comments.",
        "status": "On-Going",
        "reporterId": "S11223",
        "reportedId": "S19456"
    },
    {
        "reportId": "R005",
        "reason": "Account takeover attempt",
        "detail": "Suspicious activity suggesting account was hacked.",
        "status": "Resolved",
        "reporterId": "S14567",
        "reportedId": "S19321"
    },
    {
        "reportId": "R006",
        "reason": "Scam attempts",
        "detail": "User sent phishing links to multiple users.",
        "status": "On-Going",
        "reporterId": "S12678",
        "reportedId": "S19289"
    }
])
if (!db.getCollectionNames().includes('Student')) {
    db.createCollection('Student');
}
const StudentsCollection = db.getCollection("Student");
StudentsCollection.deleteMany({});
StudentsCollection.insertMany([
    {
        "studentId": "S12346",
        "fname": "Liam",
        "lname": "Smith",
        "email": "liamsmith@seattleu.edu",
        "phoneNumber": "234-567-8901",
        "verified": "true",
        "status": "active"
    },
    {
        "studentId": "S12347",
        "fname": "Olivia",
        "lname": "Johnson",
        "email": "oliviajohnson@seattleu.edu",
        "phoneNumber": "345-678-9012",
        "verified": "true",
        "status": "active"
    },
    {
        "studentId": "S12348",
        "fname": "Noah",
        "lname": "Brown",
        "email": "noahbrown@seattleu.edu",
        "phoneNumber": "456-789-0123",
        "verified": "false",
        "status": "inactive"
    },
    {
        "studentId": "S12349",
        "fname": "Emma",
        "lname": "Davis",
        "email": "emmadavis@seattleu.edu",
        "phoneNumber": "567-890-1234",
        "verified": "true",
        "status": "active"
    },
    {
        "studentId": "S12350",
        "fname": "Ava",
        "lname": "Garcia",
        "email": "avagarcia@seattleu.edu",
        "phoneNumber": "678-901-2345",
        "verified": "true",
        "status": "active"
    },
    {
        "studentId": "S12351",
        "fname": "James",
        "lname": "Martinez",
        "email": "jamesmartinez@seattleu.edu",
        "phoneNumber": "789-012-3456",
        "verified": "false",
        "status": "inactive"
    },
    {
        "studentId": "S12352",
        "fname": "Sophia",
        "lname": "Hernandez",
        "email": "sophiahernandez@seattleu.edu",
        "phoneNumber": "890-123-4567",
        "verified": "true",
        "status": "active"
    },
    {
        "studentId": "S12353",
        "fname": "Jackson",
        "lname": "Lopez",
        "email": "jacksonlopez@seattleu.edu",
        "phoneNumber": "901-234-5678",
        "verified": "true",
        "status": "active"
    },
    {
        "studentId": "S12354",
        "fname": "Isabella",
        "lname": "Wilson",
        "email": "isabellawilson@seattleu.edu",
        "phoneNumber": "012-345-6789",
        "verified": "false",
        "status": "inactive"
    },
    {
        "studentId": "S12355",
        "fname": "Lucas",
        "lname": "Anderson",
        "email": "lucasanderson@seattleu.edu",
        "phoneNumber": "123-456-7891",
        "verified": "true",
        "status": "active"
    }
])

