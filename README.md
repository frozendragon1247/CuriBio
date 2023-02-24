# Getting Started with Node.js

This project was bootstrapped using Node.js and Express.

## Available Scripts

In the project directory, you can run:

### `npm start`

Before running the server, should run this command `npx prisma migrate dev --name init`.
Runs the app in the development mode.
The server runs on localhost:3000 and you can test it using Postman.

## Test Cases

You can use PostMan to cover following test cases.

### New user creation

This is the test case for testing if the creating new user succeded.

In PostMan, you can set like this:

```
Method - Post
URL - localhost:3000/user/create
Body - {
  "username": "test",
  "password": "password",
  "email": "test@gmail.com",
  "info": "Test info"
}
```

And the response should be

```
{
    "message": "New user created.",
    "user": {
        "id": 2,
        "email": "test@gmail.com",
        "username": "test",
        "password": "password",
        "created_at": "2023-02-24T15:49:27.403Z",
        "deleted_at": null,
        "info": "Test info"
    }
}
```

### User login

This is the test case for testing if user log in succeded.

In PostMan, you can set like this:

```
Method - Post
URL - localhost:3000/user/login
Body - {
  "username": "test",
  "password": "password"
}
```

And the response should be

```
{
    "message": "User logged in.",
    "token": /* this would be a token value */
}
```

### Update user info

This is the test case for testing if user update succeded.

In PostMan, you can set like this:

```
Method - Put
URL - localhost:3000/user/update
Body - {
  "password": "password",
  "info": "updated"
}
Authorization - select bearerToken and set the value as the token value you got at log in.
```

And the response should be

```
{
    "message": "User updated.",
    "user": {
        "id": 2,
        "email": "test@gmail.com",
        "username": "test",
        "password": "password",
        "created_at": "2023-02-24T15:49:27.403Z",
        "deleted_at": null,
        "info": "updated"
    }
}
```

### Delete user

This is the test case for testing if user deletion succeded.

In PostMan, you can set like this:

```
Method - Delete
URL - localhost:3000/user/delete
Body - none
Authorization - select bearerToken and set the value as the token value you got at log in.
```

And the response should be

```
{
    "message": "User deleted.",
    "user": {
        "id": 2,
        "email": "test@gmail.com",
        "username": "test",
        "password": "password",
        "created_at": "2023-02-24T15:49:27.403Z",
        "deleted_at": "2023-02-24T16:01:36.737Z",
        "info": "updated"
    }
}
```

### Read user info

This is the test case for testing if user deletion succeded.

In PostMan, you can set like this:

```
Method - Get
URL - localhost:3000/user
Body - none
Authorization - select bearerToken and set the value as the token value you got at log in.
```

And the response should be

```
{
    "id": 2,
    "email": "test@gmail.com",
    "username": "test",
    "password": "password",
    "created_at": "2023-02-24T15:49:27.403Z",
    "deleted_at": null,
    "info": "updated"
}
```
