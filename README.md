# CampusMeetups
CampusMeetups is a web application designed to connect university students based on shared interests, travel plans, and availability.

## Tech Stack

- Frontend: HTML, CSS, Bootstrap
- Backend: Node.js, Express, Mongoose
- Database: MongoDB

## Installation

1. Download mongodb and run your local mongodb:
    ```bash
    mongod -port 3000 -dbpath PATH/DATA
    ```
    (might be different for windows)
2.  Clone the repository:
    ```bash
    git clone https://github.com/CPSC5240/CampusMeetups.git
    ```
3. Navigate into the project directory:
    ```bash
    cd CampusMeetups
    ```
4. Install dependencies(make sure npm and node are installed):
    ```bash
    npm install
    ```
5. Compile typescript files on the repository and run it
    ```bash
    npx tsc / tsc
    node AppServer.js
    ```

## API Endpoints
You can check our API collection inside `/postman` directory.
take the file and import it to your Postman.
