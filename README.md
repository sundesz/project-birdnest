# Project Birdnest

The aim of this project is to create a web app to list all the drone pilots that violated the NDZ perimeter around the nest of the endangered bird Monadikuikka. The area within 100 meters of the nest is declared as NDZ.

# Specification

**The list should:**

- Persist the pilot information for 10 minutes since their drone was last seen by the equipment
- Display the closest confirmed distance to the nest
- Contain the pilot’s name, email address and phone number
- Immediately show the information from the last 10 minutes to anyone opening application
- Not require the user to manually refresh the view to see up-to-date information

**Drone positions**

GET assignments.reaktor.com/birdnest/drones

**Pilot information**

GET assignments.reaktor.com/birdnest/pilots/:serialNumber

<br >

# App link

https://project-birdnest.fly.dev/
