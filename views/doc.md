# Russell API

Russell is an API to manage catways and their reservations for the port of Russell.

You can use Postman or use the browser.

If using Postman you have to save the cookie to be able to interact with API.

If using browser, after authenticate you will be able to manage all data of API from userboard page.

---

## Authenticate (/)

### Authenticate to api (POST)

Enter the login we provide to you to connect with API. 

If you're working with Postman, do not forget to save cookie and use it on further requests.

For next use you will be able to use login from another user if you create one.

---

## Users Collection (/users)

### List All Users (GET)

Will show you the list of all users.

### Get User By Id (GET /:id)

Will show you user card by his id.

### Add New User (PUT /add)

Will create a new user, you will have to fill formulary with a name, an email and a password.

### Edit User By Id (PATCH /:id)

Will allow you to update an user by his id, you need to fill formulary..

### Delete User By Id (DELETE /:id)

Will allow you to delete an user by his id.

---

## Catways Collection (/catways)

### List all catways (GET)

Will show you the list of all catways

### Get Catway By Id (GET /:id)

Will show you catway card by his id.

### Add New Catway (POST)

Will create a new catway, you will have to fill formulary with a number, a type and the state of the catway.

### Edit Catway By Id (PUT /:id)

Will allow you to replace totally a catway by his id, you need to complete formulary.

### Edit Catway State By Id (PATCH /:id)

Will allow you to update the state of a catway by his id, you need to enter the new state.

### Delete Catway By Id (DELETE /:id)

Will allow you to delete a catway by his id.

---

## Reservations Collection (/catways/:id/reservations)

Reservations are sorted by catway, to access reservations pages you need to specify a catway id in url to intercat with it and his reservations.  

### List all reservations from a catway (GET)

Will show you all reservations for a specified catway.

### Get Reservation By Id (GET /:idReservation)

Will show you reservation card by his id.

### Add New Reservation (POST) 

Will create a new reservation, you will have to fill formulary with a client name, a boat name and dates of the reservation.

### Delete Reservation (DELETE /:idReservation)

Will delete a reservation by his id.