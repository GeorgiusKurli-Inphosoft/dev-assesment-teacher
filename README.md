# dev-assesment-teacher

# How to start

## Mysql Server Setup
Start the docker instance by running **npm run start-docker** in the console.
If docker is not installed, update the db.ts and drizzle.config.js to connect to a mysql server.
Also update db-test.ts and drizzle-unit-test.config.js if tests are required.

## Database Tables Setup
Ensure that the app is able to connect to the mysql server. 
Run **npm run migrate** to run the migration script.
This will create the pre-requisite tables to run this app.

## Running The App
Once the migration script has been successfuly ran, we can run **npm run start** to initialize the app. This will run the app using port **3000**. Either ensure that the port is free or update the **PORT** variable in the main **index.ts**

## Tests
Run **npm test** to run the unit tests.
