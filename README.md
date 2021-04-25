# CarsOnRent

## Tech Stack Used
1. Frameworks:- Node.js, Express.js, Mongoose
2. Database:- MongoDB ATLAS
3. Cloud:- Heroku

## Endpoints
Base Endpoint URL:- https://cars-on-rent.herokuapp.com

### Auth Endpoints
1. https://cars-on-rent.herokuapp.com/api/auth/login
2. https://cars-on-rent.herokuapp.com/api/auth/register

### User Endpoints
1. https://cars-on-rent.herokuapp.com/api/user/add
2. https://cars-on-rent.herokuapp.com/api/user/all
3. https://cars-on-rent.herokuapp.com/api/user/update
4. https://cars-on-rent.herokuapp.com/api/user/delete/:userId
5. https://cars-on-rent.herokuapp.com/api/user/bookings

### Car Endpoints
1. https://cars-on-rent.herokuapp.com/api/car/add
2. https://cars-on-rent.herokuapp.com/api/car/all
3. https://cars-on-rent.herokuapp.com/api/car/update
4. https://cars-on-rent.herokuapp.com/api/car/delete/:licenseNumber
5. https://cars-on-rent.herokuapp.com/api/car/bookings
6. https://cars-on-rent.herokuapp.com/api/car/book
7. https://cars-on-rent.herokuapp.com/api/car/calculate-price/:carId/:fromDateTime/:toDateTime
8. https://cars-on-rent.herokuapp.com/api/car/search-cars/:fromDateTime/:toDateTime
