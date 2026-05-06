POST /signup
POST /login
POST /logout
GET /profile
PATCH /profile

POST /request/send/interest/:userId
POST /request/send/ignored/:userId

POST /request/send/accepted/:userId
POST /request/send/rejected/:userId


STATUS : Ignore, interested, accepted, rejected

UserRouter:

-GET /user/connections
-GET /user/requests
-GET /user/feed - gets you the profile of the users 