# CarsOnRent

## Tech Stack Used
1. Frameworks:- Node.js, Express.js, Mongoose
2. Database:- MongoDB ATLAS
3. Cloud:- Heroku

## Endpoints
Base Endpoint URL:- https://cars-on-rent.herokuapp.com

### Auth Endpoints
1. POST https://cars-on-rent.herokuapp.com/api/auth/login

Sample Payload:- 

`{
    "mobile": 8054845362,
    "password": "123@test"
}`

2. POST https://cars-on-rent.herokuapp.com/api/auth/register

Sample Payload:- 

`{
    "name": "Vivek",
    "mobile": 8054845362,
    "password": "123@test"
}`

### User Endpoints
1. POST https://cars-on-rent.herokuapp.com/api/user/add

Sample Payload (Only Admin):- 

`{
    "name": "Vivek Kumawat",
    "mobile": 8054845360,
    "password": "123@test",
    "is_admin": false
}`

2. GET https://cars-on-rent.herokuapp.com/api/user/all

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
