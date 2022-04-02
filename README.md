# basic-auth

HTTP server for auth practice

## Deployed links:

- [Heroku Link](https://basic-auth-bs.herokuapp.com/)

## UML

- ![UML](/basic-auth.png)

## Installation

- Clone from this repo `git clone https://github.com/bradyjcamp/basic-auth.git`
- cd into api-server
- `npm install`
  - dotenv
  - express
  - nodemon
  - jest
  - supertest
  - sequelize
  - sqlite3

## Usage

Once installed, run `npm start`

## Contributors / Authors

- Brady Camp
- JS 401 d46 class.

## Features / Routes

- POST: `/signup`
- POST: `/signin`

  - Response
    - status 200, and string body if parameters look good.
    - status 404, if incorrect route.
    - status 500, if query parameters incorrect
    
