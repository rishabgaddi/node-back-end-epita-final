# Movie Application - Node.js

This is a simple movie application built with Node.js, Express, and MongoDB. It is a simple CRUD application that allows you to create, read, update, and delete movies and ratings.
This application was built as part of final project at EPITA.

## Installation

1. Clone the repository
2. Go inside the server folder and run `yarn install` to install the dependencies
3. From the root folder, build the docker compose file with `docker-compose build`
4. Run the docker compose file with `docker-compose up`
5. The server should be running on port 4500
6. MongoDB should be running on port 27017
7. Mongo Express should be running on port 8081

## Technical Details

- This application uses Node.js, Express, and MongoDB
- The server depends on a Spring Boot server
- The server is deployed on a Docker container
- The server also requires an AWS S3 bucket to store the movie posters and trailers
- Environment variables are used to store sensitive information
  - The environment variables are stored in a .env file
  - Look at the .env.example file for an example of the .env file
  - Update the .env file with your own values

## API Endpoints

### Movies

- GET /movies
- GET /movies/id/:id
- POST /movies
- PUT /movies/id/:id
- DELETE /movies/id/:id
- POST /movies/id/:id/poster
- POST /movies/id/:id/trailer
- GET /movies/latest
- GET /movies/seen/user/:username
- GET /movies/top/watched

### Ratings

- GET /ratings
- GET /ratings/:id
- POST /ratings
- PUT /ratings/:id
- DELETE /ratings/:id
- GET /ratings/movie/:movieId/user/:username
- GET /ratings/top/movies

## License

[MIT](https://choosealicense.com/licenses/mit/)

## Authors

[Rishab Gaddi](https://rishabgaddi.github.io/)
