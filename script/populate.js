db = db.getSiblingDB("campusMeetups")

// helper function to get random element from array
function getRandomElement(array) {
    if (array.length === 0) return undefined; // Handle empty array
    const randomIndex = Math.floor(Math.random() * array.length);
    return array[randomIndex];
}

if (!db.getCollectionNames().includes("Category")) {
    db.createCollection("Category");
}
const CategoriesCollection = db.getCollection("Category");
CategoriesCollection.deleteMany({});
CategoriesCollection.insertMany([
    {
        "categoryId":"a3f9b8c5e90b5d6f8e4a0f8f4e2c5f8a",
        "name": "Nature"
    },
    {
        "categoryId":"9d4c2f3a4e1e2f3d0a4c5b6e8e0b1d7c",
        "name": "Museum"
    },
    {
        "categoryId":"c8a7e3f6b2d4e9c6f3b1e2a5f6c9b4d1",
        "name": "Art"
    },
    {
        "categoryId":"4e7f8b2d9c4e2f1b8a6f7c0d3b5c2a9e",
        "name": "Food"
    },
    {
        "categoryId":"1e3b5d7c8a4f2e6f8b2c9a3d7e1b4f0d",
        "name": "Health"
    },
]);

if (!db.getCollectionNames().includes("Student")) {
    db.createCollection("Student");
}
const StudentsCollection = db.getCollection("Student");
StudentsCollection.deleteMany({});
StudentsCollection.insertMany([
    {
        "studentId": "2b8f3c2a1d6e9c4f3b5a0e8c1d7b3a9e",
        "fname": "Liam",
        "lname": "Smith",
        "email": "liamsmith@seattleu.edu",
        "phoneNumber": "234-567-8901",
        "verified": "true",
        "status": "Active"
    },
    {
        "studentId": "c1e4f7b8d0c9a5e1b2f6a8e3d4c5b0f7",
        "fname": "Olivia",
        "lname": "Johnson",
        "email": "oliviajohnson@seattleu.edu",
        "phoneNumber": "345-678-9012",
        "verified": "true",
        "status": "Active"
    },
    {
        "studentId": "e3a7d1f9c2b5e6d4f8a1b3c0e7c2d9e5",
        "fname": "Noah",
        "lname": "Brown",
        "email": "noahbrown@seattleu.edu",
        "phoneNumber": "456-789-0123",
        "verified": "false",
        "status": "Inactive"
    },
    {
        "studentId": "4b8c3f1e6d0a5b2c9e7d4f0e1c8b3d7a",
        "fname": "Emma",
        "lname": "Davis",
        "email": "emmadavis@seattleu.edu",
        "phoneNumber": "567-890-1234",
        "verified": "true",
        "status": "Active"
    },
    {
        "studentId": "9e1a4c5b2d8f3a7e6c0b1d9f8e4a2c3b",
        "fname": "Ava",
        "lname": "Garcia",
        "email": "avagarcia@seattleu.edu",
        "phoneNumber": "678-901-2345",
        "verified": "true",
        "status": "Active"
    },
    {
        "studentId": "5c2e8d1b4f0e3a6d9b7a5f4c3e2b1a7d",
        "fname": "James",
        "lname": "Martinez",
        "email": "jamesmartinez@seattleu.edu",
        "phoneNumber": "789-012-3456",
        "verified": "false",
        "status": "Inactive"
    },
    {
        "studentId": "f0a3e9b5c2d1a8f6e4b7d0c2a3e9f1b4",
        "fname": "Sophia",
        "lname": "Hernandez",
        "email": "sophiahernandez@seattleu.edu",
        "phoneNumber": "890-123-4567",
        "verified": "true",
        "status": "Active"
    },
    {
        "studentId": "3f7c1a2e4b5d6e9f8a0b3d1c5e4f2b8e",
        "fname": "Jackson",
        "lname": "Lopez",
        "email": "jacksonlopez@seattleu.edu",
        "phoneNumber": "901-234-5678",
        "verified": "true",
        "status": "Active"
    },
    {
        "studentId": "b4d9e5c1f7a2b3e8c0a6d4f2e1c5b7a8",
        "fname": "Isabella",
        "lname": "Wilson",
        "email": "isabellawilson@seattleu.edu",
        "phoneNumber": "012-345-6789",
        "verified": "false",
        "status": "Inactive"
    },
    {
        "studentId": "e6b4c2f8d1e3a5b9f0c7d1a4e6c8b2d7",
        "fname": "Lucas",
        "lname": "Anderson",
        "email": "lucasanderson@seattleu.edu",
        "phoneNumber": "123-456-7891",
        "verified": "true",
        "status": "Active"
    }
]);

studentIds = [ 
    "2b8f3c2a1d6e9c4f3b5a0e8c1d7b3a9e",  
    "c1e4f7b8d0c9a5e1b2f6a8e3d4c5b0f7",  
    "e3a7d1f9c2b5e6d4f8a1b3c0e7c2d9e5",  
    "4b8c3f1e6d0a5b2c9e7d4f0e1c8b3d7a",  
    "9e1a4c5b2d8f3a7e6c0b1d9f8e4a2c3b",  
    "5c2e8d1b4f0e3a6d9b7a5f4c3e2b1a7d",  
    "f0a3e9b5c2d1a8f6e4b7d0c2a3e9f1b4",  
    "3f7c1a2e4b5d6e9f8a0b3d1c5e4f2b8e",  
    "b4d9e5c1f7a2b3e8c0a6d4f2e1c5b7a8",  
    "e6b4c2f8d1e3a5b9f0c7d1a4e6c8b2d7",
];

categoryIds = [
    "a3f9b8c5e90b5d6f8e4a0f8f4e2c5f8a",
    "9d4c2f3a4e1e2f3d0a4c5b6e8e0b1d7c",
    "c8a7e3f6b2d4e9c6f3b1e2a5f6c9b4d1",
    "4e7f8b2d9c4e2f1b8a6f7c0d3b5c2a9e",
    "1e3b5d7c8a4f2e6f8b2c9a3d7e1b4f0d"
];

if (!db.getCollectionNames().includes("Trip")) {
    db.createCollection("Trip");
}
TripsCollection = db.getCollection("Trip");
TripsCollection.deleteMany({});
TripsCollection.insertMany([
    {
        "tripId": "2d5c7b9e4a1f0e3c6b8d2a1f4e5c9b3a",
        "name": "Trip1-a",
        "description": "A relaxing beach day.",
        "status": "Ongoing",
        "image": "C:\\Users\\chand\\Source\\Repos\\CampusMeetups\\pages\\images\\seattle.jpeg",
        "location": "Long Beach, California",
        "timestamp": new Date("2024-10-15T10:00:00.000Z"),
        "organizerId": studentIds[0],
        "categoryId": getRandomElement(categoryIds)
    },
    {
        "tripId": "f8e6c1a4d2b9a5f3c0e7d2b1f6a8c4e7",
        "name": "Trip1-b",
        "description": "A day of hiking in the hills.",
        "status": "Ongoing",
        "image": "C:\\Users\\chand\\Source\\Repos\\CampusMeetups\\pages\\images\\seattle.jpeg",
        "location": "Mount Tamalpais, California",
        "timestamp": new Date("2024-10-20T09:00:00.000Z"),
        "organizerId": studentIds[0],
        "categoryId": getRandomElement(categoryIds)
    },
    {
        "tripId": "4b7d9c2e1a3f8e5b0d6c4a1e3b2f9d7e",
        "name": "Trip1-c",
        "description": "Exploring the vibrant city life.",
        "status": "Ongoing",
        "image": "C:\\Users\\chand\\Source\\Repos\\CampusMeetups\\pages\\images\\seattle.jpeg",
        "location": "San Francisco, California",
        "timestamp": new Date("2024-10-25T11:00:00.000Z"),
        "organizerId": studentIds[1],
        "categoryId": getRandomElement(categoryIds)
    },
    {
        "tripId": "8c2f3b7a4e1d5c9e0a3b8f2d6e4c1a7b",
        "name": "Trip1-d",
        "description": "Camping under the stars.",
        "status": "Ongoing",
        "image": "C:\\Users\\chand\\Source\\Repos\\CampusMeetups\\pages\\images\\seattle.jpeg",
        "location": "Yosemite National Park, California",
        "timestamp": new Date("2024-10-30T17:00:00.000Z"),
        "organizerId": studentIds[1],
        "categoryId": getRandomElement(categoryIds)
    },
    {
        "tripId": "9e5d4c1b2a7f3b9e8c1e6d0a2c5b8f4d",
        "name": "Trip1-e",
        "description": "A scenic drive along the coast.",
        "status": "Ongoing",
        "image": "C:\\Users\\chand\\Source\\Repos\\CampusMeetups\\pages\\images\\seattle.jpeg",
        "location": "Big Sur, California",
        "timestamp": new Date("2024-11-05T08:00:00.000Z"),
        "organizerId": studentIds[2],
        "categoryId": getRandomElement(categoryIds)
    },
    {
        "tripId": "a1b3e5c4f9d8e2a7b0c1f6a2b4d3c9e8",
        "name": "Trip1-f",
        "description": "Wine tasting in the valley.",
        "status": "Ongoing",
        "image": "C:\\Users\\chand\\Source\\Repos\\CampusMeetups\\pages\\images\\seattle.jpeg",
        "location": "Napa Valley, California",
        "timestamp": new Date("2024-11-10T14:00:00.000Z"),
        "organizerId": studentIds[2],
        "categoryId": getRandomElement(categoryIds)
    },
    {
        "tripId": "c3f1e6b4d5a7c2b8d0e9a1f2f4e5c3a7",
        "name": "Trip1-g",
        "description": "A historical tour of the city.",
        "status": "Ongoing",
        "image": "C:\\Users\\chand\\Source\\Repos\\CampusMeetups\\pages\\images\\seattle.jpeg",
        "location": "Washington, D.C.",
        "timestamp": new Date("2024-11-15T09:30:00.000Z"),
        "organizerId": studentIds[3],
        "categoryId": getRandomElement(categoryIds)
    },
    {
        "tripId": "6d4b8c1a2e9f5a3b0e7c4d2b1f8e2c9d",
        "name": "Trip1-h",
        "description": "A thrilling adventure at the theme park.",
        "status": "Ongoing",
        "image": "C:\\Users\\chand\\Source\\Repos\\CampusMeetups\\pages\\images\\seattle.jpeg",
        "location": "Orlando, Florida",
        "timestamp": new Date("2024-11-20T10:00:00.000Z"),
        "organizerId": studentIds[3],
        "categoryId": getRandomElement(categoryIds)
    },
    {
        "tripId": "f5a1c2b3e6d9e4b7f8a3d1c0b5e2f1a9",
        "name": "Trip1-i",
        "description": "A peaceful retreat in the mountains.",
        "status": "Ongoing",
        "image": "C:\\Users\\chand\\Source\\Repos\\CampusMeetups\\pages\\images\\seattle.jpeg",
        "location": "Aspen, Colorado",
        "timestamp": new Date("2024-11-25T16:00:00.000Z"),
        "organizerId": studentIds[4],
        "categoryId": getRandomElement(categoryIds)
    },
    {
        "tripId": "3e9c4d1a8b7e5f2c0d3a8b4c1e2f9d7e",
        "name": "Trip1-j",
        "description": "An exhilarating ski trip.",
        "status": "Ongoing",
        "image": "C:\\Users\\chand\\Source\\Repos\\CampusMeetups\\pages\\images\\seattle.jpeg",
        "location": "Park City, Utah",
        "timestamp": new Date("2024-12-01T09:00:00.000Z"),
        "organizerId": studentIds[4],
        "categoryId": getRandomElement(categoryIds)
    },
    {
        "tripId": "d3b0c8f2e69a4b8eac84f7f7a6e1b4b2",
        "name": "Trip1-k",
        "description": "Exploring the desert landscapes.",
        "status": "Ongoing",
        "image": "C:\\Users\\chand\\Source\\Repos\\CampusMeetups\\pages\\images\\seattle.jpeg",
        "location": "Joshua Tree National Park, California",
        "timestamp": new Date("2024-12-05T12:00:00.000Z"),
        "organizerId": studentIds[5],
        "categoryId": getRandomElement(categoryIds)
    },
    {
        "tripId": "74f8a2d4a5e1c6b9d3a0f8b4e7c5e1f1",
        "name": "Trip1-l",
        "description": "A cultural festival experience.",
        "status": "Ongoing",
        "image": "C:\\Users\\chand\\Source\\Repos\\CampusMeetups\\pages\\images\\seattle.jpeg",
        "location": "New Orleans, Louisiana",
        "timestamp": new Date("2024-12-10T11:00:00.000Z"),
        "organizerId": studentIds[5],
        "categoryId": getRandomElement(categoryIds)
    },
    {
        "tripId": "7e4c2d8a9b6f5a1e0d3c2f8b1a7e4f3c",
        "name": "Trip1-m",
        "description": "A guided tour of the national park.",
        "status": "Ongoing",
        "image": "C:\\Users\\chand\\Source\\Repos\\CampusMeetups\\pages\\images\\seattle.jpeg",
        "location": "Yellowstone National Park, Wyoming",
        "timestamp": new Date("2024-12-15T09:00:00.000Z"),
        "organizerId": studentIds[6],
        "categoryId": getRandomElement(categoryIds)
    },
    {
        "tripId": "f9a2c6e1d3b4e0f8a7c5b9d2e1c3a6f0",
        "name": "Trip1-n",
        "description": "A day of fishing and relaxation.",
        "status": "Ongoing",
        "image": "C:\\Users\\chand\\Source\\Repos\\CampusMeetups\\pages\\images\\seattle.jpeg",
        "location": "Lake Tahoe, California",
        "timestamp": new Date("2024-12-20T10:00:00.000Z"),
        "organizerId": studentIds[6],
        "categoryId": getRandomElement(categoryIds)
    },
    {
        "tripId": "c1a8d7e6b5f0a2e1c4b9e3d8f5a1c7b2",
        "name": "Trip1-o",
        "description": "A bike tour through the countryside.",
        "status": "Ongoing",
        "image": "C:\\Users\\chand\\Source\\Repos\\CampusMeetups\\pages\\images\\seattle.jpeg",
        "location": "Sonoma County, California",
        "timestamp": new Date("2024-12-25T11:30:00.000Z"),
        "organizerId": studentIds[7],
        "categoryId": getRandomElement(categoryIds)
    },
    {
        "tripId": "4f2d3c1e6b8e5a9d7f0c1b4e3a2e6c8",
        "name": "Trip1-p",
        "description": "A magical winter wonderland experience.",
        "status": "Ongoing",
        "image": "C:\\Users\\chand\\Source\\Repos\\CampusMeetups\\pages\\images\\seattle.jpeg",
        "location": "Lake Placid, New York",
        "timestamp": new Date("2024-12-30T15:00:00.000Z"),
        "organizerId": studentIds[7],
        "categoryId": getRandomElement(categoryIds)
    },
    {
        "tripId": "8b4e5d1c3f7a2b6e9d8c0f1e2a4b5c3f",
        "name": "Trip1-q",
        "description": "A weekend at the spa.",
        "status": "Ongoing",
        "image": "C:\\Users\\chand\\Source\\Repos\\CampusMeetups\\pages\\images\\seattle.jpeg",
        "location": "Sedona, Arizona",
        "timestamp": new Date("2025-01-05T13:00:00.000Z"),
        "organizerId": studentIds[8],
        "categoryId": getRandomElement(categoryIds)
    },
    {
        "tripId": "1e3f2d4b9c7a8e6a1f0d5c2e3b6e4f7",
        "name": "Trip1-r",
        "description": "A photography workshop in nature.",
        "status": "Ongoing",
        "image": "C:\\Users\\chand\\Source\\Repos\\CampusMeetups\\pages\\images\\seattle.jpeg",
        "location": "Banff National Park, Canada",
        "timestamp": new Date("2025-01-10T10:00:00.000Z"),
        "organizerId": studentIds[8],
        "categoryId": getRandomElement(categoryIds)
    },
    {
        "tripId": "2d5a1e3b9f6c4b2d8e7c0a1f5e3d2b8",
        "name": "Trip1-s",
        "description": "A wellness retreat in the mountains.",
        "status": "Ongoing",
        "image": "C:\\Users\\chand\\Source\\Repos\\CampusMeetups\\pages\\images\\seattle.jpeg",
        "location": "Boulder, Colorado",
        "timestamp": new Date("2025-01-15T12:00:00.000Z"),
        "organizerId": studentIds[9],
        "categoryId": getRandomElement(categoryIds)
    },
    {
        "tripId": "7e3b5f0a4d9c8e2b1a6e4d1c5b2f7a3",
        "name": "Trip1-t",
        "description": "A surf and sun getaway.",
        "status": "Ongoing",
        "image": "C:\\Users\\chand\\Source\\Repos\\CampusMeetups\\pages\\images\\seattle.jpeg",
        "location": "Malibu, California",
        "timestamp": new Date("2025-01-20T10:00:00.000Z"),
        "organizerId": studentIds[9],
        "categoryId": getRandomElement(categoryIds)
    },
    {
        "tripId": "c4f1b9a2d7e5e3d0a1c8f4b2e6a1d7c3",
        "name": "Trip1-u",
        "description": "A historical landmark tour.",
        "status": "Ongoing",
        "image": "C:\\Users\\chand\\Source\\Repos\\CampusMeetups\\pages\\images\\seattle.jpeg",
        "location": "Philadelphia, Pennsylvania",
        "timestamp": new Date("2025-01-25T14:00:00.000Z"),
        "organizerId": studentIds[0],
        "categoryId": getRandomElement(categoryIds)
    },
    {
        "tripId": "9a2d5c7b1e8a4e6f0c3b9d2a5f1e8b4",
        "name": "Trip1-v",
        "description": "An art and culture exploration.",
        "status": "Ongoing",
        "image": "C:\\Users\\chand\\Source\\Repos\\CampusMeetups\\pages\\images\\seattle.jpeg",
        "location": "Santa Fe, New Mexico",
        "timestamp": new Date("2025-01-30T11:00:00.000Z"),
        "organizerId": studentIds[0],
        "categoryId": getRandomElement(categoryIds)
    },
    {
        "tripId": "0d3c8e5a2f6b7f1e4c9b2d0a8e1f5c3",
        "name": "Trip1-w",
        "description": "An exciting weekend music festival.",
        "status": "Ongoing",
        "image": "C:\\Users\\chand\\Source\\Repos\\CampusMeetups\\pages\\images\\seattle.jpeg",
        "location": "Austin, Texas",
        "timestamp": new Date("2025-02-05T18:00:00.000Z"),
        "organizerId": studentIds[9],
        "categoryId": getRandomElement(categoryIds)
    },
    {
        "tripId": "e8c4b1f7d5a9e3d0f1c6b2a2e8d7c4e",
        "name": "Trip1-x",
        "description": "An exhilarating rock climbing experience.",
        "status": "Ongoing",
        "image": "C:\\Users\\chand\\Source\\Repos\\CampusMeetups\\pages\\images\\seattle.jpeg",
        "location": "Red Rocks, Colorado",
        "timestamp": new Date("2025-02-10T09:00:00.000Z"),
        "organizerId": studentIds[5],
        "categoryId": getRandomElement(categoryIds)
    },
    {
        "tripId": "b5a6d3e8c1f4e2b7a0f5d9c3e1b7f2a",
        "name": "Trip1-y",
        "description": "A cozy cabin weekend retreat.",
        "status": "Ongoing",
        "image": "C:\\Users\\chand\\Source\\Repos\\CampusMeetups\\pages\\images\\seattle.jpeg",
        "location": "Lake Arrowhead, California",
        "timestamp": new Date("2025-02-15T15:00:00.000Z"),
        "organizerId": studentIds[3],
        "categoryId": getRandomElement(categoryIds)
    }
]);

reporterIds = [
    "2b8f3c2a1d6e9c4f3b5a0e8c1d7b3a9e",  
    "c1e4f7b8d0c9a5e1b2f6a8e3d4c5b0f7",  
    "e3a7d1f9c2b5e6d4f8a1b3c0e7c2d9e5",  
    "4b8c3f1e6d0a5b2c9e7d4f0e1c8b3d7a",  
    "9e1a4c5b2d8f3a7e6c0b1d9f8e4a2c3b",  
    "5c2e8d1b4f0e3a6d9b7a5f4c3e2b1a7d",  
    "f0a3e9b5c2d1a8f6e4b7d0c2a3e9f1b4", 
]

reportedIds = [
    "3f7c1a2e4b5d6e9f8a0b3d1c5e4f2b8e",  
    "b4d9e5c1f7a2b3e8c0a6d4f2e1c5b7a8",  
    "e6b4c2f8d1e3a5b9f0c7d1a4e6c8b2d7",
]

if (!db.getCollectionNames().includes("Report")) {
    db.createCollection("Report");
}
const ReportsCollection = db.getCollection("Report");
ReportsCollection.deleteMany({});
ReportsCollection.insertMany([

    {
        "reportId": "b5a6d3e8c1f4e2b7a0f5d9c3e1b7f2a",
        "reason": "Spam messages",
        "detail": "This user has been sending promotional links repeatedly.",
        "status": "Ongoing",
        "reporterId": getRandomElement(reporterIds),
        "reportedId": getRandomElement(reportedIds)
    },
    {
        "reportId": "f1b4c3e2d9a7a5e8c0d2e1f5b4c8d6",
        "reason": "Fraud user",
        "detail": "User has been impersonating a legitimate business.",
        "status": "Resolved",
        "reporterId": getRandomElement(reporterIds),
        "reportedId": getRandomElement(reportedIds)
    },
    {
        "reportId": "3c2b1d9f6a8e0a5b7c1d4e2e3f6f7a8",
        "reason": "Harassment",
        "detail": "Reported for repeated abusive language in comments.",
        "status": "Ongoing",
        "reporterId": getRandomElement(reporterIds),
        "reportedId": getRandomElement(reportedIds)
    },
    {
        "reportId": "8f2d4c1e7b9e3c8a5d0a1f6b2e3f7b4",
        "reason": "Account takeover attempt",
        "detail": "Suspicious activity suggesting account was hacked.",
        "status": "Resolved",
        "reporterId": getRandomElement(reporterIds),
        "reportedId": getRandomElement(reportedIds)
    },
    {
        "reportId": "4b8e1d0c3f5a2b6e9d7c1f4a3e8d5b2",
        "reason": "Scam attempts",
        "detail": "User sent phishing links to multiple users.",
        "status": "Ongoing",
        "reporterId": getRandomElement(reporterIds),
        "reportedId": getRandomElement(reportedIds)
    }
]);

tripIds = [
    "2d5c7b9e4a1f0e3c6b8d2a1f4e5c9b3a",  
    "f8e6c1a4d2b9a5f3c0e7d2b1f6a8c4e7",  
    "4b7d9c2e1a3f8e5b0d6c4a1e3b2f9d7e",  
    "8c2f3b7a4e1d5c9e0a3b8f2d6e4c1a7b",  
    "9e5d4c1b2a7f3b9e8c1e6d0a2c5b8f4d", 
    "a1b3e5c4f9d8e2a7b0c1f6a2b4d3c9e8",
    "c3f1e6b4d5a7c2b8d0e9a1f2f4e5c3a7",  
    "6d4b8c1a2e9f5a3b0e7c4d2b1f8e2c9d",  
    "f5a1c2b3e6d9e4b7f8a3d1c0b5e2f1a9", 
    "3e9c4d1a8b7e5f2c0d3a8b4c1e2f9d7e",
    "d3b0c8f2e69a4b8eac84f7f7a6e1b4b2",
    "74f8a2d4a5e1c6b9d3a0f8b4e7c5e1f1",
    "7e4c2d8a9b6f5a1e0d3c2f8b1a7e4f3c",
    "f9a2c6e1d3b4e0f8a7c5b9d2e1c3a6f0",
    "c1a8d7e6b5f0a2e1c4b9e3d8f5a1c7b2",
    "4f2d3c1e6b8e5a9d7f0c1b4e3a2e6c8",
    "8b4e5d1c3f7a2b6e9d8c0f1e2a4b5c3f",
    "1e3f2d4b9c7a8e6a1f0d5c2e3b6e4f7",
    "2d5a1e3b9f6c4b2d8e7c0a1f5e3d2b8",
    "7e3b5f0a4d9c8e2b1a6e4d1c5b2f7a3",
    "c4f1b9a2d7e5e3d0a1c8f4b2e6a1d7c3",
    "9a2d5c7b1e8a4e6f0c3b9d2a5f1e8b4",
    "0d3c8e5a2f6b7f1e4c9b2d0a8e1f5c3",
    "e8c4b1f7d5a9e3d0f1c6b2a2e8d7c4e",
    "b5a6d3e8c1f4e2b7a0f5d9c3e1b7f2a"
];

if (!db.getCollectionNames().includes("Attendee")) {
    db.createCollection("Attendee");
}
const AttendeesCollection = db.getCollection("Attendee");
AttendeesCollection.deleteMany({});
AttendeesCollection.insertMany([
    {
        "studentId": studentIds[1],
        "fname": "Olivia",
        "lname": "Johnson",
        "tripId":tripIds[0]
    },
    {
        "studentId": studentIds[2],
        "fname": "Noah",
        "lname": "Brown",
        "tripId":tripIds[0]
    },
    {
        "studentId": studentIds[3],
        "fname": "Emma",
        "lname": "Davis",
        "tripId":tripIds[0]
    },
    {
        "studentId": studentIds[0],
        "fname": "Liam",
        "lname": "Smith",
        "tripId":tripIds[2]
    },
    {
        "studentId": studentIds[7],
        "fname": "Jackson",
        "lname": "Lopez",
        "tripId":tripIds[2]
    },
    {
        "studentId": studentIds[5],
        "fname": "James",
        "lname": "Martinez",
        "tripId":tripIds[2]
    },
    {
        "studentId": studentIds[0],
        "fname": "Liam",
        "lname": "Smith",
        "tripId":tripIds[10]
    },
    {
        "studentId": studentIds[1],
        "fname": "Olivia",
        "lname": "Johnson",
        "tripId":tripIds[20]
    },
]);
