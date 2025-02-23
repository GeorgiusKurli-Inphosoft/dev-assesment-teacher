# dev-assesment-teacher

# How to start

## Mysql Server Setup
Start the docker instance by running **npm run start-docker** in the console.
If docker is not installed, update the data-source.ts to connect to a mysql server.

## Database Tables Setup
Ensure that the app is able to connect to the mysql server. 
Run **npm run migrate** to run the migration script.
This will create the pre-requisite tables to run this app.

## Running The App
Once the migration script has been successfuly ran, we can run **npm run start** to initialize the app.

## Tests
Run **npm test** to run the unit tests.