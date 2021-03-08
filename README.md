
# Groo Vee Media

## Hello World
Groo Vee Media is a part-blog, part-magazine, part-social network. Having a target audience of teens and young adults, Groo Vee Media's mission is to provide a hub for mainly art, culture, and music enthusiasts. Site guests will have the ability to create an account and start drafting articles.
## Client Repository
The focus of this repository is the server application. To learn more about the client, vist [this repository]('https://github.com/enrique-lol/groo-vee-media-server')
## Live Apps
- [Deployed Server App]('https://aqueous-atoll-85096.herokuapp.com')
- [Deployed Client App]('https://enrique-lol.github.io/groo-vee-media-client/')
# Server Details
## Technologies Used
- Javascript
- Express JS
- MongoDB
- Node JS
- Mongoose
- NPM (packages)
## Bugs and Future Roadmap
While there are no bugs in the current version, there is very limited functionality with plans to expand in the future.
#### Version 1.2 Goals
- Remove a regular user's ability to create, update, delete posts
- Introduce an Admin Account feature so only selected accounts can create articles
- Add an image to the article model
- Define several style patterns and offer user to select one for site theme
## Planning/Process/Planning Strategy
Planning for this project included creating a list of what an article was. Title and Content are the 2 chraactersitics of an article for version 1.1. After this standard was created, it was easy to implement this into code.
## Installation Steps
- Fork and Clone this repository
- Run "npm install" in cli to install dependencies
- Run local development environment with nodemon
# Version History
## Version 1.1
#### Wireframes
[Planned ERD](https://i.imgur.com/rDLAIzv.png)
#### Routes
|URI|Description|Method|
|:--------------:|:-------------:|:--------:|
|/|Landing|GET|
|/sign-up|create account|POST|
|/sign-in|login|POST|
|/home|authorized home|GET|
|/change-password|chang epw|PATCH|
|/articles/:id|view article|GET|
|/articles/:id/update|update article|PATCH|
|/articles/:id/delete|delete article|DELETE|
|/sign-out|delete token|DELETE|
