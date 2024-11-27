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
        "image": "https://img.freepik.com/free-vector/smiling-young-man-illustration_1308-174669.jpg?t=st=1731994506~exp=1731998106~hmac=69711054c08fac7405157edce987fd879c8269acdef5523b7507189d1ebbd650&w=1060",
        "phoneNumber": "234-567-8901",
        "verified": true,
        "status": "Active"
    },
    {
        "studentId": "c1e4f7b8d0c9a5e1b2f6a8e3d4c5b0f7",
        "fname": "Olivia",
        "lname": "Johnson",
        "email": "oliviajohnson@seattleu.edu",
        "image": "",
        "phoneNumber": "345-678-9012",
        "verified": true,
        "status": "Active"
    },
    {
        "studentId": "e3a7d1f9c2b5e6d4f8a1b3c0e7c2d9e5",
        "fname": "Noah",
        "lname": "Brown",
        "email": "noahbrown@seattleu.edu",
        "image": "https://img.freepik.com/free-vector/hand-drawn-pickle-cartoon-illustration_52683-130462.jpg?t=st=1732008534~exp=1732012134~hmac=653573515e8d22d006b78daeebd007a301ed31455097d4bbd0a50a4f55187847&w=1060",
        "phoneNumber": "456-789-0123",
        "verified": false,
        "status": "Inactive"
    },
    {
        "studentId": "4b8c3f1e6d0a5b2c9e7d4f0e1c8b3d7a",
        "fname": "Emma",
        "lname": "Davis",
        "email": "emmadavis@seattleu.edu",
        "image": "https://img.freepik.com/free-vector/cute-koala-eating-ramen-noodle-cartoon-vector-icon-illustration-animal-food-icon-concept-isolated_138676-9816.jpg?t=st=1732008650~exp=1732012250~hmac=ed62c0414377cba85397ce203c304856f3d56ee5a0a8e409c2c232d757900feb&w=1060",
        "phoneNumber": "567-890-1234",
        "verified": true,
        "status": "Active"
    },
    {
        "studentId": "9e1a4c5b2d8f3a7e6c0b1d9f8e4a2c3b",
        "fname": "Ava",
        "lname": "Garcia",
        "email": "avagarcia@seattleu.edu",
        "image": "",
        "phoneNumber": "678-901-2345",
        "verified": true,
        "status": "Active"
    },
    {
        "studentId": "5c2e8d1b4f0e3a6d9b7a5f4c3e2b1a7d",
        "fname": "James",
        "lname": "Martinez",
        "email": "jamesmartinez@seattleu.edu",
        "image": "https://img.freepik.com/free-vector/cute-fox-wearing-glasses-cartoon-vector-icon-illustration-animal-nature-icon-concept-isolated-flat_138676-8568.jpg?t=st=1732008671~exp=1732012271~hmac=53e4c38dcba42936314fbef3a0d5b208688e90e54e51dfa708b42353e2f359be&w=1060",
        "phoneNumber": "789-012-3456",
        "verified": false,
        "status": "Inactive"
    },
    {
        "studentId": "f0a3e9b5c2d1a8f6e4b7d0c2a3e9f1b4",
        "fname": "Sophia",
        "lname": "Hernandez",
        "email": "sophiahernandez@seattleu.edu",
        "image": "https://img.freepik.com/free-vector/cute-yeti-standing-cartoon-vector-icon-illustration-animal-nature-icon-isolated-flat-vector_138676-11432.jpg?t=st=1732008690~exp=1732012290~hmac=485afd9cd4a1d07ad2f937d9d02c472ebebaeddc3ca7164bbc68a4bad85728b1&w=1060",
        "phoneNumber": "890-123-4567",
        "verified": true,
        "status": "Active"
    },
    {
        "studentId": "3f7c1a2e4b5d6e9f8a0b3d1c5e4f2b8e",
        "fname": "Jackson",
        "lname": "Lopez",
        "email": "jacksonlopez@seattleu.edu",
        "image": "",
        "phoneNumber": "901-234-5678",
        "verified": true,
        "status": "Active"
    },
    {
        "studentId": "b4d9e5c1f7a2b3e8c0a6d4f2e1c5b7a8",
        "fname": "Isabella",
        "lname": "Wilson",
        "email": "isabellawilson@seattleu.edu",
        "image": "https://img.freepik.com/free-vector/cute-chicken-fever-cartoon-vector-icon-illustration-animal-medical-icon-isolated-flat-vector_138676-11504.jpg?t=st=1732008713~exp=1732012313~hmac=1b19ac0548368f6437b36ce2d8cd99f1f1d4305bedd32e9b72aa26a83d6d4cf9&w=1060",
        "phoneNumber": "012-345-6789",
        "verified": false,
        "status": "Inactive"
    },
    {
        "studentId": "e6b4c2f8d1e3a5b9f0c7d1a4e6c8b2d7",
        "fname": "Lucas",
        "lname": "Anderson",
        "email": "lucasanderson@seattleu.edu",
        "image": "",
        "phoneNumber": "123-456-7891",
        "verified": true,
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

function getUpcomingDate(days){
    today = new Date();
    today.setDate(today.getDate() + days);
    return today;
}

if (!db.getCollectionNames().includes("Trip")) {
    db.createCollection("Trip");
}
TripsCollection = db.getCollection("Trip");
TripsCollection.deleteMany({});
TripsCollection.insertMany([
    {
        "tripId": "2d5c7b9e4a1f0e3c6b8d2a1f4e5c9b3a",
        "name": "Wonderful Adventures",
        "description": "Enjoy a relaxing day at Long Beach, California, where you can soak up the sun, feel the ocean breeze, and unwind by the calming waves. This serene beach experience invites you to relax on the soft sand, take leisurely walks along the shoreline, and enjoy the peaceful atmosphere of this coastal paradise. Whether you want to read a book under a beach umbrella or simply enjoy the natural beauty, this beach day is perfect for those seeking tranquility and a chance to escape the everyday hustle.",
        "status": "Ongoing",
        "image": "https://cdn.stocksnap.io/img-thumbs/960w/mountain-nature_GKXSAHXHOS.jpg",
        "location": "Long Beach, California",
        "timestamp": getUpcomingDate(0),
        "organizerId": studentIds[0],
        "categoryId": getRandomElement(categoryIds)
    },
    {
        "tripId": "f8e6c1a4d2b9a5f3c0e7d2b1f6a8c4e7",
        "name": "Epic Escapes",
        "description": "Join us for a day of adventure in the beautiful hills of Mount Tamalpais, California. This hike offers breathtaking views of the surrounding landscape, from towering redwoods to sweeping vistas of the bay. The challenging trail will take you through varied terrains, allowing you to experience the true beauty of nature while testing your endurance. Along the way, you'll have opportunities to stop, rest, and take in the stunning scenery, making it a perfect escape for both nature lovers and those looking to push their limits in a stunning outdoor environment.",
        "status": "Ongoing",
        "image": "https://cdn.stocksnap.io/img-thumbs/960w/bridge-water_ZWKZNF3OQW.jpg",
        "location": "Mount Tamalpais, California",
        "timestamp": getUpcomingDate(1),
        "organizerId": studentIds[0],
        "categoryId": getRandomElement(categoryIds)
    },
    {
        "tripId": "4b7d9c2e1a3f8e5b0d6c4a1e3b2f9d7e",
        "name": "The Roamers' Retreat",
        "description": "Step into the heart of San Francisco, where the vibrant city life meets rich history and culture. From iconic landmarks like the Golden Gate Bridge to bustling neighborhoods filled with unique shops, restaurants, and street art, San Francisco offers an exciting urban adventure. Explore the city’s diverse districts, from the eclectic streets of Haight-Ashbury to the chic shops of Union Square, and soak in the energy of this incredible metropolis. Whether you're a city explorer or an art enthusiast, this urban retreat is an experience you won’t want to miss.",
        "status": "Ongoing",
        "image": "https://cdn.stocksnap.io/img-thumbs/960w/sand-beach_WY85MZFCDN.jpg",
        "location": "San Francisco, California",
        "timestamp": getUpcomingDate(2),
        "organizerId": studentIds[1],
        "categoryId": getRandomElement(categoryIds)
    },
    {
        "tripId": "8c2f3b7a4e1d5c9e0a3b8f2d6e4c1a7b",
        "name": "Trailblazers Meetup",
        "description": "Experience the wonders of Yosemite National Park with a camping trip under the stars. This overnight adventure allows you to reconnect with nature while exploring the towering granite cliffs, flowing waterfalls, and ancient sequoias. As the sun sets, gather around a campfire with friends, enjoy some stargazing, and listen to the sounds of the wild. Yosemite's stunning natural beauty makes it the ideal place for outdoor lovers to disconnect and rejuvenate, offering both tranquility and a sense of awe-inspiring adventure.",
        "status": "Ongoing",
        "image": "https://cdn.stocksnap.io/img-thumbs/960w/city-bridge_NKZOS5SNK6.jpg",
        "location": "Yosemite National Park, California",
        "timestamp": getUpcomingDate(3),
        "organizerId": studentIds[1],
        "categoryId": getRandomElement(categoryIds)
    },
    {
        "tripId": "9e5d4c1b2a7f3b9e8c1e6d0a2c5b8f4d",
        "name": "Globe Trotters Gathering",
        "description": "Take a scenic drive along the picturesque Big Sur coast in California. This road trip will take you along dramatic cliffs overlooking the Pacific Ocean, through lush forests, and past charming seaside towns. Stop for a picnic on a cliffside, snap photos of the rugged coastline, and enjoy the soothing rhythm of the ocean waves. As one of the most beautiful stretches of coastline in the world, Big Sur is the perfect place to experience nature’s beauty from the comfort of your car, with plenty of stops to explore the stunning landscapes.",
        "status": "Ongoing",
        "image": "https://cdn.stocksnap.io/img-thumbs/960w/waterfall-iceland_AF9QPX5P5T.jpg",
        "location": "Big Sur, California",
        "timestamp": getUpcomingDate(4),
        "organizerId": studentIds[2],
        "categoryId": getRandomElement(categoryIds)
    },
    {
        "tripId": "a1b3e5c4f9d8e2a7b0c1f6a2b4d3c9e8",
        "name": "Pathfinders Expedition",
        "description": "Discover the fine wines of Napa Valley, California, with a guided wine-tasting tour. This relaxing and indulgent experience will take you through lush vineyards and award-winning wineries, where you can sample some of the region's best wines and learn about the art of winemaking. Whether you're a wine connoisseur or just looking for a fun and relaxing day, Napa Valley offers a perfect blend of natural beauty, culture, and, of course, delicious wines. The scenic countryside and charming wineries make it a must-visit destination for wine lovers.",
        "status": "Ongoing",
        "image": "https://cdn.stocksnap.io/img-thumbs/960w/mountain-waterfall_ON8ZPWSOAI.jpg",
        "location": "Napa Valley, California",
        "timestamp": getUpcomingDate(5),
        "organizerId": studentIds[2],
        "categoryId": getRandomElement(categoryIds)
    },
    {
        "tripId": "c3f1e6b4d5a7c2b8d0e9a1f2f4e5c3a7",
        "name": "Wilderness Wanderers",
        "description": "Take a fascinating historical tour of Washington, D.C., where you can dive deep into the nation's history and heritage. From the iconic landmarks like the Lincoln Memorial and the Washington Monument to the famous museums and the National Mall, this trip will take you through the heart of American history. Whether you're visiting the Smithsonian museums, walking through historic neighborhoods, or exploring the monuments, Washington, D.C. offers a rich blend of culture, education, and history, perfect for anyone interested in discovering more about the United States.",
        "status": "Ongoing",
        "image": "https://cdn.stocksnap.io/img-thumbs/960w/iceland-mountain_JHE2CJRPEQ.jpg",
        "location": "Washington, D.C.",
        "timestamp": getUpcomingDate(6),
        "organizerId": studentIds[3],
        "categoryId": getRandomElement(categoryIds)
    },
    {
        "tripId": "6d4b8c1a2e9f5a3b0e7c4d2b1f8e2c9d",
        "name": "Into the Wild Journey",
        "description": "Enjoy an action-packed day at one of Florida's top theme parks in Orlando. Thrilling roller coasters, immersive attractions, and live entertainment await, offering an unforgettable experience for adventure seekers and families alike. Whether you're riding high-speed coasters, meeting beloved characters, or enjoying spectacular shows, Orlando's world-renowned theme parks offer endless fun. It’s the perfect place for adrenaline lovers and those looking to make lasting memories with friends and family.",
        "status": "Ongoing",
        "image": "https://cdn.stocksnap.io/img-thumbs/960w/iceland-beach_ABGWJNSGKR.jpg",
        "location": "Orlando, Florida",
        "timestamp": getUpcomingDate(7),
        "organizerId": studentIds[3],
        "categoryId": getRandomElement(categoryIds)
    },
    {
        "tripId": "f5a1c2b3e6d9e4b7f8a3d1c0b5e2f1a9",
        "name": "The Adventurer’s Voyage",
        "description": "Escape to the peaceful and scenic mountains of Aspen, Colorado, for a retreat that offers ultimate relaxation and rejuvenation. Nestled in the heart of the Rockies, Aspen provides stunning natural beauty and a serene atmosphere. Whether you’re hiking through alpine meadows, indulging in a spa treatment, or simply taking in the mountain views, this retreat will leave you feeling refreshed and renewed. Ideal for those seeking a tranquil getaway surrounded by majestic peaks and pristine wilderness, Aspen offers the perfect opportunity to disconnect and find inner peace.",
        "status": "Ongoing",
        "image": "",
        "location": "Aspen, Colorado",
        "timestamp": getUpcomingDate(8),
        "organizerId": studentIds[4],
        "categoryId": getRandomElement(categoryIds)
    },
    {
        "tripId": "3e9c4d1a8b7e5f2c0d3a8b4c1e2f9d7e",
        "name": "Lost & Found Travels",
        "description": "Embark on an exhilarating ski adventure in Park City, Utah, one of the premier ski destinations in the United States. With its powdery snow, scenic mountain views, and world-class slopes, this trip promises an unforgettable winter experience. Whether you're an expert skier looking to tackle challenging runs or a beginner eager to learn, Park City's diverse terrain caters to all skill levels. After a day on the slopes, relax in a cozy lodge, enjoy delicious meals, and share stories by the fire. This trip is perfect for those seeking adventure and excitement in the heart of the winter wonderland.",
        "status": "Ongoing",
        "image": "https://cdn.stocksnap.io/img-thumbs/960w/winter-ocean_5EWKDXCWWW.jpg",
        "location": "Park City, Utah",
        "timestamp": getUpcomingDate(9),
        "organizerId": studentIds[4],
        "categoryId": getRandomElement(categoryIds)
    },
    {
        "tripId": "d3b0c8f2e69a4b8eac84f7f7a6e1b4b2",
        "name": "Mountain Mornings",
        "description": "Discover the rugged beauty of the desert landscapes with a visit to Joshua Tree National Park in California. This unique park, known for its otherworldly rock formations and iconic Joshua trees, offers a peaceful retreat into nature. Hike along scenic trails that wind through rocky outcrops, or simply sit and admire the spectacular desert sunset. Whether you're a nature photographer looking to capture the stunning scenery, a rock climber, or someone who just enjoys the beauty of the desert, Joshua Tree provides a perfect escape to connect with the natural world.",
        "status": "Ongoing",
        "image": "https://cdn.stocksnap.io/img-thumbs/960w/mountains-peaks_MFDY4VHVS4.jpg",
        "location": "Joshua Tree National Park, California",
        "timestamp": getUpcomingDate(9),
        "organizerId": studentIds[5],
        "categoryId": getRandomElement(categoryIds)
    },
    {
        "tripId": "74f8a2d4a5e1c6b9d3a0f8b4e7c5e1f1",
        "name": "Sunset Seekers",
        "description": "Experience the vibrant culture and lively atmosphere of New Orleans, Louisiana, with an immersive cultural festival experience. This trip brings you to one of the most energetic and eclectic cities in the United States, where you’ll enjoy the rhythm of jazz music, indulge in Creole and Cajun cuisine, and explore the colorful streets of the French Quarter. Whether you're savoring beignets at Café du Monde, enjoying a traditional Mardi Gras parade, or listening to live music, New Orleans offers a sensory overload of sights, sounds, and flavors that will leave you craving more.",
        "status": "Ongoing",
        "image": "https://cdn.stocksnap.io/img-thumbs/960w/sky-stars_QKLA2F9TKK.jpg",
        "location": "New Orleans, Louisiana",
        "timestamp": getUpcomingDate(8),
        "organizerId": studentIds[5],
        "categoryId": getRandomElement(categoryIds)
    },
    {
        "tripId": "7e4c2d8a9b6f5a1e0d3c2f8b1a7e4f3c",
        "name": "Hike & Seek",
        "description": "Embark on a guided adventure through one of America's most iconic natural wonders: Yellowstone National Park. This trip offers the opportunity to explore Yellowstone’s geothermal features, vibrant wildlife, and stunning landscapes with the guidance of experienced park rangers. Take in the sight of the famous Old Faithful geyser, watch bison roam across the expansive plains, and hike along the park's diverse trails. With breathtaking scenery at every turn, this trip is a must for nature lovers and outdoor enthusiasts alike.",
        "status": "Ongoing",
        "image": "",
        "location": "Yellowstone National Park, Wyoming",
        "timestamp": getUpcomingDate(7),
        "organizerId": studentIds[6],
        "categoryId": getRandomElement(categoryIds)
    },
    {
        "tripId": "f9a2c6e1d3b4e0f8a7c5b9d2e1c3a6f0",
        "name": "Ocean Breeze Getaway",
        "description": "Take a peaceful day to unwind and connect with nature at Lake Tahoe, California, where you can enjoy fishing, kayaking, and simply relaxing by the water. This tranquil retreat offers beautiful views of the crystal-clear lake surrounded by majestic mountains. Whether you're casting a line in the hopes of catching a big one, paddling out on a kayak, or just lounging on the shore with a good book, this trip provides the ultimate escape into nature, where you can relax and recharge in one of California's most beloved outdoor destinations.",
        "status": "Ongoing",
        "image": "https://cdn.stocksnap.io/img-thumbs/960w/stars-night%20sky_PHOFG380TU.jpg",
        "location": "Lake Tahoe, California",
        "timestamp": getUpcomingDate(6),
        "organizerId": studentIds[6],
        "categoryId": getRandomElement(categoryIds)
    },
    {
        "tripId": "c1a8d7e6b5f0a2e1c4b9e3d8f5a1c7b2",
        "name": "Forest Adventures",
        "description": "Set out on a scenic bike tour through the picturesque countryside of Sonoma County, California. This relaxed but invigorating trip takes you through rolling hills, past lush vineyards, and along quiet back roads, offering a unique way to experience the beauty of the region. Stop at local wineries for tastings, explore charming towns, and enjoy the peaceful rural atmosphere. Sonoma's gentle landscape and delightful weather make it an ideal destination for a bike tour, and this adventure is perfect for those seeking an active, scenic getaway.",
        "status": "Ongoing",
        "image": "https://cdn.stocksnap.io/img-thumbs/960w/architecture-building_DO54WMU8K3.jpg",
        "location": "Sonoma County, California",
        "timestamp": getUpcomingDate(5),
        "organizerId": studentIds[7],
        "categoryId": getRandomElement(categoryIds)
    },
    {
        "tripId": "4f2d3c1e6b8e5a9d7f0c1b4e3a2e6c8",
        "name": "Parkside Pioneers",
        "description": "Venture into the winter wonderland of Lake Placid, New York, for a magical snow-filled experience. Whether you're skiing down pristine slopes, ice skating on frozen lakes, or simply taking in the winter beauty of the Adirondacks, this trip promises to immerse you in the season's charm. At night, enjoy the cozy atmosphere of a mountain lodge, complete with a crackling fire and warm drinks. Lake Placid is a perfect destination for those seeking a nostalgic, snowy retreat filled with outdoor adventure and serene relaxation.",
        "status": "Ongoing",
        "image": "https://cdn.stocksnap.io/img-thumbs/960w/man-ocean_NLYR8SRNBA.jpg",
        "location": "Lake Placid, New York",
        "timestamp": getUpcomingDate(4),
        "organizerId": studentIds[7],
        "categoryId": getRandomElement(categoryIds)
    },
    {
        "tripId": "8b4e5d1c3f7a2b6e9d8c0f1e2a4b5c3f",
        "name": "Into the Wild Outdoors",
        "description": "Unwind and rejuvenate during a luxurious weekend at a world-class spa in Sedona, Arizona. Surrounded by the striking red rock formations and serene desert landscapes, this spa retreat offers everything you need for total relaxation. Indulge in rejuvenating treatments like massages, facials, and hot stone therapy, or enjoy peaceful walks through the surrounding desert trails. This trip is all about self-care and reconnecting with your inner peace in a stunning natural setting that invites you to recharge your body and mind.",
        "status": "Ongoing",
        "image": "",
        "location": "Sedona, Arizona",
        "timestamp": getUpcomingDate(3),
        "organizerId": studentIds[8],
        "categoryId": getRandomElement(categoryIds)
    },
    {
        "tripId": "1e3f2d4b9c7a8e6a1f0d5c2e3b6e4f7",
        "name": "Breeze & Trails Meetup",
        "description": "Embark on a photography workshop in the breathtaking Banff National Park in Canada, where the towering mountains, emerald lakes, and lush forests provide the perfect backdrop for capturing the beauty of nature. Whether you’re a beginner or an experienced photographer, this workshop will guide you through techniques to improve your skills, with plenty of time for hands-on practice. Explore iconic spots like Lake Louise and Moraine Lake, and leave with stunning photos that showcase the majestic landscapes of the Canadian Rockies.",
        "status": "Ongoing",
        "image": "https://cdn.stocksnap.io/img-thumbs/960w/aerial-aerial%20photo_SV1SXFMWQU.jpg",
        "location": "Banff National Park, Canada",
        "timestamp": getUpcomingDate(2),
        "organizerId": studentIds[8],
        "categoryId": getRandomElement(categoryIds)
    },
    {
        "tripId": "2d5a1e3b9f6c4b2d8e7c0a1f5e3d2b8",
        "name": "The Summit Seekers",
        "description": "Join us for a wellness retreat in the stunning mountains of Boulder, Colorado. This transformative trip focuses on rejuvenating your mind, body, and soul through yoga, meditation, and mindful hiking. The peaceful mountain setting, combined with expert wellness instructors, offers the perfect opportunity to disconnect from daily stress and reconnect with yourself. Whether you’re looking to improve your fitness, deepen your yoga practice, or simply relax in nature, Boulder provides the ideal backdrop for a peaceful and healing retreat.",
        "status": "Ongoing",
        "image": "https://cdn.stocksnap.io/img-thumbs/960w/building-architecture_VF93RWL0YD.jpg",
        "location": "Boulder, Colorado",
        "timestamp": getUpcomingDate(1),
        "organizerId": studentIds[9],
        "categoryId": getRandomElement(categoryIds)
    },
    {
        "tripId": "7e3b5f0a4d9c8e2b1a6e4d1c5b2f7a3",
        "name": "Coastline Chronicles",
        "description": "Get ready for a sun-soaked getaway to the scenic beaches of Malibu, California. This trip is designed for those who love the ocean breeze, golden sands, and the thrill of surfing. Whether you’re an experienced surfer or a first-timer, Malibu offers some of the best waves in California, along with plenty of laid-back beach vibes. Spend your days catching waves, lounging on the beach, and soaking up the sun before enjoying delicious local seafood in one of Malibu's top beachfront restaurants. A perfect combination of surfing, relaxation, and coastal beauty.",
        "status": "Ongoing",
        "image": "https://cdn.stocksnap.io/img-thumbs/960w/architecture-building_VQ0MS52PRY.jpg",
        "location": "Malibu, California",
        "timestamp": getUpcomingDate(0),
        "organizerId": studentIds[9],
        "categoryId": getRandomElement(categoryIds)
    },
    {
        "tripId": "c4f1b9a2d7e5e3d0a1c8f4b2e6a1d7c3",
        "name": "Urban Escapades",
        "description": "Explore the rich history and architecture of Philadelphia, Pennsylvania, on a guided tour of its most iconic landmarks. From the Liberty Bell to Independence Hall, Philadelphia is the birthplace of American independence, and this trip takes you through the historic streets where it all began. Wander through charming neighborhoods, discover art and culture at world-class museums, and enjoy delicious Philly cheesesteaks along the way. Whether you’re a history buff or simply love exploring vibrant cities, this trip offers a unique and enriching urban adventure.",
        "status": "Ongoing",
        "image": "https://cdn.stocksnap.io/img-thumbs/960w/sunset-desert_7KE5ZOOJOT.jpg",
        "location": "Philadelphia, Pennsylvania",
        "timestamp": getUpcomingDate(4),
        "organizerId": studentIds[0],
        "categoryId": getRandomElement(categoryIds)
    },
    {
        "tripId": "9a2d5c7b1e8a4e6f0c3b9d2a5f1e8b4",
        "name": "Cityscape Getaways",
        "description": "Immerse yourself in the arts and culture of Santa Fe, New Mexico, with a trip that blends history, architecture, and artistic expression. Santa Fe is renowned for its vibrant art scene, and this trip will take you through galleries, museums, and artisan markets. The unique adobe-style architecture, combined with the stunning desert landscape, provides a one-of-a-kind backdrop for exploring the creative spirit of the Southwest. Perfect for art lovers, history enthusiasts, and anyone looking to experience the rich cultural tapestry of New Mexico.",
        "status": "Ongoing",
        "image": "https://cdn.stocksnap.io/img-thumbs/960w/seagull-water_7IK961PQJI.jpg",
        "location": "Santa Fe, New Mexico",
        "timestamp": getUpcomingDate(7),
        "organizerId": studentIds[0],
        "categoryId": getRandomElement(categoryIds)
    },
    {
        "tripId": "0d3c8e5a2f6b7f1e4c9b2d0a8e1f5c3",
        "name": "Historic Discovery",
        "description": "Get ready for an exciting weekend of music, food, and fun at one of Austin, Texas's biggest music festivals. This trip will immerse you in the vibrant live music scene of the city, with performances spanning every genre imaginable. Whether you’re into rock, indie, country, or electronic, you’ll find something to groove to. When you're not enjoying the tunes, explore Austin’s lively food scene, including barbecue joints and food trucks, or relax at one of the city’s many bars and venues. It’s an unforgettable weekend full of rhythm and excitement.",
        "status": "Ongoing",
        "image": "",
        "location": "Austin, Texas",
        "timestamp": getUpcomingDate(1),
        "organizerId": studentIds[9],
        "categoryId": getRandomElement(categoryIds)
    },
    {
        "tripId": "e8c4b1f7d5a9e3d0f1c6b2a2e8d7c4e",
        "name": "Culture Quest",
        "description": "Push your limits with an exhilarating rock climbing experience in the stunning Red Rocks of Colorado. This adventure is perfect for both beginners and experienced climbers, with expert guides to help you scale the towering sandstone cliffs. As you climb, you’ll be treated to jaw-dropping views of the surrounding desert landscape, making each climb even more rewarding. If you’re looking to challenge yourself physically and mentally while surrounded by breathtaking scenery, this is the trip for you.",
        "status": "Ongoing",
        "image": "https://cdn.stocksnap.io/img-thumbs/960w/man-fitness_NKBW9THQYP.jpg",
        "location": "Red Rocks, Colorado",
        "timestamp": getUpcomingDate(9),
        "organizerId": studentIds[5],
        "categoryId": getRandomElement(categoryIds)
    },
    {
        "tripId": "b5a6d3e8c1f4e2b7a0f5d9c3e1b7f2a",
        "name": "Hidden Gems Tour",
        "description": "Escape to the serene beauty of Lake Arrowhead, California, where you'll enjoy a cozy cabin weekend retreat surrounded by towering pines and the tranquil sounds of nature. This trip offers the perfect opportunity to unwind and connect with friends or family while staying in a beautiful lakeside cabin. Whether you're enjoying a peaceful morning walk around the lake, fishing, or simply soaking in the view from your cabin porch, this retreat promises relaxation and rejuvenation. It's a perfect getaway for anyone seeking a peaceful, nature-filled escape from the hustle and bustle of everyday life.",
        "status": "Ongoing",
        "image": "https://cdn.stocksnap.io/img-thumbs/960w/guy-man_9RZJVHG39A.jpg",
        "location": "Lake Arrowhead, California",
        "timestamp": getUpcomingDate(2),
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
        "tripId":tripIds[0]
    },
    {
        "studentId": studentIds[2],
        "tripId":tripIds[0]
    },
    {
        "studentId": studentIds[3],
        "tripId":tripIds[0]
    },
    {
        "studentId": studentIds[0],
        "tripId":tripIds[2]
    },
    {
        "studentId": studentIds[7],
        "tripId":tripIds[2]
    },
    {
        "studentId": studentIds[5],
        "tripId":tripIds[2]
    },
    {
        "studentId": studentIds[0],
        "tripId":tripIds[10]
    },
    {
        "studentId": studentIds[1],
        "tripId":tripIds[20]
    },
]);

