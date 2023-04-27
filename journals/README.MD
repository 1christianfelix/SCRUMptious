
# Scrumptious

This link will lead to the deployed website

Website: https://team-scrappy.gitlab.io/scrum-ptious

#### Team:

- Brandon Moore - Software Developer
- Christian Felix - Software Developer
- John Liu - Software Developer
- Kurt Loban - Software Developer


## Design

Scrumptious is a web application that facilitates project management using a Scrum-based approach with the aid of Sticky Notes and Sticky Boards. The frontend of the application is developed using React and is organized into separate directories for Sticky Notes, Sticky Boards, and Accounts.

The backend of the application is built using FastAPI and MongoDB to maintain the directory structure. Additionally, the application uses microservices architecture by leveraging Docker.

Scrumptious has a router directory that defines the routes for the API endpoints, a queries directory that defines the queries for the MongoDB database, and a test directory that contains test files for the API.

As the database used by Scrumptious is MongoDB, it does not require the use of a pre-built migrations folder. However, asynchronous functions are still utilized on the frontend of the application.


## Features

- Create and manage Sticky Notes and Sticky Boards.
- Assign Sticky Notes to various categories (backlog, todo, doing, review, and done).
- Set priorities and deadlines for Sticky Notes and Sticky Boards.
- Invite other users to collaborate on a Sticky Board.
- Assign users to Sticky Notes
- Email notifications when users are added to a Sticky Note or Sticky Board.

## Design


## Project Initialization
Be sure to have Docker Destkop downloaded and running.

### Clone the Repository

1. Open your terminal, change to the directory folder where the project will be cloned.
2. In your terminal, type: `git clone https://gitlab.com/team-scrappy/scrum-ptious.git`
3. Navigate to the project directory.


### Start Docker

After you have cloned your Repository and are in the correct directory initializate the following actions within your terminal:

&ensp;&ensp;&ensp;&ensp;1. `docker volume create scrumptious-mongo-data`

&ensp;&ensp;&ensp;&ensp;2. `docker-compose build`

&ensp;&ensp;&ensp;&ensp;3. `docker-compose up`

Upon completion of the previous commands you will see all four Docker containers up and running.







### Wireframe

### Concept UI/UX

## Installation

## Models

### Account

- username: str
- email: str
- password: str

### Sticky Note

- subject: str
- content: str
- priority: int
- category: str
- start_date: datetime
- deadline: datetime
- account: list[str]
- stickyboard: str

### Sticky Board

- board_name: str
- description: str
- priority: int
- start_date: datetime
- deadline: datetime
- account: list[str]
- backlog: list[str]
- todo: list[str]
- doing: list[str]
- review: list[str]
- done: list[str]

## Endpoints

_**DELETE LATER (Endpoints needs RESTFUL API example documentation per endpoint)**_


### Accounts

- POST /register: Register a new user.
- POST /login: Authenticate and log in an existing user.
- GET /account: Get the current user's account data.

### Sticky Notes

- POST /{stickyboard_id}/sticky: Create a new Sticky Note.
- GET /sticky: Get all Sticky Notes.
- GET /{stickyboard_id}/stickies: Get Sticky Notes data for a Sticky Board.
- PUT /sticky/{sticky_id}: Update a Sticky Note.
- DELETE /sticky/{sticky_id}: Delete a Sticky Note.

### Sticky Boards

- POST /stickyboard: Create a new Sticky Board.
- GET /stickyboard: Get all Sticky Boards.
- GET /stickyboard/{stickyboard_id}: Get a specific Sticky Board by ID.
- GET /stickyboard/{stickyboard_id}/sticky: Get Sticky Notes for a Sticky Board.
- PUT /stickyboard/{stickyboard_id}: Update a Sticky Board.
- DELETE /stickyboard/{stickyboard_id}: Delete a Sticky Board.
