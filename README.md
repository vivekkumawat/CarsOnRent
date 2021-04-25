# CarsOnRent

## Tech Stack Used
1. Frameworks:- Node.js, Express.js, Mongoose
2. Database:- MongoDB ATLAS
3. Cloud:- Heroku

## Endpoints
Base Endpoint URL:- https://cars-on-rent.herokuapp.com

Admin Token:- `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2MDgyYmUxOTA3OWIyNDIyZDg4ZThkMTYiLCJpc0FkbWluIjp0cnVlLCJpYXQiOjE2MTkxODIzNDN9.1EdOFa4iJ6hL664v_S43S38ckf83hcqsytK93wrMYQU`

User Token (Non Admin):- `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2MDgyYmVhZTA3OWIyNDIyZDg4ZThkMTciLCJpc0FkbWluIjpmYWxzZSwiaWF0IjoxNjE5MzUwNDc1fQ.Egb01HP8mHfz4ft9X3GfcFEKoOv2HOjYdBLjN4AvxJU`

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

Sample Payload (Admin Token Required):- 

`{
    "name": "Vivek Kumawat",
    "mobile": 8054845360,
    "password": "123@test",
    "is_admin": false
}`

2. GET https://cars-on-rent.herokuapp.com/api/user/all

Admin Token Required

3. POST https://cars-on-rent.herokuapp.com/api/user/update

Sample Payload (User Token Required):- 

`{
    "name": "Vivek Kumawat",
    "mobile": 8054845360,
    "password": "123@test"
}`

4. GET https://cars-on-rent.herokuapp.com/api/user/delete/:userId

Admin Token Required, userId:- `6082e162d203132c9fc1450e`

5. GET https://cars-on-rent.herokuapp.com/api/user/bookings

User Token Required

### Car Endpoints
1. POST https://cars-on-rent.herokuapp.com/api/car/add

Sample Payload (Admin Token Required):- 

`{
    "car_license_number": "KA01EM7070",
    "manufacturer": "honda",
    "model": "city",
    "base_price": 500,
    "price_per_hour": 150,
    "security_deposite": 1000
}`

2. GET https://cars-on-rent.herokuapp.com/api/car/all

User Token Required

3. POST https://cars-on-rent.herokuapp.com/api/car/update

Sample Payload (Admin Token Required):- 

`{
    "car_license_number": "KA01EM7070",
    "manufacturer": "honda",
    "model": "city",
    "base_price": 500,
    "price_per_hour": 150,
    "security_deposite": 1000
}`

4. GET https://cars-on-rent.herokuapp.com/api/car/delete/:licenseNumber

Admin Token Required, licenseNumber:- `KA01EM7070`

5. GET https://cars-on-rent.herokuapp.com/api/car/bookings

Admin Token Required

6. POST https://cars-on-rent.herokuapp.com/api/car/book

Sample Payload (User Token Required):-

`{
    "car_id": "6082e162d203132c9fc1450e",
    "car_license_number": "KA01EM7074",
    "total_rent_bill": 5100,
    "from_date_time": "16-01-2021",
    "to_date_time": "17-01-2021"
}`

7. GET https://cars-on-rent.herokuapp.com/api/car/calculate-price/:carId/:fromDateTime/:toDateTime

User Token Required, carId:- `6082e162d203132c9fc1450e`, fromDateTime:- `2021-04-23`, toDateTime:- `2021-04-24`

8. GET https://cars-on-rent.herokuapp.com/api/car/search-cars/:fromDateTime/:toDateTime

User Token Required, fromDateTime:- `2021-04-23`, toDateTime:- `2021-04-24`
