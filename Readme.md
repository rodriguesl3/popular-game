# Popular game

## Introduction

Project to building a path in the board the main goal is the whole bard need to have the same color.

Always the starting point os 0:0 (col x row) depending which direction is chosend the current position will colored for the next one tha you selected.

---
## Tech Stack

* Express API using Typescript
* Jest to run unit tests
---
## Tech approach
In this project I am not using database connection, only static object, the reason for choose this approach is to do as simple as possible, avoiding external dependencies and headaches to configure the project.

---

## Run Project

To run this project basically run `npm run dev` it will up a small web server in the port 3535

***Commands***

Backend server
```shell
  - npm run dev #start a server (http://localhost:3535)
  - npm run test #run all tests in the project
  - npm run test:cov #get the test coverage in this project
```

Frontend server:

```sh
npm run dev:page #start a server (http://127.0.0.1:8080)
```


### **Endpoints**

```js
// Create a new board to play, inform what is the board size (4 = 4 cols x 4 rows)
POST :3535/game/:boardSize

// Make a move in the board, you need to inform the boardId and direction (top, down, right or left).
PUT :3535/game/:boardId/direction/:direction

// in case you need to get the board, just inform the id that you received when you created it.
GET :3535/game/:boardId
```

## Improvements

There are some topics that needs to be reviewed: 

* Dependency Injection, in Service Class I am instanciating the classes in the methods (bad practices).

* Performance, I am not positive that logic used to update the colors is the better option.

* Use database, use static methods to hold application state definitelly is a bad practice, the main reason is, when the application restart for some reason you will loose the whole state.

* Create endpoint documentation, like a swagger.

* split the application in two different projects, to avoid silly problems/conflics.
