# lendsqr-interview

[![Coverage Status](https://coveralls.io/repos/github/victormazeli/lendsqr-interview/badge.svg)](https://coveralls.io/github/victormazeli/lendsqr-interview)

## Tech Stack
- Node 16.14.0LTS
- Express
- Knexjs
- Mysql

## Testing Stack
- Mocha
- Supertest
- chai
- coverall
- nyc
- Testing results are located in the coverage directory

## Project Urls
- [HostedUrl](https://lendsqr-int-task.herokuapp.com) - Heroku hosted url
- [Doc](https://lendsqr-int-task.herokuapp.com/doc/) - Swagger Api Doc
- [Postman-Doc](https://documenter.getpostman.com/view/12847208/UVsLQ5qy) - Postman Documentation


## Test Cases
### Auth
- user should should signup and return a status code 201 with the following response data: userId, fullName, email, walletId, balance.
- user should be able to login and the response status should be 200, with a token returned
- user should not be omit any of the required input during signup, if omitted returned a 400 status code, with a proper readable error message.
- user should not be able to sigin in without proper email formart or required length of password.

### Fund Wallet
- user should be able to fund their wallet and return a status code 201 with the following response data: userId, fullName, email, walletId, balance
- user should be forced to enter an amount value grater than 0. return a status code 400 with a response message.

### Transfer Funds
- user should be able to transfer funds to another users wallet, the response should return status 200 with the following response object: userId, fullName, email, walletId, balance. where the property balance should contain the current balance after funds transfer.
- user should not be allowed to transfer any amount less than 0. return a status code 400 with a response message.
- - user should be required to enter an amount to be transfered.

### Withdraw Funds 
- user should be able to withdraw funds from their wallet, status code should be 200 with the following response object: userId, fullName, email, walletId, balance. where the property balance should contain the current balance after funds withdrawal.
- user should not be allowed to withdrawal any amount less than 0. return a status code 400 with a response message.
- user should be required to enter a withdrawl amount.

### Get User Account
- user only if aunthenticated can view account, should return a 401 unathenticated
- useraccount detail gotten should exactly equal the authenticated user.

