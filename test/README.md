# How to run test

1. Run npm install to get all dependencies
    ```bash
        npm install
    ```
2. Run your mongoDB instance & server
3. Populate your mongoDB with the populate script
4. Run a single test file with: (depending on your installation you might need npx)
    ```bash
        mocha --reporter spec test/TEST_FILE_NAME.js
    ```
    ```bash
        npx mocha --reporter spec test/TEST_FILE_NAME.js
    ```
    or running all test files
    ```bash
        mocha --no-parallel --reporter spec test/**/*.js
    ```
    ```bash
        npx mocha --no-parallel --reporter spec test/**/*.js
    ```
