# nhl_application
The following are steps on how to run the application:
-	Install Node.js (most recent version) - https://nodejs.org/en/
- NPM should be automatically installed with node.js
-	Install the MYSQL database using the provided dump file. Create a user with the username nhl_app_user and the password Hockey123!, as that is what the database connects to. Can also go into /nhl_application/backend/config/db_config.js and update the user and password fields there
-	Navigate to the main directory of the project (/nhl_application) and start both the backend and frontend with NPM by doing the following:
  * For the backend, enter the /nhl_application/backend/ directory and perform the following steps:
    - Run the ‘npm install’ command to install necessary dependencies
    - Run the ‘npm start’ command to start the server (runs on localhost port 8080)
  * For the frontend react app, navigate into the /nhl_application/frontend/ directory and do the following steps:
    - Run the ‘npm install’ command to install necessary dependencies
    - Run the ‘npm start’ command to start the application (runs on port 8081)
-	Open a web browser to localhost:8080 and the main page should appear
