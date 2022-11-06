# BLOG APP

---

### Requirements

---

<ul>
 <li>User should be able to sign up</li>
<li> User should be able Login</li>
<li>User authentication using JWT</li>
<li> User should be able to create blog post</li>
<li>User should be able to get all published blog post</li>
<li>User should be able to get a published blog post by id</li>
<li>User should be able to update the state of a blog post</li>
<li>User should be able update the body of a blog post</li>
<li> User should be able to get all their blog  post</li>
<li>User should be able to delete their blog post</li>
<li>Test Application</li>
</ul>

---

### Setup

---

- Install Nodejs, MongoDb
- Pull this repo
- Update env file with .env

- run: `npm run start` (for production)
- run: `npm run dev` (for development)

---

### Base Url

- [Go to this link](https://wandering-cap-clam.cyclic.app/)

---

# Models

---

### User

| Fields    | Data types | Constraints |
| --------- | ---------- | ----------- |
| firstname | String     | required    |
| lastname  | String     | required    |
| email     | String     | required    |
| password  | String     | required    |
|           |            |             |

### Post

| Fields       | Data types                     | Constraints                                      |
| ------------ | ------------------------------ | ------------------------------------------------ |
| title        | String                         | required, unique                                 |
| author       | String                         | required                                         |
| description  | String                         | required                                         |
| state        | String                         | enum: ["drafted", "published"], default: drafted |
| body         | String                         | required                                         |
| read_count   | Number                         | default: 0                                       |
| reading_time | String                         | Calculated in schema                             |
| tags         | String                         | Optional                                         |
| owner_id     | mongoose.Schema.Types.ObjectId | ref: "User"                                      |
| timestamps   | DateTime                       | true                                             |

# APIs

### SignUp User

- Route: /user/signup
- Method: POST
- Body:

```
{
  "firstname": "james",
  "lastname": "styles",
  "email": "james@gmail.com",
  "password": "123456789"
}
```

- Response : success

```
{
  "message": "User has been succesfully signed up",
  "data": {
    "firstname": "james",
    "lastname": "styles",
    "email": "james@gmail.com",
    "password": "$2b$10$IFrc0/VCar9EXPdc52oA6uG0ZM.S1hvhDHW.vKRXZ5BvXKqFd6.ue",
    "_id": "63632e7bef9559a89ad9a112",
    "__v": 0
  }
}
```

---

### Login User

- Route: /user/login
- Method: POST
- Body:

```
{
  "email": "james@gmail.com",
  "password": "123456789"
}
```

- Responses: Success

```
{
  "status": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzNjMyZTdiZWY5NTU5YTg5YWQ5YTExMiIsImlhdCI6MTY2NzQ0NDk5NywiZXhwIjoxNjY3NDQ4NTk3fQ.zPL40z3O4SAw9HJylkjlP-5rJSV0MU2pGPzrMrvZxUg"
}
```

---

## Create Post/Blog

- Route: /post
- Method: POST
- Header
  Authorizaton: Bearer ${token}
- Body:

```
{
  "title": "Life of a beginner in tech",
  "author":"Prosper"
  "description": "Keep on pushing",
  "tags": "Dont give up",
  "body": "It only get better as long as you keep trying!!!! "
}
```

- Response : success

```
{
  "status": "success",
  "message": {
    "title": "Life of a beginner in tech",
    "author": "Prosper",
    "description": "Keep on pushing",
    "state": "drafted",
    "body": "It only get better as long as you keep trying!!!! ",
    "read_count": 0,
    "tags": "Dont give up",
    "owner_id": "63632e7bef9559a89ad9a112",
    "_id": "63633dfb3620099c28a600db",
    "createdAt": "2022-11-03T04:05:15.513Z",
    "updatedAt": "2022-11-03T04:05:15.513Z",
    "reading_time": " <1 mins read",
    "__v": 0
  }
}
```

---

## Update Post/Blog State

- Route: /post/update-state/:id
- Method: PATCH
- Header
  Authorizaton: Bearer ${token}
- Body:

```
{
"state": "published"
}
```

- Response : success

```
{
  "status": "Success",
  "post": {
    "_id": "63633dfb3620099c28a600db",
    "title": "Life of a beginner in tech",
    "author": "Prosper",
    "description": "Keep on pushing",
    "state": "published",
    "body": "It only get better as long as you keep trying!!!! ",
    "read_count": 0,
    "tags": "Dont give up",
    "owner_id": "63632e7bef9559a89ad9a112",
    "createdAt": "2022-11-03T04:05:15.513Z",
    "updatedAt": "2022-11-03T04:16:52.571Z",
    "reading_time": " <1 mins read",
    "__v": 0
  }
}
```

---

## Update Post/Blog

- Route: /post/:id
- Method: PATCH
- Header
  Authorizaton: Bearer ${token}
- Body:

```
  {
  "body": "AltSchool africa has been hell",
  "title": "tech life",
  "description": "exams have been so hard",
  "tags": "fufilment"
}
```

- Response: success

```
{
  "status": "update successful",
  "post": {
    "_id": "63633dfb3620099c28a600db",
    "title": "tech life",
    "author": "Prosper",
    "description": "exams have been so hard",
    "state": "published",
    "body": "AltSchool africa has been hell",
    "read_count": 0,
    "tags": "fufilment",
    "owner_id": "63632e7bef9559a89ad9a112",
    "createdAt": "2022-11-03T04:05:15.513Z",
    "updatedAt": "2022-11-03T04:26:26.028Z",
    "reading_time": " <1 mins read",
    "__v": 0
  }
}
```

---

## Delete Post/Blog

- Route: /post/:id
- Method: DELETE
- Header
  Authorizaton: Bearer ${token}

- Response: success

```
{
  "status": "success",
  "msg": "Post has been successfully deleted"
}
```

---

## Get Posts/Blogs By User

- Route: /post/my-post
- Method: GET
- Header
  Authorizaton: Bearer ${token}
- Query Params

  - page default(1)
  - limit default(10)
  - state
  - Note: Query parameters and their values should be in lowercase(small letters)

- Response

```
{
  "status": "success",
  "data": {
    "userPost": [
      {
        "_id": "636235bf354521107b7c41b9",
        "title": "Prosper dog",
        "author": "Prosper",
        "description": "How i killed my dog",
        "state": "drafted",
        "body": "dog bite me and i come kill am",
        "read_count": 0,
        "owner_id": "63621a8545189daa2000f793",
        "createdAt": "2022-11-02T09:17:51.583Z",
        "updatedAt": "2022-11-02T09:17:51.583Z",
        "reading_time": "< 1 mins read",
        "__v": 0
      },
      {
        "_id": "636235df354521107b7c41bc",
        "title": "Prosper cow",
        "author": "Prosper",
        "description": "How i killed my cow",
        "state": "drafted",
        "body": "cow bite me and i come kill am",
        "read_count": 0,
        "owner_id": "63621a8545189daa2000f793",
        "createdAt": "2022-11-02T09:18:23.258Z",
        "updatedAt": "2022-11-02T09:18:23.258Z",
        "reading_time": "< 1 mins read",
        "__v": 0
      },
      {
        "_id": "636235f9354521107b7c41bf",
        "title": "Prosper hen",
        "author": "Prosper",
        "description": "How i killed my hen",
        "state": "drafted",
        "body": "hen bite me and i come kill am",
        "read_count": 0,
        "owner_id": "63621a8545189daa2000f793",
        "createdAt": "2022-11-02T09:18:49.631Z",
        "updatedAt": "2022-11-02T09:18:49.631Z",
        "reading_time": "< 1 mins read",
        "__v": 0
      },
      {
        "_id": "63624afca5bf75ca8d4ad3d8",
        "title": "Prosper mouse",
        "author": "Prosper",
        "description": "How i killed my mouse",
        "state": "drafted",
        "body": "mouse bite me and i come kill am",
        "read_count": 0,
        "owner_id": "63621a8545189daa2000f793",
        "createdAt": "2022-11-02T10:48:28.831Z",
        "updatedAt": "2022-11-02T10:48:28.831Z",
        "__v": 0
      },
      {
        "_id": "63624be0fb25cba3acd97c91",
        "title": "Prosper fish",
        "author": "Prosper",
        "description": "How i killed my fish",
        "state": "drafted",
        "body": "fish bite me and i come kill am",
        "read_count": 0,
        "owner_id": "63621a8545189daa2000f793",
        "createdAt": "2022-11-02T10:52:16.552Z",
        "updatedAt": "2022-11-02T10:52:16.552Z",
        "__v": 0
      },
      {
        "_id": "63624c2ced4c977aa9968b02",
        "title": "Prosper goat",
        "author": "Prosper",
        "description": "How i killed my goat",
        "state": "drafted",
        "body": "goat bite me and i come kill am",
        "read_count": 0,
        "owner_id": "63621a8545189daa2000f793",
        "createdAt": "2022-11-02T10:53:32.112Z",
        "updatedAt": "2022-11-02T10:53:32.112Z",
        "__v": 0
      }
    ]
  }
}
```

---

## Get All Published Posts/Blogs

- Route: post/

- Method: GET

- Query Param

  - page (default 1)
  - limit (default 20)
  - author
  - title
  - tags
  - sort (-read_count || read_count || -reading_time || reading_time || -timestamps || timestamps )
  - NOTE: Query parameters and their valuesshould be in lowercase(small letters)

- Response: success

```
{
  "status": "success",
  "post": [
    {
      "_id": "636235bf354521107b7c41b9",
      "title": "Prosper dog",
      "author": "Prosper",
      "description": "How i killed my dog",
      "state": "published",
      "body": "dog bite me and i come kill am",
      "read_count": 0,
      "tags": [
        "god"
      ],
      "owner_id": "63621a8545189daa2000f793",
      "createdAt": "2022-11-02T09:17:51.583Z",
      "updatedAt": "2022-11-02T09:17:51.583Z",
      "reading_time": "< 1 mins read",
      "__v": 0
    }
  ]
}

```

## Get Published Post/Blog By Id

- Route: /post/:id
- Method: GET
- Response: Success
- NOTE: The owner_id field is the author details

```
{
  _id: new ObjectId("636235bf354521107b7c41b9"),
  title: 'Prosper dog',
  author: 'Prosper',
  description: 'How i killed my dog',
  state: 'published',
  body: 'dog bite me and i come kill am',
  read_count: 2,
  tags: [ 'god' ],
  owner_id: {
    _id: new ObjectId("63621a8545189daa2000f793"),
    firstname: 'prosper',
    lastname: 'anosike',
    email: 'prosper@gmail.com',
    password: '$2b$10$CX/TQacb0b1bfV6PncMj1.6HngrjfNVi1GnAKKbzZk4IDBoPtFgRq'
  },
  createdAt: 2022-11-02T09:17:51.583Z,
  updatedAt: 2022-11-03T13:06:24.470Z,
  reading_time: ' <1 mins read'
}
```

---

# TESTS

- **To run the test**
  - run : `npm run test -- test.test.js`
  - The fixtures folder in the test folder contains dummy data for users and posts that are used for the tests. Use the following commands:

---

# CREATING A COLLECTION

- Use postman or thunderclient to create a collection

---

# Contributor

- **Anosike Prosper**
