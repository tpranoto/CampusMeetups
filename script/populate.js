db = db.getSiblingDB('campusMeetups1')
// Check if the collection exists
if (!db.getCollectionNames().includes('Trip')) {
    db.createCollection('Trip');
}
TripsCollection = db.getCollection("Trip")
TripsCollection.deleteMany({})
TripsCollection.insertMany([
    {
        "tripId": "T002",
        "name": "Trip2-a",
        "description": "A fun day exploring the mountains.",
        "image": "C:\\Users\\chand\\Source\\Repos\\CampusMeetups\\pages\\images\\seattle.jpeg",
        "location": "Mount Rainier, Washington",
        "date": {
          "$date": "2024-11-01T10:00:00.000Z"
        },
        "organizerId": "S12345",
        "categoryId": "Hike"
      },
      {
        "tripId": "T003",
        "name": "Trip2-b",
        "description": "Exploring the beautiful coastline.",
        "image": "C:\\Users\\chand\\Source\\Repos\\CampusMeetups\\pages\\images\\seattle.jpeg",
        "location": "Olympic National Park, Washington",
        "date": {
          "$date": "2024-11-05T09:00:00.000Z"
        },
        "organizerId": "S12346",
        "categoryId": "Adventure"
      },
      {
        "tripId": "T004",
        "name": "Trip2-c",
        "description": "A relaxing weekend getaway.",
        "image": "C:\\Users\\chand\\Source\\Repos\\CampusMeetups\\pages\\images\\seattle.jpeg",
        "location": "San Juan Islands, Washington",
        "date": {
          "$date": "2024-11-10T14:00:00.000Z"
        },
        "organizerId": "S12347",
        "categoryId": "Relaxation"
      },
      {
        "tripId": "T005",
        "name": "Trip2-d",
        "description": "A cultural exploration of the city.",
        "image": "C:\\Users\\chand\\Source\\Repos\\CampusMeetups\\pages\\images\\seattle.jpeg",
        "location": "Seattle, Washington",
        "date": {
          "$date": "2024-11-15T11:00:00.000Z"
        },
        "organizerId": "S12348",
        "categoryId": "Culture"
      },
      {
        "tripId": "T006",
        "name": "Trip2-e",
        "description": "A thrilling adventure in the mountains.",
        "image": "C:\\Users\\chand\\Source\\Repos\\CampusMeetups\\pages\\images\\seattle.jpeg",
        "location": "Snoqualmie Pass, Washington",
        "date": {
          "$date": "2024-11-20T08:00:00.000Z"
        },
        "organizerId": "S12349",
        "categoryId": "Hike"
      },
      {
        "tripId": "T007",
        "name": "Trip2-f",
        "description": "Enjoying the scenic views of the ocean.",
        "image": "C:\\Users\\chand\\Source\\Repos\\CampusMeetups\\pages\\images\\seattle.jpeg",
        "location": "Cape Disappointment, Washington",
        "date": {
          "$date": "2024-11-25T13:00:00.000Z"
        },
        "organizerId": "S12350",
        "categoryId": "Nature"
      },
      {
        "tripId": "T008",
        "name": "Trip2-g",
        "description": "An exciting trip to the city for shopping and fun.",
        "image": "C:\\Users\\chand\\Source\\Repos\\CampusMeetups\\pages\\images\\seattle.jpeg",
        "location": "Seattle, Washington",
        "date": {
          "$date": "2024-12-01T10:30:00.000Z"
        },
        "organizerId": "S12351",
        "categoryId": "Shopping"
      },
      {
        "tripId": "T009",
        "name": "Trip2-h",
        "description": "A camping trip in the forest.",
        "image": "C:\\Users\\chand\\Source\\Repos\\CampusMeetups\\pages\\images\\seattle.jpeg",
        "location": "Mount St. Helens, Washington",
        "date": {
          "$date": "2024-12-05T15:00:00.000Z"
        },
        "organizerId": "S12352",
        "categoryId": "Camping"
      },
      {
        "tripId": "T010",
        "name": "Trip2-i",
        "description": "A fun day at the amusement park.",
        "image": "C:\\Users\\chand\\Source\\Repos\\CampusMeetups\\pages\\images\\seattle.jpeg",
        "location": "Seattle, Washington",
        "date": {
          "$date": "2024-12-10T12:00:00.000Z"
        },
        "organizerId": "S12353",
        "categoryId": "Fun"
      }
])
