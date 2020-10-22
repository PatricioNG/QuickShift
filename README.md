# QuickShift #

>Please note the app was only styled for mobile viewports for my final submission, and as such has not been built out with tablet or desktop in mind.

## Overview ##
QuickShift is a React application built out for my BrainStation Capstone project. The application itself is built with:
- React
- Apollo
- GraphQL
- Prisma
- MySQL
- Node

The application was built over a 2.5 week period at the end of the program, in time for our final demo day. You can view a video demo of my project on [BrainStation's graduate page](https://brainstation.io/hiring-brainstation-graduates) (Search for 'Patricio' under Web Development). If you'd like to run the project locally there is a bit of setup required, I'll detail the steps at the end of this file.

## Inspiration ##
The inspiration for my app comes from my years of retail experience. Formerly I worked as the Manager of Retail Technologies for Lush Cosmetics, which is a role that focused on looking at what tech innovation and solutions are out there in the field and seeing if it was feasible to launch in our stores. This also meant a lot of my time was spent experimenting, tinkering, and researching. During that research I connected a lot with our Retail teams to gather feedback on their pain points. The number one pain point that always came up was how difficult and frustrating hiring for shift/seasonal work was. Most of the time these stores managers were putting in long hours and lots of effort into finding roles that typically only worked a few days during the busiest weeks. Further to this, a lot of effort and cost was spent onboarding these employees.

From this pain point came the idea of QuickShift, an app that would combine the best parts of Uber, with the best parts of LinkedIn, with the user friendly ease mobile applications. The goal here was to create something that would allow local businesses to post short term work, and for local workers to find, review, and apply for those shifts. I wanted to keep everything simple and easy to use to reduce friction and allow teams to find work/hire employees fast.

## Functionality ##
Because I only had a short timeline to complete this work in, I focused on the core pieces needed and implemented the following features:

### Businesses are able to... ###
- Post new shifts
- Review and accept/decline applicants
- Review previous shifts
- Swipe through current candidates scheduled to work
- Get snapshot information on what their shift situation looks like

### Candidates are able to... ###
- Review local shifts
- Submit applications to shifts 
- Review previous shifts
- Check their calendar of shifts
- View pending applications

## 2.0 in Quick Succession ##
After the initial submission of my project we had an additional seven days before we presented our projects. During this time I decided to challenge myself and see if I could quickly iterate a 2.0 version.

> Focus for 2.0: Improve efficiency, reduce complexity, add authentication

During this time I managed to achieve all three of my goals! Previously, as you might notice if you watch the demo video, my code base was built using Knex and Bookshelf as an ORM to manage my data. This also meant I had built many different API endpoints, bookshelf models and queries, and made numerous state calls through React. This was simply out of control, and my code base felt messy and all over the map. To rectify this I made the switch to GraphQL, Prisma, and Apollo. What I learned in switching was just how simple things can be through Apollo and GraphQL. I was able to reduce hundreds of lines of code into just a few different queries, managing refetching of my data was a breeze, and prisma allowed for easy abstraction of more complex database queries.

The latest codebase is what I have here on GitHub, and while it's not the version shown in the demo video, it's here to view in code form or locally if you'd like to install the project.

## Final Thoughts ##
I had a lot of fun working on this project, while I've had experience in working with SQL through C# code, this was my first experience working on a MySQL DB through the web. I learned a lot about Knex, Bookshelf, and ORM's, and even more about how seamless working with GraphQL can make things. I'm definitely appreciative of the things I learned on this project, however I've decided to wrap things up here on QuickShift. I won't be adding additional features or building out the desktop and tablet views as I've moved on to my hobby project so stay tuned for that to appear on my GitHub!

If you have any questions about the project or would like to contact me feel free to reach out via [LinkedIn](https://www.linkedin.com/in/patricionguerra/).

Happy Coding!

__________________ 

## Installing the Project ##
The project uses [Auth0](https://auth0.com/) authorization and a MySQL database, installing locally will mean you'll need to have these two pieces setup already.

Authorization strings that need to be setup:
- knexfile.js - In this file you'll need to setup your MySQL DB connection strings.
- Prisma > .env - In this file you'll need to enter your database connection string in [Prisma](https://www.prisma.io/) format
- GraphQL Server - In this file you'll need to set up your [Auth0](https://auth0.com/) authorization information.
- Client side: Index.js - You'll need to set up your Auth0 credentials where indicated
- DisplayMap - This file requires a [Google Maps API key](https://developers.google.com/maps/documentation/) 

Once the authorization pieces are setup, the DB can be initialized by `dbInit` command at the top level.

After initialization runs the script will run the seed files and populate the DB. After this point you'll need to run Prisma's `introspect` and `generate` commands to intialize your Prisma client.

From here you'll be able to run the project by running `devStart` at the top level.