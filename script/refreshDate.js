db = db.getSiblingDB("campusMeetups")

function getUpcomingDate(days){
    today = new Date();
    today.setDate(today.getDate() + days);
    return today;
}

if (!db.getCollectionNames().includes("Trip")) {
    db.createCollection("Trip");
}
TripsCollection = db.getCollection("Trip");
TripsCollection.bulkWrite([
    {
        updateOne: {
          filter: { tripId: "2d5c7b9e4a1f0e3c6b8d2a1f4e5c9b3a" },
          update: { $set: { timestamp: getUpcomingDate(2) } },
          upsert: false
        }
    },
    {
        updateOne: {
          filter: { tripId: "f8e6c1a4d2b9a5f3c0e7d2b1f6a8c4e7" },
          update: { $set: { timestamp: getUpcomingDate(3) } },
          upsert: false
        }
    },
    {
        updateOne: {
          filter: { tripId: "4b7d9c2e1a3f8e5b0d6c4a1e3b2f9d7e" },
          update: { $set: { timestamp: getUpcomingDate(4) } },
          upsert: false
        }
    },
    {
        updateOne: {
          filter: { tripId: "8c2f3b7a4e1d5c9e0a3b8f2d6e4c1a7b" },
          update: { $set: { timestamp: getUpcomingDate(5) } },
          upsert: false
        }
    },
    {
        updateOne: {
          filter: { tripId: "9e5d4c1b2a7f3b9e8c1e6d0a2c5b8f4d" },
          update: { $set: { timestamp: getUpcomingDate(6) } },
          upsert: false
        }
    },
    {
        updateOne: {
          filter: { tripId: "a1b3e5c4f9d8e2a7b0c1f6a2b4d3c9e8" },
          update: { $set: { timestamp: getUpcomingDate(7) } },
          upsert: false
        }
    },
    {
        updateOne: {
          filter: { tripId: "c3f1e6b4d5a7c2b8d0e9a1f2f4e5c3a7" },
          update: { $set: { timestamp: getUpcomingDate(8) } },
          upsert: false
        }
    },
    {
        updateOne: {
          filter: { tripId: "6d4b8c1a2e9f5a3b0e7c4d2b1f8e2c9d" },
          update: { $set: { timestamp: getUpcomingDate(9) } },
          upsert: false
        }
    },
    {
        updateOne: {
          filter: { tripId: "f5a1c2b3e6d9e4b7f8a3d1c0b5e2f1a9" },
          update: { $set: { timestamp: getUpcomingDate(10) } },
          upsert: false
        }
    },
    {
        updateOne: {
          filter: { tripId: "3e9c4d1a8b7e5f2c0d3a8b4c1e2f9d7e" },
          update: { $set: { timestamp: getUpcomingDate(11) } },
          upsert: false
        }
    },
    {
        updateOne: {
          filter: { tripId: "d3b0c8f2e69a4b8eac84f7f7a6e1b4b2" },
          update: { $set: { timestamp: getUpcomingDate(11) } },
          upsert: false
        }
    },
    {
        updateOne: {
          filter: { tripId: "74f8a2d4a5e1c6b9d3a0f8b4e7c5e1f1" },
          update: { $set: { timestamp: getUpcomingDate(10) } },
          upsert: false
        }
    },
    {
        updateOne: {
          filter: { tripId: "7e4c2d8a9b6f5a1e0d3c2f8b1a7e4f3c" },
          update: { $set: { timestamp: getUpcomingDate(9) } },
          upsert: false
        }
    },
    {
        updateOne: {
          filter: { tripId: "f9a2c6e1d3b4e0f8a7c5b9d2e1c3a6f0" },
          update: { $set: { timestamp: getUpcomingDate(8) } },
          upsert: false
        }
    },
    {
        updateOne: {
          filter: { tripId: "c1a8d7e6b5f0a2e1c4b9e3d8f5a1c7b2" },
          update: { $set: { timestamp: getUpcomingDate(7) } },
          upsert: false
        }
    },
    {
        updateOne: {
          filter: { tripId: "4f2d3c1e6b8e5a9d7f0c1b4e3a2e6c8" },
          update: { $set: { timestamp: getUpcomingDate(6) } },
          upsert: false
        }
    },
    {
        updateOne: {
          filter: { tripId: "8b4e5d1c3f7a2b6e9d8c0f1e2a4b5c3f" },
          update: { $set: { timestamp: getUpcomingDate(5) } },
          upsert: false
        }
    },
    {
        updateOne: {
          filter: { tripId: "1e3f2d4b9c7a8e6a1f0d5c2e3b6e4f7" },
          update: { $set: { timestamp: getUpcomingDate(4) } },
          upsert: false
        }
    },
    {
        updateOne: {
          filter: { tripId: "2d5a1e3b9f6c4b2d8e7c0a1f5e3d2b8" },
          update: { $set: { timestamp: getUpcomingDate(3) } },
          upsert: false
        }
    },
    {
        updateOne: {
          filter: { tripId: "7e3b5f0a4d9c8e2b1a6e4d1c5b2f7a3" },
          update: { $set: { timestamp: getUpcomingDate(2) } },
          upsert: false
        }
    },
    {
        updateOne: {
          filter: { tripId: "c4f1b9a2d7e5e3d0a1c8f4b2e6a1d7c3" },
          update: { $set: { timestamp: getUpcomingDate(6) } },
          upsert: false
        }
    },
    {
        updateOne: {
          filter: { tripId: "9a2d5c7b1e8a4e6f0c3b9d2a5f1e8b4" },
          update: { $set: { timestamp: getUpcomingDate(9) } },
          upsert: false
        }
    },
    {
        updateOne: {
          filter: { tripId: "0d3c8e5a2f6b7f1e4c9b2d0a8e1f5c3" },
          update: { $set: { timestamp: getUpcomingDate(3) } },
          upsert: false
        }
    },
    {
        updateOne: {
          filter: { tripId: "e8c4b1f7d5a9e3d0f1c6b2a2e8d7c4e" },
          update: { $set: { timestamp: getUpcomingDate(11) } },
          upsert: false
        }
    },
    {
        updateOne: {
          filter: { tripId: "b5a6d3e8c1f4e2b7a0f5d9c3e1b7f2a" },
          update: { $set: { timestamp: getUpcomingDate(4) } },
          upsert: false
        }
    },
]);
