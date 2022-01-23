***
This was my delivery for the exam in [*PG6301 Web Development and API Design*](https://www.kristiania.no/studieportal/school-of-economics-innovation-and-technology/bachelorniva/pg6301/webutvikling-og-api-design?year=2021&period=0) at Kristiania University College, spring 2021. 

*"Probably the best delivery of this semester"*
<br/>
\- Examinator

***

## Chatclub

An application where users, upon authenticating themselves, are able to create, edit and delete Chatters. A chat room is implemented where the user can communicate with other connected clients. The application was never fully finished.


### How to run

On the CLI:
1. `npm install` to install all required dependencies
3. `npm start` to start application and server

The application will then be accessible at `http://localhost:3000/`, assuming port 3000 is available.

To enable authentication with Google, you need to to provide a .env file containing environment variables for Google Client ID and Google Client Secret.

```
GOOGLE_CLIENT_ID = 
GOOGLE_CLIENT_SECRET =
```

### List of API endpoints

#### Authentication
Local strategy
* `POST    /api/auth/login`
* `POST    /api/auth/logout`
* `POST    /api/auth/signup`

Google strategy
* `GET    /api/auth/google`
* `GET    /api/auth/google/callback`

Shared
* `GET    /api/auth/user`
* `GET    /api/auth/users`

#### Chatters
* `POST    /api/chatters/create`
* `GET     /api/chatters/`
* `GET     /api/chatters/:id`
* `PUT     /api/chatters/:id`
* `DELETE  /api/chatters/:id`

(Chatters endpoints return 401 if not authenticated)

#### Messages
* `POST    /api/messages`
* `GET     /api/messages`

(Not used by frontend)

### Test Coverage

| File         | % Stmts         
| -------------|-------------
| All files    | 74.87

In the above result, the following files are ignored by Jest, as I don't think they are suited for testing:
* /src/client/lib/http.js
* /src/client/ApplicationApi.jsx
* /src/client/index.jsx

#### Coverage with those 3 files excluded
![coverage](images/coverage.png)

#### Total coverage for all files
![coverage-total](images/coverage-total.png)

### Additional functionalities/features

* In addition to Google strategy, I added a local strategy to passport. Usernames and password hashes (bcrypt) are "stored" in a dummy database.
* Helmet to add security HTTP headers
* Added a custom "ProtectedRoute" component for handling redirection to /login when trying to access certain routes while unauthenticated
