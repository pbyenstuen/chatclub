# PG6301 Web Development and API Design - EXAM
---

* What the project does
* How the project is structured
* How the project is implemented
* What different technologies are used

> Think about it like a “pitch sale” in which you want to show a potential employer what you have learned in this course. 

## How to run

On the CLI:
1. `npm install` to install all required dependencies
3. `npm start` to start application and server

The application will then be accessible at `http://localhost:3000/`, assuming port 3000 is available.

To enable authentication with Google functionality it is required to provide a .env file containing environment variables for Google Client ID and Google Client Secret.

```
GOOGLE_CLIENT_ID = 
GOOGLE_CLIENT_SECRET =
```

## List of API endpoints

### Authentication

Local strategy
* `POST    /api/auth/login`
* `POST    /api/auth/logout`
* `POST    /api/auth/signup`

Google strategy
* `GET    /api/auth/google`
* `GET    /api/auth/google/callback`

Shared
* `GET    /api/auth/user`

## Test Coverage

| File         | % Stmts         
| -------------|-------------
| All files    | %

## Additional functionalities/features

* In addition to Google strategy, I added a local strategy to passport. Usernames and passowrd hashes (bcrypt) are "stored" in a dummy database.
* Helmet to add security HTTP headers
* Added a custom "ProtectedRoute" component for handling redirection to /login when trying to access certain routes unauthenticated