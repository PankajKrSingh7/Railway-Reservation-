# Railway_Booking_app
This is the report of the “Train Ticket Reservation System” web application, in which front end (client side) is developed using React JS and back end (server side) is developed using Node JS and Express JS. This web application use MongoDB as the database, which is a cross-platform document-oriented database.

# Steps to Deploy  
     - First download or clone the codes and then follow thses steps :
 ## 1. Deploy front-end
     - go inside "web" folder
     - run "npm install" using cmd
     - execute the command, "npm start"

## 2. Deploy Back-end
    - go inside services folder
    - run "npm install" using cmd
    - then execute the command, "node index.js"	
    - then the back-end services will be started in port 3001

# File structure 
## 1. client 
    - Holds the client application
### a. public  
    - This holds all of our static files
### b. src
- images - This folder holds assets such as images, docs, and fonts
- components - This folder holds all of the different components 
- App.js - This is what renders all of our browser routes and different views
- index.js - This is what renders the react app by rendering App.js, should not change
package.json - Defines npm behaviors and packages for the client
## Server - Holds the server application
- config - This holds our configuration files, like mongoDB uri
- models - This holds all of our data models
- routes - This holds all of our HTTP to URL path associations for each unique url
- server.js - Defines npm behaviors and packages for the client
- package.json - Defines npm behaviors like the scripts defined in the next section of the README

## .gitignore - Tells git which files to ignore
